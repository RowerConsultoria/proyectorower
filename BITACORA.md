# Bitácora — Proyecto Rower

Única bitácora del proyecto: el estado y el avance de **todo** (informe, admin, `/sistema`, backend), alimentada por todos los asesores. No hay otra — el resto de READMEs y notas de gestión se retiraron el 26-ago-2026; lo permanente vive en `CLAUDE.md` (arquitectura y convenciones) y aquí (avance).

## La regla (obligatoria antes de todo `git push`)

1. **Leer esta bitácora COMPLETA** — no hay atajo, es corta a propósito para que se pueda.
2. **Buscar contradicciones, errores o duplicados** entre lo que ya está escrito y lo que estás por publicar. Corregirlos ahí mismo (edita o borra la entrada vieja; no dejes dos versiones de la misma verdad).
3. **Recién entonces**, añadir la entrada nueva **al final** del archivo.
4. **Mantenerla compacta.** Unas pocas líneas por entrada: qué avanzó, quién, cuándo. Si una entrada vieja ya no aporta nada que alguien vaya a necesitar (un bug ya corregido en el código, una fase ya cerrada), resúmela en una línea o bórrala — la bitácora documenta hacia dónde va el proyecto, no cada paso que dio. Si esto deja de leerse completo antes de cada push, la regla dejó de servir.

Formato de cada entrada: `**YYYY-MM-DD** — quién — qué cambió/decidió, en una o dos frases.`

---

**2026-07-17** — Clemencia/equipo — Auditoría integral del informe (65 análisis) y reestructuración: higiene de numeración, divisores de Parte I/II/III, amarillos resueltos con evidencia, reórdenes en s4/s9/s11/2.3. Traspaso del chat de construcción a Claude Code.

**2026-07-18** — Gabriel — Organigrama con 3 capas (declarado/real/propuesto) auditado contra el corpus completo. Línea de tiempo del admin sembrada con 148 eventos extraídos del análisis exhaustivo (entrevistas + minutas + propuesta + Excel).

**2026-07-24/27** — Gabriel — Reordenamiento de secciones 8↔9 (tecnología → auditoría Lark/Odoo → cultura y adopción de IA → arquitectura IA). Deslinde hallazgo/propuesta en s7–s10, cada una cerrando con preborrador de propuesta (`badge b-prop`) separado de la evidencia.

**2026-07-26/27** — Gabriel — Prototipo `/sistema` construido completo (series de fases 1–34): 12 módulos + portal del vendedor + portal del cliente, núcleo de agentes con 3 niveles de autonomía, reparto en escasez con precedencia estipulada, mapa ejecutivo (Mapbox vendorizado), 25 comprobaciones automáticas (`comprobar-sistema.py` + `comprobar-torre.py`). Arquitectura condensada en `CLAUDE.md`.

**2026-08-04** — Gabriel — Supabase Auth activado: acceso anónimo cerrado en todas las tablas/Storage/Edge Functions; 4 roles y 10 permisos con RLS por permiso (`tiene_permiso()`); módulos admin **Usuarios** y **Roles y permisos**. Arrancó Fase 3: módulo **Censo y enlaces** + ficha pública de actualización de perfil (426 personas de Kenex, importadas de nómina).

**2026-08-26** — Gabriel — Rebrand completo del sitio a la identidad Cubitt/kenex (antes navy/Calibri por página; ahora un solo sistema de diseño compartido en `estilo/app.css`, tema claro por defecto salvo `/sistema`). Admin reconstruido módulo por módulo (Asistente IA, Entrevistas, Archivos, Censo y enlaces, Fichas recibidas, Usuarios, Roles y permisos) bajo reglas nuevas y ahora permanentes: **modal popup** para crear/ver detalle (nunca subpágina), **agrupación de tablas** con colapsar/expandir todo, iconografía geométrica monocroma unificada con `/sistema` (sin emoji, salvo el toggle de tema por un bug de fuente conocido). Barrido de documentación: se retiraron todos los README y notas de `gestion/` dispersos y desactualizados — `CLAUDE.md` (referencia) y esta bitácora (avance) quedan como única fuente, y actualizarla antes de cada `git push` pasa a ser regla del proyecto.

**2026-09-02** — Gabriel — **El informe pasa a ser dato consultable**, para la formación de Claude Cowork con la directiva (03-sep), que consulta la base por el MCP de Supabase en modo solo lectura. Tres secciones nuevas de `schema.sql`, **43 tablas y una vista**, cargadas desde el repo con `scripts/cargar-informe.py` (extractores `_extraer_informe.py`, `_extraer_mapa.js`, `_extraer_ia.js`, `_extraer_organigrama.js`):
- **§12 hallazgo** — 12 fricciones con su referencia de origen · 21 hallazgos con criticidad · 12 dependencias críticas · 13 brechas de RRHH · 23 procesos sin sistema · 38 vicios de flujo · 42 celdas sistema×país · el árbol 22/104/259 · los 82 encabezados reales del documento · `catalogo_datos`, la guía de la base. **`v_cuellos_de_botella`** (98 filas) une las cinco fuentes de fricción con su trazabilidad.
- **§13 propuesta** — la torre (4 niveles, 12 raíces con «qué se rompe si falta», 7 bajadas, el cedazo) y el prototipo (13 reglas con dueño/fecha/versión, 11 acciones con su gramática de autonomía, 7 escalones).
- **§14 organigrama** — 139 nodos con capa declarado/real, 18 con badge de diferencia, 19 flujos/66 pares, 13 alertas, 9 solapes, 19 evidencias [E-xx], 6 comités, 29 nodos de la estructura propuesta.

Lectura con `ver.informe` (el permiso que ya tenía el rol Junta), escritura con `admin.informe`; ningún permiso nuevo. El motivo se midió: el 95,6 % del índice de `fragmentos` era transcripción cruda y solo el 0,7 % venía del repo, así que preguntar por «cuellos de botella» devolvía diálogo de entrevista y hasta falsos positivos —en la 6.1 el cuello de botella es un control sano *deliberado*—.

Cuatro cabos, tres de ellos decisión del equipo y no del guion: (1) `secciones` sigue con la numeración de julio —es la tabla de seguimiento editorial y no se pisó; la estructura vigente está en `informe_estructura`—; (2) el flag sugerido/levantado de los 15 procedimientos de s9 no existe en el repo (la 6.5 dice que no incluye columna de estado), así que quedaron `sin_determinar` hasta sacarlo del Excel v7 o decidirlo con Jesús; (3) `org_personas` son **nodos, no personas únicas** — 12 actores repiten nodo por operar en varios países, y no se dedujo a propósito porque colapsarlos borraría el hallazgo de la 4.4 (`org_mismo_actor` los mapea); (4) las cifras de `sistema/datos/*.js` **no se cargaron** a propósito: el archivo las rotula «CIFRAS DE PROTOTIPO» y junto al dato real invitarían a responder «¿cuánto vendimos?» con un número inventado. De paso se corrigieron seis fósiles de numeración en `CLAUDE.md` (son 12 secciones, no 13; no existen s13 ni s14; solo hay Parte I y II).

**2026-09-06** — Gabriel — **Censo y enlaces**: la generación en masa pasa a modal con los dos lotes separados y contados antes de crear — individuales y **de equipo** (un enlace por gerente con el que llena la ficha de todos sus reportes directos); antes iba a ciegas tras un `confirm()` y, aunque ya creaba ambos tipos, desde la interfaz no se veía el de gerentes. El lote de equipo pasa a exigir reportes **activos**, el mismo criterio que ya usaba la ficha y que hasta ahora contradecía. La exportación cambia CSV por **Excel** (SheetJS a demanda, como la vista previa de Archivos): hoja «Enlaces» ordenada entidad→gerente→tipo y hoja «Equipos» con una fila por gerente y los integrantes que cubre, ambas con autofiltro y el enlace como hipervínculo. Pendiente decidir: los enlaces **vencidos** (45 días) siguen contando como existentes y el lote no los renueva — el Excel los marca en su columna.
