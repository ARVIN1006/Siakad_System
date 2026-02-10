import React, { useEffect, useState } from "react";
import AuthLayout from "../../Layouts/AuthLayout";
import useApi from "../../Hooks/useApi";
import {
    BookOpen,
    AlertCircle,
    CheckCircle2,
    Loader2,
    Save,
    ShoppingCart,
    Trash2,
} from "lucide-react";

const Krs = () => {
    const { loading, request } = useApi();
    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [currentKrs, setCurrentKrs] = useState([]);

    const fetchData = async () => {
        try {
            const res = await request({
                method: "get",
                url: "/api/student/krs",
            });
            // res.data format: { current_krs: [], available_courses: [] }
            setCurrentKrs(res.data.current_krs || []);
            setCourses(res.data.available_courses || []);
        } catch (err) {
            console.error("Failed to fetch KRS data", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleCourse = (course) => {
        if (selectedCourses.find((c) => c.id === course.id)) {
            setSelectedCourses(
                selectedCourses.filter((c) => c.id !== course.id),
            );
        } else {
            setSelectedCourses([...selectedCourses, course]);
        }
    };

    const handleSubmit = async () => {
        if (selectedCourses.length === 0) return;
        try {
            await request({
                method: "post",
                url: "/api/student/krs",
                data: { course_ids: selectedCourses.map((c) => c.id) },
            });
            alert("KRS berhasil disimpan!");
            setSelectedCourses([]);
            fetchData();
        } catch (err) {
            alert(
                "Gagal menyimpan KRS: " +
                    (err.response?.data?.message || "Terjadi kesalahan."),
            );
        }
    };

    const totalSks = selectedCourses.reduce((sum, c) => sum + c.sks, 0);

    return (
        <AuthLayout>
            <div className="space-y-8">
                <header>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Kartu Rencana Studi (KRS)
                    </h1>
                    <p className="text-gray-500 font-medium">
                        Susun rencana studi Anda untuk semester ini.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Course Selection List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-gray-900">
                                    Daftar Mata Kuliah Tersedia
                                </h3>
                                <span className="text-xs text-gray-400 font-bold uppercase">
                                    {courses.length} MK
                                </span>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {loading && courses.length === 0 ? (
                                    <div className="p-12 flex justify-center">
                                        <Loader2 className="animate-spin text-blue-600" />
                                    </div>
                                ) : courses.length === 0 ? (
                                    <div className="p-12 text-center text-gray-400 font-medium italic">
                                        Tidak ada mata kuliah tersedia saat ini.
                                    </div>
                                ) : (
                                    courses.map((course) => (
                                        <div
                                            key={course.id}
                                            className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex gap-4 items-center">
                                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                                    <BookOpen className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900">
                                                        {course.nama_mk}
                                                    </h4>
                                                    <div className="flex gap-3 text-xs text-gray-400 font-bold mt-1">
                                                        <span>
                                                            {course.kode_mk}
                                                        </span>
                                                        <span>•</span>
                                                        <span>
                                                            {course.sks} SKS
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    toggleCourse(course)
                                                }
                                                className={`
                                                px-4 py-2 rounded-lg text-xs font-black transition-all
                                                ${
                                                    selectedCourses.find(
                                                        (c) =>
                                                            c.id === course.id,
                                                    )
                                                        ? "bg-red-50 text-red-600 hover:bg-red-100"
                                                        : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                                                }
                                            `}
                                            >
                                                {selectedCourses.find(
                                                    (c) => c.id === course.id,
                                                )
                                                    ? "Batal"
                                                    : "Pilih"}
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Selected Courses Summary */}
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
                            <div className="flex items-center gap-2 mb-6">
                                <ShoppingCart className="w-5 h-5 text-blue-600" />
                                <h3 className="font-bold text-gray-900">
                                    Mata Kuliah Pilihan
                                </h3>
                            </div>

                            {selectedCourses.length === 0 ? (
                                <div className="py-12 flex flex-col items-center text-center space-y-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                                        <AlertCircle className="w-6 h-6 text-gray-300" />
                                    </div>
                                    <p className="text-sm text-gray-400 font-medium italic">
                                        Belum ada mata kuliah yang dipilih.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-4 mb-8">
                                        {selectedCourses.map((course) => (
                                            <div
                                                key={course.id}
                                                className="flex justify-between items-start"
                                            >
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900 leading-tight">
                                                        {course.nama_mk}
                                                    </p>
                                                    <p className="text-[10px] text-gray-400 font-black">
                                                        {course.sks} SKS
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        toggleCourse(course)
                                                    }
                                                    className="text-red-300 hover:text-red-600 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-6 border-t border-gray-50 space-y-6">
                                        <div className="flex justify-between items-center text-gray-900">
                                            <span className="text-sm font-bold">
                                                Total SKS
                                            </span>
                                            <span className="text-xl font-black">
                                                {totalSks}
                                            </span>
                                        </div>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={loading}
                                            className="w-full py-4 bg-blue-600 text-white rounded-xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                                        >
                                            {loading ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Save className="w-4 h-4" />
                                            )}
                                            Simpan KRS
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Info Status */}
                        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex gap-4">
                            <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                            <p className="text-xs text-emerald-900 font-medium leading-relaxed">
                                Pastikan Anda berkonsultasi dengan Dosen
                                Pembimbing Akademik sebelum menyerahkan KRS.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Krs;
