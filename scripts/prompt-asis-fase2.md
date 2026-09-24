# Prompt — Versión As-Is de un proceso (Fase 2)

Guía para redactar la versión **As-Is** (cómo opera hoy) de un proceso del Manual
de Procesos de Kenex. Complementa a `prompt-tobe-fase2.md`, que cubre el To-Be.

> **Cómo invocarlo.** Indica por terminal el código del proceso (p. ej. «6.4») y
> pega este prompt. Todo lo demás —fuentes, rutas, reglas y comprobaciones— está
> aquí; no hace falta repetirlo en cada encargo.

---

## 1. Qué hay que producir

La versión As-Is del proceso indicado, con la **misma maquetación y componentes
visuales** que el To-Be ya publicado, pero con una estructura de contenido más
simple: **cinco secciones**.

| # | Sección | Clave en el dato |
|---|---------|------------------|
| 1 | Propósito y alcance | `proposito` (con `alcance` propio) |
| 2 | Dueño y participantes | `dueno` |
| 3 | Disparador, cadencia y output | `disparador` |
| 4 | Flujo de actividades | `flujo.actividades` |
| 5 | Flujograma | `flujo.diagrama` |

**No incluye Matriz de riesgos ni Indicadores propuestos.**

⚠️ **«Flujograma» no es una sección independiente del renderizador**: vive dentro
de «Flujo de actividades», junto a la lista numerada (`flujo.actividades` +
`flujo.diagrama`). Se enumera aparte aquí solo para dejar claro que ambas piezas
son obligatorias.

### Dónde se escribe

En **`informe/fase2/manual-asis.js`**, bajo `window.MANUAL_ASIS[<prefijo>]
.procesos["<código>"]`. Mismo esquema que `manual-contenido.js`, más tres
añadidos propios del As-Is:

- **`nota_version`** — una línea que sitúa al lector en la versión que está viendo.
- **`proposito.alcance`** — sustituye a la ficha del mapa v18, que usa los cargos
  del To-Be y por tanto no sirve aquí.
- **`cabecera`** (opcional) — rótulo alternativo de una tabla, para hablar en
  presente en vez de en propuesta.

**No crees un archivo nuevo por proceso.** Todos los As-Is conviven en
`manual-asis.js`.

---

## 2. Fuentes: dónde está cada cosa

No hay una sola fuente que lo tenga todo. Esta tabla manda sobre cualquier
suposición:

| Insumo | Dónde está la versión buena |
|--------|------------------------------|
| **Entrevistas y sesiones** (87) | **Supabase**, tabla `entrevistas` |
| **Documentación de Lark** (164 archivos) | **Repositorio**: `Insumos/Documentación de Lark/` — en Supabase hay **cero** |
| **Estructura Patrón de Cargos V4** | **Repositorio**: `Insumos/estructura-patron-cargos-v4.json` (426 registros) |
| **Organigramas vigentes** | **Supabase**, tabla `archivos` (los dos PDF de Panamá y Venezuela) |
| Censo con cargos actuales (488) | **Supabase**, tabla `personal` |

### 2.1 Entrevistas — cómo leerlas sin dejar nada fuera

Las transcripciones viven en la tabla `entrevistas` de Supabase, que es la fuente
operativa: contiene todo lo que hay en el repositorio y en local, y además lo que
nunca llegó a comitearse. Ni `Insumos/Entrevistas_dialogo_limpio*/` ni Drive son
sustitutos.

Se lee **el corpus completo**, no una selección previa por palabras clave, por las
fuentes que cita el mapa v18 ni por la carpeta en que esté archivada una
entrevista: los tres criterios tienen errores documentados y descartan en silencio.

**Enumera por `id`** (uuid, presente y único en las 87 filas). No enumeres por
`codigo` ni por `fecha`: 12 filas no tienen código y 17 no tienen fecha, así que un
recorrido «de la E-01 a la E-70» o «las de septiembre» omite sesiones enteras sin
avisar.

Lee la columna **`dialogo`** (texto limpio `S1:` / `S2:`), no `transcripcion`: esta
última es el JSON crudo del transcriptor, pesa 2,4 veces más y solo añade marcas de
tiempo e identificadores de hablante, que no aportan a la redacción. **Donde
`dialogo` sea nulo, derívalo de `transcripcion` antes de leer** — hoy faltan en 14
filas, y darlas por leídas deja fuera todo el trabajo de campo de septiembre.

### 2.2 Documentación de Lark

Los 164 documentos están en el repositorio, organizados por país y área
(`Insumos/Documentación de Lark/Documentación/<país>/<área>/`, más
`Info Requerimientos/` y `Wikis/`). Son binarios: los `.pdf` y `.docx` **no se
indexan con `grep`** — hay que extraerlos antes de dar por inexistente un
artefacto que no aparezca en las entrevistas.

---

## 3. Reglas de contenido (estrictas)

**1) Cargos actuales, nunca los del To-Be.** Usa el nombre que dan las entrevistas
o el campo **`cargo_actual`** del V4, y los organigramas vigentes. No uses
`cargo_patron_propuesto`, que es la denominación propuesta y alimenta el To-Be.

> `cargo_normalizado_auxiliar` no sirve para esto: no normaliza contra ningún
> catálogo, solo pasa el texto a mayúsculas — 405 de las 426 filas son idénticas
> a `cargo_actual` y las 21 restantes difieren solo en la caja.

> ⚠️ `personal.cargo` de Supabase **parece** el V4 y no lo es: sale de otro Excel
> («Listado Personal Consolidado», hoja «Personal Consolidado»). Sirve para
> contrastar, no como autoridad de denominación.

**2) No apliques mejoras ni mejores prácticas.** El As-Is describe lo que ocurre,
con sus saltos y sus vacíos. Si un paso no existe, no se inventa; si el circuito es
informal, se documenta informal.

**3) Procesos diseminados o sin dueño formal** (servicios generales, gestión legal,
gobierno corporativo y similares): documenta el paso a paso **basándote fielmente
en la narrativa real de quien ejecuta la actividad**, aunque no haya un responsable
designado.

**4) Toda atribución declara su origen.** Si el As-Is sobrescribe `dueno` o
`disparador` —y casi siempre lo hará, porque la ficha del mapa v18 trae los cargos
del To-Be—, debe declarar `evidencia: ["E-xx", …]` y, cuando corresponda,
`sin_evidencia: "…"`. Lo vigila `scripts/comprobar-atribucion-fase2.py`, que exige
la trazabilidad **sección por sección**.

**5) Reglas de trazado del flujograma.** Las heredas del motor común
(`flujo-render.js`): sin ciclos (un «reintento» funde hacia adelante, no vuelve
atrás), sin nodos colgantes, y **coherencia rol↔carril** — todo rol que ejecuta una
actividad tiene que tener su carril y viceversa.

---

## 4. Arquitectura: estrictamente aditivo

**La navegación As-Is / To-Be ya está construida** (23-sep-2026). Al entrar a un
proceso que tiene As-Is, el informe ofrece los dos botones y el selector para pasar
de una vista a otra; las rutas son `#/asis/<código>` y `#/tobe/<código>`, y los
enlaces antiguos con sección (`#/p/<código>/flujo`) siguen abriendo el To-Be.

👉 **No la reimplementes: reutilízala.** Basta con añadir el proceso a
`manual-asis.js` para que aparezca.

**No toques el To-Be.** Si al redactar el As-Is encuentras que las entrevistas
contradicen al To-Be publicado, **no lo corrijas**: déjalo constar en
`nota_version` o al entregar, y que lo decida el equipo. Ese fue el criterio con
6.3, donde las entrevistas contradicen al To-Be en dos puntos.

### Secciones omitidas — ya resuelto (24-sep-2026)

El renderizador recorría una **lista fija de seis secciones** e imprimía una caja
«Pendiente: …» por cada una que faltara, de modo que un As-Is de cinco secciones
se leía como incompleto. **Ya está corregido**: cuando la vista es As-Is, la
lista se filtra a las secciones que el proceso trae, y la numeración se recalcula
sola. El To-Be sigue recorriendo las seis, porque ahí un hueco sí es un pendiente.

👉 Consecuencia práctica: **basta con omitir la clave** (`riesgos`,
`indicadores`) para que la sección no aparezca. No hace falta dejarla vacía.

⚠️ Pendiente de decisión: **el As-Is de 6.3 sí trae riesgos e indicadores** (con
`cabecera` en clave As-Is), porque se redactó antes de fijar este estándar. O se
los retiramos para que no diverja, o queda como excepción declarada.

---

## 5. Verificación antes de dar por terminado

Las cuatro, todas en verde:

```
python scripts/validar-html.py
node   scripts/verificar-diagramas-fase2.js <prefijo>
python scripts/comprobar-flujogramas-fase2.py <prefijo>
python scripts/comprobar-atribucion-fase2.py
```

`verificar-diagramas-fase2.js` revisa **las dos versiones** —To-Be y As-Is— desde
el 24-sep-2026 y rotula cada hallazgo con la suya. Hasta esa fecha solo miraba
`manual-contenido.js`, así que los flujogramas del As-Is no tenían ninguna
comprobación de ciclos, nodos colgantes ni coherencia rol↔carril.

⚠️ `comprobar-flujogramas-fase2.py` y `comprobar-fase2.py` **todavía enumeran
desde `MANUAL_CONTENIDO` y visitan `#/p/<código>`**, así que hoy miden el To-Be,
no la ruta As-Is. Correrlos sigue siendo útil (confirman que no hubo regresión en
el To-Be), pero no dan por verificado el As-Is.

`comprobar-flujogramas-fase2.py` lista aparte —**sin tumbar el resultado**— las
preguntas de rombo que no caben en su figura: eso no es fallo del motor sino del
enunciado, y se resuelve acortando la pregunta.

⚠️ **El navegador cachea `flujo-render.js` con ganas.** Una revisión visual sobre
la versión vieja genera comentarios sobre defectos ya corregidos —pasó con siete de
dieciocho comentarios del macro 9—. Recarga forzada (Ctrl+Shift+R) o ventana de
incógnito antes de revisar.
