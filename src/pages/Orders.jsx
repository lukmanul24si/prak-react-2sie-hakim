import React from "react";
import PageHeader from "../components/pageHeader";

const Orders = () => {
  // Generate 30 data JSON sesuai atribut modul
  const ordersData = Array.from({ length: 30 }, (_, i) => ({
    id: `ORD-${1000 + i}`,
    customerName: ["Lukmanul Hakim", "Budi Santoso", "Siti Aminah", "Andi Wijaya", "Rina Rose"][i % 5],
    status: ["Pending", "Completed", "Cancelled"][i % 3],
    totalPrice: `Rp ${(Math.random() * 500000 + 50000).toLocaleString('id-ID')}`,
    orderDate: `2024-05-${(i % 28) + 1}`
  }));

  return (
    <div className="p-4">
      {/* PageHeader dengan 3 Props: title, breadcrumb, dan children */}
      <PageHeader title="Orders" breadcrumb="Dashboard / Orders">
        {/* Children: Search Bar (Opsional sesuai desain dashboard) */}
        <input 
          type="text" 
          placeholder="Search orders..." 
          className="hidden md:block border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-green-400 outline-none"
        />
      </PageHeader>
      
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
            {ordersData.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50 transition-colors">
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