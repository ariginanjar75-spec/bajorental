@echo off
title Pengaturan Token GitHub - ariginanjar75-spec
color 0b
cd /d "%~dp0"
echo ========================================================
echo     PENGATURAN TOKEN GITHUB (ariginanjar75-spec)
echo ========================================================
echo.
echo Langkah ini hanya perlu dilakukan 1 KALI saja agar Windows
echo tidak bentrok dengan akun GitHub lama (rencartalombok-create).
echo.
echo CARA MENDAPATKAN TOKEN (1 Menit):
echo 1. Buka browser: https://github.com/settings/tokens
echo 2. Klik tombol "Generate new token" -> pilih "Generate new token (classic)"
echo 3. Beri Note: "Laptop Bajo Rental"
echo 4. Centang kotak [x] repo (Full control of private repositories)
echo 5. Scroll ke bawah, klik "Generate token"
echo 6. Salin (Copy) kode token yang muncul (awalan ghp_...)
echo ========================================================
echo.

set /p GHTOKEN="Tempel (Paste) Token GitHub Anda di sini lalu tekan ENTER: "

if "%GHTOKEN%"=="" (
    echo [BATAL] Tidak ada token yang dimasukkan.
    pause
    exit /b
)

echo.
echo Menghubungkan repository ke akun ariginanjar75-spec...
git remote set-url origin https://%GHTOKEN%@github.com/ariginanjar75-spec/bajorental.git

echo Menguji upload ke GitHub...
git push origin main

if %errorlevel% equ 0 (
    color 0a
    echo.
    echo ========================================================
    echo  [SUKSES] TOKEN BERHASIL DISIMPAN & PUSH BERHASIL!
    echo ========================================================
    echo  Mulai sekarang, Anda tinggal klik ganda launcher di Desktop:
    echo  "Launcher Bajo Rental GitHub"
    echo  Semua file akan ter-upload otomatis dalam hitungan detik!
    echo ========================================================
) else (
    color 0c
    echo.
    echo ========================================================
    echo  [ERROR] Upload gagal. Pastikan:
    echo  1. Token benar (awalan ghp_...)
    echo  2. Kotak 'repo' sudah dicentang saat membuat token
    echo ========================================================
)

echo.
pause
