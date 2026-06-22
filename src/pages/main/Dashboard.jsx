import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaStar, FaUsers, FaBox, FaChartLine } from "react-icons/fa";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
    const { profile, isAdmin, user } = useAuth();
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalDelivered: 0,
        totalCanceled: 0,
        totalRevenue: 0,
        totalCustomers: 0,
        totalProducts: 0,
        myPoints: 0,
        myTier: "bronze",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadStats();
    }, [user]);

    async function loadStats() {
        setLoading(true);
        try {
            if (isAdmin) {
                // Admin: all stats
                const [ordersRes, customersRes, productsRes] = await Promise.all([
                    supabase.from("orders").select("id, status, total"),
                    supabase.from("profiles").select("id", { count: "exact", head: true }),
                    supabase.from("products").select("id", { count: "exact", head: true }),
                ]);

                const orders = ordersRes.data || [];
                const completed = orders.filter(o => o.status === "completed");
                const canceled = orders.filter(o => o.status === "cancelled");
                const revenue = completed.reduce((sum, o) => sum + Number(o.total), 0);

                setStats({
                    totalOrders: orders.length,
                    totalDelivered: completed.length,
                    totalCanceled: canceled.length,
                    totalRevenue: revenue,
                    totalCustomers: customersRes.count || 0,
                    totalProducts: productsRes.count || 0,
                });
            } else if (user) {
                // Member: own stats
                const { data: myOrders } = await supabase
                    .from("orders")
                    .select("id, status, total, points_earned")
                    .eq("user_id", user.id);

                const orders = myOrders || [];
                setStats({
                    totalOrders: orders.length,
                    totalDelivered: orders.filter(o => o.status === "completed").length,
                    totalCanceled: orders.filter(o => o.status === "cancelled").length,
                    totalRevenue: orders.reduce((sum, o) => sum + Number(o.total), 0),
                    myPoints: profile?.points || 0,
                    myTier: profile?.tier || "bronze",
                });
            }
        } catch (err) {
            console.error("Error loading stats:", err);
        } finally {
            setLoading(false);
        }
    }

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Selamat Pagi, Admin!";
        if (hour < 18) return "Selamat Siang, Admin!";
        return "Selamat Malam, Admin!";
    };

    return (
        <div id="dashboard-container">
            {/* Page Header */}
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

            {/* Greeting */}
            <div style={{ color: '#00B074', fontWeight: '600', marginBottom: '20px', fontSize: '14px' }}>
                {getGreeting()} {user && `(${profile?.role || 'member'})`}
            </div>

            {/* Stats Grid */}
            <div id="dashboard-grid">
                <div id="dashboard-orders" className="stat-card">
                    <div id="orders-icon"><FaShoppingCart /></div>
                    <div id="orders-info">
                        <span id="orders-count">{stats.totalOrders}</span>
                        <span id="orders-text">Total Orders</span>
                    </div>
                </div>

                <div id="dashboard-delivered" className="stat-card">
                    <div id="delivered-icon"><FaTruck /></div>
                    <div id="delivered-info">
                        <span id="delivered-count">{stats.totalDelivered}</span>
                        <span id="delivered-text">{isAdmin ? "Completed" : "My Completed"}</span>
                    </div>
                </div>

                <div id="dashboard-canceled" className="stat-card">
                    <div id="canceled-icon"><FaBan /></div>
                    <div id="canceled-info">
                        <span id="canceled-count">{stats.totalCanceled}</span>
                        <span id="canceled-text">{isAdmin ? "Canceled" : "My Canceled"}</span>
                    </div>
                </div>

                <div id="dashboard-revenue" className="stat-card">
                    <div id="revenue-icon"><FaDollarSign /></div>
                    <div id="revenue-info">
                        <span id="revenue-amount">Rp {stats.totalRevenue.toLocaleString("id-ID")}</span>
                        <span id="revenue-text">{isAdmin ? "Total Revenue" : "Total Spent"}</span>
                    </div>
                </div>
            </div>

            {/* Additional Stats for Admin */}
            {isAdmin && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <FaUsers />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{stats.totalCustomers}</p>
                            <p className="text-xs text-gray-400">Total Customers</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                            <FaBox />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{stats.totalProducts}</p>
                            <p className="text-xs text-gray-400">Total Products</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Member Tier Info */}
            {!isAdmin && user && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                            <FaStar />
                        </div>
                        <div>
                            <p className="text-2xl font-bold capitalize">{stats.myTier}</p>
                            <p className="text-xs text-gray-400">Current Tier</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <FaChartLine />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{stats.myPoints}</p>
                            <p className="text-xs text-gray-400">Total Points</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
