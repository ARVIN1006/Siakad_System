import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const Navbar = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="bg-blue-600 p-1.5 rounded-lg">
                                <GraduationCap className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 tracking-tight font-sans">
                                SIAKAD
                            </span>
                        </Link>
                        <div className="hidden sm:ml-10 sm:flex sm:space-x-8 font-sans">
                            <Link
                                to="/"
                                className="border-transparent text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-semibold transition-colors"
                            >
                                Beranda
                            </Link>
                            <a
                                href="#"
                                className="border-transparent text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-semibold transition-colors"
                            >
                                Akademik
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 font-sans">
                        {token ? (
                            <Link
                                to="/dashboard"
                                className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-md text-sm font-bold hover:bg-blue-100 transition-all border border-blue-100 shadow-sm"
                            >
                                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                                Dashboard ({user.name?.split(" ")[0]})
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-600 hover:text-gray-900 font-bold text-sm"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    to="/login"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-blue-700 transition-all shadow-sm"
                                >
                                    Pendaftaran
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
