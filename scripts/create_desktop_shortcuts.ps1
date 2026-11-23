$desktop = [Environment]::GetFolderPath('Desktop')
$wsh = New-Object -ComObject WScript.Shell
$projectDir = "D:\bang jey\webtipjey"
$cmdExe = "$env:SystemRoot\System32\cmd.exe"

# 1. Shortcut Utama: Panel Kontrol Website
$scAdmin = $wsh.CreateShortcut("$desktop\Panel Kontrol Bajo Rental.lnk")
$scAdmin.TargetPath = $cmdExe
$scAdmin.Arguments = "/c `"`"$projectDir\KONTROL_WEB.bat`"`""
$scAdmin.WorkingDirectory = $projectDir
$scAdmin.IconLocation = "$env:SystemRoot\System32\shell32.dll,220"
$scAdmin.Description = "Panel Kontrol Website Bajo Rental - Edit Mobil, Tambah Mobil, Ubah Harga & WA"
$scAdmin.Save()

# 2. Shortcut Launcher Update GitHub
$scLauncher = $wsh.CreateShortcut("$desktop\Launcher Bajo Rental GitHub.lnk")
$scLauncher.TargetPath = $cmdExe
$scLauncher.Arguments = "/c `"`"$projectDir\LAUNCHER_UPDATE_GITHUB.bat`"`""
$scLauncher.WorkingDirectory = $projectDir
$scLauncher.IconLocation = "$env:SystemRoot\System32\shell32.dll,14"
$scLauncher.Description = "Launcher Pintasan Update Website Bajo Rental ke GitHub"
$scLauncher.Save()

# 3. Shortcut Cepat: Update Bajo Rental ke GitHub
$sc1 = $wsh.CreateShortcut("$desktop\Update Bajo Rental ke GitHub.lnk")
$sc1.TargetPath = $cmdExe
$sc1.Arguments = "/c `"`"$projectDir\LAUNCHER_UPDATE_GITHUB.bat`"`""
$sc1.WorkingDirectory = $projectDir
$sc1.IconLocation = "$env:SystemRoot\System32\shell32.dll,44"
$sc1.Description = "Pintasan Update Website Bajo Rental ke GitHub"
$sc1.Save()

# 4. Shortcut: Terbitkan Artikel & Push GitHub
$sc2 = $wsh.CreateShortcut("$desktop\Publish 2 Artikel & Push GitHub.lnk")
$sc2.TargetPath = $cmdExe
$sc2.Arguments = "/c `"`"$projectDir\publish_and_push.bat`"`""
$sc2.WorkingDirectory = $projectDir
$sc2.IconLocation = "$env:SystemRoot\System32\shell32.dll,138"
$sc2.Description = "Terbitkan 2 Artikel SEO & Otomatis Push ke GitHub"
$sc2.Save()

Write-Host "[SUKSES] Pintasan berhasil diperbarui di Desktop Windows:" -ForegroundColor Green
Write-Host "1. $desktop\Panel Kontrol Bajo Rental.lnk (Utama)" -ForegroundColor Yellow
Write-Host "2. $desktop\Launcher Bajo Rental GitHub.lnk" -ForegroundColor Cyan
Write-Host "3. $desktop\Update Bajo Rental ke GitHub.lnk" -ForegroundColor Cyan
Write-Host "4. $desktop\Publish 2 Artikel & Push GitHub.lnk" -ForegroundColor Cyan
