@echo off
title Bajo Rental Trip & Tours - Auto Article Publisher
echo ========================================================
echo    BAJO RENTAL TRIP & TOURS - PUBLISHER ARTIKEL HARIAN
echo ========================================================
echo.
echo Sedang memproses publikasi 2 artikel untuk hari ini...
echo.

node "%~dp0scripts\auto_publisher.js"

echo.
echo ========================================================
echo    PROSES SELESAI!
echo    - Artikel baru dibuat di folder /artikel/
echo    - Halaman hub /artikel/index.html telah diperbarui
echo    - sitemap.xml telah diperbarui untuk Google Indexing
echo ========================================================
echo.
pause
