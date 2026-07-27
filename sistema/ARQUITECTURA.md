# EL SISTEMA — Arquitectura

**Proyecto Rower · UCAB Consultores para Grupo Kenex · Fase 2 · Fase 1 del plan**
Corte: 26-jul-2026 · ⚠️ Material interno del equipo consultor.

> Este documento fija el alcance. Todo lo que se construya de la fase 2 en adelante se ajusta a
> lo que aquí se decide. Si algo no es como Kenex lo tiene en la cabeza, se corrige **aquí**,
> antes de que se convierta en veinte pantallas.

---

## 1 · Qué es, en una frase

> **EL SISTEMA es la central de mayoreo y distribución del grupo: el único lugar donde Kenex
> compra al fabricante, recibe, reparte a todos sus frentes, despacha y factura — con una capa
> de agentes que ejecuta el trabajo hasta el borde de cada decisión y firma con personas.**

### Y qué NO es

| No es | Porque |
|---|---|
| **No es un punto de venta.** | La venta de mostrador de las tiendas vive en el Odoo de cada país. Aquí no se emite un ticket. |
| **No reemplaza a los Odoo.** | Cada país propio conserva su Odoo como caja registradora y sistema local. El Sistema se conecta a él, no lo sustituye. |
| **No es un ERP contable.** | La factura fiscal, el cobro y el libro contable son locales y de cada razón social. |
| **No toca personas.** | Ni nómina, ni evaluación, ni compensación. Ese perímetro no se roza. |

---

## 2 · El ciclo completo

Es la columna vertebral del sistema y del recorrido de la demo. Empieza antes de la compra
—en el producto que todavía no existe— y se cierra sobre sí mismo.

```
  ┌─────────────────────── DESARROLLO DE PRODUCTO ───────────────────────┐
  │   candidato  →  muestra pedida  →  en prueba  →  decisión            │
  └───────────────────────────────┬──────────────────────────────────────┘
                                  │  solo un producto GRADUADO
                                  ▼  puede entrar en una mesa de compra
                          CATÁLOGO CANÓNICO
                                  │
   sell-out de TODOS los frentes ─┴─► DEMANDA REAL ──► FORECAST
                  ▲                                       │
                  │                                       ▼
        el frente vende                        COMPRA INTERNACIONAL
        y reporta su venta                        Casio  ·  Cubitt
                  ▲                                       │
                  │                                       ▼
      despacho y factura ◄── ASIGNACIÓN Y REPARTO ◄── RECEPCIÓN EN COLÓN
          al frente            a todos los frentes
```

**Lo que hace que el ciclo funcione es el primer eslabón de la izquierda:** si el sell-out de
todos los frentes no vuelve al sistema, el forecast se calcula sobre la mitad del negocio. Por
eso los frentes que no tienen Odoo no son un caso menor: **son la mitad del dato**.

---

## 3 · Los frentes

**Todos los frentes son clientes mayores del central**, incluidos los países propios, que
**pagan a la central** como cualquier otro cliente. La diferencia no es de rango: es **cómo se
conectan y cómo reportan**.

| | **Frentes propios** | **Frentes sin Odoo** |
|---|---|---|
| **Quiénes** | Panamá (Zona Libre de Colón) · Venezuela · Colombia · EE. UU. | Franquicias · socios · clientes mayores directos en otros países |
| **Cómo entra su venta** | **Conexión con su Odoo**, en tiempo real | **Portal de reporte**: cada uno carga su Excel, con su formato |
| **Cómo reciben mercancía** | El Sistema **escribe la transferencia** a sus almacenes cuando la central les asigna | Se les despacha y factura como a cualquier cliente |
| **Qué ve el Sistema** | Ventas y movimientos en vivo | Lo que reportan, con la cadencia que reportan |
| **Qué paga** | Paga a la central | Paga a la central |

**Los dos modos son ciudadanos de primera.** Lo único que cambia entre ellos no es la confianza
en el dato: es **el reloj**. Con Odoo conectado, el sistema compra contra la venta de hoy; con
portal, contra la del último reporte. Y eso convierte una discusión técnica en una pregunta
económica limpia: *¿cuánto vale que este frente reporte semanal en vez de mensual?*

### El portal de reporte — la pieza que resuelve el problema de los formatos

Cada frente sin Odoo reporta **con su propio Excel**: sus columnas, sus nombres de producto, su
periodicidad. Hoy eso se traduce a mano. En el Sistema:

1. El frente sube su archivo tal cual lo tiene.
2. El sistema reconoce el formato de ese frente (lo aprendió de sus cargas anteriores).
3. Propone la equivalencia de cada nombre contra el **catálogo canónico** y resuelve lo que
   supera el umbral de confianza.
4. Lo que no puede resolver va a una **cola de excepciones** con las mejores candidatas y un
   responsable.
5. La venta normalizada entra en la demanda real y alimenta el forecast.

**El mismo producto se llama distinto en cada archivo.** Ese es el problema, y el catálogo
canónico con su lista de alias es la solución: un identificador interno, y tantos alias como
formas de nombrarlo existan en la región.

---

## 4 · Los módulos

Doce, más dos portales externos. Nombres en minúscula.

| Módulo | Para quién | Qué resuelve |
|---|---|---|
| **`dirección`** | Junta, presidencia, accionistas | El estado del ciclo completo en una pantalla |
| **`desarrollo de producto`** | I+D y producto de marca propia | El embudo del candidato hasta que gradúa al catálogo |
| **`fábricas`** | Compras y desarrollo de producto | MOQ, plazo y esquema de pago de cada fábrica, con su historial de cumplimiento |
| **`compras`** | Dirección de compras, analista, finanzas como invitada | El forecast y la compra a Casio y a Cubitt |
| **`logística`** | Operaciones y jefes de bodega | El flujo físico: recepción contra manifiesto, ubicación y despacho |
| **`inventarios`** | Operaciones, compras y comercial | El estado de las existencias: por almacén propio, salud y rebalanceo, lo que viene en mar, y el **inventario distribuido** de toda la red |
| **`distribución`** | Compras y comercial | El reparto a los frentes, incluida la escasez |
| **`comercial`** | Gerencia comercial, responsables de frente | Pedidos de clientes mayores, demanda no atendida, disponibilidad publicada |
| **`clientes`** | Gerencia comercial, compras y dirección | La cartera por región con su crédito y su inventario, y la **torre de control de IA** |
| **`mapa global`** | Dirección y quien presente la red | Toda la red sobre el mapa real, con filtro por marca y los flujos del reparto |
| **`frentes`** | Sistemas, responsables de país, y la Junta | El portal de reporte y el estado de cada conexión |
| **`cimiento`** | Administración de datos | Catálogo canónico, alias, reglas de negocio, cola de excepciones |
| **`sala de agentes`** | Todos ven su parte; sistemas y Junta, el conjunto | Qué hace cada agente, con qué permiso y con qué registro |

### Los dos portales externos

Son **documentos aparte** con su propio cromo y su propia URL, y consumen los mismos datos y el
mismo núcleo que el aplicativo. Lo que los hace portal es el marco y la navegación reducida, no
una identidad distinta.

| Portal | Para quién | Qué resuelve |
|---|---|---|
| **`portal del vendedor`** | El comercial de mayoreo de Kenex | El **disponible a prometer** —lo libre en Colón más lo libre de cada contenedor en camino— y amarrar unidades de un embarque para un cliente |
| **`portal del cliente`** | Cada frente, socio, operador y franquicia | Pedir con su crédito delante, la preventa de lo que viene, sus despachos, y subir su venta en su propio Excel |

**La pieza que los hace sistema y no maqueta:** los dos piden al **mismo libro de reservas** que
usan la mesa de compra, el reparto y la IA. Una reserva del portal descuenta el disponible en todas
las vistas, incluido el aplicativo interno — y por eso dos vendedores no pueden prometer el mismo
contenedor.

**Sigue fuera de alcance:** portales dentro de los países propios que resuelvan funcionalidades que
su Odoo no tiene. Se nombra como horizonte; no se construye.

---

## 5 · Qué vive dónde

No hay base de datos en el prototipo: esto es el **modelo conceptual** que las pantallas
representan. La regla que lo gobierna: **una entidad, un dueño**. Así los conflictos no se
arbitran — no llegan a existir.

| Entidad | Dueño | Nota |
|---|---|---|
| Producto canónico, familia, color, alias | **Sistema** | Un producto no puede nacer seis veces. Raíz de todo el modelo. |
| Producto candidato (en desarrollo) | **Sistema** | Vive en su módulo hasta que gradúa. **No es comprable hasta entonces.** |
| Proveedor y fábrica (MOQ, lead time, esquema de pago) | **Sistema** | Los dos parámetros que hoy no existen en ningún sistema. |
| Cliente mayor (incluidos los países propios) | **Sistema** | Con su lista de precios, su política de publicación y su riesgo. |
| Lista de precios de venta a los frentes | **Sistema** | Es política regional. |
| Compra, embarque, tránsito, costeo en destino | **Sistema** | Hoy vive en un correo con un Excel. Aquí nace en el sistema. |
| Inventario de la central y en tránsito | **Sistema** | La mercancía antes de repartirse. |
| Inventario **estimado** en casa del cliente | **Sistema** (derivado) | Despachado − reportado, con su **banda de incertidumbre** según los días desde el corte de ese frente. No es un dato: es una estimación que declara su margen. |
| Reserva sobre un embarque en tránsito | **Sistema** | Amarrada por el portal del vendedor sobre un contenedor concreto. Mismo libro que las reservas internas. |
| Asignación y reparto a los frentes | **Sistema** | Incluido el criterio de escasez. Ver §7. |
| Pedido de venta al frente | **Sistema** | **Nace aquí.** Por eso la demanda no atendida no se puede borrar. |
| Despacho y factura al frente | **Sistema** | Es la venta de la central a su cliente. |
| Venta al detal del frente propio | **Odoo del país** | Llega al Sistema por la conexión. |
| Venta reportada del frente sin Odoo | **El frente** | Llega al Sistema por el portal. |
| Contabilidad y cobro local | **Cada razón social** | Fuera del alcance del Sistema. |
| Regla de negocio, reserva, bitácora | **Sistema** | Con dueño y versión. |

**Regla dura y transversal: no existe una cifra sin moneda y sin tasa fechada.**

---

## 6 · La ejecución de la IA

No es un asistente encima de un ERP: es un **conjunto de agentes con descripción de cargo** —
ámbito, tope, prohibiciones y registro. **Sin nombre propio:** se identifican por su función y
por el orbe, nunca por una marca.

### Dónde vive

Dentro de la fila (la columna de propuesta, junto al dato, con su porqué a un clic) · en la
cinta del turno (*"anoche armé la mesa de agosto: 1.284 referencias, 312 con propuesta"*) · en
la bandeja de firma de cada rol · en la estela que recorre el menú cuando una acción salta de
módulo · y en la sala de agentes.

**No hay chatbot flotante sobre las pantallas operativas, ni un módulo llamado "IA".** Un
módulo de IA sería la confesión de que no está integrada en el trabajo.

### Tres niveles, leídos como verbo

| | En pantalla | Qué es |
|---|---|---|
| **1** | *"preparé…"* | Escribe solo en borrador y dentro del sistema. Autonomía plena porque su efecto es cero hasta que alguien lo toma. **Aquí vive la mayor parte del valor.** |
| **2** | *"hice…"* | Escritura interna de bajo riesgo y alto volumen, con presupuesto diario; al agotarlo **se degrada sola**. Examen: **si no se deshace con un clic, no puede ser nivel 2.** |
| **3** | *"esto necesita tu firma"* | Compromete stock, mueve mercancía, cuesta dinero o sale de la empresa. **El agente hace el 100 % del trabajo y el 0 % de la decisión.** |

**El nivel se calcula, no se opina.** Cinco ejes —perímetro · reversibilidad · radio de la
escritura · dinero e ingreso · reloj del frente— y **se toma el mínimo**.

**Y la asimetría que lo hace creíble:** ninguna acción nace autónoma; todas entran pidiendo
firma y suben solo con histórico medido. **Bajarlas lo hace cualquiera, al instante, sin
justificar.**

### Los límites duros

No compra · no paga · no fija precios · no aprueba crédito · no corta un canal ni suspende a un
cliente · no escribe a un tercero sin firma nominal · **no borra nada** · no toca personas · no
cambia su propio nivel ni edita las reglas que usa para decidir.

### El perímetro externo

Todo lo que sale de Kenex —al proveedor, a la fábrica, al agente aduanal, a un cliente— tiene
**techo de nivel 1**, plantilla aprobada, **remitente humano con nombre** y copia visible. El
agente redacta; el sobre lo firma una persona. El contador de la sala de agentes dice
**"enviadas sin firma humana: 0"**.

---

## 7 · El reparto en escasez

Cuando lo que piden los frentes supera lo que hay, **el criterio está estipulado en el sistema**,
no en una cabeza. Es una política publicada y visible, no un algoritmo oculto.

El orden de precedencia:

1. **Compromiso ya firmado con un cliente** — gana siempre.
2. **Reserva nominal declarada por una persona con autoridad** — el criterio humano explícito
   pesa más que el modelo.
3. **Mínimo declarado por frente o por canal** — es una regla con dueño.
4. **Reposición dentro de su ciclo** — venta a punto de ocurrir.
5. **Reparto proporcional a la venta reportada.**
6. **Rebalanceo por baja rotación.**
7. **Sustitución de compra apoyándose en stock existente** — el último, siempre.

**En una frase: gana lo que ya se cobró, después lo que sostiene la operación, después lo que
rota, y de último lo que ahorra. Una compra futura nunca desplaza una venta presente.**

La pantalla de reparto muestra, para cada frente, **qué cede, cuánto y contra qué venta
concreta**. Todo ajuste humano exige **motivo de una lista corta**, y ese motivo es lo que
convierte el criterio tácito en algo que el sistema aprende.

---

## 8 · Alcance del prototipo

| | |
|---|---|
| **Es** | Prototipo **visual e interactivo**. Se navega, se hace clic, las acciones producen efectos y el estado cambia a la vista. |
| **No es** | Base de datos, integraciones reales, autenticación ni backend. |
| **Los datos** | **Semilla**, construidos sobre el catálogo real de las tiendas de Casio y Cubitt. El estado vive en memoria del navegador. |
| **Los conectores** | Se **representan** —estado, última sincronización, reloj de corte— no se construyen. |
| **La IA** | Lógica **determinista real** sobre los datos semilla: las acciones calculan, escriben en el estado y quedan en bitácora. No hay modelo de lenguaje detrás. |
| **Técnica** | HTML, CSS y JS planos. Sin framework ni compilación. Se sirve con `python -m http.server 8080`. |
| **Identidad** | **Cubitt**, no UCAB. El informe es un documento de consultoría; esto es el producto de Kenex y debe verse suyo. |

---

## 9 · Lo que este documento deja decidido

1. El sistema central es **mayoreo y distribución**. No tiene venta al detal.
2. **Todos los frentes son clientes mayores** y todos pagan a la central.
3. **Dos modos de conexión:** Odoo en los propios, portal de reporte en los demás. Ninguno es
   de segunda.
4. El **pedido de venta nace en el Sistema**, para todos los frentes.
5. El **reparto en escasez está estipulado** en el sistema, con motivo obligatorio.
6. Hay un módulo de **desarrollo de producto**, y **solo un producto graduado es comprable**.
7. El agente **no lleva nombre propio**.
8. **No existe cifra sin moneda y sin tasa fechada.**
