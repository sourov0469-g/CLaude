@echo off
cd /d "%~dp0"
echo Stopping crawler and dashboard started from this folder...
powershell -NoProfile -Command "Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -like '*roofer-crawler*' -and ($_.CommandLine -like '*crawler_runner.py*' -or $_.CommandLine -like '*app.py*') } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }"
echo Done. Progress is saved; you can resume any time.
pause
