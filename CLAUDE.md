# CLAUDE.md — Proyecto Rower

Guía de contexto para sesiones de Claude Code en este repositorio. Leer antes de editar cualquier cosa.

## Qué es este proyecto

Consultoría de **Optimización Organizacional y Adopción de IA** de **UCAB Consultores** para **Grupo Kenex** (holding familiar de distribución de electrónica: Casio —representada— y Cubitt —propia—; opera en VE/PA/CO/CR/GT/US). Contrato en 4 fases: F1 diagnóstico · F2 documentación de procesos y prototipos IA · F3 reestructuración de talento · F4 evaluación/cierre.

**Hito crítico:** presentación formal a la Junta Directiva (vía Lark) — **viernes 24-jul-2026, 11:00 am**.

⚠️ **Contenido confidencial.** Material interno del equipo consultor (PM: Clemencia Abad). No compartir fuera del equipo.

## Arquitectura del aplicativo

Dos secciones, ambas accesibles desde el portal raíz (`index.html`):

### 🟢 Front (público) — el informe
`informe/fase1/informe-diagnostico-fase1.html` — **el entregable maestro**: sitio navegable autocontenido (sidenav con scroll-spy, 13 secciones + anexos, diagrama de arquitectura embebido vía `iframe srcdoc` en s12). Integra además:
- **Organigrama interactivo** (`informe/fase1/organigrama-kenex.html`): app canvas con pan/zoom, 13 escenas, buscador, 18 flujos funcionales, 9 alertas. Se abre como **panel lateral derecho** (botón fijo "🏛 Organigrama", entrada del sidenav "Módulos", ancla en 4.1). Archivo hermano: se itera SIN tocar el maestro.
- **Modo presentación** (`informe/fase1/presentacion-fase1.html`): deck de **49 láminas** que renderiza visualmente cada sección (s7 tiene 7 láminas por sus subpuntos). Botón "▶ Presentar" junto a cada h2 (decoración JS), FAB "▶ Presentación", overlay fullscreen, ←/→, menú de secciones, hash routing (`#s7`), Esc vuelve a la lectura. Cada lámina es un `<section class="slide" data-sec="sN">` autocontenido — añadir/editar láminas = editar ese archivo.

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

- **Servidor local:** `python -m http.server 8080` desde la raíz (o `scripts/servidor-local.bat`). El validador HTML del equipo vive en el scratchpad de sesión; recrearlo si hace falta (HTMLParser tolerante que excluye el contenido de `srcdoc`).
- **Git:** `main` es la default y se publica directo a ella (cuenta `gmontieltoro`, permiso Write — los cambios de settings del repo requieren un admin de la org). Commits atómicos por lote con mensaje descriptivo. Si el usuario pide "no push", commitear en local y esperar autorización.
- **Numeración interna del informe:** tras la reestructuración de jul-2026, si se reordena cualquier sección: PRIMERO renumerar con tabla de equivalencias y propagar TODAS las referencias (grep de control al final), DESPUÉS redactar texto nuevo con la numeración nueva. Ver protocolo en `gestion/AUDITORIA_HILO_CONDUCTOR_17jul.md` §10.

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

## El hilo conductor del informe (protegerlo en toda edición)

*Criterio personal sin procedimiento* (s3–s6) → *dato sin certificar* (s7) → **dos tesis**: *estructura primero* (Parte II) y *el dato antes que el agente* (Parte III, s11–s13). Los cuatro números que la Junta debe retener: **~400 personas · 12 dependencias críticas · 22/104/260 procesos · 52 proyectos con 3 PM**.

## Equipo (quién pide qué)

Clemencia Abad (PM; redacción cliente-facing, portada, s3/s5/s8/s10) · Gabriel Montiel (técnico: s7/s11/s12/s13, diagrama, sitio) · Jesús Planas (procesos, s6 y mapa) · Vanessa Anderson (talento, s5/s10) · Josué Bonilla (cambio/Maia; dicta por voz — aplicar correcciones de dictado) · Melanieth Aponte (transcripciones).
