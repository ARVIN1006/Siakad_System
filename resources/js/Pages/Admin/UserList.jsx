import React, { useState, useEffect } from "react";
import AuthLayout from "../../Layouts/AuthLayout";
import {
    Users,
    UserPlus,
    Search,
    Edit2,
    Trash2,
    Shield,
    Mail,
    Loader2,
    X,
    Check,
} from "lucide-react";
import axios from "axios";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [majors, setMajors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [form, setForm] = useState({
        username: "",
        name: "",
        email: "",
        password: "",
        role_id: "",
        nim: "",
        prodi_id: "",
        nidn: "",
        angkatan: new Date().getFullYear(),
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [uRes, rRes, mRes] = await Promise.all([
                axios.get("/api/admin/users"),
                axios.get("/api/admin/roles"),
                axios.get("/api/admin/majors"),
            ]);
            setUsers(uRes.data.data);
            setRoles(rRes.data.data);
            setMajors(mRes.data.data);
        } catch (err) {
            console.error("Failed to fetch data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const role = roles.find((r) => r.id === parseInt(form.role_id));
        const roleName = role?.name?.toLowerCase();

        const payload = { ...form, role_name: roleName };

        try {
            if (isEditing) {
                await axios.put(`/api/admin/users/${selectedUser.id}`, payload);
            } else {
                await axios.post("/api/admin/users", payload);
            }
            setShowModal(false);
            fetchData();
            resetForm();
        } catch (err) {
            alert(err.response?.data?.message || "Gagal menyimpan data user.");
        }
    };

    const handleDelete = async (id) => {
        if (
            !confirm(
                "Hapus user ini? Semua data terkait (mahasiswa/dosen) juga akan dihapus.",
            )
        )
            return;
        try {
            await axios.delete(`/api/admin/users/${id}`);
            fetchData();
        } catch (err) {
            alert("Gagal menghapus user.");
        }
    };

    const resetForm = () => {
        setForm({
            username: "",
            name: "",
            email: "",
            password: "",
            role_id: "",
            nim: "",
            prodi_id: "",
            nidn: "",
            angkatan: new Date().getFullYear(),
        });
        setIsEditing(false);
        setSelectedUser(null);
    };

    const openEditModal = (user) => {
        setIsEditing(true);
        setSelectedUser(user);
        setForm({
            ...form,
            username: user.username,
            name: user.name,
            email: user.email,
            role_id: user.role_id,
            password: "", // keep empty for security
        });
        setShowModal(true);
    };

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const selectedRoleName = roles
        .find((r) => r.id === parseInt(form.role_id))
        ?.name?.toLowerCase();

    return (
        <AuthLayout>
            <div className="space-y-8">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            Manajemen User
                        </h1>
                        <p className="text-gray-500 font-medium mt-1">
                            Kelola akun mahasiswa, dosen, dan admin.
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            resetForm();
                            setShowModal(true);
                        }}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:scale-[1.02] transition-transform"
                    >
                        <UserPlus className="w-5 h-5" />
                        Tambah User
                    </button>
                </header>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                        <div className="relative max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari nama, email, atau username..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none font-medium"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider">
                                        ID Khusus
                                    </th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-right">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-6 py-12 text-center"
                                        >
                                            <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
                                            <p className="mt-2 text-gray-400 font-bold">
                                                Memuat data...
                                            </p>
                                        </td>
                                    </tr>
                                ) : filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="hover:bg-gray-50/50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900">
                                                            {user.name}
                                                        </div>
                                                        <div className="text-xs text-gray-400 font-medium">
                                                            {user.username} •{" "}
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                        user.role?.name ===
                                                        "admin"
                                                            ? "bg-purple-100 text-purple-600"
                                                            : user.role
                                                                    ?.name ===
                                                                "dosen"
                                                              ? "bg-emerald-100 text-emerald-600"
                                                              : "bg-blue-100 text-blue-600"
                                                    }`}
                                                >
                                                    {user.role?.name || "User"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-bold text-gray-600">
                                                    {user.student?.nim ||
                                                        user.lecturer?.nidn ||
                                                        "-"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() =>
                                                            openEditModal(user)
                                                        }
                                                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                user.id,
                                                            )
                                                        }
                                                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-6 py-12 text-center"
                                        >
                                            <p className="text-gray-400 font-bold">
                                                Tidak ada user ditemukan.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] overflow-y-auto">
                        <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h3 className="text-xl font-bold text-gray-900">
                                {isEditing ? "Edit User" : "Tambah User Baru"}
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-5">
                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                        Username
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold"
                                        value={form.username}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                username: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                        Role
                                    </label>
                                    <select
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold"
                                        value={form.role_id}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                role_id: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">Pilih Role</option>
                                        {roles.map((r) => (
                                            <option key={r.id} value={r.id}>
                                                {r.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                    Nama Lengkap
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                        Email
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold"
                                        value={form.email}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                        Password{" "}
                                        {isEditing &&
                                            "(Kosongkan jika tidak ganti)"}
                                    </label>
                                    <input
                                        required={!isEditing}
                                        type="password"
                                        title="Minimal 6 karakter"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold"
                                        value={form.password}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            {/* Role Specific Fields */}
                            {selectedRoleName === "mahasiswa" && !isEditing && (
                                <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-4">
                                    <p className="text-xs font-black text-blue-600 uppercase tracking-widest">
                                        Detail Mahasiswa
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                                NIM
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full px-4 py-2.5 rounded-xl border border-white bg-white shadow-sm text-sm font-bold"
                                                value={form.nim}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        nim: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                                Angkatan
                                            </label>
                                            <input
                                                required
                                                type="number"
                                                className="w-full px-4 py-2.5 rounded-xl border border-white bg-white shadow-sm text-sm font-bold"
                                                value={form.angkatan}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        angkatan:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                            Program Studi
                                        </label>
                                        <select
                                            required
                                            className="w-full px-4 py-2.5 rounded-xl border border-white bg-white shadow-sm text-sm font-bold"
                                            value={form.prodi_id}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    prodi_id: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="">
                                                Pilih Prodi
                                            </option>
                                            {majors.map((m) => (
                                                <option key={m.id} value={m.id}>
                                                    {m.nama_prodi}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}

                            {selectedRoleName === "dosen" && !isEditing && (
                                <div className="p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-4">
                                    <p className="text-xs font-black text-emerald-600 uppercase tracking-widest">
                                        Detail Dosen
                                    </p>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                                            NIDN
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full px-4 py-2.5 rounded-xl border border-white bg-white shadow-sm text-sm font-bold"
                                            value={form.nidn}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    nidn: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-grow py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
                                >
                                    <Check className="w-4 h-4" />{" "}
                                    {isEditing
                                        ? "Simpan Perubahan"
                                        : "Buat User"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-3 bg-white border border-gray-200 text-gray-500 rounded-xl font-bold hover:bg-gray-50 transition-all"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthLayout>
    );
};

export default UserList;
