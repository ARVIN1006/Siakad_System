<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faculty;
use Illuminate\Http\Request;

class FacultyController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Faculty::withCount('majors')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode_fakultas' => 'required|string|unique:faculties',
            'nama_fakultas' => 'required|string',
            'deskripsi' => 'nullable|string',
            'dekan' => 'nullable|string',
            'tahun_berdiri' => 'nullable|integer',
            'akreditasi' => 'nullable|string',
            'status_aktif' => 'boolean',
        ]);

        $faculty = Faculty::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Fakultas berhasil dibuat',
            'data' => $faculty
        ]);
    }

    public function show(Faculty $faculty)
    {
        return response()->json([
            'success' => true,
            'data' => $faculty->load('majors')
        ]);
    }

    public function update(Request $request, Faculty $faculty)
    {
        $validated = $request->validate([
            'kode_fakultas' => 'required|string|unique:faculties,kode_fakultas,' . $faculty->id,
            'nama_fakultas' => 'required|string',
            'deskripsi' => 'nullable|string',
            'dekan' => 'nullable|string',
            'tahun_berdiri' => 'nullable|integer',
            'akreditasi' => 'nullable|string',
            'status_aktif' => 'boolean',
        ]);

        $faculty->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Fakultas berhasil diperbarui',
            'data' => $faculty
        ]);
    }

    public function destroy(Faculty $faculty)
    {
        $faculty->delete();

        return response()->json([
            'success' => true,
            'message' => 'Fakultas berhasil dihapus'
        ]);
    }
}
