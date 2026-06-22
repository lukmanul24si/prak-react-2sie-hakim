import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";

// Components (Non-lazy imports)
import Loading from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute";

// Layouts
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

// Pages - Main
const Dashboard = React.lazy(() => import("./pages/main/Dashboard"));
const Orders = React.lazy(() => import("./pages/main/Orders"));
const Customers = React.lazy(() => import("./pages/main/Customers"));
const ErrorPage = React.lazy(() => import("./pages/main/ErrorPage"));
const Components = React.lazy(() => import("./pages/main/Components"));
const FiturXyz = React.lazy(() => import("./pages/main/FiturXyz"));
const ProductDetail = React.lazy(() => import("./pages/main/ProductDetail"));
const Note = React.lazy(() => import("./pages/main/Note"));

// Pages - Member
const Catalog = React.lazy(() => import("./pages/main/Catalog"));
const Cart = React.lazy(() => import("./pages/main/Cart"));
const Checkout = React.lazy(() => import("./pages/main/Checkout"));
const MyOrders = React.lazy(() => import("./pages/main/MyOrders"));
const Profile = React.lazy(() => import("./pages/main/Profile"));

// Pages - Admin
const AdminProducts = React.lazy(() => import("./pages/admin/Products"));

// Pages - Auth
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Authentication Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* Main Application Routes */}
        <Route element={<MainLayout />}>
          {/* Public / Authenticated Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* Member Routes */}
          <Route path="/cart" element={
            <ProtectedRoute role="member"><Cart /></ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute role="member"><Checkout /></ProtectedRoute>
          } />
          <Route path="/my-orders" element={
            <ProtectedRoute role="member"><MyOrders /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute role="member"><Profile /></ProtectedRoute>
          } />

          {/* Legacy Routes (kept for compatibility) */}
          <Route path="/orders" element={
            <ProtectedRoute role="admin"><Orders /></ProtectedRoute>
          } />
          <Route path="/customers" element={
            <ProtectedRoute role="admin"><Customers /></ProtectedRoute>
          } />
          <Route path="/components" element={<Components />} />
          <Route path="/fiturxyz" element={<FiturXyz />} />
          <Route path="/note" element={<Note />} />

          {/* Admin Routes */}
          <Route path="/admin/products" element={
            <ProtectedRoute role="admin"><AdminProducts /></ProtectedRoute>
          } />
          <Route path="/admin/customers" element={
            <ProtectedRoute role="admin"><Customers /></ProtectedRoute>
          } />
          <Route path="/admin/orders" element={
            <ProtectedRoute role="admin"><Orders /></ProtectedRoute>
          } />

          {/* Error & Fallback Routes */}
          <Route path="/error-400" element={<ErrorPage code="400" title="Bad Request" message="Permintaan tidak valid." />} />
          <Route path="/error-401" element={<ErrorPage code="401" title="Unauthorized" message="Maaf, Anda tidak memiliki izin." />} />
          <Route path="/error-403" element={<ErrorPage code="403" title="Forbidden" message="Akses ditolak." />} />
          <Route path="*" element={<ErrorPage code="404" title="Not Found" message="Halaman tidak ditemukan." />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
