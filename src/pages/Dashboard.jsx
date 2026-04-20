import React from 'react';
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";

export default function Dashboard() {
    // Fungsi Greeting Dinamis
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Selamat Pagi, Admin! ☀️";
        if (hour < 18) return "Selamat Siang, Admin! 🌤️";
        return "Selamat Malam, Admin! 🌙";
    };

    return (
        <div id="dashboard-container">
            {/* 1. Header Area (Breadcrumb) */}
            <div id="pageheader-container" style={{ marginBottom: '24px' }}>
                <div id="pageheader-left">
                    <h1 id="page-title">Dashboard</h1>
                    <div id="breadcrumb-links">
                        <span id="breadcrumb-home">Home</span>
                        <span id="breadcrumb-separator">/</span>
                        <span id="breadcrumb-current">Dashboard</span>
                    </div>
                </div>
            </div>

            {/* 2. Greeting Section */}
            <div style={{ color: '#00B074', fontWeight: '600', marginBottom: '20px', fontSize: '14px' }}>
                {getGreeting()}
            </div>

            {/* 3. Grid Stats Card (Efek Hover Otomatis via CSS) */}
            <div id="dashboard-grid">
                <div id="dashboard-orders" className="stat-card">
                    <div id="orders-icon"><FaShoppingCart /></div>
                    <div id="orders-info">
                        <span id="orders-count">75</span>
                        <span id="orders-text">Total Orders</span>
                    </div>
                </div>

                <div id="dashboard-delivered" className="stat-card">
                    <div id="delivered-icon"><FaTruck /></div>
                    <div id="delivered-info">
                        <span id="delivered-count">175</span>
                        <span id="delivered-text">Total Delivered</span>
                    </div>
                </div>

                <div id="dashboard-canceled" className="stat-card">
                    <div id="canceled-icon"><FaBan /></div>
                    <div id="canceled-info">
                        <span id="canceled-count">40</span>
                        <span id="canceled-text">Total Canceled</span>
                    </div>
                </div>

                <div id="dashboard-revenue" className="stat-card">
                    <div id="revenue-icon"><FaDollarSign /></div>
                    <div id="revenue-info">
                        <span id="revenue-amount">Rp.128</span>
                        <span id="revenue-text">Total Revenue</span>
                    </div>
                </div>
            </div>
        </div>
    );
}