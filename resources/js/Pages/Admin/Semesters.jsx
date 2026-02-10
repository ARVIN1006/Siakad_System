import React, { useEffect, useState } from "react";
import AuthLayout from "../../Layouts/AuthLayout";
import {
    Calendar,
    Plus,
    Edit2,
    Trash2,
    X,
    Check,
    Search,
    ToggleLeft,
    ToggleRight,
} from "lucide-react";
import axios from "axios";

const Semesters = () => {
    const [semesters, setSemesters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({
        nama_semester: "",
        tahun_ajaran: "",
        jenis: "Ganjil",
        status_aktif: false,
        tanggal_mulai: "",
        tanggal_selesai: "",
    });

    const fetchSemesters = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/admin/semesters");
            setSemesters(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSemesters();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(
                    `/api/admin/semesters/${selectedItem.id}`,
                    formData,
                );
            } else {
                await axios.post("/api/admin/semesters", formData);
            }
            setShowModal(false);
            fetchSemesters();
        } catch (err) {
            alert(err.response?.data?.message || "Gagal menyimpan semester");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Hapus semester ini?")) return;
        try {
            await axios.delete(`/api/admin/semesters/${id}`);
            fetchSemesters();
        } catch (err) {
            alert("Gagal menghapus");
        }
    };

    const openEditModal = (item) => {
        setIsEditing(true);
        setSelectedItem(item);
        setFormData({
            ...item,
            tanggal_mulai: item.tanggal_mulai?.split("T")[0] || "",
            tanggal_selesai: item.tanggal_selesai?.split("T")[0] || "",
        });
        setShowModal(true);
    };

    return (
        <AuthLayout>
            <div className="space-y-6">
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            Manajemen Semester
                        </h1>
                        <p className="text-gray-500 font-medium">
                            Buka dan tutup periode perkuliahan.
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setIsEditing(false);
                            setFormData({
                                nama_semester: "",
                                tahun_ajaran: "",
                                jenis: "Ganjil",
                                status_aktif: false,
                                tanggal_mulai: "",
                                tanggal_selesai: "",
                            });
                            setShowModal(true);
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all text-sm"
                    >
                        <Plus className="w-4 h-4" /> Buka Semester Baru
                    </button>
                </header>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">
                                    Tahun Ajaran
                                </th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">
                                    Semester
                                </th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 text-center">
                                    Periode
                                </th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 text-center">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 text-center">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="p-12 text-center text-gray-400"
                                    >
                                        Memuat...
                                    </td>
                                </tr>
                            ) : (
                                semesters.map((sem) => (
                                    <tr
                                        key={sem.id}
                                        className="hover:bg-gray-50/50"
                                    >
                                        <td className="px-6 py-4 font-bold text-gray-900">
                                            {sem.tahun_ajaran}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-600">
                                            {sem.nama_semester} ({sem.jenis})
                                        </td>
                                        <td className="px-6 py-4 text-center text-xs text-gray-500 font-bold">
                                            {sem.tanggal_mulai} s/d{" "}
                                            {sem.tanggal_selesai}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {sem.status_aktif ? (
                                                <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 w-fit mx-auto">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-600" />{" "}
                                                    Aktif
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 bg-gray-50 text-gray-400 rounded-full text-[10px] font-black uppercase tracking-widest w-fit mx-auto block">
                                                    Draft
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        openEditModal(sem)
                                                    }
                                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(sem.id)
                                                    }
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden border border-gray-100">
                        <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50 uppercase tracking-tighter">
                            <h3 className="text-xl font-bold text-gray-900">
                                {isEditing
                                    ? "Edit Semester"
                                    : "Buka Semester Baru"}
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-xl"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-5">
                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                        Tahun Ajaran
                                    </label>
                                    <input
                                        required
                                        placeholder="2024/2025"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold"
                                        value={formData.tahun_ajaran}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                tahun_ajaran: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                        Jenis
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold"
                                        value={formData.jenis}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                jenis: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="Ganjil">Ganjil</option>
                                        <option value="Genap">Genap</option>
                                        <option value="Antara">Antara</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                    Nama Semester
                                </label>
                                <input
                                    required
                                    placeholder="Semester Ganjil 2024"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold"
                                    value={formData.nama_semester}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            nama_semester: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                        Tanggal Mulai
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold"
                                        value={formData.tanggal_mulai}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                tanggal_mulai: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                        Tanggal Selesai
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold"
                                        value={formData.tanggal_selesai}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                tanggal_selesai: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData({
                                            ...formData,
                                            status_aktif:
                                                !formData.status_aktif,
                                        })
                                    }
                                    className="text-blue-600"
                                >
                                    {formData.status_aktif ? (
                                        <ToggleRight className="w-10 h-10" />
                                    ) : (
                                        <ToggleLeft className="w-10 h-10 text-gray-300" />
                                    )}
                                </button>
                                <div>
                                    <p className="text-sm font-bold text-blue-900">
                                        Jadikan Semester Aktif
                                    </p>
                                    <p className="text-[10px] text-blue-600 font-medium leading-none">
                                        Menonaktifkan semester lain yang sedang
                                        berjalan.
                                    </p>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                            >
                                <Check className="w-4 h-4" />{" "}
                                {isEditing
                                    ? "Perbarui Semester"
                                    : "Simpan & Buka Semester"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </AuthLayout>
    );
};

export default Semesters;
