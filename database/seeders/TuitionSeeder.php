<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TuitionFee;
use App\Models\Student;
use App\Models\Semester;

class TuitionSeeder extends Seeder
{
    public function run(): void
    {
        $students = Student::all();
        $semesterGenap = Semester::where('jenis', 'Genap')->where('status_aktif', true)->first();

        if ($students->isEmpty() || !$semesterGenap) {
            return;
        }

        // Generate Tuition Fees (1 per student)
        foreach ($students as $index => $student) {
            TuitionFee::create([
                'mahasiswa_id' => $student->id,
                'semester_id' => $semesterGenap->id,
                'jenis_biaya' => 'UKT',
                'jumlah' => 5000000,
                'total' => 5000000,
                'status' => ($index % 3 == 0) ? 'lunas' : (($index % 3 == 1) ? 'dibayar_sebagian' : 'belum_bayar'),
                'nomor_va' => '880' . str_pad((string)$index, 10, '0', STR_PAD_LEFT), // Using index for unique VA simply
                'jatuh_tempo' => '2025-02-15',
            ]);
        }
    }
}
