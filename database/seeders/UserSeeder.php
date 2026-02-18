<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Role;
use App\Models\Lecturer;
use App\Models\Student;
use App\Models\Major;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $dosenRole = Role::firstOrCreate(['name' => 'dosen']);
        $mahasiswaRole = Role::firstOrCreate(['name' => 'mahasiswa']);
        
        $informatika = Major::where('kode_prodi', 'IF')->first();
        $elektro = Major::where('kode_prodi', 'TE')->first();

        // 1. Create Main Admin User
        User::create([
            'username' => 'admin',
            'name' => 'Administrator',
            'email' => 'admin@siakad.ac.id',
            'password' => Hash::make('password'),
            'role_id' => $adminRole->id,
        ]);

        // 2. Generate 50 Lecturers
        for ($i = 1; $i <= 50; $i++) {
            $user = User::create([
                'username' => 'dosen' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'name' => 'Dosen ' . $i,
                'email' => 'dosen' . $i . '@lecturer.ac.id',
                'password' => Hash::make('password'),
                'role_id' => $dosenRole->id,
            ]);

            Lecturer::create([
                'user_id' => $user->id,
                'nidn' => '10' . str_pad($i, 8, '0', STR_PAD_LEFT),
                'nama_lengkap' => 'Dr. Dosen ' . $i,
                'email' => 'dosen' . $i . '@lecturer.ac.id',
                'no_hp' => '0812' . str_pad($i, 8, '0', STR_PAD_LEFT),
            ]);
        }

        // 3. Generate 50 Students
        for ($i = 1; $i <= 50; $i++) {
            $user = User::create([
                'username' => 'mhs' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'name' => 'Mahasiswa ' . $i,
                'email' => 'mhs' . $i . '@student.ac.id',
                'password' => Hash::make('password'),
                'role_id' => $mahasiswaRole->id,
            ]);

            Student::create([
                'user_id' => $user->id,
                'prodi_id' => ($i % 2 == 0) ? $informatika->id : $elektro->id,
                'nim' => '2024' . str_pad($i, 6, '0', STR_PAD_LEFT),
                'nama_lengkap' => 'Mahasiswa ' . $i,
                'angkatan' => 2024,
                'status' => 'aktif',
                'email' => 'mhs' . $i . '@student.ac.id',
                'no_hp' => '0899' . str_pad($i, 8, '0', STR_PAD_LEFT),
            ]);
        }
    }
}
