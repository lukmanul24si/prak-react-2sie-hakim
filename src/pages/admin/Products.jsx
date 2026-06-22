import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import PageHeader from "@/components/pageHeader";
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
import { ImSpinner2 } from "react-icons/im";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { MdEdit, MdDelete } from "react-icons/md";

const emptyForm = {
    name: "",
    description: "",
    price: "",
    stock: "",
    image_url: "",
    is_active: true,
};

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(emptyForm);

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {
        setLoading(true);
        setError("");
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) setError(error.message);
        else setProducts(data || []);
        setLoading(false);
    }

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    function openAdd() {
        setEditId(null);
        setForm(emptyForm);
        setDialogOpen(true);
    }

    function openEdit(product) {
        setEditId(product.id);
        setForm({
            name: product.name,
            description: product.description || "",
            price: String(product.price),
            stock: String(product.stock),
            image_url: product.image_url || "",
            is_active: product.is_active,
        });
        setDialogOpen(true);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const payload = {
            name: form.name,
            description: form.description,
            price: parseFloat(form.price),
            stock: parseInt(form.stock),
            image_url: form.image_url,
            is_active: form.is_active,
        };

        let result;
        if (editId) {
            result = await supabase.from("products").update(payload).eq("id", editId);
        } else {
            result = await supabase.from("products").insert(payload);
        }

        if (result.error) {
            setError(result.error.message);
        } else {
            setDialogOpen(false);
            loadProducts();
        }
        setLoading(false);
    }

    async function handleDelete(id) {
        if (!confirm("Yakin ingin menghapus produk ini?")) return;
        setLoading(true);
        const { error } = await supabase.from("products").delete().eq("id", id);
        if (error) setError(error.message);
        else loadProducts();
        setLoading(false);
    }

    return (
        <div className="p-4">
            <PageHeader title="Products" breadcrumb="Admin / Products">
                <Button onClick={openAdd} className="bg-green-600 hover:bg-green-700 text-white">
                    + Add Product
                </Button>
            </PageHeader>

            {error && (
                <div className="bg-red-100 mb-4 p-4 text-sm text-red-700 rounded-lg flex items-center gap-2">
                    <BsFillExclamationDiamondFill />
                    {error}
                </div>
            )}

            {loading && (
                <div className="flex justify-center p-8">
                    <ImSpinner2 className="animate-spin text-2xl text-green-600" />
                </div>
            )}

            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-bold">Name</TableHead>
                            <TableHead className="font-bold">Category</TableHead>
                            <TableHead className="font-bold">Price</TableHead>
                            <TableHead className="font-bold">Stock</TableHead>
                            <TableHead className="font-bold">Status</TableHead>
                            <TableHead className="font-bold text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((p) => (
                            <TableRow key={p.id}>
                                <TableCell className="font-medium">{p.name}</TableCell>
                                <TableCell>{p.description?.slice(0, 40) || "-"}</TableCell>
                                <TableCell>Rp {Number(p.price).toLocaleString("id-ID")}</TableCell>
                                <TableCell>{p.stock}</TableCell>
                                <TableCell>
                                    <Badge variant={p.is_active ? "default" : "secondary"}>
                                        {p.is_active ? "Active" : "Inactive"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="outline" size="sm" onClick={() => openEdit(p)}>
                                        <MdEdit /> Edit
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(p.id)}>
                                        <MdDelete /> Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {!loading && products.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-gray-400 py-8">
                                    No products yet. Add your first product!
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Add/Edit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editId ? "Edit Product" : "Add New Product"}</DialogTitle>
                        <DialogDescription>
                            {editId ? "Update product information below." : "Fill in the details for the new product."}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <Label>Product Name</Label>
                                <Input name="name" value={form.name} onChange={handleChange} required />
                            </div>
                            <div className="col-span-2">
                                <Label>Description</Label>
                                <Input name="description" value={form.description} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Price (Rp)</Label>
                                <Input name="price" type="number" value={form.price} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label>Stock</Label>
                                <Input name="stock" type="number" value={form.stock} onChange={handleChange} required />
                            </div>
                            <div className="col-span-2">
                                <Label>Image URL</Label>
                                <Input name="image_url" value={form.image_url} onChange={handleChange} placeholder="https://..." />
                            </div>
                            <div className="col-span-2 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    name="is_active"
                                    checked={form.is_active}
                                    onChange={handleChange}
                                    className="w-4 h-4"
                                />
                                <Label htmlFor="is_active">Active</Label>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white" disabled={loading}>
                                {loading ? "Saving..." : editId ? "Update" : "Save"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
