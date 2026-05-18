import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";

// Layouts
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

// Pages - Main
const Dashboard = React.lazy(() => import("./pages/main/Dashboard"));
const Orders = React.lazy(() => import("./pages/main/Orders"));
const Customers = React.lazy(() => import("./pages/main/Customers"));
const ErrorPage = React.lazy(() => import("./pages/main/ErrorPage"));
const Components = React.lazy(() => import("./pages/main/Components"));

// HANYA INI YANG DIPAKAI (Karena file ini yang ada di folder kamu)
const ProductDetail = React.lazy(() => import("./pages/main/ProductDetail"));

// Pages - Auth
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Loading = React.lazy(() => import("./components/Loading"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/components" element={<Components />} />

          {/* Gunakan ID dinamis untuk Product Detail sesuai modul */}
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* Route Error & Fallback */}
          <Route path="/error-400" element={<ErrorPage code="400" title="Bad Request" message="Permintaan tidak valid." />} />
          <Route path="/error-401" element={<ErrorPage code="401" title="Unauthorized" message="Maaf, Anda tidak memiliki izin." />} />
          <Route path="/error-403" element={<ErrorPage code="403" title="Forbidden" message="Akses ditolak." />} />
          <Route path="*" element={<ErrorPage code="404" title="Not Found" message="Halaman tidak ditemukan." />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;