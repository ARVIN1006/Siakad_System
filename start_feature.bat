@echo off
set "branchName=%1"
if "%branchName%"=="" (
    echo [ERROR] Masukkan nama fitur!
    echo Contoh: .\start_feature.bat login-page
    exit /b 1
)

echo [INFO] Memperbarui branch develop...
git checkout develop
git pull origin develop

echo [INFO] Membuat branch fitur baru: feature/%branchName%
git checkout -b feature/%branchName%

echo.
echo [SUCCESS] Branch feature/%branchName% siap digunakan!
echo Silakan mulai coding...
pause
