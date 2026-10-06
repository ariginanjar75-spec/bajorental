$desktop = [Environment]::GetFolderPath('Desktop')
$wsh = New-Object -ComObject WScript.Shell

# 1. Shortcut Update GitHub
$sc1 = $wsh.CreateShortcut("$desktop\Update Bajo Rental ke GitHub.lnk")
$sc1.TargetPath = 'D:\bang jey\webtipjey\update_github.bat'
$sc1.WorkingDirectory = 'D:\bang jey\webtipjey'
$sc1.IconLocation = 'shell32.dll,44'
$sc1.Description = 'Pintasan 1-Klik Update Website Bajo Rental ke GitHub'
$sc1.Save()

# 2. Shortcut Terbitkan Artikel & Push GitHub
$sc2 = $wsh.CreateShortcut("$desktop\Publish 2 Artikel & Push GitHub.lnk")
$sc2.TargetPath = 'D:\bang jey\webtipjey\publish_and_push.bat'
$sc2.WorkingDirectory = 'D:\bang jey\webtipjey'
$sc2.IconLocation = 'shell32.dll,138'
$sc2.Description = 'Terbitkan 2 Artikel SEO & Otomatis Push ke GitHub'
$sc2.Save()

Write-Host "[SUKSES] Dua pintasan berhasil dibuat di Desktop Windows:" -ForegroundColor Green
Write-Host "1. $desktop\Update Bajo Rental ke GitHub.lnk" -ForegroundColor Cyan
Write-Host "2. $desktop\Publish 2 Artikel & Push GitHub.lnk" -ForegroundColor Cyan
