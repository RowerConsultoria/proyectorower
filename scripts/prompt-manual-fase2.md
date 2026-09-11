# Prompt adaptado — Constructor de manuales para el aplicativo (Fase 2)

Adaptación de `Insumos/Prompt_Constructor_Manual_sobre_Mapa.txt` (v4, equipo
consultor) para que el resultado sea el **JSON de contenido** que consume
`informe/fase2/manual-contenido.js`, en vez de un documento Word + archivos
`.bpmn` sueltos. Conserva toda la metodología del prompt original; cambia
el formato de salida y quita lo que solo aplicaba a Word (portada, aviso de
confidencialidad como página, especificación editorial, glosario al final
como anexo de lectura obligatoria).

**Validado contra el piloto:** macro 9 (Ventas Retail), proceso 9.3
(Reposición de tiendas y kioscos) — 09/2026.

---

## 0. Cómo se usa

1. Precondición: el mapa v18 debe estar validado para el macroproceso a
   documentar (ya lo está — es la fuente de `manual-procesos-datos.js`).
2. Insumos por macroproceso: la porción del mapa (ya en el `.js`) +
   entrevistas relevantes de `Insumos/Entrevistas_dialogo_limpio_agrupadas/<macroproceso>`
   (y búsqueda cruzada en `Entrevistas_dialogo_limpio/` completo) + documentación
   de Lark relevante en `Insumos/Documentación/<país>/<área>/` + buenas
   prácticas de fuentes profesionales/académicas (WebSearch, filtrando sitios
   no verificados) + `Estructura_Patron_Cargos_Rower_V4.xlsx` (hoja «Detalle
   Personal», columna «Cargo Patrón Propuesto») para la denominación de cargos.
3. Salida: un objeto JS que se funde a mano en `manual-contenido.js` bajo
   `window.MANUAL_CONTENIDO["<prefijo>"]` — ver esquema en la sección 4.
4. Piloto recomendado antes de correr el lote completo de un macroproceso:
   1 proceso primero, revisar la forma, luego el resto.

## 1. Rol y contexto (igual que el original)

Consultor senior de procesos del Proyecto Rower para Grupo Kenex. El **mapa
v18 es un input estructural firme**: no se cuestiona el listado de N1: si hay
una inconsistencia menor, se reporta aparte, nunca dentro del contenido.

## 2. Niveles (igual, sin el N2)

- N0 — Macroproceso.
- N1 — Procesos del mapa.
- N2 — **No aplica en Fase 2** (decisión del equipo, sep-2026: no se baja a
  procedimientos). Las «actividades» de la sección `flujo` de cada N1 hacen
  las veces de detalle operativo, pero no son procedimientos formales.

Nunca usar la nomenclatura interna «N0/N1/N2» en el texto visible del
`texto`/`prosa` que lee el lector — sí puede aparecer en claves internas
del JSON.

## 3. Autopista común y tratamiento de madurez — igual que el original

- Un flujo estándar regional; las diferencias país-específicas legítimas van
  al campo `n0.anexos.variaciones_pais`, no como ramas del flujo.
- `madurez` (as-is/híbrido/to-be) ya viene en el mapa por N1 y **no se
  muestra como etiqueta al lector** (regla confirmada del equipo, sep-2026):
  - **as-is**: `proposito.texto` en presente indicativo, sin aclaratoria.
  - **to-be**: agregar `proposito.nota_estado` con una frase corta que
    aclare que es un proceso a implementar.
  - **híbrido**: agregar `proposito.nota_estado` reconociendo la transición
    (ver ejemplo real en 9.3: migración del despacho local al despacho
    centralizado).
- La madurez sigue alimentando `n0.agenda` (por implementar / por formalizar
  / brechas vigentes) — **se consolida solo cuando los N1 del macroproceso
  están completos**, no proceso por proceso.

## 4. Esquema de salida (JSON, no Word)

```js
MANUAL_CONTENIDO["<prefijo>"] = {
  n0: {
    introduccion: { estado, proposito, alcance, audiencia: [cargo, ...] },
    contexto: {
      estado, ubicacion /* prosa 2-3 párrafos, con \n\n entre ellos */,
      duenos: [[nivel, cargo, responsabilidad], ...],
      entidades: [[entidad, pais, rol, particularidad], ...],
      sistemas: [[sistema, uso, procesos], ...],
      interfaces: [[macroproceso, sentido, intercambio], ...]
    },
    gobernanza: {
      estado,
      actores: [[actor, ambito, responsabilidades, decide, escala], ...],
      comites: [[instancia, proposito, cadencia, participantes, decisiones, insumo, salida], ...]
    },
    marco: { estado, principios: [...], politicas: [...], normativo: [...] },
    agenda: { estado, por_implementar:[[proceso,brecha,roadmap]], por_formalizar:[...], brechas:[...] },
    anexos: { estado, glosario:[[termino,definicion]], raci:[...], catalogo_sistemas:[...],
              interfaces_detalle:[...], docs_lark:[...], variaciones_pais:[...] }
  },
  procesos: {
    "<codigo>": {
      proposito: { estado, texto, nota_estado? },
      dueno: { estado, notas? },        // el dueño/participantes ya viven en el mapa v18 (ficha)
      disparador: { estado },           // idem — disparador/cadencia/output ya en el mapa v18
      flujo: {
        estado,
        actividades: [ {id, rol, texto} , ... ],   // 25-45 palabras c/u, en orden, cubren el flujo completo
        diagrama: {
          carriles: [rolLane, ...],                 // orden = de arriba a abajo
          nodos: [ {id, carril, tipo: "inicio|tarea|decision|fin", n, sistemas?: [..]} ],
          aristas: [ {de, a, etq?} ]                 // etq solo en las salidas de una decisión
        }
      },
      riesgos: { estado, filas: [[riesgo, descripcion, probabilidad, impacto, mitigacion], ...] },  // 4-6
      indicadores: { estado, filas: [[indicador, formula, frecuencia, dueno, meta], ...] }          // 2-5
    }
  }
}
```

`estado` por sección: `"borrador"` al terminar este prompt (pendiente de
revisión del equipo) · `"revision"` cuando el equipo la está validando ·
`"validado"` cuando ya se aprobó. Nunca escribir `"pendiente"` ni `"semilla"`
desde este prompt — esos los pone el armazón antes de generar.

## 5. Las 6 convenciones BPMN → traducidas al esquema de `diagrama`

Las mismas 6 convenciones del prompt original, aplicadas al JSON en vez de
al XML:

1. **Un pool por proceso, con carriles por rol** → un `carriles[]` con los
   cargos de la Estructura Patrón V4, en el mismo orden en que aparecen en
   el flujo (no alfabético).
2. **Eventos de inicio y fin explícitos** → nodos `tipo:"inicio"` y
   `tipo:"fin"`. Si el proceso arranca por un mensaje de otro proceso,
   decirlo en el texto del nodo de inicio (el motor no distingue tipos de
   evento de inicio; la palabra basta).
3. **Gateways para todas las decisiones** → nodos `tipo:"decision"` con `n`
   en forma de pregunta; cada arista de salida lleva `etq` con la respuesta.
4. **Handoffs entre carriles visibles** → se logran solas: el motor dibuja
   la arista entre carriles distintos como una línea que cambia de fila.
5. **Nombres de tarea en modo imperativo verbo+objeto** → igual que el
   original ("Validar cantidades", no "Validación de cantidades").
6. **Sistemas como data objects, no como carriles** → campo `sistemas: [...]`
   en el nodo de tarea correspondiente (aparecen como etiqueta bajo la
   caja); nunca crear un carril para un sistema.

**Motor de render:** `informe/fase2/flujo-render.js` — layout propio por
capas (columna = camino más largo desde el inicio, fila = carril), sin
librería externa. Dibuja BPMN con carriles, tareas, decisiones y eventos;
lee directo el `diagrama` de arriba. No genera coordenadas manuales.

## 6. Estructura del contenido de N1 — igual intención, JSON en vez de prosa Word

- `proposito.texto`: 2-3 líneas, igual que x.1 del original.
- `flujo.actividades`: la lista numerada de x.4 del original, con `rol` +
  `texto` de 25-45 palabras, encadenando lógicamente.
- `flujo.diagrama`: reemplaza al `[ Insertar flujograma aquí ]` y al archivo
  `.bpmn` — es el mismo contenido, en el esquema de la sección 5.
- `riesgos.filas`: igual a x.6 (4-6 filas, mismas 5 columnas).
- `indicadores.filas`: igual a x.7 (2-5 filas, mismas 5 columnas).
- **No incluir** `dueno`/`disparador` con datos que ya trae el mapa v18
  (alcance, dueño, participantes, disparador, cadencia, output) — el
  armazón ya los muestra desde la ficha del mapa. Usar `dueno.notas` solo
  para una aclaración puntual (p. ej. limpiar una duplicación evidente del
  campo del mapa, como en 9.3).

## 7. Estructura del contenido de N0 — igual intención que las secciones 1-4 y 6-7 del original

Mapeo directo: introducción → `introduccion` · contexto (2.1-2.5) →
`contexto` · gobernanza (3.1-3.2) → `gobernanza` · marco de referencia
(4.1-4.3) → `marco` · agenda de mejora (6.1-6.3) → `agenda` (**última**, solo
con los 1as N1 completos) · anexos (7.1-7.6) → `anexos` (**último**, RACI y
glosario son consolidados de todo el macroproceso).

## 8. Convenciones de escritura — iguales al original

Cargos siempre en denominación V4 · sin nombres propios · presente
indicativo, tercera persona · tono profesional sin adjetivos vacíos ·
honestidad sin juicio de valor sobre personas · nomenclatura N0/N1/N2 fuera
del texto visible.

## 9. Salida esperada

- El objeto JS de la sección 4, para fundir a mano en `manual-contenido.js`
  bajo la clave del macroproceso.
- Un mensaje corto de cierre: qué se generó, qué insumo faltó o fue débil,
  qué inconsistencia menor del mapa se detectó (si alguna) — nunca dentro
  del contenido.
