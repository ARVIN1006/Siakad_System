<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use App\Models\Faculty;
use App\Models\Major;
use App\Models\Student;
use App\Models\Lecturer;
use App\Models\Semester;
use App\Models\Course;
use App\Models\ClassModel;
use App\Models\Schedule;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TestUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create faculty
        $faculty = Faculty::create([
            'kode_fakultas' => 'FTI',
            'nama_fakultas' => 'Fakultas Teknologi Informasi',
            'deskripsi' => 'Fakultas yang menyelenggarakan pendidikan di bidang teknologi informasi dan komputer',
            'dekan' => 'Prof. Dr. Ahmad Santoso, M.Kom',
            'tahun_berdiri' => 2005,
            'akreditasi' => 'A',
            'status_aktif' => true,
        ]);

        // Create major
        $major = Major::create([
            'faculty_id' => $faculty->id,
            'kode_prodi' => 'SI',
            'nama_prodi' => 'Sistem Informasi',
            'jenjang' => 'S1',
            'kaprodi' => 'Dr. Budi Santoso, M.Kom',
            'gelar' => 'S.Kom',
            'akreditasi' => 'Unggul',
            'kuota_mahasiswa' => 50,
            'status_aktif' => true,
        ]);

        // Create semester
        $semester = Semester::create([
            'nama_semester' => '2023/2024 Ganjil',
            'tahun_ajaran' => '2023/2024',
            'jenis' => 'Ganjil',
            'status_aktif' => true,
            'tanggal_mulai' => '2023-09-01',
            'tanggal_selesai' => '2024-01-31',
        ]);

        // Create courses
        $course1 = Course::create([
            'prodi_id' => $major->id,
            'kode_mk' => 'SI101',
            'nama_mk' => 'Pemrograman Dasar',
            'sks' => 3,
            'semester_ditawarkan' => 1,
            'jenis_mk' => 'Wajib',
            'deskripsi' => 'Mata kuliah yang mengajarkan dasar-dasar pemrograman',
            'capaian_pembelajaran' => 'Mahasiswa mampu membuat program sederhana menggunakan bahasa pemrograman',
        ]);

        $course2 = Course::create([
            'prodi_id' => $major->id,
            'kode_mk' => 'SI102',
            'nama_mk' => 'Basis Data',
            'sks' => 3,
            'semester_ditawarkan' => 2,
            'jenis_mk' => 'Wajib',
            'deskripsi' => 'Mata kuliah yang mengajarkan konsep dan implementasi basis data',
            'capaian_pembelajaran' => 'Mahasiswa mampu merancang dan mengimplementasikan basis data',
            'prasyarat_id' => $course1->id,
        ]);

        $roles = Role::all()->keyBy('name');

        // Create Admin User
        $adminUser = User::create([
            'username' => 'admin',
            'name' => 'System Administrator',
            'email' => 'admin@siakad.ac.id',
            'password' => Hash::make('password'),
            'role_id' => $roles['admin']->id,
        ]);

        // Create Student User
        $studentUser = User::create([
            'username' => '12345678',
            'name' => 'Budi Santoso',
            'email' => 'budi@student.ac.id',
            'password' => Hash::make('password'),
            'role_id' => $roles['mahasiswa']->id,
        ]);

        $student = Student::create([
            'user_id' => $studentUser->id,
            'prodi_id' => $major->id,
            'nim' => '12345678',
            'nama_lengkap' => 'Budi Santoso',
            'status' => 'aktif',
            'alamat' => 'Jl. Sudirman No. 123, Jakarta',
            'tempat_lahir' => 'Jakarta',
            'tanggal_lahir' => '2002-05-15',
            'jenis_kelamin' => 'L',
            'agama' => 'Islam',
            'no_hp' => '081234567890',
            'email' => 'budi@student.ac.id',
            'kewarganegaraan' => 'Indonesia',
            'golongan_darah' => 'A',
            'nama_orang_tua' => 'Bambang Santoso',
            'no_hp_orang_tua' => '081234567891',
            'angkatan' => 2023,
            'ipk' => 0.00,
            'total_sks' => 0,
        ]);

        // Create Lecturer User
        $lecturerUser = User::create([
            'username' => 'dosen001',
            'name' => 'Dr. Ahmad Rahman',
            'email' => 'ahmad@lecturer.ac.id',
            'password' => Hash::make('password'),
            'role_id' => $roles['dosen']->id,
        ]);

        $lecturer = Lecturer::create([
            'user_id' => $lecturerUser->id,
            'nidn' => '0012345678',
            'nip' => '199001012020121001',
            'nama_lengkap' => 'Ahmad Rahman',
            'gelar_depan' => 'Dr.',
            'gelar_belakang' => 'M.Kom',
            'email' => 'ahmad@lecturer.ac.id',
            'no_hp' => '081234567892',
            'alamat' => 'Jl. Thamrin No. 456, Jakarta',
            'tempat_lahir' => 'Bandung',
            'tanggal_lahir' => '1990-01-01',
            'jenis_kelamin' => 'L',
            'agama' => 'Islam',
            'jenjang_pendidikan' => 'S3',
            'jabatan' => 'Lektor',
            'status_kepegawaian' => 'PNS',
        ]);

        // Create classes
        $class1 = ClassModel::create([
            'semester_id' => $semester->id,
            'mata_kuliah_id' => $course1->id,
            'dosen_id' => $lecturer->id,
            'nama_kelas' => 'A',
            'kuota' => 40,
            'jumlah_mahasiswa' => 0,
        ]);

        $class2 = ClassModel::create([
            'semester_id' => $semester->id,
            'mata_kuliah_id' => $course2->id,
            'dosen_id' => $lecturer->id,
            'nama_kelas' => 'A',
            'kuota' => 40,
            'jumlah_mahasiswa' => 0,
        ]);

        // Create schedules
        Schedule::create([
            'kelas_id' => $class1->id,
            'hari' => 'Senin',
            'jam_mulai' => '08:00',
            'jam_selesai' => '10:30',
            'ruangan' => 'Lab Komputer 1',
        ]);

        Schedule::create([
            'kelas_id' => $class2->id,
            'hari' => 'Rabu',
            'jam_mulai' => '13:00',
            'jam_selesai' => '15:30',
            'ruangan' => 'Lab Komputer 2',
        ]);
    }
}