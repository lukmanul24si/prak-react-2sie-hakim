import { Routes, Route } from "react-router-dom";
//import MainLayout from "./layouts/MainLayout"; // Pastikan path benar
//import Dashboard from "./pages/main/Dashboard";
//import Orders from "./pages/main/Orders";
//import Customers from "./pages/main/Customers";
//import ErrorPage from "./pages/main/ErrorPage";
//import AuthLayout from "./layouts/AuthLayout";
//import Login from "./pages/auth/Login";
//import Register from "./pages/auth/Register";
//import Forgot from "./pages/auth/Forgot";
import React, { Suspense } from "react";
//import Loading from "./components/Loading";

const MainLayout = React.lazy(() => import("./layouts/MainLayout"))
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"))


const Dashboard = React.lazy(() => import("./pages/main/Dashboard"))
const Orders = React.lazy(() => import("./pages/main/Orders"))
const Customers = React.lazy(() => import("./pages/main/Customers"))
const ErrorPage = React.lazy(() => import("./pages/main/ErrorPage"))

const Login = React.lazy(() => import("./pages/auth/Login"))
const Register = React.lazy(() => import("./pages/auth/Register"))
const Forgot = React.lazy(() => import("./pages/auth/Forgot"))
const Loading = React.lazy(() => import("./components/Loading"))



function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Menggunakan MainLayout sebagai parent route */}
        <Route element={<MainLayout />}>
          {/* Route Utama */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />

          {/* Route Error Spesifik */}
          <Route
            path="/error-400"
            element={
              <ErrorPage
                code="400"
                title="Bad Request"
                message="Permintaan tidak valid, periksa kembali inputan Anda."
              />
            }
          />
          <Route
            path="/error-401"
            element={
              <ErrorPage
                code="401"
                title="Unauthorized"
                message="Maaf, Anda tidak memiliki izin untuk mengakses halaman ini."
              />
            }
          />
          <Route
            path="/error-403"
            element={
              <ErrorPage
                code="403"
                title="Forbidden"
                message="Akses ditolak secara permanen oleh sistem."
              />
            }
          />

          {/* Route 404 (Fallback) */}
          <Route
            path="*"
            element={
              <ErrorPage
                code="404"
                title="Not Found"
                message="Halaman yang Anda cari tidak ditemukan atau telah dipindahkan."
              />
            }
          />
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