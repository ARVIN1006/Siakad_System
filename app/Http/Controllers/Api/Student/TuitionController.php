<?php

namespace App\Http\Controllers\Api\Student;

use App\Http\Controllers\Controller;
use App\Models\TuitionFee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TuitionController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        
        if (!$user->student) {
            return response()->json([
                'success' => false,
                'message' => 'Data mahasiswa tidak ditemukan',
            ], 404);
        }

        $tuitions = TuitionFee::with('semester')
            ->where('mahasiswa_id', $user->student->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $tuitions->map(function ($tuition) {
                return [
                    'id' => $tuition->id,
                    'semester' => $tuition->semester->nama_semester . ' ' . $tuition->semester->tahun_akademik,
                    'jenis' => $tuition->jenis_biaya,
                    'jumlah' => $tuition->total,
                    'status' => match($tuition->status) {
                        'belum_bayar' => 'Belum Bayar',
                        'dibayar_sebagian' => 'Dibayar Sebagian',
                        'lunas' => 'Lunas',
                        default => 'Unknown'
                    },
                    'jatuh_tempo' => $tuition->jatuh_tempo ? date('d M Y', strtotime($tuition->jatuh_tempo)) : '-',
                    'va' => $tuition->nomor_va,
                    'tanggal_bayar' => $tuition->updated_at->format('d M Y'), // Assumption for now
                ];
            }),
        ]);
    }
}
