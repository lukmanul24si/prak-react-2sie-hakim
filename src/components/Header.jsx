import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";
import { useAuth } from "@/contexts/AuthContext";

export default function Header({ setSearchQuery }) {
    const { user, profile, signOut } = useAuth();
    const navigate = useNavigate();

    const [notifCount] = useState(3);
    const [inputValue, setInputValue] = useState("");

    const suggestions = ["Dashboard", "Orders", "Customers", "Catalog", "Profile"];

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        if (setSearchQuery) {
            setSearchQuery(value);
        }
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            navigate(`/catalog?q=${encodeURIComponent(inputValue.trim())}`);
        }
    };

    const handleNotifClick = () => {
        alert("Notifications: No new notifications.");
    };

    const handleSignOut = async () => {
        await signOut();
        navigate("/login");
    };

    return (
        <div id="header-container">
            {/* Search Bar */}
            <div id="search-bar" style={{ position: 'relative' }}>
                <input
                    id="search-input"
                    type="text"
                    list="search-suggestions"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Search products..."
                    onKeyDown={handleSearch}
                    autoComplete="off"
                />
                <datalist id="search-suggestions">
                    {suggestions.map((item, index) => (
                        <option key={index} value={item} />
                    ))}
                </datalist>
                <FaSearch id="search-icon" />
            </div>

            {/* Icons & Profile */}
            <div id="icons-container">
                {user && (
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
                )}

                <div id="chart-icon" style={{ cursor: 'pointer' }}>
                    <FcAreaChart />
                </div>
                <div id="settings-icon" style={{ cursor: 'pointer' }}>
                    <SlSettings />
                </div>

                {/* Profile Section */}
                <div id="profile-container">
                    {user ? (
                        <>
                            <span id="profile-text">
                                Hello, <b>{profile?.full_name || 'User'}</b>
                            </span>
                            <img
                                id="profile-avatar"
                                src="/img/hakim.jpeg"
                                alt="Profile avatar"
                                className="w-10 h-10 rounded-full"
                                style={{ cursor: 'pointer' }}
                            />
                            <button
                                onClick={handleSignOut}
                                className="ml-2 p-2 text-gray-500 hover:text-red-500 transition"
                                title="Logout"
                            >
                                <FaSignOutAlt />
                            </button>
                        </>
                    ) : (
                        <span className="text-sm text-gray-500">Guest</span>
                    )}
                </div>
            </div>
        </div>
    );
}