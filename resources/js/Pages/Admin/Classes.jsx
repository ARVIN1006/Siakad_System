import React, { useEffect, useState } from "react";
import AuthLayout from "../../Layouts/AuthLayout";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    X,
    Check,
    ClipboardList,
    User,
    BookOpen,
    MapPin,
    Clock,
} from "lucide-react";
import axios from "axios";

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [courses, setCourses] = useState([]);
    const [lecturers, setLecturers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({
        semester_id: "",
        mata_kuliah_id: "",
        dosen_id: "",
        nama_kelas: "",
        kuota: 40,
        schedules: [
            {
                hari: "Senin",
                jam_mulai: "08:00",
                jam_selesai: "10:30",
                ruangan: "",
            },
        ],
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [cRes, sRes, coRes, lRes] = await Promise.all([
                axios.get("/api/admin/classes"),
                axios.get("/api/admin/semesters"),
                axios.get("/api/admin/courses"),
                axios.get("/api/admin/users"), // filter for dosen later
            ]);
            setClasses(cRes.data.data);
            setSemesters(sRes.data.data);
            setCourses(coRes.data.data);
            setLecturers(
                lRes.data.data
                    .filter((u) => u.role?.name === "dosen")
                    .map((u) => ({ id: u.lecturer?.id, name: u.name })),
            );
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addSchedule = () =>
        setFormData({
            ...formData,
            schedules: [
                ...formData.schedules,
                {
                    hari: "Senin",
                    jam_mulai: "08:00",
                    jam_selesai: "10:30",
                    ruangan: "",
                },
            ],
        });
    const removeSchedule = (index) =>
        setFormData({
            ...formData,
            schedules: formData.schedules.filter((_, i) => i !== index),
        });
    const updateSch = (index, field, val) => {
        const newSch = [...formData.schedules];
        newSch[index][field] = val;
        setFormData({ ...formData, schedules: newSch });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(
                    `/api/admin/classes/${selectedItem.id}`,
                    formData,
                );
            } else {
                await axios.post("/api/admin/classes", formData);
            }
            setShowModal(false);
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || "Gagal menyimpan kelas");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Hapus kelas ini?")) return;
        try {
            await axios.delete(`/api/admin/classes/${id}`);
            fetchData();
        } catch (err) {
            alert("Gagal menghapus");
        }
    };

    return (
        <AuthLayout>
            <div className="space-y-6">
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            Jadwal & Kelas
                        </h1>
                        <p className="text-gray-500 font-medium">
                            Pengaturan rombongan belajar dan jadwal mingguan.
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setIsEditing(false);
                            setFormData({
                                semester_id: "",
                                mata_kuliah_id: "",
                                dosen_id: "",
                                nama_kelas: "",
                                kuota: 40,
                                schedules: [
                                    {
                                        hari: "Senin",
                                        jam_mulai: "08:00",
                                        jam_selesai: "10:30",
                                        ruangan: "",
                                    },
                                ],
                            });
                            setShowModal(true);
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all text-sm"
                    >
                        <Plus className="w-4 h-4" /> Buka Kelas Baru
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <div className="col-span-full py-12 text-center text-gray-400 font-bold">
                            Memuat data kelas...
                        </div>
                    ) : classes.length === 0 ? (
                        <div className="col-span-full py-12 text-center text-gray-400 font-bold">
                            Belum ada kelas yang dibuka.
                        </div>
                    ) : (
                        classes.map((cls) => (
                            <div
                                key={cls.id}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 space-y-4"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-black uppercase mb-1 inline-block">
                                            {cls.course?.kode_mk}
                                        </span>
                                        <h3 className="font-bold text-gray-900 leading-tight">
                                            {cls.course?.nama_mk} -{" "}
                                            {cls.nama_kelas}
                                        </h3>
                                    </div>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => {
                                                setIsEditing(true);
                                                setSelectedItem(cls);
                                                setFormData({
                                                    ...cls,
                                                    schedules: cls.schedules,
                                                });
                                                setShowModal(true);
                                            }}
                                            className="p-1.5 text-gray-400 hover:text-blue-600"
                                        >
                                            <Edit2 className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cls.id)}
                                            className="p-1.5 text-gray-400 hover:text-red-600"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm text-gray-500 font-medium">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 opacity-40" />{" "}
                                        {cls.lecturer?.nama_lengkap}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ClipboardList className="w-4 h-4 opacity-40" />{" "}
                                        Semester {cls.semester?.nama_semester}
                                    </div>
                                </div>

                                <div className="border-t border-gray-50 pt-3 space-y-2">
                                    {cls.schedules?.map((sch, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded-lg"
                                        >
                                            <div className="flex items-center gap-1.5 font-bold text-gray-600 uppercase">
                                                <Clock className="w-3 h-3" />{" "}
                                                {sch.hari},{" "}
                                                {sch.jam_mulai.substring(0, 5)}
                                            </div>
                                            <div className="flex items-center gap-1.5 font-black text-blue-600">
                                                <MapPin className="w-3 h-3" />{" "}
                                                {sch.ruangan}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-[10px] font-black uppercase text-gray-400">
                                        Kuota: {cls.jumlah_mahasiswa}/
                                        {cls.kuota}
                                    </span>
                                    <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-600"
                                            style={{
                                                width: `${(cls.jumlah_mahasiswa / cls.kuota) * 100}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col">
                        <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-xl font-bold text-gray-900">
                                {isEditing ? "Edit Kelas" : "Buka Kelas Baru"}
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-xl"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="p-8 space-y-5 overflow-y-auto"
                        >
                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                        Semester
                                    </label>
                                    <select
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold"
                                        value={formData.semester_id}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                semester_id: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">Pilih Semester</option>
                                        {semesters.map((s) => (
                                            <option key={s.id} value={s.id}>
                                                {s.nama_semester}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                        Nama Rombel / Kelas
                                    </label>
                                    <input
                                        required
                                        placeholder="Contoh: A, B, atau Reguler"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold"
                                        value={formData.nama_kelas}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                nama_kelas: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                    Mata Kuliah
                                </label>
                                <select
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold"
                                    value={formData.mata_kuliah_id}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            mata_kuliah_id: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Pilih Mata Kuliah</option>
                                    {courses.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            [{c.kode_mk}] {c.nama_mk}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                        Dosen Pengampu
                                    </label>
                                    <select
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold"
                                        value={formData.dosen_id}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                dosen_id: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">Pilih Dosen</option>
                                        {lecturers.map((l) => (
                                            <option key={l.id} value={l.id}>
                                                {l.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                        Kuota Mahasiswa
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold"
                                        value={formData.kuota}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                kuota: parseInt(e.target.value),
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                        Atur Jadwal & Ruangan
                                    </label>
                                    <button
                                        type="button"
                                        onClick={addSchedule}
                                        className="text-[10px] font-black uppercase text-blue-600 hover:underline"
                                    >
                                        Tambah Pertemuan
                                    </button>
                                </div>
                                {formData.schedules.map((sch, i) => (
                                    <div
                                        key={i}
                                        className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex flex-wrap gap-4 items-end relative"
                                    >
                                        {formData.schedules.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeSchedule(i)
                                                }
                                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        )}
                                        <div className="flex-1 min-w-[120px]">
                                            <label className="text-[9px] font-black text-gray-400 block mb-1">
                                                HARI
                                            </label>
                                            <select
                                                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold"
                                                value={sch.hari}
                                                onChange={(e) =>
                                                    updateSch(
                                                        i,
                                                        "hari",
                                                        e.target.value,
                                                    )
                                                }
                                            >
                                                <option>Senin</option>
                                                <option>Selasa</option>
                                                <option>Rabu</option>
                                                <option>Kamis</option>
                                                <option>Jumat</option>
                                                <option>Sabtu</option>
                                            </select>
                                        </div>
                                        <div className="flex-1 min-w-[100px]">
                                            <label className="text-[9px] font-black text-gray-400 block mb-1">
                                                MULAI
                                            </label>
                                            <input
                                                type="time"
                                                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold"
                                                value={sch.jam_mulai}
                                                onChange={(e) =>
                                                    updateSch(
                                                        i,
                                                        "jam_mulai",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="flex-1 min-w-[100px]">
                                            <label className="text-[9px] font-black text-gray-400 block mb-1">
                                                SELESAI
                                            </label>
                                            <input
                                                type="time"
                                                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold"
                                                value={sch.jam_selesai}
                                                onChange={(e) =>
                                                    updateSch(
                                                        i,
                                                        "jam_selesai",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="flex-1 min-w-[120px]">
                                            <label className="text-[9px] font-black text-gray-400 block mb-1">
                                                RUANGAN
                                            </label>
                                            <input
                                                placeholder="Gedung A-102"
                                                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold uppercase"
                                                value={sch.ruangan}
                                                onChange={(e) =>
                                                    updateSch(
                                                        i,
                                                        "ruangan",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 mt-4 hover:bg-blue-700 transition-all uppercase tracking-widest text-xs"
                            >
                                <Check className="w-4 h-4" />{" "}
                                {isEditing
                                    ? "Simpan Perubahan"
                                    : "Buka Kelas & Jadwal"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </AuthLayout>
    );
};

export default Classes;
