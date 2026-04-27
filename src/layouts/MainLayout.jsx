import { Outlet } from "react-router-dom";
import Header from "../components/Header";    // Gunakan ../ untuk keluar folder layouts
import Sidebar from "../components/Sidebar";  // Lalu masuk ke folder components
import PageHeader from "../components/pageHeader"; // Tambahan jika ingin dipakai


export default function MainLayout() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex-1 bg-gray-50 flex flex-col">
                <Header />

                {/* Area Konten Utama */}
                <main className="p-6 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}