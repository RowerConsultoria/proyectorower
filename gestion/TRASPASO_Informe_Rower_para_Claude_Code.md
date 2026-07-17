# TRASPASO — Informe Diagnóstico Fase 1 · Proyecto Rower
## Documento de contexto para sesión de diseño en Claude Code

**Generado:** viernes 17 de julio de 2026
**Autor del traspaso:** sesión de trabajo Claude.ai (chat del proyecto Rower)
**Destino:** sesión Claude Code — diseño y refinamiento del informe

---

## 1. CONTEXTO DEL PROYECTO

**Proyecto Rower** — consultoría de Optimización Organizacional y Adopción de IA de **UCAB Consultores** para **Grupo Kenex** (Kenex Trading S.A.), holding familiar (familia Roizental) de distribución de electrónica de consumo. Distribuye **Casio** (marca representada, proveedor japonés) y **Cubitt** (marca propia, fábricas en China). Opera en Venezuela, Panamá, Colombia, Costa Rica, Guatemala y EE.UU. Contrato ~89.050 USD + IVA, 5 meses, 4 fases: F1 diagnóstico · F2 documentación de procesos y prototipos IA · F3 reestructuración de talento · F4 evaluación/certificación/cierre.

### Fechas críticas inmediatas
| Hito | Fecha | Estado |
|---|---|---|
| Revisión de borrador con Bernardo (CEO) | **viernes 17-jul (HOY)** | inminente |
| Presentación formal a la **Junta Directiva** (vía Lark) | **viernes 24-jul, 11:00 am** | 7 días |

### Equipo consultor (quién pide qué en los chats)
- **Clemencia Abad** — PM. Pide ajustes de redacción cliente-facing, despersonalización, secciones 3/5/8/10, índice.
- **Gabriel Montiel (GMT)** — Lidera lo técnico: secciones 7, 11, 12, diagrama de arquitectura, sitio navegable, hoja de ruta (s13 espera su insumo).
- **Jesús Planas** — Procesos: sección 6 completa y mapa de procesos (v5 → v7 integrado).
- **Vanessa Anderson** — Talento: secciones 5 y 10 (workstream F3.1/F3.2/F4.1).
- **Josué Bonilla** — Cambio/Maia (dicta por voz: corregir "Kuwait"→Cubitt, "LARQ"→Lark, "ODU"→Odoo, "Raúl"→Rower).
- **Melanieth Aponte** — Transcripciones (pipeline Fireflies→Word).

---

## 2. INVENTARIO DE ARCHIVOS

### El entregable maestro
```
/mnt/user-data/outputs/informe_diagnostico_fase1_v1.html   (~420 KB, autocontenido)
```
- **Sitio navegable de un solo archivo**: menú lateral fijo (navy) con scroll-spy, layout dos columnas, responsive con hamburguesa móvil.
- **Diagrama de arquitectura embebido** como popup/modal en la sección 12 vía `iframe srcdoc` (autocontenido: el HTML viaja solo).
- Español. Paleta institucional (ver §5 Convenciones).

### Archivos de apoyo
```
/mnt/user-data/outputs/arquitectura_ia_diagrama.html        Diagrama standalone (12.8 KB) — fuente del srcdoc del modal
/mnt/user-data/outputs/informe_diagnostico_fase1_v1.docx    Word DESACTUALIZADO (13-jul) — regenerar si se pide
/mnt/user-data/outputs/organigrama_asis_grupo_kennex_spec.md Spec del organigrama as-is (12-jul)
```

### Uploads del cliente/equipo (en /mnt/user-data/uploads/)
```
Mapa_Procesos_Kennex_v7_Integrado.xlsx   ← VERSIÓN VIGENTE del mapa (integrada en 6.5)
Mapa_Procesos_Kennex_v5_AsIs_ToBe.xlsx   ← superada
Diagnostico_de_Brechas_de_RRHH_v2.html   ← insumo de Vanessa para s5
Estructura_Patron_de_Cargos_RRHH.html    ← NO integrada aún al informe
```

### Fuentes primarias (proyecto Claude — /mnt/project/)
23+ entrevistas y reuniones transcritas (JSON Fireflies + MD), estatus del proyecto (`Estatus_Proyecto_Rower_10jul_v5.docx`), propuesta (`0_Propuesta_Rower_C.pdf`), código de cultura Cubitt, fundamentos web de Kenex.

### Google Drive (MCP conectado)
- Carpeta "Proyecto Rower". Búsqueda más fiable con `fullText contains '...'`.
- **PPTX enlazado desde 10.2:** "Propuestas_Estructura_Organizativa_Rower" (22 láminas, 3 modelos):
  `https://docs.google.com/presentation/d/1I_6I3QsXlKhIDINOk1NDMzUDo0zn8rsmzaQ2Tyujy38/edit?usp=drivesdk`
  ⚠️ Verificar permisos de compartición antes de la Junta.

### Transcripts de sesiones previas (/mnt/transcripts/)
5 transcripts con todo el detalle de construcción (2026-07-14 a 2026-07-15) + `journal.txt` (catálogo). Consultar incrementalmente si se necesita el detalle de alguna decisión.

---

## 3. ESTADO SECCIÓN POR SECCIÓN (auditoría del 17-jul)

Numeración real de `<h2 id="sN">`. Longitudes en bytes del HTML.

| # | Sección | Estado | Long. | Notas |
|---|---|---|---|---|
| Índice | Índice del documento | ✅ Sincronizado | 3.3K | Partes I/II/III + Anexos + grupo "Uso interno" |
| 1 | Resumen ejecutivo | ❌ **PENDIENTE** | 0.4K | Placeholder. Se redacta AL FINAL (cuando 9/13 cierren) |
| 2 | Metodología y fuentes | ✅ Completa | 32K | 2.1 enfoque · 2.2 marco 6 aspectos · 2.3 inventario fuentes |
| 3 | Fundamentos, gobierno y estrategia | ✅ Completa | 30K | Editada por Clemencia (despersonalizada; anatomía gobierno aclarada 14-jul; tabla A con #7 ruta estratégica y #8 protocolo familiar "Pendiente") |
| 4 | Estructura organizativa global | ✅ Completa | 61K | 4.1–4.7 incl. 4.5 PMO desarrollada (52 proyectos, ~30 en curso, 3 PM, sin gestión presupuestaria, propuesta procurement). Tabla de alertas MOVIDA a s17 |
| 5 | Talento y RRHH | ✅ Completa | 21K | Editada (Panamá "estructura aparente no robusta", Servicios Generales excluir, diccionario de competencias con IA como categoría propia, criterios severidad = riesgo operación + reto estratégico) |
| 6 | Procesos y operaciones | ✅ Completa | 56K | 6.1–6.4 narrativa desde entrevistas + **6.5 Mapa v7 integrado**: 22 macroprocesos · 104 procesos · 260 procedimientos, 3 tablas con rowspan N0/N1, SIN columna de estado |
| 7 | Tecnología, sistemas y datos | ✅ Completa | 72K | 11 subsecciones en 4 bloques (retrato → célula BI → 4 riesgos → quick wins → definición Odoo nativo+capa propia → síntesis). La más larga |
| 8 | Cultura y adopción de IA | ✅ Completa | 10K | 2 ejes de formación (Maia fundamentos / Claude directivos-gerencia) + política de IA + estructura de IA + crecimiento "caótico/arbitrario" (cita textual checkpoint) |
| 9 | Síntesis de hallazgos críticos y riesgos | ⚠️ Borrador temprano | 12K | Existe intro + 1 tabla. **REVISAR**: consolidar riesgos 7.5–7.8 y de s3–s8 con matriz de severidad. Sin h3/h4 internos |
| 10 | Propuesta de estructura | ⚠️ Parcial | 12K | 10.1 principios ✅ · intro nueva (borradores "on the go") ✅ · 10.2 con 3 modelos + botón al PPTX ✅ · **1 placeholder pendiente**: elementos adicionales (instancia gobierno IA, reducción dependencias) |
| 11 | Auditoría Lark y Odoo | ✅ Completa (fase documental) | 26K | Límites verificados con web; 11.6 = verificaciones bloqueadas por acceso directo (C#2) |
| 12 | Arquitectura IA preliminar | ✅ Completa | 42K | 6 capas + C0 gobierno + equipo interno; MCP verificado; 3 profundizaciones; **modal del diagrama aquí** |
| 13 | Hoja de ruta de automatización | ❌ **PENDIENTE — insumo Gabriel** | 1.2K | Solo tabla de casos candidatos. Insumos disponibles dispersos en s7/s11/s12 |
| A (s15) | Inventario de entrevistas | ⚠️ "En construcción" | 3.5K | 1 tabla. Cotejar contra el inventario real de 2.3 |
| B (s16) | Plan de trabajo interno F1 | ✅ (interno) | ~6K | **Se elimina en la versión final para el cliente** (así lo dice su propio encabezado) |
| s17 | Apartado interno — Alertas de identidad | ✅ (interno) | 5.4K | 13 casos + header. Al final del documento, tras Anexo B. Badge "Uso interno del equipo" |

### Orden físico actual de secciones
`indice → s1…s12 → s13 → s15 → s16 → s17 → footer` ✅ (corregido hoy; ver incidente §6)

---

## 4. PENDIENTES PRIORIZADOS (para cerrar antes del 24-jul)

### Contenido (bloqueante para la Junta)
1. **s13 Hoja de ruta** — esperar/pedir insumo de Gabriel; los casos candidatos ya están tabulados y los insumos técnicos viven en 7.9 (quick wins), 11.4 (inventario manuales), 11.5 (estrategia) y 12.5 (olas de agentes). Se puede armar un borrador sólido solo con eso.
2. **s9 Síntesis de riesgos** — consolidar en matriz (severidad × área × fuente). Insumo directo: riesgos 1–4 de s7, dependencias 4.4, brechas 5.3/5.4, vacíos del mapa 6.5, hallazgos 3.2/3.3.
3. **s1 Resumen ejecutivo** — redactar AL FINAL. Una página. Debe responder: qué es el grupo, qué encontramos (5–7 hallazgos), qué proponemos (estructura + IA), qué sigue (F2).
4. **Placeholder 10.2** — incorporar los "elementos adicionales" (instancia de gobierno de IA del Comité 01-jul; reducción de dependencias individuales).
5. **Anexo A** — completar inventario (cotejar con 2.3).

### Decisiones editoriales pendientes (preguntar a Clemencia)
6. **Portada**: dice "Destinatario: Comité Directivo — Kenex Trading" y la nota confidencial también. La presentación es a la **Junta Directiva**. Ofrecido cambiar; sin respuesta aún.
7. **Portada — fechas**: "Fecha de emisión 10-jul" y "entrega comprometida 18-jul" quedaron viejas. Actualizar a corte real + presentación 24-jul.
8. **Anexo B y s17**: son internos. ¿Se entregan en el HTML de la Junta o se genera una **versión cliente** sin ellos? Recomendación: build de dos variantes (interna / cliente) desde el mismo maestro.
9. **Estructura_Patron_de_Cargos_RRHH.html** (upload de Vanessa) sin integrar — ¿va como subsección de s5, anexo, o se queda fuera?
10. **Word**: el .docx de outputs es del 13-jul (pre-todo). Regenerar solo si lo piden (pandoc; las tablas con rowspan y el modal no sobreviven bien — advertirlo).

---

## 5. CONVENCIONES DEL PROYECTO (obligatorias)

### Nomenclatura
- **"Kenex" con UNA n, SIEMPRE** (Kenex Trading, Kenex USA). Reemplazo global aplicado por decisión de Clemencia (opción A, sin excepciones). Si aparece "Kennex" en insumos nuevos, normalizar.
- **"Vera Gavizon"** (sin tilde, nunca "Vera G.").
- "Evelia Manzo" (apellido según nómina oficial).

### Redacción cliente-facing
- **Despersonalizar hallazgos**: no atribuir a nombres propios en el cuerpo (ej. "confirmado por tres fuentes independientes", "un miembro de junta"). ÚNICA excepción acordada: el pronunciamiento sobre Alexis Mujica (pedido por Candanedo).
- **NUNCA en entregables**: nóminas paralelas, pagos complementarios entre países, sensibilidades fiscales (canal confidencial Clemencia/Vanessa/Josué).
- No exponer mecánica interna de procesamiento ("transcripción cargada", etc.) salvo pedido explícito.
- Citas textuales de entrevistas ≤ 15 palabras.
- Formalización SIEMPRE enmarcada como habilitación, nunca como corrección del pasado (40 años sin documentación = cultura sensible).

### Técnica de edición del HTML
- Ediciones vía Python `str.replace` sobre el archivo (strings largos y únicos como ancla).
- **Validar SIEMPRE** con HTMLParser tolerante (los MISMATCH por el `srcdoc` del iframe son esperados; el criterio es `stack final == []`).
- **⚠️ LECCIÓN DEL INCIDENTE (§6): nunca anclar inserciones con `find('<footer>')` ni con tags genéricos** — el srcdoc del diagrama contiene tags literales (`<footer>`, `<div>`, etc.) porque el escape solo convierte `&` y `"`. Anclar por `id` únicos o usar `rfind` para el final del documento.
- Tras cada iteración: copiar a `/mnt/user-data/outputs/` + present_files.
- Verificación visual con playwright; si la captura no se puede inspeccionar, **verificar por DOM** (`page.evaluate`) — es más concluyente.

### Paleta y componentes visuales
```css
--navy:#1F3864  --blue:#2E75B6  rojo:#C00000  verde:#2E7D32  ámbar:#B26A00
Fuente: Calibri/Segoe stack · badges: b-borr / b-prog / b-pend
Tablas: class="data" · fuentes: class="fuentes" (banda gris borde izq navy)
Sidenav: gradiente navy, activo = fondo azulado + borde izq #9dc3ee
Modal: .modal-scrim/.modal-box/.modal-frame (iframe 78vh)
Mapa procesos: N0 con fondo #F4F6FA + bold; rowspan solo N0 y N1
```

---

## 6. INCIDENTE CORREGIDO HOY (importante para el historial)

**Bug:** al mover el "Apartado interno — Alertas de identidad" al final del informe (sesión del 15-jul), la inserción se ancló con `find('<footer>')`. Ese find dio con el `<footer>` **del diagrama embebido dentro del atributo `srcdoc`** (el escape de srcdoc convierte `"`→`&quot;` pero deja `<footer>` literal). Consecuencias: el apartado quedó **dentro del iframe como contenido fallback (invisible)**, el srcdoc del diagrama quedó truncado (la primera comilla cruda del apartado cerró el atributo), no existía elemento real `id="s17"` (enlaces del menú rotos), y el menú tenía un grupo duplicado.

**Fix aplicado (17-jul, verificado por DOM):**
1. Reemplazo completo del `<iframe>` corrupto por uno nuevo con el srcdoc regenerado desde `arquitectura_ia_diagrama.html` (diagrama íntegro: 6 capas + footer).
2. Reinserción del apartado limpio **después del Anexo B**, anclado con `rfind('<footer>')` (el footer real de la página).
3. Deduplicación del menú (1 solo enlace #s17 bajo "Uso interno").
4. Verificación DOM: `s17` existe y visible, tabla 14 filas, modal abre, iframe renderiza título + 6 capas + footer.

**Backup previo al fix:** `backup_pre_fix_s17.html` (en /home/claude/rower, efímero — el filesystem se resetea entre sesiones; los outputs son lo persistente).

---

## 7. RECOMENDACIONES PARA LA SESIÓN DE DISEÑO (Claude Code)

### A. Diseño del documento (lo que pide la ocasión: Junta el 24-jul)
1. **Portada real**: hoy es una tabla de metadatos. Diseñar una portada de informe ejecutivo (logo/nombre proyecto, título, fecha, confidencialidad) y pasar la tabla de metadatos a una segunda "página".
2. **Hoja de estilos de impresión/PDF** (`@media print`): la Junta pedirá PDF. Hoy el sidenav, el modal y los hovers no tienen tratamiento print. Definir: ocultar sidenav, saltos de página por sección (`break-before`), tablas con `thead` repetido, y el diagrama como figura estática a página completa (no modal).
3. **El mapa de procesos (260 filas) es el mayor reto de lectura.** Opciones: (a) macroprocesos colapsables (details/summary o JS), (b) buscador/filtro simple sobre las tablas, (c) en print, mover el mapa completo a anexo y dejar en 6.5 solo la síntesis. Recomiendo a+c.
4. **Sección 9 como pieza visual**: la síntesis de riesgos merece una matriz visual (severidad × probabilidad o severidad × área) — es LA lámina que la Junta va a mirar. Hoy es tabla plana.
5. **Resumen ejecutivo con diseño propio**: cuando se redacte s1, tratarlo como one-pager visual (los 5–7 hallazgos con iconografía sobria), no como texto corrido.
6. **Versión cliente vs. interna**: script de build que genere del maestro dos salidas (con/sin Anexo B y s17, y con la nota confidencial ajustada al destinatario). Evita errores manuales de última hora.
7. **Micro-detalles detectados**: título del `<head>` y branding del sidenav revisarlos tras cualquier cambio de portada; el enlace "Abrir el diagrama en una pestaña nueva ↗" del modal apunta a `arquitectura_ia_diagrama.html` relativo — solo funciona si ambos archivos viajan juntos (decidir: quitarlo o mantener la pareja de archivos).

### B. Contenido (del análisis acumulado de todas las fuentes)
1. **El hilo del informe ya existe y es fuerte** — protegerlo en el diseño: *criterio personal sin procedimiento* (s3–s6) → *dato sin certificar* (s7) → *por eso la arquitectura pone el dato antes que el agente* (s11–s12). El diseño debe reforzar esa progresión (transiciones entre partes I/II/III).
2. **Los cuatro números que la Junta debe retener**: ~400 personas (VE 227 / PA 135 / CO 39) · 12 dependencias críticas individuales · 22/104/260 (arquitectura de procesos) · 52 proyectos con 3 PM. Considerar una banda de "cifras clave" al inicio.
3. **Puntos sensibles a re-verificar antes del 24**: (a) permisos del PPTX en Drive; (b) que ninguna referencia a nóminas paralelas se haya colado (grep por "paralela", "complementari"); (c) portada Comité vs Junta; (d) apartado s17 y Anexo B fuera de la versión cliente.
4. **s13 no necesita esperar**: hay material para un borrador de hoja de ruta por olas (Ola 1: e-commerce VE, nómina, reportería · Ola 2: compras, conciliación, dashboard · Ola 3: sistema propio) alineado con 12.x. Proponerlo a Gabriel como base y que él lo module.

### C. Operativa de la sesión Claude Code
- Trabajar SIEMPRE sobre `/mnt/user-data/outputs/informe_diagnostico_fase1_v1.html` como fuente de verdad (el home se resetea).
- Mantener el flujo: editar → validar (stack vacío) → verificar DOM con playwright → copiar a outputs.
- Los transcripts en `/mnt/transcripts/` tienen el detalle verbatim de cada decisión si algo genera duda; leerlos incrementalmente (son grandes).
- Los usuarios se identifican al escribir (Clemencia/Gabriel/Jesús/Vanessa) — el tono y el tipo de encargo cambia según quién es.

---

## 8. RESUMEN EN UNA LÍNEA

**El informe está ~85% completo y estructuralmente sano tras el fix de hoy: faltan s1, s13, la maduración de s9, un placeholder en 10.2 y el Anexo A; las decisiones abiertas son de empaque (portada, versión cliente, PDF) — exactamente el terreno de la sesión de diseño que arranca.**
