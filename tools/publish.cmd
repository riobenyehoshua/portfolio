@echo off
rem Publish every change in the portfolio folder to the live site.
rem Usage:  tools\publish.cmd "What I changed"
cd /d "%~dp0.."
set "MSG=%~1"
if "%MSG%"=="" set "MSG=Update site"
git add -A
git commit -m "%MSG%"
git push
echo.
echo Live in about a minute: https://riobenyehoshua.github.io/portfolio/
