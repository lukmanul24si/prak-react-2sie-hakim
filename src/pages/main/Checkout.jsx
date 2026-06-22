import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PageHeader from "@/components/pageHeader";
import { ImSpinner2 } from "react-icons/im";
import { BsCheckCircleFill, BsFillExclamationDiamondFill } from "react-icons/bs";

export default function Checkout() {
    const { user, profile } = useAuth();
    const { items, subtotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(null);

    const tierDiscount = { bronze: 5, silver: 10, gold: 15, platinum: 20 };
    const discountPercent = tierDiscount[profile?.tier] || 0;
    const discountAmount = Math.round(subtotal * (discountPercent / 100));
    const total = subtotal - discountAmount;
    const pointsEarned = Math.floor(subtotal / 1000);

    async function handleCheckout() {
        if (items.length === 0) return;
        setLoading(true);
        setError("");

        try {
            // Generate order number
            const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

            // Insert order
            const { data: order, error: orderError } = await supabase
                .from("orders")
                .insert({
                    user_id: user.id,
                    order_number: orderNumber,
                    subtotal: subtotal,
                    discount_percent: discountPercent,
                    discount_amount: discountAmount,
                    total: total,
                })
                .select()
                .single();

            if (orderError) throw orderError;

            // Insert order items
            const itemsPayload = items.map(item => ({
                order_id: order.id,
                product_id: item.product_id,
                product_name: item.product_name,
                price: item.price,
                quantity: item.quantity,
                subtotal: item.price * item.quantity,
            }));

            const { error: itemsError } = await supabase
                .from("order_items")
                .insert(itemsPayload);

            if (itemsError) throw itemsError;

            // Reduce stock for each product
            for (const item of items) {
                const { data: prod } = await supabase
                    .from("products")
                    .select("stock")
                    .eq("id", item.product_id)
                    .single();
                if (prod) {
                    await supabase
                        .from("products")
                        .update({ stock: Math.max(0, prod.stock - item.quantity) })
                        .eq("id", item.product_id);
                }
            }

            clearCart();
            setSuccess(order);
        } catch (err) {
            setError(err.message || "Checkout failed.");
        } finally {
            setLoading(false);
        }
    }

    if (success) {
        return (
            <div className="p-4 max-w-lg mx-auto text-center">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <BsCheckCircleFill className="text-6xl text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
                    <p className="text-gray-500 mb-4">Order Number: <b>{success.order_number}</b></p>
                    <div className="bg-green-50 rounded-lg p-4 mb-6 text-sm">
                        <p>Total: <b className="text-green-600">Rp {Number(success.total).toLocaleString("id-ID")}</b></p>
                        <p>Points Earned: <b className="text-green-600">+{pointsEarned} points</b></p>
                        <p className="text-gray-400 mt-1">Discount Applied: {discountPercent}% ({profile?.tier})</p>
                    </div>
                    <div className="flex gap-3 justify-center">
                        <Button variant="outline" onClick={() => navigate("/my-orders")}>
                            View My Orders
                        </Button>
                        <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => navigate("/catalog")}>
                            Continue Shopping
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <PageHeader title="Checkout" breadcrumb="Cart / Checkout" />

            {error && (
                <div className="bg-red-100 mb-4 p-4 text-sm text-red-700 rounded-lg flex items-center gap-2">
                    <BsFillExclamationDiamondFill />
                    {error}
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <h3 className="font-bold text-lg mb-4">Order Items ({items.length})</h3>
                <div className="space-y-3">
                    {items.map((item) => (
                        <div key={item.product_id} className="flex justify-between items-center">
                            <div>
                                <span className="font-medium">{item.product_name}</span>
                                <span className="text-gray-400 ml-2">x{item.quantity}</span>
                            </div>
                            <span className="font-semibold">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-lg mb-4">Payment Summary</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Subtotal</span>
                        <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Tier Discount ({profile?.tier} - {discountPercent}%)</span>
                        <span className="text-green-600">- Rp {discountAmount.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>Points to Earn</span>
                        <span>+{pointsEarned} points</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-green-600">Rp {total.toLocaleString("id-ID")}</span>
                    </div>
                </div>

                <Button
                    className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white h-12 text-lg"
                    onClick={handleCheckout}
                    disabled={loading || items.length === 0}
                >
                    {loading ? (
                        <span className="flex items-center gap-2"><ImSpinner2 className="animate-spin" /> Processing...</span>
                    ) : (
                        `Place Order - Rp ${total.toLocaleString("id-ID")}`
                    )}
                </Button>
            </div>
        </div>
    );
}
