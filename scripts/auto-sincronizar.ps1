# ============================================================
#  Proyecto Rower - Auto-sincronizacion continua (PowerShell)
#  Cada N minutos: baja cambios de GitHub y sube los locales.
#  Deja esta ventana abierta para mantener local y remoto al dia.
#
#  Uso:  clic derecho > "Ejecutar con PowerShell"
#        o:  powershell -ExecutionPolicy Bypass -File auto-sincronizar.ps1
#  Cambia $intervaloMinutos para ajustar la frecuencia.
# ============================================================

$intervaloMinutos = 5
$repo = Split-Path -Parent $PSScriptRoot
Set-Location $repo

Write-Host ""
Write-Host "  Proyecto Rower - auto-sincronizacion cada $intervaloMinutos min" -ForegroundColor Cyan
Write-Host "  Carpeta: $repo"
Write-Host "  (Ctrl+C para detener)"
Write-Host ""

while ($true) {
    $hora = Get-Date -Format "HH:mm:ss"
    try {
        # Confirmar cambios locales si los hay
        git add -A
        $pendientes = git status --porcelain
        if ($pendientes) {
            git commit -m "Auto-sync local $hora" | Out-Null
            Write-Host "[$hora] Cambios locales confirmados." -ForegroundColor Yellow
        }

        # Bajar del remoto
        git pull --rebase origin main 2>&1 | Out-Null

        # Subir
        git push origin main 2>&1 | Out-Null
        Write-Host "[$hora] Sincronizado con GitHub." -ForegroundColor Green
    }
    catch {
        Write-Host "[$hora] Aviso: $_" -ForegroundColor Red
    }

    Start-Sleep -Seconds ($intervaloMinutos * 60)
}
