# Scripts de utilidad (Windows)

Herramientas para trabajar con el proyecto en tu equipo local. Todas se ejecutan con doble clic.

| Script | Qué hace |
|---|---|
| `servidor-local.bat` | Levanta el proyecto en `http://localhost:8080` y abre el navegador. Deja la ventana abierta mientras lo uses. Requiere Python instalado. |
| `sincronizar.bat` | Sincronización manual: confirma tus cambios, baja los de GitHub (rebase) y sube todo. Ejecútalo cuando quieras ponerte al día. |
| `auto-sincronizar.ps1` | Sincronización automática cada 5 minutos (PowerShell). Deja la ventana abierta para mantener local y GitHub al día sin intervención. |

## Primer arranque (una sola vez)

1. **Clonar el repo** en la carpeta que quieras (ver README principal).
2. Comprobar que tienes **Python** (`python --version`) y **Git** (`git --version`). Si falta Python: https://www.python.org/downloads/ (marca "Add python.exe to PATH" al instalar).
3. Doble clic en `servidor-local.bat` → se abre el sitio en el navegador.

## Sobre el `auto-sincronizar.ps1`

Si Windows bloquea la ejecución de scripts PowerShell, ábrelo así una vez:

```powershell
powershell -ExecutionPolicy Bypass -File auto-sincronizar.ps1
```

Ajusta la frecuencia cambiando `$intervaloMinutos` dentro del archivo.
