<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;
use App\Models\Major;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $informatika = Major::where('kode_prodi', 'IF')->first();
        $elektro = Major::where('kode_prodi', 'TE')->first();

        // Generate 50 Courses
        for ($i = 1; $i <= 50; $i++) {
            Course::create([
                'prodi_id' => ($i % 2 == 0) ? $informatika->id : $elektro->id,
                'kode_mk' => 'MK' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'nama_mk' => 'Mata Kuliah ' . $i,
                'sks' => ($i % 2 == 0) ? 3 : 2,
                'semester_ditawarkan' => ($i % 8) + 1,
                'jenis_mk' => ($i % 5 == 0) ? 'Pilihan' : 'Wajib',
            ]);
        }
    }
}
