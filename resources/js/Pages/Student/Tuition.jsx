import React, { useState, useEffect } from "react";
import AuthLayout from "../../Layouts/AuthLayout";
import {
    CreditCard,
    History,
    AlertCircle,
    Download,
    CheckCircle2,
    ChevronRight,
    Loader2,
} from "lucide-react";
import axios from "axios";

const Tuition = () => {
    const [tuitions, setTuitions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTuitions = async () => {
            try {
                const response = await axios.get("/api/student/tuition");
                setTuitions(response.data.data);
            } catch (err) {
                console.error("Failed to fetch tuitions", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTuitions();
    }, []);

    return (
        <AuthLayout>
            <div className="space-y-8">
                <header>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Pembayaran UKT
                    </h1>
                    <p className="text-gray-500 font-medium mt-1">
                        Pantau tagihan dan riwayat pembayaran uang kuliah
                        tunggal Anda.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Active Invoice */}
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider">
                            Tagihan Aktif
                        </h3>
                        {loading ? (
                            <div className="p-12 text-center bg-white rounded-2xl border border-gray-100">
                                <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
                            </div>
                        ) : tuitions.filter((t) => t.status === "Belum Bayar")
                              .length > 0 ? (
                            tuitions
                                .filter((t) => t.status === "Belum Bayar")
                                .map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white rounded-2xl border-2 border-blue-100 shadow-xl shadow-blue-50 overflow-hidden"
                                    >
                                        <div className="p-8">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <span className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                                                        Menunggu Pembayaran
                                                    </span>
                                                    <h4 className="text-xl font-bold text-gray-900 mt-2">
                                                        {item.semester}
                                                    </h4>
                                                    <p className="text-gray-400 text-sm font-medium">
                                                        {item.jenis}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[10px] text-gray-400 font-black uppercase tracking-wider mb-1">
                                                        Total Tagihan
                                                    </div>
                                                    <div className="text-3xl font-black text-blue-600">
                                                        Rp{" "}
                                                        {item.jumlah.toLocaleString(
                                                            "id-ID",
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                                <div>
                                                    <div className="text-[10px] text-gray-400 font-black uppercase tracking-wider mb-1">
                                                        Nomor Virtual Account
                                                        (VA)
                                                    </div>
                                                    <div className="text-lg font-black text-gray-900 tracking-widest">
                                                        {item.va}
                                                    </div>
                                                    <p className="text-xs text-blue-600 font-bold mt-1">
                                                        Bank BNI / Bank Mandiri
                                                    </p>
                                                </div>
                                                <div>
                                                    <div className="text-[10px] text-gray-400 font-black uppercase tracking-wider mb-1">
                                                        Batas Waktu
                                                    </div>
                                                    <div className="text-lg font-black text-red-600">
                                                        {item.jatuh_tempo}
                                                    </div>
                                                    <p className="text-xs text-gray-400 font-medium mt-1">
                                                        Pukul 23:59 WIB
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-8 py-4 bg-blue-50/50 border-t border-blue-50 flex items-center justify-between">
                                            <p className="text-xs text-blue-600 font-bold flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4" />
                                                Gunakan nomor VA di atas untuk
                                                melakukan pembayaran via
                                                ATM/M-Banking.
                                            </p>
                                            <button className="text-sm font-black text-blue-600 hover:text-blue-700 underline underline-offset-4">
                                                Cara Pembayaran
                                            </button>
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100 flex items-center gap-4">
                                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                                <div>
                                    <h4 className="font-extrabold text-emerald-900">
                                        Semua Tagihan Lunas
                                    </h4>
                                    <p className="text-emerald-700 text-sm font-medium">
                                        Anda tidak memiliki tagihan aktif saat
                                        ini. Tetap pertahankan!
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Desktop Sidebar - Payment History Summary */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider">
                            Riwayat Terakhir
                        </h3>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
                            {tuitions
                                .filter((t) => t.status === "Lunas")
                                .map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                                            <History className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start mb-1">
                                                <h5 className="font-bold text-gray-900 text-sm truncate pr-2">
                                                    {item.semester}
                                                </h5>
                                                <span className="text-[10px] text-emerald-600 font-black">
                                                    LUNAS
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <p className="text-xs text-gray-400 font-medium">
                                                    Rp{" "}
                                                    {item.jumlah.toLocaleString(
                                                        "id-ID",
                                                    )}
                                                </p>
                                                <button className="text-blue-600 hover:text-blue-700 transition-colors">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            <button className="w-full py-3 border-2 border-gray-50 rounded-xl text-xs font-black text-gray-400 hover:bg-gray-50 transition-colors">
                                Lihat Semua Riwayat
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Tuition;
