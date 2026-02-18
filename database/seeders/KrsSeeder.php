<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StudentKrs;
use App\Models\Student;
use App\Models\Semester;

class KrsSeeder extends Seeder
{
    public function run(): void
    {
        $students = Student::all();
        $semesterGenap = Semester::where('jenis', 'Genap')->where('status_aktif', true)->first();

        if ($students->isEmpty() || !$semesterGenap) {
            return;
        }

        // Generate KRS Submissions (1 per student)
        foreach ($students as $index => $student) {
            StudentKrs::create([
                'mahasiswa_id' => $student->id,
                'semester_id' => $semesterGenap->id,
                'status' => ($index % 4 == 0) ? 'diajukan' : (($index % 4 == 1) ? 'disetujui' : (($index % 4 == 2) ? 'draft' : 'ditolak')),
                'total_sks' => rand(18, 24),
            ]);
        }
    }
}
