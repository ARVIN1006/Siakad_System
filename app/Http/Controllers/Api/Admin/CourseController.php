<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Course::with('major.faculty')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'prodi_id' => 'required|exists:majors,id',
            'kode_mk' => 'required|string|unique:courses',
            'nama_mk' => 'required|string',
            'sks' => 'required|integer',
            'semester_ditawarkan' => 'required|integer',
            'jenis_mk' => 'required|string',
            'deskripsi' => 'nullable|string',
            'capaian_pembelajaran' => 'nullable|string',
            'prasyarat_id' => 'nullable|exists:courses,id',
        ]);

        $course = Course::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Mata kuliah berhasil dibuat',
            'data' => $course
        ]);
    }

    public function show(Course $course)
    {
        return response()->json([
            'success' => true,
            'data' => $course->load(['major', 'prerequisite'])
        ]);
    }

    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'prodi_id' => 'required|exists:majors,id',
            'kode_mk' => 'required|string|unique:courses,kode_mk,' . $course->id,
            'nama_mk' => 'required|string',
            'sks' => 'required|integer',
            'semester_ditawarkan' => 'required|integer',
            'jenis_mk' => 'required|string',
            'deskripsi' => 'nullable|string',
            'capaian_pembelajaran' => 'nullable|string',
            'prasyarat_id' => 'nullable|exists:courses,id',
        ]);

        $course->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Mata kuliah berhasil diperbarui',
            'data' => $course
        ]);
    }

    public function destroy(Course $course)
    {
        $course->delete();

        return response()->json([
            'success' => true,
            'message' => 'Mata kuliah berhasil dihapus'
        ]);
    }
}
