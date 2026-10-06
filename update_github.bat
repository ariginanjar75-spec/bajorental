@echo off
title Update Otomatis ke GitHub - Bajo Rental
setlocal enabledelayedexpansion
color 0b

echo ========================================================
echo     BAJO RENTAL TRIP & TOURS - PINTASAN UPDATE GITHUB
echo ========================================================
echo Repository : https://github.com/ariginanjar75-spec/bajorental
echo Branch     : main
echo Waktu      : %date% %time%
echo ========================================================
echo.

cd /d "%~dp0"

:: 1. Memeriksa status Git
echo [1/3] Memeriksa perubahan file lokal...
git status --short > "%temp%\git_status.tmp"
set /p STATUS=<"%temp%\git_status.tmp"

if "%STATUS%"=="" (
    echo [INFO] Tidak ada file baru atau perubahan yang perlu di-commit.
) else (
    echo [INFO] Ditemukan file baru/perubahan. Sedang menyiapkan upload...
    git add -A
    for /f "tokens=1-3 delims=/ " %%a in ("%date%") do set TGL=%%a-%%b-%%c
    for /f "tokens=1-2 delims=: " %%a in ("%time%") do set JAM=%%a:%%b
    git commit -m "Update otomatis: artikel SEO, sitemap & website [!TGL! !JAM!]"
)

echo.
:: 2. Melakukan Push ke GitHub
echo [2/3] Mengunggah file ke GitHub (git push origin main)...
git push origin main > "%temp%\git_push.log" 2>&1

if %errorlevel% equ 0 (
    echo.
    color 0a
    echo ========================================================
    echo  [SUKSES] SEMUA FILE BERHASIL DI-UPDATE KE GITHUB!
    echo ========================================================
    echo  - Repository: https://github.com/ariginanjar75-spec/bajorental
    echo  - Website   : https://www.bajorentaltriptours.com
    echo.
    echo Perubahan artikel, sitemap, dan halaman web kini live!
    echo ========================================================
) else (
    color 0c
    echo.
    echo ========================================================
    echo  [PERHATIAN] GAGAL PUSH KARENA IZIN / AKUN GITHUB
    echo ========================================================
    type "%temp%\git_push.log"
    echo.
    echo Windows Anda sebelumnya menyimpan akun GitHub lain (rencartalombok-create),
    echo sedangkan repo ini milik akun: ariginanjar75-spec.
    echo.
    echo Pilihlah salah satu solusi di bawah ini:
    echo.
    echo [1] Masukkan GitHub Personal Access Token (PAT) akun ariginanjar75-spec
    echo     (Cukup masukkan sekali, selanjutnya otomatis 1-klik selamanya)
    echo.
    echo [2] Buka Halaman Upload Manual di Browser
    echo     (https://github.com/ariginanjar75-spec/bajorental/upload/main)
    echo.
    echo [3] Keluar
    echo ========================================================
    set /p PILIHAN="Pilih nomor (1/2/3): "

    if "!PILIHAN!"=="1" (
        echo.
        echo Cara buat Token (hanya 1 menit):
        echo 1. Buka: https://github.com/settings/tokens
        echo 2. Generate new token (classic) -> centang 'repo' -> Generate token.
        echo.
        set /p GHTOKEN="Tempel (Paste) Token GitHub Anda di sini: "
        if not "!GHTOKEN!"=="" (
            git remote set-url origin https://!GHTOKEN!@github.com/ariginanjar75-spec/bajorental.git
            echo Menghubungkan ulang dengan token...
            git push origin main
            if !errorlevel! equ 0 (
                color 0a
                echo.
                echo [SUKSES] Token berhasil disimpan! Push ke GitHub berhasil!
            ) else (
                echo [ERROR] Token salah atau tidak memiliki izin akses 'repo'.
            )
        )
    )

    if "!PILIHAN!"=="2" (
        start https://github.com/ariginanjar75-spec/bajorental/upload/main
    )
)

echo.
pause
