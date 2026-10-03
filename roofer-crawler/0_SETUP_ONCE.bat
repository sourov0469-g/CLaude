@echo off
cd /d "%~dp0"
title Roofer Lead Crawler - Setup
where py >nul 2>nul && (set PY=py) || (where python >nul 2>nul && (set PY=python) || goto nopython)
if not exist ".venv\Scripts\python.exe" (%PY% -m venv .venv || goto fail)
call .venv\Scripts\python.exe -m pip install --upgrade pip
call .venv\Scripts\python.exe -m pip install -r requirements.txt || goto fail
echo Running self-tests...
call .venv\Scripts\python.exe tests\test_dashboard.py || goto fail
call .venv\Scripts\python.exe tests\test_integration.py || goto fail
call .venv\Scripts\python.exe tests\test_qa.py || goto fail
call .venv\Scripts\python.exe tests\test_enrichment.py || goto fail
echo.
echo SETUP PASSED. Next: double-click 1_OPEN_DASHBOARD.bat
pause
exit /b 0
:nopython
echo Python not found. Install Python 3.12 (64-bit) from python.org and tick "Add python.exe to PATH".
pause
exit /b 1
:fail
echo SETUP FAILED - screenshot this window.
pause
exit /b 1
