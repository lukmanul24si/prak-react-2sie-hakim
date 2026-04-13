import React, { useState } from "react"; 
import { createRoot } from "react-dom/client";
import "./assets/tailwind.css";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import PageHeader from "./components/pageHeader";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders"; 
import Customers from "./pages/Customers"; 

function App() {
    const [activeMenu, setActiveMenu] = useState("Dashboard");
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="min-h-screen bg-latar font-poppins text-teks">
            <div className="flex min-h-screen flex-col lg:flex-row">
                <Sidebar setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
                
                <main className="flex-1 p-4 md:p-6 xl:p-8">
                    <Header setSearchQuery={setSearchQuery} />
                    
                    <div className="mt-6 space-y-6">
                        <PageHeader
                            title={activeMenu} 
                            subtitle={`Home / ${activeMenu}`}
                            actionLabel="Download Report"
                        />

                        {/* RENDER KONTEN UTAMA */}
                        {activeMenu === "Dashboard" && <Dashboard searchQuery={searchQuery} />}
                        {activeMenu === "Orders" && <Orders searchQuery={searchQuery} />}
                        {activeMenu === "Customers" && <Customers searchQuery={searchQuery} />}

                        {}
                        {!["Dashboard", "Orders", "Customers"].includes(activeMenu) && (
                            <div className="bg-white p-12 rounded-3xl shadow-sm text-center border-2 border-dashed border-teal-200">
                                <div className="text-5xl mb-4">🚀</div>
                                <h2 className="text-2xl font-bold text-teal-600 mb-2">
                                    Halaman {activeMenu} Berhasil Dibuat!
                                </h2>
                                <p className="text-gray-500 max-w-md mx-auto">
                                    Halo Admin! Ini adalah halaman otomatis untuk menu <b>{activeMenu}</b>. 
                                    Data sedang disiapkan oleh sistem Sedap untuk render yang lebih lengkap.
                                </p>
                                <div className="mt-6 inline-flex items-center px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-medium">
                                    <span className="relative flex h-2 w-2 mr-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                                    </span>
                                    Status: Menunggu Integrasi Database
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

createRoot(document.getElementById("root")).render(<App />);