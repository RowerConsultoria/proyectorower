# Cómo usar este paquete

Este paquete te deja construir el contenido de un macroproceso del Manual de
Procesos (Fase 2) de Grupo Kenex, previsualizarlo tal como se ve en la app
real, y validarlo — sin necesitar acceso al repositorio de GitHub del
proyecto. Todo funciona sobre archivos locales, dentro de esta carpeta.

**Confidencial** — material del Proyecto Rower para Grupo Kenex. Uso interno
del equipo consultor, no lo compartas fuera de él.

## 1. Qué hay aquí

```
Insumos/
  mapa-procesos-kennex-v18.json        el mapa de procesos completo (20 macros / 182 procesos)
  estructura-patron-cargos-v4.json     denominación de cargos (V4) — nunca nombres propios
  Entrevistas_dialogo_limpio/          corpus de entrevistas (36 archivos .txt)
informe/fase2/
  manual-contenido.js                  el contenido YA redactado de los macros completos
  manual-procesos-datos.js             el armazón completo (generado del mapa v18)
  informe-fase2.html                   la app del Manual de Procesos
  flujo-render.js, mapa-procesos-flujos.js   piezas que la app necesita para renderizar
estilo/app.css                         identidad visual compartida
scripts/
  validar-html.py                      valida la sintaxis del HTML
  verificar-diagramas-fase2.js         detecta ciclos y nodos colgantes en los flujogramas
  comprobar-fase2.py                    smoke test: abre la app en un navegador real y verifica el mínimo del esquema
  generar-armazon-fase2.py             (rara vez lo necesitas — solo si te llega un mapa v18 nuevo)
prompt-tobe-fase2.md                 la guía de redacción — empieza por aquí
```

**A propósito no está incluida la documentación de Lark** (`Insumos/Documentación de Lark/<país>/<área>/` en el prompt) — se agrega en una entrega posterior.

## 2. Antes de empezar (una sola vez por laptop)

- **Python 3.10+** y **Node.js** instalados.
- `pip install playwright` y luego `playwright install chromium` (para poder correr `comprobar-fase2.py`).
- Abre esta carpeta completa en VS Code (`Abrir carpeta…`, no un archivo suelto) y usa tu agente de IA de preferencia dentro de VS Code.

## 3. El flujo de trabajo

### Paso 1 — Redactar

Pídele a tu agente algo como:

> Lee `prompt-tobe-fase2.md` y ejecútalo para el macroproceso **"X"** (nombre o prefijo exacto, según `Insumos/mapa-procesos-kennex-v18.json`).

El agente debe cruzar la ficha del mapa v18 con las entrevistas relevantes de `Insumos/Entrevistas_dialogo_limpio/` (revisa el corpus completo con su propio criterio, no solo por nombre de archivo) y con buenas prácticas de fuentes confiables (WebSearch) cuando el mapa no traiga suficiente evidencia propia. El resultado es un objeto JS que sigue el esquema de la sección 4 del prompt.

### Paso 2 — Fundirlo en `manual-contenido.js`

`informe/fase2/manual-contenido.js` es un solo objeto:

```js
window.MANUAL_CONTENIDO = {
 "9": { n0: {...}, procesos: {...} },
 "6": { n0: {...}, procesos: {...} },
 ...
 "13": { n0: {...}, procesos: {...} }
};
```

Agrega tu macro como una clave nueva, con una coma antes, justo antes del `}` final que cierra todo el objeto (antes del `;`). Pídele a tu agente que lo haga por ti con una edición de texto — **nunca reescriba el archivo completo**, solo inserte el bloque nuevo en ese punto exacto.

### Paso 3 — Validar

Desde esta carpeta (la terminal de VS Code sirve):

```
node scripts/verificar-diagramas-fase2.js <prefijo>
python scripts/comprobar-fase2.py <prefijo> --capturas
python scripts/validar-html.py
```

Los tres deben terminar en verde. Si `comprobar-fase2.py` marca algo, el mensaje dice exactamente qué proceso y qué le falta (actividades, nodos del diagrama, riesgos, indicadores, o una caja de "contenido pendiente" que no se llenó). `--capturas` deja dos capturas de pantalla en tu carpeta temporal del sistema para que revises visualmente el resultado.

### Paso 4 — Previsualizar en el navegador (opcional, pero recomendado)

```
python -m http.server 8080
```

y abre `http://localhost:8080/informe/fase2/informe-fase2.html#/m/<prefijo>` — verás la app real, sin login (el guardia de acceso está pensado para el sitio publicado, no para esta copia local).

### Paso 5 — Entregar

**No hace falta git ni GitHub.** Cuando los tres pasos de validación pasen, envíame (a Jesús):

- **Solo el bloque JSON de tu macroproceso** (la clave nueva que agregaste, tal cual quedó), no el archivo `manual-contenido.js` completo.
- Un mensaje corto: qué entrevistas y qué fuentes usaste, qué te faltó o fue débil, y cualquier inconsistencia del mapa v18 que hayas notado (el prompt lo pide en su sección 9).

**Por qué solo el bloque y no el archivo completo:** varios consultores están trabajando en paralelo, cada uno sobre su propia copia local de `manual-contenido.js`. Si cada uno devuelve el archivo entero, el de quien lo entregue después borraría el trabajo de los demás. Yo fusiono cada bloque, uno por uno, en el archivo real del repositorio.

## 4. Qué NO se necesita para este trabajo

- Acceso al repositorio de GitHub ni credenciales de git.
- La documentación de Lark (llega después).
- Ejecutar `generar-armazon-fase2.py` — el mapa v18 de este paquete ya está procesado en `manual-procesos-datos.js`; solo correrías ese script si te llega una versión nueva del mapa.
