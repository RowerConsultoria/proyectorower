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
