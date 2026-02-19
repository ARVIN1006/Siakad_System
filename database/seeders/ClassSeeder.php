<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ClassModel;
use App\Models\Semester;
use App\Models\Course;
use App\Models\Lecturer;

class ClassSeeder extends Seeder
{
    public function run(): void
    {
        $semesterGenap = Semester::where('jenis', 'Genap')->where('status_aktif', true)->first();
        $courses = Course::all();
        $lecturers = Lecturer::all();
        
        if ($courses->isEmpty() || $lecturers->isEmpty() || !$semesterGenap) {
            return;
        }

        // Generate 50 Classes
        for ($i = 0; $i < 50; $i++) {
            ClassModel::create([
                'semester_id' => $semesterGenap->id,
                'mata_kuliah_id' => $courses[$i % $courses->count()]->id,
                'dosen_id' => $lecturers[$i % $lecturers->count()]->id,
                'nama_kelas' => 'K-' . str_pad($i + 1, 2, '0', STR_PAD_LEFT),
                'kuota' => 40,
                'jumlah_mahasiswa' => 0,
            ]);
        }
    }
}
