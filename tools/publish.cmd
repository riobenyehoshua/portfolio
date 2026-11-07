@echo off
rem Publish every change in the portfolio folder to the live site.
rem Usage:  tools\publish.cmd "What I changed"
cd /d "%~dp0.."
set "MSG=%~1"
if "%MSG%"=="" set "MSG=Update site"
git add -A
git commit -m "%MSG%"
git push
if errorlevel 1 (
  echo.
  echo Publishing FAILED: the changes were saved on this computer but not uploaded.
  exit /b 1
)
echo.
echo Live in about a minute: https://riobenyehoshua.github.io/portfolio/
