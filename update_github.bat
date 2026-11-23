@echo off
@chcp 65001 >nul
title Update Otomatis ke GitHub - Bajo Rental
setlocal enabledelayedexpansion
color 0b

echo ========================================================
echo   BAJO RENTAL - UPDATE ^& UPLOAD OTOMATIS KE GITHUB
echo ========================================================
echo Waktu: %date% %time%
echo ========================================================
echo.

cd /d "%~dp0"

:: 1. Sync perubahan website
echo [1/3] Menyiapkan perubahan file...
git add -A

:: Cek apakah ada perubahan untuk dicommit
git diff-index --quiet HEAD --
if %errorlevel% neq 0 (
    for /f "tokens=1-3 delims=/ " %%a in ("%date%") do set TGL=%%a-%%b-%%c
    for /f "tokens=1-2 delims=: " %%a in ("%time%") do set JAM=%%a:%%b
    git commit -m "Update website Bajo Rental [!TGL! !JAM!]"
) else (
    echo [INFO] Tidak ada perubahan baru yang perlu dicommit.
)

:: 2. Push ke GitHub
echo.
echo [2/3] Mengunggah file ke GitHub (git push origin main)...
git push origin main

if %errorlevel% equ 0 (
    echo.
    color 0a
    echo ========================================================
    echo  [SUKSES] SEMUA FILE BERHASIL DI-UPLOAD KE GITHUB!
    echo ========================================================
    echo  - Repository: https://github.com/ariginanjar75-spec/bajorental
    echo  - Website   : https://www.bajorentaltriptours.com
    echo.
    echo Perubahan kini live dalam 1-2 menit!
    echo ========================================================
) else (
    color 0c
    echo.
    echo ========================================================
    echo  [GAGAL] Gagal mengunggah ke GitHub.
    echo  Buka LAUNCHER_UPDATE_GITHUB.bat untuk opsi perbaikan token.
    echo ========================================================
)

echo.
pause
