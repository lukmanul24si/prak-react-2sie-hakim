import PageHeader from "../../components/pageHeader";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import Avatar from "../../components/Avatar";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import ProductCard from "../../components/ProductCard";
import Table from "../../components/Table";

const headers = [
    "No",
    "Nama Produk",
    "Kategori",
    "Harga",
    "Aksi"
];

const products = [
    {
        id: 1,
        name: "Laptop Asus",
        category: "Elektronik",
        price: "Rp 8.000.000"
    },
    {
        id: 2,
        name: "Sepatu Sport",
        category: "Fashion",
        price: "Rp 450.000"
    },
    {
        id: 3,
        name: "Jam Tangan",
        category: "Aksesoris",
        price: "Rp 799.000"
    }
];

export default function Components() {
    return (
        <Container className="bg-gray-200">
            <div id="dashboard-container" className="p-6">
                <PageHeader title="Components" />
                <p className="mb-6">Ini halaman Components</p>

                <div className="mb-6 text-sm text-gray-500">
                    <p className="mb-2 font-medium">Contoh penggunaan Button dengan berbagai tipe:</p>
                    <div className="flex flex-wrap gap-2">
                        <Button type="danger">Hapus</Button>
                        <Button type="warning">Peringatan</Button>
                        <Button type="secondary">Batal</Button>
                        <Button type="success">Simpan</Button>
                        <Button type="primary">Submit</Button>
                        <Button>Default</Button>
                    </div>
                </div>

                <div className="mb-6 text-sm text-gray-500">
                    <p className="mb-2 font-medium">Contoh penggunaan Badge dengan berbagai tipe:</p>
                    <div className="flex flex-wrap gap-2">
                        <Badge type="primary">Primary</Badge>
                        <Badge type="secondary">Secondary</Badge>
                        <Badge type="success">Success</Badge>
                        <Badge type="danger">Danger</Badge>
                        <Badge type="warning">Warning</Badge>
                        <Badge>Default</Badge>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-500">Ini adalah contoh penggunaan Button dan Badge dalam sebuah card sederhana.</p>
                    <div className="mt-4">
                        <Avatar name="Alice" />
                        <Avatar name="Hakim" />
                        <Avatar name="lewandoski" />
                    </div>

                    <div className="mt-6">
                        <Card>
                            <h2 className="text-xl font-bold mb-2">Judul Card</h2>
                            <p className="text-gray-600 text-sm mb-4">Ini adalah isi dari card. Anda bisa menambahkan teks, gambar, atau komponen lainnya di sini.</p>
                            <Button type="primary">Lihat Detail</Button>
                        </Card>
                    </div>

                    <div className="mt-6">
                        <ProductCard
                            image="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                            title="Sepatu Sport"
                            category="Fashion"
                            price="Rp 450.000"
                            description="Sepatu sport modern dengan desain nyaman dan ringan untuk aktivitas sehari-hari."
                        />
                    </div>

                    <div className="mt-6">
                        <ProductCard
                            image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
                            title="Smartphone"
                            category="Elektronik"
                            price="Rp 4.500.000"
                            description="Smartphone dengan performa cepat, kamera jernih, dan baterai tahan lama."
                        />
                    </div>
                </div>

                <div className="mb-6 text-sm text-gray-500">
                    <p className="mb-2 font-medium">Contoh penggunaan Table dengan data produk:</p>
                    <Table headers={headers}>
                        {products.map((product, index) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="border px-4 py-3">
                                    {index + 1}
                                </td>
                                <td className="border px-4 py-3">
                                    {product.name}
                                </td>
                                <td className="border px-4 py-3">
                                    {product.category}
                                </td>
                                <td className="border px-4 py-3">
                                    {product.price}
                                </td>
                                <td className="border px-4 py-3">
                                    <button className="bg-blue-600 text-white px-3 py-1 rounded">
                                        Detail
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </Table>
                </div>

                <Footer />
            </div>
        </Container>
    );
}