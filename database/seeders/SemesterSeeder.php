<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Semester;

class SemesterSeeder extends Seeder
{
    public function run(): void
    {
        Semester::create([
            'nama_semester' => '2024/2025 Ganjil',
            'tahun_ajaran' => '2024/2025', 
            'jenis' => 'Ganjil', 
            'status_aktif' => false, 
            'tanggal_mulai' => '2024-08-01', 
            'tanggal_selesai' => '2024-12-31'
        ]);
        
        Semester::create([
            'nama_semester' => '2024/2025 Genap',
            'tahun_ajaran' => '2024/2025', 
            'jenis' => 'Genap', 
            'status_aktif' => true, 
            'tanggal_mulai' => '2025-02-01', 
            'tanggal_selesai' => '2025-06-30'
        ]);
    }
}
