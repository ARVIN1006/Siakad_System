import React from "react";
import AuthLayout from "../../Layouts/AuthLayout";
import { CalendarCheck } from "lucide-react";

const KrsApproval = () => {
    return (
        <AuthLayout>
            <div className="space-y-6">
                <header>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Persetujuan KRS
                    </h1>
                    <p className="text-gray-500 font-medium mt-1">
                        Halaman persetujuan rencana studi mahasiswa sedang dalam
                        pengembangan.
                    </p>
                </header>
                <div className="bg-white p-12 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-gray-400">
                    <CalendarCheck className="w-16 h-16 mb-4 opacity-20" />
                    <p className="font-bold">Feature Coming Soon</p>
                </div>
            </div>
        </AuthLayout>
    );
};

export default KrsApproval;
