<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClassModel;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClassController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => ClassModel::with(['course', 'lecturer', 'semester', 'schedules'])->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'semester_id' => 'required|exists:semesters,id',
            'mata_kuliah_id' => 'required|exists:courses,id',
            'dosen_id' => 'required|exists:lecturers,id',
            'nama_kelas' => 'required|string',
            'kuota' => 'required|integer|min:1',
            'schedules' => 'required|array|min:1',
            'schedules.*.hari' => 'required|string',
            'schedules.*.jam_mulai' => 'required',
            'schedules.*.jam_selesai' => 'required',
            'schedules.*.ruangan' => 'required|string',
        ]);

        return DB::transaction(function () use ($validated) {
            $class = ClassModel::create([
                'semester_id' => $validated['semester_id'],
                'mata_kuliah_id' => $validated['mata_kuliah_id'],
                'dosen_id' => $validated['dosen_id'],
                'nama_kelas' => $validated['nama_kelas'],
                'kuota' => $validated['kuota'],
                'jumlah_mahasiswa' => 0,
            ]);

            foreach ($validated['schedules'] as $sch) {
                $class->schedules()->create($sch);
            }

            return response()->json([
                'success' => true,
                'message' => 'Kelas dan jadwal berhasil dibuat',
                'data' => $class->load(['course', 'lecturer', 'schedules'])
            ]);
        });
    }

    public function update(Request $request, ClassModel $class)
    {
        $validated = $request->validate([
            'semester_id' => 'required|exists:semesters,id',
            'mata_kuliah_id' => 'required|exists:courses,id',
            'dosen_id' => 'required|exists:lecturers,id',
            'nama_kelas' => 'required|string',
            'kuota' => 'required|integer|min:1',
            'schedules' => 'required|array|min:1',
            'schedules.*.hari' => 'required|string',
            'schedules.*.jam_mulai' => 'required',
            'schedules.*.jam_selesai' => 'required',
            'schedules.*.ruangan' => 'required|string',
        ]);

        return DB::transaction(function () use ($validated, $class) {
            $class->update([
                'semester_id' => $validated['semester_id'],
                'mata_kuliah_id' => $validated['mata_kuliah_id'],
                'dosen_id' => $validated['dosen_id'],
                'nama_kelas' => $validated['nama_kelas'],
                'kuota' => $validated['kuota'],
            ]);

            // Sync schedules: easiest way is to delete and recreate
            $class->schedules()->delete();
            foreach ($validated['schedules'] as $sch) {
                $class->schedules()->create($sch);
            }

            return response()->json([
                'success' => true,
                'message' => 'Kelas berhasil diperbarui',
                'data' => $class->load(['course', 'lecturer', 'schedules'])
            ]);
        });
    }

    public function destroy(ClassModel $class)
    {
        return DB::transaction(function () use ($class) {
            $class->schedules()->delete();
            $class->delete();
            return response()->json([
                'success' => true,
                'message' => 'Kelas berhasil dihapus'
            ]);
        });
    }
}
