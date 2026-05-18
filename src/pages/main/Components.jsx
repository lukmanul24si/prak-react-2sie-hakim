import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import Avatar from "../../components/Avatar";
import Container from "../../components/Container";
import Footer from "../../components/Footer";


export default function Components() {
    return (
        <Container className="bg-gray-200">

        <div id="dashboard-container" className="p-6">
            <PageHeader title="Components" />
            <p className="mb-6">Ini halaman Components</p>
            
            {/* Bagian Button */}
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
            
            {/* Bagian Badge */}
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

            <div className="mt-6 p-4 bg-gray-100 rounded-lg"></div>
                <p className="text-sm text-gray-500">Ini adalah contoh penggunaan Button dan Badge dalam sebuah card sederhana.</p>
                <div className="mt-4">
                    <Avatar name="Alice" />
                    <Avatar name="Hakim" />
                    <Avatar name="lewandoski" />
                </div>
            </div>
        </div>
        <Footer/>
        </Container>
    );
}