// src/components/pageHeader.jsx
import React, { useState } from "react";

const PageHeader = ({ title, breadcrumb, children }) => {
  const [showForm, setShowForm] = useState(false);

  // Atribut untuk Form sesuai instruksi modul
  const fields = title === "Orders" 
    ? ["Order ID", "Customer Name", "Status", "Total Price", "Order Date"]
    : ["Customer ID", "Customer Name", "Email", "Phone", "Loyalty"];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1> {/* Prop Title */}
          <nav className="text-sm text-gray-500">{breadcrumb}</nav> {/* Prop Breadcrumb */}
        </div>
        
        <div className="flex gap-3 items-center">
          {children} {/* Prop Children (biasanya untuk search bar) */}
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            {showForm ? "Close Form" : `+ Add ${title === "Orders" ? "Orders" : "Customer"}`}
          </button>
        </div>
      </div>

      {/* Form yang muncul sesuai data JSON jika tombol diklik */}
      {showForm && (
        <div className="mt-4 p-6 bg-white rounded-xl border-2 border-green-500 shadow-md animate-in slide-in-from-top">
          <h3 className="font-bold text-lg mb-4">Form Tambah {title}</h3>
          <div className="grid grid-cols-2 gap-4">
            {fields.map((label) => (
              <div key={label}>
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <input type="text" className="mt-1 block w-full border rounded-md p-2" placeholder={`Input ${label}...`} />
              </div>
            ))}
          </div>
          <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md">Save</button>
        </div>
      )}
    </div>
  );
};

export default PageHeader;