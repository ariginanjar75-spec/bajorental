@echo off
title Terbitkan 2 Artikel & Push ke GitHub - Bajo Rental
setlocal enabledelayedexpansion
color 0b

echo ========================================================
echo   BAJO RENTAL - PUBLISH 2 ARTIKEL HARIAN + PUSH GITHUB
echo ========================================================
echo Waktu: %date% %time%
echo ========================================================
echo.

cd /d "%~dp0"

:: 1. Jalankan publisher artikel harian
echo [LANGKAH 1/2] Membuat & menerbitkan 2 artikel SEO hari ini...
node "%~dp0scripts\auto_publisher.js"

echo.
:: 2. Jalankan update ke GitHub
echo [LANGKAH 2/2] Mengunggah artikel baru & sitemap ke GitHub...
call "%~dp0update_github.bat"
