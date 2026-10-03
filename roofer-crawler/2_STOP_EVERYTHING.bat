@echo off
cd /d "%~dp0"
echo Stopping the crawler and dashboard started from this folder...
powershell -NoProfile -Command "Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -like '*crawler_runner.py*' -or $_.CommandLine -like '*launcher.py*' -or ($_.CommandLine -like '*app.py*' -and $_.CommandLine -like '*python*') } | Where-Object { $_.CommandLine -like ('*' + (Get-Location).Path.Replace('\','\\') + '*') -or $_.ExecutablePath -like ('*' + (Get-Location).Path + '*') } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }"
echo Done. All progress is saved; you can resume any time.
pause
