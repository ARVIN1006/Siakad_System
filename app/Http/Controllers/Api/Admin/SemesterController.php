<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Semester;
use Illuminate\Http\Request;

class SemesterController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Semester::orderBy('tahun_ajaran', 'desc')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_semester' => 'required|string',
            'tahun_ajaran' => 'required|string',
            'jenis' => 'required|in:Ganjil,Genap,Antara',
            'status_aktif' => 'boolean',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date',
        ]);

        if ($validated['status_aktif']) {
            Semester::where('status_aktif', true)->update(['status_aktif' => false]);
        }

        $semester = Semester::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Semester berhasil dibuat',
            'data' => $semester
        ]);
    }

    public function update(Request $request, Semester $semester)
    {
        $validated = $request->validate([
            'nama_semester' => 'required|string',
            'tahun_ajaran' => 'required|string',
            'jenis' => 'required|in:Ganjil,Genap,Antara',
            'status_aktif' => 'boolean',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date',
        ]);

        if ($validated['status_aktif']) {
            Semester::where('id', '!=', $semester->id)
                ->where('status_aktif', true)
                ->update(['status_aktif' => false]);
        }

        $semester->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Semester berhasil diperbarui',
            'data' => $semester
        ]);
    }

    public function destroy(Semester $semester)
    {
        $semester->delete();
        return response()->json([
            'success' => true,
            'message' => 'Semester berhasil dihapus'
        ]);
    }
}
