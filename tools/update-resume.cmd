@echo off
rem Replace the resume on the site with a new PDF and publish it.
rem Usage:  tools\update-resume.cmd "C:\path\to\resume.pdf"
rem With no path, it uses the newest PDF with "Resume" in its name in Downloads.
cd /d "%~dp0.."
set "SRC=%~1"
if "%SRC%"=="" (
  for /f "delims=" %%F in ('dir /b /o:d "%USERPROFILE%\Downloads\*Resume*.pdf" 2^>nul') do set "SRC=%USERPROFILE%\Downloads\%%F"
)
if "%SRC%"=="" (
  echo No resume PDF found. Pass the path:  tools\update-resume.cmd "C:\path\to\resume.pdf"
  exit /b 1
)
echo Using: %SRC%
copy /y "%SRC%" "files\Rio-Ben-Yehoshua-Resume.pdf" >nul || exit /b 1
call "%~dp0publish.cmd" "Update resume"
