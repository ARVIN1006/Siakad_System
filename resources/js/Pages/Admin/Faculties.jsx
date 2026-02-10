import React, { useEffect, useState } from "react";
import AuthLayout from "../../Layouts/AuthLayout";
import {
    Building2,
    Plus,
    Search,
    Edit2,
    Trash2,
    X,
    Check,
    GraduationCap,
    LayoutGrid,
} from "lucide-react";
import axios from "axios";

const Faculties = () => {
    const [activeTab, setActiveTab] = useState("faculties");
    const [faculties, setFaculties] = useState([]);
    const [majors, setMajors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Form State
    const [facultyForm, setFacultyForm] = useState({
        kode_fakultas: "",
        nama_fakultas: "",
        deskripsi: "",
        dekan: "",
        tahun_berdiri: new Date().getFullYear(),
        akreditasi: "A",
        status_aktif: true,
    });

    const [majorForm, setMajorForm] = useState({
        faculty_id: "",
        kode_prodi: "",
        nama_prodi: "",
        jenjang: "S1",
        kaprodi: "",
        gelar: "S.Kom",
        akreditasi: "A",
        kuota_mahasiswa: 100,
        status_aktif: true,
    });

    const [selectedItem, setSelectedItem] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [fRes, mRes] = await Promise.all([
                axios.get("/api/admin/faculties"),
                axios.get("/api/admin/majors"),
            ]);
            setFaculties(fRes.data.data);
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

    const handleFacultySubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(
                    `/api/admin/faculties/${selectedItem.id}`,
                    facultyForm,
                );
            } else {
                await axios.post("/api/admin/faculties", facultyForm);
            }
            setShowModal(false);
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || "Gagal menyimpan fakultas");
        }
    };

    const handleMajorSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(
                    `/api/admin/majors/${selectedItem.id}`,
                    majorForm,
                );
            } else {
                await axios.post("/api/admin/majors", majorForm);
            }
            setShowModal(false);
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || "Gagal menyimpan prodi");
        }
    };

    const handleDelete = async (id, type) => {
        if (
            !confirm(
                `Hapus ${type === "faculties" ? "Fakultas" : "Prodi"} ini?`,
            )
        )
            return;
        try {
            await axios.delete(`/api/admin/${type}/${id}`);
            fetchData();
        } catch (err) {
            alert("Gagal menghapus data");
        }
    };

    const openCreateModal = () => {
        setIsEditing(false);
        setSelectedItem(null);
        if (activeTab === "faculties") {
            setFacultyForm({
                kode_fakultas: "",
                nama_fakultas: "",
                deskripsi: "",
                dekan: "",
                tahun_berdiri: new Date().getFullYear(),
                akreditasi: "A",
                status_aktif: true,
            });
        } else {
            setMajorForm({
                faculty_id: "",
                kode_prodi: "",
                nama_prodi: "",
                jenjang: "S1",
                kaprodi: "",
                gelar: "S.Kom",
                akreditasi: "A",
                kuota_mahasiswa: 100,
                status_aktif: true,
            });
        }
        setShowModal(true);
    };

    const openEditModal = (item) => {
        setIsEditing(true);
        setSelectedItem(item);
        if (activeTab === "faculties") {
            setFacultyForm(item);
        } else {
            setMajorForm({
                ...item,
                faculty_id: item.faculty_id,
            });
        }
        setShowModal(true);
    };

    const filteredData =
        activeTab === "faculties"
            ? faculties.filter((f) =>
                  f.nama_fakultas
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
              )
            : majors.filter((m) =>
                  m.nama_prodi.toLowerCase().includes(searchTerm.toLowerCase()),
              );

    return (
        <AuthLayout>
            <div className="space-y-6">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            Manajemen Fakultas & Prodi
                        </h1>
                        <p className="text-gray-500 font-medium">
                            Pengelolaan departemen dan program studi akademik.
                        </p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all text-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Tambah{" "}
                        {activeTab === "faculties" ? "Fakultas" : "Prodi"}
                    </button>
                </header>

                {/* Tabs */}
                <div className="flex p-1 bg-gray-100 rounded-2xl w-fit">
                    <button
                        onClick={() => {
                            setActiveTab("faculties");
                            setSearchTerm("");
                        }}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === "faculties" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                    >
                        <Building2 className="w-4 h-4" />
                        Fakultas
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("majors");
                            setSearchTerm("");
                        }}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === "majors" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                    >
                        <GraduationCap className="w-4 h-4" />
                        Program Studi
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder={`Cari ${activeTab === "faculties" ? "fakultas" : "prodi"}...`}
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
                                {activeTab === "faculties" ? (
                                    <tr>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                                            Fakultas
                                        </th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                                            Dekan
                                        </th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">
                                            Jml Prodi
                                        </th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">
                                            Akreditasi
                                        </th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">
                                            Aksi
                                        </th>
                                    </tr>
                                ) : (
                                    <tr>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                                            Prodi
                                        </th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                                            Fakultas
                                        </th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">
                                            Jenjang
                                        </th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">
                                            Aksi
                                        </th>
                                    </tr>
                                )}
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-6 py-12 text-center text-gray-400"
                                        >
                                            Memuat data...
                                        </td>
                                    </tr>
                                ) : filteredData.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-6 py-12 text-center text-gray-400"
                                        >
                                            Tidak ada data.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50/50 transition-colors"
                                        >
                                            {activeTab === "faculties" ? (
                                                <>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                                                <Building2 className="w-4 h-4" />
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-gray-900 leading-none mb-1">
                                                                    {
                                                                        item.nama_fakultas
                                                                    }
                                                                </div>
                                                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                                                                    {
                                                                        item.kode_fakultas
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-600">
                                                        {item.dekan || "-"}
                                                    </td>
                                                    <td className="px-6 py-4 text-center font-bold text-gray-900">
                                                        {item.majors_count || 0}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[10px] font-black uppercase">
                                                            {item.akreditasi}
                                                        </span>
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                                                                <GraduationCap className="w-4 h-4" />
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-gray-900 leading-none mb-1">
                                                                    {
                                                                        item.nama_prodi
                                                                    }
                                                                </div>
                                                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                                                                    {
                                                                        item.kode_prodi
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-xs font-bold text-gray-500">
                                                        {
                                                            item.faculty
                                                                ?.nama_fakultas
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4 text-center text-sm font-bold text-blue-600">
                                                        {item.jenjang}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span
                                                            className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${item.status_aktif ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
                                                        >
                                                            {item.status_aktif
                                                                ? "Aktif"
                                                                : "Nonaktif"}
                                                        </span>
                                                    </td>
                                                </>
                                            )}
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() =>
                                                            openEditModal(item)
                                                        }
                                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id,
                                                                activeTab,
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
                    <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden border border-gray-100">
                        <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-xl font-bold text-gray-900">
                                {isEditing ? "Edit" : "Tambah"}{" "}
                                {activeTab === "faculties"
                                    ? "Fakultas"
                                    : "Prodi"}
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-xl"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        {activeTab === "faculties" ? (
                            <form
                                onSubmit={handleFacultySubmit}
                                className="p-8 space-y-4"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                            Kode
                                        </label>
                                        <input
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold uppercase"
                                            value={facultyForm.kode_fakultas}
                                            onChange={(e) =>
                                                setFacultyForm({
                                                    ...facultyForm,
                                                    kode_fakultas:
                                                        e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                            Akreditasi
                                        </label>
                                        <input
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold uppercase"
                                            value={facultyForm.akreditasi}
                                            onChange={(e) =>
                                                setFacultyForm({
                                                    ...facultyForm,
                                                    akreditasi: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                        Nama Fakultas
                                    </label>
                                    <input
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold"
                                        value={facultyForm.nama_fakultas}
                                        onChange={(e) =>
                                            setFacultyForm({
                                                ...facultyForm,
                                                nama_fakultas: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                        Dekan
                                    </label>
                                    <input
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold"
                                        value={facultyForm.dekan || ""}
                                        onChange={(e) =>
                                            setFacultyForm({
                                                ...facultyForm,
                                                dekan: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 mt-4 hover:bg-blue-700 transition-all"
                                >
                                    <Check className="w-4 h-4" /> Simpan
                                    Fakultas
                                </button>
                            </form>
                        ) : (
                            <form
                                onSubmit={handleMajorSubmit}
                                className="p-8 space-y-4"
                            >
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                        Fakultas
                                    </label>
                                    <select
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold"
                                        value={majorForm.faculty_id}
                                        onChange={(e) =>
                                            setMajorForm({
                                                ...majorForm,
                                                faculty_id: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">Pilih Fakultas</option>
                                        {faculties.map((f) => (
                                            <option key={f.id} value={f.id}>
                                                {f.nama_fakultas}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                            Kode Prodi
                                        </label>
                                        <input
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold uppercase"
                                            value={majorForm.kode_prodi}
                                            onChange={(e) =>
                                                setMajorForm({
                                                    ...majorForm,
                                                    kode_prodi: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                            Jenjang
                                        </label>
                                        <select
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold"
                                            value={majorForm.jenjang}
                                            onChange={(e) =>
                                                setMajorForm({
                                                    ...majorForm,
                                                    jenjang: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="D3">D3</option>
                                            <option value="S1">S1</option>
                                            <option value="S2">S2</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                        Nama Prodi
                                    </label>
                                    <input
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold"
                                        value={majorForm.nama_prodi}
                                        onChange={(e) =>
                                            setMajorForm({
                                                ...majorForm,
                                                nama_prodi: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 mt-4 hover:bg-blue-700 transition-all"
                                >
                                    <Check className="w-4 h-4" /> Simpan Prodi
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </AuthLayout>
    );
};

export default Faculties;
