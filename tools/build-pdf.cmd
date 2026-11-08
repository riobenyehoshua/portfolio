@echo off
rem Rebuild files\Rio-Ben-Yehoshua-Portfolio.pdf from tools\pdf\portfolio.html (uses Microsoft Edge).
rem Edit the text in tools\pdf\portfolio.html, run this, check the PDF, then publish with tools\publish.cmd.
cd /d "%~dp0.."
set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not exist "%EDGE%" set "EDGE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
"%EDGE%" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf="%CD%\files\Rio-Ben-Yehoshua-Portfolio.pdf" "file:///%CD:\=/%/tools/pdf/portfolio.html"
echo Built files\Rio-Ben-Yehoshua-Portfolio.pdf
