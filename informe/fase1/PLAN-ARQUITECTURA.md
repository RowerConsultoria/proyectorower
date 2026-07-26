# LA TORRE — Modelo interactivo de la arquitectura de IA

**Proyecto Rower · UCAB Consultores para Grupo Kenex**
⚠️ Material interno del equipo consultor.

---

## Qué se construye

Una **página única** que explica cómo se alimenta el sistema: `informe/fase1/arquitectura-ia-kenex.html`.
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
| 4 · El cedazo | pendiente |
| 5 · Foco por raíz | pendiente |
| 6 · Foco por nivel | pendiente |
| 7 · La bajada | pendiente |
| 8 · Hoy / propuesto | pendiente |
| 9 · El recorrido guiado | pendiente |
| 10 · Sustituir el diagrama de la s12 | pendiente |
| 11 · Pulido y comprobaciones | pendiente |

## Pendientes detectados durante la construcción

| # | Qué falta | Detectado en |
|---|---|---|
| **A1** | **Cuatro raíces no cierran el ciclo.** Recepción, desarrollo de producto, fábricas y crédito alimentan la torre y no reciben nada de vuelta. En tres es correcto (el dato viene de fuera y no hay nada que devolver), pero **recepción sí debería recibir**: la orden de ubicación y el plan de descarga bajan del sistema. Decidir si se añade esa bajada o si se dice explícitamente por qué no la hay. | comprobación del modelo, fase 1 |
| **A2** | **Los cuatro números del pie son los del informe de Fase 1** (~400 personas · 12 dependencias · 22/104/260 procesos · 52 proyectos). El de procesos sigue **en conciliación con Jesús** —el mapa dice 244 y el informe 260—. Si se concilia antes de presentar, cambiar en un solo sitio. | comprobación del modelo, fase 1 |
| **A3** | **El rótulo del suelo queda descolgado.** Dice «las raíces · doce sitios donde nace el dato» al pie, pero las tarjetas de raíz están a los lados de la torre, no abajo. O se convierte en rótulo de las dos columnas, o se recompone la base. | fase 2 |
| **A4** | **A 430 px la torre queda ilegible** (escala 0,28). El lienzo fijo la encoge en vez de reorganizarla. En móvil convendría scroll horizontal a escala legible, o una vista apilada. Le pasa lo mismo al organigrama, así que la solución debería servir para los dos. | fase 3 |
