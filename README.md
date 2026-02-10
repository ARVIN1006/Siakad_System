# Siakad System (Sistem Informasi Akademik)

![Status](https://img.shields.io/badge/Status-Development-yellow)
![Laravel](https://img.shields.io/badge/Backend-Laravel_12-red)
![React](https://img.shields.io/badge/Frontend-React_19-blue)
![Vite](https://img.shields.io/badge/Build-Vite_7-purple)

## 📖 Deskripsi

**Siakad System** adalah platform Sistem Informasi Akademik komprehensif yang dirancang untuk mengelola data akademik perguruan tinggi. Sistem ini mengintegrasikan manajemen data mahasiswa, dosen, mata kuliah, nilai, dan keuangan dalam satu platform yang efisien. Dibangun dengan arsitektur modern menggunakan Laravel sebagai backend API yang kuat dan React sebagai frontend yang interaktif dan responsif.

## 🚀 Fitur Utama

Sistem ini memiliki fitur yang terbagi berdasarkan peran pengguna (Role-Based Access Control):

### 🎓 Mahasiswa (Student)

- **Profil Mahasiswa**: Melihat dan memperbarui data diri.
- **KRS (Kartu Rencana Studi)**: Pengajuan dan pengelolaan rencana studi per semester.
- **KHS (Kartu Hasil Studi)**: Melihat hasil studi dan nilai mata kuliah.
- **Jadwal Kuliah**: Melihat jadwal perkuliahan yang diambil.

### 👩‍🏫 Dosen (Lecturer)

- **Manajemen Kelas**: Melihat daftar kelas yang diampu.
- **Data Mahasiswa**: Mengakses daftar mahasiswa dalam kelas.
- **Input Nilai**: Mengelola dan memasukkan nilai mahasiswa.

### 🛠️ Administrator

- **Manajemen Pengguna**: Mengelola akun pengguna (Mahasiswa, Dosen, Admin).
- **Manajemen Fakultas & Jurusan**: CRUD data fakultas dan program studi.
- **Manajemen Mata Kuliah**: Mengelola kurikulum dan mata kuliah.
- **Manajemen Semester**: Pengaturan semester aktif.
- **Manajemen Kelas & Jadwal**: Pembuatan kelas dan penjadwalan.

## 🛠️ Teknologi yang Digunakan

Proyek ini dibangun menggunakan stack teknologi terkini untuk memastikan performa, keamanan, dan kemudahan pengembangan.

### Backend

- **Framework**: [Laravel 12](https://laravel.com)
- **Bahasa**: PHP ^8.2
- **Auth**: Laravel Sanctum (Token-based Authentication)
- **Database**: MySQL / SQLite (Configurable)
- **Testing**: PHPUnit / Pest

### Frontend

- **Library**: [React 19](https://react.dev)
- **Build Tool**: [Vite 7](https://vitejs.dev)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) & PostCSS
- **Routing**: React Router DOM 7
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **HTTP Client**: Axios

## � Dokumentasi API

Berikut adalah beberapa endpoint utama yang tersedia dalam API:

### 🔐 Autentikasi

| Method | Endpoint      | Deskripsi                                     |
| :----- | :------------ | :-------------------------------------------- |
| `POST` | `/api/login`  | Login user untuk mendapatkan token akses.     |
| `POST` | `/api/logout` | Logout user dan menghapus token (Perlu Auth). |
| `GET`  | `/api/me`     | Mendapatkan data user yang sedang login.      |

### 🎓 Mahasiswa (Student)

| Method | Endpoint               | Deskripsi                                |
| :----- | :--------------------- | :--------------------------------------- |
| `GET`  | `/api/student/profile` | Melihat profil mahasiswa.                |
| `PUT`  | `/api/student/profile` | Memperbarui profil mahasiswa.            |
| `GET`  | `/api/student/krs`     | Melihat Kartu Rencana Studi (KRS).       |
| `POST` | `/api/student/krs`     | Mengajukan atau menyimpan KRS.           |
| `GET`  | `/api/student/khs`     | Melihat Kartu Hasil Studi (KHS) / Nilai. |

### 👩‍🏫 Dosen (Lecturer)

| Method | Endpoint                              | Deskripsi                               |
| :----- | :------------------------------------ | :-------------------------------------- |
| `GET`  | `/api/lecturer/classes`               | Melihat daftar kelas yang diampu.       |
| `GET`  | `/api/lecturer/classes/{id}/students` | Melihat mahasiswa dalam kelas tertentu. |
| `POST` | `/api/lecturer/grades`                | Input nilai mahasiswa.                  |

### 🛠️ Administrator

| Method | Endpoint               | Deskripsi                    |
| :----- | :--------------------- | :--------------------------- |
| `GET`  | `/api/admin/users`     | Manajemen pengguna.          |
| `GET`  | `/api/admin/faculties` | Manajemen fakultas.          |
| `GET`  | `/api/admin/majors`    | Manajemen jurusan.           |
| `GET`  | `/api/admin/courses`   | Manajemen mata kuliah.       |
| `GET`  | `/api/admin/semesters` | Manajemen semester.          |
| `GET`  | `/api/admin/classes`   | Manajemen kelas perkuliahan. |

## 🗄️ Struktur Database

Sistem ini memiliki struktur relasional yang kompleks mencakup entitas berikut:

- **Users & Roles Access Control**: `users`, `roles`, `personal_access_tokens`
- **Akademik Dasar**: `faculties`, `majors`, `semesters`, `courses`
- **Pengguna Spesifik**: `students`, `lecturers`
- **Perkuliahan**: `classes`, `schedules`
- **Aktivitas Akademik**: `student_krs` (Header KRS), `krs_details` (Detail Mata Kuliah), `student_grades` (Nilai Akhir)
- **Keuangan**: `tuition_fees`, `payments`

## ⚙️ Konfigurasi Environment (.env)

Pastikan variabel berikut dikonfigurasi dengan benar di file `.env`:

```env
APP_NAME="Siakad System"
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=siakad_db
DB_USERNAME=root
DB_PASSWORD=

# Konfigurasi Frontend (Jika diperlukan)
VITE_API_BASE_URL="${APP_URL}/api"
```

## �📋 Prasyarat

Sebelum memulai, pastikan Anda telah menginstal perangkat lunak berikut:

- [PHP](https://www.php.net/downloads) (versi 8.2 atau lebih baru)
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/) (versi 18 atau lebih baru) & NPM
- Database Server (MySQL/MariaDB) atau SQLite

## ⚙️ Instalasi

Ikuti langkah-langkah berikut untuk menjalankan proyek di lingkungan lokal Anda:

### 1. Clone Repository

```bash
git clone https://github.com/username/siakad-system.git
cd siakad-system
```

### 2. Setup Otomatis (Recommended)

Kami menyediakan script otomatis untuk mengatur seluruh lingkungan backend dan frontend sekaligus:

```bash
composer run setup
```

Perintah ini akan melakukan:

1.  Instalasi dependensi PHP (`composer install`).
2.  Menyalin `.env` dan generate key.
3.  Menjalankan migrasi database.
4.  Instalasi dependensi JavaScript (`npm install`).
5.  Build aset frontend (`npm run build`).

### 3. Setup Manual (Alternatif)

Jika script otomatis gagal atau Anda ingin kontrol lebih, ikuti langkah ini:

**Backend:**

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
```

**Frontend:**

```bash
npm install
npm run build
```

## 🖥️ Menjalankan Aplikasi

### Mode Pengembangan (Recommended)

Gunakan perintah tunggal ini untuk menjalankan Backend server, Queue listener, dan Frontend server (Vite) secara bersamaan:

```bash
composer run dev
```

Anda akan melihat output gabungan dari semua layanan yang berjalan. Akses aplikasi di `http://localhost:8000`.

## 🔐 Akun Demo

Berikut adalah akun default yang dapat digunakan untuk login setelah menjalankan migrasi database (`php artisan migrate --seed`):

| Role              | Username   | Password   | Email                  |
| :---------------- | :--------- | :--------- | :--------------------- |
| **Administrator** | `admin`    | `password` | `admin@siakad.ac.id`   |
| **Mahasiswa**     | `12345678` | `password` | `budi@student.ac.id`   |
| **Dosen**         | `dosen001` | `password` | `ahmad@lecturer.ac.id` |

### Menjalankan Secara Manual (Opsional)

Jika Anda ingin menjalankan proses secara terpisah di terminal yang berbeda:

**Terminal 1 (Laravel Server):**

```bash
php artisan serve
```

**Terminal 2 (Vite Server):**

```bash
npm run dev -- --host
```

## 📂 Struktur Proyek

Struktur direktori utama proyek:

```
siakad-system/
├── app/
│   ├── Http/Controllers/Api/
│   │   ├── Admin/    # Controller Khusus Admin (User, Matkul, dll)
│   │   ├── Dosen/    # Controller Khusus Dosen (Nilai, Kelas)
│   │   └── Mahasiswa/# Controller Khusus Mahasiswa (KRS, KHS, Profil)
│   └── Models/       # Eloquent Models (User, Student, Course, etc)
├── database/
│   ├── migrations/   # Schema Database
│   └── seeders/      # Data Awal (User Demo, Data Akademik)
├── public/           # Entry Point Web Server
├── resources/
│   ├── css/          # Tailwind CSS Config
│   └── js/
│       ├── Components/# Reusable React Components (Button, Input, Card)
│       ├── Layouts/   # Layout Wrapper (DashboardLayout, GuestLayout)
│       ├── Pages/     # Halaman Aplikasi (Login, Dashboard, Profile)
│       ├── Hooks/     # Custom React Hooks
│       └── app.jsx    # React Entry Point
├── routes/
│   ├── api.php       # Definisi Endpoint API (Grouped by Role)
│   └── web.php       # Route Web Utama
├── tests/            # Unit & Feature Testing
├── .env              # Konfigurasi Environment (Database, App Key)
├── composer.json     # Dependensi PHP/Laravel
├── package.json      # Dependensi JS/React
└── vite.config.js    # Konfigurasi Build Tool
```

## 🧪 Pengujian (Testing)

Proyek ini telah dilengkapi dengan Unit Test dan Feature Test untuk memastikan stabilitas aplikasi. Jalankan test suite menggunakan perintah berikut:

```bash
php artisan test
```

Perintah ini akan menjalankan semua test yang ada di direktori `tests/`, mencakup pengujian API endpoint, autentikasi, dan logika bisnis.

## ❓ Pemecahan Masalah (Troubleshooting)

Berikut adalah beberapa masalah umum yang mungkin terjadi dan cara mengatasinya:

### 1. `500 Server Error` saat mengakses API

- Pastikan file `.env` sudah ada dan dikonfigurasi dengan benar.
- Jalankan `php artisan key:generate`.
- Periksa log error di `storage/logs/laravel.log` untuk detail lebih lanjut.
- Pastikan direktori `storage` dan `bootstrap/cache` memiliki izin tulis (chmod 775).

### 2. `Vite manifest not found`

- Pastikan Anda telah menjalankan `npm run build` jika dalam mode produksi.
- Gunakan `composer run dev` atau `npm run dev` untuk development.

### 3. Masalah Koneksi Database

- Pastikan service database (MySQL) berjalan.
- Periksa kredensial (`DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`) di file `.env`.
- Coba akses database menggunakan tool seperti TablePlus atau DBeaver dengan kredensial yang sama.

### 4. Style tidak termuat (Tailwind CSS)

- Pastikan `npm run dev` sedang berjalan.
- Jika deploy ke subfolder, atur `ASSET_URL` di file `.env`.

## 🚢 Deployment

Untuk men-deploy aplikasi ini ke server produksi (VPS/Shared Hosting), ikuti panduan umum berikut:

### Server Requirements

- Web Server: Nginx atau Apache
- PHP >= 8.2
- Database: MySQL/MariaDB
- Node.js (hanya untuk build assets)

### Langkah-langkah Deployment

1.  **Upload Code**: Push kode ke server.
2.  **Install Dependencies**:
    ```bash
    composer install --optimize-autoloader --no-dev
    npm install
    npm run build
    ```
3.  **Environment Setup**:
    - Salin `.env.example` ke `.env`.
    - Set `APP_ENV=production` dan `APP_DEBUG=false`.
    - Set konfigurasi database.
    - Generate key: `php artisan key:generate`.
4.  **Database Migration**:
    ```bash
    php artisan migrate --force
    ```
5.  **Storage Link**:
    ```bash
    php artisan storage:link
    ```
6.  **Optimasi**:
    ```bash
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    ```
7.  **Konfigurasi Web Server**: Arahkan document root ke folder `public`.

## 👥 Kontribusi

Kontribusi selalu diterima! Silakan ikuti langkah-langkah ini:

1.  Fork repository ini.
2.  Buat branch fitur baru (`git checkout -b fitur-keren`).
3.  Commit perubahan Anda (`git commit -m 'Menambahkan fitur keren'`).
4.  Push ke branch (`git push origin fitur-keren`).
5.  Buat Pull Request.

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).
