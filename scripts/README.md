# Scripts de utilidad (Windows)

Herramientas para trabajar con el proyecto en tu equipo local. Todas se ejecutan con doble clic.

| Script | Qué hace |
|---|---|
| `servidor-local.bat` | Levanta el proyecto en `http://localhost:8080` y abre el navegador. Deja la ventana abierta mientras lo uses. Requiere Python instalado. |
| `sincronizar.bat` | Sincronización manual: confirma tus cambios, baja los de GitHub (rebase) y sube todo. Ejecútalo cuando quieras ponerte al día. |
| `auto-sincronizar.ps1` | Sincronización automática cada 5 minutos (PowerShell). Deja la ventana abierta para mantener local y GitHub al día sin intervención. |

---

## Comprobaciones antes de publicar

Estas dos no son de conveniencia: son las que han encontrado casi todos los
defectos del prototipo, y casi siempre **el mismo** — *la pantalla afirma un
efecto que el código no produce*. Conviene correrlas antes de cualquier commit
que toque el informe o `/sistema`.

```bash
python scripts/validar-html.py        # los 9 HTML del repo · ~1 s, sin navegador
python scripts/comprobar-sistema.py   # el prototipo entero · ~100 s
```

Las dos devuelven **código 1** si algo falla, para poder encadenarlas.

### `validar-html.py`

Validador tolerante: aprueba si la pila de etiquetas abiertas queda vacía y no
hay cierres huérfanos. Excluye el contenido de los atributos `srcdoc` — el
diagrama de arquitectura va embebido ahí y lleva etiquetas literales que no son
del documento (la *lección del srcdoc*, en `CLAUDE.md`).

### `comprobar-sistema.py`

Levanta el servidor si hace falta y lo apaga al terminar. Siete comprobaciones:

| | Qué verifica | Qué defecto real encontró |
|---|---|---|
| `rutas` | cada ruta pinta una pantalla **registrada**, la URL no miente, no hay desbordes | pantallas que caían en la ficha genérica sin que se notara |
| `contraste` | WCAG AA sobre todo el texto, en los dos temas | 2.173 textos por debajo del mínimo — eran tres tokens |
| `recorrido` | las 12 paradas llegan, hallan su ancla, y **cada cifra del guion está en la pantalla que la sostiene** | el guion decía «5 frentes con Odoo» cuando eran 3 |
| `permisos` | ningún ámbito de firma huérfano; cada rol firma lo que promete | — |
| `reglas` | ninguna regla de negocio declarada con dueño y sin usar | dos reglas huérfanas en las fases 6–11 |
| `moneda` | ninguna cifra grande sin su unidad o su moneda | 25 columnas de dinero sin declararla |
| `freno` | el freno detiene de verdad **y sigue siendo reversible** | el freno llegó a apagarse a sí mismo |

Opciones:

```bash
python scripts/comprobar-sistema.py --rapido        # una anchura y un tema · ~60 s
python scripts/comprobar-sistema.py rutas moneda    # solo esas dos
```

**Si añades una comprobación, rómpela primero a propósito** y confirma que la
detecta. Una comprobación que siempre pasa es peor que no tenerla: da una
confianza que no ha ganado.

### Requisitos

`comprobar-sistema.py` y `capturar-laminas-sistema.py` necesitan Playwright:

```bash
pip install playwright
playwright install chromium
```

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
