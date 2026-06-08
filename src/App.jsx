import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";

// Components (Non-lazy imports should be at the very top if any)
import Loading from "./components/Loading";

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

// Pages - Auth
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Main Application Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/components" element={<Components />} />
          <Route path="/fiturxyz" element={<FiturXyz />} />
          <Route path="/note" element={<Note />} />
          
          {/* Dynamic Route for Product Detail */}
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* Error & Fallback Routes */}
          <Route path="/error-400" element={<ErrorPage code="400" title="Bad Request" message="Permintaan tidak valid." />} />
          <Route path="/error-401" element={<ErrorPage code="401" title="Unauthorized" message="Maaf, Anda tidak memiliki izin." />} />
          <Route path="/error-403" element={<ErrorPage code="403" title="Forbidden" message="Akses ditolak." />} />
          <Route path="*" element={<ErrorPage code="404" title="Not Found" message="Halaman tidak ditemukan." />} />
        </Route>

        {/* Authentication Routes */}
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