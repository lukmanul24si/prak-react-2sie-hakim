import React from "react";
import { NavLink } from "react-router-dom";
// Sesuaikan import icon dengan yang kamu install, biasanya Md atau Fa
import { MdDashboard, MdShoppingCart, MdPeople, MdErrorOutline } from "react-icons/md";

const Sidebar = () => {
  // Style dasar untuk menu yang sedang aktif
  const activeLink = "flex items-center gap-3 px-4 py-3 bg-green-100 text-green-600 rounded-lg font-medium transition-all";
  const normalLink = "flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-100 rounded-lg transition-all";

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-4 flex flex-col gap-2">
      <div className="mb-8 px-4">
        <h1 className="text-2xl font-bold text-green-600">Sedap.</h1>
        <p className="text-xs text-gray-400">Modern Admin Dashboard</p>
      </div>

      {/* Menu Utama */}
      <NavLink to="/" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
        <MdDashboard size={20} />
        <span>Dashboard</span>
      </NavLink>

      <NavLink to="/orders" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
        <MdShoppingCart size={20} />
        <span>Orders</span>
      </NavLink>

      <NavLink to="/customers" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
        <MdPeople size={20} />
        <span>Customers</span>
      </NavLink>

      {/* Bagian Latihan Error (Sesuai Instruksi Tugas) */}
      <div className="mt-6">
        <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
          Latihan Error
        </p>
        
        <NavLink to="/error-400" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
          <MdErrorOutline size={20} />
          <span>Error 400</span>
        </NavLink>

        <NavLink to="/error-401" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
          <MdErrorOutline size={20} />
          <span>Error 401</span>
        </NavLink>

        <NavLink to="/error-403" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
          <MdErrorOutline size={20} />
          <span>Error 403</span>
        </NavLink>
      </div>

      {/* Footer Sidebar (Optional) */}
      <div className="mt-auto p-4 bg-green-500 rounded-xl text-white text-sm">
        <p>Please organize your menus through button below!</p>
        <button className="mt-2 w-full py-2 bg-white text-green-600 rounded-lg font-bold">
          + Add Menus
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;