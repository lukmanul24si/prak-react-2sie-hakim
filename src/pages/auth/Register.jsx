import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { BsCheckCircleFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Register() {
    const { signUp } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [dataForm, setDataForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({ ...dataForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (dataForm.password !== dataForm.confirmPassword) {
            setError("Password dan konfirmasi password tidak cocok.");
            return;
        }

        if (dataForm.password.length < 6) {
            setError("Password minimal 6 karakter.");
            return;
        }

        setLoading(true);

        const { error } = await signUp({
            email: dataForm.email,
            password: dataForm.password,
            fullName: dataForm.fullName,
        });

        if (error) {
            setError(error.message || "Registrasi gagal.");
            setLoading(false);
            return;
        }

        setSuccess("Registrasi berhasil! Silakan cek email Anda untuk verifikasi, lalu login.");
        setDataForm({ fullName: "", email: "", password: "", confirmPassword: "" });
        setLoading(false);
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Create Your Account
            </h2>

            {error && (
                <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
                    <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-100 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
                    <BsCheckCircleFill className="text-green-600 me-2 text-lg" />
                    {success}
                </div>
            )}

            {loading && (
                <div className="bg-gray-200 mb-5 p-5 text-sm rounded flex items-center">
                    <ImSpinner2 className="me-2 animate-spin" />
                    Mohon Tunggu...
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={dataForm.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
                        placeholder="Lukmanul Hakim"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={dataForm.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
                        placeholder="you@example.com"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={dataForm.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
                        placeholder="********"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={dataForm.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
                        placeholder="********"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50"
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>

            <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-green-600 hover:underline font-semibold">
                    Login
                </Link>
            </div>
        </div>
    );
}

