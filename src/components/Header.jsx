import React, { useState } from "react"; 
import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc"; // PERBAIKAN: Gunakan react-icons/fc
import { SlSettings } from "react-icons/sl";

export default function Header({ setSearchQuery }) { 
    // State untuk jumlah notifikasi
    const [notifCount, setNotifCount] = useState(50);
    
    // State internal untuk input pencarian agar render cepat
    const [inputValue, setInputValue] = useState("");

    // Daftar saran otomatis
    const suggestions = ["Dashboard", "Orders", "Customers", "Revenue", "Settings"];

    // Fungsi handle perubahan input secara real-time
    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        if (setSearchQuery) {
            setSearchQuery(value); // Mengirim data pencarian ke parent (main/App)
        }
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            alert(`Mencari: "${inputValue}"...`);
        }
    };

    const handleNotifClick = () => {
        setNotifCount(0);
        alert("Notifikasi telah dibaca!");
    };

    return (
        <div id="header-container">
            {/* Search Bar dengan Autocomplete */}
            <div id="search-bar" style={{ position: 'relative' }}>
                <input
                    id="search-input"
                    type="text"
                    list="search-suggestions"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Search Here..."
                    onKeyDown={handleSearch}
                    autoComplete="off"
                />
                
                {/* Pilihan Otomatis */}
                <datalist id="search-suggestions">
                    {suggestions.map((item, index) => (
                        <option key={index} value={item} />
                    ))}
                </datalist>

                <FaSearch id="search-icon" />
            </div>

            {/* Bagian Ikon & Profil */}
            <div id="icons-container">
                <div 
                    id="notification-icon" 
                    onClick={handleNotifClick} 
                    style={{ cursor: 'pointer', position: 'relative' }}
                >
                    <FaBell />
                    {notifCount > 0 && (
                        <span id="notification-badge">{notifCount}</span>
                    )}
                </div>
                
                <div id="chart-icon" style={{ cursor: 'pointer' }}>
                    <FcAreaChart />
                </div>
                <div id="settings-icon" style={{ cursor: 'pointer' }}>
                    <SlSettings />
                </div>

                {/* Profil User */}
                <div id="profile-container">
                    <span id="profile-text">
                        Hello, <b>Lukmanul hakim</b>
                    </span>
                    <img
                        id="profile-avatar"
                        src="/img/hakim.jpeg"
                        alt="Profile avatar"
                        className="w-10 h-10 rounded-full"
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            </div>
        </div>
    );
}