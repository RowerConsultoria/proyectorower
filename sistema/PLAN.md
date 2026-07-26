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
| **P1** | **Permisos de firma por rol.** El selector filtra qué módulos ve cada rol, pero cualquiera puede firmar cualquier cosa. La arquitectura declara un ámbito de firma por rol y no está implementado. | Un ERP sin perfil no es creíble, y la demo del selector de rol pierde la mitad de su fuerza si el rol no cambia lo que se puede aprobar. | revisión de la fase 12 |
| **P2** | **Moneda y tasa.** La arquitectura fija que *no existe cifra sin moneda y sin tasa fechada*, y hoy todo se muestra en USD implícito. Los frentes ya declaran su moneda (Colombia en COP) y nada la usa. | Es la respuesta directa al episodio de bolívares y dólares mezclados. Un director financiero lo pregunta en el primer minuto. | revisión de la fase 12 |
| **P3** | **La estela no es automática.** Solo se lanza desde el botón del chrome y desde acciones concretas. Debería dispararse **siempre** que una acción cruce de módulo. | Es la respuesta visual literal al encargo del cliente: ver la acción viajar. Si depende de que alguien pulse un botón, en la demo no se ve. | revisión de la fase 12 |
| **P4** | **Reversión desde la interfaz.** El núcleo tiene `compensa()` desde la fase 5 y ninguna pantalla lo usa. | «Se enseña cómo se apaga antes de enseñar cómo funciona» es un argumento central ante la Junta. Está previsto en la fase 20, pero conviene que exista antes por si se adelanta la demo. | revisión de la fase 12 |
| **P6** | **Reglas de negocio huérfanas.** Una auditoría de las fases 6–11 encontró dos reglas declaradas con dueño y versión que ninguna acción usaba. Se corrigieron, pero hace falta una comprobación automática que impida que vuelva a pasar. | Una regla que nada usa es una promesa incumplida, y en este sistema las reglas son el argumento: «esto no lo decide un algoritmo, lo decide una política con dueño». | auditoría de las fases 6–11 |
| **P7** | **Acciones que solo avisan.** Varios botones (`preparar la orden`, `pedir ampliación a finanzas`, `enviar pedido`) muestran un aviso y no cambian el estado del sistema. | Es aceptable en un prototipo, pero conviene decidir cuáles deben producir un efecto visible antes del ensayo de la demo. | auditoría de las fases 6–11 |
| **P5** | **Láminas del prototipo para el informe.** El deck de la presentación necesita capturas estáticas del sistema, en marco UCAB. | El prototipo no se presenta solo: vive dentro del informe de Fase 1, que ya tiene su modo presentación. | revisión de la fase 12 |

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
| 19–22 · Cierre | pendiente |
