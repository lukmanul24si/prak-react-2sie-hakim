import React from 'react';

export default function Customers({ searchQuery }) {
  const customers = [
    { id: 1, name: "Lukmanul Hakim", email: "lukman@mail.com", phone: "0812345678" },
    { id: 2, name: "hakimwertu", email: "hakimwertu@mail.com", phone: "0898765432" },
    { id: 3, name: "Budi Santoso", email: "budi@mail.com", phone: "0855667788" },
  ];

  const filtered = customers.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-bold mb-4">Customer List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(c => (
          <div key={c.id} className="border p-4 rounded-xl flex items-center space-x-4 hover:border-teal-500 transition cursor-pointer">
            <div className="bg-teal-100 text-teal-600 w-12 h-12 rounded-full flex items-center justify-center font-bold">
              {c.name.charAt(0)}
            </div>
            <div>
              <h4 className="font-bold">{c.name}</h4>
              <p className="text-sm text-gray-500">{c.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}