# Convenciones del proyecto (obligatorias)

Reglas vigentes para todo material del Proyecto Rower. Leer antes de editar el informe o subir insumos.

## Nomenclatura

- **"Kenex" con UNA "n", SIEMPRE** (Kenex Trading, Kenex USA). Decisión de Clemencia, sin excepciones. Si aparece "Kennex" en insumos nuevos, normalizar.
- **"Vera Gavizon"** (sin tilde, nunca "Vera G.").
- **"Evelia Manzo"** (apellido según nómina oficial).
- Correcciones frecuentes en dictados por voz: "Kuwait" → Cubitt · "LARQ" → Lark · "ODU" → Odoo · "Raúl" → Rower.

## Redacción cliente-facing

- **Despersonalizar hallazgos:** no atribuir a nombres propios en el cuerpo ("confirmado por tres fuentes independientes", "un miembro de junta"). Única excepción acordada: el pronunciamiento sobre Alexis Mujica.
- **NUNCA en entregables:** nóminas paralelas, pagos complementarios entre países, sensibilidades fiscales (canal confidencial Clemencia/Vanessa/Josué). Tampoco subirlos a este repositorio.
- No exponer mecánica interna de procesamiento ("transcripción cargada", etc.) salvo pedido explícito.
- Citas textuales de entrevistas ≤ 15 palabras.
- La formalización SIEMPRE enmarcada como habilitación, nunca como corrección del pasado (40 años sin documentación = cultura sensible).

## Técnica de edición del HTML maestro

- Ediciones vía Python `str.replace` sobre el archivo, usando strings largos y únicos como ancla.
- **Validar SIEMPRE** con HTMLParser tolerante. Los MISMATCH por el `srcdoc` del iframe son esperados; el criterio de éxito es `stack final == []`.
- ⚠️ **Lección del incidente del 15-jul:** nunca anclar inserciones con `find('<footer>')` ni con tags genéricos — el `srcdoc` del diagrama embebido contiene tags literales (`<footer>`, `<div>`, etc.) porque el escape solo convierte `&` y `"`. Anclar por `id` únicos o usar `rfind` para el final del documento. (El incidente dejó una sección invisible dentro del iframe y el diagrama truncado; ya corregido.)
- Verificación visual con Playwright; si la captura no se puede inspeccionar, verificar por DOM (`page.evaluate`).

## Paleta y componentes visuales

```css
--navy:  #1F3864   /* fondo sidenav, encabezados */
--blue:  #2E75B6
rojo:    #C00000
verde:   #2E7D32
ámbar:   #B26A00
```

- Fuente: stack Calibri/Segoe.
- Badges de estado: `b-borr` / `b-prog` / `b-pend`.
- Tablas: `class="data"` · bandas de fuentes: `class="fuentes"` (banda gris, borde izquierdo navy).
- Sidenav: gradiente navy; ítem activo = fondo azulado + borde izquierdo `#9dc3ee`.
- Modal: `.modal-scrim` / `.modal-box` / `.modal-frame` (iframe 78vh).
- Mapa de procesos: N0 con fondo `#F4F6FA` + bold; `rowspan` solo en N0 y N1.

Todo módulo o presentación nueva en este repositorio debe usar esta misma paleta y tipografía para mantener identidad visual.
