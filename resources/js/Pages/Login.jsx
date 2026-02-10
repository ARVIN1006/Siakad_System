import React, { useState } from "react";
import { GraduationCap, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("/api/login", formData);

            if (response.data.success) {
                // Store token and user data
                localStorage.setItem("token", response.data.data.token);
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.data.user),
                );

                // Set default axios header for future requests
                axios.defaults.headers.common["Authorization"] =
                    `Bearer ${response.data.data.token}`;

                navigate("/dashboard");
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Terjadi kesalahan saat login. Periksa username dan password Anda.",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <Link
                    to="/"
                    className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-xl mb-6"
                >
                    <GraduationCap className="h-10 w-10 text-white" />
                </Link>
                <h2 className="text-3xl font-extrabold text-gray-900 font-sans">
                    Masuk ke SIAKAD
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Gunakan akun akademik Anda untuk masuk
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                required
                                disabled={loading}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 px-3 focus:ring-blue-500 focus:border-blue-500 text-sm disabled:bg-gray-50 uppercase"
                                placeholder="Masukkan username"
                                value={formData.username}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        username: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                disabled={loading}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 px-3 focus:ring-blue-500 focus:border-blue-500 text-sm disabled:bg-gray-50"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Memproses...
                                </>
                            ) : (
                                "Masuk Portal"
                            )}
                        </button>
                    </form>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        Lupa password? Silakan hubungi Unit TIK di fakultas
                        masing-masing.
                    </p>
                    <p className="mt-2 text-[10px] text-gray-400">
                        Admin: admin | Mhs: 12345678 | Pwd: password
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
