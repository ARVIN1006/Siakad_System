<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Faculty;
use App\Models\Major;

class FacultySeeder extends Seeder
{
    public function run(): void
    {
        $fte = Faculty::create(['nama_fakultas' => 'Fakultas Teknik Elektro', 'kode_fakultas' => 'FTE']);
        Major::create(['nama_prodi' => 'S1 Informatika', 'kode_prodi' => 'IF', 'faculty_id' => $fte->id]);
        Major::create(['nama_prodi' => 'S1 Teknik Elektro', 'kode_prodi' => 'TE', 'faculty_id' => $fte->id]);
    }
}
