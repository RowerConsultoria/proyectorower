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
python scripts/comprobar-sistema.py   # el prototipo /sistema · ~280 s
python scripts/comprobar-torre.py     # la torre de arquitectura · ~220 s
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
### `sincronizar-asistente.py` — el contexto del Asistente IA

`python scripts/sincronizar-asistente.py` (o `--seco` para solo generar).

El Asistente IA razona sobre la tabla `conocimiento` de Supabase, que se llena **sola** con lo que el equipo carga (entrevistas y archivos, vía la Edge Function `indexar`). Pero **el informe, la torre y el prototipo viven en el repositorio, no en Supabase** — el asistente no los conoce a menos que alguien se los cuente. Este guion genera tres síntesis *derivadas del repo* (`informe-fase1`, `arquitectura-ia`, `sistema-prototipo`), las sube a `conocimiento` y las trocea a `fragmentos`.

> ⚠️ **Volver a correrlo tras cada cambio de fondo** en el informe, la torre o el prototipo. Si no, la síntesis envejece en silencio — peor que no tenerla, porque el asistente responde con seguridad sobre una versión vieja. Suma ~8k tokens a **cada** consulta. Reversible: borrar por clave y por código `DOC-*`.

| `recorrido` | las 18 paradas llegan, hallan su ancla, y **cada cifra del guion está en la pantalla que la sostiene**; y el guion **se pliega sin perder el paso** y vuelve (botón y tecla `G`) | el guion decía «5 frentes con Odoo» cuando eran 3 |
| `permisos` | ningún ámbito de firma huérfano; cada rol firma lo que promete | — |
| `reglas` | ninguna regla de negocio declarada con dueño y sin usar | dos reglas huérfanas en las fases 6–11 |
| `moneda` | ninguna cifra grande sin su unidad o su moneda | 25 columnas de dinero sin declararla |
| `freno` | el freno detiene de verdad **y sigue siendo reversible** | el freno llegó a apagarse a sí mismo |
| `portada` | la puerta del prototipo: Entrar arranca el recorrido, un enlace profundo no la ve | `display:grid` le ganaba al atributo `hidden`: la portada tapaba los enlaces profundos **para siempre** |
| `inventarios` | cada almacén contra el modelo, su semáforo y su dueño; «en mar» contra la torre | — |
| `distribuido` | despachado − reportado = estimado, con su banda, **recomputado desde los crudos** | — |
| `clientes` | la cartera contra los crudos, la ficha, la torre de IA, y aplicar → bitácora | — |
| `mapa` | los puntos contra el modelo, el filtro por marca, **el fallback sin red de verdad**, y que el popup **aterrice en el punto** —su tarjeta ya abierta— y no en la lista del módulo | — |
| `portal-vendedor` | el ATP, amarrar de un embarque, y que la reserva **se vea en el aplicativo** | la primera versión solo reservaba del hub: la funcionalidad estrella no se probaba |
| `portal-cliente` | el crédito bloquea con motivo, la escalera publicada, el cedazo del reporte | un valor inventado en el eje `dinero` |

Opciones:

```bash
python scripts/comprobar-sistema.py --rapido        # una anchura y un tema · ~60 s
python scripts/comprobar-sistema.py rutas moneda    # solo esas dos
```

**Si añades una comprobación, rómpela primero a propósito** y confirma que la
detecta. Una comprobación que siempre pasa es peor que no tenerla: da una
confianza que no ha ganado.

> **El caso más caro de esta regla.** Al extender `contraste` a los dos
> portales, pasó a la primera. Parecía una buena noticia y era lo contrario: el
> medidor recorría `.lienzo *` y los portales tienen `.p-lienzo`, así que los
> barría midiendo **cero elementos**. Con el selector arreglado seguía sin
> morder, porque `fondoDe()` se rendía ante cualquier degradado y el `body` del
> portal tiene uno — todo el texto de tabla subía hasta él y se descartaba. Dos
> defectos encadenados, los dos invisibles desde el resultado verde. Solo
> salieron al romper el estilo a propósito y ver que **nadie se quejaba**.

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
| `recorrido` | 9 paradas **en orden, al revés y saltando**, y las **capas** que cada una declara | volver atrás dejaba la escena en modo «hoy» · un botón `disabled` tragándose un `click()` · salir dejaba la bajada encendida |
| `rotulos` | ningún rótulo ni chapa se pisa, se sale del lienzo o queda bajo la barra — 3 anchuras × (2 modos + 9 paradas) | hasta 14 pares pisándose en «hoy» · las chapas del rack pisándose entre sí a 1280 px |
| `plegado` | la flecha pliega cabecera y pie, el mapa gana ese alto, y sigue habiendo salida | — |
| `contraste` | WCAG AA sobre las dos vistas | texto pequeño en ámbar, verde y azul sobre fondos claros |

> El orden del recorrido **importa**: comprobarlo solo hacia delante ocultaba que cada parada
> heredaba el estado de la anterior. Los dos defectos peores salieron de recorrerlo al revés.

> **Los rótulos no se separan apartándolos en la escena.** Se probó con 1,5 · 2,4 · 3,2 unidades
> y los solapes subieron de 2 a 4: el encuadre se ajusta al contenido, así que al apartarlos la
> cámara se retira otro tanto y la distancia en píxeles se queda igual. Son DOM de tamaño fijo
> sobre una escena que sí escala — el problema es de pantalla y se resuelve en pantalla.

⚠️ La escena es WebGL. El guion fuerza **SwiftShader** (render por software) para que corra
también en un equipo sin GPU.

### Requisitos

Los comprobadores y los guiones de captura necesitan Playwright:

```bash
pip install playwright
playwright install chromium
```

…y **credenciales del aplicativo**, desde que hay login (04-ago-2026): las
páginas rebotan a `/acceso/`, así que un navegador sin sesión solo ve la pantalla
de acceso y todas las comprobaciones «revientan» a la vez.

```powershell
$env:ROWER_CORREO = "tu@correo"
$env:ROWER_CLAVE  = "tu clave"
```

Lo resuelve [`sesion_prueba.py`](sesion_prueba.py): pide el token con esas
credenciales y lo siembra en `localStorage` (`add_init_script`) antes de que la
página corra su primer script — lo mismo que hace la pantalla de acceso. Los
guiones usan `sesion_prueba.pagina(nav, SES, …)` en lugar de `nav.new_page(…)`.
Sin credenciales cortan con **código 2** y un mensaje que lo dice, en vez de
fallar de trece maneras distintas.

`sincronizar-asistente.py` es aparte: escribe en `conocimiento`, así que necesita
la clave de servicio en `$env:SUPABASE_SERVICE_KEY` (ver `supabase/README.md`).

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
