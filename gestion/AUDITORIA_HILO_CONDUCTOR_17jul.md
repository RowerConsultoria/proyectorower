# Auditoría del hilo conductor — Informe Diagnóstico Fase 1

**Fecha:** 17-jul-2026 · **Objeto:** `informe/fase1/informe-diagnostico-fase1.html` (2.336 líneas) · **Ocasión:** Junta Directiva 24-jul
**Método:** 13 lectores expertos por sección + 3 lentes globales (arco narrativo · procesos/RRHH · tecnología/IA) + verificación adversarial independiente de cada recomendación alta/media (cada una intentó refutarse leyendo el texto real) + crítico de completitud final (§9-§10). Estados: ✅ CONFIRMADA · ✳️ MATIZADA (válida con ajuste) · ❌ REFUTADA · ◻️ sin verificación individual (pero con convergencia de 2+ analistas independientes donde se indica).

> ⚠️ **Antes de ejecutar cualquier renumeración, leer §10 (protocolo de ejecución):** aplicar las recomendaciones en orden arbitrario siembra fósiles nuevos — varias redactan texto con la numeración vieja que otras eliminan.

---

## 0. Veredicto global

**El orden macro de secciones (2→13) es CORRECTO y no debe tocarse.** El hilo declarado — *criterio personal sin procedimiento* (s3–s6) → *dato sin certificar* (s7) → *el dato antes que el agente* (s11–s12) — existe de verdad en el contenido, con dependencias textuales explícitas entre eslabones. El informe ES un argumento, no un archivador.

Lo que la acreción dañó no es la secuencia sino **cuatro cosas concretas**:

1. **Las junturas.** El hilo nunca se enuncia en las costuras donde el lector cambia de sección o de Parte. Los divisores "Parte I/II/III" existen **solo como comentarios HTML invisibles** (l.390, 1677, 1750) — la Junta jamás los verá.
2. **El orden interno de 4 secciones** (2.3, 3.x, 4.x, 11.x) y contenido alojado en sección equivocada (4.7).
3. **Fósiles de una numeración anterior:** un índice duplicado visible con numeración vieja (l.362-388), "secciones 3–14" en s1 (l.393), y seis citas que llaman "7.9" al Riesgo 3 (que es 7.7).
4. **Los dos extremos del arco están pendientes** (s1 y s13) y la bisagra (s9) argumenta solo la mitad de la tesis. El informe hoy tiene un desarrollo sólido **sin apertura ni desenlace**.

---

## 1. PLAN DE EJECUCIÓN PRIORIZADO (antes del 24-jul)

En orden de rendimiento/costo. Los ítems 1–3 son de **riesgo casi nulo y alto impacto**; hacerlos primero.

| # | Intervención | Esfuerzo | Riesgo |
|---|---|---|---|
| 1 | **Higiene de fósiles**: borrar índice duplicado (l.362-388, incluido su `</div>` huérfano l.388); "3–14"→"3–13" (l.393); las 6 citas fósiles de s7 (detalle en §5.1); "ver 11.4"→"11.6" (l.1753) | 1 sesión | Nulo |
| 2 | **s9 (bisagra)**: añadir la segunda tesis ("dato antes que agente", factor 6 → Parte III) a la intro; añadir filas del Riesgo 3 (7.7) y Riesgo 4 (7.8); corregir cita "7.1, 7.2"→"7.5" (fila 10) y "(8.1)"→"(8.2)" (fila resistencia); estructura interna 9.1–9.4 (§7.2) | Media jornada | Bajo |
| 3 | **Tres divisores de Parte visibles** + puentes de sección (3→4, 4→5, 5→6, 7→8, cierre 6→7) — textos propuestos en §6 | Media jornada | Nulo |
| 4 | **s13**: redactar con la estructura 13.0–13.6 (§7.3) — ~80% es reordenar insumos existentes de 7.9/11.4/11.5/12.2-C5/12.5 | 1 jornada | Bajo |
| 5 | **Reorden interno de 2.3** (cumplir el orden que su propia intro anuncia) | 1 h | Nulo |
| 6 | **Inconsistencias contables/nominales** (§5.2): doce/trece brechas, media docena/ocho, Cubi/Qubit, 40/41, "Kennex" en el diagrama, Andrés vicio/buena práctica, Deltadir, composiciones de Junta | 1 sesión | Nulo |
| 7 | **Reorden s4** (4.6 tras 4.2) + renumeración y ~12 referencias (lista exacta en §3.3) | Media jornada | Medio |
| 8 | **4.7 ↔ s6**: aplicar el "plan B" ya (anclas F1-F8 + desduplicación); el traslado completo, valorarlo para la versión de Fase 2 (§3.4) | Plan B: 2 h | Bajo |
| 9 | **Reorden s3** (3.1a→3.3→3.1b→3.2→3.4) — solo si queda tiempo tras 1–8 | Media jornada | Medio |
| 10 | **s1 al final**, con el mandato corregido (§7.1) — se redacta último, pero su mandato se corrige YA | 1 jornada | — |
| 11 | **Portada** (N4): "Comité Directivo"→destinatario correcto, fechas 10/18-jul→corte real + 24-jul — decisión de Clemencia ya abierta en ESTADO.md, ahora confirmada como inconsistencia visible | 1 h | Nulo |
| 12 | **Versión cliente**: además de amputar Anexo B y s17, purgar sus entradas del sidenav (l.286-307) y el bloque "Uso interno" del TOC (l.357-360) (N6); congelar/verificar permisos del enlace de Drive en modo `edit` de l.1746 (N7) | 1 h | Nulo |

> Regla operativa del equipo: ediciones por `str.replace` con anclas largas y únicas; **nunca** anclar con tags genéricos (lección del incidente srcdoc); validar HTMLParser (stack `[]`) y verificar por DOM.

---

## 2. LO QUE SE RATIFICA (no tocar)

Verificado con la misma exigencia que lo demás — estas estructuras **están bien**:

- **Orden macro 2→13 y tripartición I/II/III.** s5 tras s4 (consume 4.4/4.6); s6 pegada a s7 (la costura procesos→capa sombra→dato es LA bisagra del hilo); s4 antes de s6 (4.2/4.3 son el reparto de actores que los flujos necesitan).
- **s5 interna (5.1→5.4):** la mejor concatenada del informe (estado→modelo requerido→brechas→decisiones).
- **s6 interna (6.1→6.5)** y **s7 interna (7.1→7.11)** — incluido el orden de los riesgos 7.5→7.8 (asciende del síntoma técnico a la raíz de gobierno; las dependencias están encadenadas textualmente). Es además la imagen especular del orden de construcción de 12.2 (raíz→síntoma) — inversión correcta que conviene **explicitar** con una frase en 12.2 (desactiva la pregunta previsible de la Junta).
- **7.10 se queda en s7.** ❌ REFUTADA la idea de moverlo/fusionarlo con 11.5: la cadena 7.10 (principio) → 11.2 (validación) → 11.5 (estrategia) es canónica y 11.1/11.2/11.5 ya lo citan. **Ojo:** tampoco comprimir su h4 de Lark — la verificación adversarial demostró que la evidencia volumétrica ("más de mil tiendas… no corre en una computadora normal") vive ÚNICAMENTE ahí (l.1588); 11.1 tiene los límites oficiales pero no el testimonio. A lo sumo, añadir remisión "los techos oficiales se documentan en 11.1".
- **7.9 (quick wins) se queda en s7** — es diagnóstico con evidencia dura y el reverso constructivo de los riesgos. El defecto es el inverso: **s13 no lo consumió** (ver §7.3).
- **s8 pertenece a la Parte I.** 8.1–8.2 son diagnóstico puro del factor 5 del marco 2.2; 8.3–8.4 describen formación **en curso** (estado, no plan) — el problema es de encuadre de títulos, no de ubicación. Solo 8.5 necesita compresión (§3.5).
- **s13 en posición 13** (11 qué existe → 12 cómo se arquitecta → 13 qué se ejecuta) y **anexos A→B→s17** (criterio por audiencia, permite amputar lo interno para la versión cliente).
- **Componentes 1–8 de 12.2 como taxonomía y numeración.** No reordenar; declarar los **tres carriles** reales (§4.3).

---

## 3. CAMBIOS DE ORDEN Y REUBICACIONES

### 3.1 · s2.3 — cumplir el orden que anuncia su propia intro ✅ (alta)
La intro de 2.3 (l.444) anuncia: entrevistas → gobernanza → requisitos, **cerrando** con la caracterización/coherencia. El orden físico real es: entrevistas → caracterización → gobernanza → requisitos. Que la sección cuyo objeto es el rigor metodológico incumpla su propia estructura anunciada es el tipo de detalle que una Junta detecta. Además el orden anunciado es superior: cierra con las cinco disonancias/alertas que son exactamente los hilos que s3 y s4 recogen.
**Acción:** mover el h4 "Caracterización…" (l.475-478) al final de 2.3. ✳️ Complemento (media): mover el h4 "Cobertura del levantamiento" (l.434-441) de 2.2 al inicio de 2.3 y renombrar 2.2 a "Marco del diagnóstico: seis aspectos centrales". Tras el reorden, añadir frase-puente final hacia s3 (§6).

### 3.2 · s3 — describir antes de evaluar ✳️ (media)
Problema verificado: la tabla evaluativa de 3.1 (l.560-567) **juzga entidades que solo se definen después** en 3.3 (Basaida aparece en l.562 y se define en l.587).
**Orden propuesto:** 3.1a (Identidad corporativa) → 3.3 (entidades + presencia por país + flujo troncal) → 3.1b (mapa de relaciones + lectura transversal) → 3.2 (gobierno) → 3.4 (estrategia). Renumerado: 3.1 Identidad · 3.2 Entidades y países · 3.3 Relaciones · 3.4 Gobierno · 3.5 Estrategia.
**Matices obligatorios:** (a) decidir el destino de la tabla "Implicaciones y puntos por verificar" (l.614-625) — sus filas de gobierno viajan al nuevo apartado de gobierno (ver §5.2-e); (b) reescribir el párrafo-guía l.545 que anuncia la secuencia vieja; (c) renumeración + referencias (l.420 "3.3 y 4.3", l.874, l.936…). *Prioridad menor que s4: hacerlo solo si el calendario lo permite.*

### 3.3 · s4 — el arco de personas: validar antes de analizar riesgo ✳️ (alta)
4.6 (validación contra nómina) **resuelve identidades que 4.2 deja pendientes y que 4.4 usa mal**: "Josep, ~40 años en la empresa" (l.787) es en realidad Juseth González con 24–26 años oficiales (l.861) — y 4.4 es el análisis de riesgo que la Junta leerá.
**Orden propuesto:** 4.1 → 4.2 → 4.6 → 4.3 → 4.4 → 4.5, **con renumeración completa** (4.6→4.3, 4.3→4.4, 4.4→4.5, 4.5→4.6) — numeración fuera de secuencia es inaceptable cliente-facing.
**Referencias a actualizar (lista verificada):** l.427-429 (marco 2.2), l.420 ("3.3 y 4.3"), l.635, l.647 ("ver 4.3"), l.781, l.822, l.825, l.831, l.880 ("multi-grupo (4.3)"), l.946, l.990, l.1399/1410/1421/1447/1617 (s7), l.1657-1669 (s9), l.1685/1729 (s10), Anexo B l.2236-2266. **Control final: grep global de '4.1'–'4.7' completo** (no solo 4.4/4.6/4.7).
✅ Complemento (media): armonizar 4.2/4.4 con lo que 4.6 ya validó — Edumar Escalona (l.692), Alejandra Mejías en Colón (l.684), Juseth (l.701, 787), José Rafael Herrera + Héctor Zapata + Miguel Yépez (l.704). ⚠️ Incluye reconciliar **s17 l.2301**, que tiene una resolución contradictoria de "Edumar".

### 3.4 · 4.7 ↔ s6 — la decisión más importante de reubicación ✳️ (alta)
4.7 (flujos F1-F8 + vicios transversales) duplica narrativamente 6.1-6.3 (dos veces el cuello Vera/Roberto, dos veces Syscore, dos veces la recepción "a dedo") y **s6 no cita ni una vez los códigos F1-F8** (cero ocurrencias en l.1006-1375) mientras s7 sí los usa. Tres analistas independientes convergieron en trasladar 4.7 a abrir s6; la verificación adversarial **matizó**: 4.7 es también hallazgo estructural (l.428 asigna 4.1–4.7 a Estructura; se construye sobre 4.3; sus vicios 3 y 6 son estructurales).
**Recomendación reconciliada:**
- **Ahora (plan B, riesgo bajo):** anclar cada h4 de 6.1-6.3 a su F-código ("Compras Casio — flujo F1, ver 4.7"), sustituir cadenas duplicadas por remisión conservando solo la profundización nueva, y añadir en la intro de s6 (l.1009) el deslinde: 4.7 = flujos inter-grupo y vicios; s6 = fotografía por área. *(Ojo: no repetir la frase "flujo, roles, entradas/salidas" que l.1007 ya trae.)*
- **Fase 2 (opcional, mayor dividendo):** traslado completo de 4.7 como 6.1 nuevo, renumerando 6.1-6.5→6.2-6.6 y propagando referencias.
- ◻️ **Clave común de los 4 artefactos de procesos** (convergencia de 2 lentes): indexar F1-F8 ↔ mapa 6.5 (N0/N1) ↔ inventario 11.4. Hoy la Fase 2 arranca con **tres inventarios no conciliados del mismo universo**. Una columna o superíndice basta.

### 3.5 · 8.5 — comprimir a su valor diagnóstico ✳️ (media)
8.5 es el único contenido genuinamente prescriptivo de la Parte I y describe por tercera vez la Política y la Estructura de IA (viven en 12-C0/Componente 1). **Conservar** el hallazgo ("la formación sola no ordena; el Comité del 01-jul ya acordó el rol") + remisiones. **Matiz verificado:** la remisión organizativa debe apuntar a **10.2 (l.1740, Champion de IA y célula BI/Data en las restricciones inamovibles)**, no al placeholder de 10.1 — un corchete de borrador no puede ser destino de referencia.

### 3.6 · s11 — cerrar con la estrategia ◻️ (media, convergencia lente+lector)
Hoy 11.5 construye el impulso hacia s12 ("la sección 12 y la 13 desarrollan este nacimiento") y **11.6 lo desinfla** interponiendo un checklist de pendientes.
**Orden propuesto:** 11.1→11.2→11.3→11.6 (pendientes, renumerado 11.4)→11.4 (inventario, →11.5)→11.5 (estrategia, →11.6). Propagar ~8 referencias en s12 (l.1850, 1891, 1899, 1904, 1916-1917, 1935, 1938, 1952); las dos remisiones hoy fósiles de s11 (l.1753, l.1789) **vuelven a ser correctas solas**.

### 3.7 · s10 — principios en secuencia de diseño ✅ (media, CONFIRMADA)
Reordenar los 7 principios de 10.1: **1→5→2→4→3→7→6** (nuevo orden: 1 especialización · 2 homogeneidad operativa · 3 unidad de mando · 4 autoridad-responsabilidad · 5 tramo de control · 6 estructura plana/escalabilidad · 7 flexibilidad híbrida local-global). Verificado: la adyacencia tramo/plana refleja el trade-off real Modelo 1 (CEO con 12-14 reportes) vs Modelo 3 (capa COO), y el principio local-global es el eje que diferencia los tres modelos — cerrar con él como bisagra hacia 10.2. Única referencia numérica externa: l.1664 (s9). **⚠️ Ojo C1 (§10):** las recomendaciones 10-R1 (columna de lectura) y 10-R4 (anclajes de evidencia) citan la numeración VIEJA — redactarlas con la nueva. Propagar también l.428 (celda del factor 3 en 2.2, que enumera los principios en el orden actual).

### 3.8 · s10 — octavo principio: continuidad y redundancia ✅ (media, CONFIRMADA)
Elevar "reducción de dependencias individuales (4.4)" — hoy ítem suelto del placeholder l.1729 — a **octavo principio de diseño**: ninguna función crítica descansa en una sola persona sin respaldo formado ni proceso documentado. Repara una promesa hoy colgante: 4.4 cierra (l.806) afirmando que sus riesgos "alimentan directamente los principios de diseño (sección 10)" y ningún principio actual lo cumple; da sustento declarado al criterio con que 10.2 ya juzga sus modelos ("perpetúa la centralización" / "menor dependencia individual del CEO").

### 3.9 · s10 — desagregar el placeholder de l.1729 ✳️ (media)
Premisas de diseño (dependencias 4.4, estandarización multi-país, frontera grupo/family office) → 10.1; pronunciamientos estructurales (posición del perfil de la célula BI, soporte compartido) → 10.2. **Matiz verificado:** el placeholder dice "instancia de gobierno de IA", que NO equivale al Champion de Adopción de IA — la capa C0 de s12 (l.1868) la trata como órgano de gobierno de IA-y-dato más amplio; no dar por resuelta la instancia con la mención del Champion en l.1740.

---

## 4. CONTENIDO FALTANTE O MAL CONECTADO (confirmado)

### 4.1 · El eslabón 5→10 está ROTO — el hallazgo más grave del frente de talento ✅ (alta)
s10 se titula "propuesta de estructura organizativa **y del talento**", y verificado el rango completo (l.1679-1748): **no hay una sola respuesta estructural a las cuatro decisiones de 5.4**. La capa corporativa de RRHH — que s5 declara "condición de viabilidad de la transformación completa" — no aparece en ninguno de los tres modelos, mientras el Champion de IA y la célula BI sí figuran como restricciones inamovibles. La Junta leerá en s5 que sin esa función el proyecto se revierte, y en s10 una propuesta que no la contiene.
**Acción:** añadir bloque/filas en 10.2 respondiendo las 4 decisiones de 5.4 (mínimo: capa corporativa de RRHH en los tres modelos); corregir la línea de dependencias l.1680 ("secciones 3–6" → "3–7 y síntesis de la 9"). ✅ Aplicar además los principios de 10.1 a los tres modelos de 10.2 (columna "lectura según principios") — hoy 10.1 y 10.2 no se citan.

### 4.2 · Formación (8.3-8.4) sin conexión con competencias (5.3-5.4) ◻️ (alta, verificado por el lente con líneas)
8.3-8.4 **no citan ni una vez la sección 5** (verificado l.1637-1643). s5 diagnostica que no hay capacidad instalada de formación; s8 describe dos ejes de formación en curso; el informe nunca dice que los ejes son vehículos del proyecto sin dueño organizacional permanente, ni ancla la certificación Maia/Claude al Diccionario de Competencias con IA (5.2/5.4) que las haría evaluables por perfil.
También: explicitar en 8.3 el criterio de exclusión temporal de almacén/tiendas/empaque del despliegue de Maia, encuadrado como habilitación progresiva — sin criterio explícito puede leerse como estratificación del personal (población que 5.3 identifica como foco de gestión del cambio).

### 4.3 · 12.2 — declarar los tres carriles ◻️ (media, contradicción textual verificada)
El texto se contradice con su propia linealidad: el Componente 3 decide build-vs-buy "con el equipo interno (Componente 7) una vez constituido" (dependencia hacia adelante, l.1886) y el Componente 8 se titula "medir desde el día uno" siendo el último. **No reordenar**; sustituir "orden aproximado de precedencia" (l.1871) por: carril institucional (1 y 7, día uno en paralelo) · carril de construcción (2→3→4→5) · transversales continuos (6 y 8).
Cerrar además el circuito **12.3 ↔ 10.2**: el equipo interno que 12.3 eleva como "la decisión" debe tener ancla visible en el organigrama propuesto (remisiones recíprocas).

### 4.4 · s9 — la síntesis no cumple sus promesas ✅ (alta)
- 7.7 declara textualmente elevarse "a las secciones 9 y 10" (l.1533) y **s9 no lo contiene**: añadir fila Alta consolidando el Riesgo 3 (data crítica en manos sin vínculo formal + brecha de contratación 5.3). ✅
- Añadir fila con el núcleo del Riesgo 4 (7.8): migración Odoo 17→19 sin planificar, facturación electrónica como punto único de falla. ✅
- Añadir la fila de las dos ausencias que la PMO ya elevó (4.5): gestión presupuestaria inexistente, procurement. ✅
- Elevar el Riesgo 2 (7.6) a visibilidad propia (separado de "uso de IA disperso"). ✅
- Completar la **segunda tesis** en la intro: los hallazgos del factor 6 fundamentan "dato antes que agente" → Parte III. ✅
- Nota de escala: por qué las 8 brechas "Críticas" de 5.3 aparecen como "Media" a escala de grupo — sin explicación se lee como contradicción. ✳️ (matiz: la consolidación es parcial — continuidad del conocimiento va en Alta vía 4.4 y contratación escala por 7.7; explicar el mapeo, no simplificarlo)

---

## 5. INCONSISTENCIAS QUE LA JUNTA PUEDE DETECTAR

### 5.1 · Referencias fósiles de la numeración anterior (✅ alta — corrección trivial)
| Línea | Dice | Debe decir |
|---|---|---|
| 362-388 | índice duplicado completo (muestra "15. Anexo A", Parte II como "11") | **eliminar** (incl. `</div>` huérfano l.388) |
| 393 | "consolidadas las secciones 3–14" | "3–13" |
| 1529 | "(7.3, 7.7)" (autocita dentro de 7.7) | "(7.3)" |
| 1547 | "Sumado a 7.9" | "Sumado a 7.7" |
| 1573 | "hallazgos sobre partners (7.9, 7.10)" | "(7.7, 7.8)" |
| 1592 | "función transversal de 7.7" | "de 7.6" *(el "(7.7)" de freelance en la misma frase SÍ es correcto)* |
| 1753 | "ver 11.4" (ficha s11) | "ver 11.6" |
| 1875 | "Riesgo 3 (7.9)" (12.2-C1) | "(7.7)" |
| 1912 | "Riesgo 3 (7.9)" (12.3) | "(7.7)" |
| 1660 (s9 fila 10) | "(7.1, 7.2)" | "(7.5)" |
| 1673 (s9) | "(8.1)" resistencia al cambio | "(8.2)" |
| 1411 (7.1, fila Maia) | "documentado en 8.2" | "en 8.3" *(N1 — hallazgo del crítico; ídem Anexo B l.2276)* |
**Control final:** grep por "7.9", "7.7", "3–14", "11.4", "8.2" en s7-s13. Nota del crítico: la cita "(7.9)" de l.1934 (caso Jesmir) SÍ es correcta — no tocarla.

### 5.2 · Contables y nominales (✅/✳️)
a) **5.4 l.995**: "De las doce brechas, ocho son críticas" — la tabla de 5.3 tiene **trece** filas. ✅
b) **6.4 l.1057**: "media docena" — la tabla trae **ocho** prácticas (y 3 provienen de otros frentes: declararlo). ✅/◻️
c) **Universidad Cubi (6.3, l.1054) vs Universidad Qubit (5.3 l.985, 5.4, 7.11, 12-C6)**: ¿mismo activo? Unificar o desambiguar. ✅
d) **6.5**: fila duplicada "Cotización, presupuesto y negociación" (l.1173-1174) → recontar el emblema **22/104/260** tras depurar. ✅ (alta)
e) **Tres composiciones no coincidentes de Junta/Comité Directivo** (3.2 l.574 · 3.3 l.618 · 4.1 l.639 — y una cuarta codificada en 6.5 l.1083: "5 hermanos Roizental"). El destinatario del informe ES el Comité Directivo. Consolidar la anatomía en 3.2 (la fila l.618 viaja allí) y armonizar 4.1 y 6.5. ✳️ (alta)
f) **Deltadir**: "100% del grupo" (l.589) vs "las fuentes difieren… socio local" (l.563). Elegir la formulación prudente en ambos. ✳️ (alta) — La reconciliación de plantilla Rower es "~230 reportadas por RRHH a julio (l.959) · ~200 posiciones activas en nómina 30-jun (l.852) · ~90 mapeadas en organigrama (l.588)" — no "230 en nómina".
g) **Protocolo familiar** narrado en 3.2 (l.574) y 3.3 (l.619): fusionar en un solo lugar. ✅
h) **Costa Rica** narrada 4 veces (l.564, 591, 601, 628-629): dejar hechos en una tabla y remisión en el resto. ✅
i) **3.4 l.628**: "existe un plan estratégico formal" — añadir salvedad: se sustenta en testimonios; el documento figura Pendiente. ✅
j) **2.1 l.418**: "acceso directo a las plataformas" contradice 2.3 (C#2 Pendiente) y s11 (auditoría documental). Precisar — y usar la grafía **C#2** del informe, no "C.2"; sin implicar que la de Lark fue con acceso (l.1753 declara documental toda la primera entrega). ✳️ (alta)
k) **2.3 vs Anexo A**: dos registros de entrevistas con numeración y contenidos divergentes (el Anexo mezcla gobernanza, tiene a Katherine Jiménez pendiente y estados internos "requiere disambiguación"). Definir 2.3 = registro formal para la Junta; Anexo A = cotejarlo o reconvertirlo. ✅
l) **Contradicción Andrés (F4 vs 6.1/6.4)**: F4 llama a su autorización "vicio… imposible de delegar o auditar" (l.903); 6.1 (l.1026) y 6.4 (l.1062) la presentan como "cuello de botella deliberado que ha demostrado prevenir errores". El aludido es un miembro de la familia **que estará en la sala**. Reconciliar en ambos lugares con el marco que 12.6 ya usa: el punto de control es el activo; el criterio no escrito es lo que hay que documentar. ✅ (alta)
m) **"Grupo Kennex" (doble n) ×3 en el diagrama del modal** (l.1959-2185) + su pie "Documento de uso interno" si va a la Junta + "40 nombres" (l.1862) vs la cifra canónica "41". ◻️
n) **Colisión de nomenclatura "C"**: capas C0-C6 (12.1) vs Componentes 1-8 (12.2) vs requisitos C#1-C#8 (2.3) — "C2" significa capa de datos en 12.1 y requisito documental bloqueante en 11.6, a pocas líneas. Añadir llave de nomenclatura de una línea o renombrar capas a "Capa 0–6". ◻️ (media)
o) **Footer** "V1 · 02-jul" contradice los insumos del 14-jul ya incorporados. ◻️

### 5.3 · Escala Media en s9 para RRHH — ver §4.4 (nota de escala).

---

## 6. COSTURAS Y TRANSICIONES (todas aditivas, riesgo nulo)

1. **Divisores de Parte visibles** (hoy solo comentarios HTML): encabezado "Parte II — Propuesta organizativa" / "Parte III — Componente técnico y de IA" + párrafo puente de 3-5 líneas. El puente s9→II entrega el testigo ("los hallazgos de gobierno y estructura exigen decidir primero la estructura"); el puente s10→III enuncia la segunda tesis ("decidida la estructura, el sustrato que la hace operable es técnico: el dato antes que el agente") y da a s11 el párrafo marco que hoy no tiene. Replicar el recurso de las cajas de transición que s7 ya usa (l.1432, 1465, 1554).
2. **Cierre s2→s3** (tras el reorden de 2.3): "Con este aparato de fuentes y sus alertas identificadas, las secciones 3 a 8 presentan la organización tal como es hoy…" — colocar tras las disonancias SOLO si se aplicó §3.1.
3. **Cierre s3→s4**: los fundamentos descritos (relaciones sobre confianza, decisiones sin registro, estrategia sin despliegue) anticipan la pregunta estructural. ✅
4. **Cierre s4→s5**: del vicio 6 ("roles invisibles") y la validación de nómina → la función que debería gobernar ese activo humano. ✳️ *Sin superlativos no sostenidos ("la menos equipada"); usar los términos del propio informe, que presenta a las gerentes como aliadas (l.963).*
5. **Cierre s5→s6**: de la advertencia del trabajo congelado → el patrón "criterio y memoria de personas" con que abre s6.
6. **Cierre s6→s7**: reubicar el h4 "mapa vivo para la Fase 2" (l.1373) antes de la "Síntesis del mapa", para que la sección cierre en síntesis + puente al dato. ✅
7. **Cierre 7.11→s8**: frase que devuelva al lector al orden físico: "la 7 estableció la base técnica (el dato); la 8, la base humana — segundo prerrequisito de la misma arquitectura". Hoy 7.11 salta a s12-s13 y s8 queda como interrupción. ✅
8. **Cierre s8→s9**: "con esta sección se completa el recorrido por los seis aspectos del marco 2.2; la 9 consolida". ✅
9. **Frase en 12.2**: explicitar la inversión especular diagnóstico (síntoma→raíz) vs construcción (raíz→síntoma). ◻️

---

## 7. MANDATOS PARA LAS TRES PIEZAS PENDIENTES

### 7.1 · s1 — Resumen ejecutivo (corregir el mandato YA; redactar al final)
El mandato actual (l.393) es genérico y tiene el fósil "3–14". Debe exigir:
1. Enunciar el **hilo completo en tres movimientos** (criterio personal sin procedimiento → dato sin certificar → estructura primero y dato antes que agente) como lógica de las tres Partes.
2. **Tabla única de decisiones solicitadas a la Junta**, hoy dispersa en: 5.4 (4 decisiones RRHH), 7.3 (3 decisiones), tabla de s9, decisiones abiertas de 10.2, 12.2-C1/12.3 (gobierno de IA + equipo interno).
3. **Deslinde con 2.0** — el párrafo de "tres propósitos" de l.399 funciona hoy como introducción de facto; al existir s1 debe reducirse a puerta metodológica (dos introducciones consecutivas se pisan).
4. Los cuatro números que la Junta debe retener: ~400 personas (VE/PA/CO) · 12 dependencias críticas · 22/104/260 (recontado tras §5.2-d) · 52 proyectos con 3 PM.

### 7.2 · s9 — estructura interna propuesta
9.1 **Criterios de lectura** (escala de criticidad de grupo vs escalas locales de 4.4/5.3 — mapeo explicado, no simplificado; mapeo a factores 2.2) · 9.2 **Tabla de hallazgos** (bandas Alta→Media-Alta→Media→Oportunidad; dentro de cada banda, filas en el recorrido del informe s3→s8, criterio declarado) · 9.3 **Lectura transversal: los dos hilos** (criterio personal sin procedimiento + dato sin certificar) · 9.4 **Puente**: qué exige esto a la estructura (II) y a la arquitectura (III).
*(Sin añadir 9.1-9.4 al índice: el índice solo lista h2 — es la convención del documento.)*

### 7.3 · s13 — estructura y contenido (≈80% ya existe, disperso)
- **13.0** Marco: el pase de 12.7 traducido a calendario de dos carriles (obra de fondo + quick wins en paralelo — tesis de 7.9).
- **13.1** Criterios de priorización: las 4 señales de 7.9 (volumen que agobia, impacto en ventas/cliente, dueño convencido, ROI demostrable) + prerrequisito arquitectónico (qué Componente de 12.2 y qué fase de 12.5 exige cada caso).
- **13.2** Ola 1 — quick wins en semanas: los tres de 12.2-C5 **hoy ausentes de la tabla** (agente conversacional e-commerce VE, asistente de nómina VE, normalizador de reportería de 41 clientes) — prerrequisito acotado: MCP-Odoo solo lectura (fase 1 de 12.5).
- **13.3** Ola 2 — valor de fondo: agente de compras y rebalanceo (**absorbe los 4 candidatos de la tabla actual**: 1 y 4 convergen en él; 2 = compras Casio; 3 = inventario estancado), conciliación asistida, reportería viva a la Junta — exigen Componente 2 completo + fase 2 de 12.5.
- **13.4** Ola 3 — agentes del sistema propio a medida que nacen sus módulos (servicio técnico, facturas de importación, difusión a tiendas — trazados desde 11.4b vía 11.5 paso 2).
- **13.5** Matriz de dependencias: casos × Componentes 1-8 × fases de 12.5, hitos condicionados a 11.6/C#2.
- **13.6** Responsables, métricas por caso (Componente 8) y **decisiones solicitadas a la Junta + puente a Fase 2** — el cierre real del cuerpo, hoy inexistente.
Regla de deslinde: la 12 dice QUÉ son los agentes; la 13 dice CUÁNDO, QUIÉN, con qué prerrequisitos y con qué métrica. La columna "Origen" cita **secciones del informe**, no entrevistas.

---

## 9. HALLAZGOS DEL CRÍTICO DE COMPLETITUD (no detectados por los 16 analistas)

**Alta prioridad (antes del 24-jul):**
- **N1 · Referencia errónea 7.1→8.2.** l.1411 (fila Maia): "su despliegue queda documentado en 8.2" — está en **8.3**; 8.2 es disposición al cambio. Mismo fósil en Anexo B l.2276. *(Ya añadido a la tabla §5.1.)*
- **N2 · "Edumar" con dos resoluciones incompatibles.** 4.6 l.843: Edumar Escalona, Gerente de Ventas Mayor Internacional, Panamá ("superior local de Patrick") vs s17 l.2301: "miembro del equipo digital Venezuela". Reconciliar s17 contra 4.6 (la evidencia de nómina respalda a Escalona) — nadie había cotejado s17 contra el cuerpo.
- **N3 · Cifras del programa Maia sin conciliar: 30/60/70/150.** 2.3 l.478 ("cerca de 70"), 7.1 l.1411 y 8.3 l.1639 ("~30 líderes" piloto, "~150 licencias" masivo), Anexo B l.2254 (tarea abierta "~30 vs 60"). Añadir una frase que las reconcilie (piloto vs alcance acordado vs despliegue) o corregir a la cifra oficial.
- **N4 · Portada desalineada con la entrega real.** l.318-324: "V1 · corte 10-jul", "entrega 18-jul", destinatario "Comité Directivo" — mientras el cuerpo se dirige a la "Junta Directiva" (l.399, 1653). Especialmente delicado porque el propio informe documenta que Junta y Comité tienen composiciones no coincidentes (§5.2-e). *(Decisión de Clemencia ya abierta; ahora es inconsistencia verificada.)*

**Durante la ejecución:**
- **N5 ·** La lista de propagación de s4 omitía l.420, l.647 y l.880 (referencias a la antigua 4.3) — ya integradas en §3.3. La afirmación de l.420 ("alertas abiertas… secciones 3.3 y 4.3") es dudosa en sí: el registro de alertas vive en s17/4.6, no en 4.3.
- **N6 ·** **Versión cliente — navegación:** purgar del sidenav (l.286-307) y del TOC (l.357-360) las entradas de Anexo B y s17 y el rótulo "Uso interno" — el plan de build solo contemplaba amputar el contenido.
- **N7 ·** **Enlace de Drive en modo edición** (l.1746, `…/edit?usp=drivesdk`) dentro de un documento "CONFIDENCIAL": cambiar a vista, verificar permisos para la Junta, y congelar versión del deck al 24-jul.

**Pulido final:** N8 Catherine (4.6 l.837, nómina) vs Katherine (Anexo A l.2222) Jiménez — resolver contra nómina al cerrar la entrevista pendiente · N9 s17 l.2302 "Reabierta" vs Anexo B l.2237 "resuelto" (base de Ricardo) · N10 s12 (l.1848) no acredita a s8 en su línea de base pese a que 8.5 le remite · N11 el TOC (l.344) añade "por áreas y niveles" que el h2 real de s10 no lleva · N12 tercera colisión de nomenclatura "F" (flujos F1-F8 vs código EDT "F1.3.2" l.518 vs "Fase 1/2/3").

**Validaciones del crítico que blindan la auditoría:** confirmó por conteo directo las 13 filas de 5.3, las 3 apariciones de "Kennex", la fila duplicada de 6.5 (l.1173-1174; las de l.1175-1176 son legítimas), la integridad de todas las anclas `#s1`-`#s17`, y que no hay más fósiles "sección 14" que los ya detectados (l.393, 2251, 2275).

---

## 10. PROTOCOLO DE EJECUCIÓN — conflictos entre recomendaciones (C1-C6)

Aplicar las recomendaciones en orden arbitrario **siembra fósiles nuevos**. Reglas:

1. **Primero renumerar, luego redactar (C1, C2).** Construir UNA tabla de equivalencias única (s4: 4.6→4.3, 4.3→4.4, 4.4→4.5, 4.5→4.6 · s10: viejo 5→2, 2→3, 4→4, 3→5, 7→6, 6→7 · s11: 11.6→11.4, 11.4→11.5, 11.5→11.6 · si se trasladara 4.7: 6.x→6.x+1) y aplicar TODAS las renumeraciones antes de escribir texto nuevo. Toda frase nueva de las recomendaciones (columna de 10.2, anclajes de 10.1, puentes, filas de s9) se redacta con la numeración NUEVA — tal como fueron formuladas usan la vieja.
2. **C3 ·** Las dos listas de propagación del reorden de s11 difieren: fundirlas en una sola (unión: l.1850, 1891, 1899, 1904, 1916-1917, 1935, 1938, 1952) antes de ejecutar. Ignorar la mención a "índice l.185" (es CSS; el índice solo lista h2).
3. **C4 ·** La intro de 2.3 (l.444) la reescriben dos recomendaciones: redactarla UNA sola vez con el orden combinado: cobertura → registro de entrevistas → gobernanza → requisitos → caracterización/coherencia.
4. **C5 ·** Línea de dependencias de s10 (l.1680), formulación canónica única: **"Depende de las secciones 3–7 y de la síntesis de la sección 9"** (citando expresamente la 5 en el cuerpo si se aplica §4.1).
5. **C6 ·** h4 de Lark en 7.10: decisión ya tomada en este documento (§2) — **NO comprimir** (la evidencia volumétrica es única en l.1588); solo añadir remisión a 11.1. Desestimar la recomendación contraria del lente técnico.
6. **s9-R8 (orden de filas) ✳️:** el criterio "seguir el recorrido del informe s3→s8" es correcto y seguro (nada externo depende de posiciones), pero la secuencia concreta propuesta por el analista se contradecía a sí misma — al aplicar, ordenar estrictamente por subsección de origen (3.1→3.2→3.3→3.4→4.x→5.x→6.x→7.x→8.x) y declarar el criterio en la intro.

---

## 11. Registro de verificación

- **65 análisis ejecutados, 65 completados** (13 secciones + 3 lentes + 48 verificaciones adversariales + crítico de completitud).
- Recomendaciones alta/media de sección: **28 ✅ CONFIRMADAS · 19 ✳️ MATIZADAS** (matices incorporados) · **1 ❌ REFUTADA** (mover/comprimir 7.10 — ver §2 y C6).
- Recomendaciones de lentes globales marcadas ◻️: verificadas por los propios lentes contra el texto con líneas citadas; varias convergen con hallazgos de sección independientes (señal fuerte). El crítico validó por muestreo las afirmaciones clave de ambos niveles (§9).
- Tensiones entre analistas: todas reconciliadas — (1) traslado de 4.7 → plan B ahora, traslado completo en Fase 2; (2) h4 de Lark en 7.10 → no comprimir (C6); (3) numeraciones → protocolo §10.
