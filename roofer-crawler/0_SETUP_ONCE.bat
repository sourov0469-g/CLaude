@echo off
cd /d "%~dp0"
title Roofer Lead Collector - Setup
set PY=
where py >nul 2>nul
if not errorlevel 1 set PY=py
if "%PY%"=="" (
  where python >nul 2>nul
  if not errorlevel 1 set PY=python
)
if "%PY%"=="" goto nopython
echo.
echo ==========================================
echo   ROOFER LEAD COLLECTOR - SETUP (one time)
echo ==========================================
echo.
if not exist ".venv\Scripts\python.exe" (
  %PY% -m venv .venv
  if errorlevel 1 goto fail
)
".venv\Scripts\python.exe" -m pip install --upgrade pip
".venv\Scripts\python.exe" -m pip install -r requirements.txt
if errorlevel 1 goto fail
echo.
echo Running self-tests (about 2 minutes)...
for %%T in (test_research test_dashboard test_integration test_storage test_qa test_enrichment test_real_file) do (
  ".venv\Scripts\python.exe" tests\%%T.py
  if errorlevel 1 goto fail
)
echo.
echo ==========================================
echo   SETUP PASSED
echo ==========================================
echo Next: double-click 1_OPEN_DASHBOARD.bat
pause
exit /b 0
:nopython
echo Python was not found.
echo Install Python 3.12 (64-bit) from python.org and tick "Add python.exe to PATH", then run this again.
pause
exit /b 1
:fail
echo.
echo SETUP FAILED - take a screenshot of this window.
pause
exit /b 1
