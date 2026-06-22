import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table, TableHeader, TableBody, TableRow, TableHead, TableCell
} from "@/components/ui/table";
import PageHeader from "@/components/pageHeader";
import { MdDelete, MdShoppingCart } from "react-icons/md";

export default function Cart() {
    const { items, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
    const { profile } = useAuth();
    const navigate = useNavigate();

    const tierDiscount = {
        bronze: 5,
        silver: 10,
        gold: 15,
        platinum: 20,
    };

    const discountPercent = tierDiscount[profile?.tier] || 0;
    const discountAmount = Math.round(subtotal * (discountPercent / 100));
    const total = subtotal - discountAmount;

    return (
        <div className="p-4">
            <PageHeader title="Shopping Cart" breadcrumb="Cart" />

            {items.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                    <MdShoppingCart className="text-6xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Your cart is empty.</p>
                    <Button
                        className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => navigate("/catalog")}
                    >
                        Browse Catalog
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead className="text-center">Qty</TableHead>
                                    <TableHead>Subtotal</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.map((item) => (
                                    <TableRow key={item.product_id}>
                                        <TableCell className="font-medium">{item.product_name}</TableCell>
                                        <TableCell>Rp {item.price.toLocaleString("id-ID")}</TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                                >
                                                    -
                                                </Button>
                                                <span className="w-8 text-center font-bold">{item.quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-semibold">
                                            Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => removeFromCart(item.product_id)}
                                            >
                                                <MdDelete />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
                        <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Items ({totalItems})</span>
                                <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Tier Discount ({profile?.tier} - {discountPercent}%)</span>
                                <span className="text-green-600">- Rp {discountAmount.toLocaleString("id-ID")}</span>
                            </div>
                            <div className="border-t pt-3 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span className="text-green-600">Rp {total.toLocaleString("id-ID")}</span>
                            </div>
                        </div>
                        <Button
                            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => navigate("/checkout")}
                        >
                            Proceed to Checkout
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
