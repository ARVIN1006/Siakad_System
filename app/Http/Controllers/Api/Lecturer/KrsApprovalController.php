<?php

namespace App\Http\Controllers\Api\Lecturer;

use App\Http\Controllers\Controller;
use App\Models\StudentKrs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class KrsApprovalController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        
        if (!$user->lecturer) {
            return response()->json([
                'success' => false,
                'message' => 'Data dosen tidak ditemukan',
            ], 404);
        }

        // Ideally, we should filter by students who have this lecturer as their Academic Advisor (PA).
        // Since the `students` table doesn't explicitly have `pembimbing_akademik_id` in the migration I saw,
        // I will assume for now we show all KRS or filter by some other means.
        // For MVP/Demo purposes, let's show all KRS requests that are 'diajukan'.
        
        $krsList = StudentKrs::with(['student.user', 'semester'])
            ->where('status', 'diajukan')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $krsList->map(function ($krs) {
                return [
                    'id' => $krs->id,
                    'mahasiswa' => $krs->student->user->name ?? $krs->student->nama_lengkap,
                    'nim' => $krs->student->nim,
                    'semester' => $krs->semester->nama_semester . ' ' . $krs->semester->tahun_akademik,
                    'total_sks' => $krs->total_sks,
                    'tanggal_pengajuan' => $krs->created_at->format('d M Y H:i'),
                    'status' => $krs->status,
                ];
            }),
        ]);
    }

    public function approve($id)
    {
        $krs = StudentKrs::find($id);
        
        if (!$krs) {
            return response()->json(['success' => false, 'message' => 'KRS not found'], 404);
        }

        $krs->status = 'disetujui';
        $krs->disetujui_oleh = Auth::user()->lecturer->id;
        $krs->tanggal_disetujui = now();
        $krs->save();

        return response()->json(['success' => true, 'message' => 'KRS berhasil disetujui']);
    }

    public function reject(Request $request, $id)
    {
        $krs = StudentKrs::find($id);
        
        if (!$krs) {
            return response()->json(['success' => false, 'message' => 'KRS not found'], 404);
        }

        $krs->status = 'ditolak';
        $krs->catatan_pembimbing = $request->input('reason', 'KRS Ditolak oleh Dosen Pembimbing');
        $krs->save();

        return response()->json(['success' => true, 'message' => 'KRS berhasil ditolak']);
    }
}
