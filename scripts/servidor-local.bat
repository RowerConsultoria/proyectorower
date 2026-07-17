@echo off
REM ============================================================
REM  Proyecto Rower - Servidor local
REM  Sirve el proyecto en http://localhost:8080 y abre el navegador.
REM  Doble clic sobre este archivo para arrancarlo.
REM ============================================================
setlocal
cd /d "%~dp0.."

echo.
echo   Proyecto Rower - servidor local
echo   Carpeta: %cd%
echo   URL:     http://localhost:8080
echo.
echo   (Deja esta ventana abierta mientras uses el sitio.
echo    Cierrala o pulsa Ctrl+C para detener el servidor.)
echo.

REM Abre el navegador tras un breve retardo
start "" cmd /c "timeout /t 2 >nul & start http://localhost:8080"

REM Intenta con 'python'; si no existe, prueba con 'py'
python --version >nul 2>&1
if %errorlevel%==0 (
  python -m http.server 8080
) else (
  py -m http.server 8080
)

if %errorlevel% neq 0 (
  echo.
  echo   [!] No se encontro Python. Instalalo desde https://www.python.org/downloads/
  echo       o abre directamente el archivo index.html en el navegador.
  echo.
  pause
)
endlocal
