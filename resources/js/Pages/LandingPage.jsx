import React from "react";
import Navbar from "../Components/Navbar";
import { BookOpen, CreditCard, ClipboardList, CheckCircle } from "lucide-react";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <main className="flex-grow">
                <section className="bg-white border-b border-gray-200 py-16 lg:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                Selamat Datang di{" "}
                                <span className="text-blue-600">SIAKAD</span>
                            </h1>
                            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                                Sistem Informasi Akademik Terintegrasi untuk
                                Mahasiswa, Dosen, dan Civitas Akademika.
                            </p>
                            <div className="mt-10 flex justify-center gap-4">
                                <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                                    Login Mahasiswa
                                </button>
                                <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                    Panduan Pengguna
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {[
                                {
                                    title: "Isi KRS",
                                    icon: BookOpen,
                                    desc: "Penyusunan rencana studi semester baru.",
                                },
                                {
                                    title: "Lihat Nilai",
                                    icon: ClipboardList,
                                    desc: "Cek KHS dan transkrip akademik lengkap.",
                                },
                                {
                                    title: "Pembayaran",
                                    icon: CreditCard,
                                    desc: "Informasi UKT dan riwayat pembayaran.",
                                },
                                {
                                    title: "Validasi",
                                    icon: CheckCircle,
                                    desc: "Persetujuan KRS otomatis oleh dosen wali.",
                                },
                            ].map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                        <feature.icon className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        {feature.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-8">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm font-medium">
                    &copy; 2026 SIAKAD Academy. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
