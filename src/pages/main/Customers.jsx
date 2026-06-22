import React, { useState, useEffect } from "react";
import PageHeader from "../../components/pageHeader";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Table, TableHeader, TableBody, TableRow, TableHead, TableCell
} from "@/components/ui/table";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";
import {
    Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from "@/components/ui/select";
import { ImSpinner2 } from "react-icons/im";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { MdEdit, MdDelete } from "react-icons/md";

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({
        full_name: "",
        phone: "",
        address: "",
        role: "member",
    });

    useEffect(() => {
        loadCustomers();
    }, []);

    async function loadCustomers() {
        setLoading(true);
        setError("");
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) setError(error.message);
        else setCustomers(data || []);
        setLoading(false);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    function openEdit(customer) {
        setEditId(customer.id);
        setForm({
            full_name: customer.full_name || "",
            phone: customer.phone || "",
            address: customer.address || "",
            role: customer.role,
        });
        setDialogOpen(true);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!editId) return;
        setLoading(true);
        setError("");

        const { error } = await supabase
            .from("profiles")
            .update({
                full_name: form.full_name,
                phone: form.phone,
                address: form.address,
                role: form.role,
            })
            .eq("id", editId);

        if (error) setError(error.message);
        else {
            setDialogOpen(false);
            loadCustomers();
        }
        setLoading(false);
    }

    async function handleDelete(id) {
        if (!confirm("Yakin ingin menghapus customer ini?")) return;
        setLoading(true);
        const { error } = await supabase.from("profiles").delete().eq("id", id);
        if (error) setError(error.message);
        else loadCustomers();
        setLoading(false);
    }

    const tierBadge = (tier) => {
        const colors = {
            gold: "bg-yellow-100 text-yellow-700",
            silver: "bg-slate-200 text-slate-700",
            platinum: "bg-purple-100 text-purple-700",
            bronze: "bg-orange-100 text-orange-700",
        };
        return colors[tier] || "bg-gray-100 text-gray-700";
    };

    return (
        <div className="p-4">
            <PageHeader title="Customers" breadcrumb="Admin / Customers">
                <span className="hidden sm:inline-block bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                    Total: {customers.length} Users
                </span>
            </PageHeader>

            {error && (
                <div className="bg-red-100 mb-4 p-4 text-sm text-red-700 rounded-lg flex items-center gap-2">
                    <BsFillExclamationDiamondFill />
                    {error}
                </div>
            )}

            <div className="bg-white rounded-xl shadow-md overflow-x-auto border border-gray-100">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-bold">Name</TableHead>
                            <TableHead className="font-bold">Email</TableHead>
                            <TableHead className="font-bold">Phone</TableHead>
                            <TableHead className="font-bold">Role</TableHead>
                            <TableHead className="font-bold">Tier</TableHead>
                            <TableHead className="font-bold">Points</TableHead>
                            <TableHead className="font-bold text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8">
                                    <ImSpinner2 className="animate-spin text-xl text-green-600 mx-auto" />
                                </TableCell>
                            </TableRow>
                        )}
                        {customers.map((cust) => (
                            <TableRow key={cust.id}>
                                <TableCell className="font-medium">{cust.full_name || "-"}</TableCell>
                                <TableCell className="text-gray-600">{cust.email}</TableCell>
                                <TableCell className="text-gray-600">{cust.phone || "-"}</TableCell>
                                <TableCell>
                                    <Badge variant={cust.role === "admin" ? "default" : "secondary"}>
                                        {cust.role}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${tierBadge(cust.tier)}`}>
                                        {cust.tier}
                                    </span>
                                </TableCell>
                                <TableCell>{cust.points}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="outline" size="sm" onClick={() => openEdit(cust)}>
                                        <MdEdit /> Edit
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(cust.id)}>
                                        <MdDelete />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {!loading && customers.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-gray-400 py-8">
                                    No customers found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Edit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Customer</DialogTitle>
                        <DialogDescription>Update customer information below.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label>Full Name</Label>
                            <Input name="full_name" value={form.full_name} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Phone</Label>
                            <Input name="phone" value={form.phone} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Address</Label>
                            <Input name="address" value={form.address} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Role</Label>
                            <Select value={form.role} onValueChange={(val) => setForm(prev => ({ ...prev, role: val }))}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="member">Member</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white" disabled={loading}>
                                {loading ? "Saving..." : "Update"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Customers;