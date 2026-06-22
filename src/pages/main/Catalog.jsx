import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import PageHeader from "@/components/pageHeader";
import { ImSpinner2 } from "react-icons/im";
import { BsCartPlus } from "react-icons/bs";

export default function Catalog() {
    const { user } = useAuth();
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("q") || "");
    const [addedId, setAddedId] = useState(null);

    useEffect(() => {
        loadProducts();
    }, [search]);

    async function loadProducts() {
        setLoading(true);
        let query = supabase
            .from("products")
            .select("*")
            .eq("is_active", true)
            .order("created_at", { ascending: false });

        if (search) {
            query = query.ilike("name", `%${search}%`);
        }

        const { data, error } = await query;
        if (!error) setProducts(data || []);
        setLoading(false);
    }

    function handleAddToCart(product) {
        if (!user) {
            alert("Silakan login terlebih dahulu untuk menambahkan ke keranjang.");
            return;
        }
        addToCart(product);
        setAddedId(product.id);
        setTimeout(() => setAddedId(null), 1500);
    }

    return (
        <div className="p-4">
            <PageHeader title="Product Catalog" breadcrumb="Catalog">
                <Input
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-64"
                />
            </PageHeader>

            {loading && (
                <div className="flex justify-center p-8">
                    <ImSpinner2 className="animate-spin text-2xl text-green-600" />
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                    >
                        <div className="h-48 bg-gray-50 flex items-center justify-center p-4">
                            <img
                                src={product.image_url || "/img/logo.jpg"}
                                alt={product.name}
                                className="max-h-full object-contain"
                            />
                        </div>
                        <div className="p-4">
                            <Badge variant="secondary" className="mb-2">{product.name.split(" ")[0]}</Badge>
                            <h3 className="font-semibold text-lg text-gray-800 mb-1">{product.name}</h3>
                            {product.description && (
                                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                            )}
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xl font-bold text-green-600">
                                    Rp {Number(product.price).toLocaleString("id-ID")}
                                </span>
                                <span className="text-xs text-gray-400">
                                    Stock: {product.stock}
                                </span>
                            </div>
                            <Button
                                className="w-full bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => handleAddToCart(product)}
                                disabled={product.stock === 0 || addedId === product.id}
                            >
                                {addedId === product.id ? (
                                    "Added!"
                                ) : product.stock === 0 ? (
                                    "Out of Stock"
                                ) : (
                                    <><BsCartPlus /> Add to Cart</>
                                )}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {!loading && products.length === 0 && (
                <div className="text-center py-16 text-gray-400">
                    <p className="text-lg">No products found.</p>
                </div>
            )}
        </div>
    );
}
