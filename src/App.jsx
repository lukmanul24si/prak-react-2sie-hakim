import { Routes, Route } from "react-router-dom";
import Header from "./layouts/Header";
import Sidebar from "./layouts/Sidebar";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import ErrorPage from "./pages/ErrorPage"; // Import komponen ErrorPage yang fleksibel

function App() {
  return (
    <div className="flex min-h-screen"> 
      {/* 1. Sidebar tetap di kiri */}
      <Sidebar />
      
      <div className="flex-1 bg-gray-50 flex flex-col">
        {/* 2. Header di atas */}
        <Header />
        
        {/* 3. Area Konten Utama */}
        <main className="p-6 flex-1">
          <Routes>
            {/* Route Utama */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />

            {/* Route Latihan Error (Sesuai tugas di gambar):
                Nanti di Sidebar, arahkan Link ke path di bawah ini.
            */}
            <Route 
              path="/error-400" 
              element={<ErrorPage code="400" title="Bad Request" message="Permintaan tidak valid, periksa kembali inputan Anda." />} 
            />
            <Route 
              path="/error-401" 
              element={<ErrorPage code="401" title="Unauthorized" message="Maaf, Anda tidak memiliki izin untuk mengakses halaman ini." />} 
            />
            <Route 
              path="/error-403" 
              element={<ErrorPage code="403" title="Forbidden" message="Akses ditolak secara permanen oleh sistem." />} 
            />
            
            {/* Route 404 (Fallback):
                Jika user mengetik URL sembarang (seperti /sekolah di gambarmu), 
                maka akan otomatis lari ke sini.
            */}
            <Route 
              path="*" 
              element={<ErrorPage code="404" title="Not Found" message="Halaman yang Anda cari tidak ditemukan atau telah dipindahkan." />} 
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;