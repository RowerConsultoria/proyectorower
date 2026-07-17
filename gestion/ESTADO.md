# Estado del informe — Fase 1

**Última auditoría:** 17-jul-2026 (traspaso desde chat de construcción)
**Avance global:** ~85% — estructuralmente sano.

Mantener este documento actualizado al cerrar cada pendiente. La numeración corresponde a los `<h2 id="sN">` del HTML maestro (`informe/fase1/informe-diagnostico-fase1.html`).

## Estado sección por sección

| # | Sección | Estado | Responsable / notas |
|---|---|---|---|
| Índice | Índice del documento | ✅ Sincronizado | Partes I/II/III + Anexos + grupo "Uso interno" |
| 1 | Resumen ejecutivo | ❌ **Pendiente** | Se redacta AL FINAL (cuando s9 y s13 cierren). One-pager: qué es el grupo, 5–7 hallazgos, qué proponemos, qué sigue |
| 2 | Metodología y fuentes | ✅ Completa | |
| 3 | Fundamentos, gobierno y estrategia | ✅ Completa | Editada por Clemencia (despersonalizada) |
| 4 | Estructura organizativa global | ✅ Completa | Incl. 4.5 PMO (52 proyectos, 3 PM). Alertas movidas a s17 |
| 5 | Talento y RRHH | ✅ Completa | Vanessa. Pendiente decidir integración de `Estructura_Patron_de_Cargos_RRHH.html` |
| 6 | Procesos y operaciones | ✅ Completa | Jesús. 6.5 = Mapa v7 integrado: 22 macroprocesos · 104 procesos · 260 procedimientos |
| 7 | Tecnología, sistemas y datos | ✅ Completa | Gabriel. La más larga (11 subsecciones) |
| 8 | Cultura y adopción de IA | ✅ Completa | Josué |
| 9 | Síntesis de hallazgos críticos y riesgos | ⚠️ Borrador temprano | Consolidar riesgos de s3–s8 en matriz de severidad. Candidata a módulo visual interactivo |
| 10 | Propuesta de estructura | ⚠️ Parcial | Falta 1 placeholder en 10.2: elementos adicionales (instancia gobierno IA, reducción dependencias) |
| 11 | Auditoría Lark y Odoo | ✅ Completa (fase documental) | Gabriel |
| 12 | Arquitectura IA preliminar | ✅ Completa | Gabriel. Contiene el modal del diagrama |
| 13 | Hoja de ruta de automatización | ❌ **Pendiente — insumo Gabriel** | Hay material para borrador por olas con 7.9, 11.4, 11.5 y 12.5 |
| A (s15) | Inventario de entrevistas | ⚠️ En construcción | Cotejar contra el inventario real de 2.3 |
| B (s16) | Plan de trabajo interno F1 | ✅ (interno) | **Se elimina en la versión cliente** |
| s17 | Apartado interno — Alertas de identidad | ✅ (interno) | Badge "Uso interno del equipo". Fuera de la versión cliente |

## Pendientes priorizados (antes del 24-jul)

### Contenido (bloqueante para la Junta)
1. **s13 Hoja de ruta** — esperar/pedir insumo de Gabriel; se puede armar borrador sólido con 7.9 + 11.4 + 11.5 + 12.5.
2. **s9 Síntesis de riesgos** — consolidar en matriz (severidad × área × fuente).
3. **s1 Resumen ejecutivo** — redactar al final. Una página.
4. **Placeholder 10.2** — elementos adicionales (instancia de gobierno de IA del Comité 01-jul; reducción de dependencias individuales).
5. **Anexo A** — completar inventario (cotejar con 2.3).

### Decisiones editoriales abiertas (preguntar a Clemencia)
6. **Portada:** dice "Comité Directivo" pero la presentación es a la **Junta Directiva**.
7. **Portada — fechas:** emisión 10-jul y entrega 18-jul quedaron viejas; actualizar a corte real + presentación 24-jul.
8. **Versión cliente vs. interna:** ¿se entrega el HTML con Anexo B y s17 o se genera build de dos variantes? Recomendación: script de build con dos salidas desde el mismo maestro.
9. **`Estructura_Patron_de_Cargos_RRHH.html`** (Vanessa) sin integrar — ¿subsección de s5, anexo, o fuera?
10. **Word:** regenerar .docx solo si lo piden (las tablas con rowspan y el modal no sobreviven bien — advertirlo).

### Diseño / empaque (terreno de este repositorio)
- Portada real de informe ejecutivo (hoy es tabla de metadatos).
- Hoja de estilos de impresión/PDF (`@media print`): ocultar sidenav, saltos por sección, diagrama como figura estática.
- Mapa de procesos (260 filas): macroprocesos colapsables + en print mover a anexo.
- s9 como matriz visual de riesgos — la lámina que la Junta va a mirar.
- Banda de "cifras clave" al inicio: ~400 personas (VE 227 / PA 135 / CO 39) · 12 dependencias críticas · 22/104/260 procesos · 52 proyectos con 3 PM.

### Verificaciones antes del 24-jul
- [ ] Permisos del PPTX en Drive (enlazado desde 10.2).
- [ ] Grep por "paralela"/"complementari" — que nada sensible se haya colado.
- [ ] Portada Comité vs. Junta resuelta.
- [ ] s17 y Anexo B fuera de la versión cliente.
