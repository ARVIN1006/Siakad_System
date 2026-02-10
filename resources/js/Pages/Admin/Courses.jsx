import React, { useEffect, useState } from "react";
import AuthLayout from "../../Layouts/AuthLayout";
import {
    BookOpen,
    Plus,
    Search,
    Edit2,
    Trash2,
    X,
    Check,
    BookMarked,
    Layers,
} from "lucide-react";
import axios from "axios";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [majors, setMajors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({
        prodi_id: "",
        kode_mk: "",
        nama_mk: "",
        sks: 3,
        semester_ditawarkan: 1,
        jenis_mk: "Wajib",
        deskripsi: "",
        capaian_pembelajaran: "",
        prasyarat_id: null,
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [cRes, mRes] = await Promise.all([
                axios.get("/api/admin/courses"),
                axios.get("/api/admin/majors"),
            ]);
            setCourses(cRes.data.data);
            setMajors(mRes.data.data);
        } catch (err) {
            console.error("Fetch error", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(
                    `/api/admin/courses/${selectedItem.id}`,
                    formData,
                );
            } else {
                await axios.post("/api/admin/courses", formData);
            }
            setShowModal(false);
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || "Gagal menyimpan mata kuliah");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Hapus mata kuliah ini?")) return;
        try {
            await axios.delete(`/api/admin/courses/${id}`);
            fetchData();
        } catch (err) {
            alert("Gagal menghapus data");
        }
    };

    const openCreateModal = () => {
        setIsEditing(false);
        setSelectedItem(null);
        setFormData({
            prodi_id: "",
            kode_mk: "",
            nama_mk: "",
            sks: 3,
            semester_ditawarkan: 1,
            jenis_mk: "Wajib",
            deskripsi: "",
            capaian_pembelajaran: "",
            prasyarat_id: null,
        });
        setShowModal(true);
    };

    const openEditModal = (item) => {
        setIsEditing(true);
        setSelectedItem(item);
        setFormData({
            ...item,
            prodi_id: item.prodi_id,
            prasyarat_id: item.prasyarat_id,
        });
        setShowModal(true);
    };

    const filteredCourses = courses.filter(
        (c) =>
            c.nama_mk.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.kode_mk.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <AuthLayout>
            <div className="space-y-6">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            Manajemen Mata Kuliah
                        </h1>
                        <p className="text-gray-500 font-medium">
                            Pengelolaan kurikulum dan distribusi mata kuliah.
                        </p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all text-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Tambah Mata Kuliah
                    </button>
                </header>

                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari mata kuliah..."
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-100 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                                        Mata Kuliah
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                                        Prodi
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">
                                        SKS
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">
                                        SMT
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-6 py-12 text-center text-gray-400 font-medium"
                                        >
                                            Memuat data...
                                        </td>
                                    </tr>
                                ) : filteredCourses.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-6 py-12 text-center text-gray-400 font-medium"
                                        >
                                            Tidak ada data mata kuliah.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCourses.map((course) => (
                                        <tr
                                            key={course.id}
                                            className="hover:bg-gray-50/50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
                                                        <BookMarked className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900 leading-none mb-1">
                                                            {course.nama_mk}
                                                        </div>
                                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                                                            {course.kode_mk} •{" "}
                                                            {course.jenis_mk}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Layers className="w-3.5 h-3.5 text-gray-300" />
                                                    <span className="text-xs font-bold text-gray-500">
                                                        {
                                                            course.major
                                                                ?.nama_prodi
                                                        }
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center font-black text-gray-900">
                                                {course.sks}
                                            </td>
                                            <td className="px-6 py-4 text-center font-bold text-blue-600">
                                                {course.semester_ditawarkan}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() =>
                                                            openEditModal(
                                                                course,
                                                            )
                                                        }
                                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                course.id,
                                                            )
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
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden border border-gray-100">
                        <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-xl font-bold text-gray-900">
                                {isEditing
                                    ? "Edit Mata Kuliah"
                                    : "Tambah Mata Kuliah"}
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-xl"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                        Program Studi
                                    </label>
                                    <select
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold"
                                        value={formData.prodi_id}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                prodi_id: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">Pilih Prodi</option>
                                        {majors.map((m) => (
                                            <option key={m.id} value={m.id}>
                                                {m.nama_prodi}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                        Jenis MK
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold"
                                        value={formData.jenis_mk}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                jenis_mk: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="Wajib">Wajib</option>
                                        <option value="Pilihan">Pilihan</option>
                                        <option value="Universitas">
                                            Universitas
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                        Kode MK
                                    </label>
                                    <input
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold uppercase"
                                        placeholder="MK001"
                                        value={formData.kode_mk}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                kode_mk: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                        SKS
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold"
                                        value={formData.sks}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                sks: parseInt(e.target.value),
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                        Semester
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold"
                                        value={formData.semester_ditawarkan}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                semester_ditawarkan: parseInt(
                                                    e.target.value,
                                                ),
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                    Nama Mata Kuliah
                                </label>
                                <input
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold"
                                    placeholder="Algoritma & Pemrograman"
                                    value={formData.nama_mk}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            nama_mk: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                    Deskripsi Singkat
                                </label>
                                <textarea
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold h-24 resize-none"
                                    value={formData.deskripsi || ""}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            deskripsi: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 mt-4 hover:bg-blue-700 transition-all"
                            >
                                <Check className="w-4 h-4" /> Simpan Mata Kuliah
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </AuthLayout>
    );
};

export default Courses;
