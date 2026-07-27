# CLAUDE.md — Proyecto Rower

Guía de contexto para sesiones de Claude Code en este repositorio. Leer antes de editar cualquier cosa.

## Qué es este proyecto

Consultoría de **Optimización Organizacional y Adopción de IA** de **UCAB Consultores** para **Grupo Kenex** (holding familiar de distribución de electrónica: Casio —representada— y Cubitt —propia—; opera en VE/PA/CO/CR/GT/US). Contrato en 4 fases: F1 diagnóstico · F2 documentación de procesos y prototipos IA · F3 reestructuración de talento · F4 evaluación/cierre.

**Hito crítico:** presentación formal a la Junta Directiva (vía Lark) — **viernes 24-jul-2026, 11:00 am**.

⚠️ **Contenido confidencial.** Material interno del equipo consultor (PM: Clemencia Abad). No compartir fuera del equipo.

## Arquitectura del aplicativo

Dos secciones, ambas accesibles desde el portal raíz (`index.html`):

### 🟢 Front (público) — el informe
`informe/fase1/informe-diagnostico-fase1.html` — **el entregable maestro**: sitio navegable autocontenido (sidenav con scroll-spy, 13 secciones + anexos, **la torre** —modelo 3D de la arquitectura de IA— embebida en el modal de la s10). Integra además:
- **Sidenav con acordeón de subpuntos:** cada sección lleva una flecha que despliega sus subpuntos (los 66 `<h3>`, con id `sN-M` — «4.8» → `s4-8`). Clic en un subpunto navega a él; hay scroll-spy propio que resalta el subpunto en curso. El estado abierto/cerrado se guarda en `localStorage` bajo `rower.informe.nav.abiertos`, como mapa `{sección: bool}` — se persisten también los **cierres**, para distinguir «nunca la toqué» de «la cerré a mano» (entrar con un `#sN-M` abre esa sección solo si no hay decisión previa, y sin persistirla). Lee el formato antiguo (lista de abiertas) y lo migra solo.
- **Organigrama interactivo** (`informe/fase1/organigrama-kenex.html`): app canvas con pan/zoom, 13 escenas, buscador, 19 flujos funcionales, 13 alertas y **sistema de 3 capas** (📄 Declarado = solo papel · 👁 Real = con capa de facto y evidencia [E-xx] · 🧭 Propuesto = el organigrama de la 4.8, ver abajo) + toggle "Δ Diferencias" (badges 🎩🔀👻🕳⚡). Contenido corregido el 18-jul con la auditoría integral (`gestion/AUDITORIA_ORGANIGRAMA_18jul.md`). Se abre como **panel a pantalla completa** (botón fijo "🏛 Organigrama"; botón "⇔ Panel medio" para leer el informe al lado). Archivo hermano: se itera SIN tocar el maestro.
- **Estructura organizativa propuesta** — **`informe/fase1/organigrama-propuesto-datos.js` es la FUENTE ÚNICA** (nodos, líneas, leyenda y notas de diseño; lienzo fijo 1680×1250). La consumen las **dos** vistas, que por tanto no pueden divergir: `organigrama-propuesto-kenex.html` (página completa, se abre desde la 4.8) y la capa **🧭 Propuesto** de `organigrama-kenex.html`. ⚠️ Editar la propuesta = editar **solo** ese `.js`; nunca duplicar nodos en los HTML. Clases namespaced (`.pnode`, no `.node`) para no chocar con el organigrama; colores en variables `--p-*` con valores claros por defecto y override oscuro en `organigrama-kenex.html`. El placeholder viejo (3 modelos silueta A/B/C "en construcción") se retiró el 26-jul al converger la propuesta.
- **Modo presentación** (`informe/fase1/presentacion-fase1.html`): deck de **62 láminas** que renderiza visualmente cada sección (s7 tiene 7 láminas por sus subpuntos). Botón "▶ Presentar" junto a cada h2 (decoración JS, solo en las 11 secciones que tienen láminas), FAB "▶ Presentación", overlay fullscreen, ←/→, menú de secciones, hash routing (`#s7`), Esc vuelve a la lectura. Cada lámina es un `<section class="slide" data-sec="sN">` autocontenido — añadir/editar láminas = editar ese archivo. El menú (`SEC_NAMES`) y el orden de las láminas están conciliados con el informe (verificado 27-jul); el orden del menú se deriva del orden de las láminas, así que **mover un grupo de láminas basta** — pero el rótulo de `SEC_NAMES` hay que cambiarlo a mano.
  - **La torre** (`informe/fase1/arquitectura-ia-kenex.html`): modelo 3D de la arquitectura de IA en WebGL (three.js **vendorizado** en `informe/fase1/vendor/`, sin CDN) con el texto en DOM vía CSS2DRenderer. Rack oscuro sobre estudio claro; 4 niveles + el cedazo, 12 raíces en arco con la corriente a su cadencia real, gavetas con burbujas, la bajada, el conmutador **hoy/propuesto** y un recorrido de 8 paradas. **Fuente única: `arquitectura-datos.js`**, que alimenta también la versión plana de respaldo (`arquitectura-ia-plana.html`, la que se imprime y de la que salen las láminas). Se abre desde el modal de la s10. Capturas: `python scripts/capturar-torre.py`.
  - **Sección `proto`** (7 láminas, fase 25 del prototipo): capturas reales de `/sistema` en marco UCAB, insertadas antes del cierre. Las imágenes viven en `informe/fase1/img-sistema/*.jpg` y se regeneran con el guion de capturas de Playwright (viewport 1600×900, JPEG q86).
- **Mapa de procesos interactivo** (`informe/fase1/mapa-procesos-kenex.html` + datos generados en `mapa-procesos-datos.js`): estilo n8n+metro — cadena de valor como línea troncal con estaciones (8 operativos, 3 canales en ramal paralelo), estratégicos arriba, soporte abajo, externos (Casio Japón/Fábricas China/Clientes). Clic en nodo = foco n8n (atenúa el resto) + drawer de detalle (procesos N1 → procedimientos N2; los sugeridos por UCAB en cursiva azul); cruces documentados activables (🔗), toggles fricciones ⚠/prácticas ✅/sistemas 🧩, buscador, escenas. Datos: Excel v7 (Downloads) con las 8 reubicaciones + 1 duplicado corregidos → **22/104/244** (el informe cita 260 — EN CONCILIACIÓN con Jesús; regenerar datos = `python scripts/generar_mapa_procesos.py` apuntando al Excel). Abre desde la 6.5 y el sidenav «Módulos» (drawer verde a pantalla completa).

### 🔵 Admin (interno) — panel con sidebar
`admin/index.html` — SPA de un solo archivo, enrutado por hash. Módulos activos:
- **Asistente IA**: chat streaming sobre TODO el corpus (Edge Function `asistente`, Claude Opus 4.8). Arquitectura: la síntesis destilada completa (tabla `conocimiento`, ~90k tokens) viaja SIEMPRE en el contexto con prompt caching; el modelo además usa herramientas contra Supabase (`buscar_pasajes` = FTS español sobre `fragmentos`, `leer_entrevista` = diálogo limpio por partes, `linea_tiempo`, `listar_archivos`). Audiencia decidida por el usuario (18-jul): la Junta de Kenex con acceso al corpus completo, incl. material sensible.
- **Indexación automática** (schema §8): triggers de Postgres (`pg_net`) invocan la Edge Function `indexar` en cada INSERT/UPDATE de `entrevistas` (con transcripción) y cada INSERT de `archivos` — extrae el texto (diálogo del JSON del transcriptor; contenido de xlsx/pdf/docx/pptx/txt), lo trocea a `fragmentos` y genera con Claude una síntesis en `conocimiento` (clave `entrevista-*`/`archivo-*`). Todo lo que se carga queda disponible para el Asistente IA solo, en ~1 min (su caché de conocimiento refresca cada 5 min). Backfill/reproceso: `POST /functions/v1/indexar {"todo":true}` o `{tipo,id}`.
- **Entrevistas transcritas**: tabla `entrevistas` en Supabase + **autocompletar con IA** (subes el crudo `.md/.json/.txt` y la Edge Function `extraer-entrevista` llama a Claude para rellenar los campos).
- **Archivos (insumos)**: bucket de Storage `insumos` + tabla `archivos` (Excel/PPT/PDF: subir varios, buscar, filtrar, descargar, eliminar).
- **Línea de tiempo**: bitácora cronológica del proyecto (tabla `eventos`): CRUD completo, filtros por tipo, buscador. Sembrada el 18-jul con 148 eventos extraídos del análisis exhaustivo del corpus (entrevistas + minutas + propuesta + Excel). Fechas solo-mes normalizadas al día 1.
- Stubs pendientes: Estado del informe, Comentarios, Matriz de riesgos (las tablas ya existen en Supabase).

### 🗄️ Backend — Supabase (proyecto `kmhwqybqrcjhjeywjgxj`, "Rower Project")
- Tablas: `secciones`, `comentarios`, `riesgos`, `entrevistas` (+ col. `dialogo` = texto limpio extraído del JSON del transcriptor), `archivos`, `eventos`, `conocimiento` (síntesis del corpus), `fragmentos` (chunks FTS español + RPC `buscar_fragmentos`) · Bucket: `insumos` · Edge Functions: `extraer-entrevista` y `asistente` (ambas `claude-opus-4-8`; la API key de Anthropic vive como secreto `ANTHROPIC_API_KEY` de Supabase — NUNCA en el repo ni en el cliente).
- `supabase/schema.sql` es la fuente idempotente de todo el esquema. `supabase/cliente.js` tiene la URL + clave publishable (pública por diseño).
- **⚠️ SEGURIDAD PENDIENTE:** el admin corre **sin login**. Políticas anónimas transitorias en `entrevistas`, `archivos`, bucket `insumos`, y la función desplegada con `--no-verify-jwt`. **No cargar contenido real sensible hasta activar Supabase Auth** y cerrar todas esas políticas de una vez.

## Convenciones obligatorias (resumen de `gestion/CONVENCIONES.md` — leerlo completo antes de editar el informe)

- **"Kenex" con UNA sola "n", SIEMPRE.** Si aparece "Kennex" en insumos nuevos, normalizar. · "Vera Gavizon" (nunca "Vera G.") · "Evelia Manzo".
- Correcciones de dictado por voz: "Kuwait"→Cubitt · "LARQ"→Lark · "ODU"→Odoo · "Raúl"→Rower.
- **Cliente-facing:** despersonalizar hallazgos; NUNCA nóminas paralelas/pagos entre países/sensibilidades fiscales; citas ≤15 palabras; la formalización SIEMPRE como habilitación, nunca como corrección del pasado.
- **⚠️ Lección del srcdoc:** nunca anclar inserciones con `find('<footer>')` ni tags genéricos — el srcdoc del diagrama contiene tags literales. Anclar por strings largos únicos o `rfind` para el final del documento.
- **Flujo de edición del informe:** ediciones vía Python `str.replace` con anclas únicas (verificar `count==1` antes de reemplazar) → validar con HTMLParser tolerante (criterio: stack final `== []`) → verificar por DOM con Playwright (enlaces `#sN` sin romper, diagrama del modal íntegro con sus 6 capas) → commit.
- Paleta: `--navy:#1F3864 --blue:#2E75B6 rojo:#C00000 verde:#2E7D32 ámbar:#B26A00`; fuente Calibri/Segoe. Todo módulo nuevo usa esta identidad.

## Flujo de trabajo

- **Servidor local:** `python -m http.server 8080` desde la raíz (o `scripts/servidor-local.bat`).
- **Comprobaciones antes de commitear** (ver `scripts/README.md`): `python scripts/validar-html.py` valida los 9 HTML del repo (HTMLParser tolerante que excluye el contenido de `srcdoc`); `python scripts/comprobar-sistema.py` corre las 7 del prototipo —rutas, contraste WCAG AA, cifras del recorrido contra la pantalla, ámbitos de firma, reglas huérfanas, moneda y freno—. Las dos salen con código 1 si algo falla. ⚠️ Si añades una comprobación, **rómpela a propósito primero** y confirma que la detecta.
- **Git:** `main` es la default y se publica directo a ella (cuenta `gmontieltoro`, permiso Write — los cambios de settings del repo requieren un admin de la org). Commits atómicos por lote con mensaje descriptivo. Si el usuario pide "no push", commitear en local y esperar autorización.
- **Numeración interna del informe:** tras la reestructuración de jul-2026, si se reordena cualquier sección: PRIMERO renumerar con tabla de equivalencias y propagar TODAS las referencias (grep de control al final), DESPUÉS redactar texto nuevo con la numeración nueva. Ver protocolo en `gestion/AUDITORIA_HILO_CONDUCTOR_17jul.md` §10. ⚠️ Desde el acordeón del sidenav, los `<h3>` llevan **id derivado de su número** (`sN-M`): al renumerar hay que propagar también esos ids y los `href="#sN-M"`/`data-sub` del menú, o los subpuntos apuntarán al sitio equivocado. Control: cada `data-sub` debe tener un `<h3>` con ese id.

## Estado del informe (corte 17-jul-2026, tras la sesión de reestructuración)

**Auditoría integral ejecutada** (65 análisis: 13 lectores por sección + 3 lentes globales + verificación adversarial + crítico de completitud) → `gestion/AUDITORIA_HILO_CONDUCTOR_17jul.md` con plan priorizado y protocolo de ejecución. **Aplicado:**

- **Lote A** — higiene: índice fósil duplicado eliminado; 11+ referencias fósiles de numeración vieja corregidas; conteos (trece brechas, ocho prácticas); "Kennex"→"Kenex" en el diagrama.
- **Lote B** — divisores visibles de Parte I/II/III con puentes ("estructura primero" / "el dato antes que el agente").
- **Lote C** — amarillos resueltos con evidencia: Universidad **Cubitt** (unificada), Deltadir = operación propia (no socio local; el socio es Costa Rica), gobierno armonizado a la 3.3 canónica (Junta = 5+2 externos · Comité Directivo = accionistas · C. Finanzas = +contabilidad), "41 nombres", fechas de portada (corte 17-jul, Junta 24-jul).
- **Lote D** — puentes entre secciones (s4→s5, s7→s8, s8→s9).
- **Lotes E-F** — reórdenes estructurales: **s4** = 4.1→4.2→**4.3 Validación**→4.4 Multi-grupo→4.5 Dependencias→4.6 PMO→4.7 Flujos · **s11** = …11.4 Verificaciones→11.5 Inventario→**11.6 Estrategia** (cierra hacia s12) · **2.3** = cobertura→entrevistas→gobernanza→requisitos→caracterización. Identidades armonizadas con nómina (Edumar Escalona, Juseth González, Herrera/Zapata/Yépez, Mejías en Colón).
- **s9 reconstruida**: 9.1 criterios de lectura (escala grupo vs función) · 9.2 tabla de 21 hallazgos (10 Alta/7 Media-Alta/3 Media/1 Oportunidad, ordenados por recorrido s3→s8, con 3 filas nuevas: gobierno del dato 7.7+5.3, función transversal 7.6, continuidad 7.8) · 9.3 los dos hilos.
- **Organigrama y modo presentación integrados** (ver Arquitectura arriba).

**Pendiente (decisión de contenido del equipo — NO hacer sin ellos):**
- **s1 Resumen ejecutivo** — se redacta AL FINAL; su mandato correcto está en la auditoría §7.1 (dos tesis + tabla única de decisiones + deslinde con 2.0).
- **s13 Hoja de ruta** — espera insumo de Gabriel; estructura 13.0-13.6 lista en la auditoría §7.3.
- **Destinatario de portada** ("Comité Directivo" vs "Junta Directiva") — decisión de Clemencia (recomendación fundamentada: Junta).
- Cifras de Maia sin conciliar (30/60/70/150) — dato del equipo.
- 10.2: bloque de talento que responda las 4 decisiones de 5.4 (capa corporativa de RRHH en los tres modelos).
- Versión cliente: script de build que ampute Anexo B + s17 + sus entradas de sidenav/TOC, y verifique el enlace de Drive (hoy en modo `edit`).

## Orden de las secciones (reordenamiento del 27-jul-2026)

La **8 y la 9 se intercambiaron**: hoy va **7 Tecnología → 8 Auditoría técnica de Lark y Odoo → 9 Cultura y adopción de IA → 10 Arquitectura IA**. Lee: el ecosistema, el examen de las dos plataformas que lo sostienen, la base humana, y la arquitectura que se propone. Consecuencia editorial: el «componente técnico» **ya no es contiguo** — es «secciones 8 y 10», con la cultura en medio; toda referencia decía «secciones 9 y 10» y se propagó. Los tres puentes entre 7-8, 8-9 y 9-10 se reescribieron (el de 9-10 es nuevo y recoge el «la Parte I cierra con…» que traía el anterior).

⚠️ Tres anclas que **parecen** secciones y no lo son — blindarlas en cualquier renumeración futura: el array `secs=['s2',…]` de los botones «▶ Presentar» (va en orden de documento, **no** se renumera), las filas «8. Gestión de…» / «9. Gestión de…» del mapa de procesos (macroprocesos), y los `font-size:9.5px` de los SVG del deck.

## Deslinde hallazgo / propuesta (27-jul-2026)

En las secciones **7, 8, 9 y 10** se separó lo que la evidencia sostiene de lo que proponemos nosotros. Cada una cierra con un **preborrador de propuesta** rotulado con el distintivo `badge b-prop` (violeta) y una `.prop-nota` de deslinde; los hallazgos que originan cada propuesta llevan una `.remite` que apunta a ella.

- **7.1–7.9 hallazgo · 7.10 síntesis de hallazgos · 7.11 preborrador** (cuatro propuestas: certificar el dato · la tecnología y la IA como función transversal · gobernar el acceso al dato · núcleo Odoo nativo + capa propia). La vieja 7.10 (definición arquitectónica) y los tres bloques «Implicación» de 7.5/7.6/7.7 se consolidaron ahí; la síntesis bajó de 7.11 a 7.10.
- **8.1–8.5 hallazgo · 8.6 preborrador** (hacer nacer el sistema propio).
- **9.1–9.2 hallazgo · 9.3 preborrador**. Las viejas 9.3/9.4/9.5 eran las tres propuesta. La 9.3 incluye la **escalera de adopción** («el efecto cascada»): gráfico traído de otro proyecto del equipo y **recreado en HTML+CSS nativo** (clases `.esc-*`), no incrustado como imagen — así queda versionado, se imprime y reflota en móvil. Adopta la paleta del informe (navy→azul) en lugar del turquesa del deck de origen; sus cuatro contrastes están medidos contra WCAG AA (11.6 · 4.8 · 5.4 · 9.3).
- **10 entera es propuesta** — la arquitectura de IA no existe en la organización. Nueva **10.7 = los dos quick wins** (el agente conversacional · la formación con licencia Claude Teams); el cierre pasó a 10.8.

⚠️ **Maia no es un hallazgo**: es despliegue del equipo consultor. Se retiró de 7.1 (era una fila de la tabla de sistemas del grupo), de 7.4, de toda la 9 y de la capa C6 de la 10. **Sigue** —legítimamente— en los anexos, la tabla de requisitos, la 3 y la hoja de ruta (12.3), que son registro del proyecto. No reintroducirlo como hallazgo.

## El hilo conductor del informe (protegerlo en toda edición)

*Criterio personal sin procedimiento* (s3–s6) → *dato sin certificar* (s7) → **dos tesis**: *estructura primero* (Parte II) y *el dato antes que el agente* (Parte III, s11–s13). Los cuatro números que la Junta debe retener: **~400 personas · 12 dependencias críticas · 22/104/260 procesos · 52 proyectos con 3 PM**.

## Equipo (quién pide qué)

Clemencia Abad (PM; redacción cliente-facing, portada, s3/s5/s8/s10) · Gabriel Montiel (técnico: s7/s11/s12/s13, diagrama, sitio) · Jesús Planas (procesos, s6 y mapa) · Vanessa Anderson (talento, s5/s10) · Josué Bonilla (cambio/Maia; dicta por voz — aplicar correcciones de dictado) · Melanieth Aponte (transcripciones).
