<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Major;
use Illuminate\Http\Request;

class MajorController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Major::with('faculty')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'faculty_id' => 'required|exists:faculties,id',
            'kode_prodi' => 'required|string|unique:majors',
            'nama_prodi' => 'required|string',
            'jenjang' => 'required|string',
            'kaprodi' => 'nullable|string',
            'gelar' => 'nullable|string',
            'akreditasi' => 'nullable|string',
            'kuota_mahasiswa' => 'nullable|integer',
            'status_aktif' => 'boolean',
        ]);

        $major = Major::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Program Studi berhasil dibuat',
            'data' => $major
        ]);
    }

    public function show(Major $major)
    {
        return response()->json([
            'success' => true,
            'data' => $major->load(['faculty', 'courses'])
        ]);
    }

    public function update(Request $request, Major $major)
    {
        $validated = $request->validate([
            'faculty_id' => 'required|exists:faculties,id',
            'kode_prodi' => 'required|string|unique:majors,kode_prodi,' . $major->id,
            'nama_prodi' => 'required|string',
            'jenjang' => 'required|string',
            'kaprodi' => 'nullable|string',
            'gelar' => 'nullable|string',
            'akreditasi' => 'nullable|string',
            'kuota_mahasiswa' => 'nullable|integer',
            'status_aktif' => 'boolean',
        ]);

        $major->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Program Studi berhasil diperbarui',
            'data' => $major
        ]);
    }

    public function destroy(Major $major)
    {
        $major->delete();

        return response()->json([
            'success' => true,
            'message' => 'Program Studi berhasil dihapus'
        ]);
    }
}
