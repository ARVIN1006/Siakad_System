@echo off
set "branchName=%1"

REM Cek apakah sedang di branch feature/*
for /f "tokens=*" %%a in ('git rev-parse --abbrev-ref HEAD') do set currentBranch=%%a
echo [INFO] Branch saat ini: %currentBranch%

if "%branchName%"=="" (
    echo [ERROR] Masukkan pesan commit final!
    echo Contoh: .\finish_feature.bat "done: implement login page"
    exit /b 1
)

echo [1/4] Menyimpan perubahan...
git add .
git commit -m "%branchName%"

echo [2/4] Pindah ke develop dan update...
git checkout develop
git pull origin develop

echo [3/4] Menggabungkan fitur ke develop...
git merge %currentBranch% --no-ff

echo [4/4] Push develop ke server...
git push origin develop

echo.
echo [INFO] Menghapus branch fitur lokal...
git branch -d %currentBranch%

echo.
echo [SUCCESS] Fitur selesai! Branch develop sudah terupdate.
pause
