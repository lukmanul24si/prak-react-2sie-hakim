import React, { useState } from "react";
import PageHeader from "../../components/pageHeader";

const Orders = () => {
  // 1. Inisialisasi data awal dengan useState
  const initialData = Array.from({ length: 10 }, (_, i) => ({
    id: `ORD-${1000 + i}`,
    customerName: ["Lukmanul Hakim", "Budi Santoso", "Siti Aminah", "Andi Wijaya", "Rina Rose"][i % 5],
    status: ["Pending", "Completed", "Cancelled"][i % 3],
    totalPrice: `Rp ${(Math.random() * 500000 + 50000).toLocaleString('id-ID')}`,
    orderDate: `2024-05-${(i % 28) + 1}`
  }));

  const [orders, setOrders] = useState(initialData);
  
  // 2. State untuk form input
  const [formData, setFormData] = useState({
    id: "",
    customerName: "",
    status: "Pending",
    totalPrice: "",
    orderDate: ""
  });

  // 3. Fungsi Handle Input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 4. Fungsi Save (Handle Submit)
  const handleSave = (e) => {
    e.preventDefault(); // Mencegah reload halaman
    if (!formData.id || !formData.customerName) return alert("Isi data dengan lengkap!");

    const newOrder = {
      ...formData,
      totalPrice: `Rp ${Number(formData.totalPrice).toLocaleString('id-ID')}`
    };

    setOrders([newOrder, ...orders]); // Menambah data baru ke posisi paling atas
    
    // Reset form setelah simpan
    setFormData({ id: "", customerName: "", status: "Pending", totalPrice: "", orderDate: "" });
  };

  return (
    <div className="p-4">
      <PageHeader title="Orders" breadcrumb="Dashboard / Orders">
        <input 
          type="text" 
          placeholder="Search orders..." 
          className="hidden md:block border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-green-400 outline-none"
        />
      </PageHeader>
      
      {/* --- FORM TAMBAH ORDERS (Sesuai Gambar) --- */}
      <div className="bg-white p-6 rounded-xl border border-green-500 mb-6">
        <h3 className="font-bold mb-4">Form Tambah Orders</h3>
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs mb-1">Order ID</label>
            <input name="id" value={formData.id} onChange={handleChange} className="w-full border rounded p-2" placeholder="Contoh: 2100" />
          </div>
          <div>
            <label className="block text-xs mb-1">Customer Name</label>
            <input name="customerName" value={formData.customerName} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-xs mb-1">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full border rounded p-2">
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-xs mb-1">Total Price (Angka saja)</label>
            <input name="totalPrice" type="number" value={formData.totalPrice} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs mb-1">Order Date</label>
            <input name="orderDate" type="date" value={formData.orderDate} onChange={handleChange} className="w-1/2 border rounded p-2" />
          </div>
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-lg w-fit hover:bg-green-600">
            Save
          </button>
        </form>
      </div>

      {/* --- TABEL ORDERS --- */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b text-gray-600">
              <th className="p-4 font-bold">Order ID</th>
              <th className="p-4 font-bold">Customer Name</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold">Total Price</th>
              <th className="p-4 font-bold">Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-4 text-green-600 font-bold">{order.id}</td>
                <td className="p-4 font-medium">{order.customerName}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4 font-semibold text-gray-700">{order.totalPrice}</td>
                <td className="p-4 text-gray-500">{order.orderDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;