@echo off
title Pasang Jadwal Otomatisasi Artikel - Bajo Rental
echo ========================================================
echo    PASANG JADWAL PUBLISHER OTOMATIS (2 ARTIKEL / HARI)
echo ========================================================
echo.
echo Menjadwalkan tugas otomatis di Windows Task Scheduler...
echo Tugas akan berjalan setiap hari pukul 08:00 pagi.
echo.

set SCRIPT_PATH=%~dp0auto_publisher.js
set NODE_PATH=node

schtasks /create /tn "BajoRental_AutoArticles" /tr "\"%NODE_PATH%\" \"%SCRIPT_PATH%\"" /sc daily /st 08:00 /f

echo.
if %errorlevel% equ 0 (
    echo [SUKSES] Jadwal otomatisasi berhasil dipasang di Windows Task Scheduler!
    echo Tugas "BajoRental_AutoArticles" akan berjalan otomatis setiap hari pukul 08:00 WITA/WIB.
) else (
    echo [INFO] Jika gagal karena izin Administrator, silakan klik kanan file ini lalu pilih "Run as administrator".
)
echo.
pause
