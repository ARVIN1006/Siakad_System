# ⚙️ Sistem Informasi Akademik (SIAKAD) - Backend Repository

Repo ini berfokus pada **logika bisnis, manajemen data, dan keamanan (API)**.

## 🧱 Teknologi yang Digunakan

- **Core**: Laravel 11.x (PHP 8.2+)
- **Database**: PostgreSQL / MySQL
- **Authentication**: Laravel Sanctum / Breeze (Session & Token)
- **ORM**: Eloquent

## 📂 Struktur Folder Utama

- `app/Http/Controllers` - Mengatur alur data (API Logic, Student Controller, Admin Controller).
- `routes/` - Definisi rute (`api.php` dan `web.php`).
- `database/migrations` - Struktur tabel database.
- `app/Models` - Representasi data (User, Course, Grade).

## 🛠️ Cara Menjalankan (Development)

Pastikan database sudah dikonfigurasi di `.env`, lalu jalankan:

```bash
composer install
php artisan migrate --seed
php artisan serve
```

---

_Branch ini dikhususkan untuk pengembangan fitur server-side, API, dan manajemen database._
