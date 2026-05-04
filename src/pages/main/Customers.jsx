import React from "react";
import PageHeader from "../../components/pageHeader";
// TAMBAHAN: Import Link
import { Link } from "react-router-dom"; 

const Customers = () => {
  const customersData = Array.from({ length: 30 }, (_, i) => ({
    // Kita buat ID numerik di belakang agar bisa dipakai untuk API dummyjson (1-30)
    id: i + 1, 
    displayId: `CUST-${2000 + i}`,
    customerName: ["Lukmanul Hakim", "Budi Santoso", "Siti Aminah", "Andi Wijaya", "Rina Rose"][i % 5],
    email: `user${i}@example.com`,
    phone: `0812345678${i.toString().padStart(2, '0')}`,
    loyalty: ["Bronze", "Silver", "Gold"][i % 3]
  }));

  return (
    <div className="p-4">
      <PageHeader title="Customers" breadcrumb="Dashboard / Customers">
         <span className="hidden sm:inline-block bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
            Total: 30 Users
         </span>
      </PageHeader>
      
      <div className="bg-white rounded-xl shadow-md overflow-x-auto border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b text-gray-600">
              <th className="p-4 font-bold">Customer ID</th>
              <th className="p-4 font-bold">Name</th>
              <th className="p-4 font-bold">Email</th>
              <th className="p-4 font-bold">Phone</th>
              <th className="p-4 font-bold">Loyalty</th>
            </tr>
          </thead>
          <tbody>
            {customersData.map((cust) => (
              <tr key={cust.id} className="border-b hover:bg-gray-50 transition-colors">
                {/* UBAH DI SINI: Menambahkan Link sesuai Gambar 2 modul */}
                <td className="p-4">
                  <Link 
                    to={`/products/${cust.id}`} 
                    className="text-green-600 font-bold hover:text-green-800 underline decoration-dotted"
                  >
                    {cust.displayId}
                  </Link>
                </td>
                <td className="p-4 font-medium">{cust.customerName}</td>
                <td className="p-4 text-gray-600">{cust.email}</td>
                <td className="p-4 text-gray-600">{cust.phone}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    cust.loyalty === 'Gold' ? 'bg-yellow-100 text-yellow-700' : 
                    cust.loyalty === 'Silver' ? 'bg-slate-200 text-slate-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {cust.loyalty}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;