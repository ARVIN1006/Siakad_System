import React, { useEffect, useState } from "react";
import AuthLayout from "../Layouts/AuthLayout";
import {
    GraduationCap,
    Loader2,
    Users,
    Building2,
    BookOpen,
    BookCheck,
    CalendarCheck,
    TrendingUp,
    AlertCircle,
    Calendar,
    ClipboardList,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = ({ user }) => {
    const [stats, setStats] = useState({
        students: 0,
        lecturers: 0,
        majors: 0,
        courses: 0,
        semesters: 0,
        classes: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [uRes, mRes, cRes, sRes, clRes] = await Promise.all([
                    axios.get("/api/admin/users"),
                    axios.get("/api/admin/majors"),
                    axios.get("/api/admin/courses"),
                    axios.get("/api/admin/semesters"),
                    axios.get("/api/admin/classes"),
                ]);

                const allUsers = uRes.data.data;
                setStats({
                    students: allUsers.filter(
                        (u) => u.role?.name === "mahasiswa",
                    ).length,
                    lecturers: allUsers.filter((u) => u.role?.name === "dosen")
                        .length,
                    majors: mRes.data.data.length,
                    courses: cRes.data.data.length,
                    semesters: sRes.data.data.length,
                    classes: clRes.data.data.length,
                });
            } catch (err) {
                console.error("Failed to fetch stats", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        {
            label: "Mahasiswa",
            value: stats.students,
            icon: Users,
            color: "blue",
            bg: "bg-blue-50",
            text: "text-blue-600",
        },
        {
            label: "Dosen",
            value: stats.lecturers,
            icon: GraduationCap,
            color: "emerald",
            bg: "bg-emerald-50",
            text: "text-emerald-600",
        },
        {
            label: "Program Studi",
            value: stats.majors,
            icon: Building2,
            color: "purple",
            bg: "bg-purple-50",
            text: "text-purple-600",
        },
        {
            label: "Mata Kuliah",
            value: stats.courses,
            icon: BookOpen,
            color: "amber",
            bg: "bg-amber-50",
            text: "text-amber-600",
        },
        {
            label: "Total Semester",
            value: stats.semesters,
            icon: Calendar,
            color: "pink",
            bg: "bg-pink-50",
            text: "text-pink-600",
        },
        {
            label: "Kelas Dibuka",
            value: stats.classes,
            icon: ClipboardList,
            color: "indigo",
            bg: "bg-indigo-50",
            text: "text-indigo-600",
        },
    ];

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    Dashboard Admin
                </h1>
                <p className="text-gray-500 font-medium mt-1">
                    Sistem Informasi Akademik Control Center.
                </p>
            </header>

            {loading ? (
                <div className="flex items-center justify-center p-12">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                    {cards.map((stat, i) => (
                        <div
                            key={i}
                            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div
                                className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}
                            >
                                <stat.icon className={`w-5 h-5 ${stat.text}`} />
                            </div>
                            <div className="text-xs text-gray-400 font-black uppercase tracking-widest mb-1">
                                {stat.label}
                            </div>
                            <div className="text-2xl font-black text-gray-900">
                                {stat.value}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-900">
                            Statistik Mahasiswa Per Angkatan
                        </h3>
                        <div className="px-4 py-2 bg-gray-50 rounded-xl text-xs font-bold text-gray-500 uppercase tracking-widest">
                            Tahun Akademik 2024/2025
                        </div>
                    </div>
                    {/* Visual Bar Graph */}
                    <div className="h-64 flex items-end gap-4 px-2">
                        {[2021, 2022, 2023, 2024].map((year, i) => {
                            const heights = [45, 65, 85, 100];
                            return (
                                <div
                                    key={year}
                                    className="flex-grow group relative h-full flex flex-col justify-end"
                                >
                                    <div
                                        style={{ height: `${heights[i]}%` }}
                                        className="w-full bg-blue-500/10 rounded-2xl group-hover:bg-blue-600 transition-all duration-300 relative flex flex-col justify-end overflow-hidden"
                                    >
                                        <div
                                            style={{ height: "70%" }}
                                            className="w-full bg-blue-600 rounded-2xl opacity-80"
                                        />
                                    </div>
                                    <span className="text-center mt-3 text-[10px] font-black text-gray-400 uppercase">
                                        {year}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 font-inter">
                        Quick Actions
                    </h3>
                    <div className="space-y-3">
                        {[
                            {
                                label: "Buka Semester Baru",
                                path: "/admin/semesters",
                                icon: Calendar,
                                color: "text-blue-600",
                                bg: "bg-blue-50",
                            },
                            {
                                label: "Tambah Mahasiswa",
                                path: "/admin/users",
                                icon: Users,
                                color: "text-emerald-600",
                                bg: "bg-emerald-50",
                            },
                            {
                                label: "Atur Jadwal Kuliah",
                                path: "/admin/classes",
                                icon: ClipboardList,
                                color: "text-purple-600",
                                bg: "bg-purple-50",
                            },
                        ].map((act, i) => (
                            <a
                                key={i}
                                href={act.path}
                                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group"
                            >
                                <div
                                    className={`w-10 h-10 rounded-xl ${act.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}
                                >
                                    <act.icon
                                        className={`w-5 h-5 ${act.color}`}
                                    />
                                </div>
                                <span className="text-sm font-bold text-gray-700">
                                    {act.label}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const LecturerDashboard = ({ user }) => {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    Dashboard Dosen
                </h1>
                <p className="text-gray-500 font-medium mt-1">
                    Selamat datang kembali, {user?.name}.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="text-sm text-blue-600 font-black uppercase mb-2">
                        Kelas Aktif
                    </div>
                    <div className="text-4xl font-black text-gray-900">4</div>
                    <div className="mt-2 text-xs text-gray-400 font-bold">
                        Semester Genap 2025
                    </div>
                </div>
                {/* ... other lecturer cards ... */}
            </div>
        </div>
    );
};

const StudentDashboard = ({ user, navigate }) => {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    Dashboard Mahasiswa
                </h1>
                <p className="text-gray-500 font-medium mt-1">
                    Selamat datang kembali, {user?.name}.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="text-[11px] text-blue-600 font-black uppercase tracking-wider mb-2">
                            IPK Kumulatif
                        </div>
                        <div className="text-4xl font-black text-gray-900">
                            {user?.student?.ipk || "3.85"}
                        </div>
                    </div>
                    {/* ... other student cards ... */}
                </div>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("/api/me");
                setUser(response.data.data);
            } catch (err) {
                console.error("Failed to fetch user", err);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    const roleRaw = user?.role;
    const role = (
        typeof roleRaw === "string" ? roleRaw : roleRaw?.name
    )?.toLowerCase();

    return (
        <AuthLayout>
            {role === "admin" ? (
                <AdminDashboard user={user} />
            ) : role === "dosen" ? (
                <LecturerDashboard user={user} />
            ) : (
                <StudentDashboard user={user} navigate={navigate} />
            )}
        </AuthLayout>
    );
};

export default Dashboard;
