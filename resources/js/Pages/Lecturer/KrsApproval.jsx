import React, { useState, useEffect } from "react";
import AuthLayout from "../../Layouts/AuthLayout";
import {
    CheckCircle,
    XCircle,
    Loader2,
    Search,
    Filter,
    MoreVertical,
    FileText,
    Calendar,
    User,
    BookOpen,
} from "lucide-react";
import axios from "axios";

const KrsApproval = () => {
    const [krsList, setKrsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchKrsData();
    }, []);

    const fetchKrsData = async () => {
        try {
            const response = await axios.get("/api/lecturer/krs-approval");
            setKrsList(response.data.data);
        } catch (err) {
            console.error("Failed to fetch KRS data", err);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        if (!confirm("Apakah Anda yakin ingin menyetujui KRS ini?")) return;

        setProcessingId(id);
        try {
            await axios.post(`/api/lecturer/krs-approval/${id}/approve`);
            // Refresh data or update local state
            setKrsList((prev) => prev.filter((item) => item.id !== id));
            // Show success toast (optional)
        } catch (err) {
            console.error("Failed to approve KRS", err);
            alert("Gagal menyetujui KRS");
        } finally {
            setProcessingId(null);
        }
    };

    const handleReject = async (id) => {
        const reason = prompt("Masukkan alasan penolakan:");
        if (reason === null) return; // Cancelled

        setProcessingId(id);
        try {
            await axios.post(`/api/lecturer/krs-approval/${id}/reject`, {
                reason,
            });
            setKrsList((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.error("Failed to reject KRS", err);
            alert("Gagal menolak KRS");
        } finally {
            setProcessingId(null);
        }
    };

    const filteredKrs = krsList.filter(
        (item) =>
            item.mahasiswa.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.nim.includes(searchTerm),
    );

    return (
        <AuthLayout>
            <div className="space-y-8">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            Persetujuan KRS
                        </h1>
                        <p className="text-gray-500 font-medium mt-1">
                            Kelola dan validasi rencana studi mahasiswa
                            bimbingan Anda.
                        </p>
                    </div>
                </header>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari Nama / NIM..."
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors">
                                <Filter className="w-4 h-4" />
                                Filter
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="p-12 text-center">
                            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-4" />
                            <p className="text-gray-400 font-medium">
                                Memuat data KRS...
                            </p>
                        </div>
                    ) : filteredKrs.length === 0 ? (
                        <div className="p-12 text-center">
                            <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-bold text-gray-900">
                                Tidak ada pengajuan
                            </h3>
                            <p className="text-gray-500 mt-1">
                                Belum ada mahasiswa yang mengajukan KRS saat
                                ini.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider">
                                        <th className="px-6 py-4 font-bold">
                                            Mahasiswa
                                        </th>
                                        <th className="px-6 py-4 font-bold">
                                            Semester
                                        </th>
                                        <th className="px-6 py-4 font-bold text-center">
                                            Total SKS
                                        </th>
                                        <th className="px-6 py-4 font-bold">
                                            Tanggal Pengajuan
                                        </th>
                                        <th className="px-6 py-4 font-bold text-right">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredKrs.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50/50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                                                        {item.mahasiswa
                                                            .substring(0, 2)
                                                            .toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900">
                                                            {item.mahasiswa}
                                                        </div>
                                                        <div className="text-xs text-gray-500 font-mono">
                                                            {item.nim}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                                    <Calendar className="w-4 h-4 text-gray-400" />
                                                    {item.semester}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-black">
                                                    {item.total_sks} SKS
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {item.tanggal_pengajuan}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleReject(
                                                                item.id,
                                                            )
                                                        }
                                                        disabled={
                                                            processingId ===
                                                            item.id
                                                        }
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                                        title="Tolak Pembayaran"
                                                    >
                                                        {processingId ===
                                                        item.id ? (
                                                            <Loader2 className="w-5 h-5 animate-spin" />
                                                        ) : (
                                                            <XCircle className="w-5 h-5" />
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleApprove(
                                                                item.id,
                                                            )
                                                        }
                                                        disabled={
                                                            processingId ===
                                                            item.id
                                                        }
                                                        className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 disabled:opacity-50 flex items-center gap-2"
                                                    >
                                                        {processingId ===
                                                        item.id ? (
                                                            <>
                                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                                Proses...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <CheckCircle className="w-4 h-4" />
                                                                Setujui
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AuthLayout>
    );
};

export default KrsApproval;
