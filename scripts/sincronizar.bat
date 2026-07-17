@echo off
REM ============================================================
REM  Proyecto Rower - Sincronizar (local <-> GitHub)
REM  1) Baja los cambios del remoto (rebase)
REM  2) Sube tus cambios locales
REM  Doble clic para ejecutar una sincronizacion completa.
REM ============================================================
setlocal
cd /d "%~dp0.."

echo.
echo   Sincronizando Proyecto Rower con GitHub...
echo   Carpeta: %cd%
echo.

REM 1) Guardar cambios locales pendientes (si los hay)
git add -A
git diff --cached --quiet
if %errorlevel% neq 0 (
  set /p MSG="  Describe brevemente tus cambios (Enter para mensaje automatico): "
  if "%MSG%"=="" set MSG=Actualizacion local del equipo
  git commit -m "%MSG%"
) else (
  echo   No hay cambios locales nuevos que confirmar.
)

REM 2) Traer cambios del remoto sin crear merge-commits ruidosos
echo.
echo   Bajando cambios de GitHub...
git pull --rebase origin main
if %errorlevel% neq 0 (
  echo.
  echo   [!] Hubo un conflicto al combinar. Resuelvelo y vuelve a ejecutar.
  echo       (Consejo: usa GitHub Desktop si prefieres resolverlo con interfaz grafica.)
  pause
  exit /b 1
)

REM 3) Subir
echo.
echo   Subiendo tus cambios a GitHub...
git push origin main
if %errorlevel% neq 0 (
  echo   [!] No se pudo subir. Revisa tu conexion o credenciales.
  pause
  exit /b 1
)

echo.
echo   Listo. Local y GitHub estan al dia.
echo.
timeout /t 3 >nul
endlocal
