@echo off
rem Put a new resume PDF on the site and publish it.
rem   Double-click this file: it uses the newest PDF with "Resume" in its name in Downloads.
rem   Or from a terminal:     tools\update-resume.cmd "C:\path\to\resume.pdf"
rem Any phone number in the PDF is removed before it is published.
rem Afterwards the downloaded PDF is moved out of Downloads into source\resume-history (private).
cd /d "%~dp0.."
set "SRC=%~1"
if "%SRC%"=="" (
  for /f "delims=" %%F in ('dir /b /o:d "%USERPROFILE%\Downloads\*Resume*.pdf" 2^>nul') do set "SRC=%USERPROFILE%\Downloads\%%F"
)
if "%SRC%"=="" (
  echo No PDF with "Resume" in its name was found in Downloads.
  echo In Google Docs use File, Download, PDF Document, then run this again.
  pause
  exit /b 1
)
echo Using: %SRC%
if not exist "tools\.venv\Scripts\python.exe" (
  echo The phone-number remover is not set up on this computer, so nothing was published.
  pause
  exit /b 1
)
"tools\.venv\Scripts\python.exe" tools\strip_phone.py "%SRC%" "files\Rio-Ben-Yehoshua-Resume.pdf"
if errorlevel 1 (
  echo Stopped: could not safely remove the phone number. Nothing was published.
  git checkout -- files\Rio-Ben-Yehoshua-Resume.pdf
  pause
  exit /b 1
)
call "%~dp0publish.cmd" "Update resume"
if errorlevel 1 (
  pause
  exit /b 1
)
rem Move the PDF you downloaded out of Downloads into a private dated archive (never published).
for /f %%d in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM-dd_HHmm"') do set "STAMP=%%d"
if not exist "source\resume-history" mkdir "source\resume-history"
move /y "%SRC%" "source\resume-history\%STAMP%.pdf" >nul && echo Moved the downloaded PDF to source\resume-history\%STAMP%.pdf
pause
