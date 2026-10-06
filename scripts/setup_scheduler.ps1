# Setup Scheduled Task untuk Auto Publisher Artikel Bajo Rental
$Action = New-ScheduledTaskAction -Execute "node.exe" -Argument "`"$PSScriptRoot\auto_publisher.js`"" -WorkingDirectory (Split-Path $PSScriptRoot -Parent)
$Trigger = New-ScheduledTaskTrigger -Daily -At 8am
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
$TaskName = "BajoRental_AutoArticles"

try {
    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false -ErrorAction SilentlyContinue
    Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Settings $Settings -Description "Auto Publish 2 Artikel Harian Bajo Rental Trip & Tours" | Out-Null
    Write-Host "[SUKSES] Tugas otomatisasi berhasil dipasang di Windows Task Scheduler!" -ForegroundColor Green
    Write-Host "Nama Tugas: $TaskName" -ForegroundColor Cyan
    Write-Host "Jadwal: Setiap hari pukul 08:00 AM" -ForegroundColor Cyan
} catch {
    Write-Host "[ERROR] Gagal mendaftarkan tugas: $_" -ForegroundColor Red
    Write-Host "Silakan jalankan PowerShell sebagai Administrator." -ForegroundColor Yellow
}
