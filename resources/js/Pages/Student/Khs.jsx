import React, { useEffect, useState } from "react";
import AuthLayout from "../../Layouts/AuthLayout";
import useApi from "../../Hooks/useApi";
import { ClipboardList, GraduationCap, Download, Loader2 } from "lucide-react";

const Khs = () => {
    const { loading, request } = useApi();
    const [khs, setKhs] = useState(null);

    const fetchKhs = async () => {
        try {
            const res = await request({
                method: "get",
                url: "/api/student/khs",
            });
            setKhs(res.data);
        } catch (err) {
            console.error("Failed to fetch KHS", err);
        }
    };

    useEffect(() => {
        fetchKhs();
    }, []);

    if (loading && !khs) {
        return (
            <AuthLayout>
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout>
            <div className="space-y-8">
                <header className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            Kartu Hasil Studi (KHS)
                        </h1>
                        <p className="text-gray-500 font-medium">
                            Lacak perkembangan nilai dan pencapaian akademik
                            Anda.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-all text-sm">
                        <Download className="w-4 h-4" /> Cetak KHS
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Summary Card */}
                    <div className="md:col-span-1 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-8">
                        <div>
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2">
                                IPS Semester Ini
                            </p>
                            <div className="text-5xl font-black text-gray-900 leading-none">
                                3.75
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400 font-bold uppercase text-[10px]">
                                    Total SKS
                                </span>
                                <span className="font-black text-gray-900">
                                    20
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400 font-bold uppercase text-[10px]">
                                    MK Lulus
                                </span>
                                <span className="font-black text-emerald-600">
                                    7
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Grades Table */}
                    <div className="md:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100 text-center">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider text-left">
                                        Mata Kuliah
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">
                                        SKS
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">
                                        Nilai Huruf
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">
                                        Bobot
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {(
                                    khs || [
                                        {
                                            kode_mk: "IF101",
                                            nama_mk: "Algoritma & Pemrograman",
                                            sks: 3,
                                            nilai_huruf: "A",
                                            bobot: 4.0,
                                        },
                                        {
                                            kode_mk: "IF102",
                                            nama_mk: "Struktur Data",
                                            sks: 3,
                                            nilai_huruf: "A-",
                                            bobot: 3.75,
                                        },
                                        {
                                            kode_mk: "IF103",
                                            nama_mk: "Basis Data Terdistribusi",
                                            sks: 3,
                                            nilai_huruf: "B+",
                                            bobot: 3.5,
                                        },
                                        {
                                            kode_mk: "IF104",
                                            nama_mk: "Sistem Operasi",
                                            sks: 3,
                                            nilai_huruf: "A",
                                            bobot: 4.0,
                                        },
                                    ]
                                ).map((item, idx) => (
                                    <tr
                                        key={idx}
                                        className="hover:bg-gray-50/50 transition-colors text-center"
                                    >
                                        <td className="px-6 py-4 text-left">
                                            <p className="text-sm font-bold text-gray-900">
                                                {item.nama_mk}
                                            </p>
                                            <p className="text-[10px] font-black text-gray-400 uppercase">
                                                {item.kode_mk}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                            {item.sks}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`
                                                px-3 py-1 rounded-full text-xs font-black
                                                ${item.nilai_huruf.startsWith("A") ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"}
                                            `}
                                            >
                                                {item.nilai_huruf}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                            {item.bobot.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Khs;
