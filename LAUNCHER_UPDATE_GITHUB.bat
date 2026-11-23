@echo off
title LAUNCHER UPDATE GITHUB - BAJO RENTAL TRIP ^& TOURS
setlocal enabledelayedexpansion
color 0b

:: Pindah ke direktori project
cd /d "%~dp0"

:MENU
cls
color 0b
echo ========================================================================
echo        BAJO RENTAL TRIP ^& TOURS - LAUNCHER PINTASAN GITHUB
echo ========================================================================
echo  Repository Target : https://github.com/ariginanjar75-spec/bajorental
echo  Branch Default    : main
echo  Website Resmi     : https://www.bajorentaltriptours.com
echo  Waktu Sistem      : %date% %time%
echo ========================================================================
echo.
echo  PILIH AKSI YANG INGIN DIJALANKAN:
echo.
echo   [1] UPDATE + PUSH SEKARANG (1-Klik Upload Semua Perubahan ke GitHub)
echo   [2] TERBITKAN 2 ARTIKEL HARIAN + OTOMATIS PUSH KE GITHUB
echo   [3] ATUR / SIMPAN TOKEN GITHUB (Personal Access Token / PAT)
echo   [4] CEK STATUS + SINKRONISASI DARI GITHUB (Git Pull)
echo   [5] BUKA REPOSITORY GITHUB DI BROWSER
echo   [6] BUAT / PERBARUI PINTASAN (SHORTCUT) DI DESKTOP
echo   [0] KELUAR
echo.
echo ========================================================================
set PILIHAN=
set /p PILIHAN="Masukkan nomor pilihan [1-6, 0]: "
if defined PILIHAN set PILIHAN=!PILIHAN: =!

if "!PILIHAN!"=="1" goto PUSH_SEKARANG
if "!PILIHAN!"=="2" goto PUBLISH_DAN_PUSH
if "!PILIHAN!"=="3" goto ATUR_TOKEN
if "!PILIHAN!"=="4" goto CEK_SINKRON
if "!PILIHAN!"=="5" goto BUKA_BROWSER
if "!PILIHAN!"=="6" goto BUAT_SHORTCUT
if "!PILIHAN!"=="0" goto KELUAR

echo.
echo [PILIHAN TIDAK VALID] Silakan ketik angka 1 sampai 6, atau 0.
ping -n 2 127.0.0.1 >nul
goto MENU


:: ========================================================================
:: 1. PROSES UPDATE & PUSH KE GITHUB
:: ========================================================================
:PUSH_SEKARANG
cls
color 0b
echo ========================================================================
echo           PROSES UPDATE WEBSITE KE GITHUB REPOSITORY
echo ========================================================================
echo  Repo: https://github.com/ariginanjar75-spec/bajorental
echo ========================================================================
echo.

:: 1. Cek Remote URL
echo [LANGKAH 1/4] Memeriksa konfigurasi remote Git...
for /f "tokens=*" %%u in ('git remote get-url origin 2^>nul') do set CURRENT_REMOTE=%%u

if "%CURRENT_REMOTE%"=="" (
    echo [INFO] Remote origin belum diatur. Mengatur remote origin...
    git remote add origin https://github.com/ariginanjar75-spec/bajorental.git
)

:: 2. Cek Perubahan File
echo [LANGKAH 2/4] Memeriksa perubahan file lokal...
git status --short > "%temp%\git_status_check.tmp"
set HAS_CHANGES=0
for /f "usebackq" %%A in ("%temp%\git_status_check.tmp") do set HAS_CHANGES=1

if "!HAS_CHANGES!"=="0" (
    echo [INFO] Tidak ada file baru atau perubahan yang perlu di-commit.
    echo Melanjutkan push untuk sinkronisasi commit yang belum terunggah...
) else (
    echo [INFO] Mendeteksi file yang diubah/baru. Memproses git add ^& commit...
    git add -A
    for /f "tokens=1-3 delims=/ " %%a in ("%date%") do set TGL=%%a-%%b-%%c
    for /f "tokens=1-2 delims=: " %%a in ("%time%") do set JAM=%%a:%%b
    git commit -m "Update website Bajo Rental [!TGL! !JAM!]"
)

:: 3. Melakukan Push ke GitHub
echo.
echo [LANGKAH 3/4] Mengunggah perubahan ke GitHub (git push origin main)...
echo Harap tunggu sebentar...
echo.

git push origin main
if %errorlevel% equ 0 goto PUSH_SUKSES
goto PUSH_GAGAL

:PUSH_SUKSES
echo.
color 0a
echo ========================================================================
echo   [SUKSES] SEMUA FILE BERHASIL DI-UPDATE KE GITHUB!
echo ========================================================================
echo   - Repository: https://github.com/ariginanjar75-spec/bajorental
echo   - Website   : https://www.bajorentaltriptours.com
echo.
echo Perubahan halaman web, artikel, dan sitemap kini sudah live di GitHub!
echo ========================================================================
echo.
echo Tekan tombol apa saja untuk kembali ke menu utama...
pause >nul
goto MENU

:PUSH_GAGAL
color 0c
echo.
echo ========================================================================
echo   [PERHATIAN] GAGAL PUSH KE GITHUB (KENDALA AKSES / PERMISSION)
echo ========================================================================
echo Push gagal. Penyebab paling sering:
echo  1. Belum memasukkan GitHub Personal Access Token (PAT).
echo  2. Windows Credential Manager bentrok dengan akun GitHub lain.
echo  3. Ada update di GitHub yang belum di-pull ke laptop ini.
echo ========================================================================
echo.
echo Pilihan Solusi:
echo  [1] Masukkan Personal Access Token (PAT) Sekarang (Langsung disimpan ^& dicoba lagi)
echo  [2] Coba Sinkronkan dari GitHub Terlebih Dahulu (Git Pull)
echo  [3] Buka Halaman GitHub Token di Browser untuk Membuat Token Baru
echo  [4] Buka Halaman Upload Manual di Browser
echo  [0] Kembali ke Menu Utama
echo.
set SOLUSI=
set /p SOLUSI="Pilih solusi [1/2/3/4/0]: "
if defined SOLUSI set SOLUSI=!SOLUSI: =!

if "!SOLUSI!"=="1" goto INPUT_TOKEN_LANGSUNG
if "!SOLUSI!"=="2" (
    echo.
    echo Menjalankan git pull origin main...
    git pull origin main --rebase
    echo Mencoba push ulang...
    git push origin main
    if !errorlevel! equ 0 goto PUSH_SUKSES
    goto PUSH_GAGAL
)
if "!SOLUSI!"=="3" (
    start https://github.com/settings/tokens
    echo Browser dibuka. Setelah membuat token, pilih opsi [1] untuk memasukkannya.
    pause
    goto PUSH_GAGAL
)
if "!SOLUSI!"=="4" (
    start https://github.com/ariginanjar75-spec/bajorental/upload/main
    goto MENU
)
goto MENU


:: ========================================================================
:: 2. PUBLISH 2 ARTIKEL HARIAN + PUSH GITHUB
:: ========================================================================
:PUBLISH_DAN_PUSH
cls
color 0b
echo ========================================================================
echo       TERBITKAN 2 ARTIKEL SEO HARIAN + PUSH OTOMATIS KE GITHUB
echo ========================================================================
echo.
echo [1/2] Menjalankan generator 2 artikel SEO hari ini...
node "%~dp0scripts\auto_publisher.js"
echo.
echo [2/2] Mengunggah artikel baru, hub index, dan sitemap ke GitHub...
goto PUSH_SEKARANG


:: ========================================================================
:: 3. ATUR / SIMPAN TOKEN GITHUB
:: ========================================================================
:ATUR_TOKEN
cls
color 0b
echo ========================================================================
echo             PENGATURAN TOKEN GITHUB (ariginanjar75-spec)
echo ========================================================================
echo.
echo Langkah ini hanya perlu dilakukan 1 KALI agar laptop ini
echo selalu otomatis terautentikasi ke repository tanpa konflik akun.
echo.
echo CARA MENDAPATKAN TOKEN GITHUB (Hanya 1 Menit):
echo  1. Buka link: https://github.com/settings/tokens
echo  2. Klik tombol "Generate new token" -^> pilih "Generate new token (classic)"
echo  3. Kolom 'Note' isi: "Bajo Rental Laptop"
echo  4. Kolom 'Expiration' pilih: No expiration (atau sesuai keinginan)
echo  5. Centang kotak: [x] repo (Full control of private repositories)
echo  6. Scroll ke paling bawah, klik "Generate token" (tombol hijau)
echo  7. Salin/Copy kode token yang muncul (format: ghp_xxxxxxxxxxxxxxxxxxxx)
echo ========================================================================
echo.
echo [1] Buka halaman token GitHub di Browser sekarang
echo [2] Saya sudah punya Token, langsung masukkan token
echo [0] Kembali ke Menu Utama
echo.
set PILIH_TOKEN=
set /p PILIH_TOKEN="Pilih [1/2/0]: "
if defined PILIH_TOKEN set PILIH_TOKEN=!PILIH_TOKEN: =!

if "!PILIH_TOKEN!"=="1" (
    start https://github.com/settings/tokens
    goto INPUT_TOKEN_LANGSUNG
)
if "!PILIH_TOKEN!"=="2" goto INPUT_TOKEN_LANGSUNG
goto MENU

:INPUT_TOKEN_LANGSUNG
echo.
set USER_TOKEN=
set /p USER_TOKEN="Tempel (Paste) Token GitHub Anda di sini lalu tekan ENTER: "
if defined USER_TOKEN set USER_TOKEN=!USER_TOKEN: =!
if "%USER_TOKEN%"=="" (
    echo [BATAL] Token kosong.
    ping -n 2 127.0.0.1 >nul
    goto MENU
)

echo.
echo Menyimpan token ke konfigurasi Git...
git remote set-url origin https://%USER_TOKEN%@github.com/ariginanjar75-spec/bajorental.git

echo Menguji upload ke GitHub dengan token baru...
git push origin main
if %errorlevel% equ 0 (
    cls
    color 0a
    echo ========================================================================
    echo   [SUKSES] TOKEN VALID ^& BERHASIL DISIMPAN!
    echo ========================================================================
    echo   Token telah disimpan secara permanen di repository ini.
    echo   Mulai sekarang Anda bisa 1-Klik Update tanpa perlu input token lagi!
    echo ========================================================================
    echo.
    pause
    goto MENU
) else (
    color 0c
    echo.
    echo ========================================================================
    echo   [GAGAL] Token tidak valid atau tidak memiliki centang izin 'repo'.
    echo   Pastikan token diawali dengan 'ghp_' dan opsi 'repo' sudah dicentang.
    echo ========================================================================
    echo.
    pause
    goto MENU
)


:: ========================================================================
:: 4. CEK STATUS & SINKRONISASI (GIT PULL)
:: ========================================================================
:CEK_SINKRON
cls
color 0b
echo ========================================================================
echo                STATUS REPOSITORY ^& SINKRONISASI GIT
echo ========================================================================
echo.
echo Status perubahan lokal saat ini:
git status
echo.
echo ========================================================================
echo Mencoba sinkronisasi update terbaru dari GitHub (git pull origin main)...
git pull origin main --rebase
echo ========================================================================
echo.
pause
goto MENU


:: ========================================================================
:: 5. BUKA REPOSITORY GITHUB DI BROWSER
:: ========================================================================
:BUKA_BROWSER
echo Membuka repository di browser...
start https://github.com/ariginanjar75-spec/bajorental
goto MENU


:: ========================================================================
:: 6. BUAT / PERBARUI PINTASAN DI DESKTOP
:: ========================================================================
:BUAT_SHORTCUT
cls
color 0b
echo ========================================================================
echo               MEMBUAT PINTASAN DI DESKTOP WINDOWS
echo ========================================================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -Command "& '%~dp0scripts\create_desktop_shortcuts.ps1'"
echo.
pause
goto MENU


:: ========================================================================
:: KELUAR
:: ========================================================================
:KELUAR
cls
echo Terima kasih! Launcher ditutup.
ping -n 2 127.0.0.1 >nul
exit /b 0
