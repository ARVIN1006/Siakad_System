@echo off
echo ==========================================
echo      Siakad System Git Push Helper
echo ==========================================
echo.
echo Saat ini script akan memisahkan perubahan Backend dan Frontend secara otomatis.
echo.

echo [1/3] Memproses Perubahan Backend (Logic dan Database)...
git add app config database routes tests composer.json composer.lock artisan bootstrap phpunit.xml README_BACKEND.md push_updates.bat
git commit -m "refactor(backend): update logic and database structure"
if %ERRORLEVEL% EQU 0 (
    echo    -> Perubahan Backend berhasil di-commit.
) else (
    echo    -> Tidak ada perubahan Backend atau sudah ter-commit sebelumnya.
)

echo.
echo [2/3] Memproses Perubahan Frontend (UI dan Assets)...
git add resources public vite.config.js package.json package-lock.json README_FRONTEND.md
git commit -m "feat(ui): update frontend components and assets"
if %ERRORLEVEL% EQU 0 (
    echo    -> Perubahan Frontend berhasil di-commit.
) else (
    echo    -> Tidak ada perubahan Frontend atau sudah ter-commit sebelumnya.
)

echo.
echo [3/3] Mengirim (Push) ke GitHub...
echo    -> Mengirim ke branch Frontend...
git push origin Main:Frontend
echo    -> Mengirim ke branch Backend...
git push origin Main:Backend
echo    -> Sinkronisasi ke branch Main...
git push origin Main

echo.
echo ==========================================
echo             SELESAI!
echo ==========================================
pause
