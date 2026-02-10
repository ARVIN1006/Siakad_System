import React, { useEffect, useState } from "react";
import AuthLayout from "../../Layouts/AuthLayout";
import useApi from "../../Hooks/useApi";
import {
    User,
    Mail,
    Hash,
    Phone,
    MapPin,
    Calendar,
    Save,
    Loader2,
    Building2,
} from "lucide-react";

const Profile = () => {
    const { loading, request } = useApi();
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const userLocal = JSON.parse(localStorage.getItem("user") || "{}");
    const role = (
        typeof userLocal.role === "string"
            ? userLocal.role
            : userLocal.role?.name
    )?.toLowerCase();

    const fetchProfile = async () => {
        try {
            const url =
                role === "mahasiswa" ? "/api/student/profile" : "/api/me";
            const res = await request({
                method: "get",
                url: url,
            });
            setProfile(res.data);
            setFormData(res.data);
        } catch (err) {
            console.error("Failed to fetch profile", err);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await request({
                method: "put",
                url: role === "mahasiswa" ? "/api/student/profile" : "/api/me",
                data: formData,
            });
            setIsEditing(false);
            fetchProfile();
            alert("Profil berhasil diperbarui!");
        } catch (err) {
            alert(
                "Gagal memperbarui profil: " +
                    (err.response?.data?.message || "Terjadi kesalahan."),
            );
        }
    };

    if (!profile && loading) {
        return (
            <AuthLayout>
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout>
            <div className="max-w-4xl space-y-8">
                <header className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            Profil{" "}
                            {role === "mahasiswa"
                                ? "Mahasiswa"
                                : role === "dosen"
                                  ? "Dosen"
                                  : "Admin"}
                        </h1>
                        <p className="text-gray-500 font-medium">
                            Kelola informasi pribadi Anda.
                        </p>
                    </div>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-all text-sm"
                        >
                            Edit Profil
                        </button>
                    )}
                </header>

                <form
                    onSubmit={handleUpdate}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {/* Information Card */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
                            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                                {profile?.name?.charAt(0) ||
                                    profile?.nama_lengkap?.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    {profile?.name || profile?.nama_lengkap}
                                </h3>
                                <p className="text-sm text-blue-600 font-bold uppercase tracking-tight">
                                    {profile?.username || profile?.nim}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Mail className="w-5 h-5 opacity-40" />
                                <div className="flex-grow">
                                    <p className="text-[10px] font-black uppercase text-gray-400">
                                        Email
                                    </p>
                                    <p className="font-bold text-sm">
                                        {profile?.email}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <Phone className="w-5 h-5 opacity-40" />
                                <div className="flex-grow">
                                    <p className="text-[10px] font-black uppercase text-gray-400">
                                        Nomor Telepon
                                    </p>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-bold"
                                            value={formData.no_hp || ""}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    no_hp: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        <p className="font-bold text-sm">
                                            {profile?.no_hp || "-"}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <MapPin className="w-5 h-5 opacity-40" />
                                <div className="flex-grow">
                                    <p className="text-[10px] font-black uppercase text-gray-400">
                                        Alamat
                                    </p>
                                    {isEditing ? (
                                        <textarea
                                            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-bold resize-none"
                                            rows="2"
                                            value={formData.alamat || ""}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    alamat: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        <p className="font-bold text-sm leading-relaxed">
                                            {profile?.alamat || "-"}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Column */}
                    <div className="space-y-6">
                        {role === "mahasiswa" && (
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                                <h4 className="font-bold text-gray-900 pb-4 border-b border-gray-50">
                                    Data Akademik
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <p className="text-[10px] font-black uppercase text-gray-400 mb-1">
                                            Program Studi
                                        </p>
                                        <p className="font-bold text-gray-900 text-sm">
                                            {profile?.major?.nama_prodi}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <p className="text-[10px] font-black uppercase text-gray-400 mb-1">
                                            Fakultas
                                        </p>
                                        <p className="font-bold text-gray-900 text-sm">
                                            {
                                                profile?.major?.faculty
                                                    ?.nama_fakultas
                                            }
                                        </p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <p className="text-[10px] font-black uppercase text-gray-400 mb-1">
                                            Angkatan
                                        </p>
                                        <p className="font-bold text-gray-900 text-sm">
                                            {profile?.angkatan}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <p className="text-[10px] font-black uppercase text-gray-400 mb-1">
                                            Status
                                        </p>
                                        <p className="font-bold text-emerald-600 text-sm uppercase">
                                            {profile?.status}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isEditing && (
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-grow py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Save className="w-4 h-4" />
                                    )}
                                    Simpan Perubahan
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setFormData(profile);
                                    }}
                                    className="px-6 py-3 bg-white border border-gray-200 text-gray-500 rounded-xl font-bold hover:bg-gray-50 transition-all"
                                >
                                    Batal
                                </button>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Profile;
