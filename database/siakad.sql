-- ============================================
-- SIAKAD Database Schema - Complete SQL
-- Generated from Laravel Migrations
-- Database: MySQL
-- Target: db
-- ============================================

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS `db` DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;

-- Use the database
USE `db`;

SET FOREIGN_KEY_CHECKS = 0;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS `payments`;

DROP TABLE IF EXISTS `tuition_fees`;

DROP TABLE IF EXISTS `student_grades`;

DROP TABLE IF EXISTS `krs_details`;

DROP TABLE IF EXISTS `student_krs`;

DROP TABLE IF EXISTS `schedules`;

DROP TABLE IF EXISTS `classes`;

DROP TABLE IF EXISTS `courses`;

DROP TABLE IF EXISTS `lecturers`;

DROP TABLE IF EXISTS `students`;

DROP TABLE IF EXISTS `semesters`;

DROP TABLE IF EXISTS `majors`;

DROP TABLE IF EXISTS `faculties`;

DROP TABLE IF EXISTS `personal_access_tokens`;

DROP TABLE IF EXISTS `failed_jobs`;

DROP TABLE IF EXISTS `job_batches`;

DROP TABLE IF EXISTS `jobs`;

DROP TABLE IF EXISTS `cache_locks`;

DROP TABLE IF EXISTS `cache`;

DROP TABLE IF EXISTS `sessions`;

DROP TABLE IF EXISTS `password_reset_tokens`;

DROP TABLE IF EXISTS `users`;

DROP TABLE IF EXISTS `roles`;

DROP TABLE IF EXISTS `migrations`;

-- ============================================
-- System Tables
-- ============================================

-- Migrations Table
CREATE TABLE `migrations` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `migration` VARCHAR(255) NOT NULL,
    `batch` INT NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Cache Tables
CREATE TABLE `cache` (
    `key` VARCHAR(255) PRIMARY KEY,
    `value` MEDIUMTEXT NOT NULL,
    `expiration` INT NOT NULL,
    INDEX `cache_expiration_index` (`expiration`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE `cache_locks` (
    `key` VARCHAR(255) PRIMARY KEY,
    `owner` VARCHAR(255) NOT NULL,
    `expiration` INT NOT NULL,
    INDEX `cache_locks_expiration_index` (`expiration`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Jobs Tables
CREATE TABLE `jobs` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `queue` VARCHAR(255) NOT NULL,
    `payload` LONGTEXT NOT NULL,
    `attempts` TINYINT UNSIGNED NOT NULL,
    `reserved_at` INT UNSIGNED NULL,
    `available_at` INT UNSIGNED NOT NULL,
    `created_at` INT UNSIGNED NOT NULL,
    INDEX `jobs_queue_index` (`queue`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE `job_batches` (
    `id` VARCHAR(255) PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `total_jobs` INT NOT NULL,
    `pending_jobs` INT NOT NULL,
    `failed_jobs` INT NOT NULL,
    `failed_job_ids` LONGTEXT NOT NULL,
    `options` MEDIUMTEXT NULL,
    `cancelled_at` INT NULL,
    `created_at` INT NOT NULL,
    `finished_at` INT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE `failed_jobs` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `uuid` VARCHAR(255) NOT NULL UNIQUE,
    `connection` TEXT NOT NULL,
    `queue` TEXT NOT NULL,
    `payload` LONGTEXT NOT NULL,
    `exception` LONGTEXT NOT NULL,
    `failed_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ============================================
-- Authentication & Authorization Tables
-- ============================================

-- Roles Table
CREATE TABLE `roles` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL UNIQUE COMMENT 'admin, dosen, mahasiswa, pimpinan',
    `guard_name` VARCHAR(255) NOT NULL DEFAULT 'web',
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Users Table
CREATE TABLE `users` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL UNIQUE,
    `role_id` BIGINT UNSIGNED NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `email_verified_at` TIMESTAMP NULL,
    `password` VARCHAR(255) NOT NULL,
    `remember_token` VARCHAR(100) NULL,
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL,
    FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE SET NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Password Reset Tokens
CREATE TABLE `password_reset_tokens` (
    `email` VARCHAR(255) PRIMARY KEY,
    `token` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Sessions Table
CREATE TABLE `sessions` (
    `id` VARCHAR(255) PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NULL,
    `ip_address` VARCHAR(45) NULL,
    `user_agent` TEXT NULL,
    `payload` LONGTEXT NOT NULL,
    `last_activity` INT NOT NULL,
    INDEX `sessions_user_id_index` (`user_id`),
    INDEX `sessions_last_activity_index` (`last_activity`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Personal Access Tokens (Sanctum)
CREATE TABLE `personal_access_tokens` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tokenable_type` VARCHAR(255) NOT NULL,
    `tokenable_id` BIGINT UNSIGNED NOT NULL,
    `name` TEXT NOT NULL,
    `token` VARCHAR(64) NOT NULL UNIQUE,
    `abilities` TEXT NULL,
    `last_used_at` TIMESTAMP NULL,
    `expires_at` TIMESTAMP NULL,
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL,
    INDEX `personal_access_tokens_tokenable_type_tokenable_id_index` (
        `tokenable_type`,
        `tokenable_id`
    ),
    INDEX `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ============================================
-- Academic Structure Tables
-- ============================================

-- Faculties Table
CREATE TABLE `faculties` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `kode_fakultas` VARCHAR(20) NOT NULL UNIQUE,
    `nama_fakultas` VARCHAR(255) NOT NULL,
    `deskripsi` TEXT NULL,
    `dekan` VARCHAR(255) NULL,
    `tahun_berdiri` YEAR NULL,
    `akreditasi` ENUM(
        'A',
        'B',
        'C',
        'Unggul',
        'Baik Sekali',
        'Baik'
    ) NULL,
    `status_aktif` BOOLEAN NOT NULL DEFAULT TRUE,
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Majors (Program Studi) Table
CREATE TABLE `majors` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `faculty_id` BIGINT UNSIGNED NOT NULL,
    `kode_prodi` VARCHAR(20) NOT NULL UNIQUE,
    `nama_prodi` VARCHAR(255) NOT NULL,
    `jenjang` ENUM('D3', 'D4', 'S1', 'S2', 'S3') NOT NULL DEFAULT 'S1',
    `kaprodi` VARCHAR(255) NULL,
    `gelar` VARCHAR(50) NULL COMMENT 'S.Kom, S.T, dll',
    `akreditasi` ENUM(
        'A',
        'B',
        'C',
        'Unggul',
        'Baik Sekali',
        'Baik'
    ) NULL,
    `kuota_mahasiswa` INT NOT NULL DEFAULT 40,
    `status_aktif` BOOLEAN NOT NULL DEFAULT TRUE,
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL,
    FOREIGN KEY (`faculty_id`) REFERENCES `faculties` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Semesters Table
CREATE TABLE `semesters` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `nama_semester` VARCHAR(255) NOT NULL COMMENT 'e.g., 2023/2024 Ganjil',
    `tahun_ajaran` VARCHAR(20) NOT NULL COMMENT 'e.g., 2023/2024',
    `jenis` ENUM('Ganjil', 'Genap', 'Pendek') NOT NULL DEFAULT 'Ganjil',
    `status_aktif` BOOLEAN NOT NULL DEFAULT FALSE,
    `tanggal_mulai` DATE NOT NULL,
    `tanggal_selesai` DATE NOT NULL,
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ============================================
-- User Profile Tables
-- ============================================

-- Students Table
CREATE TABLE `students` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `prodi_id` BIGINT UNSIGNED NOT NULL,
    `nim` VARCHAR(20) NOT NULL UNIQUE,
    `nama_lengkap` VARCHAR(255) NOT NULL,
    `status` ENUM(
        'aktif',
        'cuti',
        'lulus',
        'keluar',
        'dropout'
    ) NOT NULL DEFAULT 'aktif',
    `alamat` TEXT NULL,
    `tempat_lahir` VARCHAR(255) NULL,
    `tanggal_lahir` DATE NULL,
    `jenis_kelamin` ENUM('L', 'P') NULL,
    `agama` ENUM(
        'Islam',
        'Kristen',
        'Katolik',
        'Hindu',
        'Buddha',
        'Konghucu'
    ) NULL,
    `no_hp` VARCHAR(20) NULL,
    `email` VARCHAR(255) NULL,
    `foto` VARCHAR(255) NULL,
    `kewarganegaraan` VARCHAR(50) NOT NULL DEFAULT 'Indonesia',
    `golongan_darah` ENUM('A', 'B', 'AB', 'O') NULL,
    `nama_orang_tua` VARCHAR(255) NULL,
    `no_hp_orang_tua` VARCHAR(20) NULL,
    `angkatan` YEAR NOT NULL,
    `ipk` DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    `total_sks` INT NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`prodi_id`) REFERENCES `majors` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Lecturers Table
CREATE TABLE `lecturers` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `nidn` VARCHAR(20) NOT NULL UNIQUE,
    `nip` VARCHAR(30) NULL UNIQUE,
    `nama_lengkap` VARCHAR(255) NOT NULL,
    `gelar_depan` VARCHAR(20) NULL,
    `gelar_belakang` VARCHAR(50) NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `no_hp` VARCHAR(20) NULL,
    `alamat` TEXT NULL,
    `tempat_lahir` VARCHAR(255) NULL,
    `tanggal_lahir` DATE NULL,
    `jenis_kelamin` ENUM('L', 'P') NULL,
    `agama` ENUM(
        'Islam',
        'Kristen',
        'Katolik',
        'Hindu',
        'Buddha',
        'Konghucu'
    ) NULL,
    `jenjang_pendidikan` ENUM('S1', 'S2', 'S3') NOT NULL DEFAULT 'S2',
    `jabatan` VARCHAR(255) NULL COMMENT 'Asisten Ahli, Lektor, dll',
    `status_kepegawaian` ENUM(
        'PNS',
        'Dosen Tetap',
        'Dosen Kontrak',
        'Dosen Luar Biasa'
    ) NOT NULL DEFAULT 'Dosen Tetap',
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ============================================
-- Course & Class Management Tables
-- ============================================

-- Courses (Mata Kuliah) Table
CREATE TABLE `courses` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `prodi_id` BIGINT UNSIGNED NOT NULL,
    `kode_mk` VARCHAR(20) NOT NULL UNIQUE,
    `nama_mk` VARCHAR(255) NOT NULL,
    `sks` INT NOT NULL,
    `semester_ditawarkan` INT NOT NULL COMMENT 'Recommended semester (1-8)',
    `jenis_mk` ENUM('Wajib', 'Pilihan') NOT NULL DEFAULT 'Wajib',
    `deskripsi` TEXT NULL,
    `capaian_pembelajaran` TEXT NULL,
    `prasyarat_id` BIGINT UNSIGNED NULL,
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL,
    FOREIGN KEY (`prodi_id`) REFERENCES `majors` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`prasyarat_id`) REFERENCES `courses` (`id`) ON DELETE SET NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Classes Table
CREATE TABLE `classes` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `semester_id` BIGINT UNSIGNED NOT NULL,
    `mata_kuliah_id` BIGINT UNSIGNED NOT NULL,
    `dosen_id` BIGINT UNSIGNED NOT NULL,
    `nama_kelas` VARCHAR(10) NOT NULL COMMENT 'e.g., A, B, C',
    `kuota` INT NOT NULL DEFAULT 40,
    `jumlah_mahasiswa` INT NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL,
    FOREIGN KEY (`semester_id`) REFERENCES `semesters` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`mata_kuliah_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`dosen_id`) REFERENCES `lecturers` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Schedules Table
CREATE TABLE `schedules` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `kelas_id` BIGINT UNSIGNED NOT NULL,
    `hari` ENUM(
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        'Jumat',
        'Sabtu'
    ) NOT NULL,
    `jam_mulai` TIME NOT NULL,
    `jam_selesai` TIME NOT NULL,
    `ruangan` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL,
    FOREIGN KEY (`kelas_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ============================================
-- Student Academic Records Tables
-- ============================================

-- Student KRS (Kartu Rencana Studi) Table
CREATE TABLE `student_krs` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `mahasiswa_id` BIGINT UNSIGNED NOT NULL,
    `semester_id` BIGINT UNSIGNED NOT NULL,
    `status` ENUM(
        'draft',
        'diajukan',
        'disetujui',
        'ditolak'
    ) NOT NULL DEFAULT 'draft',
    `total_sks` INT NOT NULL DEFAULT 0,
    `batas_ips` DECIMAL(3, 2) NULL COMMENT 'IPS semester sebelumnya untuk validasi',
    `catatan_pembimbing` TEXT NULL,
    `disetujui_oleh` BIGINT UNSIGNED NULL,
    `tanggal_disetujui` TIMESTAMP NULL,
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL,
    FOREIGN KEY (`mahasiswa_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`semester_id`) REFERENCES `semesters` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`disetujui_oleh`) REFERENCES `lecturers` (`id`) ON DELETE SET NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- KRS Details Table
CREATE TABLE `krs_details` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `krs_id` BIGINT UNSIGNED NOT NULL,
    `kelas_id` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL,
    FOREIGN KEY (`krs_id`) REFERENCES `student_krs` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`kelas_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Student Grades Table
CREATE TABLE `student_grades` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `mahasiswa_id` BIGINT UNSIGNED NOT NULL,
    `kelas_id` BIGINT UNSIGNED NOT NULL,
    `semester_id` BIGINT UNSIGNED NOT NULL,
    `tugas` DECIMAL(5, 2) NULL,
    `kuis` DECIMAL(5, 2) NULL,
    `uts` DECIMAL(5, 2) NULL,
    `uas` DECIMAL(5, 2) NULL,
    `kehadiran` INT NOT NULL DEFAULT 0 COMMENT 'Persentase kehadiran 0-100',
    `nilai_akhir` DECIMAL(5, 2) NULL,
    `huruf_mutu` ENUM(
        'A',
        'A-',
        'B+',
        'B',
        'B-',
        'C+',
        'C',
        'D',
        'E'
    ) NULL,
    `angka_mutu` DECIMAL(3, 2) NULL COMMENT '4.00, 3.75, etc.',
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL,
    FOREIGN KEY (`mahasiswa_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`kelas_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`semester_id`) REFERENCES `semesters` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ============================================
-- Financial Tables
-- ============================================

-- Tuition Fees Table
CREATE TABLE `tuition_fees` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `mahasiswa_id` BIGINT UNSIGNED NOT NULL,
    `semester_id` BIGINT UNSIGNED NOT NULL,
    `jenis_biaya` ENUM(
        'SPP',
        'UKT',
        'Biaya Lab',
        'Biaya Wisuda',
        'Lainnya'
    ) NOT NULL DEFAULT 'UKT',
    `jumlah` DECIMAL(15, 2) NOT NULL,
    `potongan` DECIMAL(15, 2) NOT NULL DEFAULT 0 COMMENT 'Scholarship/discount',
    `total` DECIMAL(15, 2) NOT NULL COMMENT 'jumlah - potongan',
    `status` ENUM(
        'belum_bayar',
        'dibayar_sebagian',
        'lunas'
    ) NOT NULL DEFAULT 'belum_bayar',
    `nomor_va` VARCHAR(255) NULL,
    `jatuh_tempo` DATE NULL,
    `keterangan` TEXT NULL,
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL,
    FOREIGN KEY (`mahasiswa_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`semester_id`) REFERENCES `semesters` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Payments Table
CREATE TABLE `payments` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `biaya_kuliah_id` BIGINT UNSIGNED NOT NULL,
    `jumlah` DECIMAL(15, 2) NOT NULL,
    `metode_pembayaran` VARCHAR(255) NULL COMMENT 'Transfer, VA, dll',
    `id_transaksi` VARCHAR(255) NULL,
    `bukti_pembayaran` VARCHAR(255) NULL COMMENT 'Path to file',
    `tanggal_bayar` TIMESTAMP NOT NULL,
    `validasi_oleh` BIGINT UNSIGNED NULL,
    `tanggal_validasi` TIMESTAMP NULL,
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL,
    FOREIGN KEY (`biaya_kuliah_id`) REFERENCES `tuition_fees` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`validasi_oleh`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ============================================
-- Insert Migration Records
-- ============================================

INSERT INTO
    `migrations` (`migration`, `batch`)
VALUES (
        '0001_01_01_000000_create_users_table',
        1
    ),
    (
        '0001_01_01_000001_create_cache_table',
        1
    ),
    (
        '0001_01_01_000002_create_jobs_table',
        1
    ),
    (
        '2026_02_05_114603_create_personal_access_tokens_table',
        1
    ),
    (
        '2026_02_05_114619_create_roles_table',
        1
    ),
    (
        '2026_02_05_115043_create_faculties_table',
        1
    ),
    (
        '2026_02_05_115054_create_majors_table',
        1
    ),
    (
        '2026_02_05_115100_create_semesters_table',
        1
    ),
    (
        '2026_02_05_115105_create_students_table',
        1
    ),
    (
        '2026_02_05_115111_create_lecturers_table',
        1
    ),
    (
        '2026_02_05_115119_create_courses_table',
        1
    ),
    (
        '2026_02_05_115121_create_classes_table',
        1
    ),
    (
        '2026_02_05_115122_create_schedules_table',
        1
    ),
    (
        '2026_02_05_115123_create_student_krs_table',
        1
    ),
    (
        '2026_02_05_115125_create_krs_details_table',
        1
    ),
    (
        '2026_02_05_115126_create_student_grades_table',
        1
    ),
    (
        '2026_02_05_115127_create_tuition_fees_table',
        1
    ),
    (
        '2026_02_05_115128_create_payments_table',
        1
    ),
    (
        '2026_02_05_115130_add_role_id_to_users_table',
        1
    );

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- End of Schema
-- ============================================