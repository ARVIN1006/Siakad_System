import React, { useState, useEffect } from "react";
import AuthLayout from "../../Layouts/AuthLayout";
import {
    BookCheck,
    Search,
    Users,
    FileText,
    ChevronRight,
    Loader2,
    Save,
} from "lucide-react";
import axios from "axios";

const Grades = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedClass, setSelectedClass] = useState(null);
    const [students, setStudents] = useState([]);
    const [loadingStudents, setLoadingStudents] = useState(false);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get("/api/lecturer/classes");
                setClasses(response.data.data);
            } catch (err) {
                console.error("Failed to fetch classes", err);
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, []);

    const handleSelectClass = async (cls) => {
        setSelectedClass(cls);
        setLoadingStudents(true);
        try {
            const response = await axios.get(
                `/api/lecturer/classes/${cls.id}/students`,
            );
            setStudents(response.data.data);
        } catch (err) {
            console.error("Failed to fetch students", err);
        } finally {
            setLoadingStudents(false);
        }
    };

    return (
        <AuthLayout>
            <div className="space-y-8">
                <header>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Input Nilai Mahasiswa
                    </h1>
                    <p className="text-gray-500 font-medium mt-1">
                        Kelola dan input nilai akademik mahasiswa per mata
                        kuliah.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Class List */}
                    <div className="lg:col-span-1 space-y-4">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider">
                            Daftar Kelas Anda
                        </h3>
                        {loading ? (
                            <div className="p-12 text-center bg-white rounded-2xl border border-gray-100 italic text-gray-400">
                                <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-600" />
                                Memuat kelas...
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {classes.map((cls) => (
                                    <button
                                        key={cls.id}
                                        onClick={() => handleSelectClass(cls)}
                                        className={`w-full text-left p-4 rounded-2xl border transition-all ${
                                            selectedClass?.id === cls.id
                                                ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100"
                                                : "bg-white border-gray-100 text-gray-900 hover:border-blue-300 shadow-sm"
                                        }`}
                                    >
                                        <div
                                            className={`text-[10px] font-black uppercase mb-1 ${selectedClass?.id === cls.id ? "text-blue-100" : "text-blue-600"}`}
                                        >
                                            {cls.course?.kode_mk}
                                        </div>
                                        <div className="font-bold truncate">
                                            {cls.course?.nama_mk}
                                        </div>
                                        <div
                                            className={`flex items-center gap-3 mt-3 text-xs font-medium ${selectedClass?.id === cls.id ? "text-blue-100" : "text-gray-400"}`}
                                        >
                                            <span className="flex items-center gap-1">
                                                <Users className="w-3 h-3" />{" "}
                                                {cls.jumlah_mahasiswa} Mhs
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FileText className="w-3 h-3" />{" "}
                                                Kelas {cls.nama_kelas}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Grade Entry Table */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider">
                                {selectedClass
                                    ? `Input Nilai: ${selectedClass.course.nama_mk}`
                                    : "Pilih Kelas Terlebih Dahulu"}
                            </h3>
                            {selectedClass && (
                                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-100 hover:scale-[1.02] transition-transform">
                                    <Save className="w-4 h-4" />
                                    Simpan Semua
                                </button>
                            )}
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
                            {!selectedClass ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 p-12 text-center">
                                    <BookCheck className="w-16 h-16 mb-4 opacity-20" />
                                    <p className="font-medium">
                                        Silakan pilih kelas di sebelah kiri
                                        untuk mulai menginput nilai.
                                    </p>
                                </div>
                            ) : loadingStudents ? (
                                <div className="p-24 text-center">
                                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                                    <p className="text-gray-400 font-bold tracking-widest uppercase text-xs">
                                        Mengambil data mahasiswa...
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50/50 border-b border-gray-100">
                                            <tr>
                                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">
                                                    Mahasiswa
                                                </th>
                                                <th className="px-4 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider text-center">
                                                    Tugas (20%)
                                                </th>
                                                <th className="px-4 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider text-center">
                                                    UTS (30%)
                                                </th>
                                                <th className="px-4 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider text-center">
                                                    UAS (50%)
                                                </th>
                                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider text-center">
                                                    Nilai Akhir
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {students.map((student) => (
                                                <tr
                                                    key={student.id}
                                                    className="hover:bg-gray-50/50 transition-colors"
                                                >
                                                    <td className="px-6 py-4">
                                                        <div className="font-bold text-gray-900">
                                                            {
                                                                student.nama_lengkap
                                                            }
                                                        </div>
                                                        <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                                                            {student.nim}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <input
                                                            type="number"
                                                            className="w-16 mx-auto block text-center py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:border-blue-500 outline-none font-bold text-sm transition-all"
                                                            defaultValue={85}
                                                        />
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <input
                                                            type="number"
                                                            className="w-16 mx-auto block text-center py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:border-blue-500 outline-none font-bold text-sm transition-all"
                                                            defaultValue={78}
                                                        />
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <input
                                                            type="number"
                                                            className="w-16 mx-auto block text-center py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:border-blue-500 outline-none font-bold text-sm transition-all"
                                                            defaultValue={90}
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto border border-blue-100">
                                                            <span className="font-black text-blue-600 text-lg">
                                                                A
                                                            </span>
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
                </div>
            </div>
        </AuthLayout>
    );
};

export default Grades;
