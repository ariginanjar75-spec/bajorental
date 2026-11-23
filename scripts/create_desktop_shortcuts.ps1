$desktop = [Environment]::GetFolderPath('Desktop')
$wsh = New-Object -ComObject WScript.Shell

# 1. Shortcut Utama: Launcher Update GitHub
$scLauncher = $wsh.CreateShortcut("$desktop\Launcher Bajo Rental GitHub.lnk")
$scLauncher.TargetPath = 'D:\bang jey\webtipjey\LAUNCHER_UPDATE_GITHUB.bat'
$scLauncher.WorkingDirectory = 'D:\bang jey\webtipjey'
$scLauncher.IconLocation = 'shell32.dll,14'
$scLauncher.Description = 'Launcher Pintasan Update Website Bajo Rental ke GitHub'
$scLauncher.Save()

# 2. Shortcut Cepat: Update Bajo Rental ke GitHub
$sc1 = $wsh.CreateShortcut("$desktop\Update Bajo Rental ke GitHub.lnk")
$sc1.TargetPath = 'D:\bang jey\webtipjey\LAUNCHER_UPDATE_GITHUB.bat'
$sc1.WorkingDirectory = 'D:\bang jey\webtipjey'
$sc1.IconLocation = 'shell32.dll,44'
$sc1.Description = 'Pintasan Update Website Bajo Rental ke GitHub'
$sc1.Save()

# 3. Shortcut: Terbitkan Artikel & Push GitHub
$sc2 = $wsh.CreateShortcut("$desktop\Publish 2 Artikel & Push GitHub.lnk")
$sc2.TargetPath = 'D:\bang jey\webtipjey\publish_and_push.bat'
$sc2.WorkingDirectory = 'D:\bang jey\webtipjey'
$sc2.IconLocation = 'shell32.dll,138'
$sc2.Description = 'Terbitkan 2 Artikel SEO & Otomatis Push ke GitHub'
$sc2.Save()

Write-Host "[SUKSES] Pintasan berhasil diperbarui di Desktop Windows:" -ForegroundColor Green
Write-Host "1. $desktop\Launcher Bajo Rental GitHub.lnk" -ForegroundColor Cyan
Write-Host "2. $desktop\Update Bajo Rental ke GitHub.lnk" -ForegroundColor Cyan
Write-Host "3. $desktop\Publish 2 Artikel & Push GitHub.lnk" -ForegroundColor Cyan
