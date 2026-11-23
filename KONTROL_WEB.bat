@echo off
@chcp 65001 >nul
title Panel Kontrol Website - Bajo Rental Trip ^& Tours
setlocal enabledelayedexpansion
color 0b

echo ========================================================
echo   BAJO RENTAL TRIP ^& TOURS - PANEL KONTROL WEBSITE
echo ========================================================
echo Fitur:
echo  - Tambah, Edit, Hapus Mobil / Armada
echo  - Ubah Harga Sewa (Lepas Kunci ^& Driver + BBM)
echo  - Upload Foto Mobil Baru
echo  - Ubah Nomor WhatsApp ^& Pengaturan Website
echo  - 1-Klik Upload ke GitHub (Web Live)
echo ========================================================
echo.

cd /d "%~dp0"

:: 1. Periksa Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    if exist "C:\Program Files\nodejs\node.exe" (
        set "PATH=C:\Program Files\nodejs;!PATH!"
    ) else (
        color 0c
        echo [ERROR] Node.js belum terdeteksi di komputer Anda.
        echo Silakan install Node.js dari https://nodejs.org/
        echo.
        pause
        exit /b 1
    )
)

echo [1/2] Menyiapkan server kontrol web...
echo [2/2] Membuka browser ke http://localhost:3300...
echo.
echo ========================================================
echo  Server aktif! Jendela ini HARUS TETAP DIBUKA
echo  selama Anda menggunakan Panel Kontrol.
echo  (Tekan Ctrl + C untuk mematikan server kapan saja)
echo ========================================================
echo.

node "%~dp0scripts\admin_server.js" --open

if %errorlevel% neq 0 (
    echo.
    echo Terjadi kendala saat menjalankan server kontrol web.
    pause
)
