# 🚀 SIAKAD Database Setup - DDEV

## Quick Start

Anda sudah menggunakan DDEV! Database MySQL/MariaDB sudah tersedia di container DDEV.

### 1. Import Database

**Gunakan script otomatis:**

```bash
./database/import_ddev.sh
```

**Atau manual:**

```bash
# Import SQL ke database
ddev mysql < database/siakad.sql

# Verifikasi
ddev mysql -e "USE db; SHOW TABLES;"
```

### 2. Test Aplikasi

```bash
# Cek migrations
ddev exec php artisan migrate:status

# Run seeders (opsional)
ddev exec php artisan db:seed

# Akses aplikasi
```

Buka: **https://siakadproject.ddev.site**

---

## Database Info

- **Host:** `db` (internal DDEV)
- **Port:** `3306`
- **Database:** `db`
- **Username:** `db`
- **Password:** `db`

Konfigurasi di `.env` sudah benar ✅

---

## Perintah DDEV Berguna

```bash
# Database commands
ddev mysql                    # MySQL shell
ddev mysql -e "SHOW TABLES;"  # Run SQL
ddev import-db --file=backup.sql  # Import backup

# Laravel commands
ddev exec php artisan migrate:status
ddev exec php artisan migrate:fresh
ddev exec php artisan db:seed
ddev exec php artisan serve

# Container management
ddev start                    # Start DDEV
ddev stop                     # Stop DDEV
ddev restart                  # Restart
ddev describe                 # Info
ddev logs                     # View logs

# Database backup
ddev export-db > backup_$(date +%Y%m%d).sql
```

---

## Troubleshooting

### Docker Permission Error

```bash
# Di terminal baru (bukan di dalam DDEV)
sudo usermod -aG docker $USER
newgrp docker

# Test
docker ps
ddev start
```

### Database Connection Error

```bash
# Restart DDEV
ddev restart

# Cek config
ddev describe

# Test koneksi
ddev mysql -e "SELECT 1;"
```

### Reset Database

```bash
# Drop semua dan import ulang
ddev mysql -e "DROP DATABASE db; CREATE DATABASE db;"
ddev mysql < database/siakad_complete.sql
```

---

**Database sudah siap digunakan!** 🎉

File `database/siakad_complete.sql` berisi **24 tabel** untuk sistem SIAKAD lengkap.
