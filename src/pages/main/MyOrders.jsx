import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table, TableHeader, TableBody, TableRow, TableHead, TableCell
} from "@/components/ui/table";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import PageHeader from "@/components/pageHeader";
import { ImSpinner2 } from "react-icons/im";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { MdVisibility } from "react-icons/md";

export default function MyOrders() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [detailOpen, setDetailOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        if (user) loadOrders();
    }, [user]);

    async function loadOrders() {
        setLoading(true);
        setError("");
        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        if (error) setError(error.message);
        else setOrders(data || []);
        setLoading(false);
    }

    async function openDetail(order) {
        setSelectedOrder(order);
        setDetailOpen(true);
        const { data, error } = await supabase
            .from("order_items")
            .select("*")
            .eq("order_id", order.id);
        if (!error) setOrderItems(data || []);
    }

    const statusBadge = (status) => {
        const colors = {
            pending: "bg-yellow-100 text-yellow-700",
            processing: "bg-blue-100 text-blue-700",
            completed: "bg-green-100 text-green-700",
            cancelled: "bg-red-100 text-red-700",
        };
        return colors[status] || "bg-gray-100 text-gray-700";
    };

    return (
        <div className="p-4">
            <PageHeader title="My Orders" breadcrumb="My Orders" />

            {error && (
                <div className="bg-red-100 mb-4 p-4 text-sm text-red-700 rounded-lg flex items-center gap-2">
                    <BsFillExclamationDiamondFill />
                    {error}
                </div>
            )}

            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-bold">Order #</TableHead>
                            <TableHead className="font-bold">Status</TableHead>
                            <TableHead className="font-bold">Total</TableHead>
                            <TableHead className="font-bold">Points</TableHead>
                            <TableHead className="font-bold">Date</TableHead>
                            <TableHead className="font-bold text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8">
                                    <ImSpinner2 className="animate-spin text-xl text-green-600 mx-auto" />
                                </TableCell>
                            </TableRow>
                        )}
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium text-green-600">{order.order_number}</TableCell>
                                <TableCell>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${statusBadge(order.status)}`}>
                                        {order.status}
                                    </span>
                                </TableCell>
                                <TableCell className="font-semibold">Rp {Number(order.total).toLocaleString("id-ID")}</TableCell>
                                <TableCell className="text-green-600 font-bold">+{order.points_earned}</TableCell>
                                <TableCell className="text-gray-500">
                                    {new Date(order.created_at).toLocaleDateString("id-ID")}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm" onClick={() => openDetail(order)}>
                                        <MdVisibility /> Detail
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {!loading && orders.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-gray-400 py-8">
                                    You haven't placed any orders yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Order Detail Dialog */}
            <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Order Detail</DialogTitle>
                        <DialogDescription>
                            Order: {selectedOrder?.order_number} | Status:{" "}
                            <span className={`px-2 py-0.5 rounded text-xs font-bold capitalize ${statusBadge(selectedOrder?.status)}`}>
                                {selectedOrder?.status}
                            </span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Qty</TableHead>
                                    <TableHead>Subtotal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orderItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.product_name}</TableCell>
                                        <TableCell>Rp {Number(item.price).toLocaleString("id-ID")}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell className="font-semibold">Rp {Number(item.subtotal).toLocaleString("id-ID")}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="text-right space-y-1 text-sm">
                            <p>Subtotal: Rp {Number(selectedOrder?.subtotal || 0).toLocaleString("id-ID")}</p>
                            <p className="text-green-600">Discount: {selectedOrder?.discount_percent}% (-Rp {Number(selectedOrder?.discount_amount || 0).toLocaleString("id-ID")})</p>
                            <p className="font-bold text-lg">Total: Rp {Number(selectedOrder?.total || 0).toLocaleString("id-ID")}</p>
                            <p className="text-green-600 font-bold">Points Earned: +{selectedOrder?.points_earned}</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDetailOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
