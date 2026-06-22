import React from "react";
import { NavLink } from "react-router-dom";
import { MdDashboard, MdShoppingCart, MdPeople, MdErrorOutline, MdFace3, Md4kPlus, MdStorefront, MdPerson, MdLocalOffer } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const Sidebar = () => {
  const { user, profile, isAdmin, signOut } = useAuth();
  const { totalItems } = useCart();

  const activeLink = "flex items-center gap-3 px-4 py-3 bg-green-100 text-green-600 rounded-lg font-medium transition-all";
  const normalLink = "flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-100 rounded-lg transition-all";

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-4 flex flex-col gap-2">
      <div className="mb-8 px-4">
        <h1 className="text-2xl font-bold text-green-600">Sedap.</h1>
        <p className="text-xs text-gray-400">
          {isAdmin ? "Admin Dashboard" : "Member Dashboard"}
        </p>
      </div>

      {/* === ADMIN MENU === */}
      {isAdmin && (
        <>
          <NavLink to="/" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <MdDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/admin/products" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <MdLocalOffer size={20} />
            <span>Products</span>
          </NavLink>

          <NavLink to="/admin/customers" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <MdPeople size={20} />
            <span>Customers</span>
          </NavLink>

          <NavLink to="/admin/orders" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <MdShoppingCart size={20} />
            <span>Orders</span>
          </NavLink>

          <NavLink to="/components" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <MdFace3 size={20} />
            <span>Components</span>
          </NavLink>

          <NavLink to="/catalog" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <MdStorefront size={20} />
            <span>Catalog</span>
          </NavLink>

          {/* Latihan Error */}
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
        </>
      )}

      {/* === MEMBER MENU === */}
      {!isAdmin && user && (
        <>
          <NavLink to="/" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <MdDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/catalog" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <MdStorefront size={20} />
            <span>Catalog</span>
          </NavLink>

          <NavLink to="/cart" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <HiOutlineShoppingBag size={20} />
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="ml-auto bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </NavLink>

          <NavLink to="/my-orders" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <MdShoppingCart size={20} />
            <span>My Orders</span>
          </NavLink>

          <NavLink to="/profile" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <MdPerson size={20} />
            <span>Profile</span>
          </NavLink>
        </>
      )}

      {/* === GUEST MENU === */}
      {!user && (
        <>
          <NavLink to="/catalog" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <MdStorefront size={20} />
            <span>Catalog</span>
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <MdPerson size={20} />
            <span>Login</span>
          </NavLink>
        </>
      )}

      {/* Footer Sidebar */}
      <div className="mt-auto p-4 bg-green-500 rounded-xl text-white text-sm">
        {user ? (
          <>
            <p className="mb-2">Hello, <b>{profile?.full_name || 'User'}</b></p>
            <p className="text-xs opacity-80 mb-2">
              {profile?.tier && `Tier: ${profile.tier} | Points: ${profile.points}`}
            </p>
            <button
              onClick={signOut}
              className="mt-2 w-full py-2 bg-white text-green-600 rounded-lg font-bold hover:bg-green-50 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <p>Welcome to Sedap Store!</p>
            <NavLink
              to="/register"
              className="mt-2 block text-center py-2 bg-white text-green-600 rounded-lg font-bold hover:bg-green-50 transition"
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;