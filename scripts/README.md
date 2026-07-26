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
python scripts/validar-html.py        # los HTML del repo · ~1 s, sin navegador
python scripts/comprobar-sistema.py   # el prototipo /sistema · ~100 s
python scripts/comprobar-torre.py     # la torre de arquitectura · ~130 s
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

Dos trampas al hacerlo, las dos vividas:

- **No restaures con `git checkout`.** Si el trabajo aún no está commiteado, lo
  borra. Guarda el archivo en memoria antes de sabotearlo y devuélvelo tal cual.
- **Sabotea el valor entero.** Varios textos del modelo son concatenaciones de
  varias líneas: romper solo la primera deja el resto y la comprobación pasa
  con razón — parece ciega y no lo está.

### `comprobar-torre.py`

La torre son **dos vistas del mismo modelo** (`informe/fase1/arquitectura-datos.js`): la 3D en
WebGL y la plana de respaldo. Estas comprobaciones existen para que no puedan divergir.

| | Qué verifica | Qué defecto real encontró |
|---|---|---|
| `modelo` | coherencia interna, sin navegador — incluido que cada piso y el cedazo **se expliquen en una frase** | bajadas a raíces inexistentes; una cadencia con dos ritmos |
| `plana` | el respaldo pinta sin desbordes ni solapes | el texto de un nivel saliéndose por encima del siguiente |
| `rack` | la escena 3D cuadra con el modelo | una raíz que se quedaba sin colocar |
| `gavetas` | cada piso abre en **un solo panel**, con su frase de entrada, sus agentes y sellos, y sin chapas que se pisen | las 11 burbujas apiladas en una esquina · el panel hablando de otro piso · chapas solapadas al estrecharse el lienzo |
| `corriente` | los cables **avanzan de verdad**, cada uno al ritmo de su cadencia, y la pausa los para | 16 de 16 congelados: `getElapsedTime()` consume el delta, así que el `getDelta()` siguiente daba ~0 |
| `bajada` | los arcos salen de la decisión y **arquean** | rutas que se metían dentro de la caja del rack |
| `modo` | hoy / propuesto, con los textos del modelo | el bastidor quedándose sólido con las bandejas en fantasma |
| `recorrido` | 8 paradas **en orden, al revés y saltando** | volver atrás dejaba la escena en modo «hoy» · un botón `disabled` tragándose un `click()` |
| `contraste` | WCAG AA sobre las dos vistas | texto pequeño en ámbar, verde y azul sobre fondos claros |

> El orden del recorrido **importa**: comprobarlo solo hacia delante ocultaba que cada parada
> heredaba el estado de la anterior. Los dos defectos peores salieron de recorrerlo al revés.

⚠️ La escena es WebGL. El guion fuerza **SwiftShader** (render por software) para que corra
también en un equipo sin GPU.

### Requisitos

Los comprobadores y los guiones de captura necesitan Playwright:

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
