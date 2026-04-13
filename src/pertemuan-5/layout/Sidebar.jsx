import React, { useState } from "react";
import { FaThLarge, FaList, FaHeadphonesAlt } from "react-icons/fa";

export default function Sidebar({ setActiveMenu, activeMenu }) {
    // TAMBAH: State untuk menampung daftar menu
    const [menuList, setMenuList] = useState([
        { id: "Dashboard", label: "Dashboard", icon: <FaThLarge /> },
        { id: "Orders", label: "Orders", icon: <FaList /> },
        { id: "Customers", label: "Customers", icon: <FaHeadphonesAlt /> }
    ]);
    const [inputValue, setInputValue] = useState("");

    // TAMBAH: Fungsi untuk menambah menu ke list secara nyata
    const handleAddMenu = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== "") {
            const newEntry = {
                id: inputValue, 
                label: inputValue, 
                icon: <FaList /> // Icon default untuk menu baru
            };
            
            setMenuList([...menuList, newEntry]); // Menambah menu baru ke array
            alert(`Menu "${inputValue}" berhasil ditambahkan ke Sidebar!`);
            setInputValue(""); 
        }
    };

    return (
        <div id="sidebar">
            <div id="sidebar-logo">
                <span id="logo-title">Sedap <b id="logo-dot">.</b></span>
                <span id="logo-subtitle">Modern Admin Dashboard</span>
            </div>

            <div id="sidebar-menu">
                <ul id="menu-list">
                    {/* Render menu secara dinamis dari state */}
                    {menuList.map((menu) => (
                        <li 
                            key={menu.id} 
                            onClick={() => setActiveMenu(menu.id)} 
                            className={activeMenu === menu.id ? "active" : ""}
                            style={{ 
                                cursor: 'pointer', 
                                background: activeMenu === menu.id ? "#e6f7f1" : "transparent",
                                padding: '10px',
                                borderRadius: '8px'
                            }}
                        >
                            <div className="flex items-center space-x-3">
                                {menu.icon}
                                <span>{menu.label}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div id="sidebar-footer">
                <div id="footer-card" style={{ padding: '15px', background: '#00B074', borderRadius: '12px' }}>
                    <div id="footer-text">
                        <span style={{ fontSize: '11px', color: 'white' }}>Tambah Menu & Enter:</span>
                        <input 
                            type="text" 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleAddMenu}
                            placeholder="Nama menu baru..."
                            className="mt-2 w-full p-2 rounded-md text-black text-xs outline-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}