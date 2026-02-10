import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    User,
    BookOpen,
    ClipboardList,
    LogOut,
    GraduationCap,
    Menu,
    X,
    Users,
    Building2,
    BookCheck,
    CalendarCheck,
    CreditCard,
    Calendar,
} from "lucide-react";
import axios from "axios";

const AuthLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const handleLogout = async () => {
        try {
            await axios.post("/api/logout");
        } catch (err) {
            console.error("Logout error", err);
        } finally {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
        }
    };

    const menuItems = React.useMemo(() => {
        const roleRaw = user.role;
        const role =
            (typeof roleRaw === "string"
                ? roleRaw
                : roleRaw?.name
            )?.toLowerCase() || "";

        switch (role) {
            case "admin":
                return [
                    {
                        name: "Dashboard",
                        path: "/dashboard",
                        icon: LayoutDashboard,
                    },
                    {
                        name: "Manajemen User",
                        path: "/admin/users",
                        icon: Users,
                    },
                    {
                        name: "Fakultas & Prodi",
                        path: "/admin/faculties",
                        icon: Building2,
                    },
                    {
                        name: "Mata Kuliah",
                        path: "/admin/courses",
                        icon: BookOpen,
                    },
                    {
                        name: "Manajemen Semester",
                        path: "/admin/semesters",
                        icon: Calendar,
                    },
                    {
                        name: "Jadwal & Kelas",
                        path: "/admin/classes",
                        icon: ClipboardList,
                    },
                ];
            case "dosen":
                return [
                    {
                        name: "Dashboard",
                        path: "/dashboard",
                        icon: LayoutDashboard,
                    },
                    { name: "Profil Saya", path: "/profile", icon: User },
                    {
                        name: "Input Nilai",
                        path: "/lecturer/grades",
                        icon: BookCheck,
                    },
                    {
                        name: "Persetujuan KRS",
                        path: "/lecturer/krs-approval",
                        icon: CalendarCheck,
                    },
                ];
            case "mahasiswa":
                return [
                    {
                        name: "Dashboard",
                        path: "/dashboard",
                        icon: LayoutDashboard,
                    },
                    { name: "Profil Saya", path: "/profile", icon: User },
                    { name: "Isi KRS", path: "/krs", icon: CalendarCheck },
                    {
                        name: "KHS & Transkrip",
                        path: "/khs",
                        icon: ClipboardList,
                    },
                    {
                        name: "Pembayaran UKT",
                        path: "/student/tuition",
                        icon: CreditCard,
                    },
                ];
            default:
                return [
                    {
                        name: "Dashboard",
                        path: "/dashboard",
                        icon: LayoutDashboard,
                    },
                ];
        }
    }, [user.role]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 p-1.5 rounded-lg">
                        <GraduationCap className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-gray-900 tracking-tight">
                        SIAKAD
                    </span>
                </div>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out font-sans
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                md:relative md:translate-x-0
            `}
            >
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="hidden md:flex items-center gap-2 px-6 py-8">
                        <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
                            <GraduationCap className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">
                            SIAKAD
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-grow px-4 space-y-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                                    ${
                                        location.pathname === item.path
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    }
                                `}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* User Profile Summary */}
                    <div className="p-4 border-t border-gray-100">
                        <div className="flex items-center gap-3 px-4 py-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
                                {user.name?.charAt(0)}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-gray-900 truncate">
                                    {user.name}
                                </p>
                                <p className="text-xs text-gray-400 font-medium truncate capitalize">
                                    {typeof user.role === "string"
                                        ? user.role
                                        : user.role?.name}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            Keluar
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow min-w-0">
                <div className="px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default AuthLayout;
