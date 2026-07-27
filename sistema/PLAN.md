# EL SISTEMA — Plan de construcción del prototipo visual

**Proyecto Rower · UCAB Consultores para Grupo Kenex · Fase 2**
Corte: 26-jul-2026 · ⚠️ Material interno del equipo consultor.

---

## Qué se está construyendo, y qué no

**Sí:** un **prototipo visual interactivo** de la plataforma central de mayoreo y distribución
que Kenex debería tener, con la IA ejecutando acciones dentro de los procesos. Se navega, se
hace clic, las acciones producen efectos y el estado cambia delante de quien mira.

**No:** base de datos, integraciones reales, autenticación ni backend. Los datos son **semilla**
y el estado vive en memoria del navegador. Los conectores con los Odoo de los países se
**representan** (estado, última sincronización, latencia) — no se construyen.

Es una **propuesta**, no un piloto. Se juzga por si un miembro de la Junta reconoce su negocio
y entiende en nueve minutos qué cambia.

---

## El alcance, en cuatro reglas

1. **El sistema central es mayoreo y distribución.** No tiene venta al detal de tienda: eso lo
   resuelven los Odoo de cada país. Aquí se compra al fabricante, se recibe, se reparte a los
   frentes, se despacha y se factura.
2. **Todos los frentes son clientes mayores del central**, incluidos los países propios, que
   **pagan a la central** como cualquier otro cliente. Lo que cambia entre frentes no es el
   rango: es cómo se conectan.
3. **Dos formas de conexión, y ninguna es de segunda:**
   - **Frentes propios (con Odoo):** conexión en tiempo real. Se leen ventas y movimientos; se
     escriben las transferencias de mercancía a sus almacenes cuando la central les asigna.
   - **Frentes sin Odoo** —franquicias, socios y clientes directos en otros países—: **portal de
     reporte**, donde cada uno carga sus ventas **con su propio formato de Excel**. El sistema
     los normaliza. Es la respuesta a los múltiples formatos distintos.
4. **El propósito de recolectarlo todo es uno:** construir la demanda real de la región para
   sacar **forecast de compra y de reposición** frente a los proveedores internacionales de
   Casio y de Cubitt.
5. **El catálogo no es fijo: se alimenta.** Hay un módulo de **desarrollo de producto** donde
   nacen los candidatos, se prueban y se decide si entran al catálogo. Solo un producto
   graduado puede comprarse. Es el origen del ciclo, no un apéndice.

**El ciclo completo, que es la columna vertebral de la demo:**

```
   DESARROLLO DE PRODUCTO ──► producto graduado al catálogo
        (candidato · muestra · prueba · decisión)          │
                                                           ▼
   sell-out de TODOS los frentes  ──►  demanda real  ──►  forecast
                  ▲                                          │
                  │                                          ▼
        el frente vende                          COMPRA INTERNACIONAL
        y reporta                                 (Casio · Cubitt)
                  ▲                                          │
                  │                                          ▼
        despacho y factura  ◄──  ASIGNACIÓN Y REPARTO  ◄──  recepción en Colón
             al frente              a los frentes
```

**Capa posterior, fuera de este alcance:** portales dentro de los países propios que resuelvan
funcionalidades que su Odoo no tiene. Se menciona en el prototipo como horizonte, no se
construye.

---

## Cómo trabajamos

Una fase por vez. Cada una es corta a propósito, para poder profundizar. Al terminar cada fase:
te digo qué quedó, cómo verlo en `http://localhost:8080/sistema/`, y qué decisiones necesito
antes de seguir. Tú revisas y seguimos. Nada se da por aprobado sin que lo mires.

**Convenciones técnicas** (las del repositorio, sin novedades):
HTML/CSS/JS planos, sin framework ni paso de compilación · un archivo de datos por dominio, al
estilo de `mapa-procesos-datos.js` · se sirve con `python -m http.server 8080` · identidad
Cubitt, no identidad UCAB · "Kenex" con una sola n.

---

# BLOQUE A · CIMIENTOS

### Fase 1 · La arquitectura, consolidada y legible
Reescribir la propuesta de arquitectura incorporando todo lo aclarado: alcance mayorista, los
dos modos de conexión, los frentes como clientes mayores, el pedido que nace en el sistema, el
reparto en escasez estipulado, el agente sin nombre propio.
**Entrega:** `sistema/ARQUITECTURA.md` — corto y legible, en el repositorio.
**Revisas:** que reconozcas el negocio de Kenex en el documento antes de que se convierta en
pantallas.

### Fase 2 · El lenguaje visual Cubitt
Los tokens de diseño y el catálogo vivo de componentes: tipografía DM Sans, gradiente de marca,
vidrio, radios generosos, curva de movimiento, modo oscuro y claro. Y la **gramática de la IA**:
el orbe, la estela, el sello de nivel, la tarjeta de firma, el estado "actuando" frente a
"ejecutado".
**Entrega:** `sistema/estilo/app.css` + `sistema/estilo.html` (una página que muestra cada
componente).
**Revisas:** apruebas el aspecto **una vez**, aquí, antes de que se aplique a veinte pantallas.

### Fase 3 · El armazón de la aplicación
El chrome superior, el menú de módulos, el enrutado por hash, el **selector de rol**, el
conmutador de tema, el HUD del agente y la **estela** que recorre el menú cuando una acción
salta de módulo. Pantallas todavía vacías.
**Entrega:** `sistema/index.html` + `sistema/nucleo/app.js`.
**Revisas:** navegas un cascarón que ya se siente el producto.

### Fase 4 · Los datos semilla
El catálogo de Casio y de Cubitt, las fábricas con su MOQ y lead time, **los frentes** (propios
con Odoo · franquicias · socios · clientes directos), las bodegas, doce meses de sell-out por
frente, stock, tránsitos y tasas.
**Entrega:** `sistema/datos/*.js`.
**Revisas:** que los nombres, las cifras y el vocabulario suenen a Kenex y no a demo genérica.
Es la fase donde más vale tu ojo.

### Fase 5 · El núcleo de agentes
El motor: catálogo de acciones, **el cálculo del nivel de autonomía** por los cinco ejes, las
reservas, la escalera de precedencia, el árbitro, la bitácora y la reversión. Lógica
determinista real sobre los datos semilla. Todavía sin pantalla.
**Entrega:** `sistema/nucleo/agentes.js`.
**Revisas:** te muestro la bitácora en crudo — que cada acción haga exactamente lo que dice.

---

# BLOQUE B · COMPRAS

### Fase 6 · Panel de compras y el reloj del ciclo  ✅
La entrada al módulo: el reloj del ciclo mensual, las tarjetas de estado, **la bandeja de firma**
y las alertas que ya vienen con la acción preparada y con destinatario.
**Revisas:** la primera pantalla real. Aquí se ve si el producto convence.

### Fase 7 · La mesa de compra Casio — la pantalla estrella
La tabla densa que sustituye al Excel: una fila por referencia, con stock, los dos tránsitos,
la serie de venta, cobertura, y **la columna de propuesta con su explicación en lenguaje llano**
a un clic. La columna humana siempre gana y el ajuste se registra **con motivo**.
**Revisas:** si alguien de compras reconoce aquí su propio razonamiento, el prototipo está ganado.

### Fase 8 · Cierre del pedido y techo del mes
El resumen antes de firmar, el consumo del techo de compra contra la línea de crédito, y el
archivo listo en el formato que espera el proveedor. **El botón de enviar es humano** y se ve
distinto de todo lo que hace el agente.

### Fase 9 · La mesa de Cubitt, por fábrica
Agrupada por fábrica porque el pedido mínimo es por fábrica: barra de llenado del MOQ, lead
time, esquema de pago, y qué referencias añadir para alcanzar el mínimo sin sobrecomprar.

### Fase 10 · Desarrollo de producto nuevo · y el módulo de fábricas
De dónde sale lo que se compra. El embudo del producto candidato: **idea → muestra pedida →
muestra en prueba → decisión → graduado al catálogo → primera compra**. Ficha del candidato con
su fábrica, su costo objetivo, su precio de venta previsto y su margen; comparación contra
productos equivalentes ya en catálogo; y el comité que decide con la evidencia delante.
**La regla que lo conecta todo: solo un producto graduado puede entrar en una mesa de compra.**

Incluye el **módulo `fábricas`**, pedido por el cliente al ver la fase: el pedido mínimo, el plazo
y el esquema de pago condicionan toda la compra de la marca propia y solo existían dentro de la
mesa. Aquí tienen su sitio junto a lo único que permite negociarlos —el historial de cumplimiento—
y junto al proveedor representado, cuya restricción no es el mínimo sino qué proporción de lo
pedido termina asignando.
**Revisas:** es el módulo que pediste añadir, y es el que convierte el catálogo en algo vivo.

### Fase 11 · Torre de tránsitos y costeo en destino
El embarque de punta a punta con su semáforo documental, y el momento en que falta la factura
del flete y el costo del inventario no cierra. Reclamo preparado, remitente humano.

---

# BLOQUE C · DISTRIBUCIÓN Y LOGÍSTICA

### Fase 12 · La mesa de reparto a los frentes
Llegó la mercancía: cómo se asigna a cada frente contra su venta reportada, su cobertura y sus
compromisos. **Y el reparto en escasez**, estipulado en el sistema: qué cede cada frente, cuánto
y contra qué venta concreta. Con motivo obligatorio en cada ajuste humano.
**Revisas:** es la pantalla que más criterio tácito captura de toda la casa.

### Fase 13 · Torre de bodega y recepción de contenedor
El avance de la descarga y la **liberación por referencia sin esperar a que cierre el contenedor**.

### Fase 14 · Salud de inventario y rebalanceo
El inventario parado, y **cada alerta con su acción ya preparada y su destinatario** — la
respuesta al "está bellísimo, ¿pero quién actúa?".

---

# BLOQUE D · COMERCIAL Y FRENTES

### Fase 15 · Pedidos de clientes mayores y bandeja de aprobación
El pedido **nace aquí**, para países propios y para clientes de otros países. Precalificación
por margen, rotación y riesgo: lo que cumple pasa en lote, la excepción sube con motivo escrito.

### Fase 16 · Demanda no atendida y disponibilidad publicada
La pantalla que hoy no existe en ninguna parte: qué se pidió, qué no se pudo despachar, a quién
y cuánto vale. **Y la publicación de disponibilidad respetando la política de cada socio** —
cantidad exacta o rango, según lo que esté declarado. El rango no es un defecto: es una decisión.

### Fase 17 · El portal de reporte de ventas
El diferenciador. Cada frente sin Odoo carga **su** Excel, con su formato, sus nombres de
producto y sus columnas. El sistema lo lee, propone la equivalencia contra el catálogo canónico,
resuelve lo que puede y manda a cola lo que no. Se ve el archivo entrar y convertirse en demanda.
**Revisas:** aquí es donde el problema de los formatos heterogéneos se convierte en función.

### Fase 18 · Mapa de frentes y conectores
Los frentes propios con su Odoo en vivo y su reloj de sincronización, frente a los que reportan
por portal con su cadencia. La latencia como **reloj de corte**, nunca como advertencia.

---

# BLOQUE E · CIERRE

### Fase 19 · Dirección — la vista de la Junta
El tablero de la audiencia real de la demo, con las cifras del ciclo completo y la barra de
consulta de solo lectura.

### Fase 20 · Sala de agentes y bitácora
El organigrama de agentes con su cargo y su permiso, la bitácora en hilo, el árbitro de
colisiones, el contador del perímetro externo y **el freno**. Se enseña cómo se apaga antes de
enseñar cómo funciona.

### Fase 21 · La cadena de la demo, de punta a punta
Coser el hilo completo —del producto nuevo al sell-out, al forecast, a la compra, al reparto, al
despacho y de vuelta— con la estela cruzando módulos y un recorrido guiado que se sigue sin
explicación.

### Fase 23 · Permisos de firma por rol  ·  *(pendiente P1)*
El rol deja de filtrar solo el menú y pasa a decidir **qué se puede firmar**. Cada acción declara
su ámbito y el botón de firma existe o no según quién esté mirando.

### Fase 24 · Moneda y tasa  ·  *(pendiente P2)*
Ninguna cifra sin su moneda y su tasa fechada. Los frentes ya declaran la suya; falta la tabla de
tasas, la conversión visible y el aviso cuando una cifra mezcla monedas.

### Fase 25 · Láminas del prototipo para el informe  ·  *(pendiente P5)*
Capturas del sistema en marco UCAB, integradas en el modo presentación del informe de Fase 1.

### Fase 22 · Pulido, responsive y ensayo
Rendimiento, móvil, contraste, la **estela automática al cruzar de módulo** *(pendiente P3)*,
revisión de que ninguna pantalla señale a una persona junto a una carencia, y ensayo cronometrado
del recorrido.

---

## Pendientes detectados durante la construcción

Cada fase empieza revisando la anterior. Lo que aparece y tiene sentido para el proyecto se
anota aquí y después se convierte en fase. Los **defectos** de una fase se corrigen en el acto;
esto son **faltantes de alcance**.

| # | Qué falta | Por qué importa | Detectado en |
|---|---|---|---|
| ~~**P1**~~ | ~~Permisos de firma por rol.~~ **Resuelto en la fase 23:** nueve ámbitos declarados, 17 botones marcados con `data-firma`, y cada rol firma exactamente lo que su descripción promete. | — | cerrado en la fase 23 |
| ~~**P2**~~ | ~~Moneda y tasa.~~ **Resuelto en la fase 24:** seis monedas con tasa fechada y fuente, regla de caducidad con dueño, conversión visible donde el dinero tiene dueño, y el aviso de tasa vencida. | — | cerrado en la fase 24 |
| ~~**P3**~~ | ~~La estela no es automática.~~ **Resuelto en la fase 22:** salta sola desde `anota()`, el único sitio por el que pasan todas las acciones. Se retiraron 7 llamadas manuales que habrían quedado duplicadas. | — | cerrado en la fase 22 |
| **P4** | **Reversión desde la interfaz.** El núcleo tiene `compensa()` desde la fase 5 y ninguna pantalla lo usa. | «Se enseña cómo se apaga antes de enseñar cómo funciona» es un argumento central ante la Junta. Está previsto en la fase 20, pero conviene que exista antes por si se adelanta la demo. | revisión de la fase 12 |
| **P6** | **Reglas de negocio huérfanas.** Una auditoría de las fases 6–11 encontró dos reglas declaradas con dueño y versión que ninguna acción usaba. Se corrigieron, pero hace falta una comprobación automática que impida que vuelva a pasar. | Una regla que nada usa es una promesa incumplida, y en este sistema las reglas son el argumento: «esto no lo decide un algoritmo, lo decide una política con dueño». | auditoría de las fases 6–11 |
| **P7** | **Acciones que solo avisan.** Varios botones (`preparar la orden`, `pedir ampliación a finanzas`, `enviar pedido`) muestran un aviso y no cambian el estado del sistema. | Es aceptable en un prototipo, pero conviene decidir cuáles deben producir un efecto visible antes del ensayo de la demo. | auditoría de las fases 6–11 |
| ~~**P5**~~ | ~~Láminas del prototipo para el informe.~~ **Resuelto en la fase 25:** sección `proto` con 7 láminas en `presentacion-fase1.html`, capturas reales en marco UCAB, regenerables con `scripts/capturar-laminas-sistema.py`. | — | cerrado en la fase 25 |
| ~~**P10**~~ | ~~Las comprobaciones viven en el scratchpad.~~ **Resuelto:** `scripts/comprobar-sistema.py` (7 comprobaciones, código de salida 0/1, levanta el servidor solo) y `scripts/validar-html.py`. Cada una se rompió a propósito para verificar que detecta su defecto. | — | cerrado tras la fase 25 |
| ~~**P9**~~ | ~~El freno no desactiva los botones de firma sueltos.~~ **Resuelto en la fase 23:** el mismo `aplicaPermisos()` que gobierna el rol gobierna el freno. El ámbito `sistema` queda exento, o detener sería irreversible. | — | cerrado en la fase 23 |
| ~~**P8**~~ | ~~Con qué rol arranca el recorrido.~~ **Resuelto en la fase 21:** el recorrido guiado entra por dirección y baja a la operación. | — | cerrado en la fase 21 |

---

## Decisiones que quedan abiertas

Ninguna bloquea el arranque. Se resuelven cuando toque su fase:

| # | Decisión | Fase | Recomendación |
|---|---|---|---|
| 1 | Nombre del sistema en pantalla | 2 | Neutro de grupo, no de marca de producto |
| 2 | ¿Modo oscuro o claro para la sala? | 2 | Construir ambos; decidir proyectando |
| 3 | ~~Frentes con nombre real~~ | 4 | ✅ resuelto: el cliente pidió nombre real en todo |
| 4 | ~~Conteo de SKU activos~~ | 4 | ✅ resuelto: 40 Casio + 19 Cubitt, catálogo de prototipo |
| 5 | ¿La pantalla del reporte al fabricante entra al recorrido narrado? | 21 | Existe, no se narra — decisión de Clemencia |
| 6 | Coste, plazo y equipo del sistema real | fuera | No es del prototipo, pero la Junta lo pregunta en el minuto 10 |

---

## Registro de avance

| Fase | Estado |
|---|---|
| **1 · Arquitectura consolidada** | ✅ **hecha** — `sistema/ARQUITECTURA.md` |
| **2 · Lenguaje visual** | ✅ **hecha** — `estilo/app.css` + `estilo.html` |
| **3 · Armazón** | ✅ **hecha** — `index.html` + `nucleo/app.js` |
| **4 · Datos semilla** | ✅ **hecha** — `datos/*.js` + 59 imágenes reales + pantalla `cimiento` |
| **5 · Núcleo de agentes** | ✅ **hecha** — `nucleo/agentes.js` |
| **6 · Panel de compras** | ✅ **hecha** — `pantallas/compras.js` |
| **7 · Mesa de compra Casio** | ✅ **hecha** — `pantallas/mesa-casio.js` |
| **8 · Cierre del pedido y techo** | ✅ **hecha** — `pantallas/cierre.js` |
| **9 · Mesa de Cubitt por fábrica** | ✅ **hecha** — `pantallas/mesa-cubitt.js` |
| **10 · Desarrollo de producto** | ✅ **hecha** — `pantallas/producto.js` + `datos/candidatos.js` |
| **10b · Fábricas y proveedores** | ✅ **hecha** — `pantallas/fabricas.js` + `datos/proveedores.js` |
| **11 · Torre de tránsitos** | ✅ **hecha** — `pantallas/transitos.js` · **cierra el bloque B** |
| **12 · Reparto a los frentes** | ✅ **hecha** — `pantallas/distribucion.js` |
| **13 · Torre de bodega y recepción** | ✅ **hecha** — `pantallas/logistica.js` |
| **14 · Salud de inventario y rebalanceo** | ✅ **hecha** — `pantallas/inventario.js` · **cierra el bloque C** |
| **15 · Pedidos y bandeja de aprobación** | ✅ **hecha** — `pantallas/comercial.js` |
| **16 · Demanda no atendida y disponibilidad** | ✅ **hecha** — `pantallas/demanda.js` |
| **17 · Portal de reporte** | ✅ **hecha** — `pantallas/portal.js` + `datos/reportes.js` |
| **18 · Mapa de frentes y conectores** | ✅ **hecha** — `pantallas/conectores.js` · **cierra el bloque D** |
| **19 · Dirección — la vista de la Junta** | ✅ **hecha** — `pantallas/direccion.js` · visible solo a *dirección ejecutiva* y *sistemas* |
| **20 · Sala de agentes, bitácora y freno** | ✅ **hecha** — `pantallas/agentes.js` + `FRENO` en el núcleo · resuelve **P4** (reversión desde la interfaz) |
| **21 · La cadena de la demo, de punta a punta** | ✅ **hecha** — `nucleo/recorrido.js` · 12 paradas, arranca en dirección · resuelve **P8** |
| **22 · Pulido, responsive y ensayo** | ✅ **hecha** — contraste AA en ambos temas · resuelve **P3** (estela automática) |
| **23 · Permisos de firma por rol** | ✅ **hecha** — `AMBITOS` + `data-firma` + `aplicaPermisos()` · resuelve **P1** y **P9** |
| **24 · Moneda y tasa** | ✅ **hecha** — `datos/tasas.js` + conversión con tasa fechada · resuelve **P2** · añade la tabla de reglas que faltaba en cimiento |
| **25 · Láminas del prototipo para el informe** | ✅ **hecha** — 7 láminas en el deck de Fase 1 · resuelve **P5** |


---

# Segunda serie — de aplicativo de compras a plataforma comercial (fases 26–34)

La primera serie (1–25) dejó el ciclo de la compra internacional completo. Esta
serie lo convierte en la plataforma comercial entera: inventario distribuido
global, clientes, mapa ejecutivo y los dos portales externos.

**Decisiones ya tomadas con el usuario (26-jul):**
- Los portales del vendedor y del cliente son **páginas aparte** con estética
  de portal propia (`sistema/portal-vendedor/`, `sistema/portal-cliente/`),
  pero consumen los MISMOS `datos/*.js` — fuente única, nada de cifras
  duplicadas.
- El Big Map va sobre **Mapbox GL JS vendorizado** con token público del
  proyecto (ver fase 30). ⚠️ Es un token `pk.*` publicable por diseño, no un
  secreto — pero conviene **restringirlo por URL** en el panel de Mapbox
  (localhost + el dominio donde se publique).
- El vendedor del portal es el **comercial de Kenex (mayoreo)**: vende a los
  clientes/distribuidores por país y reserva unidades de lo que está en mar.
- La torre de control de IA del módulo de clientes es **global + pestaña por
  cliente**: vista de cartera entera y detalle en cada ficha, con la misma
  gramática preparé / hice / tu firma del resto del sistema.

**Reglas de la serie** (heredadas de la primera):
- Al comenzar cada fase, repasar la anterior, apuntar lo que falte y convertirlo
  en fase o sub-fase si tiene sentido.
- Toda comprobación nueva se **rompe a propósito** antes de darla por buena; si
  el sabotaje se interrumpe, `auditar.py --arregla` antes de diagnosticar nada.
- Las mejoras que el usuario pase durante la serie se registran aquí como
  insumos y se ejecutan ANTES de la fase 33 (el recorrido se reescribe una sola
  vez, con todo dentro).

| Fase | Qué | Depende de |
|---|---|---|
| 26 | Pantalla de inicio + accesos desde el informe | — |
| 27 | Inventarios, módulo propio | — |
| 28 | Inventario global distribuido (almacenes teóricos de clientes) | 27 |
| 29 | Módulo de clientes + torre de control IA | 28 |
| 30 | Big Map ejecutivo (Mapbox) | 28, 29 |
| 31 | Portal del vendedor | 27, 28 |
| 32 | Portal del cliente | 29 |
| 33 | Recorrido 2.0 (absorbe también las mejoras que lleguen) | todas |
| 34 | Comprobaciones, capturas del deck y cierre | 33 |

## Fase 26 · La entrada

**26a — pantalla de inicio de `/sistema`.** Hero con la identidad Cubitt
(DM Sans, gradiente #36F6BB→#32C6F4): nombre del sistema, una frase de tesis y
el botón **Entrar**, que arranca directamente el recorrido (así lo pidió el
usuario: entrar = empezar el recorrido). Enlace secundario discreto «entrar
directo» para el uso diario. Cuando existan los portales (31–32), esta pantalla
enseña también sus dos tarjetas de acceso.
- Técnica: la pantalla es el estado sin hash (`#/inicio`); `ruta()` hoy manda
  al primer módulo visible del rol — pasa a mandar al inicio. Revisar
  `history.replaceState` y que la comprobación `rutas` siga midiendo bien.

**26b — accesos desde el informe.** Dos botones flotantes junto a los
existentes (🏛 Organigrama · Módulos · ▶ Presentación):
- **«Sistema»** → abre `/sistema` en pestaña nueva (es una SPA con su propio
  hash routing; en iframe se rompería).
- **«Arquitectura IA»** → abre el MISMO modal de la s10 (el iframe con la torre
  ya existe; el botón solo lo invoca desde cualquier punto del informe).
- Cuidado con la acumulación de botones flotantes: agruparlos en una pila
  coherente, responsive incluido.

## Fase 27 · Inventarios, módulo propio

Separar «logística e inventarios» en dos módulos del sidebar: **Logística**
(recepción, bodega, tránsitos — el flujo físico) e **Inventarios** (las
existencias). `pantallas/inventario.js` (hoy «salud de inventario») se
convierte en el módulo con pestañas:
- **Por almacén** — los almacenes PROPIOS (nuevo `datos/almacenes.js`: nombre,
  país, tipo, coordenadas —que reutiliza la fase 30—, capacidad, stock por
  referencia coherente con `operacion.js`). Visual de almacenes: tarjetas con
  ocupación, valor, top referencias y semáforos.
- **Salud y rebalanceo** — lo ya construido en la fase 14, intacto.
- **En mar** — lo que viene, por embarque, cuadrando con `transitos.js`.
- ⚠️ Fuente única: el stock que ya enseñan logística y salud debe salir de los
  mismos datos. Ninguna cifra nueva que no cuadre con las existentes.
- Comprobación nueva `inventarios`: la suma por almacén = el global que enseñan
  las otras pantallas; en-mar cuadra con tránsitos; ningún almacén sin dueño.

## Fase 28 · Inventario global distribuido

La visual de dónde está TODA la mercancía del grupo, incluida la que ya no es
nuestra pero sabemos dónde debería estar:
- **Almacén teórico de cada cliente** = Σ despachado − Σ sell-out reportado.
  Con **confianza del dato**: reporte al día → estimación firme; reporte
  quincenal por Excel → banda de incertidumbre. Es la tesis del informe («el
  dato antes que el agente») hecha pantalla: la calidad del reporte del cliente
  determina qué tan bien lo vemos.
- Vista global: región → país → cliente, con sobre-stock y quiebre inminente
  destacados y la recomendación de la IA al lado (impulso, promoción,
  reposición anticipada).
- Datos: nace `datos/clientes.js` con lo mínimo (clientes, despachos, reportes
  — coherente con `reportes.js` y `red.js`); la fase 29 lo enriquece.
- Comprobación: la ecuación despachado − reportado = estimado se verifica
  contra pantalla, cliente por cliente.

## Fase 29 · Módulo de clientes

- **Registro**: regiones → países → clientes. Propios (frentes de países
  propios) · socio (Costa Rica) · terceros. Sin nombres de personas reales.
- **Ficha de cliente**: canal, línea de crédito (límite, consumido,
  vencimientos), historial de compras, despachos en curso, sell-out reportado y
  su cadencia, inventario estimado (28), promociones activas, pronóstico.
- **Recomendaciones IA de impulso**: agentes con sello preparé/hice/tu firma —
  promoción por rotación baja, reposición anticipada por quiebre proyectado,
  alerta de crédito. Registrados en el núcleo de agentes, con ámbito de firma.
- **Torre de control IA** (global + por cliente): vista de cartera —qué
  preparó, hizo y espera firma la IA por cliente, alertas por urgencia— y una
  pestaña de detalle en cada ficha. Integrada con la sala de agentes y la
  bitácora existentes: son los MISMOS agentes, no un mundo aparte.
- Comprobación `clientes`: toda recomendación tiene agente y ámbito declarados;
  toda cifra de dinero lleva moneda (la regla `moneda` se extiende sola).

## Fase 30 · Big Map ejecutivo

- **Mapbox GL JS vendorizado** en `sistema/vendor/mapbox-gl/` (sin CDN, como
  three.js). Token público del proyecto (pk, publicable por diseño):
  «el token vive en `sistema/datos/mapa-config.js`, único sitio»
  en un único `datos/mapa-config.js`. ⚠️ Pedir a quien administre la cuenta de
  Mapbox restringirlo por URL.
- Contenido: almacenes propios ◆ y clientes ● con color por marca; filtros
  **Cubitt / Casio / ambas**; búsqueda; clustering donde se amontonen; clic →
  tarjeta con cifras clave + pronóstico + enlace a la ficha (29).
- Capas con valor: flujos de despacho (arcos puerto→país, el lenguaje de la
  corriente de la torre) y semáforo de inventario estimado (28).
- Estilo oscuro/claro siguiendo el tema del sistema.
- **Fallback declarado** sin red o sin token: mensaje + lista por país (el
  patrón del «sin WebGL» de la torre). El mapa es la única pieza del prototipo
  que depende de la red: decirlo, no esconderlo.
- Comprobación `mapa`: puntos pintados = clientes+almacenes del modelo; los
  filtros filtran de verdad; sin token no revienta.

## Fase 31 · Portal del vendedor — `sistema/portal-vendedor/`

Página aparte con estética de portal (misma familia visual, cromo propio), para
el **comercial de mayoreo de Kenex**. Consume los mismos `datos/*.js`.
- **Catálogo vendible** con disponible-a-prometer: stock en almacén + lo que
  viene en mar (por contenedor, con ETA y % ya reservado).
- **Reservas** — la estrella: reservar unidades de un embarque en tránsito para
  un cliente. La reserva descuenta el ATP en TODAS las vistas que lo muestran,
  queda en bitácora, y firma según ámbito (el vendedor prepara; según monto,
  firma un supervisor).
- **Pedido de venta** para un cliente de su cartera (clientes de la 29).
- Comprobación `portal-vendedor`: ATP = stock + en-mar − reservado, cuadrando
  con tránsitos e inventarios; una reserva mueve el número en todas partes.

## Fase 32 · Portal del cliente — `sistema/portal-cliente/`

La otra cara del portal de reporte de la fase 17 (que queda como vista interna
de lo que los clientes suben). El cliente:
- **Pide** (pedido con ATP visible y crédito disponible; si excede, bloqueo con
  motivo — nunca silencio).
- **Preventa**: ve lo anticipado —lo que viene en mar— y aparta según su nivel.
- **Historial de compras** y **despachos** con seguimiento simulado.
- **Reporta sus ventas** subiendo el Excel (el flujo simulado existente,
  contado aquí desde su lado — y conectado con el cedazo: «esto que subes es lo
  que certifica tu inventario estimado»).
- **Línea de crédito** (consumo, vencimientos) y **promociones** activas.
- Comprobación `portal-cliente`: el pedido respeta el crédito; el sell-out
  subido mueve el inventario estimado (28) y deja rastro.

## Fase 33 · Recorrido 2.0 — se ejecuta al final, con todo dentro

Reescribir `nucleo/recorrido.js` con el arco del ciclo completo:

> Dirección (la visión) → la compra (mesa) → en mar (tránsitos + la reserva del
> vendedor) → llegada y bodega → **inventarios propios** → distribución →
> **clientes** (módulo + mapa) → **portal del cliente** (pide y reporta) → el
> sell-out vuelve a la demanda → cierre en la **torre de control IA**.

- Cada parada DECLARA su estado (lección de la torre: por eso se puede andar al
  revés y saltando).
- El recorrido arranca desde la pantalla de inicio (26) — Entrar = recorrido.
- Cruce de páginas: el recorrido tiene que pasar de `/sistema` a los portales y
  volver. Técnica a decidir en ejecución (hash de continuación o recorridos
  encadenados con «continuar en el portal →»).
- Repasar CADA cifra del guion contra la pantalla que la sostiene (la
  comprobación ya lo exige; el guion nuevo no hereda el viejo sin verificar).

**Insumos pendientes del usuario para esta fase:** _(se van anotando aquí)_

## Fase 34 · Comprobaciones, capturas y cierre

- Comprobaciones nuevas de la serie (`inventarios`, `clientes`, `mapa`,
  `portal-vendedor`, `portal-cliente`) — cada una rota a propósito primero.
- Ampliar `rutas`, `moneda`, `permisos` y `contraste` a las páginas nuevas.
- `validar-html.py` cubre las páginas nuevas.
- Regenerar las láminas de la sección `proto` del deck si cambiaron pantallas.
- Actualizar `ARQUITECTURA.md` y este plan.
