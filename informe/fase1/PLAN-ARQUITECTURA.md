# LA TORRE — Modelo interactivo de la arquitectura de IA

**Proyecto Rower · UCAB Consultores para Grupo Kenex**
⚠️ Material interno del equipo consultor.

---

## Qué se construye

Dos vistas del **mismo modelo**, que por eso no pueden divergir:
- `arquitectura-ia-kenex.html` — **la principal, en 3D**: rack de servidores en WebGL con el texto
  en DOM (nítido, seleccionable, buscable). Escena clara, rack oscuro.
- `arquitectura-ia-plana.html` — **el respaldo**: se ve si el equipo no tiene WebGL, se imprime, y
  de ahí sale la lámina del deck.

Las dos leen de `arquitectura-datos.js`. La librería (three.js, MIT) está **vendorizada** en
`vendor/`: sin CDN, porque el informe se presenta desde un portátil y tiene que funcionar sin
internet.
Archivo hermano del organigrama y del mapa de procesos — se itera sin tocar el informe maestro,
y **sustituye** al diagrama de 6 capas embebido hoy en la s12 vía `srcdoc`.

**Identidad UCAB** (navy `#1F3864`, azul `#2E75B6`, Calibri/Segoe), no Cubitt: vive dentro del
informe y su audiencia es la Junta.

## La tesis que tiene que defender

> Ninguna inteligencia es mejor que el dato que la alimenta.

Y su corolario, que es lo que el dibujo tiene que hacer evidente: **entre la entrada y la
inteligencia hay un cedazo**. Una torre donde todo sube es propaganda; una donde algo se queda
abajo es un sistema.

## El modelo

```
                        ▲  LA AZOTEA · la decisión y la firma
                        │  nada sale de Kenex sin que una persona firme
                     ┌──┴──┐
                     │  4  │
        ┌────────────┴─────┴────────────┐
        │  3 · INTELIGENCIA             │   el valor visible
        │  reportería · pronóstico      │   reportería, pronóstico, propuesta de
        │  reposición · salud           │   compra, reparto y salud de inventario
        ├───────────────────────────────┤
        │  2 · EL DATO CERTIFICADO      │   la fuente de la verdad
        │  catálogo · alias · reglas    │   catálogo canónico, alias resueltos,
        │  tasas · demanda saneada      │   reglas con dueño, tasas fechadas
        ╞═══════════ EL CEDAZO ═════════╡ ← lo que no pasa cae en cola de excepciones
        │  1 · INGESTA                  │   el sistema nervioso
        │  conectores · portal · captura│   recibe, valida formato, sella hora y origen
        └───────────────────────────────┘
   ◉ ◉ ◉ ◉ ◉ ◉  LAS RAÍCES · 12 sitios donde nace el dato  ◉ ◉ ◉ ◉ ◉ ◉
        (los sistemas de registro: lo que ya existe, no se reemplaza)
```

**Y la torre baja.** Una torre que solo sube es un BI. Lo que vuelve a cada fuente —la orden a la
fábrica, la asignación al almacén del país, la disponibilidad al socio, el pedido confirmado al
cliente, el reclamo a la naviera— cierra el ciclo y es la mitad del argumento.

## Coherencia con lo ya publicado

Los nombres de nivel **reutilizan el vocabulario de la s12**, para que se lea como un zoom del
mismo modelo y no como una segunda arquitectura:

| La torre | Capa publicada en la s12 |
|---|---|
| Las raíces | Sistemas de registro · *lo que ya existe, no se reemplaza* |
| 1 · Ingesta | Integración · *el sistema nervioso* |
| 2 · El dato certificado | Capa de datos certificada · *la fuente de la verdad* |
| 3 · Inteligencia | Agentes y casos de uso · *el valor visible* |
| 4 · La azotea | Experiencia · *donde la gente lo vive* |

El **motor de razonamiento** no es un piso: es transversal, actúa en los tres primeros y en cada
uno declara su nivel — *preparé* / *hice* / *tu firma*. Pintarlo como un piso repetiría el error
que el propio informe denuncia: la IA como capa mágica encima de todo.

---

# El plan por fases

### Fase 1 · El modelo, en un solo archivo
`arquitectura-datos.js` como **fuente única**: las 12 raíces con su vía, cadencia, dueño, cómo
llegan hoy y **qué se rompe si faltan**; los 4 niveles; las subidas y las bajadas; los agentes por
nivel. Ninguna cifra ni etiqueta escrita a mano en el HTML.

### Fase 2 · El armazón y la torre estática
La página con identidad UCAB, el lienzo, la cabecera con la tesis, la torre de 4 niveles dibujada
y el anillo de raíces alrededor de la base. Todavía sin movimiento.

### Fase 3 · La corriente
Los cables con **flujo continuo**: la corriente sube de cada raíz a la torre y entre niveles. Es la
firma visual de la página — que se vea el dato circulando, no flechas quietas.

### Fase 4 · El cedazo
El filtro entre la ingesta y el dato certificado, con su contador de lo que no pasó y va a cola de
excepciones. Sin esto la torre es un BI bonito.

### Fase 5 · Foco por raíz
Clic en una fuente: se ilumina su recorrido completo y se atenúa el resto. Panel lateral con qué
aporta, cómo entra hoy, cómo entraría, cadencia, dueño y qué se rompe si falta.

### Fase 6 · Foco por nivel
Clic en un nivel: qué vive ahí, qué agentes actúan y con qué nivel de autonomía.

### Fase 7 · La bajada
El flujo descendente y su conmutador. Lo que vuelve a cada fuente, y el cierre del ciclo.

### Fase 8 · Hoy / propuesto
El conmutador que hace que la página **argumente** en vez de describir: hoy estas fuentes existen
pero llegan por correo, por WhatsApp y por teléfono; propuesto, cada una con su entrada definida.
Misma gramática de capas que el organigrama.

### Fase 9 · El recorrido guiado
Cinco o seis paradas que se siguen sin que nadie tenga que explicarlas.

### Fase 10 · Sustituir el diagrama de la s12
Retirar el `srcdoc` de 6 capas del informe maestro y enlazar la torre, con el protocolo de edición
del informe: anclas únicas (`count==1`), validador HTML tolerante, verificación por DOM. Más una
lámina en el deck.

### Fase 11 · Pulido y comprobaciones
Responsive, contraste AA, y una comprobación nueva en `scripts/comprobar-sistema.py` —rota a
propósito primero— que verifique que ninguna raíz queda sin destino y que ningún nivel queda sin
raíces que lo alimenten.

---

## Registro de avance

| Fase | Estado |
|---|---|
| **1 · El modelo** | ✅ **hecha** — `arquitectura-datos.js`: 4 niveles, 12 raíces, 6 bajadas, el cedazo |
| **2 · Armazón y torre estática** | ✅ **hecha** — `arquitectura-ia-kenex.html`, identidad UCAB, medida y colocada |
| **3 · La corriente** | ✅ **hecha** — velocidad y continuidad atadas a la cadencia real · pausa · movimiento reducido |
| **4 · El cedazo** | ✅ **hecha** — 4 criterios, la cola de excepciones con cifra, y el ramal ámbar que la alimenta |
| **5 · Foco por raíz** | ✅ **hecha** — recorrido iluminado + ficha lateral con «qué se rompe» y «qué recibe de vuelta» |
| **6a · El rack en 3D** | ✅ **hecha** — WebGL + texto en DOM · escena clara, rack oscuro · respaldo sin WebGL |
| **6b · Raíces en arco + ficha completa** | ✅ **hecha** — 12 raíces alrededor, 0 rótulos pisándose, ficha con todo lo de la plana |
| **6c · Gavetas y panel** | ✅ **hecha** — la bandeja sale, las de arriba suben, y el piso se explica en **un solo panel** (antes eran hasta once burbujas alrededor del rack: cada una correcta, el conjunto sin orden de lectura) |
| 6d · El cedazo como bandeja tamiz | ✅ hecha en la 6a |
| **7 · La bajada** | ✅ **hecha** — 7 arcos ámbar desde la decisión · resuelve **A1** · y el cedazo ya se abre en 3D |
| **8 · Hoy / propuesto** | ✅ **hecha** — el rack se desvanece, la corriente se apaga y cada fuente dice cómo llega hoy |
| **9 · El recorrido guiado** | ✅ **hecha** — 8 paradas que dejan la escena en su estado, con teclado |
| **10 · Sustituir el diagrama** | ✅ **hecha** — la torre entra en la s10 del informe maestro y en el deck |
| **11 · Pulido y comprobaciones** | ✅ **hecha** — contraste AA, móvil, y `scripts/comprobar-torre.py` con 8 comprobaciones · cierra **A3** y **A4** |
| **12 · Claridad y corriente** | ✅ **hecha** — el cedazo y la decisión dichos directo · un panel por piso en vez de once burbujas · **la corriente vuelve a correr** · 9ª comprobación (`corriente`) y las chapas no se pisan |

## Pendientes detectados durante la construcción

| # | Qué falta | Detectado en |
|---|---|---|
| ~~**A1**~~ | ~~Cuatro raíces no cierran el ciclo.~~ **Resuelto en la fase 7:** recepción recibe el plan de descarga y la ubicación. Las cinco que siguen sin recibir es porque no procede —tasas las produce un tercero; producto, fábricas, crédito y reglas son definiciones, no sucesos— y la ficha lo dice con esas palabras. | — | cerrado en la fase 7 |
| **A2** | **Los cuatro números del pie son los del informe de Fase 1** (~400 personas · 12 dependencias · 22/104/260 procesos · 52 proyectos). El de procesos sigue **en conciliación con Jesús** —el mapa dice 244 y el informe 260—. Si se concilia antes de presentar, cambiar en un solo sitio. | comprobación del modelo, fase 1 |
| ~~**A3**~~ | ~~El rótulo del suelo queda descolgado.~~ **Resuelto en la fase 11:** ahora rotula las dos columnas — «A los lados · las 12 fuentes donde nace el dato». | — | cerrado en la fase 11 |
| ~~**A4**~~ | ~~A 430 px la torre queda ilegible.~~ **Resuelto en la fase 11:** la vista plana no baja de escala 0,52 y se desplaza a lo ancho en vez de encogerse; la 3D da el ancho completo a la ficha y apila la barra del recorrido. | — | cerrado en la fase 11 |

## Fase 12 · claridad y corriente (26-jul)

Tres cosas que el equipo vio y las comprobaciones no:

1. **El cedazo y la decisión no se entendían.** Decían su lema y saltaban al
   detalle. Ahora cada uno abre con una frase que dice *qué es y por qué está
   ahí*: el cedazo, «todo lo que llega se compara contra el catálogo único
   antes de subir»; la decisión, «ningún cálculo de los pisos de abajo se
   convierte en un hecho por sí mismo». Los cuatro pisos declaran esa frase en
   el modelo (`que`) y `c_modelo` la exige con un mínimo de longitud, para que
   no vuelva a degradarse a un lema.

2. **Un piso abría hasta once burbujas** repartidas alrededor del rack. Cada
   una era correcta y el conjunto no se leía: sin orden de lectura, el hilo se
   perdía. Ahora el piso se explica en el **mismo panel lateral** que ya
   explicaba una fuente, de arriba abajo: qué es → qué hace → quién lo hace y
   con qué permiso → dónde está el tope.

3. **La corriente no se movía.** Existía la animación, existían las 16 texturas
   y el avance medido era 0,0 en las 16. `THREE.Clock.getElapsedTime()` llama a
   `getDelta()` por dentro y actualiza `oldTime`, así que el `getDelta()` de la
   misma línea devolvía ~0. Ninguna comprobación lo vio porque ninguna medía el
   avance — solo que las corrientes *existieran*.

De rebote salieron dos defectos que ya estaban antes: la chapa del cedazo se
pisaba con sus dos vecinas (su banda es fina, y a dos líneas no cabe en el
hueco), y el separador de la barra usaba `--tinta-tenue`, un token que este
archivo **no define**.

**Lección repetida, la de siempre:** la pantalla afirmaba un efecto que el
código no producía, y la comprobación que debía cazarlo medía lo de al lado.
Las dos nuevas —`corriente` y el solape de chapas— se rompieron a propósito
antes de darlas por buenas.
