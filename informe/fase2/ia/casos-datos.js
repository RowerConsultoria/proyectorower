/* GENERADO por scripts/generar-casos-ia.js desde ia/orbita-datos.js y ia/casos-evaluacion.json
   — no editar a mano: los cambios van en casos-evaluacion.json y se vuelve a correr el guion. */
window.IA_DOC = {
 "id": "casos",
 "titulo": "Casos de uso de IA priorizados",
 "lede": "El inventario de lo que la IA hará en el grupo, ordenado por valor, viabilidad y riesgo: quién responde por cada caso y cómo se mide su beneficio.",
 "estado": "borrador",
 "version": "0.1",
 "corte": "09-oct-2026",
 "secciones": [
  {
   "id": "metodo",
   "num": "1",
   "titulo": "Cómo se priorizó",
   "estado": "borrador",
   "bloques": [
    "Un **caso de uso** es lo que hace la inteligencia artificial dentro de un módulo de la plataforma: clasificar, proponer, conciliar, explicar o redactar. La [[orbita:inicio|órbita]] propone 85 módulos; 75 tienen una parte de IA. A ellos se suman los usos que viven fuera de la órbita: el asistente del proyecto, que ya está en operación; el uso asistencial con licencias; y la regularización de las herramientas de IA que las áreas ya construyeron por su cuenta.",
    "Cada caso se califica del 1 al 5 en nueve criterios agrupados en tres dimensiones. Cada calificación lleva su evidencia: el freno del circuito que alivia, la práctica actual con su cifra, la entrevista donde se pidió o la decisión de la que depende.",
    {
     "t": "tabla",
     "cab": [
      "Dimensión",
      "Peso",
      "Criterio",
      "1",
      "5"
     ],
     "filas": [
      [
       "Valor",
       "40 %",
       "Frenos que alivia",
       "no alivia ninguno",
       "resuelve un freno que detiene el tren"
      ],
      [
       "",
       "",
       "Volumen",
       "ocasional",
       "diario, varias áreas o alto volumen medido"
      ],
      [
       "",
       "",
       "Pedido del cliente",
       "nadie lo pide",
       "un directivo o dueño de proceso lo pide"
      ],
      [
       "Viabilidad",
       "35 %",
       "Dato disponible",
       "no existe o no se registra",
       "existe, ordenado y accesible hoy"
      ],
      [
       "",
       "",
       "Dependencias",
       "decisiones abiertas u otros módulos",
       "ninguna"
      ],
      [
       "",
       "",
       "Esfuerzo (inverso)",
       "grande, con integraciones nuevas",
       "pequeño, reutiliza lo que hay"
      ],
      [
       "Riesgo (inverso)",
       "25 %",
       "Datos de personas",
       "decisiones sobre personas",
       "sin datos personales"
      ],
      [
       "",
       "",
       "Exposición hacia fuera",
       "habla o publica sin firma",
       "solo uso interno"
      ],
      [
       "",
       "",
       "Autonomía",
       "actúa sobre dinero, precios o inventario sin firma",
       "prepara y una persona firma"
      ]
     ]
    },
    "La **prioridad** es la suma ponderada de las tres medias: 0,40 × valor + 0,35 × viabilidad + 0,25 × riesgo, donde en el riesgo un 5 significa riesgo bajo. Es una herramienta para ordenar la conversación, no un veredicto: la decisión de qué se construye y cuándo es del Comité de Gobierno del Dato e IA, según el ciclo de la [[sec:ciclo|sección 5]].",
    {
     "t": "nota",
     "tipo": "alerta",
     "titulo": "Lo que pesa sobre la viabilidad hoy",
     "x": "Mientras no lleguen las credenciales de administración de Odoo (requisito pendiente desde la Fase 1), todo caso que necesite leer Odoo tiene la viabilidad del dato acotada. Por eso los primeros puestos los ocupan casos cuyo dato ya existe fuera de Odoo o puede pedirse como archivo."
    },
    {
     "t": "kpis",
     "items": [
      {
       "v": "78",
       "x": "casos evaluados"
      },
      {
       "v": "28",
       "x": "en la Ola 1"
      },
      {
       "v": "1",
       "x": "ya en operación"
      },
      {
       "v": "4",
       "x": "con riesgo alto (media ≤ 2,5)"
      }
     ]
    }
   ]
  },
  {
   "id": "top",
   "num": "2",
   "titulo": "Los diez primeros",
   "estado": "borrador",
   "bloques": [
    "Los diez casos con mayor prioridad. La métrica y la meta son propuestas para validar con su dueño; la línea base sale de la práctica actual cuando hay cifra, o se mide en el piloto.",
    {
     "t": "tabla",
     "cab": [
      "#",
      "Caso",
      "Sector",
      "Ola",
      "Prioridad",
      "Se mide",
      "Meta",
      "Dueño"
     ],
     "num": [
      0,
      4
     ],
     "filas": [
      [
       "1",
       "[[mod:m-vigia-de-reservas|Vigía de reservas]]",
       "Planeación y producto",
       "Ola 1",
       "4,45",
       "Reservas huérfanas abiertas y tiempo hasta su liberación",
       "−80 % de reservas huérfanas a los 3 meses y liberación en ≤ 48 h desde la alerta",
       "Director(a) Comercial del Grupo"
      ],
      [
       "2",
       "[[mod:m-vigia-del-stage|Vigía del stage]]",
       "Logística",
       "Ola 1",
       "4,37",
       "Días en stage por orden y órdenes con más de 30 días",
       "−50 % de días promedio en stage y ninguna orden de más de 60 días, a los 4 meses",
       "Analista de Facturación"
      ],
      [
       "3",
       "[[mod:m-cuadre-previo-de-caja|Cuadre previo de caja]]",
       "Finanzas",
       "Ola 2",
       "4,10",
       "Rezago de la conciliación de caja de tiendas en VE",
       "Cuadre por tienda al día siguiente del cierre y rezago ≤ 5 días, a los 4 meses",
       "Gerente de Contabilidad / Administración"
      ],
      [
       "4",
       "[[mod:m-buzon-de-sell-out-de-clientes|Buzón de sell-out de clientes]]",
       "Ventas",
       "Ola 1",
       "4,00",
       "Cobertura de clientes con sell-out normalizado en la semana y filas mapeadas sin corrección",
       "Piloto de 2–3 semanas en paralelo con BI: ≥ 95 % de filas mapeadas sin corrección; a 6 meses, ≥ 80 % de los 41 clientes cargados en su semana",
       "Analista de Sistemas / Datos (célula de BI), dueño del proceso 15.1"
      ],
      [
       "5",
       "[[mod:m-cartera-y-cobranza|Cartera y cobranza]]",
       "Finanzas",
       "Ola 2",
       "3,88",
       "Cobros sin registrar de más de 30 días y tiempo de aplicación del pago (indicador 13.6)",
       "Ningún cobro sin registrar de más de 30 días y aplicación el mismo día en ≥ 80 % de los pagos, a los 6 meses",
       "Coordinador(a) de Tesorería / Cobranzas (Cobranza)"
      ],
      [
       "6",
       "[[mod:m-demanda-y-s-op|Demanda y S&OP]]",
       "Compras",
       "Ola 1",
       "3,87",
       "Faltantes registrados con su motivo y demanda no atendida por SKU",
       "≥ 90 % de líneas recortadas o venta perdida registradas con motivo, a los 3 meses",
       "Comité Comercial / Director de Compras y Cadena de Suministros"
      ],
      [
       "7",
       "Uso asistencial con licencias corporativas de Claude",
       "Gobierno y personas",
       "Ola 1",
       "3,87",
       "Licencias con uso semanal y casos documentados por área",
       "≥ 80 % de las licencias con uso semanal a los 60 días (indicador del 5.3) y al menos un caso documentado por área a los 90 días",
       "Gobierno de IA, unidad de la Presidencia (en el manual, Gerente de Tecnología / Sistemas del 5.1)"
      ],
      [
       "8",
       "[[mod:m-reporte-pci-a-casio|Reporte PCI a Casio]]",
       "Compras",
       "Ola 1",
       "3,85",
       "Día hábil en que el borrador del PCI está listo y días-persona del cierre",
       "Borrador listo el día hábil 3 y ≤ 1 día de revisión, tras 3 cierres",
       "Comité Comercial / Director de Compras y Cadena de Suministros"
      ],
      [
       "9",
       "[[mod:m-torre-retail-y-cuadro-diario|Torre retail y cuadro diario]]",
       "Ventas",
       "Ola 1",
       "3,85",
       "Hora a la que el cuadro diario de todas las tiendas está listo y alertas útiles de anomalía",
       "Cuadro regional listo a las 9:00 del día siguiente para el 100 % de las tiendas, a los 2 meses",
       "Gerente Regional Comercial / Retail (proceso 9.2)"
      ],
      [
       "10",
       "[[mod:m-cuadre-entre-empresas|Cuadre entre empresas]]",
       "Finanzas",
       "Ola 4",
       "3,80",
       "Frecuencia y rezago del cuadre entre empresas",
       "Cuadre mensual cerrado en ≤ 10 días hábiles, desde el tercer mes",
       "Coordinador(a) de Tesorería / Cobranzas, bajo el Gerente de Tesorería"
      ]
     ]
    },
    {
     "t": "fichas",
     "items": [
      {
       "titulo": "1. Vigía de reservas",
       "chips": [
        "Ola 1",
        "nivel 2",
        "prioridad 4,45",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "marca las reservas huérfanas y los pedidos anulados que siguen reservando stock, y avisa al dueño (2)."
        ],
        [
         "Quién firma",
         "liberar una reserva."
        ],
        [
         "Procesos",
         "[[proc:2.6]] · [[proc:7.2]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:10b.2]]"
        ],
        [
         "En la órbita",
         "[[mod:m-vigia-de-reservas|ver el módulo]]"
        ],
        [
         "Se mide",
         "Reservas huérfanas abiertas y tiempo hasta su liberación"
        ],
        [
         "Línea base",
         "Por medir; hoy hay mercancía «reservada tres veces» (M37)"
        ],
        [
         "Meta",
         "−80 % de reservas huérfanas a los 3 meses y liberación en ≤ 48 h desde la alerta"
        ],
        [
         "Se revisa si",
         "< 50 % de alertas atendidas en un mes"
        ],
        [
         "Dueño",
         "Director(a) Comercial del Grupo"
        ],
        [
         "Opera",
         "Vendedores y coordinación de inventarios"
        ],
        [
         "Firma",
         "Dueño de la reserva con su gerente comercial (liberar una reserva)"
        ],
        [
         "Calificación",
         "Valor 5,0 (frenos 5 · volumen 5 · pedido 5) · Viabilidad 3,7 (dato 3 · dependencias 4 · esfuerzo 4) · Riesgo 4,7 (personas 5 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "Resuelve 10b.2 (detiene) y operaciones de VE pide una rutina diaria de limpieza, que llama «el principal problema». Es una lista con alertas sobre Odoo en todas las instancias y liberar sigue siendo firma."
        ],
        [
         "Evidencia",
         "M37 · freno:10b.2 · freno:7.3 · E-34:129 · E-34:121 · E-35:98 · E-16:75 · propuestas-to-be.md:126 · propuestas-to-be.md:906 · arquitectura-ia.html:754"
        ]
       ]
      },
      {
       "titulo": "2. Vigía del stage",
       "chips": [
        "Ola 1",
        "nivel 2",
        "prioridad 4,37",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "marca como confirmado el pago que ya está en Odoo, avisa al vendedor de lo que espera al cliente y alerta por antigüedad (2)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:7.4]] · [[proc:7.5]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:9a.1]]"
        ],
        [
         "En la órbita",
         "[[mod:m-vigia-del-stage|ver el módulo]]"
        ],
        [
         "Se mide",
         "Días en stage por orden y órdenes con más de 30 días"
        ],
        [
         "Línea base",
         "Hasta 200 días en el stage, el 70 % del tiempo es espera y el stage está al 110 % (M46)"
        ],
        [
         "Meta",
         "−50 % de días promedio en stage y ninguna orden de más de 60 días, a los 4 meses"
        ],
        [
         "Se revisa si",
         "Sin mejora del promedio a los 3 meses"
        ],
        [
         "Dueño",
         "Analista de Facturación"
        ],
        [
         "Opera",
         "Tráfico y vendedores del mayor"
        ],
        [
         "Firma",
         "No requiere para avisar; se propone que el analista de facturación revise cada semana las marcas de pago"
        ],
        [
         "Calificación",
         "Valor 5,0 (frenos 5 · volumen 5 · pedido 5) · Viabilidad 3,7 (dato 3 · dependencias 4 · esfuerzo 4) · Riesgo 4,3 (personas 5 · exposición 5 · autonomía 3)"
        ],
        [
         "Por qué",
         "Resuelve 9a.1 (detiene) a diario y la dirección pide que el despacho sea «mucho más automatizado», sin el vendedor de intermediario. Solo lee Odoo y avisa, pero marca en nivel 2 el pago como confirmado, sin firma."
        ],
        [
         "Evidencia",
         "M46 · freno:9a.1 · freno:9a.2 · SC-01:316 · SC-01:309 · SC-01:319 · SC-01:279 · propuestas-to-be.md:301 · propuestas-to-be.md:907 · arquitectura-ia.html:763"
        ]
       ]
      },
      {
       "titulo": "3. Cuadre previo de caja",
       "chips": [
        "Ola 2",
        "nivel 2",
        "prioridad 4,10",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "cuadra por adelantado y marca las diferencias (2)."
        ],
        [
         "Quién firma",
         "valida contabilidad."
        ],
        [
         "Procesos",
         "[[proc:12.2]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:17.1]] · [[freno:19.1]]"
        ],
        [
         "En la órbita",
         "[[mod:m-cuadre-previo-de-caja|ver el módulo]]"
        ],
        [
         "Se mide",
         "Rezago de la conciliación de caja de tiendas en VE"
        ],
        [
         "Línea base",
         "8–10 personas concilian con ~2 meses de atraso (M62)"
        ],
        [
         "Meta",
         "Cuadre por tienda al día siguiente del cierre y rezago ≤ 5 días, a los 4 meses"
        ],
        [
         "Se revisa si",
         "Rezago > 30 días a los 3 meses"
        ],
        [
         "Dueño",
         "Gerente de Contabilidad / Administración"
        ],
        [
         "Opera",
         "Analista contable de VE"
        ],
        [
         "Firma",
         "Contabilidad (valida)"
        ],
        [
         "Calificación",
         "Valor 5,0 (frenos 5 · volumen 5 · pedido 5) · Viabilidad 2,7 (dato 3 · dependencias 2 · esfuerzo 3) · Riesgo 4,7 (personas 5 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "Aporta a 17.1 y 19.1 (detienen) a diario en cada tienda, y la contabilidad de VE pide que el sistema le dé la herramienta para dejar la revisión manual. Depende de los conectores de bancos de VE y del reporte Z; solo cuadra y marca diferencias."
        ],
        [
         "Evidencia",
         "M62 · freno:17.1 · freno:19.1 · freno:15c.2 · E-38:52 · E-38:54 · E-07:86 · propuestas-to-be.md:620 · propuestas-to-be.md:917 · arquitectura-ia.html:779"
        ]
       ]
      },
      {
       "titulo": "4. Buzón de sell-out de clientes",
       "chips": [
        "Ola 1",
        "nivel 1·2",
        "prioridad 4,00",
        "prototipo"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "reconoce el formato de cada Excel y lo normaliza (2); pide al cliente lo que falta (1)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:8.7]] · [[proc:8.17]] · [[proc:15.1]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:20.1]]"
        ],
        [
         "En la órbita",
         "[[mod:m-buzon-de-sell-out-de-clientes|ver el módulo]]"
        ],
        [
         "Se mide",
         "Cobertura de clientes con sell-out normalizado en la semana y filas mapeadas sin corrección"
        ],
        [
         "Línea base",
         "41 clientes en 41 formatos y más de 1.000 tiendas, reenviados por el vendedor a BI (M93); en Colombia ~30 min cada lunes a cargo de una persona (M94)"
        ],
        [
         "Meta",
         "Piloto de 2–3 semanas en paralelo con BI: ≥ 95 % de filas mapeadas sin corrección; a 6 meses, ≥ 80 % de los 41 clientes cargados en su semana"
        ],
        [
         "Se revisa si",
         "< 90 % de filas correctas frente a la tabla de BI en el piloto"
        ],
        [
         "Dueño",
         "Analista de Sistemas / Datos (célula de BI), dueño del proceso 15.1"
        ],
        [
         "Opera",
         "Analista de Sistemas / Datos (ETL); el vendedor y el KAM consultan la tabla"
        ],
        [
         "Firma",
         "Ninguna en la órbita; se propone que el Analista de Sistemas / Datos valide cada formato nuevo y los alias bajo el umbral, porque la tabla alimenta el pronóstico"
        ],
        [
         "Calificación",
         "Valor 5,0 (frenos 5 · volumen 5 · pedido 5) · Viabilidad 3,3 (dato 3 · dependencias 3 · esfuerzo 4) · Riesgo 3,3 (personas 4 · exposición 3 · autonomía 3)"
        ],
        [
         "Por qué",
         "Resuelve un freno que detiene (20.1), con volumen alto y pedido de la Presidencia y de la dirección comercial, y puede operar sin Odoo. Es el prototipo 3 (P3) de la Fase 2, decidido el 09-oct y documentado sin construir; el traspaso desde Fabric (decisión 7) sigue abierto."
        ],
        [
         "Evidencia",
         "freno:20.1 · freno:20.2 · freno:20.3 · M93 · M94 · E-01:87 · E-63:123 · E-05:166 · E-18:33 · E-18:73 · decision:7 · arquitectura-ia.html:857"
        ]
       ]
      },
      {
       "titulo": "5. Cartera y cobranza",
       "chips": [
        "Ola 2",
        "nivel 1·2",
        "prioridad 3,88",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "lee el comprobante y propone su desglose (1); persigue cada soporte faltante (2)."
        ],
        [
         "Quién firma",
         "CxC valida los pagos."
        ],
        [
         "Procesos",
         "[[proc:13.6]] · [[proc:8.15]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:16.2]] · [[freno:19.1]]"
        ],
        [
         "En la órbita",
         "[[mod:m-cartera-y-cobranza|ver el módulo]]"
        ],
        [
         "Se mide",
         "Cobros sin registrar de más de 30 días y tiempo de aplicación del pago (indicador 13.6)"
        ],
        [
         "Línea base",
         "Meses de cobros sin registrar, ~960 documentos al día a un Excel y hasta 20 abonos por factura (M80, M79, M78)"
        ],
        [
         "Meta",
         "Ningún cobro sin registrar de más de 30 días y aplicación el mismo día en ≥ 80 % de los pagos, a los 6 meses"
        ],
        [
         "Se revisa si",
         "Rezago > 60 días a los 3 meses"
        ],
        [
         "Dueño",
         "Coordinador(a) de Tesorería / Cobranzas (Cobranza)"
        ],
        [
         "Opera",
         "Analista de cuentas por cobrar y vendedores"
        ],
        [
         "Firma",
         "Cuentas por cobrar (valida los pagos)"
        ],
        [
         "Calificación",
         "Valor 5,0 (frenos 5 · volumen 5 · pedido 5) · Viabilidad 3,0 (dato 3 · dependencias 3 · esfuerzo 3) · Riesgo 3,3 (personas 3 · exposición 4 · autonomía 3)"
        ],
        [
         "Por qué",
         "Resuelve 16.2 (detiene) con volumen diario y la dirección pide la cartera analizada y lista para actuar. Lee comprobantes con datos de pagadores y propone desgloses de dinero en nivel 1; los recordatorios van a los vendedores."
        ],
        [
         "Evidencia",
         "M78 · M79 · M80 · M81 · freno:16.2 · freno:16.4 · freno:19.1 · E-08:170 · E-39:50 · E-35:120 · E-48:48 · E-62:172 · propuestas-to-be.md:664 · propuestas-to-be.md:956 · arquitectura-ia.html:797"
        ]
       ]
      },
      {
       "titulo": "6. Demanda y S&OP",
       "chips": [
        "Ola 1",
        "nivel 1·2",
        "prioridad 3,87",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "registra cada faltante con su motivo (2) y explica el sugerido (1)."
        ],
        [
         "Quién firma",
         "decide la dirección de compras."
        ],
        [
         "Procesos",
         "[[proc:6.1]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:1.1]] · [[freno:7.1]]"
        ],
        [
         "En la órbita",
         "[[mod:m-demanda-y-s-op|ver el módulo]]"
        ],
        [
         "Se mide",
         "Faltantes registrados con su motivo y demanda no atendida por SKU"
        ],
        [
         "Línea base",
         "Hoy 0 %: lo que no hay se borra del pedido (M03)"
        ],
        [
         "Meta",
         "≥ 90 % de líneas recortadas o venta perdida registradas con motivo, a los 3 meses"
        ],
        [
         "Se revisa si",
         "< 50 % de faltantes registrados a los 3 meses"
        ],
        [
         "Dueño",
         "Comité Comercial / Director de Compras y Cadena de Suministros"
        ],
        [
         "Opera",
         "Planificador(a) de la demanda"
        ],
        [
         "Firma",
         "Dirección de compras"
        ],
        [
         "Calificación",
         "Valor 5,0 (frenos 5 · volumen 5 · pedido 5) · Viabilidad 2,0 (dato 2 · dependencias 2 · esfuerzo 2) · Riesgo 4,7 (personas 5 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "Resuelve 1.1 y 7.1 (detienen), toca cada pedido de todos los canales y la gerencia comercial lo llama «la prioridad número uno». El dato hoy no se registra y depende del buzón de sell-out y del registro de venta perdida en tienda."
        ],
        [
         "Evidencia",
         "M02 · M03 · M95 · freno:1.1 · freno:7.1 · E-05:154 · E-40:184 · E-08:141 · E-10:164 · propuestas-to-be.md:200 · propuestas-to-be.md:932 · arquitectura-ia.html:720"
        ]
       ]
      },
      {
       "titulo": "7. Uso asistencial con licencias corporativas de Claude",
       "chips": [
        "Ola 1",
        "nivel 1",
        "prioridad 3,87",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "Asistente de uso general para directivos y gerentes (redactar, analizar hojas de cálculo, resumir y preparar reuniones). Funciona con licencias corporativas, formación y la política de uso, y reemplaza las cuentas pagadas por cada persona."
        ],
        [
         "Quién firma",
         "Cada usuario responde por lo que produce; nada sale sin la revisión de su autor."
        ],
        [
         "Procesos",
         "[[proc:5.3]] · [[proc:5.1]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         ""
        ],
        [
         "Se mide",
         "Licencias con uso semanal y casos documentados por área"
        ],
        [
         "Línea base",
         "Uso individual con cuentas personales; se propone no menos de 50 licencias (SC-10:155) y hay 70 personas formadas como multiplicadores (SC-10:160)"
        ],
        [
         "Meta",
         "≥ 80 % de las licencias con uso semanal a los 60 días (indicador del 5.3) y al menos un caso documentado por área a los 90 días"
        ],
        [
         "Se revisa si",
         "< 50 % de uso semanal a los 90 días, o un incidente con datos"
        ],
        [
         "Dueño",
         "Gobierno de IA, unidad de la Presidencia (en el manual, Gerente de Tecnología / Sistemas del 5.1)"
        ],
        [
         "Opera",
         "Directivos y gerentes con licencia"
        ],
        [
         "Firma",
         "No requiere firma por uso; la Presidencia aprueba la asignación de licencias y la Dirección de Tecnología, Gobernanza y Riesgo las administra"
        ],
        [
         "Calificación",
         "Valor 3,7 (frenos 1 · volumen 5 · pedido 5) · Viabilidad 4,0 (dato 5 · dependencias 2 · esfuerzo 5) · Riesgo 4,0 (personas 3 · exposición 4 · autonomía 5)"
        ],
        [
         "Por qué",
         "Quick win 2 de la Fase 1: no hay que construir nada y la Presidencia pide definir las licencias y arrancar. Faltan dos decisiones de dirección (cobertura con su presupuesto y política de uso). No alivia un freno concreto del circuito."
        ],
        [
         "Evidencia",
         "IF1:2364 · SC-10:155 · SC-10:157 · SC-10:160 · SC-12:53 · SC-09:205 · E-26:601 · M119"
        ]
       ]
      },
      {
       "titulo": "8. Reporte PCI a Casio",
       "chips": [
        "Ola 1",
        "nivel 1",
        "prioridad 3,85",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "prepara el borrador entre los días 1 y 10, con los ajustes explicados (1)."
        ],
        [
         "Quién firma",
         "el envío a Casio."
        ],
        [
         "Procesos",
         "[[proc:6.3]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:PCI.1]]"
        ],
        [
         "En la órbita",
         "[[mod:m-reporte-pci-a-casio|ver el módulo]]"
        ],
        [
         "Se mide",
         "Día hábil en que el borrador del PCI está listo y días-persona del cierre"
        ],
        [
         "Línea base",
         "Los primeros 10 días de cada mes de una sola persona (M98)"
        ],
        [
         "Meta",
         "Borrador listo el día hábil 3 y ≤ 1 día de revisión, tras 3 cierres"
        ],
        [
         "Se revisa si",
         "Borrador después del día hábil 6 en dos meses seguidos"
        ],
        [
         "Dueño",
         "Comité Comercial / Director de Compras y Cadena de Suministros"
        ],
        [
         "Opera",
         "Analista de reportería de compras"
        ],
        [
         "Firma",
         "Dirección de compras (el envío a Casio)"
        ],
        [
         "Calificación",
         "Valor 4,0 (frenos 5 · volumen 4 · pedido 3) · Viabilidad 3,3 (dato 3 · dependencias 3 · esfuerzo 4) · Riesgo 4,3 (personas 5 · exposición 3 · autonomía 5)"
        ],
        [
         "Por qué",
         "Resuelve PCI.1 (detiene) y libera 10 días al mes de una persona, pero nadie pide el cambio. Es un informe sobre el espejo que sale a Casio con firma; falta confirmar el formato exigido y es lo primero que baja si se recorta la Ola 1."
        ],
        [
         "Evidencia",
         "M98 · freno:PCI.1 · E-10:204 · E-10:210 · E-10:305 · propuestas-to-be.md:235 · propuestas-to-be.md:961 · decision:17 · arquitectura-ia.html:814"
        ]
       ]
      },
      {
       "titulo": "9. Torre retail y cuadro diario",
       "chips": [
        "Ola 1",
        "nivel 2",
        "prioridad 3,85",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "alerta de anomalías (2)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:9.2]] · [[proc:9.5]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-torre-retail-y-cuadro-diario|ver el módulo]]"
        ],
        [
         "Se mide",
         "Hora a la que el cuadro diario de todas las tiendas está listo y alertas útiles de anomalía"
        ],
        [
         "Línea base",
         "Cada tienda descarga el cierre y lo digita en un cuadro compartido; las anomalías se ven «a ojo» (M61; E-47:269); el reporte de retail toma 3 días (M05)"
        ],
        [
         "Meta",
         "Cuadro regional listo a las 9:00 del día siguiente para el 100 % de las tiendas, a los 2 meses"
        ],
        [
         "Se revisa si",
         "> 30 % de alertas falsas en un mes"
        ],
        [
         "Dueño",
         "Gerente Regional Comercial / Retail (proceso 9.2)"
        ],
        [
         "Opera",
         "Gerente de Tienda (visto del cierre) y Gerente Regional Comercial / Retail"
        ],
        [
         "Firma",
         "No requiere: la alerta es informativa; el gerente de tienda da el visto al cuadro"
        ],
        [
         "Calificación",
         "Valor 4,0 (frenos 3 · volumen 4 · pedido 5) · Viabilidad 3,3 (dato 3 · dependencias 3 · esfuerzo 4) · Riesgo 4,3 (personas 4 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "La dueña del proceso 9.2 lo pide de forma explícita y es diario; sale del POS que ya está en Odoo. Ojo: el área ya construye su propia torre de control (E-55:32), que hay que absorber y no duplicar."
        ],
        [
         "Evidencia",
         "M61 · M05 · freno:15c.1 · freno:20.2 · E-55:82 · E-55:56 · E-47:269 · E-55:32"
        ]
       ]
      },
      {
       "titulo": "10. Cuadre entre empresas",
       "chips": [
        "Ola 4",
        "nivel 2",
        "prioridad 3,80",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "cuadra y explica las diferencias (2)."
        ],
        [
         "Quién firma",
         "contabilidad."
        ],
        [
         "Procesos",
         "[[proc:13.7]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:18.1]]"
        ],
        [
         "En la órbita",
         "[[mod:m-cuadre-entre-empresas|ver el módulo]]"
        ],
        [
         "Se mide",
         "Frecuencia y rezago del cuadre entre empresas"
        ],
        [
         "Línea base",
         "Un ejercicio de 2 meses, manual e irregular (M85)"
        ],
        [
         "Meta",
         "Cuadre mensual cerrado en ≤ 10 días hábiles, desde el tercer mes"
        ],
        [
         "Se revisa si",
         "Dos meses seguidos sin cuadre"
        ],
        [
         "Dueño",
         "Coordinador(a) de Tesorería / Cobranzas, bajo el Gerente de Tesorería"
        ],
        [
         "Opera",
         "Analistas de cuentas por cobrar y por pagar"
        ],
        [
         "Firma",
         "Contabilidad"
        ],
        [
         "Calificación",
         "Valor 3,7 (frenos 5 · volumen 3 · pedido 3) · Viabilidad 3,3 (dato 3 · dependencias 4 · esfuerzo 3) · Riesgo 4,7 (personas 5 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "Resuelve 18.1 (detiene) con volumen mensual y solo hay dolor en entrevistas. Lee las tres instancias de Odoo, cuadra y explica sin cambiar registros."
        ],
        [
         "Evidencia",
         "M85 · freno:18.1 · freno:18.3 · E-61:54 · E-61:266 · E-62:184 · propuestas-to-be.md:672 · propuestas-to-be.md:958 · arquitectura-ia.html:802"
        ]
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "mapa",
   "num": "3",
   "titulo": "Valor frente a viabilidad",
   "estado": "borrador",
   "bloques": [
    "Cada punto es un caso: más arriba, más valor; más a la derecha, más viable hoy. El color indica la ola en que la órbita lo construye. Los casos con la misma calificación se muestran juntos alrededor de su posición. Al pasar el puntero o enfocar un punto se ve su detalle.",
    {
     "t": "fig",
     "svg": "<svg class=\"viz\" viewBox=\"0 0 760 520\" role=\"img\" aria-label=\"Dispersión de los 78 casos: valor en el eje vertical, viabilidad en el horizontal; color por ola. La tabla completa está en el inventario.\"><circle cx=\"70\" cy=\"16\" r=\"5\" fill=\"var(--s1)\" class=\"pt\"/><text x=\"82\" y=\"20\">Ola 1</text><circle cx=\"190\" cy=\"16\" r=\"5\" fill=\"var(--s2)\" class=\"pt\"/><text x=\"202\" y=\"20\">Ola 2</text><circle cx=\"310\" cy=\"16\" r=\"5\" fill=\"var(--s3)\" class=\"pt\"/><text x=\"322\" y=\"20\">Olas 3 y 4</text><text x=\"736\" y=\"20\" text-anchor=\"end\" class=\"eje\">número = puesto en el top 10</text><line class=\"grilla\" x1=\"101.33333333333333\" y1=\"64\" x2=\"101.33333333333333\" y2=\"462\"/><line class=\"grilla\" x1=\"64\" y1=\"439.88888888888886\" x2=\"736\" y2=\"439.88888888888886\"/><text class=\"eje\" x=\"101.33333333333333\" y=\"480\" text-anchor=\"middle\">1</text><text class=\"eje\" x=\"54\" y=\"443.88888888888886\" text-anchor=\"end\">1</text><line class=\"grilla\" x1=\"250.66666666666669\" y1=\"64\" x2=\"250.66666666666669\" y2=\"462\"/><line class=\"grilla\" x1=\"64\" y1=\"351.44444444444446\" x2=\"736\" y2=\"351.44444444444446\"/><text class=\"eje\" x=\"250.66666666666669\" y=\"480\" text-anchor=\"middle\">2</text><text class=\"eje\" x=\"54\" y=\"355.44444444444446\" text-anchor=\"end\">2</text><line class=\"grilla\" x1=\"400\" y1=\"64\" x2=\"400\" y2=\"462\"/><line class=\"grilla\" x1=\"64\" y1=\"263\" x2=\"736\" y2=\"263\"/><text class=\"eje\" x=\"400\" y=\"480\" text-anchor=\"middle\">3</text><text class=\"eje\" x=\"54\" y=\"267\" text-anchor=\"end\">3</text><line class=\"grilla\" x1=\"549.3333333333333\" y1=\"64\" x2=\"549.3333333333333\" y2=\"462\"/><line class=\"grilla\" x1=\"64\" y1=\"174.55555555555554\" x2=\"736\" y2=\"174.55555555555554\"/><text class=\"eje\" x=\"549.3333333333333\" y=\"480\" text-anchor=\"middle\">4</text><text class=\"eje\" x=\"54\" y=\"178.55555555555554\" text-anchor=\"end\">4</text><line class=\"grilla\" x1=\"698.6666666666666\" y1=\"64\" x2=\"698.6666666666666\" y2=\"462\"/><line class=\"grilla\" x1=\"64\" y1=\"86.11111111111111\" x2=\"736\" y2=\"86.11111111111111\"/><text class=\"eje\" x=\"698.6666666666666\" y=\"480\" text-anchor=\"middle\">5</text><text class=\"eje\" x=\"54\" y=\"90.11111111111111\" text-anchor=\"end\">5</text><line class=\"guia\" x1=\"400\" y1=\"64\" x2=\"400\" y2=\"462\"/><line class=\"guia\" x1=\"64\" y1=\"263\" x2=\"736\" y2=\"263\"/><text class=\"cuad\" x=\"736\" y=\"52\" text-anchor=\"end\">↗ más valor y más viable: primero</text><text class=\"cuad\" x=\"64\" y=\"52\">↖ más valor, hay que preparar el terreno</text><text x=\"400\" y=\"506\" text-anchor=\"middle\">Viabilidad →</text><text transform=\"translate(18 263) rotate(-90)\" text-anchor=\"middle\">Valor →</text><circle class=\"pt\" cx=\"499.6\" cy=\"76.9\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"499.6\" cy=\"76.9\" r=\"12\" tabindex=\"0\" data-tip=\"#1 Vigía de reservas\nValor 5,0 · Viabilidad 3,7 · Riesgo 4,7\nPrioridad 4,45 · Ola 1\" aria-label=\"#1 Vigía de reservas. Valor 5,0 · Viabilidad 3,7 · Riesgo 4,7. Prioridad 4,45 · Ola 1\"/><circle class=\"pt\" cx=\"499.6\" cy=\"95.3\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"499.6\" cy=\"95.3\" r=\"12\" tabindex=\"0\" data-tip=\"#2 Vigía del stage\nValor 5,0 · Viabilidad 3,7 · Riesgo 4,3\nPrioridad 4,37 · Ola 1\" aria-label=\"#2 Vigía del stage. Valor 5,0 · Viabilidad 3,7 · Riesgo 4,3. Prioridad 4,37 · Ola 1\"/><circle class=\"pt\" cx=\"350.2\" cy=\"76.9\" r=\"5\" fill=\"var(--s2)\"/><circle class=\"hit\" cx=\"350.2\" cy=\"76.9\" r=\"12\" tabindex=\"0\" data-tip=\"#3 Cuadre previo de caja\nValor 5,0 · Viabilidad 2,7 · Riesgo 4,7\nPrioridad 4,10 · Ola 2\" aria-label=\"#3 Cuadre previo de caja. Valor 5,0 · Viabilidad 2,7 · Riesgo 4,7. Prioridad 4,10 · Ola 2\"/><circle class=\"pt\" cx=\"350.2\" cy=\"95.3\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"350.2\" cy=\"95.3\" r=\"12\" tabindex=\"0\" data-tip=\"#20 Expediente único de garantía\nValor 5,0 · Viabilidad 2,7 · Riesgo 3,0\nPrioridad 3,68 · Ola 1\" aria-label=\"#20 Expediente único de garantía. Valor 5,0 · Viabilidad 2,7 · Riesgo 3,0. Prioridad 3,68 · Ola 1\"/><circle class=\"pt\" cx=\"449.8\" cy=\"86.1\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"449.8\" cy=\"86.1\" r=\"12\" tabindex=\"0\" data-tip=\"#4 Buzón de sell-out de clientes\nValor 5,0 · Viabilidad 3,3 · Riesgo 3,3\nPrioridad 4,00 · Ola 1\" aria-label=\"#4 Buzón de sell-out de clientes. Valor 5,0 · Viabilidad 3,3 · Riesgo 3,3. Prioridad 4,00 · Ola 1\"/><circle class=\"pt\" cx=\"400.0\" cy=\"86.1\" r=\"5\" fill=\"var(--s2)\"/><circle class=\"hit\" cx=\"400.0\" cy=\"86.1\" r=\"12\" tabindex=\"0\" data-tip=\"#5 Cartera y cobranza\nValor 5,0 · Viabilidad 3,0 · Riesgo 3,3\nPrioridad 3,88 · Ola 2\" aria-label=\"#5 Cartera y cobranza. Valor 5,0 · Viabilidad 3,0 · Riesgo 3,3. Prioridad 3,88 · Ola 2\"/><circle class=\"pt\" cx=\"250.7\" cy=\"86.1\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"250.7\" cy=\"86.1\" r=\"12\" tabindex=\"0\" data-tip=\"#6 Demanda y S&amp;OP\nValor 5,0 · Viabilidad 2,0 · Riesgo 4,7\nPrioridad 3,87 · Ola 1\" aria-label=\"#6 Demanda y S&amp;OP. Valor 5,0 · Viabilidad 2,0 · Riesgo 4,7. Prioridad 3,87 · Ola 1\"/><circle class=\"pt\" cx=\"549.3\" cy=\"204.0\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"549.3\" cy=\"204.0\" r=\"12\" tabindex=\"0\" data-tip=\"#7 Uso asistencial con licencias corporativas de Claude\nValor 3,7 · Viabilidad 4,0 · Riesgo 4,0\nPrioridad 3,87 · Ola 1\" aria-label=\"#7 Uso asistencial con licencias corporativas de Claude. Valor 3,7 · Viabilidad 4,0 · Riesgo 4,0. Prioridad 3,87 · Ola 1\"/><circle class=\"pt\" cx=\"449.8\" cy=\"165.4\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"449.8\" cy=\"165.4\" r=\"12\" tabindex=\"0\" data-tip=\"#8 Reporte PCI a Casio\nValor 4,0 · Viabilidad 3,3 · Riesgo 4,3\nPrioridad 3,85 · Ola 1\" aria-label=\"#8 Reporte PCI a Casio. Valor 4,0 · Viabilidad 3,3 · Riesgo 4,3. Prioridad 3,85 · Ola 1\"/><circle class=\"pt\" cx=\"449.8\" cy=\"183.8\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"449.8\" cy=\"183.8\" r=\"12\" tabindex=\"0\" data-tip=\"#9 Torre retail y cuadro diario\nValor 4,0 · Viabilidad 3,3 · Riesgo 4,3\nPrioridad 3,85 · Ola 1\" aria-label=\"#9 Torre retail y cuadro diario. Valor 4,0 · Viabilidad 3,3 · Riesgo 4,3. Prioridad 3,85 · Ola 1\"/><circle class=\"pt\" cx=\"449.8\" cy=\"204.0\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"449.8\" cy=\"204.0\" r=\"12\" tabindex=\"0\" data-tip=\"#10 Cuadre entre empresas\nValor 3,7 · Viabilidad 3,3 · Riesgo 4,7\nPrioridad 3,80 · Ola 4\" aria-label=\"#10 Cuadre entre empresas. Valor 3,7 · Viabilidad 3,3 · Riesgo 4,7. Prioridad 3,80 · Ola 4\"/><circle class=\"pt\" cx=\"499.6\" cy=\"233.5\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"499.6\" cy=\"233.5\" r=\"12\" tabindex=\"0\" data-tip=\"#11 Plan de temporada\nValor 3,3 · Viabilidad 3,7 · Riesgo 4,7\nPrioridad 3,78 · Ola 1\" aria-label=\"#11 Plan de temporada. Valor 3,3 · Viabilidad 3,7 · Riesgo 4,7. Prioridad 3,78 · Ola 1\"/><circle class=\"pt\" cx=\"400.0\" cy=\"115.6\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"400.0\" cy=\"115.6\" r=\"12\" tabindex=\"0\" data-tip=\"#12 Aprobación comercial por reglas\nValor 4,7 · Viabilidad 3,0 · Riesgo 3,3\nPrioridad 3,75 · Ola 1\" aria-label=\"#12 Aprobación comercial por reglas. Valor 4,7 · Viabilidad 3,0 · Riesgo 3,3. Prioridad 3,75 · Ola 1\"/><circle class=\"pt\" cx=\"400.0\" cy=\"174.6\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"400.0\" cy=\"174.6\" r=\"12\" tabindex=\"0\" data-tip=\"#13 Reposición a tiendas y web\nValor 4,0 · Viabilidad 3,0 · Riesgo 4,3\nPrioridad 3,73 · Ola 3\" aria-label=\"#13 Reposición a tiendas y web. Valor 4,0 · Viabilidad 3,0 · Riesgo 4,3. Prioridad 3,73 · Ola 3\"/><circle class=\"pt\" cx=\"300.4\" cy=\"76.9\" r=\"5\" fill=\"var(--s2)\"/><circle class=\"hit\" cx=\"300.4\" cy=\"76.9\" r=\"12\" tabindex=\"0\" data-tip=\"#14 Conciliación de plataformas\nValor 5,0 · Viabilidad 2,3 · Riesgo 3,7\nPrioridad 3,73 · Ola 2\" aria-label=\"#14 Conciliación de plataformas. Valor 5,0 · Viabilidad 2,3 · Riesgo 3,7. Prioridad 3,73 · Ola 2\"/><circle class=\"pt\" cx=\"300.4\" cy=\"95.3\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"300.4\" cy=\"95.3\" r=\"12\" tabindex=\"0\" data-tip=\"#15 Tránsito internacional\nValor 5,0 · Viabilidad 2,3 · Riesgo 3,7\nPrioridad 3,73 · Ola 1\" aria-label=\"#15 Tránsito internacional. Valor 5,0 · Viabilidad 2,3 · Riesgo 3,7. Prioridad 3,73 · Ola 1\"/><circle class=\"pt\" cx=\"350.2\" cy=\"162.2\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"350.2\" cy=\"162.2\" r=\"12\" tabindex=\"0\" data-tip=\"#16 Mesa de ayuda de tiendas\nValor 4,0 · Viabilidad 2,7 · Riesgo 4,7\nPrioridad 3,70 · Ola 4\" aria-label=\"#16 Mesa de ayuda de tiendas. Valor 4,0 · Viabilidad 2,7 · Riesgo 4,7. Prioridad 3,70 · Ola 4\"/><circle class=\"pt\" cx=\"362.6\" cy=\"174.6\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"362.6\" cy=\"174.6\" r=\"12\" tabindex=\"0\" data-tip=\"#17 Pronóstico base\nValor 4,0 · Viabilidad 2,7 · Riesgo 4,7\nPrioridad 3,70 · Ola 1\" aria-label=\"#17 Pronóstico base. Valor 4,0 · Viabilidad 2,7 · Riesgo 4,7. Prioridad 3,70 · Ola 1\"/><circle class=\"pt\" cx=\"350.2\" cy=\"187.0\" r=\"5\" fill=\"var(--s2)\"/><circle class=\"hit\" cx=\"350.2\" cy=\"187.0\" r=\"12\" tabindex=\"0\" data-tip=\"#21 Costo en destino\nValor 4,0 · Viabilidad 2,7 · Riesgo 4,3\nPrioridad 3,62 · Ola 2\" aria-label=\"#21 Costo en destino. Valor 4,0 · Viabilidad 2,7 · Riesgo 4,3. Prioridad 3,62 · Ola 2\"/><circle class=\"pt\" cx=\"337.8\" cy=\"174.6\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"337.8\" cy=\"174.6\" r=\"12\" tabindex=\"0\" data-tip=\"#22 Tablero de dirección\nValor 4,0 · Viabilidad 2,7 · Riesgo 4,3\nPrioridad 3,62 · Ola 3\" aria-label=\"#22 Tablero de dirección. Valor 4,0 · Viabilidad 2,7 · Riesgo 4,3. Prioridad 3,62 · Ola 3\"/><circle class=\"pt\" cx=\"300.4\" cy=\"115.6\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"300.4\" cy=\"115.6\" r=\"12\" tabindex=\"0\" data-tip=\"#18 Mesa de compra Casio\nValor 4,7 · Viabilidad 2,3 · Riesgo 4,0\nPrioridad 3,68 · Ola 1\" aria-label=\"#18 Mesa de compra Casio. Valor 4,7 · Viabilidad 2,3 · Riesgo 4,0. Prioridad 3,68 · Ola 1\"/><circle class=\"pt\" cx=\"400.0\" cy=\"194.8\" r=\"5\" fill=\"var(--s2)\"/><circle class=\"hit\" cx=\"400.0\" cy=\"194.8\" r=\"12\" tabindex=\"0\" data-tip=\"#19 Recepción en tienda\nValor 3,7 · Viabilidad 3,0 · Riesgo 4,7\nPrioridad 3,68 · Ola 2\" aria-label=\"#19 Recepción en tienda. Valor 3,7 · Viabilidad 3,0 · Riesgo 4,7. Prioridad 3,68 · Ola 2\"/><circle class=\"pt\" cx=\"400.0\" cy=\"213.2\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"400.0\" cy=\"213.2\" r=\"12\" tabindex=\"0\" data-tip=\"#30 Disponibilidad y oferta\nValor 3,7 · Viabilidad 3,0 · Riesgo 4,0\nPrioridad 3,52 · Ola 3\" aria-label=\"#30 Disponibilidad y oferta. Valor 3,7 · Viabilidad 3,0 · Riesgo 4,0. Prioridad 3,52 · Ola 3\"/><circle class=\"pt\" cx=\"449.8\" cy=\"233.5\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"449.8\" cy=\"233.5\" r=\"12\" tabindex=\"0\" data-tip=\"#23 Forecast comercial\nValor 3,3 · Viabilidad 3,3 · Riesgo 4,3\nPrioridad 3,58 · Ola 1\" aria-label=\"#23 Forecast comercial. Valor 3,3 · Viabilidad 3,3 · Riesgo 4,3. Prioridad 3,58 · Ola 1\"/><circle class=\"pt\" cx=\"400.0\" cy=\"233.5\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"400.0\" cy=\"233.5\" r=\"12\" tabindex=\"0\" data-tip=\"#24 Expediente de importación en destino\nValor 3,3 · Viabilidad 3,0 · Riesgo 4,7\nPrioridad 3,55 · Ola 4\" aria-label=\"#24 Expediente de importación en destino. Valor 3,3 · Viabilidad 3,0 · Riesgo 4,7. Prioridad 3,55 · Ola 4\"/><circle class=\"pt\" cx=\"449.8\" cy=\"252.2\" r=\"5\" fill=\"var(--s2)\"/><circle class=\"hit\" cx=\"449.8\" cy=\"252.2\" r=\"12\" tabindex=\"0\" data-tip=\"#25 Mercadeo con datos\nValor 3,0 · Viabilidad 3,3 · Riesgo 4,7\nPrioridad 3,53 · Ola 2\" aria-label=\"#25 Mercadeo con datos. Valor 3,0 · Viabilidad 3,3 · Riesgo 4,7. Prioridad 3,53 · Ola 2\"/><circle class=\"pt\" cx=\"459.1\" cy=\"268.4\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"459.1\" cy=\"268.4\" r=\"12\" tabindex=\"0\" data-tip=\"#26 Registro de acuerdos y decisiones\nValor 3,0 · Viabilidad 3,3 · Riesgo 4,7\nPrioridad 3,53 · Ola 4\" aria-label=\"#26 Registro de acuerdos y decisiones. Valor 3,0 · Viabilidad 3,3 · Riesgo 4,7. Prioridad 3,53 · Ola 4\"/><circle class=\"pt\" cx=\"440.4\" cy=\"268.4\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"440.4\" cy=\"268.4\" r=\"12\" tabindex=\"0\" data-tip=\"#27 Traslados entre tiendas\nValor 3,0 · Viabilidad 3,3 · Riesgo 4,7\nPrioridad 3,53 · Ola 3\" aria-label=\"#27 Traslados entre tiendas. Valor 3,0 · Viabilidad 3,3 · Riesgo 4,7. Prioridad 3,53 · Ola 3\"/><circle class=\"pt\" cx=\"200.9\" cy=\"115.6\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"200.9\" cy=\"115.6\" r=\"12\" tabindex=\"0\" data-tip=\"#28 Inventario confiable\nValor 4,7 · Viabilidad 1,7 · Riesgo 4,3\nPrioridad 3,53 · Ola 3\" aria-label=\"#28 Inventario confiable. Valor 4,7 · Viabilidad 1,7 · Riesgo 4,3. Prioridad 3,53 · Ola 3\"/><circle class=\"pt\" cx=\"250.7\" cy=\"134.3\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"250.7\" cy=\"134.3\" r=\"12\" tabindex=\"0\" data-tip=\"#29 Mesa de compra Cubitt\nValor 4,3 · Viabilidad 2,0 · Riesgo 4,3\nPrioridad 3,52 · Ola 1\" aria-label=\"#29 Mesa de compra Cubitt. Valor 4,3 · Viabilidad 2,0 · Riesgo 4,3. Prioridad 3,52 · Ola 1\"/><circle class=\"pt\" cx=\"260.0\" cy=\"150.5\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"260.0\" cy=\"150.5\" r=\"12\" tabindex=\"0\" data-tip=\"#35 Panel único del pedido\nValor 4,3 · Viabilidad 2,0 · Riesgo 4,0\nPrioridad 3,43 · Ola 1\" aria-label=\"#35 Panel único del pedido. Valor 4,3 · Viabilidad 2,0 · Riesgo 4,0. Prioridad 3,43 · Ola 1\"/><circle class=\"pt\" cx=\"241.3\" cy=\"150.5\" r=\"5\" fill=\"var(--s2)\"/><circle class=\"hit\" cx=\"241.3\" cy=\"150.5\" r=\"12\" tabindex=\"0\" data-tip=\"#36 Pedido intragrupo\nValor 4,3 · Viabilidad 2,0 · Riesgo 4,0\nPrioridad 3,43 · Ola 2\" aria-label=\"#36 Pedido intragrupo. Valor 4,3 · Viabilidad 2,0 · Riesgo 4,0. Prioridad 3,43 · Ola 2\"/><circle class=\"pt\" cx=\"350.2\" cy=\"135.9\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"350.2\" cy=\"135.9\" r=\"12\" tabindex=\"0\" data-tip=\"#31 Catálogo único\nValor 4,3 · Viabilidad 2,7 · Riesgo 3,3\nPrioridad 3,50 · Ola 1\" aria-label=\"#31 Catálogo único. Valor 4,3 · Viabilidad 2,7 · Riesgo 3,3. Prioridad 3,50 · Ola 1\"/><circle class=\"pt\" cx=\"350.2\" cy=\"154.3\" r=\"5\" fill=\"var(--s2)\"/><circle class=\"hit\" cx=\"350.2\" cy=\"154.3\" r=\"12\" tabindex=\"0\" data-tip=\"#38 Limpieza de pedidos Cashea\nValor 4,3 · Viabilidad 2,7 · Riesgo 3,0\nPrioridad 3,42 · Ola 2\" aria-label=\"#38 Limpieza de pedidos Cashea. Valor 4,3 · Viabilidad 2,7 · Riesgo 3,0. Prioridad 3,42 · Ola 2\"/><circle class=\"pt\" cx=\"698.7\" cy=\"351.4\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"698.7\" cy=\"351.4\" r=\"12\" tabindex=\"0\" data-tip=\"#32 Asistente IA del conocimiento del proyecto\nValor 2,0 · Viabilidad 5,0 · Riesgo 3,7\nPrioridad 3,47 · Ola 1\" aria-label=\"#32 Asistente IA del conocimiento del proyecto. Valor 2,0 · Viabilidad 5,0 · Riesgo 3,7. Prioridad 3,47 · Ola 1\"/><circle class=\"pt\" cx=\"300.4\" cy=\"193.2\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"300.4\" cy=\"193.2\" r=\"12\" tabindex=\"0\" data-tip=\"#33 Flujo de caja\nValor 3,7 · Viabilidad 2,3 · Riesgo 4,7\nPrioridad 3,45 · Ola 4\" aria-label=\"#33 Flujo de caja. Valor 3,7 · Viabilidad 2,3 · Riesgo 4,7. Prioridad 3,45 · Ola 4\"/><circle class=\"pt\" cx=\"309.8\" cy=\"209.4\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"309.8\" cy=\"209.4\" r=\"12\" tabindex=\"0\" data-tip=\"#34 Lanzamientos de producto\nValor 3,7 · Viabilidad 2,3 · Riesgo 4,7\nPrioridad 3,45 · Ola 1\" aria-label=\"#34 Lanzamientos de producto. Valor 3,7 · Viabilidad 2,3 · Riesgo 4,7. Prioridad 3,45 · Ola 1\"/><circle class=\"pt\" cx=\"291.1\" cy=\"209.4\" r=\"5\" fill=\"var(--s2)\"/><circle class=\"hit\" cx=\"291.1\" cy=\"209.4\" r=\"12\" tabindex=\"0\" data-tip=\"#40 Calidad por lote\nValor 3,7 · Viabilidad 2,3 · Riesgo 4,3\nPrioridad 3,37 · Ola 2\" aria-label=\"#40 Calidad por lote. Valor 3,7 · Viabilidad 2,3 · Riesgo 4,3. Prioridad 3,37 · Ola 2\"/><circle class=\"pt\" cx=\"300.4\" cy=\"174.6\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"300.4\" cy=\"174.6\" r=\"12\" tabindex=\"0\" data-tip=\"#37 Precios y promociones con margen\nValor 4,0 · Viabilidad 2,3 · Riesgo 4,0\nPrioridad 3,42 · Ola 3\" aria-label=\"#37 Precios y promociones con margen. Valor 4,0 · Viabilidad 2,3 · Riesgo 4,0. Prioridad 3,42 · Ola 3\"/><circle class=\"pt\" cx=\"300.4\" cy=\"145.1\" r=\"5\" fill=\"var(--s2)\"/><circle class=\"hit\" cx=\"300.4\" cy=\"145.1\" r=\"12\" tabindex=\"0\" data-tip=\"#39 Crédito de clientes\nValor 4,3 · Viabilidad 2,3 · Riesgo 3,3\nPrioridad 3,38 · Ola 2\" aria-label=\"#39 Crédito de clientes. Valor 4,3 · Viabilidad 2,3 · Riesgo 3,3. Prioridad 3,38 · Ola 2\"/><circle class=\"pt\" cx=\"200.9\" cy=\"165.4\" r=\"5\" fill=\"var(--s2)\"/><circle class=\"hit\" cx=\"200.9\" cy=\"165.4\" r=\"12\" tabindex=\"0\" data-tip=\"#41 Llegada a Zona Libre y liberación\nValor 4,0 · Viabilidad 1,7 · Riesgo 4,7\nPrioridad 3,35 · Ola 2\" aria-label=\"#41 Llegada a Zona Libre y liberación. Valor 4,0 · Viabilidad 1,7 · Riesgo 4,7. Prioridad 3,35 · Ola 2\"/><circle class=\"pt\" cx=\"200.9\" cy=\"183.8\" r=\"5\" fill=\"var(--s2)\"/><circle class=\"hit\" cx=\"200.9\" cy=\"183.8\" r=\"12\" tabindex=\"0\" data-tip=\"#46 Reparto en escasez\nValor 4,0 · Viabilidad 1,7 · Riesgo 4,3\nPrioridad 3,27 · Ola 2\" aria-label=\"#46 Reparto en escasez. Valor 4,0 · Viabilidad 1,7 · Riesgo 4,3. Prioridad 3,27 · Ola 2\"/><circle class=\"pt\" cx=\"400.0\" cy=\"253.8\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"400.0\" cy=\"253.8\" r=\"12\" tabindex=\"0\" data-tip=\"#42 Muestras y pruebas\nValor 3,0 · Viabilidad 3,0 · Riesgo 4,3\nPrioridad 3,33 · Ola 1\" aria-label=\"#42 Muestras y pruebas. Valor 3,0 · Viabilidad 3,0 · Riesgo 4,3. Prioridad 3,33 · Ola 1\"/><circle class=\"pt\" cx=\"400.0\" cy=\"272.2\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"400.0\" cy=\"272.2\" r=\"12\" tabindex=\"0\" data-tip=\"#47 Bandeja de solicitudes\nValor 3,0 · Viabilidad 3,0 · Riesgo 4,0\nPrioridad 3,25 · Ola 3\" aria-label=\"#47 Bandeja de solicitudes. Valor 3,0 · Viabilidad 3,0 · Riesgo 4,0. Prioridad 3,25 · Ola 3\"/><circle class=\"pt\" cx=\"250.7\" cy=\"115.6\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"250.7\" cy=\"115.6\" r=\"12\" tabindex=\"0\" data-tip=\"#43 Validación de pagos\nValor 4,7 · Viabilidad 2,0 · Riesgo 3,0\nPrioridad 3,32 · Ola 1\" aria-label=\"#43 Validación de pagos. Valor 4,7 · Viabilidad 2,0 · Riesgo 3,0. Prioridad 3,32 · Ola 1\"/><circle class=\"pt\" cx=\"350.2\" cy=\"204.0\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"350.2\" cy=\"204.0\" r=\"12\" tabindex=\"0\" data-tip=\"#44 Repuestos y servicio Casio\nValor 3,7 · Viabilidad 2,7 · Riesgo 3,7\nPrioridad 3,32 · Ola 1\" aria-label=\"#44 Repuestos y servicio Casio. Valor 3,7 · Viabilidad 2,7 · Riesgo 3,7. Prioridad 3,32 · Ola 1\"/><circle class=\"pt\" cx=\"499.6\" cy=\"322.0\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"499.6\" cy=\"322.0\" r=\"12\" tabindex=\"0\" data-tip=\"#45 Descripciones y estructura de cargos\nValor 2,3 · Viabilidad 3,7 · Riesgo 4,3\nPrioridad 3,30 · Ola 3\" aria-label=\"#45 Descripciones y estructura de cargos. Valor 2,3 · Viabilidad 3,7 · Riesgo 4,3. Prioridad 3,30 · Ola 3\"/><circle class=\"pt\" cx=\"449.8\" cy=\"292.5\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"449.8\" cy=\"292.5\" r=\"12\" tabindex=\"0\" data-tip=\"#48 Reclamos a proveedor\nValor 2,7 · Viabilidad 3,3 · Riesgo 4,0\nPrioridad 3,23 · Ola 3\" aria-label=\"#48 Reclamos a proveedor. Valor 2,7 · Viabilidad 3,3 · Riesgo 4,0. Prioridad 3,23 · Ola 3\"/><circle class=\"pt\" cx=\"300.4\" cy=\"250.6\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"300.4\" cy=\"250.6\" r=\"12\" tabindex=\"0\" data-tip=\"#49 Embudo de oportunidades\nValor 3,0 · Viabilidad 2,3 · Riesgo 4,7\nPrioridad 3,18 · Ola 1\" aria-label=\"#49 Embudo de oportunidades. Valor 3,0 · Viabilidad 2,3 · Riesgo 4,7. Prioridad 3,18 · Ola 1\"/><circle class=\"pt\" cx=\"312.8\" cy=\"263.0\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"312.8\" cy=\"263.0\" r=\"12\" tabindex=\"0\" data-tip=\"#57 Piezas y etiquetas\nValor 3,0 · Viabilidad 2,3 · Riesgo 4,0\nPrioridad 3,02 · Ola 4\" aria-label=\"#57 Piezas y etiquetas. Valor 3,0 · Viabilidad 2,3 · Riesgo 4,0. Prioridad 3,02 · Ola 4\"/><circle class=\"pt\" cx=\"300.4\" cy=\"275.4\" r=\"5\" fill=\"var(--s2)\"/><circle class=\"hit\" cx=\"300.4\" cy=\"275.4\" r=\"12\" tabindex=\"0\" data-tip=\"#63 Contactos de clientes\nValor 3,0 · Viabilidad 2,3 · Riesgo 3,3\nPrioridad 2,85 · Ola 2\" aria-label=\"#63 Contactos de clientes. Valor 3,0 · Viabilidad 2,3 · Riesgo 3,3. Prioridad 2,85 · Ola 2\"/><circle class=\"pt\" cx=\"288.0\" cy=\"263.0\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"288.0\" cy=\"263.0\" r=\"12\" tabindex=\"0\" data-tip=\"#69 Publicación por canal\nValor 3,0 · Viabilidad 2,3 · Riesgo 2,3\nPrioridad 2,60 · Ola 3\" aria-label=\"#69 Publicación por canal. Valor 3,0 · Viabilidad 2,3 · Riesgo 2,3. Prioridad 2,60 · Ola 3\"/><circle class=\"pt\" cx=\"350.2\" cy=\"233.5\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"350.2\" cy=\"233.5\" r=\"12\" tabindex=\"0\" data-tip=\"#50 Pagos a proveedores por lote\nValor 3,3 · Viabilidad 2,7 · Riesgo 3,7\nPrioridad 3,18 · Ola 3\" aria-label=\"#50 Pagos a proveedores por lote. Valor 3,3 · Viabilidad 2,7 · Riesgo 3,7. Prioridad 3,18 · Ola 3\"/><circle class=\"pt\" cx=\"350.2\" cy=\"292.5\" r=\"5\" fill=\"var(--s2)\"/><circle class=\"hit\" cx=\"350.2\" cy=\"292.5\" r=\"12\" tabindex=\"0\" data-tip=\"#51 Scrap del mes\nValor 2,7 · Viabilidad 2,7 · Riesgo 4,7\nPrioridad 3,17 · Ola 2\" aria-label=\"#51 Scrap del mes. Valor 2,7 · Viabilidad 2,7 · Riesgo 4,7. Prioridad 3,17 · Ola 2\"/><circle class=\"pt\" cx=\"300.4\" cy=\"224.3\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"300.4\" cy=\"224.3\" r=\"12\" tabindex=\"0\" data-tip=\"#52 Stock de garantía y reemplazos\nValor 3,3 · Viabilidad 2,3 · Riesgo 4,0\nPrioridad 3,15 · Ola 1\" aria-label=\"#52 Stock de garantía y reemplazos. Valor 3,3 · Viabilidad 2,3 · Riesgo 4,0. Prioridad 3,15 · Ola 1\"/><circle class=\"pt\" cx=\"300.4\" cy=\"242.7\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"300.4\" cy=\"242.7\" r=\"12\" tabindex=\"0\" data-tip=\"#53 Contratos digitales\nValor 3,3 · Viabilidad 2,3 · Riesgo 3,7\nPrioridad 3,07 · Ola 3\" aria-label=\"#53 Contratos digitales. Valor 3,3 · Viabilidad 2,3 · Riesgo 3,7. Prioridad 3,07 · Ola 3\"/><circle class=\"pt\" cx=\"400.0\" cy=\"322.0\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"400.0\" cy=\"322.0\" r=\"12\" tabindex=\"0\" data-tip=\"#54 Inventario y regularización de las islas de IA\nValor 2,3 · Viabilidad 3,0 · Riesgo 4,3\nPrioridad 3,07 · Ola 1\" aria-label=\"#54 Inventario y regularización de las islas de IA. Valor 2,3 · Viabilidad 3,0 · Riesgo 4,3. Prioridad 3,07 · Ola 1\"/><circle class=\"pt\" cx=\"200.9\" cy=\"204.0\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"200.9\" cy=\"204.0\" r=\"12\" tabindex=\"0\" data-tip=\"#55 Despacho y exportación\nValor 3,7 · Viabilidad 1,7 · Riesgo 4,0\nPrioridad 3,05 · Ola 3\" aria-label=\"#55 Despacho y exportación. Valor 3,7 · Viabilidad 1,7 · Riesgo 4,0. Prioridad 3,05 · Ola 3\"/><circle class=\"pt\" cx=\"449.8\" cy=\"351.4\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"449.8\" cy=\"351.4\" r=\"12\" tabindex=\"0\" data-tip=\"#56 Co-marketing\nValor 2,0 · Viabilidad 3,3 · Riesgo 4,3\nPrioridad 3,05 · Ola 4\" aria-label=\"#56 Co-marketing. Valor 2,0 · Viabilidad 3,3 · Riesgo 4,3. Prioridad 3,05 · Ola 4\"/><circle class=\"pt\" cx=\"400.0\" cy=\"351.4\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"400.0\" cy=\"351.4\" r=\"12\" tabindex=\"0\" data-tip=\"#58 Displays y mobiliario\nValor 2,0 · Viabilidad 3,0 · Riesgo 4,7\nPrioridad 3,02 · Ola 4\" aria-label=\"#58 Displays y mobiliario. Valor 2,0 · Viabilidad 3,0 · Riesgo 4,7. Prioridad 3,02 · Ola 4\"/><circle class=\"pt\" cx=\"300.4\" cy=\"312.8\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"300.4\" cy=\"312.8\" r=\"12\" tabindex=\"0\" data-tip=\"#59 Expediente de apertura\nValor 2,3 · Viabilidad 2,3 · Riesgo 5,0\nPrioridad 3,00 · Ola 4\" aria-label=\"#59 Expediente de apertura. Valor 2,3 · Viabilidad 2,3 · Riesgo 5,0. Prioridad 3,00 · Ola 4\"/><circle class=\"pt\" cx=\"300.4\" cy=\"331.2\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"300.4\" cy=\"331.2\" r=\"12\" tabindex=\"0\" data-tip=\"#74 Reclutamiento y lector de CV\nValor 2,3 · Viabilidad 2,3 · Riesgo 2,0\nPrioridad 2,25 · Ola 3\" aria-label=\"#74 Reclutamiento y lector de CV. Valor 2,3 · Viabilidad 2,3 · Riesgo 2,0. Prioridad 2,25 · Ola 3\"/><circle class=\"pt\" cx=\"350.2\" cy=\"263.0\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"350.2\" cy=\"263.0\" r=\"12\" tabindex=\"0\" data-tip=\"#60 Reembolsos y cambios B2B\nValor 3,0 · Viabilidad 2,7 · Riesgo 3,3\nPrioridad 2,97 · Ola 1\" aria-label=\"#60 Reembolsos y cambios B2B. Valor 3,0 · Viabilidad 2,7 · Riesgo 3,3. Prioridad 2,97 · Ola 1\"/><circle class=\"pt\" cx=\"250.7\" cy=\"263.0\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"250.7\" cy=\"263.0\" r=\"12\" tabindex=\"0\" data-tip=\"#61 Bandeja de mayoristas\nValor 3,0 · Viabilidad 2,0 · Riesgo 4,0\nPrioridad 2,90 · Ola 3\" aria-label=\"#61 Bandeja de mayoristas. Valor 3,0 · Viabilidad 2,0 · Riesgo 4,0. Prioridad 2,90 · Ola 3\"/><circle class=\"pt\" cx=\"350.2\" cy=\"351.4\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"350.2\" cy=\"351.4\" r=\"12\" tabindex=\"0\" data-tip=\"#62 Calendario de pagos de compra\nValor 2,0 · Viabilidad 2,7 · Riesgo 4,7\nPrioridad 2,90 · Ola 3\" aria-label=\"#62 Calendario de pagos de compra. Valor 2,0 · Viabilidad 2,7 · Riesgo 4,7. Prioridad 2,90 · Ola 3\"/><circle class=\"pt\" cx=\"200.9\" cy=\"224.3\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"200.9\" cy=\"224.3\" r=\"12\" tabindex=\"0\" data-tip=\"#64 Pedidos B2B\nValor 3,3 · Viabilidad 1,7 · Riesgo 3,3\nPrioridad 2,75 · Ola 3\" aria-label=\"#64 Pedidos B2B. Valor 3,3 · Viabilidad 1,7 · Riesgo 3,3. Prioridad 2,75 · Ola 3\"/><circle class=\"pt\" cx=\"200.9\" cy=\"242.7\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"200.9\" cy=\"242.7\" r=\"12\" tabindex=\"0\" data-tip=\"#66 Venta asistida por chat\nValor 3,3 · Viabilidad 1,7 · Riesgo 3,0\nPrioridad 2,67 · Ola 1\" aria-label=\"#66 Venta asistida por chat. Valor 3,3 · Viabilidad 1,7 · Riesgo 3,0. Prioridad 2,67 · Ola 1\"/><circle class=\"pt\" cx=\"151.1\" cy=\"233.5\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"151.1\" cy=\"233.5\" r=\"12\" tabindex=\"0\" data-tip=\"#65 Kenex USA y marketplaces de EE. UU.\nValor 3,3 · Viabilidad 1,3 · Riesgo 3,7\nPrioridad 2,72 · Ola 4\" aria-label=\"#65 Kenex USA y marketplaces de EE. UU.. Valor 3,3 · Viabilidad 1,3 · Riesgo 3,7. Prioridad 2,72 · Ola 4\"/><circle class=\"pt\" cx=\"300.4\" cy=\"371.7\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"300.4\" cy=\"371.7\" r=\"12\" tabindex=\"0\" data-tip=\"#67 Paneles de pauta y redes\nValor 1,7 · Viabilidad 2,3 · Riesgo 4,7\nPrioridad 2,65 · Ola 3\" aria-label=\"#67 Paneles de pauta y redes. Valor 1,7 · Viabilidad 2,3 · Riesgo 4,7. Prioridad 2,65 · Ola 3\"/><circle class=\"pt\" cx=\"300.4\" cy=\"390.1\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"300.4\" cy=\"390.1\" r=\"12\" tabindex=\"0\" data-tip=\"#71 Vacantes y requisiciones\nValor 1,7 · Viabilidad 2,3 · Riesgo 4,0\nPrioridad 2,48 · Ola 3\" aria-label=\"#71 Vacantes y requisiciones. Valor 1,7 · Viabilidad 2,3 · Riesgo 4,0. Prioridad 2,48 · Ola 3\"/><circle class=\"pt\" cx=\"151.1\" cy=\"204.0\" r=\"5\" fill=\"var(--s1)\"/><circle class=\"hit\" cx=\"151.1\" cy=\"204.0\" r=\"12\" tabindex=\"0\" data-tip=\"#68 Copiloto de atención omnicanal\nValor 3,7 · Viabilidad 1,3 · Riesgo 2,7\nPrioridad 2,60 · Ola 1\" aria-label=\"#68 Copiloto de atención omnicanal. Valor 3,7 · Viabilidad 1,3 · Riesgo 2,7. Prioridad 2,60 · Ola 1\"/><circle class=\"pt\" cx=\"200.9\" cy=\"292.5\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"200.9\" cy=\"292.5\" r=\"12\" tabindex=\"0\" data-tip=\"#70 Analítica de talento en tiempo real\nValor 2,7 · Viabilidad 1,7 · Riesgo 3,7\nPrioridad 2,57 · Ola 4\" aria-label=\"#70 Analítica de talento en tiempo real. Valor 2,7 · Viabilidad 1,7 · Riesgo 3,7. Prioridad 2,57 · Ola 4\"/><circle class=\"pt\" cx=\"200.9\" cy=\"322.0\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"200.9\" cy=\"322.0\" r=\"12\" tabindex=\"0\" data-tip=\"#72 Repositorio de fichas del colaborador\nValor 2,3 · Viabilidad 1,7 · Riesgo 3,0\nPrioridad 2,27 · Ola 3\" aria-label=\"#72 Repositorio de fichas del colaborador. Valor 2,3 · Viabilidad 1,7 · Riesgo 3,0. Prioridad 2,27 · Ola 3\"/><circle class=\"pt\" cx=\"151.1\" cy=\"263.0\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"151.1\" cy=\"263.0\" r=\"12\" tabindex=\"0\" data-tip=\"#73 Portal de clientes\nValor 3,0 · Viabilidad 1,3 · Riesgo 2,3\nPrioridad 2,25 · Ola 3\" aria-label=\"#73 Portal de clientes. Valor 3,0 · Viabilidad 1,3 · Riesgo 2,3. Prioridad 2,25 · Ola 3\"/><circle class=\"pt\" cx=\"151.1\" cy=\"292.5\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"151.1\" cy=\"292.5\" r=\"12\" tabindex=\"0\" data-tip=\"#75 Portal de socios y franquicias\nValor 2,7 · Viabilidad 1,3 · Riesgo 2,7\nPrioridad 2,20 · Ola 3\" aria-label=\"#75 Portal de socios y franquicias. Valor 2,7 · Viabilidad 1,3 · Riesgo 2,7. Prioridad 2,20 · Ola 3\"/><circle class=\"pt\" cx=\"151.1\" cy=\"351.4\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"151.1\" cy=\"351.4\" r=\"12\" tabindex=\"0\" data-tip=\"#76 Desarrollo y carrera\nValor 2,0 · Viabilidad 1,3 · Riesgo 3,0\nPrioridad 2,02 · Ola 4\" aria-label=\"#76 Desarrollo y carrera. Valor 2,0 · Viabilidad 1,3 · Riesgo 3,0. Prioridad 2,02 · Ola 4\"/><circle class=\"pt\" cx=\"200.9\" cy=\"351.4\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"200.9\" cy=\"351.4\" r=\"12\" tabindex=\"0\" data-tip=\"#77 Garantías en mercados sin operación\nValor 2,0 · Viabilidad 1,7 · Riesgo 2,0\nPrioridad 1,88 · Ola 3\" aria-label=\"#77 Garantías en mercados sin operación. Valor 2,0 · Viabilidad 1,7 · Riesgo 2,0. Prioridad 1,88 · Ola 3\"/><circle class=\"pt\" cx=\"151.1\" cy=\"380.9\" r=\"5\" fill=\"var(--s3)\"/><circle class=\"hit\" cx=\"151.1\" cy=\"380.9\" r=\"12\" tabindex=\"0\" data-tip=\"#78 Compensación y percentiles salariales\nValor 1,7 · Viabilidad 1,3 · Riesgo 3,0\nPrioridad 1,88 · Ola 4\" aria-label=\"#78 Compensación y percentiles salariales. Valor 1,7 · Viabilidad 1,3 · Riesgo 3,0. Prioridad 1,88 · Ola 4\"/><text class=\"rot\" x=\"507.6\" y=\"69.9\">1</text><text class=\"rot\" x=\"507.6\" y=\"88.3\">2</text><text class=\"rot\" x=\"358.2\" y=\"69.9\">3</text><text class=\"rot\" x=\"457.8\" y=\"79.1\">4</text><text class=\"rot\" x=\"408.0\" y=\"79.1\">5</text><text class=\"rot\" x=\"258.7\" y=\"79.1\">6</text><text class=\"rot\" x=\"557.3\" y=\"197.0\">7</text><text class=\"rot\" x=\"457.8\" y=\"158.4\">8</text><text class=\"rot\" x=\"457.8\" y=\"176.8\">9</text><text class=\"rot\" x=\"457.8\" y=\"197.0\">10</text></svg>",
     "pie": "Valor y viabilidad, de 1 a 5. El riesgo no está en el gráfico: entra en la prioridad y se ve en el detalle de cada punto y en el [[sec:inventario|inventario]]."
    }
   ]
  },
  {
   "id": "inventario",
   "num": "4",
   "titulo": "Inventario completo",
   "estado": "borrador",
   "bloques": [
    "Todos los casos, por sector y de mayor a menor prioridad. V = valor, Vi = viabilidad, R = riesgo (5 = bajo). Cada ficha trae su métrica, sus responsables y la evidencia de su calificación.",
    {
     "t": "h",
     "x": "Planeación y producto · 8 casos"
    },
    {
     "t": "tabla",
     "cab": [
      "#",
      "Caso",
      "Ola",
      "Nivel",
      "V",
      "Vi",
      "R",
      "Prioridad",
      "Estado"
     ],
     "num": [
      0,
      4,
      5,
      6,
      7
     ],
     "filas": [
      [
       "1",
       "[[mod:m-vigia-de-reservas|Vigía de reservas]]",
       "Ola 1",
       "2",
       "5,0",
       "3,7",
       "4,7",
       "4,45",
       "propuesto"
      ],
      [
       "23",
       "[[mod:m-forecast-comercial|Forecast comercial]]",
       "Ola 1",
       "1",
       "3,3",
       "3,3",
       "4,3",
       "3,58",
       "propuesto"
      ],
      [
       "34",
       "[[mod:m-lanzamientos-de-producto|Lanzamientos de producto]]",
       "Ola 1",
       "1·2",
       "3,7",
       "2,3",
       "4,7",
       "3,45",
       "propuesto"
      ],
      [
       "37",
       "[[mod:m-precios-y-promociones-con-margen|Precios y promociones con margen]]",
       "Ola 3",
       "2",
       "4,0",
       "2,3",
       "4,0",
       "3,42",
       "propuesto"
      ],
      [
       "42",
       "[[mod:m-muestras-y-pruebas|Muestras y pruebas]]",
       "Ola 1",
       "1·2",
       "3,0",
       "3,0",
       "4,3",
       "3,33",
       "propuesto"
      ],
      [
       "46",
       "[[mod:m-reparto-en-escasez|Reparto en escasez]]",
       "Ola 2",
       "1",
       "4,0",
       "1,7",
       "4,3",
       "3,27",
       "propuesto"
      ],
      [
       "47",
       "[[mod:m-bandeja-de-solicitudes|Bandeja de solicitudes]]",
       "Ola 3",
       "2",
       "3,0",
       "3,0",
       "4,0",
       "3,25",
       "propuesto"
      ],
      [
       "49",
       "[[mod:m-embudo-de-oportunidades|Embudo de oportunidades]]",
       "Ola 1",
       "1·2",
       "3,0",
       "2,3",
       "4,7",
       "3,18",
       "propuesto"
      ]
     ]
    },
    {
     "t": "fichas",
     "items": [
      {
       "id": "m-vigia-de-reservas",
       "titulo": "1. Vigía de reservas",
       "chips": [
        "Ola 1",
        "nivel 2",
        "prioridad 4,45",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "marca las reservas huérfanas y los pedidos anulados que siguen reservando stock, y avisa al dueño (2)."
        ],
        [
         "Quién firma",
         "liberar una reserva."
        ],
        [
         "Procesos",
         "[[proc:2.6]] · [[proc:7.2]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:10b.2]]"
        ],
        [
         "En la órbita",
         "[[mod:m-vigia-de-reservas|ver el módulo]]"
        ],
        [
         "Se mide",
         "Reservas huérfanas abiertas y tiempo hasta su liberación"
        ],
        [
         "Línea base",
         "Por medir; hoy hay mercancía «reservada tres veces» (M37)"
        ],
        [
         "Meta",
         "−80 % de reservas huérfanas a los 3 meses y liberación en ≤ 48 h desde la alerta"
        ],
        [
         "Se revisa si",
         "< 50 % de alertas atendidas en un mes"
        ],
        [
         "Dueño",
         "Director(a) Comercial del Grupo"
        ],
        [
         "Opera",
         "Vendedores y coordinación de inventarios"
        ],
        [
         "Firma",
         "Dueño de la reserva con su gerente comercial (liberar una reserva)"
        ],
        [
         "Calificación",
         "Valor 5,0 (frenos 5 · volumen 5 · pedido 5) · Viabilidad 3,7 (dato 3 · dependencias 4 · esfuerzo 4) · Riesgo 4,7 (personas 5 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "Resuelve 10b.2 (detiene) y operaciones de VE pide una rutina diaria de limpieza, que llama «el principal problema». Es una lista con alertas sobre Odoo en todas las instancias y liberar sigue siendo firma."
        ],
        [
         "Evidencia",
         "M37 · freno:10b.2 · freno:7.3 · E-34:129 · E-34:121 · E-35:98 · E-16:75 · propuestas-to-be.md:126 · propuestas-to-be.md:906 · arquitectura-ia.html:754"
        ]
       ]
      },
      {
       "id": "m-forecast-comercial",
       "titulo": "23. Forecast comercial",
       "chips": [
        "Ola 1",
        "nivel 1",
        "prioridad 3,58",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "arma la base con estacionalidad para que cada vendedor la ajuste (1)."
        ],
        [
         "Quién firma",
         "la gerencia comercial aprueba."
        ],
        [
         "Procesos",
         "[[proc:2.2]] · [[proc:8.1]] · [[proc:9.1]] · [[proc:10.1]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-forecast-comercial|ver el módulo]]"
        ],
        [
         "Se mide",
         "Versiones del forecast y desvío mensual por vendedor y cliente"
        ],
        [
         "Línea base",
         "El forecast Cubitt se rehízo 3 veces en 2026 (M01); el desvío mensual está por medir"
        ],
        [
         "Meta",
         "Forecast 2027 aprobado en una sola versión antes del 31-dic-2026 y desvío mensual publicado desde febrero de 2027"
        ],
        [
         "Se revisa si",
         "Más de una revisión fuera de ciclo en el primer trimestre o < 70 % de vendedores que ajustan su base"
        ],
        [
         "Dueño",
         "Gerente Regional Comercial / Retail"
        ],
        [
         "Opera",
         "Vendedores (ajustan su base)"
        ],
        [
         "Firma",
         "Gerencia comercial"
        ],
        [
         "Calificación",
         "Valor 3,3 (frenos 4 · volumen 3 · pedido 3) · Viabilidad 3,3 (dato 3 · dependencias 4 · esfuerzo 3) · Riesgo 4,3 (personas 4 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "Alivia 1.4 y 1.5 (lentos) y la propuesta lo liga a 1.1; es anual, pero urgente porque el forecast 2027 se arma en noviembre y diciembre. El retrabajo está descrito en entrevistas, pero nadie pide cambiar el método."
        ],
        [
         "Evidencia",
         "M01 · freno:1.4 · freno:1.5 · freno:1.1 · E-08:37 · E-63:137 · E-60:66 · propuestas-to-be.md:118 · propuestas-to-be.md:911 · decision:17 · arquitectura-ia.html:718"
        ]
       ]
      },
      {
       "id": "m-lanzamientos-de-producto",
       "titulo": "34. Lanzamientos de producto",
       "chips": [
        "Ola 1",
        "nivel 1·2",
        "prioridad 3,45",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "avisa a web, retail y mayor cuando llega la mercancía (2) y arma la retrospectiva al tercer mes con aéreo, moldes y licencias imputados (1)."
        ],
        [
         "Quién firma",
         "el plan de lanzamiento."
        ],
        [
         "Procesos",
         "[[proc:4.4]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-lanzamientos-de-producto|ver el módulo]]"
        ],
        [
         "Se mide",
         "Lanzamientos con aviso de llegada a web, retail y mayor, y retrospectiva al tercer mes"
        ],
        [
         "Línea base",
         "6 lanzamientos en un mes con aviso por chat y retrospectiva a mano (M10, M11)"
        ],
        [
         "Meta",
         "100 % de lanzamientos con aviso ≥ 15 días antes de la llegada y retrospectiva al tercer mes, en 6 meses"
        ],
        [
         "Se revisa si",
         "< 70 % de lanzamientos con aviso a tiempo"
        ],
        [
         "Dueño",
         "Gerente de Proyectos (PMO)"
        ],
        [
         "Opera",
         "Gerente de Proyectos (PMO)"
        ],
        [
         "Firma",
         "Gerente de Proyectos con la dirección de la marca (plan de lanzamiento)"
        ],
        [
         "Calificación",
         "Valor 3,7 (frenos 3 · volumen 3 · pedido 5) · Viabilidad 2,3 (dato 2 · dependencias 2 · esfuerzo 3) · Riesgo 4,7 (personas 5 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "La responsable de lanzamientos pide la grilla anual, la retrospectiva con costos y que todos sepan cuándo llega cada producto; alivia varios frenos lentos (4a.3, 8a.3, SW.1, 11d.2, MK.2). Depende del tránsito real y de imputar costos que hoy no se registran, como el aéreo."
        ],
        [
         "Evidencia",
         "M10 · M11 · freno:4a.3 · freno:8a.3 · freno:SW.1 · freno:11d.2 · freno:MK.2 · E-60:80 · E-60:108 · SC-08:401 · E-49:206 · E-16:118 · propuestas-to-be.md:180 · arquitectura-ia.html:727"
        ]
       ]
      },
      {
       "id": "m-precios-y-promociones-con-margen",
       "titulo": "37. Precios y promociones con margen",
       "chips": [
        "Ola 3",
        "nivel 2",
        "prioridad 3,42",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "valida el margen mínimo y el stock antes de aprobar (2)."
        ],
        [
         "Quién firma",
         "todo precio."
        ],
        [
         "Procesos",
         "[[proc:2.3]] · [[proc:2.5]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-precios-y-promociones-con-margen|ver el módulo]]"
        ],
        [
         "Se mide",
         "Promociones aprobadas con margen mínimo validado e inventario de más de 6 meses"
        ],
        [
         "Línea base",
         "USD 1 M de mercancía estacionada y 5–6 promociones por país al mes sin margen mínimo escrito (M04, M111)"
        ],
        [
         "Meta",
         "100 % de promociones con margen y stock validados y −25 % del inventario de más de 6 meses en 12 meses"
        ],
        [
         "Se revisa si",
         "< 80 % de promociones pasadas por la validación a los 3 meses"
        ],
        [
         "Dueño",
         "Director(a) Comercial del Grupo"
        ],
        [
         "Opera",
         "Gerentes comerciales de país y Mercadeo (solicitantes)"
        ],
        [
         "Firma",
         "Director(a) Comercial del Grupo (todo precio)"
        ],
        [
         "Calificación",
         "Valor 4,0 (frenos 3 · volumen 4 · pedido 5) · Viabilidad 2,3 (dato 2 · dependencias 2 · esfuerzo 3) · Riesgo 4,0 (personas 5 · exposición 4 · autonomía 3)"
        ],
        [
         "Por qué",
         "La dirección pide no poner precios y una lista de qué rematar, y planificación pide un margen mínimo escrito; alivia frenos lentos (14c.4, 19.2). Falta escribir el margen mínimo y el costo real por producto no se calcula, y la validación en nivel 2 toca precios."
        ],
        [
         "Evidencia",
         "M04 · M111 · freno:14c.4 · freno:19.2 · E-08:168 · E-08:170 · E-40:182 · E-63:127 · E-01:92 · E-50:131 · propuestas-to-be.md:145 · arquitectura-ia.html:721 · arquitectura-ia.html:827"
        ]
       ]
      },
      {
       "id": "m-muestras-y-pruebas",
       "titulo": "42. Muestras y pruebas",
       "chips": [
        "Ola 1",
        "nivel 1·2",
        "prioridad 3,33",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "sigue cada muestra y envía recordatorios (2); arma el checklist con las fallas reales de garantías (1)."
        ],
        [
         "Quién firma",
         "aprobar el producto."
        ],
        [
         "Procesos",
         "[[proc:3.3]] · [[proc:3.4]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-muestras-y-pruebas|ver el módulo]]"
        ],
        [
         "Se mide",
         "Muestras con ETA y estado al día"
        ],
        [
         "Línea base",
         "Muestras perdidas «a veces meses» y pruebas sin protocolo (M07, M08)"
        ],
        [
         "Meta",
         "Ninguna muestra sin estado por más de 30 días y checklist por categoría en el 100 % de las pruebas, a los 3 meses"
        ],
        [
         "Se revisa si",
         "Más de 10 % de muestras sin estado a los 3 meses"
        ],
        [
         "Dueño",
         "Director(a) de Marca Propia (Cubitt)"
        ],
        [
         "Opera",
         "Especialista de producto / proyecto"
        ],
        [
         "Firma",
         "Director(a) de Marca Propia (aprobar el producto)"
        ],
        [
         "Calificación",
         "Valor 3,0 (frenos 3 · volumen 2 · pedido 4) · Viabilidad 3,0 (dato 3 · dependencias 3 · esfuerzo 3) · Riesgo 4,3 (personas 5 · exposición 4 · autonomía 4)"
        ],
        [
         "Por qué",
         "Alivia 2a.2 y 4a.4 (lentos) con poco volumen; producto ya empezó una base de muestras en Lark y las pruebas tienen un checklist propio. No depende de Odoo, pero el checklist necesita las fallas de garantías."
        ],
        [
         "Evidencia",
         "M07 · M08 · freno:2a.2 · freno:4a.4 · E-60:53 · E-64:19 · propuestas-to-be.md:165 · arquitectura-ia.html:724"
        ]
       ]
      },
      {
       "id": "m-reparto-en-escasez",
       "titulo": "46. Reparto en escasez",
       "chips": [
        "Ola 2",
        "nivel 1",
        "prioridad 3,27",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "propone el reparto por país y cliente (1)."
        ],
        [
         "Quién firma",
         "la dirección comercial reparte y la regla la decide la Junta."
        ],
        [
         "Procesos",
         "[[proc:2.6]] · [[proc:8.6]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:11e.1]]"
        ],
        [
         "En la órbita",
         "[[mod:m-reparto-en-escasez|ver el módulo]]"
        ],
        [
         "Se mide",
         "Ajustes de reparto con motivo y apego a la regla de la Junta"
        ],
        [
         "Línea base",
         "Ajustes de 30–40 % sin regla escrita (M36)"
        ],
        [
         "Meta",
         "100 % de ajustes con motivo registrado y el mayor de VE servido según la regla, a los 3 meses de aprobada"
        ],
        [
         "Se revisa si",
         "< 60 % de propuestas aceptadas sin cambios de fondo tras dos repartos"
        ],
        [
         "Dueño",
         "Director(a) Comercial del Grupo"
        ],
        [
         "Opera",
         "Planificación comercial"
        ],
        [
         "Firma",
         "Dirección comercial (reparte); la regla la decide la Junta"
        ],
        [
         "Calificación",
         "Valor 4,0 (frenos 5 · volumen 3 · pedido 4) · Viabilidad 1,7 (dato 2 · dependencias 1 · esfuerzo 2) · Riesgo 4,3 (personas 5 · exposición 5 · autonomía 3)"
        ],
        [
         "Por qué",
         "Resuelve 11e.1 (detiene) y lo piden quienes reciben menos, aunque la dirección dice que su ajuste ya es «medio automático». Espera la regla de reparto de la Junta (decisión 14) y un libro de reservas que no existe, y propone sobre inventario escaso."
        ],
        [
         "Evidencia",
         "M36 · freno:11e.1 · freno:10b.5 · decision:14 · E-35:98 · E-63:135 · E-08:170 · E-08:114 · propuestas-to-be.md:134 · propuestas-to-be.md:920 · arquitectura-ia.html:753"
        ]
       ]
      },
      {
       "id": "m-bandeja-de-solicitudes",
       "titulo": "47. Bandeja de solicitudes",
       "chips": [
        "Ola 3",
        "nivel 2",
        "prioridad 3,25",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "al aprobarse la solicitud, la convierte en el objeto de Odoo que corresponde: traslado, orden de compra o factura de proveedor (2)."
        ],
        [
         "Quién firma",
         "la aprobación de la solicitud."
        ],
        [
         "Procesos",
         "[[proc:4.1]] · [[proc:16.3]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-bandeja-de-solicitudes|ver el módulo]]"
        ],
        [
         "Se mide",
         "Solicitudes aprobadas convertidas sin retipeo y devoluciones por documentos incompletos"
        ],
        [
         "Línea base",
         "Formularios de Lark «que mueren» y hasta 6 devoluciones de una misma factura (M117, M112)"
        ],
        [
         "Meta",
         "≥ 90 % de solicitudes aprobadas convertidas en su borrador de Odoo sin retipeo, a los 6 meses"
        ],
        [
         "Se revisa si",
         "< 60 % convertidas sin corrección a los 3 meses"
        ],
        [
         "Dueño",
         "Director(a) de Proyectos (PMO)"
        ],
        [
         "Opera",
         "Solicitantes de cada área y PMO"
        ],
        [
         "Firma",
         "Aprobador de cada solicitud según su tipo"
        ],
        [
         "Calificación",
         "Valor 3,0 (frenos 2 · volumen 3 · pedido 4) · Viabilidad 3,0 (dato 3 · dependencias 3 · esfuerzo 3) · Riesgo 4,0 (personas 4 · exposición 5 · autonomía 3)"
        ],
        [
         "Por qué",
         "TI pide un formulario único que cree el traslado en Odoo y mercadeo de VE, que lo aprobado pase solo a administración, pero toca frenos solo de forma marginal (14c.5, 10b.4). Crea en nivel 2 borradores de traslados, compras o facturas, tras una aprobación previa."
        ],
        [
         "Evidencia",
         "M112 · M117 · freno:14c.5 · freno:10b.4 · E-07:238 · E-42:125 · E-42:96 · propuestas-to-be.md:188 · arquitectura-ia.html:833"
        ]
       ]
      },
      {
       "id": "m-embudo-de-oportunidades",
       "titulo": "49. Embudo de oportunidades",
       "chips": [
        "Ola 1",
        "nivel 1·2",
        "prioridad 3,18",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "completa la ficha con la venta de la categoría, el hueco de precio y las garantías de productos parecidos (1); levanta el acta (2)."
        ],
        [
         "Quién firma",
         "la decisión de desarrollar."
        ],
        [
         "Procesos",
         "[[proc:3.1]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-embudo-de-oportunidades|ver el módulo]]"
        ],
        [
         "Se mide",
         "Ideas con ficha completa y decisiones con acta"
        ],
        [
         "Línea base",
         "Sin acta, sin KPI ni presupuesto de I+D; unas 10 personas opinan cada muestra (M06)"
        ],
        [
         "Meta",
         "100 % de decisiones de desarrollo con ficha y acta a los 3 meses"
        ],
        [
         "Se revisa si",
         "< 50 % de ideas con ficha completa a los 3 meses"
        ],
        [
         "Dueño",
         "Director(a) de Marca Propia (Cubitt)"
        ],
        [
         "Opera",
         "Especialista de producto / proyecto"
        ],
        [
         "Firma",
         "Director(a) de Marca Propia (decisión de desarrollar)"
        ],
        [
         "Calificación",
         "Valor 3,0 (frenos 3 · volumen 2 · pedido 4) · Viabilidad 2,3 (dato 2 · dependencias 2 · esfuerzo 3) · Riesgo 4,7 (personas 5 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "Alivia 2a.3 y 2a.4 (lentos) con poco volumen; la dirección de I+D pide estudio de mercado «dónde está el hueco», pero en forma de personas, no de ficha ni acta. La ficha necesita la venta por categoría y la tasa de garantías, que aún no están estructuradas."
        ],
        [
         "Evidencia",
         "M06 · freno:2a.3 · freno:2a.4 · E-60:21 · E-60:24 · E-60:51 · propuestas-to-be.md:157 · arquitectura-ia.html:723"
        ]
       ]
      }
     ]
    },
    {
     "t": "h",
     "x": "Compras · 8 casos"
    },
    {
     "t": "tabla",
     "cab": [
      "#",
      "Caso",
      "Ola",
      "Nivel",
      "V",
      "Vi",
      "R",
      "Prioridad",
      "Estado"
     ],
     "num": [
      0,
      4,
      5,
      6,
      7
     ],
     "filas": [
      [
       "6",
       "[[mod:m-demanda-y-s-op|Demanda y S&OP]]",
       "Ola 1",
       "1·2",
       "5,0",
       "2,0",
       "4,7",
       "3,87",
       "propuesto"
      ],
      [
       "8",
       "[[mod:m-reporte-pci-a-casio|Reporte PCI a Casio]]",
       "Ola 1",
       "1",
       "4,0",
       "3,3",
       "4,3",
       "3,85",
       "propuesto"
      ],
      [
       "13",
       "[[mod:m-reposicion-a-tiendas-y-web|Reposición a tiendas y web]]",
       "Ola 3",
       "2",
       "4,0",
       "3,0",
       "4,3",
       "3,73",
       "propuesto"
      ],
      [
       "15",
       "[[mod:m-transito-internacional|Tránsito internacional]]",
       "Ola 1",
       "1·2",
       "5,0",
       "2,3",
       "3,7",
       "3,73",
       "propuesto"
      ],
      [
       "18",
       "[[mod:m-mesa-de-compra-casio|Mesa de compra Casio]]",
       "Ola 1",
       "1·2",
       "4,7",
       "2,3",
       "4,0",
       "3,68",
       "propuesto"
      ],
      [
       "29",
       "[[mod:m-mesa-de-compra-cubitt|Mesa de compra Cubitt]]",
       "Ola 1",
       "1·2",
       "4,3",
       "2,0",
       "4,3",
       "3,52",
       "propuesto"
      ],
      [
       "36",
       "[[mod:m-pedido-intragrupo|Pedido intragrupo]]",
       "Ola 2",
       "2",
       "4,3",
       "2,0",
       "4,0",
       "3,43",
       "propuesto"
      ],
      [
       "48",
       "[[mod:m-reclamos-a-proveedor|Reclamos a proveedor]]",
       "Ola 3",
       "1",
       "2,7",
       "3,3",
       "4,0",
       "3,23",
       "propuesto"
      ]
     ]
    },
    {
     "t": "fichas",
     "items": [
      {
       "id": "m-demanda-y-s-op",
       "titulo": "6. Demanda y S&OP",
       "chips": [
        "Ola 1",
        "nivel 1·2",
        "prioridad 3,87",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "registra cada faltante con su motivo (2) y explica el sugerido (1)."
        ],
        [
         "Quién firma",
         "decide la dirección de compras."
        ],
        [
         "Procesos",
         "[[proc:6.1]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:1.1]] · [[freno:7.1]]"
        ],
        [
         "En la órbita",
         "[[mod:m-demanda-y-s-op|ver el módulo]]"
        ],
        [
         "Se mide",
         "Faltantes registrados con su motivo y demanda no atendida por SKU"
        ],
        [
         "Línea base",
         "Hoy 0 %: lo que no hay se borra del pedido (M03)"
        ],
        [
         "Meta",
         "≥ 90 % de líneas recortadas o venta perdida registradas con motivo, a los 3 meses"
        ],
        [
         "Se revisa si",
         "< 50 % de faltantes registrados a los 3 meses"
        ],
        [
         "Dueño",
         "Comité Comercial / Director de Compras y Cadena de Suministros"
        ],
        [
         "Opera",
         "Planificador(a) de la demanda"
        ],
        [
         "Firma",
         "Dirección de compras"
        ],
        [
         "Calificación",
         "Valor 5,0 (frenos 5 · volumen 5 · pedido 5) · Viabilidad 2,0 (dato 2 · dependencias 2 · esfuerzo 2) · Riesgo 4,7 (personas 5 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "Resuelve 1.1 y 7.1 (detienen), toca cada pedido de todos los canales y la gerencia comercial lo llama «la prioridad número uno». El dato hoy no se registra y depende del buzón de sell-out y del registro de venta perdida en tienda."
        ],
        [
         "Evidencia",
         "M02 · M03 · M95 · freno:1.1 · freno:7.1 · E-05:154 · E-40:184 · E-08:141 · E-10:164 · propuestas-to-be.md:200 · propuestas-to-be.md:932 · arquitectura-ia.html:720"
        ]
       ]
      },
      {
       "id": "m-reporte-pci-a-casio",
       "titulo": "8. Reporte PCI a Casio",
       "chips": [
        "Ola 1",
        "nivel 1",
        "prioridad 3,85",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "prepara el borrador entre los días 1 y 10, con los ajustes explicados (1)."
        ],
        [
         "Quién firma",
         "el envío a Casio."
        ],
        [
         "Procesos",
         "[[proc:6.3]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:PCI.1]]"
        ],
        [
         "En la órbita",
         "[[mod:m-reporte-pci-a-casio|ver el módulo]]"
        ],
        [
         "Se mide",
         "Día hábil en que el borrador del PCI está listo y días-persona del cierre"
        ],
        [
         "Línea base",
         "Los primeros 10 días de cada mes de una sola persona (M98)"
        ],
        [
         "Meta",
         "Borrador listo el día hábil 3 y ≤ 1 día de revisión, tras 3 cierres"
        ],
        [
         "Se revisa si",
         "Borrador después del día hábil 6 en dos meses seguidos"
        ],
        [
         "Dueño",
         "Comité Comercial / Director de Compras y Cadena de Suministros"
        ],
        [
         "Opera",
         "Analista de reportería de compras"
        ],
        [
         "Firma",
         "Dirección de compras (el envío a Casio)"
        ],
        [
         "Calificación",
         "Valor 4,0 (frenos 5 · volumen 4 · pedido 3) · Viabilidad 3,3 (dato 3 · dependencias 3 · esfuerzo 4) · Riesgo 4,3 (personas 5 · exposición 3 · autonomía 5)"
        ],
        [
         "Por qué",
         "Resuelve PCI.1 (detiene) y libera 10 días al mes de una persona, pero nadie pide el cambio. Es un informe sobre el espejo que sale a Casio con firma; falta confirmar el formato exigido y es lo primero que baja si se recorta la Ola 1."
        ],
        [
         "Evidencia",
         "M98 · freno:PCI.1 · E-10:204 · E-10:210 · E-10:305 · propuestas-to-be.md:235 · propuestas-to-be.md:961 · decision:17 · arquitectura-ia.html:814"
        ]
       ]
      },
      {
       "id": "m-reposicion-a-tiendas-y-web",
       "titulo": "13. Reposición a tiendas y web",
       "chips": [
        "Ola 3",
        "nivel 2",
        "prioridad 3,73",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "propone el sugerido semanal sin ventas atípicas (2)."
        ],
        [
         "Quién firma",
         "confirma el supervisor."
        ],
        [
         "Procesos",
         "[[proc:6.7]] · [[proc:9.3]] · [[proc:10.12]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-reposicion-a-tiendas-y-web|ver el módulo]]"
        ],
        [
         "Se mide",
         "Tiempo de preparación del sugerido y quiebres por canal"
        ],
        [
         "Línea base",
         "Excel formulado que se congela, 10–30 min por tienda en VE (M56); país «en cero» por no separar stock por canal (M55)"
        ],
        [
         "Meta",
         "Sugerido semanal sin Excel y −50 % de quiebres de los SKU A en tiendas y web, a los 6 meses"
        ],
        [
         "Se revisa si",
         "< 60 % de sugeridos confirmados sin cambios de fondo"
        ],
        [
         "Dueño",
         "Coordinador(a) de Logística y Bodega"
        ],
        [
         "Opera",
         "Planificación y supervisores de tienda"
        ],
        [
         "Firma",
         "Supervisor de tiendas o gerente de e-commerce (confirma)"
        ],
        [
         "Calificación",
         "Valor 4,0 (frenos 3 · volumen 4 · pedido 5) · Viabilidad 3,0 (dato 3 · dependencias 3 · esfuerzo 3) · Riesgo 4,3 (personas 5 · exposición 5 · autonomía 3)"
        ],
        [
         "Por qué",
         "Planificación de VE pide automatizar la reposición y separar el stock por canal, igual que comercial de Colombia; alivia frenos lentos (11c.1, 11c.2, 10b.3). Es semanal en tiendas y web y deja traslados en borrador que confirma el supervisor."
        ],
        [
         "Evidencia",
         "M55 · M56 · M73 · freno:11c.1 · freno:11c.2 · freno:10b.3 · E-40:88 · E-40:230 · E-14:31 · E-40:70 · propuestas-to-be.md:265 · arquitectura-ia.html:773"
        ]
       ]
      },
      {
       "id": "m-transito-internacional",
       "titulo": "15. Tránsito internacional",
       "chips": [
        "Ola 1",
        "nivel 1·2",
        "prioridad 3,73",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "lee los avisos de fábricas y forwarders y actualiza (2); pide el estado al proveedor (1)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:6.3]] · [[proc:6.4]] · [[proc:7.6]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:4a.1]]"
        ],
        [
         "En la órbita",
         "[[mod:m-transito-internacional|ver el módulo]]"
        ],
        [
         "Se mide",
         "Anticipación con que logística conoce una llegada (indicador 7.1)"
        ],
        [
         "Línea base",
         "Logística se entera 2 días antes de un contenedor de 60–90 días; el tránsito aparece en Odoo 1–2 semanas antes (M26)"
        ],
        [
         "Meta",
         "Etapa y fecha visibles desde el embarque para ≥ 90 % de las OC, a los 4 meses"
        ],
        [
         "Se revisa si",
         "< 70 % de OC con etapa actualizada a los 3 meses"
        ],
        [
         "Dueño",
         "Comité Comercial / Director de Compras y Cadena de Suministros"
        ],
        [
         "Opera",
         "Analista de compras y Tráfico"
        ],
        [
         "Firma",
         "No requiere: actualiza etapa y fecha de forma reversible; la petición de estado al proveedor la envía el analista de compras"
        ],
        [
         "Calificación",
         "Valor 5,0 (frenos 5 · volumen 5 · pedido 5) · Viabilidad 2,3 (dato 2 · dependencias 3 · esfuerzo 2) · Riesgo 3,7 (personas 5 · exposición 3 · autonomía 3)"
        ],
        [
         "Por qué",
         "Resuelve 4a.1 (detiene) y la dirección pide cargar la compra en Odoo desde producción, con logística pidiendo saber a tiempo lo que viene. El dato vive en correos y archivos de Lark, y actualiza en nivel 2 la etapa que define lo prometible."
        ],
        [
         "Evidencia",
         "M15 · M17 · M24 · M26 · M52 · freno:4a.1 · freno:4a.2 · freno:5.2 · SC-01:2 · E-60:55 · E-03:156 · E-03:158 · E-40:112 · propuestas-to-be.md:243 · propuestas-to-be.md:936 · arquitectura-ia.html:743"
        ]
       ]
      },
      {
       "id": "m-mesa-de-compra-casio",
       "titulo": "18. Mesa de compra Casio",
       "chips": [
        "Ola 1",
        "nivel 1·2",
        "prioridad 3,68",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "propone cada cantidad con su explicación y el sobrepedido según el allocation histórico (1); registra el allocation (2)."
        ],
        [
         "Quién firma",
         "la cantidad y la OC."
        ],
        [
         "Procesos",
         "[[proc:6.3]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:2b.1]] · [[freno:3b.1]]"
        ],
        [
         "En la órbita",
         "[[mod:m-mesa-de-compra-casio|ver el módulo]]"
        ],
        [
         "Se mide",
         "Días-persona por ciclo de compra Casio y fecha en que la sábana está lista"
        ],
        [
         "Línea base",
         "2–3 días al mes, a menudo de noche, que sabe hacer una sola persona (M18)"
        ],
        [
         "Meta",
         "Sábana lista 5 días antes del order sheet y ≤ 1 día-persona por ciclo, tras 3 ciclos"
        ],
        [
         "Se revisa si",
         "Más de 2 días-persona por ciclo después del tercer ciclo"
        ],
        [
         "Dueño",
         "Comité Comercial / Director de Compras y Cadena de Suministros"
        ],
        [
         "Opera",
         "Analista de reportería de compras"
        ],
        [
         "Firma",
         "Dirección de compras (cantidad y OC)"
        ],
        [
         "Calificación",
         "Valor 4,7 (frenos 5 · volumen 4 · pedido 5) · Viabilidad 2,3 (dato 3 · dependencias 2 · esfuerzo 2) · Riesgo 4,0 (personas 5 · exposición 4 · autonomía 3)"
        ],
        [
         "Por qué",
         "Resuelve 2b.1 (detiene) y la dirección de compras pide un proceso con «la realidad de lo que debo pedir», aunque no quiere que una máquina decida el allocation. El sistema es grande y espera el pronóstico, el sell-out y los alias; propone cantidades que son dinero."
        ],
        [
         "Evidencia",
         "M18 · M20 · M21 · M22 · freno:2b.1 · freno:3b.1 · E-08:41 · E-08:85 · E-10:72 · E-08:143 · propuestas-to-be.md:210 · propuestas-to-be.md:937 · arquitectura-ia.html:735 · arquitectura-ia.html:857"
        ]
       ]
      },
      {
       "id": "m-mesa-de-compra-cubitt",
       "titulo": "29. Mesa de compra Cubitt",
       "chips": [
        "Ola 1",
        "nivel 1·2",
        "prioridad 3,52",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "arma el dossier y el acta (1); extrae los parámetros de proformas y facturas (2)."
        ],
        [
         "Quién firma",
         "la OC."
        ],
        [
         "Procesos",
         "[[proc:6.4]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:3a.1]] · [[freno:3a.2]]"
        ],
        [
         "En la órbita",
         "[[mod:m-mesa-de-compra-cubitt|ver el módulo]]"
        ],
        [
         "Se mide",
         "Mesas Cubitt celebradas en calendario con acta y OC en sistema"
        ],
        [
         "Línea base",
         "Más de 1 semana sin reunirse y ~1 mes de quiebre; órdenes de 5.000 a 20.000 piezas sin documento de sistema (M12, M13)"
        ],
        [
         "Meta",
         "100 % de mesas en fecha con acta y OC en borrador desde el acta, a los 3 meses"
        ],
        [
         "Se revisa si",
         "Una mesa aplazada más de una semana o una OC fuera del sistema en un trimestre"
        ],
        [
         "Dueño",
         "Director Corporativo Comercial"
        ],
        [
         "Opera",
         "Regional Cubitt (calcula las cantidades)"
        ],
        [
         "Firma",
         "Director(a) de Marca Propia y comité Cubitt (la OC)"
        ],
        [
         "Calificación",
         "Valor 4,3 (frenos 5 · volumen 3 · pedido 5) · Viabilidad 2,0 (dato 2 · dependencias 2 · esfuerzo 2) · Riesgo 4,3 (personas 5 · exposición 4 · autonomía 4)"
        ],
        [
         "Por qué",
         "Resuelve 3a.1 y 3a.2 (detienen) y la dirección de I+D pide estandarizar las OC con plantilla. El pedido mínimo y el lead time no están en ningún sistema y depende del tránsito Cubitt real."
        ],
        [
         "Evidencia",
         "M12 · M13 · M14 · freno:3a.1 · freno:3a.2 · E-60:55 · E-06-pt-1:111 · E-06-pt-2:5 · E-10:150 · E-08:125 · propuestas-to-be.md:222 · propuestas-to-be.md:934 · arquitectura-ia.html:729"
        ]
       ]
      },
      {
       "id": "m-pedido-intragrupo",
       "titulo": "36. Pedido intragrupo",
       "chips": [
        "Ola 2",
        "nivel 2",
        "prioridad 3,43",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "arma el pedido (2)."
        ],
        [
         "Quién firma",
         "recortar."
        ],
        [
         "Procesos",
         "[[proc:6.6]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:8b.1]]"
        ],
        [
         "En la órbita",
         "[[mod:m-pedido-intragrupo|ver el módulo]]"
        ],
        [
         "Se mide",
         "Pedidos intragrupo con OC en Odoo y recorte avisado con motivo"
        ],
        [
         "Línea base",
         "~2 semanas de preparación (M49); Costa Rica recibe 70–80 % de lo pedido (freno 8b.1)"
        ],
        [
         "Meta",
         "100 % de pedidos con OC en sistema y recorte avisado antes del despacho, a los 3 meses"
        ],
        [
         "Se revisa si",
         "Un recorte sin aviso en un mes"
        ],
        [
         "Dueño",
         "Coordinador(a) de Logística y Bodega (país)"
        ],
        [
         "Opera",
         "Planificación del país"
        ],
        [
         "Firma",
         "Gerencia comercial del hub (recortar)"
        ],
        [
         "Calificación",
         "Valor 4,3 (frenos 5 · volumen 3 · pedido 5) · Viabilidad 2,0 (dato 2 · dependencias 2 · esfuerzo 2) · Riesgo 4,0 (personas 5 · exposición 5 · autonomía 2)"
        ],
        [
         "Por qué",
         "Resuelve 8b.1 (detiene) y operaciones de VE ya pidió que la factura del hub se convierta sola en su compra. Espera que el tránsito funcione, escribe en tres instancias y arma el pedido en nivel 2, con firma solo para el recorte."
        ],
        [
         "Evidencia",
         "M49 · M50 · freno:8b.1 · freno:8b.3 · freno:9b.4 · E-34:252 · E-40:180 · E-40:238 · E-19:135 · propuestas-to-be.md:254 · propuestas-to-be.md:921 · arquitectura-ia.html:766"
        ]
       ]
      },
      {
       "id": "m-reclamos-a-proveedor",
       "titulo": "48. Reclamos a proveedor",
       "chips": [
        "Ola 3",
        "nivel 1",
        "prioridad 3,23",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "arma el reclamo (1)."
        ],
        [
         "Quién firma",
         "el envío."
        ],
        [
         "Procesos",
         "[[proc:6.9]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-reclamos-a-proveedor|ver el módulo]]"
        ],
        [
         "Se mide",
         "Faltantes de recepción reclamados con evidencia y monto recuperado"
        ],
        [
         "Línea base",
         "Por medir; «Pedí 10.000, muy probablemente lleguen 9.700» (M31)"
        ],
        [
         "Meta",
         "100 % de faltantes reclamados en ≤ 15 días con su evidencia, a los 6 meses"
        ],
        [
         "Se revisa si",
         "< 50 % de faltantes reclamados en plazo"
        ],
        [
         "Dueño",
         "Gerente de Operaciones y Logística"
        ],
        [
         "Opera",
         "Analista de inventarios (recepción)"
        ],
        [
         "Firma",
         "Coordinador(a) de Logística y Bodega (el envío)"
        ],
        [
         "Calificación",
         "Valor 2,7 (frenos 2 · volumen 3 · pedido 3) · Viabilidad 3,3 (dato 3 · dependencias 3 · esfuerzo 4) · Riesgo 4,0 (personas 5 · exposición 3 · autonomía 4)"
        ],
        [
         "Por qué",
         "Vínculo marginal con los frenos del circuito; las diferencias son frecuentes, pero solo se describe el dolor y la bodega virtual ya existe. Sistema pequeño en el que la IA redacta el reclamo y una persona lo envía."
        ],
        [
         "Evidencia",
         "M31 · E-34:195 · SC-01:71 · SC-01:73 · propuestas-to-be.md:273 · arquitectura-ia.html:748"
        ]
       ]
      }
     ]
    },
    {
     "t": "h",
     "x": "Logística · 6 casos"
    },
    {
     "t": "tabla",
     "cab": [
      "#",
      "Caso",
      "Ola",
      "Nivel",
      "V",
      "Vi",
      "R",
      "Prioridad",
      "Estado"
     ],
     "num": [
      0,
      4,
      5,
      6,
      7
     ],
     "filas": [
      [
       "2",
       "[[mod:m-vigia-del-stage|Vigía del stage]]",
       "Ola 1",
       "2",
       "5,0",
       "3,7",
       "4,3",
       "4,37",
       "propuesto"
      ],
      [
       "21",
       "[[mod:m-costo-en-destino|Costo en destino]]",
       "Ola 2",
       "2",
       "4,0",
       "2,7",
       "4,3",
       "3,62",
       "propuesto"
      ],
      [
       "24",
       "[[mod:m-expediente-de-importacion-en-destino|Expediente de importación en destino]]",
       "Ola 4",
       "2",
       "3,3",
       "3,0",
       "4,7",
       "3,55",
       "propuesto"
      ],
      [
       "28",
       "[[mod:m-inventario-confiable|Inventario confiable]]",
       "Ola 3",
       "1·2",
       "4,7",
       "1,7",
       "4,3",
       "3,53",
       "propuesto"
      ],
      [
       "41",
       "[[mod:m-llegada-a-zona-libre-y-liberacion|Llegada a Zona Libre y liberación]]",
       "Ola 2",
       "2",
       "4,0",
       "1,7",
       "4,7",
       "3,35",
       "propuesto"
      ],
      [
       "55",
       "[[mod:m-despacho-y-exportacion|Despacho y exportación]]",
       "Ola 3",
       "2",
       "3,7",
       "1,7",
       "4,0",
       "3,05",
       "propuesto"
      ]
     ]
    },
    {
     "t": "fichas",
     "items": [
      {
       "id": "m-vigia-del-stage",
       "titulo": "2. Vigía del stage",
       "chips": [
        "Ola 1",
        "nivel 2",
        "prioridad 4,37",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "marca como confirmado el pago que ya está en Odoo, avisa al vendedor de lo que espera al cliente y alerta por antigüedad (2)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:7.4]] · [[proc:7.5]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:9a.1]]"
        ],
        [
         "En la órbita",
         "[[mod:m-vigia-del-stage|ver el módulo]]"
        ],
        [
         "Se mide",
         "Días en stage por orden y órdenes con más de 30 días"
        ],
        [
         "Línea base",
         "Hasta 200 días en el stage, el 70 % del tiempo es espera y el stage está al 110 % (M46)"
        ],
        [
         "Meta",
         "−50 % de días promedio en stage y ninguna orden de más de 60 días, a los 4 meses"
        ],
        [
         "Se revisa si",
         "Sin mejora del promedio a los 3 meses"
        ],
        [
         "Dueño",
         "Analista de Facturación"
        ],
        [
         "Opera",
         "Tráfico y vendedores del mayor"
        ],
        [
         "Firma",
         "No requiere para avisar; se propone que el analista de facturación revise cada semana las marcas de pago"
        ],
        [
         "Calificación",
         "Valor 5,0 (frenos 5 · volumen 5 · pedido 5) · Viabilidad 3,7 (dato 3 · dependencias 4 · esfuerzo 4) · Riesgo 4,3 (personas 5 · exposición 5 · autonomía 3)"
        ],
        [
         "Por qué",
         "Resuelve 9a.1 (detiene) a diario y la dirección pide que el despacho sea «mucho más automatizado», sin el vendedor de intermediario. Solo lee Odoo y avisa, pero marca en nivel 2 el pago como confirmado, sin firma."
        ],
        [
         "Evidencia",
         "M46 · freno:9a.1 · freno:9a.2 · SC-01:316 · SC-01:309 · SC-01:319 · SC-01:279 · propuestas-to-be.md:301 · propuestas-to-be.md:907 · arquitectura-ia.html:763"
        ]
       ]
      },
      {
       "id": "m-costo-en-destino",
       "titulo": "21. Costo en destino",
       "chips": [
        "Ola 2",
        "nivel 2",
        "prioridad 3,62",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "reparte flete, seguro y aranceles y deja el borrador (2)."
        ],
        [
         "Quién firma",
         "lo publica contabilidad."
        ],
        [
         "Procesos",
         "[[proc:7.1]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:19.1]]"
        ],
        [
         "En la órbita",
         "[[mod:m-costo-en-destino|ver el módulo]]"
        ],
        [
         "Se mide",
         "Rezago del costo en destino por importación"
        ],
        [
         "Línea base",
         "2 meses de atraso con expediente físico (M54)"
        ],
        [
         "Meta",
         "≤ 10 días hábiles desde la llegada, a los 4 meses"
        ],
        [
         "Se revisa si",
         "> 30 días de media en un trimestre"
        ],
        [
         "Dueño",
         "Coordinador(a) de Logística y Bodega"
        ],
        [
         "Opera",
         "Analista de importaciones y contabilidad de VE"
        ],
        [
         "Firma",
         "Contabilidad (publica)"
        ],
        [
         "Calificación",
         "Valor 4,0 (frenos 5 · volumen 3 · pedido 4) · Viabilidad 2,7 (dato 2 · dependencias 3 · esfuerzo 3) · Riesgo 4,3 (personas 5 · exposición 5 · autonomía 3)"
        ],
        [
         "Por qué",
         "Aporta a 19.1 (detiene) y la dirección financiera pide los documentos a tiempo «porque el documento es el que nutre el costo». El expediente hoy es de papel, y el reparto queda en nivel 2 como borrador que publica contabilidad."
        ],
        [
         "Evidencia",
         "M54 · freno:19.1 · E-15:341 · E-15:345 · E-65:188 · propuestas-to-be.md:293 · propuestas-to-be.md:917 · arquitectura-ia.html:771"
        ]
       ]
      },
      {
       "id": "m-expediente-de-importacion-en-destino",
       "titulo": "24. Expediente de importación en destino",
       "chips": [
        "Ola 4",
        "nivel 2",
        "prioridad 3,55",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "revisa el checklist antes de embarcar (2)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:7.6]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:9b.2]]"
        ],
        [
         "En la órbita",
         "[[mod:m-expediente-de-importacion-en-destino|ver el módulo]]"
        ],
        [
         "Se mide",
         "Embarques retenidos en aduana por documentos faltantes"
        ],
        [
         "Línea base",
         "Por medir; hubo una retención por un certificado faltante (M53)"
        ],
        [
         "Meta",
         "Ningún embarque retenido por documentos en 12 meses"
        ],
        [
         "Se revisa si",
         "Una retención atribuible a un documento que el checklist no marcó"
        ],
        [
         "Dueño",
         "Líder de Administración / Importaciones"
        ],
        [
         "Opera",
         "Operaciones de VE (aduana)"
        ],
        [
         "Firma",
         "Se propone que la jefatura de importaciones revise el checklist antes de embarcar"
        ],
        [
         "Calificación",
         "Valor 3,3 (frenos 5 · volumen 2 · pedido 3) · Viabilidad 3,0 (dato 2 · dependencias 3 · esfuerzo 4) · Riesgo 4,7 (personas 5 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "Resuelve en parte 9b.2 (detiene) con volumen bajo («dolor bajo», M27), y solo hay dolor en entrevistas. Es un checklist que solo marca, pero faltan las fichas y los permisos por SKU."
        ],
        [
         "Evidencia",
         "M27 · M53 · freno:9b.2 · freno:9b.3 · E-34:242 · E-40:282 · E-42:295 · propuestas-to-be.md:333 · propuestas-to-be.md:947 · arquitectura-ia.html:770"
        ]
       ]
      },
      {
       "id": "m-inventario-confiable",
       "titulo": "28. Inventario confiable",
       "chips": [
        "Ola 3",
        "nivel 1·2",
        "prioridad 3,53",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "investiga las transacciones de cada diferencia antes de recontar (2) y propone destinos y un plan de 30 días para los excedentes (1)."
        ],
        [
         "Quién firma",
         "ajuste, scrap y remate."
        ],
        [
         "Procesos",
         "[[proc:7.2]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:6.2]]"
        ],
        [
         "En la órbita",
         "[[mod:m-inventario-confiable|ver el módulo]]"
        ],
        [
         "Se mide",
         "Coincidencia de conteo, días hasta el resultado y valor del inventario de más de 6 meses"
        ],
        [
         "Línea base",
         "~5 días para entregar el resultado de un conteo y 29 % de coincidencia en Cubitt (M30); USD 1 M estacionado (M04)"
        ],
        [
         "Meta",
         "≥ 95 % de coincidencia, resultado en ≤ 2 días y plan de 30 días para todo excedente, en 12 meses"
        ],
        [
         "Se revisa si",
         "< 80 % de coincidencia al segundo conteo"
        ],
        [
         "Dueño",
         "Coordinador(a) de Logística y Bodega"
        ],
        [
         "Opera",
         "Supervisión de inventario del hub"
        ],
        [
         "Firma",
         "Coordinación de logística (ajuste), contabilidad (scrap) y dirección comercial (remate)"
        ],
        [
         "Calificación",
         "Valor 4,7 (frenos 5 · volumen 4 · pedido 5) · Viabilidad 1,7 (dato 2 · dependencias 1 · esfuerzo 2) · Riesgo 4,3 (personas 5 · exposición 5 · autonomía 3)"
        ],
        [
         "Por qué",
         "Resuelve 6.2 (detiene); inventarios pide automatizar la revisión de diferencias y la dirección, saber qué rematar. Depende de cómo se refleje EBS (decisión 2), y propone ajustes y remates que firma una persona."
        ],
        [
         "Evidencia",
         "M04 · M30 · M32 · M34 · freno:6.2 · decision:2 · E-03:154 · E-08:168 · E-40:84 · E-03:213 · SC-06:1 · propuestas-to-be.md:321 · propuestas-to-be.md:940 · arquitectura-ia.html:747"
        ]
       ]
      },
      {
       "id": "m-llegada-a-zona-libre-y-liberacion",
       "titulo": "41. Llegada a Zona Libre y liberación",
       "chips": [
        "Ola 2",
        "nivel 2",
        "prioridad 3,35",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "actualiza la ETA y propone la liberación con las diferencias y el orden en que se amarran las preventas (2)."
        ],
        [
         "Quién firma",
         "liberar."
        ],
        [
         "Procesos",
         "[[proc:7.1]] · [[proc:7.6]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:6.1]]"
        ],
        [
         "En la órbita",
         "[[mod:m-llegada-a-zona-libre-y-liberacion|ver el módulo]]"
        ],
        [
         "Se mide",
         "Horas entre el fin de la descarga y la mercancía disponible en Odoo (indicador 7.1)"
        ],
        [
         "Línea base",
         "~1 día por contenedor, nada disponible hasta la última caja; 4–5 contenedores al mes y hasta 10 en temporada (M28, M25)"
        ],
        [
         "Meta",
         "≤ 4 h por contenedor y liberación por tramos, a los 4 meses del arranque"
        ],
        [
         "Se revisa si",
         "> 12 h de media en un mes"
        ],
        [
         "Dueño",
         "Coordinador(a) de Logística y Bodega"
        ],
        [
         "Opera",
         "Jefatura de Tráfico e inventarios del hub"
        ],
        [
         "Firma",
         "Coordinación de inventarios del hub (liberar)"
        ],
        [
         "Calificación",
         "Valor 4,0 (frenos 5 · volumen 3 · pedido 4) · Viabilidad 1,7 (dato 2 · dependencias 1 · esfuerzo 2) · Riesgo 4,7 (personas 5 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "Resuelve 6.1 (detiene) y la persona que libera pidió, a través de TI, validar los ingresos al llegar el contenedor. Depende de cómo se refleje EBS (decisión 2, abierta); actualiza la ETA y propone, y liberar sigue siendo firma."
        ],
        [
         "Evidencia",
         "M25 · M28 · freno:6.1 · freno:6.3 · decision:2 · E-07:28 · E-03:163 · E-03:161 · E-68:34 · propuestas-to-be.md:285 · propuestas-to-be.md:919 · arquitectura-ia.html:745"
        ]
       ]
      },
      {
       "id": "m-despacho-y-exportacion",
       "titulo": "55. Despacho y exportación",
       "chips": [
        "Ola 3",
        "nivel 2",
        "prioridad 3,05",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "arma la factura borrador de despacho y valida las instrucciones de empaque (2)."
        ],
        [
         "Quién firma",
         "ninguna; la emisión fiscal sigue en Odoo."
        ],
        [
         "Procesos",
         "[[proc:7.3]] · [[proc:7.4]] · [[proc:7.5]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-despacho-y-exportacion|ver el módulo]]"
        ],
        [
         "Se mide",
         "Tiempo para la factura borrador de despacho y pedidos reempacados"
        ],
        [
         "Línea base",
         "Un pedido de 38 cajas reversado para reempacar (M47); el packing list no llega a tiempo a Tráfico (M45)"
        ],
        [
         "Meta",
         "Factura borrador en ≤ 1 h desde el packing y ningún reempaque por instrucción, a los 6 meses"
        ],
        [
         "Se revisa si",
         "Más de 2 reempaques al mes"
        ],
        [
         "Dueño",
         "Coordinador(a) de Logística y Bodega"
        ],
        [
         "Opera",
         "Tráfico del hub"
        ],
        [
         "Firma",
         "Analista de facturación al emitir la factura en Odoo (no hay firma propia)"
        ],
        [
         "Calificación",
         "Valor 3,7 (frenos 3 · volumen 4 · pedido 4) · Viabilidad 1,7 (dato 2 · dependencias 1 · esfuerzo 2) · Riesgo 4,0 (personas 5 · exposición 4 · autonomía 3)"
        ],
        [
         "Por qué",
         "Alivia 9a.2 y 9a.3 (lentos) a diario; la dirección quiere que logística mande packing list y factura sin intermediarios, pero la validación de empaque no la pide nadie. Depende de EBS (decisión 2) y de los couriers."
        ],
        [
         "Evidencia",
         "M45 · M47 · M48 · freno:9a.2 · freno:9a.3 · decision:2 · SC-01:321 · E-70:223 · E-68:82 · propuestas-to-be.md:313 · arquitectura-ia.html:762"
        ]
       ]
      }
     ]
    },
    {
     "t": "h",
     "x": "Ventas · 20 casos"
    },
    {
     "t": "tabla",
     "cab": [
      "#",
      "Caso",
      "Ola",
      "Nivel",
      "V",
      "Vi",
      "R",
      "Prioridad",
      "Estado"
     ],
     "num": [
      0,
      4,
      5,
      6,
      7
     ],
     "filas": [
      [
       "4",
       "[[mod:m-buzon-de-sell-out-de-clientes|Buzón de sell-out de clientes]]",
       "Ola 1",
       "1·2",
       "5,0",
       "3,3",
       "3,3",
       "4,00",
       "prototipo"
      ],
      [
       "9",
       "[[mod:m-torre-retail-y-cuadro-diario|Torre retail y cuadro diario]]",
       "Ola 1",
       "2",
       "4,0",
       "3,3",
       "4,3",
       "3,85",
       "propuesto"
      ],
      [
       "11",
       "[[mod:m-plan-de-temporada|Plan de temporada]]",
       "Ola 1",
       "1",
       "3,3",
       "3,7",
       "4,7",
       "3,78",
       "propuesto"
      ],
      [
       "12",
       "[[mod:m-aprobacion-comercial-por-reglas|Aprobación comercial por reglas]]",
       "Ola 1",
       "2",
       "4,7",
       "3,0",
       "3,3",
       "3,75",
       "propuesto"
      ],
      [
       "16",
       "[[mod:m-mesa-de-ayuda-de-tiendas|Mesa de ayuda de tiendas]]",
       "Ola 4",
       "1",
       "4,0",
       "2,7",
       "4,7",
       "3,70",
       "propuesto"
      ],
      [
       "19",
       "[[mod:m-recepcion-en-tienda|Recepción en tienda]]",
       "Ola 2",
       "2",
       "3,7",
       "3,0",
       "4,7",
       "3,68",
       "propuesto"
      ],
      [
       "27",
       "[[mod:m-traslados-entre-tiendas|Traslados entre tiendas]]",
       "Ola 3",
       "2",
       "3,0",
       "3,3",
       "4,7",
       "3,53",
       "propuesto"
      ],
      [
       "30",
       "[[mod:m-disponibilidad-y-oferta|Disponibilidad y oferta]]",
       "Ola 3",
       "1",
       "3,7",
       "3,0",
       "4,0",
       "3,52",
       "propuesto"
      ],
      [
       "35",
       "[[mod:m-panel-unico-del-pedido|Panel único del pedido]]",
       "Ola 1",
       "2",
       "4,3",
       "2,0",
       "4,0",
       "3,43",
       "propuesto"
      ],
      [
       "38",
       "[[mod:m-limpieza-de-pedidos-cashea|Limpieza de pedidos Cashea]]",
       "Ola 2",
       "2",
       "4,3",
       "2,7",
       "3,0",
       "3,42",
       "propuesto"
      ],
      [
       "43",
       "[[mod:m-validacion-de-pagos|Validación de pagos]]",
       "Ola 1",
       "2",
       "4,7",
       "2,0",
       "3,0",
       "3,32",
       "propuesto"
      ],
      [
       "58",
       "[[mod:m-displays-y-mobiliario|Displays y mobiliario]]",
       "Ola 4",
       "1",
       "2,0",
       "3,0",
       "4,7",
       "3,02",
       "propuesto"
      ],
      [
       "59",
       "[[mod:m-expediente-de-apertura|Expediente de apertura]]",
       "Ola 4",
       "1",
       "2,3",
       "2,3",
       "5,0",
       "3,00",
       "propuesto"
      ],
      [
       "63",
       "[[mod:m-contactos-de-clientes|Contactos de clientes]]",
       "Ola 2",
       "2",
       "3,0",
       "2,3",
       "3,3",
       "2,85",
       "propuesto"
      ],
      [
       "64",
       "[[mod:m-pedidos-b2b|Pedidos B2B]]",
       "Ola 3",
       "2",
       "3,3",
       "1,7",
       "3,3",
       "2,75",
       "propuesto"
      ],
      [
       "65",
       "[[mod:m-kenex-usa-y-marketplaces-de-ee-uu|Kenex USA y marketplaces de EE. UU.]]",
       "Ola 4",
       "2",
       "3,3",
       "1,3",
       "3,7",
       "2,72",
       "propuesto"
      ],
      [
       "66",
       "[[mod:m-venta-asistida-por-chat|Venta asistida por chat]]",
       "Ola 1",
       "1·2",
       "3,3",
       "1,7",
       "3,0",
       "2,67",
       "propuesto"
      ],
      [
       "69",
       "[[mod:m-publicacion-por-canal|Publicación por canal]]",
       "Ola 3",
       "2",
       "3,0",
       "2,3",
       "2,3",
       "2,60",
       "propuesto"
      ],
      [
       "73",
       "[[mod:m-portal-de-clientes|Portal de clientes]]",
       "Ola 3",
       "2",
       "3,0",
       "1,3",
       "2,3",
       "2,25",
       "propuesto"
      ],
      [
       "75",
       "[[mod:m-portal-de-socios-y-franquicias|Portal de socios y franquicias]]",
       "Ola 3",
       "2",
       "2,7",
       "1,3",
       "2,7",
       "2,20",
       "propuesto"
      ]
     ]
    },
    {
     "t": "fichas",
     "items": [
      {
       "id": "m-buzon-de-sell-out-de-clientes",
       "titulo": "4. Buzón de sell-out de clientes",
       "chips": [
        "Ola 1",
        "nivel 1·2",
        "prioridad 4,00",
        "prototipo"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "reconoce el formato de cada Excel y lo normaliza (2); pide al cliente lo que falta (1)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:8.7]] · [[proc:8.17]] · [[proc:15.1]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:20.1]]"
        ],
        [
         "En la órbita",
         "[[mod:m-buzon-de-sell-out-de-clientes|ver el módulo]]"
        ],
        [
         "Se mide",
         "Cobertura de clientes con sell-out normalizado en la semana y filas mapeadas sin corrección"
        ],
        [
         "Línea base",
         "41 clientes en 41 formatos y más de 1.000 tiendas, reenviados por el vendedor a BI (M93); en Colombia ~30 min cada lunes a cargo de una persona (M94)"
        ],
        [
         "Meta",
         "Piloto de 2–3 semanas en paralelo con BI: ≥ 95 % de filas mapeadas sin corrección; a 6 meses, ≥ 80 % de los 41 clientes cargados en su semana"
        ],
        [
         "Se revisa si",
         "< 90 % de filas correctas frente a la tabla de BI en el piloto"
        ],
        [
         "Dueño",
         "Analista de Sistemas / Datos (célula de BI), dueño del proceso 15.1"
        ],
        [
         "Opera",
         "Analista de Sistemas / Datos (ETL); el vendedor y el KAM consultan la tabla"
        ],
        [
         "Firma",
         "Ninguna en la órbita; se propone que el Analista de Sistemas / Datos valide cada formato nuevo y los alias bajo el umbral, porque la tabla alimenta el pronóstico"
        ],
        [
         "Calificación",
         "Valor 5,0 (frenos 5 · volumen 5 · pedido 5) · Viabilidad 3,3 (dato 3 · dependencias 3 · esfuerzo 4) · Riesgo 3,3 (personas 4 · exposición 3 · autonomía 3)"
        ],
        [
         "Por qué",
         "Resuelve un freno que detiene (20.1), con volumen alto y pedido de la Presidencia y de la dirección comercial, y puede operar sin Odoo. Es el prototipo 3 (P3) de la Fase 2, decidido el 09-oct y documentado sin construir; el traspaso desde Fabric (decisión 7) sigue abierto."
        ],
        [
         "Evidencia",
         "freno:20.1 · freno:20.2 · freno:20.3 · M93 · M94 · E-01:87 · E-63:123 · E-05:166 · E-18:33 · E-18:73 · decision:7 · arquitectura-ia.html:857"
        ]
       ]
      },
      {
       "id": "m-torre-retail-y-cuadro-diario",
       "titulo": "9. Torre retail y cuadro diario",
       "chips": [
        "Ola 1",
        "nivel 2",
        "prioridad 3,85",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "alerta de anomalías (2)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:9.2]] · [[proc:9.5]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-torre-retail-y-cuadro-diario|ver el módulo]]"
        ],
        [
         "Se mide",
         "Hora a la que el cuadro diario de todas las tiendas está listo y alertas útiles de anomalía"
        ],
        [
         "Línea base",
         "Cada tienda descarga el cierre y lo digita en un cuadro compartido; las anomalías se ven «a ojo» (M61; E-47:269); el reporte de retail toma 3 días (M05)"
        ],
        [
         "Meta",
         "Cuadro regional listo a las 9:00 del día siguiente para el 100 % de las tiendas, a los 2 meses"
        ],
        [
         "Se revisa si",
         "> 30 % de alertas falsas en un mes"
        ],
        [
         "Dueño",
         "Gerente Regional Comercial / Retail (proceso 9.2)"
        ],
        [
         "Opera",
         "Gerente de Tienda (visto del cierre) y Gerente Regional Comercial / Retail"
        ],
        [
         "Firma",
         "No requiere: la alerta es informativa; el gerente de tienda da el visto al cuadro"
        ],
        [
         "Calificación",
         "Valor 4,0 (frenos 3 · volumen 4 · pedido 5) · Viabilidad 3,3 (dato 3 · dependencias 3 · esfuerzo 4) · Riesgo 4,3 (personas 4 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "La dueña del proceso 9.2 lo pide de forma explícita y es diario; sale del POS que ya está en Odoo. Ojo: el área ya construye su propia torre de control (E-55:32), que hay que absorber y no duplicar."
        ],
        [
         "Evidencia",
         "M61 · M05 · freno:15c.1 · freno:20.2 · E-55:82 · E-55:56 · E-47:269 · E-55:32"
        ]
       ]
      },
      {
       "id": "m-plan-de-temporada",
       "titulo": "11. Plan de temporada",
       "chips": [
        "Ola 1",
        "nivel 1",
        "prioridad 3,78",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "proyecta la capacidad a partir del histórico diario (1)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:10.15]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:12d.2]]"
        ],
        [
         "En la órbita",
         "[[mod:m-plan-de-temporada|ver el módulo]]"
        ],
        [
         "Se mide",
         "Error de la proyección semanal de órdenes de temporada frente a lo real"
        ],
        [
         "Línea base",
         "Capacidad planificada con una IA personal; 5.063 órdenes en julio y 7.000–8.000 proyectadas para diciembre (M74; E-41:301)"
        ],
        [
         "Meta",
         "Plan semanal de capacidad listo antes del 1-nov-2026 y error ≤ 15 % por semana durante la temporada"
        ],
        [
         "Se revisa si",
         "Error > 25 % en dos semanas seguidas"
        ],
        [
         "Dueño",
         "Gerente de E-commerce / Ventas Web (por país)"
        ],
        [
         "Opera",
         "Gerente de E-commerce / Ventas Web, con el Supervisor de Operaciones y Logística web"
        ],
        [
         "Firma",
         "No requiere: es una proyección; el plan de personal y de espacio lo aprueba el Gerente de E-commerce"
        ],
        [
         "Calificación",
         "Valor 3,3 (frenos 4 · volumen 3 · pedido 3) · Viabilidad 3,7 (dato 3 · dependencias 4 · esfuerzo 4) · Riesgo 4,7 (personas 5 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "Urgente para diciembre de 2026 y formaliza un uso de IA personal (isla). Ataca el freno 12d.2, pero la falta de espacio físico no la resuelve la plataforma; sale del histórico diario de pedidos."
        ],
        [
         "Evidencia",
         "freno:12d.2 · M74 · E-41:311 · E-41:287 · E-41:301 · E-16:137 · propuestas-to-be.md:910"
        ]
       ]
      },
      {
       "id": "m-aprobacion-comercial-por-reglas",
       "titulo": "12. Aprobación comercial por reglas",
       "chips": [
        "Ola 1",
        "nivel 2",
        "prioridad 3,75",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "marca lo que se puede aprobar por regla, así el aprobador ve solo las excepciones (2)."
        ],
        [
         "Quién firma",
         "confirmar las excepciones."
        ],
        [
         "Procesos",
         "[[proc:8.5]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:7.2]]"
        ],
        [
         "En la órbita",
         "[[mod:m-aprobacion-comercial-por-reglas|ver el módulo]]"
        ],
        [
         "Se mide",
         "Pedidos aprobados por regla y horas de espera por aprobación"
        ],
        [
         "Línea base",
         "Cada pedido pasa por la gerencia o la dirección comercial y se detiene si el aprobador viaja (M35; freno 7.2); horas de espera por medir"
        ],
        [
         "Meta",
         "≥ 60 % de los pedidos aprobados por regla, espera < 4 h hábiles y cero pedidos parados por viaje, a los 3 meses"
        ],
        [
         "Se revisa si",
         "Un pedido aprobado por regla que debió ser excepción (margen o crédito) en la auditoría mensual"
        ],
        [
         "Dueño",
         "Gerente Comercial (País / Canal)"
        ],
        [
         "Opera",
         "Gerente Comercial (País / Canal), que ve solo las excepciones"
        ],
        [
         "Firma",
         "Gerente Comercial (País / Canal) o Director(a) Comercial, para las excepciones"
        ],
        [
         "Calificación",
         "Valor 4,7 (frenos 5 · volumen 4 · pedido 5) · Viabilidad 3,0 (dato 3 · dependencias 2 · esfuerzo 4) · Riesgo 3,3 (personas 3 · exposición 4 · autonomía 3)"
        ],
        [
         "Por qué",
         "Resuelve un freno que detiene (7.2) y un directivo pide explícitamente que las aprobaciones no dependan de él. Lee datos que ya están en Odoo, pero espera las credenciales (C#2) y las reglas escritas con la gerencia comercial (decisión 14)."
        ],
        [
         "Evidencia",
         "freno:7.2 · freno:10b.4 · M35 · E-08:170 · E-05:182 · E-62:58 · decision:14 · propuestas-to-be.md:905"
        ]
       ]
      },
      {
       "id": "m-mesa-de-ayuda-de-tiendas",
       "titulo": "16. Mesa de ayuda de tiendas",
       "chips": [
        "Ola 4",
        "nivel 1",
        "prioridad 3,70",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "responde lo recurrente y escala el resto (1)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:9.6]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-mesa-de-ayuda-de-tiendas|ver el módulo]]"
        ],
        [
         "Se mide",
         "Consultas recurrentes de tiendas resueltas sin escalar y tiempo de respuesta"
        ],
        [
         "Línea base",
         "Una sola persona atiende los grupos de Lark y WhatsApp de las 20 tiendas de VE los 7 días (M60; E-07:52); volumen por medir"
        ],
        [
         "Meta",
         "≥ 50 % de las consultas recurrentes resueltas con la base de conocimiento, a los 6 meses"
        ],
        [
         "Se revisa si",
         "< 30 % resueltas, o una respuesta errónea que detenga una caja"
        ],
        [
         "Dueño",
         "Gerente de Tienda / Supervisor de Ventas (proceso 9.6); el soporte lo presta Tecnología (14.5)"
        ],
        [
         "Opera",
         "Coordinador(a) de Sistemas de cada país"
        ],
        [
         "Firma",
         "No requiere para respuestas de la base aprobada; se propone que el Coordinador(a) de Sistemas apruebe cada respuesta nueva antes de sumarla a la base"
        ],
        [
         "Calificación",
         "Valor 4,0 (frenos 3 · volumen 4 · pedido 5) · Viabilidad 2,7 (dato 2 · dependencias 3 · esfuerzo 3) · Riesgo 4,7 (personas 5 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "La gerencia de TI pide explícitamente un asistente que responda lo recurrente, y hoy depende de una sola persona (14c.3). Es de uso interno y bajo riesgo, pero la base de conocimiento no existe y hay que construirla."
        ],
        [
         "Evidencia",
         "M60 · freno:14c.3 · E-52:180 · E-07:52"
        ]
       ]
      },
      {
       "id": "m-recepcion-en-tienda",
       "titulo": "19. Recepción en tienda",
       "chips": [
        "Ola 2",
        "nivel 2",
        "prioridad 3,68",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "cuadra la factura contra el pedido y deja el traslado listo (2)."
        ],
        [
         "Quién firma",
         "lo valida el escaneo en tienda."
        ],
        [
         "Procesos",
         "[[proc:9.3]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:13c.1]]"
        ],
        [
         "En la órbita",
         "[[mod:m-recepcion-en-tienda|ver el módulo]]"
        ],
        [
         "Se mide",
         "Horas desde la llegada de la mercancía a la tienda hasta que queda disponible para la venta"
        ],
        [
         "Línea base",
         "Toda la mañana del lunes de un supervisor para el doble registro; la mercancía está y no se vende (M57; E-53:122)"
        ],
        [
         "Meta",
         "Mercancía vendible en < 1 h desde el escaneo en el piloto de Panamá, a los 3 meses"
        ],
        [
         "Se revisa si",
         "> 2 % de diferencias entre factura y pedido no detectadas"
        ],
        [
         "Dueño",
         "Gerente de Ventas al Detal (País); en Panamá, el Supervisor de Ventas (proceso 9.3)"
        ],
        [
         "Opera",
         "Gerente de Tienda / Supervisor de Ventas"
        ],
        [
         "Firma",
         "Gerente de Tienda, que valida con el escaneo"
        ],
        [
         "Calificación",
         "Valor 3,7 (frenos 5 · volumen 3 · pedido 3) · Viabilidad 3,0 (dato 3 · dependencias 3 · esfuerzo 3) · Riesgo 4,7 (personas 5 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "Resuelve un freno que detiene (13c.1) con un caso semanal y acotado a Panamá. Espera una app de escaneo en tablet y las credenciales de Odoo; el escaneo actúa como control."
        ],
        [
         "Evidencia",
         "freno:13c.1 · M57 · E-53:122 · E-53:110 · propuestas-to-be.md:918"
        ]
       ]
      },
      {
       "id": "m-traslados-entre-tiendas",
       "titulo": "27. Traslados entre tiendas",
       "chips": [
        "Ola 3",
        "nivel 2",
        "prioridad 3,53",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "sugiere la tienda de origen más cercana con stock (2)."
        ],
        [
         "Quién firma",
         "confirma el supervisor."
        ],
        [
         "Procesos",
         "[[proc:9.4]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-traslados-entre-tiendas|ver el módulo]]"
        ],
        [
         "Se mide",
         "Descuadres de inventario causados por traslados y tiempo de atención de la solicitud"
        ],
        [
         "Línea base",
         "Traslados pedidos por correo, típicos del domingo; «se te rompían inventarios» (M58)"
        ],
        [
         "Meta",
         "100 % de los traslados por solicitud en sistema y −50 % de descuadres por traslado, a los 6 meses"
        ],
        [
         "Se revisa si",
         "Sugerencias de origen rechazadas por el supervisor en > 30 %"
        ],
        [
         "Dueño",
         "Gerente de Ventas al Detal (País); en Panamá, el Supervisor de Ventas (proceso 9.4)"
        ],
        [
         "Opera",
         "Gerente de Tienda"
        ],
        [
         "Firma",
         "Supervisor de Ventas, que confirma el traslado"
        ],
        [
         "Calificación",
         "Valor 3,0 (frenos 3 · volumen 3 · pedido 3) · Viabilidad 3,3 (dato 3 · dependencias 3 · esfuerzo 4) · Riesgo 4,7 (personas 5 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "Alivia un freno lento (14c.5) con un caso semanal. Lectura sobre el espejo con confirmación del supervisor: viable y de bajo riesgo."
        ],
        [
         "Evidencia",
         "M58 · freno:14c.5 · E-53:202 · E-55:56"
        ]
       ]
      },
      {
       "id": "m-disponibilidad-y-oferta",
       "titulo": "30. Disponibilidad y oferta",
       "chips": [
        "Ola 3",
        "nivel 1",
        "prioridad 3,52",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "prepara la lista de los lunes (1)."
        ],
        [
         "Quién firma",
         "la envía el vendedor."
        ],
        [
         "Procesos",
         "[[proc:8.3]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-disponibilidad-y-oferta|ver el módulo]]"
        ],
        [
         "Se mide",
         "Clientes activos que reciben su lista de disponibilidad cada lunes"
        ],
        [
         "Línea base",
         "Un Excel de los lunes que no todos los vendedores mandan; todos ofrecen el mismo stock (M38; E-05:158); cobertura por medir"
        ],
        [
         "Meta",
         "100 % de los clientes activos de cada segmento con su lista el lunes antes de las 10:00, a los 2 meses de operar"
        ],
        [
         "Se revisa si",
         "< 80 % de cobertura, o listas con disponible que no se puede comprometer"
        ],
        [
         "Dueño",
         "Gerente Comercial (País / Canal)"
        ],
        [
         "Opera",
         "Analista/Ejecutivo(a) Comercial"
        ],
        [
         "Firma",
         "Analista/Ejecutivo(a) Comercial, que envía la lista"
        ],
        [
         "Calificación",
         "Valor 3,7 (frenos 3 · volumen 3 · pedido 5) · Viabilidad 3,0 (dato 3 · dependencias 2 · esfuerzo 4) · Riesgo 4,0 (personas 4 · exposición 3 · autonomía 5)"
        ],
        [
         "Por qué",
         "La dirección comercial pide de forma explícita que todos los clientes reciban la lista cada semana. Alivia frenos lentos (8a.1, 7.3), pero el disponible comprometible depende del Vigía de reservas y de las credenciales de Odoo."
        ],
        [
         "Evidencia",
         "M38 · freno:8a.1 · freno:7.3 · E-63:123 · E-07:134 · E-05:158"
        ]
       ]
      },
      {
       "id": "m-panel-unico-del-pedido",
       "titulo": "35. Panel único del pedido",
       "chips": [
        "Ola 1",
        "nivel 2",
        "prioridad 3,43",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "lo mantiene al día leyendo cada canal (2)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:10.7]] · [[proc:10.13]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-panel-unico-del-pedido|ver el módulo]]"
        ],
        [
         "Se mide",
         "Minutos al día por asesor buscando el estado de los pedidos"
        ],
        [
         "Línea base",
         "~1 h al día por asesor (M65; freno 13d.1); 5.063 órdenes en julio de 2026"
        ],
        [
         "Meta",
         "≤ 10 min al día por asesor y ≥ 98 % de pedidos con estado al día, a los 3 meses"
        ],
        [
         "Se revisa si",
         "> 5 % de pedidos con un estado distinto al real en la muestra semanal"
        ],
        [
         "Dueño",
         "Gerente de E-commerce / Ventas Web (por país)"
        ],
        [
         "Opera",
         "Asesor(a) de Ventas Web"
        ],
        [
         "Firma",
         "No requiere: refleja los eventos de cada canal sin decidir nada"
        ],
        [
         "Calificación",
         "Valor 4,3 (frenos 3 · volumen 5 · pedido 5) · Viabilidad 2,0 (dato 2 · dependencias 2 · esfuerzo 2) · Riesgo 4,0 (personas 3 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "La gerencia web lo pide como su «mundo ideal» y ahorra una hora diaria por asesor; además es la base del copiloto. El dato está repartido en tres lugares y depende de Cashea, de los couriers y de Odoo."
        ],
        [
         "Evidencia",
         "M65 · freno:13d.1 · freno:11d.5 · E-41:84 · E-41:88 · E-16:146 · arquitectura-ia.html:839"
        ]
       ]
      },
      {
       "id": "m-limpieza-de-pedidos-cashea",
       "titulo": "38. Limpieza de pedidos Cashea",
       "chips": [
        "Ola 2",
        "nivel 2",
        "prioridad 3,42",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "confirma solo lo pagado y completa el contacto (2)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:10.7]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:11d.1]]"
        ],
        [
         "En la órbita",
         "[[mod:m-limpieza-de-pedidos-cashea|ver el módulo]]"
        ],
        [
         "Se mide",
         "Pedidos de Cashea depurados sin hoja paralela y con contacto completo"
        ],
        [
         "Línea base",
         "Excel paralelo de ~4.000 pedidos al mes y una persona dedicada a cruzarlos (M63; E-41:198)"
        ],
        [
         "Meta",
         "Cero hoja paralela y ≥ 95 % de pedidos con contacto completo, a los 3 meses"
        ],
        [
         "Se revisa si",
         "Un pedido confirmado sin pago, o > 2 % de cancelados que llegan a preparación"
        ],
        [
         "Dueño",
         "Gerente de E-commerce / Ventas Web (por país)"
        ],
        [
         "Opera",
         "Asesor(a) de Ventas Web a cargo del montaje de órdenes"
        ],
        [
         "Firma",
         "Ninguna en la órbita; se propone que el Gerente de E-commerce revise cada semana una muestra de confirmaciones, porque la IA confirma pedidos en nivel 2"
        ],
        [
         "Calificación",
         "Valor 4,3 (frenos 5 · volumen 5 · pedido 3) · Viabilidad 2,7 (dato 2 · dependencias 2 · esfuerzo 4) · Riesgo 3,0 (personas 3 · exposición 4 · autonomía 2)"
        ],
        [
         "Por qué",
         "Resuelve un freno que detiene (11d.1) con alto volumen. La vía de reportes de Cashea está por confirmar y Cashea prometió una corrección; si llega, el caso se achica."
        ],
        [
         "Evidencia",
         "freno:11d.1 · M63 · E-41:198 · E-16:126 · propuestas-to-be.md:922"
        ]
       ]
      },
      {
       "id": "m-validacion-de-pagos",
       "titulo": "43. Validación de pagos",
       "chips": [
        "Ola 1",
        "nivel 2",
        "prioridad 3,32",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "empareja el comprobante con el movimiento del banco y pasa el pedido a preparación (2)."
        ],
        [
         "Quién firma",
         "lo que no casa lo firma alguien fuera del equipo que vende."
        ],
        [
         "Procesos",
         "[[proc:10.8]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:11d.4]]"
        ],
        [
         "En la órbita",
         "[[mod:m-validacion-de-pagos|ver el módulo]]"
        ],
        [
         "Se mide",
         "Pagos emparejados sin intervención y tiempo hasta pasar el pedido a preparación"
        ],
        [
         "Línea base",
         "10–15 pagos al día confirmados uno a uno en el banco, domingos incluidos, por el mismo equipo que vende (M70; freno 11d.4)"
        ],
        [
         "Meta",
         "≥ 80 % emparejados sin intervención, < 30 min hasta preparación y 100 % de las excepciones firmadas fuera de ventas, a los 3 meses"
        ],
        [
         "Se revisa si",
         "Un pedido despachado sin pago confirmado"
        ],
        [
         "Dueño",
         "Gerente de E-commerce / Ventas Web (por país), de forma transitoria hasta que el proceso pase a Contabilidad / Tesorería"
        ],
        [
         "Opera",
         "Administración, fuera del equipo que vende"
        ],
        [
         "Firma",
         "Administración / Contabilidad, fuera del equipo que vende, para lo que no casa"
        ],
        [
         "Calificación",
         "Valor 4,7 (frenos 5 · volumen 4 · pedido 5) · Viabilidad 2,0 (dato 2 · dependencias 2 · esfuerzo 2) · Riesgo 3,0 (personas 2 · exposición 4 · autonomía 3)"
        ],
        [
         "Por qué",
         "Resuelve un freno que detiene (11d.4: el que vende valida sus pagos) y la gerencia web pide explícitamente dejar de validar. Necesita conectores bancarios y nombrar al firmante (decisión 12); maneja datos de pago de consumidores."
        ],
        [
         "Evidencia",
         "freno:11d.4 · freno:11d.5 · M70 · E-41:88 · E-41:50 · E-41:60 · decision:12"
        ]
       ]
      },
      {
       "id": "m-displays-y-mobiliario",
       "titulo": "58. Displays y mobiliario",
       "chips": [
        "Ola 4",
        "nivel 1",
        "prioridad 3,02",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "arma la ficha del cliente con sus compras y pagos (1)."
        ],
        [
         "Quién firma",
         "aprobar el mueble."
        ],
        [
         "Procesos",
         "[[proc:8.13]] · [[proc:16.7]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-displays-y-mobiliario|ver el módulo]]"
        ],
        [
         "Se mide",
         "Días hábiles desde la solicitud del mueble hasta la decisión"
        ],
        [
         "Línea base",
         "25–37 días hábiles por mueble nuevo; la macro registra 230 clientes y son unos 400 (M44; E-31:423)"
        ],
        [
         "Meta",
         "Decisión en ≤ 5 días hábiles con la ficha del cliente, a los 6 meses"
        ],
        [
         "Se revisa si",
         "Fichas con compras o pagos que no cuadran con Odoo"
        ],
        [
         "Dueño",
         "Gerente Regional Comercial / Retail (proceso 8.13)"
        ],
        [
         "Opera",
         "Coordinador(a) de Visual Merchandising"
        ],
        [
         "Firma",
         "Gerente Regional Comercial / Retail o el KAM del cliente, según el monto, que aprueba el mueble"
        ],
        [
         "Calificación",
         "Valor 2,0 (frenos 1 · volumen 2 · pedido 3) · Viabilidad 3,0 (dato 3 · dependencias 3 · esfuerzo 3) · Riesgo 4,7 (personas 4 · exposición 5 · autonomía 5)"
        ],
        [
         "Por qué",
         "Bajo volumen y sin freno del circuito; la IA solo arma la ficha del cliente (nivel 1) y una persona aprueba el mueble. Riesgo bajo."
        ],
        [
         "Evidencia",
         "M44 · E-31:423 · E-31:487"
        ]
       ]
      },
      {
       "id": "m-expediente-de-apertura",
       "titulo": "59. Expediente de apertura",
       "chips": [
        "Ola 4",
        "nivel 1",
        "prioridad 3,00",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "arma el expediente con un comparable (1)."
        ],
        [
         "Quién firma",
         "aprobar la apertura."
        ],
        [
         "Procesos",
         "[[proc:9.8]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-expediente-de-apertura|ver el módulo]]"
        ],
        [
         "Se mide",
         "Aperturas con expediente y comparable completos antes de la aprobación"
        ],
        [
         "Línea base",
         "Hasta 8 aperturas simultáneas con checklist disperso y POS configurado copiando otra tienda en producción (M116)"
        ],
        [
         "Meta",
         "100 % de las aperturas con expediente y comparable antes de la decisión, desde la siguiente apertura"
        ],
        [
         "Se revisa si",
         "Una apertura configurada fuera de la plantilla"
        ],
        [
         "Dueño",
         "Gerente de Proyectos (PMO) para el proyecto, con el Gerente Regional Comercial / Retail para la decisión (proceso 9.8)"
        ],
        [
         "Opera",
         "Gerente de Proyectos (PMO)"
        ],
        [
         "Firma",
         "Junta Directiva o Gerente Regional Comercial / Retail, que aprueba la apertura"
        ],
        [
         "Calificación",
         "Valor 2,3 (frenos 1 · volumen 2 · pedido 4) · Viabilidad 2,3 (dato 2 · dependencias 2 · esfuerzo 3) · Riesgo 5,0 (personas 5 · exposición 5 · autonomía 5)"
        ],
        [
         "Por qué",
         "Sin freno del circuito y de bajo volumen. La dirección comercial pide reforzar el análisis de apertura ante la Junta (E-05:245), más amplio que la plantilla técnica. Nivel 1 con firma: riesgo bajo."
        ],
        [
         "Evidencia",
         "M116 · E-05:245 · E-05:254 · E-55:52"
        ]
       ]
      },
      {
       "id": "m-contactos-de-clientes",
       "titulo": "63. Contactos de clientes",
       "chips": [
        "Ola 2",
        "nivel 2",
        "prioridad 2,85",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "los completa a partir de chats y correos (2)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:8.2]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-contactos-de-clientes|ver el módulo]]"
        ],
        [
         "Se mide",
         "Clientes del mayor con contactos de venta, cobro y logística completos en Odoo"
        ],
        [
         "Línea base",
         "Por medir; los contactos viven en el teléfono del vendedor y una cartera cambió de manos con la salida de un vendedor (M42)"
        ],
        [
         "Meta",
         "≥ 90 % de los clientes activos con los tres contactos a los 6 meses"
        ],
        [
         "Se revisa si",
         "> 5 % de contactos erróneos en la revisión trimestral, o una queja por el uso de los datos"
        ],
        [
         "Dueño",
         "Gerente Regional Comercial (Mayoreo)"
        ],
        [
         "Opera",
         "Analista/Ejecutivo(a) Comercial"
        ],
        [
         "Firma",
         "Ninguna en la órbita; se propone que el Analista/Ejecutivo(a) Comercial confirme cada contacto nuevo antes de guardarlo, por tratarse de datos personales"
        ],
        [
         "Calificación",
         "Valor 3,0 (frenos 3 · volumen 3 · pedido 3) · Viabilidad 2,3 (dato 2 · dependencias 2 · esfuerzo 3) · Riesgo 3,3 (personas 2 · exposición 5 · autonomía 3)"
        ],
        [
         "Por qué",
         "Alivia la intermediación del vendedor (9a.2), pero extrae datos personales de chats y correos en nivel 2 sin firma: por eso el riesgo de datos personales es alto. Espera los números corporativos de WhatsApp (decisión 13)."
        ],
        [
         "Evidencia",
         "M42 · freno:9a.2 · SC-01:327 · E-57:74 · decision:13"
        ]
       ]
      },
      {
       "id": "m-pedidos-b2b",
       "titulo": "64. Pedidos B2B",
       "chips": [
        "Ola 3",
        "nivel 2",
        "prioridad 2,75",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "convierte el chat, la foto o el Excel del cliente en pedido (2); avisa del faltante con sustitutos (2)."
        ],
        [
         "Quién firma",
         "confirmar, si compromete crédito o stock asignado."
        ],
        [
         "Procesos",
         "[[proc:8.4]] · [[proc:8.6]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-pedidos-b2b|ver el módulo]]"
        ],
        [
         "Se mide",
         "Pedidos del mayor registrados en Odoo desde su origen y faltantes avisados antes del picking"
        ],
        [
         "Línea base",
         "El 80 % de los clientes compra por teléfono y parte de la venta no pasa por Odoo (M39, M41); en VE el faltante aparece al pickear (M43)"
        ],
        [
         "Meta",
         "≥ 90 % de los pedidos del mayor con su presupuesto en Odoo y faltante avisado antes del picking en ≥ 80 %, a los 6 meses"
        ],
        [
         "Se revisa si",
         "> 15 % de presupuestos convertidos con errores de línea"
        ],
        [
         "Dueño",
         "Analista/Ejecutivo(a) Comercial, supervisado por el Gerente Comercial (País / Canal) (proceso 8.4)"
        ],
        [
         "Opera",
         "Analista/Ejecutivo(a) Comercial"
        ],
        [
         "Firma",
         "Gerente Comercial (País / Canal), cuando el pedido compromete crédito o stock asignado"
        ],
        [
         "Calificación",
         "Valor 3,3 (frenos 3 · volumen 4 · pedido 3) · Viabilidad 1,7 (dato 2 · dependencias 1 · esfuerzo 2) · Riesgo 3,3 (personas 3 · exposición 4 · autonomía 3)"
        ],
        [
         "Por qué",
         "Volumen diario y dolor claro, pero el dato vive fuera de Odoo (chats y Excel) y depende de la política de crédito, del catálogo, del portal y de los números corporativos de WhatsApp. Sistema nuevo con varias integraciones."
        ],
        [
         "Evidencia",
         "M39 · M41 · M43 · freno:11e.2 · freno:11e.4 · freno:12e.1 · E-05:158 · E-63:95 · E-36:6 · decision:13"
        ]
       ]
      },
      {
       "id": "m-kenex-usa-y-marketplaces-de-ee-uu",
       "titulo": "65. Kenex USA y marketplaces de EE. UU.",
       "chips": [
        "Ola 4",
        "nivel 2",
        "prioridad 2,72",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "clasifica las devoluciones (2)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:10.5]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-kenex-usa-y-marketplaces-de-ee-uu|ver el módulo]]"
        ],
        [
         "Se mide",
         "Devoluciones de marketplaces con estado y motivo clasificados"
        ],
        [
         "Línea base",
         "Miles de devoluciones al mes sin registro de su estado, en 15 marketplaces (M115; freno US.2)"
        ],
        [
         "Meta",
         "≥ 90 % de las devoluciones clasificadas en 48 h, a los 6 meses de conectar los marketplaces"
        ],
        [
         "Se revisa si",
         "> 10 % de clasificaciones corregidas"
        ],
        [
         "Dueño",
         "Gerente de E-commerce / Ventas Web de Kenex USA (proceso 10.5)"
        ],
        [
         "Opera",
         "Equipo de e-commerce de Kenex USA"
        ],
        [
         "Firma",
         "Ninguna en la órbita; se propone que el Gerente de E-commerce de Kenex USA revise las devoluciones que se reingresan a stock o se dan de baja"
        ],
        [
         "Calificación",
         "Valor 3,3 (frenos 3 · volumen 4 · pedido 3) · Viabilidad 1,3 (dato 2 · dependencias 1 · esfuerzo 1) · Riesgo 3,7 (personas 3 · exposición 5 · autonomía 3)"
        ],
        [
         "Por qué",
         "Volumen alto de devoluciones, pero depende de decidir si Kenex USA migra a Odoo y de conectar QuickBooks y 15 marketplaces. La dueña pide delegar otras tareas (impresión de órdenes, respuestas de Amazon), no esta."
        ],
        [
         "Evidencia",
         "M114 · M115 · freno:US.1 · freno:US.2 · E-06-pt-2:33 · E-30:45 · E-30:77"
        ]
       ]
      },
      {
       "id": "m-venta-asistida-por-chat",
       "titulo": "66. Venta asistida por chat",
       "chips": [
        "Ola 1",
        "nivel 1·2",
        "prioridad 2,67",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "arma el presupuesto con su link de pago (2); el mensaje lo envía el asesor (1)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:10.6]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-venta-asistida-por-chat|ver el módulo]]"
        ],
        [
         "Se mide",
         "Venta del canal de chat y minutos por presupuesto armado"
        ],
        [
         "Línea base",
         "WhatsApp vendió USD 37.000 en abril de 2026 frente a USD 30.000 de la web (M66; E-16:139); minutos por presupuesto por medir"
        ],
        [
         "Meta",
         "+15 % de venta del chat frente a la base de abril en igual temporada y presupuesto en < 2 min, a los 6 meses"
        ],
        [
         "Se revisa si",
         "Descuentos fuera de política en > 2 % de los presupuestos"
        ],
        [
         "Dueño",
         "Gerente de E-commerce / Ventas Web (por país)"
        ],
        [
         "Opera",
         "Asesor(a) de Ventas Web"
        ],
        [
         "Firma",
         "Ninguna en la órbita; el asesor que envía firma de hecho, y se propone que el Gerente de E-commerce firme los descuentos fuera de lista"
        ],
        [
         "Calificación",
         "Valor 3,3 (frenos 3 · volumen 4 · pedido 3) · Viabilidad 1,7 (dato 2 · dependencias 1 · esfuerzo 2) · Riesgo 3,0 (personas 3 · exposición 3 · autonomía 3)"
        ],
        [
         "Por qué",
         "Canal diario y que ya vende más que la web, pero depende de Mercately, de los números corporativos y del panel del pedido. La IA arma el presupuesto y el asesor envía, como pide la regla de atención (MC:18665)."
        ],
        [
         "Evidencia",
         "M66 · freno:11d.3 · E-16:136 · E-16:139 · MC:18665 · decision:1 · decision:13"
        ]
       ]
      },
      {
       "id": "m-publicacion-por-canal",
       "titulo": "69. Publicación por canal",
       "chips": [
        "Ola 3",
        "nivel 2",
        "prioridad 2,60",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "redacta las fichas y publica fichas y stock al llegar la mercancía (2)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:10.3]] · [[proc:10.4]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-publicacion-por-canal|ver el módulo]]"
        ],
        [
         "Se mide",
         "Días desde la llegada de la mercancía hasta que está publicada en cada canal"
        ],
        [
         "Línea base",
         "Publicación a mano, canal por canal; productos en bodega sin activar en la web (M64; E-42:144); días por medir"
        ],
        [
         "Meta",
         "Publicado en ≤ 1 día hábil desde la llegada en el 90 % de los SKU, a los 6 meses"
        ],
        [
         "Se revisa si",
         "Una ficha publicada con un dato erróneo de precio o de producto"
        ],
        [
         "Dueño",
         "Gerente de E-commerce / Ventas Web (por país)"
        ],
        [
         "Opera",
         "Gerente de E-commerce / Ventas Web y el equipo de contenido web"
        ],
        [
         "Firma",
         "Ninguna en la órbita, en conflicto con la regla de que lo que sale hacia clientes lo envía una persona; se propone que el Gerente de E-commerce apruebe cada ficha nueva y que solo el stock se sincronice solo"
        ],
        [
         "Calificación",
         "Valor 3,0 (frenos 3 · volumen 3 · pedido 3) · Viabilidad 2,3 (dato 3 · dependencias 2 · esfuerzo 2) · Riesgo 2,3 (personas 5 · exposición 1 · autonomía 1)"
        ],
        [
         "Por qué",
         "Riesgo alto tal como está: la IA redacta y publica hacia fuera en nivel 2 sin firma (choca con propuestas-to-be.md:31). Depende del catálogo único y de tres conectores de tiendas online."
        ],
        [
         "Evidencia",
         "M64 · freno:SW.1 · freno:11d.2 · E-42:144 · E-30:51 · E-16:112 · propuestas-to-be.md:31"
        ]
       ]
      },
      {
       "id": "m-portal-de-clientes",
       "titulo": "73. Portal de clientes",
       "chips": [
        "Ola 3",
        "nivel 2",
        "prioridad 2,25",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "valida el stock y el crédito al tomar el pedido (2)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:8.4]] · [[proc:8.7]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-portal-de-clientes|ver el módulo]]"
        ],
        [
         "Se mide",
         "Pedidos del portal que llegan a Odoo sin transcripción y con stock y crédito válidos"
        ],
        [
         "Línea base",
         "Portal paralelo que emite un PDF como OC y se transcribe a mano en Odoo (M40; SC-08:236)"
        ],
        [
         "Meta",
         "100 % de los pedidos del portal sin transcripción y < 2 % rechazados después por stock o crédito, a los 6 meses"
        ],
        [
         "Se revisa si",
         "> 5 % de pedidos aceptados por el portal que luego no se pueden servir"
        ],
        [
         "Dueño",
         "Analista/Ejecutivo(a) Comercial, supervisado por el Gerente Comercial (País / Canal) (proceso 8.4)"
        ],
        [
         "Opera",
         "El cliente mayorista, acompañado por su Analista/Ejecutivo(a) Comercial"
        ],
        [
         "Firma",
         "Ninguna en la órbita; se propone que el Gerente Comercial (País / Canal) firme los pedidos que excedan el crédito o tomen stock asignado, como en Pedidos B2B"
        ],
        [
         "Calificación",
         "Valor 3,0 (frenos 3 · volumen 3 · pedido 3) · Viabilidad 1,3 (dato 2 · dependencias 1 · esfuerzo 1) · Riesgo 2,3 (personas 3 · exposición 2 · autonomía 2)"
        ],
        [
         "Por qué",
         "La IA valida stock y crédito de cara al cliente sin firma, sobre un stock que hoy no es real y sin política de crédito en VE. Depende de Pedidos B2B y del crédito, y es un portal externo nuevo; la dirección comercial lo plantea con reservas."
        ],
        [
         "Evidencia",
         "M40 · freno:11e.5 · freno:16.1 · freno:10b.2 · SC-08:236 · E-05:162"
        ]
       ]
      },
      {
       "id": "m-portal-de-socios-y-franquicias",
       "titulo": "75. Portal de socios y franquicias",
       "chips": [
        "Ola 3",
        "nivel 2",
        "prioridad 2,20",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "publica el disponible y normaliza el reporte (2)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:8.8]] · [[proc:9.10]] · [[proc:9.11]] · [[proc:1.8]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-portal-de-socios-y-franquicias|ver el módulo]]"
        ],
        [
         "Se mide",
         "Fulfillment del socio (unidades entregadas sobre pedidas) y franquicias que reportan su venta cada mes"
        ],
        [
         "Línea base",
         "Fulfillment de 70–80 % al socio de Costa Rica, con el stock publicado por rangos (M51); franquicias sin reporte estándar (M97)"
        ],
        [
         "Meta",
         "Fulfillment ≥ 90 % y 100 % de las franquicias reportando cada mes, a los 6 meses del portal"
        ],
        [
         "Se revisa si",
         "Disponible publicado que no se puede servir en > 5 % de las líneas"
        ],
        [
         "Dueño",
         "Coordinador(a) Comercial (proceso 8.8)"
        ],
        [
         "Opera",
         "El socio o franquiciado, con el Coordinador(a) Comercial"
        ],
        [
         "Firma",
         "Ninguna en la órbita; se propone que el Coordinador(a) Comercial apruebe la publicación inicial del disponible por socio y los ajustes del reporte normalizado"
        ],
        [
         "Calificación",
         "Valor 2,7 (frenos 3 · volumen 2 · pedido 3) · Viabilidad 1,3 (dato 2 · dependencias 1 · esfuerzo 1) · Riesgo 2,7 (personas 4 · exposición 2 · autonomía 2)"
        ],
        [
         "Por qué",
         "Pocos socios y franquicias; la IA publica el disponible hacia fuera sin firma. Cada conexión pide un acuerdo con el socio y depende del Vigía de reservas y del buzón de sell-out."
        ],
        [
         "Evidencia",
         "M51 · M96 · M97 · freno:8b.2 · freno:13e.2 · E-19:135 · E-55:50"
        ]
       ]
      }
     ]
    },
    {
     "t": "h",
     "x": "Clientes y mercadeo · 13 casos"
    },
    {
     "t": "tabla",
     "cab": [
      "#",
      "Caso",
      "Ola",
      "Nivel",
      "V",
      "Vi",
      "R",
      "Prioridad",
      "Estado"
     ],
     "num": [
      0,
      4,
      5,
      6,
      7
     ],
     "filas": [
      [
       "20",
       "[[mod:m-expediente-unico-de-garantia|Expediente único de garantía]]",
       "Ola 1",
       "1·2",
       "5,0",
       "2,7",
       "3,0",
       "3,68",
       "propuesto"
      ],
      [
       "25",
       "[[mod:m-mercadeo-con-datos|Mercadeo con datos]]",
       "Ola 2",
       "1",
       "3,0",
       "3,3",
       "4,7",
       "3,53",
       "propuesto"
      ],
      [
       "40",
       "[[mod:m-calidad-por-lote|Calidad por lote]]",
       "Ola 2",
       "1",
       "3,7",
       "2,3",
       "4,3",
       "3,37",
       "propuesto"
      ],
      [
       "44",
       "[[mod:m-repuestos-y-servicio-casio|Repuestos y servicio Casio]]",
       "Ola 1",
       "1",
       "3,7",
       "2,7",
       "3,7",
       "3,32",
       "propuesto"
      ],
      [
       "51",
       "[[mod:m-scrap-del-mes|Scrap del mes]]",
       "Ola 2",
       "2",
       "2,7",
       "2,7",
       "4,7",
       "3,17",
       "propuesto"
      ],
      [
       "52",
       "[[mod:m-stock-de-garantia-y-reemplazos|Stock de garantía y reemplazos]]",
       "Ola 1",
       "2",
       "3,3",
       "2,3",
       "4,0",
       "3,15",
       "propuesto"
      ],
      [
       "56",
       "[[mod:m-co-marketing|Co-marketing]]",
       "Ola 4",
       "1",
       "2,0",
       "3,3",
       "4,3",
       "3,05",
       "propuesto"
      ],
      [
       "57",
       "[[mod:m-piezas-y-etiquetas|Piezas y etiquetas]]",
       "Ola 4",
       "2",
       "3,0",
       "2,3",
       "4,0",
       "3,02",
       "propuesto"
      ],
      [
       "60",
       "[[mod:m-reembolsos-y-cambios-b2b|Reembolsos y cambios B2B]]",
       "Ola 1",
       "1·2",
       "3,0",
       "2,7",
       "3,3",
       "2,97",
       "propuesto"
      ],
      [
       "61",
       "[[mod:m-bandeja-de-mayoristas|Bandeja de mayoristas]]",
       "Ola 3",
       "1",
       "3,0",
       "2,0",
       "4,0",
       "2,90",
       "propuesto"
      ],
      [
       "67",
       "[[mod:m-paneles-de-pauta-y-redes|Paneles de pauta y redes]]",
       "Ola 3",
       "1",
       "1,7",
       "2,3",
       "4,7",
       "2,65",
       "propuesto"
      ],
      [
       "68",
       "[[mod:m-copiloto-de-atencion-omnicanal|Copiloto de atención omnicanal]]",
       "Ola 1",
       "1·2",
       "3,7",
       "1,3",
       "2,7",
       "2,60",
       "propuesto"
      ],
      [
       "77",
       "[[mod:m-garantias-en-mercados-sin-operacion|Garantías en mercados sin operación]]",
       "Ola 3",
       "2",
       "2,0",
       "1,7",
       "2,0",
       "1,88",
       "propuesto"
      ]
     ]
    },
    {
     "t": "fichas",
     "items": [
      {
       "id": "m-expediente-unico-de-garantia",
       "titulo": "20. Expediente único de garantía",
       "chips": [
        "Ola 1",
        "nivel 1·2",
        "prioridad 3,68",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "abre el caso y hace el triage por reglas de producto (2); prellena el reporte a la fábrica (1)."
        ],
        [
         "Quién firma",
         "las excepciones de elegibilidad."
        ],
        [
         "Procesos",
         "[[proc:11.2]] · [[proc:11.3]] · [[proc:9.13]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:PV.1]]"
        ],
        [
         "En la órbita",
         "[[mod:m-expediente-unico-de-garantia|ver el módulo]]"
        ],
        [
         "Se mide",
         "Tiempo de ciclo del caso de garantía, sistemas por caso y triages aceptados sin corrección"
        ],
        [
         "Línea base",
         "25–30 casos al día en PA, hasta 7 días si es software (M99); ~700 órdenes de servicio al mes en VE que pasan por cuatro sistemas (M100)"
        ],
        [
         "Meta",
         "Un solo registro por caso en PA a los 3 meses y en VE a los 9; −30 % de tiempo de ciclo en PA a los 6 meses; ≥ 80 % de triages aceptados sin corrección"
        ],
        [
         "Se revisa si",
         "< 60 % de triages aceptados sin corrección, o el equipo sigue registrando en paralelo a los 90 días"
        ],
        [
         "Dueño",
         "Gerente de Servicio Técnico (proceso 11.2)"
        ],
        [
         "Opera",
         "Técnico(a) y asesor(a) de Servicio Técnico de cada país"
        ],
        [
         "Firma",
         "Gerente de Servicio Técnico del país, para las excepciones de elegibilidad"
        ],
        [
         "Calificación",
         "Valor 5,0 (frenos 5 · volumen 5 · pedido 5) · Viabilidad 2,7 (dato 4 · dependencias 2 · esfuerzo 2) · Riesgo 3,0 (personas 3 · exposición 3 · autonomía 3)"
        ],
        [
         "Por qué",
         "Resuelve un freno que detiene (PV.1), con volumen medido y pedido explícito de la Presidencia y del dueño de Postventa. En Panamá los casos y las reglas ya existen (Lark Base y manual regional); siguen abiertas la serialización, la lectura de fotos y la política de reembolso de VE."
        ],
        [
         "Evidencia",
         "freno:PV.1 · M99 · M100 · E-01:17 · E-58:32 · E-51:123 · E-64:86 · decision:15 · decision:16 · arquitectura-ia.html:848"
        ]
       ]
      },
      {
       "id": "m-mercadeo-con-datos",
       "titulo": "25. Mercadeo con datos",
       "chips": [
        "Ola 2",
        "nivel 1",
        "prioridad 3,53",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "mide cada promoción y la explica (1)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:16.8]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-mercadeo-con-datos|ver el módulo]]"
        ],
        [
         "Se mide",
         "Promociones con su resultado medido (venta incremental y margen) en los 7 días siguientes"
        ],
        [
         "Línea base",
         "Mercadeo pide stock y venta y espera horas (M110); 5–6 promociones por país al mes (M111)"
        ],
        [
         "Meta",
         "≥ 80 % de las promociones medidas, a los 6 meses"
        ],
        [
         "Se revisa si",
         "< 40 % medidas, o la vista sin uso durante 2 meses"
        ],
        [
         "Dueño",
         "Gerente Regional de Marketing (proceso 16.8)"
        ],
        [
         "Opera",
         "Gerente de Marketing (país)"
        ],
        [
         "Firma",
         "No requiere: es lectura; la promoción la aprueba quien firma los precios"
        ],
        [
         "Calificación",
         "Valor 3,0 (frenos 3 · volumen 3 · pedido 3) · Viabilidad 3,3 (dato 3 · dependencias 3 · esfuerzo 4) · Riesgo 4,7 (personas 5 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "Alivia un freno lento (MK.3); la dueña del proceso describe el dolor («no tenemos acceso al stock»). Es solo una vista sobre el espejo: barata y de bajo riesgo."
        ],
        [
         "Evidencia",
         "M110 · M111 · freno:MK.3 · E-22:49 · E-42:243 · E-49:77 · propuestas-to-be.md:924"
        ]
       ]
      },
      {
       "id": "m-calidad-por-lote",
       "titulo": "40. Calidad por lote",
       "chips": [
        "Ola 2",
        "nivel 1",
        "prioridad 3,37",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "alerta cuando se supera el umbral, con la evidencia para la fábrica (1)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:11.3]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-calidad-por-lote|ver el módulo]]"
        ],
        [
         "Se mide",
         "Tasa de garantías por lote y SKU y días hasta detectar un lote fuera de umbral"
        ],
        [
         "Línea base",
         "3,5 % en algunos productos frente a < 1,5 % histórico, calculado pidiendo el sell-out a mano (M107)"
        ],
        [
         "Meta",
         "Tasa por lote calculada cada mes para el 100 % de los SKU serializados y detección < 30 días desde la venta del lote, a los 6 meses de la serialización"
        ],
        [
         "Se revisa si",
         "Tasa no disponible para > 30 % de los casos por falta de serial"
        ],
        [
         "Dueño",
         "Subgerente de Servicio Técnico (proceso 11.3)"
        ],
        [
         "Opera",
         "Subgerente de Servicio Técnico"
        ],
        [
         "Firma",
         "No requiere para la alerta; se propone que el Subgerente de Servicio Técnico firme el reclamo a la fábrica"
        ],
        [
         "Calificación",
         "Valor 3,7 (frenos 3 · volumen 3 · pedido 5) · Viabilidad 2,3 (dato 2 · dependencias 1 · esfuerzo 4) · Riesgo 4,3 (personas 5 · exposición 4 · autonomía 4)"
        ],
        [
         "Por qué",
         "El dueño de Postventa lo pide de forma explícita (cruzar sell-out y garantías por lote). Depende de la serialización (decisión 16), del buzón de sell-out y del expediente de garantía; el cálculo en sí es pequeño."
        ],
        [
         "Evidencia",
         "M107 · freno:4a.4 · E-58:166 · E-58:168 · E-01:17 · decision:16"
        ]
       ]
      },
      {
       "id": "m-repuestos-y-servicio-casio",
       "titulo": "44. Repuestos y servicio Casio",
       "chips": [
        "Ola 1",
        "nivel 1",
        "prioridad 3,32",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "consolida los pedidos, sugiere cantidades y arma el reporte a Casio (1); presupuesta con la regla de precio (1)."
        ],
        [
         "Quién firma",
         "la OC de repuestos."
        ],
        [
         "Procesos",
         "[[proc:11.4]] · [[proc:11.5]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:PV.2]]"
        ],
        [
         "En la órbita",
         "[[mod:m-repuestos-y-servicio-casio|ver el módulo]]"
        ],
        [
         "Se mide",
         "Tiempo para armar el pedido consolidado y el reporte a Casio, y personas capaces de hacerlo"
        ],
        [
         "Línea base",
         "~1.000 artículos al mes de cuatro países que pide una sola persona (M102); el reporte a Japón le toma 1–1,5 días (E-51:271)"
        ],
        [
         "Meta",
         "Reporte en borrador en < 2 h y al menos dos personas capaces de emitirlo, a los 4 meses"
        ],
        [
         "Se revisa si",
         "Más del 30 % de líneas corregidas en el borrador"
        ],
        [
         "Dueño",
         "Gerente de Servicio Técnico, con alcance regional para Casio (proceso 11.5)"
        ],
        [
         "Opera",
         "Técnico(a) de servicio Casio"
        ],
        [
         "Firma",
         "Gerente de Servicio Técnico, que firma la OC de repuestos"
        ],
        [
         "Calificación",
         "Valor 3,7 (frenos 5 · volumen 3 · pedido 3) · Viabilidad 2,7 (dato 2 · dependencias 3 · esfuerzo 3) · Riesgo 3,7 (personas 3 · exposición 3 · autonomía 5)"
        ],
        [
         "Por qué",
         "Resuelve un freno que detiene (PV.2: todo depende de una persona), con nivel 1 y firma de la OC. Nadie lo pide; el dato vive en los archivos de esa persona y el canal de servicio de Casio está por confirmar."
        ],
        [
         "Evidencia",
         "freno:PV.2 · M102 · M103 · E-51:147 · E-51:271 · E-02:200"
        ]
       ]
      },
      {
       "id": "m-scrap-del-mes",
       "titulo": "51. Scrap del mes",
       "chips": [
        "Ola 2",
        "nivel 2",
        "prioridad 3,17",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "concilia los traslados, el físico y los casos (2)."
        ],
        [
         "Quién firma",
         "el scrap."
        ],
        [
         "Procesos",
         "[[proc:11.9]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-scrap-del-mes|ver el módulo]]"
        ],
        [
         "Se mide",
         "Diferencias sin explicar entre traslados de garantía, físico y casos en el acta mensual"
        ],
        [
         "Línea base",
         "Conciliación a mano; en VE apareció mercancía no registrada (M104)"
        ],
        [
         "Meta",
         "Acta mensual con el 100 % de las diferencias explicadas, a los 6 meses"
        ],
        [
         "Se revisa si",
         "Más del 5 % de unidades sin conciliar dos meses seguidos"
        ],
        [
         "Dueño",
         "Subgerente de Servicio Técnico (proceso 11.9)"
        ],
        [
         "Opera",
         "Coordinador(a) de Logística y Bodega"
        ],
        [
         "Firma",
         "Subgerente de Servicio Técnico con Contabilidad, que firman el scrap"
        ],
        [
         "Calificación",
         "Valor 2,7 (frenos 3 · volumen 2 · pedido 3) · Viabilidad 2,7 (dato 3 · dependencias 2 · esfuerzo 3) · Riesgo 4,7 (personas 5 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "Alivia un freno lento (PV.4) una vez al mes. La IA concilia y una persona firma el scrap; espera que el expediente acumule casos."
        ],
        [
         "Evidencia",
         "M104 · freno:PV.4 · E-58:32 · E-02:72 · E-04:32"
        ]
       ]
      },
      {
       "id": "m-stock-de-garantia-y-reemplazos",
       "titulo": "52. Stock de garantía y reemplazos",
       "chips": [
        "Ola 1",
        "nivel 2",
        "prioridad 3,15",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "calcula el stock con la tasa de garantías y el sell-out, y pide la reposición (2)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:11.2]] · [[proc:7.7]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-stock-de-garantia-y-reemplazos|ver el módulo]]"
        ],
        [
         "Se mide",
         "Días de quiebre del stock de garantía por SKU y país"
        ],
        [
         "Línea base",
         "VE pide los reemplazos por traslado dos veces al día y tuvo un modelo agotado más de un mes (M101)"
        ],
        [
         "Meta",
         "Ningún modelo con quiebre de garantía de más de 7 días en VE, a los 6 meses"
        ],
        [
         "Se revisa si",
         "Algún modelo sin stock de garantía más de 15 días"
        ],
        [
         "Dueño",
         "Gerente de Servicio Técnico (proceso 11.2)"
        ],
        [
         "Opera",
         "Coordinador(a) de Logística y Bodega (proceso 7.7)"
        ],
        [
         "Firma",
         "Ninguna en la órbita; se propone que el Coordinador(a) de Logística y Bodega confirme la reposición, porque mueve inventario"
        ],
        [
         "Calificación",
         "Valor 3,3 (frenos 3 · volumen 4 · pedido 3) · Viabilidad 2,3 (dato 2 · dependencias 1 · esfuerzo 4) · Riesgo 4,0 (personas 5 · exposición 5 · autonomía 2)"
        ],
        [
         "Por qué",
         "Alivia un freno lento (PV.3) con pedidos diarios, pero la tasa de garantías que necesita sale del expediente y del sell-out, que aún no existen. La IA pide la reposición en nivel 2 sin firma."
        ],
        [
         "Evidencia",
         "M101 · freno:PV.3 · E-58:128"
        ]
       ]
      },
      {
       "id": "m-co-marketing",
       "titulo": "56. Co-marketing",
       "chips": [
        "Ola 4",
        "nivel 1",
        "prioridad 3,05",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "arma el borrador del reporte a Casio (1)."
        ],
        [
         "Quién firma",
         "la nota de crédito."
        ],
        [
         "Procesos",
         "[[proc:16.6]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-co-marketing|ver el módulo]]"
        ],
        [
         "Se mide",
         "Horas para armar el reporte a Casio y saldo del presupuesto por cliente al día"
        ],
        [
         "Línea base",
         "Presupuesto en Lark y reporte factura por factura; USD 30.000 a un solo cliente de un país (M113; E-49:109); horas por medir"
        ],
        [
         "Meta",
         "Saldo por cliente actualizado cada semana y reporte en borrador en < 1 día, a los 6 meses"
        ],
        [
         "Se revisa si",
         "Más del 20 % de líneas corregidas en el borrador"
        ],
        [
         "Dueño",
         "Gerente de Marketing (país) (proceso 16.6)"
        ],
        [
         "Opera",
         "Gerente de Marketing de Cuentas Clave"
        ],
        [
         "Firma",
         "Contabilidad, que emite la nota de crédito; el Gerente de Marketing (país) firma el reporte a Casio"
        ],
        [
         "Calificación",
         "Valor 2,0 (frenos 1 · volumen 2 · pedido 3) · Viabilidad 3,3 (dato 3 · dependencias 3 · esfuerzo 4) · Riesgo 4,3 (personas 5 · exposición 3 · autonomía 5)"
        ],
        [
         "Por qué",
         "Sin freno del circuito y de frecuencia mensual o semestral. Pequeño, de nivel 1 y con firma: riesgo bajo."
        ],
        [
         "Evidencia",
         "M113 · E-42:114 · E-42:161 · E-49:109"
        ]
       ]
      },
      {
       "id": "m-piezas-y-etiquetas",
       "titulo": "57. Piezas y etiquetas",
       "chips": [
        "Ola 4",
        "nivel 2",
        "prioridad 3,02",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "genera las piezas y los renders de marca propia (2)."
        ],
        [
         "Quién firma",
         "mercadeo aprueba la pieza."
        ],
        [
         "Procesos",
         "[[proc:16.7]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-piezas-y-etiquetas|ver el módulo]]"
        ],
        [
         "Se mide",
         "Días desde el brief hasta la pieza aprobada y etiquetas con un precio distinto al del sistema"
        ],
        [
         "Línea base",
         "Pantallas de 24 tiendas, con 3 cada una, actualizadas con pendrive y etiquetas en dos versiones (M59); días por medir"
        ],
        [
         "Meta",
         "−50 % del tiempo de producción de piezas de promoción y cero etiquetas con precio distinto en la auditoría, a los 6 meses"
        ],
        [
         "Se revisa si",
         "< 50 % de las piezas generadas aprobadas sin rehacer"
        ],
        [
         "Dueño",
         "Gerente Regional de Visual Merchandising (proceso 16.7)"
        ],
        [
         "Opera",
         "Diseñador(a) / Analista de Contenido"
        ],
        [
         "Firma",
         "Gerente de Marketing (país), que aprueba la pieza"
        ],
        [
         "Calificación",
         "Valor 3,0 (frenos 3 · volumen 3 · pedido 3) · Viabilidad 2,3 (dato 3 · dependencias 2 · esfuerzo 2) · Riesgo 4,0 (personas 5 · exposición 3 · autonomía 4)"
        ],
        [
         "Por qué",
         "Alivia un freno lento (14c.4: de una a cinco o seis promociones por país al mes). La IA genera imágenes de marca que mercadeo aprueba; falta decidir quién genera las imágenes (decisión 15) y respetar las guías del licenciante."
        ],
        [
         "Evidencia",
         "M59 · freno:14c.4 · E-04:42 · E-47:278 · decision:15"
        ]
       ]
      },
      {
       "id": "m-reembolsos-y-cambios-b2b",
       "titulo": "60. Reembolsos y cambios B2B",
       "chips": [
        "Ola 1",
        "nivel 1·2",
        "prioridad 2,97",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "prepara la nota de crédito (2) y propone la resolución (1)."
        ],
        [
         "Quién firma",
         "la nota de crédito."
        ],
        [
         "Procesos",
         "[[proc:11.8]] · [[proc:8.16]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-reembolsos-y-cambios-b2b|ver el módulo]]"
        ],
        [
         "Se mide",
         "Días desde el reclamo B2B hasta la nota de crédito, y plazo del reembolso web"
        ],
        [
         "Línea base",
         "Hasta 4 días que bloquean la factura siguiente (M106); reembolso web de ~24–48 h en PA y de 30 a 5 días en CO (M105)"
        ],
        [
         "Meta",
         "≤ 1 día hábil en B2B en PA y estándar del grupo ≤ 48 h en web, a los 4 meses"
        ],
        [
         "Se revisa si",
         "> 2 días de mediana en B2B"
        ],
        [
         "Dueño",
         "Gerente de Servicio Técnico (proceso 11.8)"
        ],
        [
         "Opera",
         "Analista/Ejecutivo(a) Comercial y Asesor(a) de Servicio al Cliente"
        ],
        [
         "Firma",
         "Contabilidad, que emite la nota de crédito; el Gerente Comercial (País / Canal) aprueba la devolución B2B"
        ],
        [
         "Calificación",
         "Valor 3,0 (frenos 3 · volumen 3 · pedido 3) · Viabilidad 2,7 (dato 3 · dependencias 2 · esfuerzo 3) · Riesgo 3,3 (personas 2 · exposición 4 · autonomía 4)"
        ],
        [
         "Por qué",
         "Alivia frenos lentos (RT.1, RT.2). La nota de crédito queda en borrador hasta su firma; necesita una política de reembolso para VE y maneja datos de pago de consumidores."
        ],
        [
         "Evidencia",
         "M105 · M106 · freno:RT.1 · freno:RT.2 · E-57:164 · E-39:90 · E-02:96"
        ]
       ]
      },
      {
       "id": "m-bandeja-de-mayoristas",
       "titulo": "61. Bandeja de mayoristas",
       "chips": [
        "Ola 3",
        "nivel 1",
        "prioridad 2,90",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "prioriza cada chat (1)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:11.1]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-bandeja-de-mayoristas|ver el módulo]]"
        ],
        [
         "Se mide",
         "Chats de mayoristas sin leer y tiempo de primera respuesta al mayorista"
        ],
        [
         "Línea base",
         "146 chats sin leer en VE (M69; E-31:398)"
        ],
        [
         "Meta",
         "Cero chats sin leer con más de 24 h, a los 3 meses de operar"
        ],
        [
         "Se revisa si",
         "> 20 chats sin leer con más de 48 h"
        ],
        [
         "Dueño",
         "Gerente de Servicio Técnico (proceso 11.1)"
        ],
        [
         "Opera",
         "Analista/Ejecutivo(a) Comercial del mayor en VE"
        ],
        [
         "Firma",
         "No requiere: solo ordena la bandeja; el vendedor responde con su nombre"
        ],
        [
         "Calificación",
         "Valor 3,0 (frenos 3 · volumen 3 · pedido 3) · Viabilidad 2,0 (dato 2 · dependencias 1 · esfuerzo 3) · Riesgo 4,0 (personas 3 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "Dolor medido, aunque la cifra de 146 chats viene de Visual Merchandising de VE y no de la atención a mayoristas. Nadie pide la bandeja y espera la bandeja omnicanal del copiloto y los números corporativos de WhatsApp."
        ],
        [
         "Evidencia",
         "M69 · freno:11e.4 · E-31:398 · E-36:93 · decision:1 · decision:13"
        ]
       ]
      },
      {
       "id": "m-paneles-de-pauta-y-redes",
       "titulo": "67. Paneles de pauta y redes",
       "chips": [
        "Ola 3",
        "nivel 1",
        "prioridad 2,65",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "resume y explica el desempeño (1)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:16.5]] · [[proc:16.8]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-paneles-de-pauta-y-redes|ver el módulo]]"
        ],
        [
         "Se mide",
         "Panel único de inversión, alcance y conversión cruzado con la venta, en uso mensual"
        ],
        [
         "Línea base",
         "Por medir: hoy hay reportes separados por plataforma y un tablero propio hecho con IA (E-22:65)"
        ],
        [
         "Meta",
         "Un panel que reemplace los reportes por plataforma, a los 3 meses"
        ],
        [
         "Se revisa si",
         "El equipo de pauta sigue usando su tablero paralelo a los 3 meses"
        ],
        [
         "Dueño",
         "Gerente Regional de Marketing (proceso 16.8)"
        ],
        [
         "Opera",
         "Gerente de Marketing de pauta digital"
        ],
        [
         "Firma",
         "No requiere: es lectura"
        ],
        [
         "Calificación",
         "Valor 1,7 (frenos 2 · volumen 2 · pedido 1) · Viabilidad 2,3 (dato 3 · dependencias 2 · esfuerzo 2) · Riesgo 4,7 (personas 5 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "Propuesta del equipo consultor sin pedido en las entrevistas; el área de pauta ya armó su propio tablero con IA, que conviene regularizar (ver x-islas-de-ia) antes de construir otro. Suma tres conectores nuevos."
        ],
        [
         "Evidencia",
         "E-22:65 · freno:MK.3"
        ]
       ]
      },
      {
       "id": "m-copiloto-de-atencion-omnicanal",
       "titulo": "68. Copiloto de atención omnicanal",
       "chips": [
        "Ola 1",
        "nivel 1·2",
        "prioridad 2,60",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "identifica al cliente, clasifica la intención y propone la respuesta con el dato exacto (1); mide la calidad de cada conversación (2)."
        ],
        [
         "Quién firma",
         "el asesor envía."
        ],
        [
         "Procesos",
         "[[proc:11.1]] · [[proc:11.11]] · [[proc:10.13]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-copiloto-de-atencion-omnicanal|ver el módulo]]"
        ],
        [
         "Se mide",
         "Tiempo de primera respuesta y propuestas que el asesor envía sin corregir"
        ],
        [
         "Línea base",
         "~1.500 conversaciones al día y hasta 6.000 en promoción (M67); SLA medido en una app aparte (M68); tiempo de primera respuesta por medir"
        ],
        [
         "Meta",
         "En un piloto de 6 meses: −30 % en el tiempo de primera respuesta y ≥ 70 % de propuestas enviadas sin corrección"
        ],
        [
         "Se revisa si",
         "< 50 % de propuestas aceptadas sin corrección a los 90 días, o caída de la satisfacción del cliente"
        ],
        [
         "Dueño",
         "Gerente de Servicio Técnico (proceso 11.1)"
        ],
        [
         "Opera",
         "Asesor(a) de Servicio al Cliente y Asesor(a) de Ventas Web"
        ],
        [
         "Firma",
         "El asesor, que envía cada respuesta"
        ],
        [
         "Calificación",
         "Valor 3,7 (frenos 3 · volumen 5 · pedido 3) · Viabilidad 1,3 (dato 2 · dependencias 1 · esfuerzo 1) · Riesgo 2,7 (personas 2 · exposición 3 · autonomía 3)"
        ],
        [
         "Por qué",
         "El mayor volumen del grupo y alivia la saturación del chat (11d.3), pero depende de Mercately, de los números corporativos y de la decisión 6. Va como copiloto: la IA propone y el asesor envía (MC:18665), porque Postventa retiró un piloto por resistencia y Panamá no quiere un agente que atienda."
        ],
        [
         "Evidencia",
         "M67 · M68 · freno:11d.3 · freno:13d.1 · E-41:255 · E-02:268 · E-64:74 · MC:18665 · decision:1 · decision:6 · decision:13 · arquitectura-ia.html:839"
        ]
       ]
      },
      {
       "id": "m-garantias-en-mercados-sin-operacion",
       "titulo": "77. Garantías en mercados sin operación",
       "chips": [
        "Ola 3",
        "nivel 2",
        "prioridad 1,88",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "lleva el caso (2)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:11.6]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-garantias-en-mercados-sin-operacion|ver el módulo]]"
        ],
        [
         "Se mide",
         "Casos de garantía de Guatemala y Costa Rica registrados en el expediente"
        ],
        [
         "Línea base",
         "Hoy sin registro: grupos de WhatsApp (M108)"
        ],
        [
         "Meta",
         "100 % de los casos de los socios registrados, a los 6 meses de abrir el acceso"
        ],
        [
         "Se revisa si",
         "< 50 % de los casos registrados"
        ],
        [
         "Dueño",
         "Gerente de Servicio Técnico (proceso 11.6)"
        ],
        [
         "Opera",
         "El socio o distribuidor de cada país, con el equipo de Postventa"
        ],
        [
         "Firma",
         "Ninguna en la órbita; se propone que el Gerente de Servicio Técnico firme las resoluciones de reemplazo o reembolso"
        ],
        [
         "Calificación",
         "Valor 2,0 (frenos 1 · volumen 2 · pedido 3) · Viabilidad 1,7 (dato 1 · dependencias 1 · esfuerzo 3) · Riesgo 2,0 (personas 2 · exposición 2 · autonomía 2)"
        ],
        [
         "Por qué",
         "Bajo volumen y sin freno del circuito. Comparte datos de consumidores con terceros y la IA lleva el caso en nivel 2 sin firma; depende de que exista el expediente y de un acuerdo con cada socio."
        ],
        [
         "Evidencia",
         "M108 · E-02:172 · E-02:92"
        ]
       ]
      }
     ]
    },
    {
     "t": "h",
     "x": "Finanzas · 8 casos"
    },
    {
     "t": "tabla",
     "cab": [
      "#",
      "Caso",
      "Ola",
      "Nivel",
      "V",
      "Vi",
      "R",
      "Prioridad",
      "Estado"
     ],
     "num": [
      0,
      4,
      5,
      6,
      7
     ],
     "filas": [
      [
       "3",
       "[[mod:m-cuadre-previo-de-caja|Cuadre previo de caja]]",
       "Ola 2",
       "2",
       "5,0",
       "2,7",
       "4,7",
       "4,10",
       "propuesto"
      ],
      [
       "5",
       "[[mod:m-cartera-y-cobranza|Cartera y cobranza]]",
       "Ola 2",
       "1·2",
       "5,0",
       "3,0",
       "3,3",
       "3,88",
       "propuesto"
      ],
      [
       "10",
       "[[mod:m-cuadre-entre-empresas|Cuadre entre empresas]]",
       "Ola 4",
       "2",
       "3,7",
       "3,3",
       "4,7",
       "3,80",
       "propuesto"
      ],
      [
       "14",
       "[[mod:m-conciliacion-de-plataformas|Conciliación de plataformas]]",
       "Ola 2",
       "2",
       "5,0",
       "2,3",
       "3,7",
       "3,73",
       "propuesto"
      ],
      [
       "33",
       "[[mod:m-flujo-de-caja|Flujo de caja]]",
       "Ola 4",
       "1",
       "3,7",
       "2,3",
       "4,7",
       "3,45",
       "propuesto"
      ],
      [
       "39",
       "[[mod:m-credito-de-clientes|Crédito de clientes]]",
       "Ola 2",
       "1",
       "4,3",
       "2,3",
       "3,3",
       "3,38",
       "propuesto"
      ],
      [
       "50",
       "[[mod:m-pagos-a-proveedores-por-lote|Pagos a proveedores por lote]]",
       "Ola 3",
       "2",
       "3,3",
       "2,7",
       "3,7",
       "3,18",
       "propuesto"
      ],
      [
       "62",
       "[[mod:m-calendario-de-pagos-de-compra|Calendario de pagos de compra]]",
       "Ola 3",
       "1",
       "2,0",
       "2,7",
       "4,7",
       "2,90",
       "propuesto"
      ]
     ]
    },
    {
     "t": "fichas",
     "items": [
      {
       "id": "m-cuadre-previo-de-caja",
       "titulo": "3. Cuadre previo de caja",
       "chips": [
        "Ola 2",
        "nivel 2",
        "prioridad 4,10",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "cuadra por adelantado y marca las diferencias (2)."
        ],
        [
         "Quién firma",
         "valida contabilidad."
        ],
        [
         "Procesos",
         "[[proc:12.2]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:17.1]] · [[freno:19.1]]"
        ],
        [
         "En la órbita",
         "[[mod:m-cuadre-previo-de-caja|ver el módulo]]"
        ],
        [
         "Se mide",
         "Rezago de la conciliación de caja de tiendas en VE"
        ],
        [
         "Línea base",
         "8–10 personas concilian con ~2 meses de atraso (M62)"
        ],
        [
         "Meta",
         "Cuadre por tienda al día siguiente del cierre y rezago ≤ 5 días, a los 4 meses"
        ],
        [
         "Se revisa si",
         "Rezago > 30 días a los 3 meses"
        ],
        [
         "Dueño",
         "Gerente de Contabilidad / Administración"
        ],
        [
         "Opera",
         "Analista contable de VE"
        ],
        [
         "Firma",
         "Contabilidad (valida)"
        ],
        [
         "Calificación",
         "Valor 5,0 (frenos 5 · volumen 5 · pedido 5) · Viabilidad 2,7 (dato 3 · dependencias 2 · esfuerzo 3) · Riesgo 4,7 (personas 5 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "Aporta a 17.1 y 19.1 (detienen) a diario en cada tienda, y la contabilidad de VE pide que el sistema le dé la herramienta para dejar la revisión manual. Depende de los conectores de bancos de VE y del reporte Z; solo cuadra y marca diferencias."
        ],
        [
         "Evidencia",
         "M62 · freno:17.1 · freno:19.1 · freno:15c.2 · E-38:52 · E-38:54 · E-07:86 · propuestas-to-be.md:620 · propuestas-to-be.md:917 · arquitectura-ia.html:779"
        ]
       ]
      },
      {
       "id": "m-cartera-y-cobranza",
       "titulo": "5. Cartera y cobranza",
       "chips": [
        "Ola 2",
        "nivel 1·2",
        "prioridad 3,88",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "lee el comprobante y propone su desglose (1); persigue cada soporte faltante (2)."
        ],
        [
         "Quién firma",
         "CxC valida los pagos."
        ],
        [
         "Procesos",
         "[[proc:13.6]] · [[proc:8.15]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:16.2]] · [[freno:19.1]]"
        ],
        [
         "En la órbita",
         "[[mod:m-cartera-y-cobranza|ver el módulo]]"
        ],
        [
         "Se mide",
         "Cobros sin registrar de más de 30 días y tiempo de aplicación del pago (indicador 13.6)"
        ],
        [
         "Línea base",
         "Meses de cobros sin registrar, ~960 documentos al día a un Excel y hasta 20 abonos por factura (M80, M79, M78)"
        ],
        [
         "Meta",
         "Ningún cobro sin registrar de más de 30 días y aplicación el mismo día en ≥ 80 % de los pagos, a los 6 meses"
        ],
        [
         "Se revisa si",
         "Rezago > 60 días a los 3 meses"
        ],
        [
         "Dueño",
         "Coordinador(a) de Tesorería / Cobranzas (Cobranza)"
        ],
        [
         "Opera",
         "Analista de cuentas por cobrar y vendedores"
        ],
        [
         "Firma",
         "Cuentas por cobrar (valida los pagos)"
        ],
        [
         "Calificación",
         "Valor 5,0 (frenos 5 · volumen 5 · pedido 5) · Viabilidad 3,0 (dato 3 · dependencias 3 · esfuerzo 3) · Riesgo 3,3 (personas 3 · exposición 4 · autonomía 3)"
        ],
        [
         "Por qué",
         "Resuelve 16.2 (detiene) con volumen diario y la dirección pide la cartera analizada y lista para actuar. Lee comprobantes con datos de pagadores y propone desgloses de dinero en nivel 1; los recordatorios van a los vendedores."
        ],
        [
         "Evidencia",
         "M78 · M79 · M80 · M81 · freno:16.2 · freno:16.4 · freno:19.1 · E-08:170 · E-39:50 · E-35:120 · E-48:48 · E-62:172 · propuestas-to-be.md:664 · propuestas-to-be.md:956 · arquitectura-ia.html:797"
        ]
       ]
      },
      {
       "id": "m-cuadre-entre-empresas",
       "titulo": "10. Cuadre entre empresas",
       "chips": [
        "Ola 4",
        "nivel 2",
        "prioridad 3,80",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "cuadra y explica las diferencias (2)."
        ],
        [
         "Quién firma",
         "contabilidad."
        ],
        [
         "Procesos",
         "[[proc:13.7]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:18.1]]"
        ],
        [
         "En la órbita",
         "[[mod:m-cuadre-entre-empresas|ver el módulo]]"
        ],
        [
         "Se mide",
         "Frecuencia y rezago del cuadre entre empresas"
        ],
        [
         "Línea base",
         "Un ejercicio de 2 meses, manual e irregular (M85)"
        ],
        [
         "Meta",
         "Cuadre mensual cerrado en ≤ 10 días hábiles, desde el tercer mes"
        ],
        [
         "Se revisa si",
         "Dos meses seguidos sin cuadre"
        ],
        [
         "Dueño",
         "Coordinador(a) de Tesorería / Cobranzas, bajo el Gerente de Tesorería"
        ],
        [
         "Opera",
         "Analistas de cuentas por cobrar y por pagar"
        ],
        [
         "Firma",
         "Contabilidad"
        ],
        [
         "Calificación",
         "Valor 3,7 (frenos 5 · volumen 3 · pedido 3) · Viabilidad 3,3 (dato 3 · dependencias 4 · esfuerzo 3) · Riesgo 4,7 (personas 5 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "Resuelve 18.1 (detiene) con volumen mensual y solo hay dolor en entrevistas. Lee las tres instancias de Odoo, cuadra y explica sin cambiar registros."
        ],
        [
         "Evidencia",
         "M85 · freno:18.1 · freno:18.3 · E-61:54 · E-61:266 · E-62:184 · propuestas-to-be.md:672 · propuestas-to-be.md:958 · arquitectura-ia.html:802"
        ]
       ]
      },
      {
       "id": "m-conciliacion-de-plataformas",
       "titulo": "14. Conciliación de plataformas",
       "chips": [
        "Ola 2",
        "nivel 2",
        "prioridad 3,73",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "empareja, deja los borradores y propone el cliente probable de cada partida sin identificar (2)."
        ],
        [
         "Quién firma",
         "contabilidad publica."
        ],
        [
         "Procesos",
         "[[proc:12.3]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:17.1]] · [[freno:19.1]]"
        ],
        [
         "En la órbita",
         "[[mod:m-conciliacion-de-plataformas|ver el módulo]]"
        ],
        [
         "Se mide",
         "Rezago de conciliación por plataforma y partidas emparejadas sin intervención (indicador 12.3)"
        ],
        [
         "Línea base",
         "Reportes de ~3.000 líneas de Cashea y 9 marketplaces con un mes de atraso (M82, M83)"
        ],
        [
         "Meta",
         "Cierre de cada plataforma ≤ 5 días hábiles tras su reporte y ≥ 85 % de emparejamiento automático, a los 6 meses"
        ],
        [
         "Se revisa si",
         "< 60 % de emparejamiento a los 3 meses"
        ],
        [
         "Dueño",
         "Gerente de Contabilidad / Administración"
        ],
        [
         "Opera",
         "Analista contable de conciliación"
        ],
        [
         "Firma",
         "Contabilidad (publica)"
        ],
        [
         "Calificación",
         "Valor 5,0 (frenos 5 · volumen 5 · pedido 5) · Viabilidad 2,3 (dato 3 · dependencias 2 · esfuerzo 2) · Riesgo 3,7 (personas 3 · exposición 5 · autonomía 3)"
        ],
        [
         "Por qué",
         "Aporta a 17.1 y 19.1 (detienen) con alto volumen, y la contabilidad de Colombia pide automatizar la conciliación de sus plataformas. Cada plataforma tiene su formato y la vía de reportes de Cashea está por confirmar; deja borradores y propone el cliente de partidas sin identificar."
        ],
        [
         "Evidencia",
         "M82 · M83 · M84 · freno:17.1 · freno:17.2 · freno:17.3 · freno:11d.6 · E-46:112 · E-15:267 · E-38:112 · E-11:249 · propuestas-to-be.md:628 · arquitectura-ia.html:799"
        ]
       ]
      },
      {
       "id": "m-flujo-de-caja",
       "titulo": "33. Flujo de caja",
       "chips": [
        "Ola 4",
        "nivel 1",
        "prioridad 3,45",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "proyecta y explica los desvíos (1)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:13.2]] · [[proc:13.8]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-flujo-de-caja|ver el módulo]]"
        ],
        [
         "Se mide",
         "Desvío entre el flujo proyectado y el real a 4 semanas"
        ],
        [
         "Línea base",
         "Por medir; hoy en hojas de Lark y Excel personales, revisado cada mañana (M90)"
        ],
        [
         "Meta",
         "Desvío ≤ 10 % a 4 semanas tras 3 meses de uso"
        ],
        [
         "Se revisa si",
         "Desvío > 25 % durante dos meses"
        ],
        [
         "Dueño",
         "Gerente de Tesorería"
        ],
        [
         "Opera",
         "Planificador financiero"
        ],
        [
         "Firma",
         "No requiere: es información de gestión; la revisa el Gerente de Tesorería"
        ],
        [
         "Calificación",
         "Valor 3,7 (frenos 2 · volumen 4 · pedido 5) · Viabilidad 2,3 (dato 2 · dependencias 2 · esfuerzo 3) · Riesgo 4,7 (personas 5 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "Vínculo marginal con 19.3 (lento), aunque se revisa a diario y la dirección financiera pide dejar sus Excel por un software de proyección. Necesita bancos y compromisos de compra que aún no están en el sistema."
        ],
        [
         "Evidencia",
         "M90 · freno:19.3 · E-15:369 · E-15:227 · E-43:123 · propuestas-to-be.md:680 · arquitectura-ia.html:806"
        ]
       ]
      },
      {
       "id": "m-credito-de-clientes",
       "titulo": "39. Crédito de clientes",
       "chips": [
        "Ola 2",
        "nivel 1",
        "prioridad 3,38",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "prepara la debida diligencia con fuentes citadas y propone el límite a partir del historial de pago (1)."
        ],
        [
         "Quién firma",
         "el alta y el límite."
        ],
        [
         "Procesos",
         "[[proc:13.5]]"
        ],
        [
         "Frenos que resuelve",
         "[[freno:16.1]] · [[freno:19.1]]"
        ],
        [
         "En la órbita",
         "[[mod:m-credito-de-clientes|ver el módulo]]"
        ],
        [
         "Se mide",
         "Clientes con límite y plazo aprobados y saldo vencido"
        ],
        [
         "Línea base",
         "USD 610.000 vencidos en VE y cartera de USD 6–7 M sin comité de crédito (M77, M76)"
        ],
        [
         "Meta",
         "100 % de clientes del mayor con límite y plazo en 6 meses y −30 % del vencido en 12 meses"
        ],
        [
         "Se revisa si",
         "Vencido sin baja a los 6 meses de aplicada la política"
        ],
        [
         "Dueño",
         "Coordinador(a) de Tesorería / Cobranzas (Crédito)"
        ],
        [
         "Opera",
         "Analista de crédito"
        ],
        [
         "Firma",
         "Comité de crédito o Gerente de Tesorería (el alta y el límite)"
        ],
        [
         "Calificación",
         "Valor 4,3 (frenos 5 · volumen 3 · pedido 5) · Viabilidad 2,3 (dato 2 · dependencias 2 · esfuerzo 3) · Riesgo 3,3 (personas 2 · exposición 5 · autonomía 3)"
        ],
        [
         "Por qué",
         "Resuelve 16.1 (detiene) y lo piden la dirección («estos cinco clientes puede darle más crédito») y crédito de Panamá, que espera un manual y un comité. Falta la política escrita y un historial de pagos fiable, y es una decisión sobre clientes que siempre firma una persona."
        ],
        [
         "Evidencia",
         "M76 · M77 · freno:16.1 · freno:16.3 · E-08:170 · E-62:146 · E-39:122 · E-48:170 · propuestas-to-be.md:656 · propuestas-to-be.md:917 · arquitectura-ia.html:794"
        ]
       ]
      },
      {
       "id": "m-pagos-a-proveedores-por-lote",
       "titulo": "50. Pagos a proveedores por lote",
       "chips": [
        "Ola 3",
        "nivel 2",
        "prioridad 3,18",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "arma el lote y registra lo que el banco confirma (2)."
        ],
        [
         "Quién firma",
         "el pago, siempre humano, en el banco."
        ],
        [
         "Procesos",
         "[[proc:13.1]] · [[proc:13.2]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-pagos-a-proveedores-por-lote|ver el módulo]]"
        ],
        [
         "Se mide",
         "Horas del ciclo de pagos de los miércoles"
        ],
        [
         "Línea base",
         "30–100 pagos uno por uno cada miércoles (M87); en VE, 30–40 facturas al día (M88)"
        ],
        [
         "Meta",
         "Lote y archivo bancario listos en ≤ 1 h por ciclo, a los 6 meses"
        ],
        [
         "Se revisa si",
         "Más de 10 % de pagos fuera del lote"
        ],
        [
         "Dueño",
         "Coordinador(a) de Tesorería / Cobranzas (Cuentas por Pagar)"
        ],
        [
         "Opera",
         "Analista de cuentas por pagar"
        ],
        [
         "Firma",
         "Tesorería, en el banco (el pago siempre lo hace una persona)"
        ],
        [
         "Calificación",
         "Valor 3,3 (frenos 1 · volumen 4 · pedido 5) · Viabilidad 2,7 (dato 3 · dependencias 2 · esfuerzo 3) · Riesgo 3,7 (personas 4 · exposición 4 · autonomía 3)"
        ],
        [
         "Por qué",
         "No alivia frenos del circuito, pero tesorería y cuentas por pagar de VE piden el archivo de lote con esas palabras. Arma el lote en nivel 2 y registra lo que el banco confirma, mientras el pago sigue siendo humano."
        ],
        [
         "Evidencia",
         "M87 · M88 · E-43:248 · E-65:68 · E-61:72 · E-61:126 · propuestas-to-be.md:640 · arquitectura-ia.html:803"
        ]
       ]
      },
      {
       "id": "m-calendario-de-pagos-de-compra",
       "titulo": "62. Calendario de pagos de compra",
       "chips": [
        "Ola 3",
        "nivel 1",
        "prioridad 2,90",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "prepara la previsión (1)."
        ],
        [
         "Quién firma",
         "Finanzas."
        ],
        [
         "Procesos",
         "[[proc:13.2]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-calendario-de-pagos-de-compra|ver el módulo]]"
        ],
        [
         "Se mide",
         "Pagos de compra previstos con antelación frente a los no planificados"
        ],
        [
         "Línea base",
         "Monto y pagaré a Finanzas ~5 días antes; las compras no contempladas descuadran la caja (M23, M16)"
        ],
        [
         "Meta",
         "≥ 90 % de pagos de compra previstos con 30 días, a los 6 meses"
        ],
        [
         "Se revisa si",
         "< 70 % previstos a los 3 meses"
        ],
        [
         "Dueño",
         "Gerente de Tesorería"
        ],
        [
         "Opera",
         "Analista de tesorería"
        ],
        [
         "Firma",
         "Finanzas (Gerente de Tesorería)"
        ],
        [
         "Calificación",
         "Valor 2,0 (frenos 1 · volumen 2 · pedido 3) · Viabilidad 2,7 (dato 2 · dependencias 2 · esfuerzo 4) · Riesgo 4,7 (personas 5 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "No alivia frenos del circuito, su volumen es mensual y solo hay dolor en entrevistas («nunca es exacto»). Necesita que las OC existan en el sistema, lo que espera a la mesa Cubitt; prepara en nivel 1."
        ],
        [
         "Evidencia",
         "M16 · M23 · E-06-pt-1:115 · E-06-pt-1:117 · E-15:328 · propuestas-to-be.md:648 · arquitectura-ia.html:740"
        ]
       ]
      }
     ]
    },
    {
     "t": "h",
     "x": "Gobierno y personas · 12 casos"
    },
    {
     "t": "tabla",
     "cab": [
      "#",
      "Caso",
      "Ola",
      "Nivel",
      "V",
      "Vi",
      "R",
      "Prioridad",
      "Estado"
     ],
     "num": [
      0,
      4,
      5,
      6,
      7
     ],
     "filas": [
      [
       "7",
       "Uso asistencial con licencias corporativas de Claude",
       "Ola 1",
       "1",
       "3,7",
       "4,0",
       "4,0",
       "3,87",
       "propuesto"
      ],
      [
       "22",
       "[[mod:m-tablero-de-direccion|Tablero de dirección]]",
       "Ola 3",
       "1",
       "4,0",
       "2,7",
       "4,3",
       "3,62",
       "propuesto"
      ],
      [
       "26",
       "[[mod:m-registro-de-acuerdos-y-decisiones|Registro de acuerdos y decisiones]]",
       "Ola 4",
       "1",
       "3,0",
       "3,3",
       "4,7",
       "3,53",
       "propuesto"
      ],
      [
       "45",
       "[[mod:m-descripciones-y-estructura-de-cargos|Descripciones y estructura de cargos]]",
       "Ola 3",
       "1·2",
       "2,3",
       "3,7",
       "4,3",
       "3,30",
       "propuesto"
      ],
      [
       "53",
       "[[mod:m-contratos-digitales|Contratos digitales]]",
       "Ola 3",
       "—",
       "3,3",
       "2,3",
       "3,7",
       "3,07",
       "propuesto"
      ],
      [
       "54",
       "Inventario y regularización de las islas de IA",
       "Ola 1",
       "1",
       "2,3",
       "3,0",
       "4,3",
       "3,07",
       "propuesto"
      ],
      [
       "70",
       "[[mod:m-analitica-de-talento-en-tiempo-real|Analítica de talento en tiempo real]]",
       "Ola 4",
       "1",
       "2,7",
       "1,7",
       "3,7",
       "2,57",
       "propuesto"
      ],
      [
       "71",
       "[[mod:m-vacantes-y-requisiciones|Vacantes y requisiciones]]",
       "Ola 3",
       "1",
       "1,7",
       "2,3",
       "4,0",
       "2,48",
       "propuesto"
      ],
      [
       "72",
       "[[mod:m-repositorio-de-fichas-del-colaborador|Repositorio de fichas del colaborador]]",
       "Ola 3",
       "2",
       "2,3",
       "1,7",
       "3,0",
       "2,27",
       "propuesto"
      ],
      [
       "74",
       "[[mod:m-reclutamiento-y-lector-de-cv|Reclutamiento y lector de CV]]",
       "Ola 3",
       "1·2",
       "2,3",
       "2,3",
       "2,0",
       "2,25",
       "prototipo"
      ],
      [
       "76",
       "[[mod:m-desarrollo-y-carrera|Desarrollo y carrera]]",
       "Ola 4",
       "1",
       "2,0",
       "1,3",
       "3,0",
       "2,02",
       "propuesto"
      ],
      [
       "78",
       "[[mod:m-compensacion-y-percentiles-salariales|Compensación y percentiles salariales]]",
       "Ola 4",
       "1",
       "1,7",
       "1,3",
       "3,0",
       "1,88",
       "propuesto"
      ]
     ]
    },
    {
     "t": "fichas",
     "items": [
      {
       "id": "x-uso-asistencial",
       "titulo": "7. Uso asistencial con licencias corporativas de Claude",
       "chips": [
        "Ola 1",
        "nivel 1",
        "prioridad 3,87",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "Asistente de uso general para directivos y gerentes (redactar, analizar hojas de cálculo, resumir y preparar reuniones). Funciona con licencias corporativas, formación y la política de uso, y reemplaza las cuentas pagadas por cada persona."
        ],
        [
         "Quién firma",
         "Cada usuario responde por lo que produce; nada sale sin la revisión de su autor."
        ],
        [
         "Procesos",
         "[[proc:5.3]] · [[proc:5.1]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         ""
        ],
        [
         "Se mide",
         "Licencias con uso semanal y casos documentados por área"
        ],
        [
         "Línea base",
         "Uso individual con cuentas personales; se propone no menos de 50 licencias (SC-10:155) y hay 70 personas formadas como multiplicadores (SC-10:160)"
        ],
        [
         "Meta",
         "≥ 80 % de las licencias con uso semanal a los 60 días (indicador del 5.3) y al menos un caso documentado por área a los 90 días"
        ],
        [
         "Se revisa si",
         "< 50 % de uso semanal a los 90 días, o un incidente con datos"
        ],
        [
         "Dueño",
         "Gobierno de IA, unidad de la Presidencia (en el manual, Gerente de Tecnología / Sistemas del 5.1)"
        ],
        [
         "Opera",
         "Directivos y gerentes con licencia"
        ],
        [
         "Firma",
         "No requiere firma por uso; la Presidencia aprueba la asignación de licencias y la Dirección de Tecnología, Gobernanza y Riesgo las administra"
        ],
        [
         "Calificación",
         "Valor 3,7 (frenos 1 · volumen 5 · pedido 5) · Viabilidad 4,0 (dato 5 · dependencias 2 · esfuerzo 5) · Riesgo 4,0 (personas 3 · exposición 4 · autonomía 5)"
        ],
        [
         "Por qué",
         "Quick win 2 de la Fase 1: no hay que construir nada y la Presidencia pide definir las licencias y arrancar. Faltan dos decisiones de dirección (cobertura con su presupuesto y política de uso). No alivia un freno concreto del circuito."
        ],
        [
         "Evidencia",
         "IF1:2364 · SC-10:155 · SC-10:157 · SC-10:160 · SC-12:53 · SC-09:205 · E-26:601 · M119"
        ]
       ]
      },
      {
       "id": "m-tablero-de-direccion",
       "titulo": "22. Tablero de dirección",
       "chips": [
        "Ola 3",
        "nivel 1",
        "prioridad 3,62",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "redacta el texto que explica el mes y responde las preguntas de la barra de consulta, en solo lectura (1)."
        ],
        [
         "Quién firma",
         "ninguna; es de gestión, no fiscal."
        ],
        [
         "Procesos",
         "[[proc:1.2]] · [[proc:2.7]] · [[proc:8.17]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-tablero-de-direccion|ver el módulo]]"
        ],
        [
         "Se mide",
         "Días desde el cierre hasta el tablero del mes con su texto explicativo"
        ],
        [
         "Línea base",
         "El reporte de retail toma 3 días (M05); ventas y margen del mes por WhatsApp, sin consolidado del grupo (M91)"
        ],
        [
         "Meta",
         "Tablero por país al tercer día hábil del mes en la Ola 3 y consolidado del grupo en la Ola 4"
        ],
        [
         "Se revisa si",
         "La Junta sigue pidiendo cifras por WhatsApp a los 3 meses, o > 5 % de diferencia con contabilidad"
        ],
        [
         "Dueño",
         "Gerentes Regionales / Gerentes Corporativos (proceso 1.2)"
        ],
        [
         "Opera",
         "Junta Directiva y Gerente Regional Comercial / Retail; lo mantiene el Analista de Sistemas / Datos"
        ],
        [
         "Firma",
         "No requiere: es de gestión, no fiscal; las cifras las certifica Contabilidad al cierre"
        ],
        [
         "Calificación",
         "Valor 4,0 (frenos 3 · volumen 4 · pedido 5) · Viabilidad 2,7 (dato 3 · dependencias 2 · esfuerzo 3) · Riesgo 4,3 (personas 4 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "La Presidencia lo pide de forma explícita («mi sueño es tener un dashboard») y lo usan varias áreas. Lectura en nivel 1 sobre el espejo, pero espera las credenciales de Odoo, la tasa fechada y el plan para la célula de BI sin Power BI (decisión 7)."
        ],
        [
         "Evidencia",
         "M05 · M91 · freno:20.2 · freno:19.3 · E-01:72 · E-08:170 · E-10:309 · decision:7"
        ]
       ]
      },
      {
       "id": "m-registro-de-acuerdos-y-decisiones",
       "titulo": "26. Registro de acuerdos y decisiones",
       "chips": [
        "Ola 4",
        "nivel 1",
        "prioridad 3,53",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "levanta la minuta y recuerda los pendientes (1)."
        ],
        [
         "Quién firma",
         "la decisión la toma la Junta."
        ],
        [
         "Procesos",
         "[[proc:1.3]] · [[proc:1.4]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-registro-de-acuerdos-y-decisiones|ver el módulo]]"
        ],
        [
         "Se mide",
         "Acuerdos de Junta registrados con dueño, fecha y estado"
        ],
        [
         "Línea base",
         "El 98 % de las solicitudes entra por WhatsApp y las decisiones no tienen acta (M92; E-12:45)"
        ],
        [
         "Meta",
         "100 % de los acuerdos de cada sesión registrados con dueño y fecha en 48 h, desde el primer trimestre"
        ],
        [
         "Se revisa si",
         "< 70 % de los acuerdos registrados, o minutas corregidas en más del 30 %"
        ],
        [
         "Dueño",
         "Asistente Ejecutivo(a) de la Presidencia (proceso 1.4)"
        ],
        [
         "Opera",
         "Asistente Ejecutivo(a) de la Presidencia"
        ],
        [
         "Firma",
         "Junta Directiva, que toma la decisión; el Presidente(a) de Junta Directiva aprueba la minuta"
        ],
        [
         "Calificación",
         "Valor 3,0 (frenos 2 · volumen 3 · pedido 4) · Viabilidad 3,3 (dato 2 · dependencias 4 · esfuerzo 4) · Riesgo 4,7 (personas 4 · exposición 5 · autonomía 5)"
        ],
        [
         "Por qué",
         "La dueña del proceso busca que la Junta use un registro con dueños (E-12:59). Es pequeño, casi sin dependencias y de nivel 1; aporta poco a los frenos del circuito."
        ],
        [
         "Evidencia",
         "M92 · freno:2a.3 · E-12:45 · E-12:59 · E-04:44"
        ]
       ]
      },
      {
       "id": "m-descripciones-y-estructura-de-cargos",
       "titulo": "45. Descripciones y estructura de cargos",
       "chips": [
        "Ola 3",
        "nivel 1·2",
        "prioridad 3,30",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "redacta cada descripción a partir del manual de procesos y de las entrevistas (1); detecta cargos duplicados o sin contenido (2)."
        ],
        [
         "Quién firma",
         "Talento Humano aprueba cada descripción."
        ],
        [
         "Procesos",
         "[[proc:17.6]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-descripciones-y-estructura-de-cargos|ver el módulo]]"
        ],
        [
         "Se mide",
         "Cargos del catálogo con descripción aprobada y enlazada a los procesos del manual"
        ],
        [
         "Línea base",
         "190 cargos que se reducen a 65; descripciones congeladas en VE (E-69:19; E-21:6)"
        ],
        [
         "Meta",
         "Los 65 cargos con descripción aprobada, a los 4 meses de validar la estructura To-Be"
        ],
        [
         "Se revisa si",
         "> 40 % de los borradores reescritos por Talento Humano"
        ],
        [
         "Dueño",
         "Gerente de Recursos Humanos (proceso 17.6)"
        ],
        [
         "Opera",
         "Coordinador(a) de Recursos Humanos"
        ],
        [
         "Firma",
         "Gerente de Recursos Humanos, que aprueba cada descripción"
        ],
        [
         "Calificación",
         "Valor 2,3 (frenos 2 · volumen 2 · pedido 3) · Viabilidad 3,7 (dato 4 · dependencias 3 · esfuerzo 4) · Riesgo 4,3 (personas 4 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "Su insumo ya existe (manual de procesos y estructura To-Be) y Talento Humano de VE ya redacta perfiles con IA. Trabaja sobre cargos, no sobre personas, y espera la validación de la estructura To-Be."
        ],
        [
         "Evidencia",
         "E-21:6 · E-21:106 · E-69:19 · E-16:92 · SC-07:546"
        ]
       ]
      },
      {
       "id": "m-contratos-digitales",
       "titulo": "53. Contratos digitales",
       "chips": [
        "Ola 3",
        "prioridad 3,07",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         ""
        ],
        [
         "Quién firma",
         "legal aprueba y firma el representante."
        ],
        [
         "Procesos",
         "[[proc:18.2]] · [[proc:18.4]] · [[proc:1.8]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-contratos-digitales|ver el módulo]]"
        ],
        [
         "Se mide",
         "Contratos vigentes en el repositorio con fechas y obligaciones extraídas, y días de revisión legal"
        ],
        [
         "Línea base",
         "Clientes del exterior con crédito sin contrato marco y franquicias sin contrato (E-62:54; freno 16.3); revisión de contratos de publicidad de ~1 semana (E-42:267)"
        ],
        [
         "Meta",
         "100 % de los clientes del exterior con crédito y de las franquicias con contrato vigente en 12 meses; revisión legal ≤ 2 días"
        ],
        [
         "Se revisa si",
         "Un vencimiento no avisado, o cláusulas fuera de estándar que la revisión de legal no recibió marcadas"
        ],
        [
         "Dueño",
         "Asesor(a) Jurídico(a) Externo(a) del Grupo (proceso 18.2)"
        ],
        [
         "Opera",
         "Consultoría Jurídica y las áreas que contratan (comercial, mercadeo, franquicias)"
        ],
        [
         "Firma",
         "Consultoría Jurídica aprueba y firma el representante legal"
        ],
        [
         "Calificación",
         "Valor 3,3 (frenos 3 · volumen 3 · pedido 4) · Viabilidad 2,3 (dato 2 · dependencias 2 · esfuerzo 3) · Riesgo 3,7 (personas 4 · exposición 3 · autonomía 4)"
        ],
        [
         "Por qué",
         "La Presidencia lo señala como un vacío «fatal» de 40 años y la dirección comercial lo confirma; alivia un freno lento (16.3). Los contratos hoy no existen o están dispersos, y depende del proveedor de firma electrónica (decisión 9)."
        ],
        [
         "Evidencia",
         "freno:16.3 · E-01:28 · E-08:146 · E-62:54 · E-42:267 · E-55:18 · decision:9"
        ]
       ]
      },
      {
       "id": "x-islas-de-ia",
       "titulo": "54. Inventario y regularización de las islas de IA",
       "chips": [
        "Ola 1",
        "nivel 1",
        "prioridad 3,07",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "Prepara la ficha de cada uso de IA y de cada aplicativo que las áreas crearon por su cuenta (las islas de la Fase 1 y los 14 aplicativos), con sus datos, su cuenta y su riesgo. Para cada uno propone conectarlo a la plataforma, pasarlo a licencia corporativa o retirarlo."
        ],
        [
         "Quién firma",
         "Gobierno de IA decide el destino de cada herramienta; Tecnología la conecta o la retira."
        ],
        [
         "Procesos",
         "[[proc:5.1]] · [[proc:14.1]] · [[proc:14.4]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         ""
        ],
        [
         "Se mide",
         "Herramientas de IA de las áreas inventariadas y con destino decidido"
        ],
        [
         "Línea base",
         "6 islas individuales (IF1 8.5c) y 14 aplicativos creados por su lado, con credenciales de administrador e IA pagada por cada empleado (M119; MC:27003)"
        ],
        [
         "Meta",
         "100 % inventariadas a los 60 días y con destino decidido a los 120; ninguna credencial de administrador en uso a los 6 meses"
        ],
        [
         "Se revisa si",
         "Aparecen herramientas nuevas fuera del registro después del primer trimestre"
        ],
        [
         "Dueño",
         "Dirección de Tecnología, Gobernanza y Riesgo (en el manual, Gerente de Tecnología / Sistemas, que lleva el registro de herramientas)"
        ],
        [
         "Opera",
         "Coordinador(a) de Sistemas de cada país"
        ],
        [
         "Firma",
         "Gobierno de IA, que decide el destino de cada herramienta"
        ],
        [
         "Calificación",
         "Valor 2,3 (frenos 1 · volumen 3 · pedido 3) · Viabilidad 3,0 (dato 3 · dependencias 2 · esfuerzo 4) · Riesgo 4,3 (personas 3 · exposición 5 · autonomía 5)"
        ],
        [
         "Por qué",
         "Ordena un riesgo ya presente (credenciales de administrador y datos en cuentas personales) y se puede hacer sin construir. Para regularizar necesita la política de adopción y la sala de agentes. Varias islas (pauta, postventa, temporada web, torre retail) coinciden con módulos de la órbita."
        ],
        [
         "Evidencia",
         "IF1:2150 · M119 · MC:27003 · MC:27522 · SC-13:105 · SC-08:432 · SC-04:163 · E-22:65 · E-58:72 · E-16:137 · E-55:32"
        ]
       ]
      },
      {
       "id": "m-analitica-de-talento-en-tiempo-real",
       "titulo": "70. Analítica de talento en tiempo real",
       "chips": [
        "Ola 4",
        "nivel 1",
        "prioridad 2,57",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "explica los cambios y alerta desvíos, como la rotación de una tienda (1)."
        ],
        [
         "Quién firma",
         "ninguna."
        ],
        [
         "Procesos",
         "[[proc:17.5]] · [[proc:17.9]] · [[proc:15.5]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-analitica-de-talento-en-tiempo-real|ver el módulo]]"
        ],
        [
         "Se mide",
         "Indicadores de talento publicados cada mes por área y país"
        ],
        [
         "Línea base",
         "Hoy, reportes trimestrales de asistencia armados a mano; en VE no se llevan indicadores (E-37:363)"
        ],
        [
         "Meta",
         "Rotación, vacantes y tiempo de cobertura mensuales por país, a los 3 meses de existir la ficha del colaborador"
        ],
        [
         "Se revisa si",
         "Diferencias > 2 % con la nómina, o un acceso indebido"
        ],
        [
         "Dueño",
         "Gerente de Recursos Humanos (proceso 17.5)"
        ],
        [
         "Opera",
         "Gerente de Recursos Humanos y gerentes de área"
        ],
        [
         "Firma",
         "No requiere: es lectura; las acciones sobre personas siguen su propio proceso"
        ],
        [
         "Calificación",
         "Valor 2,7 (frenos 1 · volumen 2 · pedido 5) · Viabilidad 1,7 (dato 1 · dependencias 1 · esfuerzo 3) · Riesgo 3,7 (personas 2 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "La dueña del proceso pide reportes con «inteligencia» sobre rotación para gerentes y directiva. Pero el dato no existe: depende de la ficha, de las vacantes y de la nómina, y agrega datos sensibles de personal."
        ],
        [
         "Evidencia",
         "E-13:224 · E-13:226 · E-37:363"
        ]
       ]
      },
      {
       "id": "m-vacantes-y-requisiciones",
       "titulo": "71. Vacantes y requisiciones",
       "chips": [
        "Ola 3",
        "nivel 1",
        "prioridad 2,48",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "redacta el aviso de la vacante a partir de la descripción del cargo (1)."
        ],
        [
         "Quién firma",
         "abrir la vacante."
        ],
        [
         "Procesos",
         "[[proc:17.1]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-vacantes-y-requisiciones|ver el módulo]]"
        ],
        [
         "Se mide",
         "Días de cobertura de la vacante, desde la requisición aprobada hasta el ingreso"
        ],
        [
         "Línea base",
         "Por medir; hubo un cargo de contabilidad sin cubrir más de 2 meses (E-24:31)"
        ],
        [
         "Meta",
         "Medir el 100 % de las vacantes desde el primer mes y bajar 20 % el tiempo de cobertura en 6 meses"
        ],
        [
         "Se revisa si",
         "Avisos corregidos en más del 30 %"
        ],
        [
         "Dueño",
         "Gerente de Recursos Humanos (proceso 17.1)"
        ],
        [
         "Opera",
         "Analista de Recursos Humanos / Nómina"
        ],
        [
         "Firma",
         "Gerente del área solicitante con el Gerente de Recursos Humanos, que abren la vacante"
        ],
        [
         "Calificación",
         "Valor 1,7 (frenos 1 · volumen 2 · pedido 2) · Viabilidad 2,3 (dato 2 · dependencias 2 · esfuerzo 3) · Riesgo 4,0 (personas 4 · exposición 3 · autonomía 5)"
        ],
        [
         "Por qué",
         "Se describe el proceso, casi sin dolor, y no hay freno del circuito. La IA solo redacta el aviso (nivel 1) desde la descripción del cargo, que todavía no existe."
        ],
        [
         "Evidencia",
         "E-54:295 · E-54:303 · E-24:31 · M116"
        ]
       ]
      },
      {
       "id": "m-repositorio-de-fichas-del-colaborador",
       "titulo": "72. Repositorio de fichas del colaborador",
       "chips": [
        "Ola 3",
        "nivel 2",
        "prioridad 2,27",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "extrae los datos de documentos escaneados (2) y avisa de documentos vencidos o faltantes (2)."
        ],
        [
         "Quién firma",
         "los cambios de cargo y de contrato."
        ],
        [
         "Procesos",
         "[[proc:17.4]] · [[proc:17.2]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-repositorio-de-fichas-del-colaborador|ver el módulo]]"
        ],
        [
         "Se mide",
         "Colaboradores con ficha digital completa y documentos vigentes"
        ],
        [
         "Línea base",
         "Por medir: expedientes en papel, repartidos por país (E-54:237)"
        ],
        [
         "Meta",
         "100 % de las fichas de un país piloto digitalizadas en 6 meses, con ≥ 95 % de campos extraídos correctos"
        ],
        [
         "Se revisa si",
         "< 90 % de campos correctos en la extracción, o un acceso indebido"
        ],
        [
         "Dueño",
         "Coordinador(a) de Recursos Humanos (proceso 17.4)"
        ],
        [
         "Opera",
         "Analista de Recursos Humanos / Nómina"
        ],
        [
         "Firma",
         "Gerente de Recursos Humanos, para los cambios de cargo y de contrato"
        ],
        [
         "Calificación",
         "Valor 2,3 (frenos 1 · volumen 3 · pedido 3) · Viabilidad 1,7 (dato 2 · dependencias 1 · esfuerzo 2) · Riesgo 3,0 (personas 1 · exposición 5 · autonomía 3)"
        ],
        [
         "Por qué",
         "Datos sensibles de empleados (decisión 8) en nivel 2; depende de la firma electrónica (decisión 9) y de leer la nómina de cada país. Sin freno del circuito."
        ],
        [
         "Evidencia",
         "E-54:237 · E-24:243 · decision:8 · decision:9"
        ]
       ]
      },
      {
       "id": "m-reclutamiento-y-lector-de-cv",
       "titulo": "74. Reclutamiento y lector de CV",
       "chips": [
        "Ola 3",
        "nivel 1·2",
        "prioridad 2,25",
        "prototipo"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "lee cada CV, lo resume y lo compara con el perfil del cargo usando criterios explícitos, y ordena a los candidatos con el porqué (1). Nunca descarta sola. También agenda entrevistas (2)."
        ],
        [
         "Quién firma",
         "la persona decide a quién se entrevista, a quién se contrata y la oferta."
        ],
        [
         "Procesos",
         "[[proc:17.1]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-reclutamiento-y-lector-de-cv|ver el módulo]]"
        ],
        [
         "Se mide",
         "Horas de filtrado por vacante y concordancia entre el orden de la IA y la terna que elige la persona"
        ],
        [
         "Línea base",
         "Por medir: no hay registro ni criterios comunes; un cargo de contabilidad tardó más de 2 meses (E-24:31)"
        ],
        [
         "Meta",
         "En el piloto: −50 % de horas de filtrado por vacante y ≥ 80 % de la terna final dentro del top 10 de la IA, con revisión de sesgos trimestral"
        ],
        [
         "Se revisa si",
         "Diferencias sistemáticas por sexo, edad u origen en la revisión de sesgos, o < 60 % de concordancia"
        ],
        [
         "Dueño",
         "Gerente de Recursos Humanos (proceso 17.1)"
        ],
        [
         "Opera",
         "Analista de Recursos Humanos / Nómina"
        ],
        [
         "Firma",
         "Gerente del área solicitante con el Gerente de Recursos Humanos: deciden a quién se entrevista, a quién se contrata y la oferta"
        ],
        [
         "Calificación",
         "Valor 2,3 (frenos 1 · volumen 3 · pedido 3) · Viabilidad 2,3 (dato 2 · dependencias 2 · esfuerzo 3) · Riesgo 2,0 (personas 1 · exposición 2 · autonomía 3)"
        ],
        [
         "Por qué",
         "Es el prototipo 2 (P2) de la Fase 2: diseño documentado en la página de Prototipos, sin construir todavía. Toca decisiones de empleo: la IA ordena con el porqué y nunca descarta, y faltan el consentimiento de los candidatos y la revisión de sesgos (decisión 8)."
        ],
        [
         "Evidencia",
         "E-24:31 · E-37:45 · E-13:227 · decision:8 · IF1:1397"
        ]
       ]
      },
      {
       "id": "m-desarrollo-y-carrera",
       "titulo": "76. Desarrollo y carrera",
       "chips": [
        "Ola 4",
        "nivel 1",
        "prioridad 2,02",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "sugiere formación y rutas según las brechas de competencias (1) y prepara la conversación de desempeño (1)."
        ],
        [
         "Quién firma",
         "la evaluación y la promoción."
        ],
        [
         "Procesos",
         "[[proc:17.7]] · [[proc:17.8]] · [[proc:5.3]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-desarrollo-y-carrera|ver el módulo]]"
        ],
        [
         "Se mide",
         "Colaboradores con evaluación de desempeño y plan de desarrollo registrados"
        ],
        [
         "Línea base",
         "Por medir: la evaluación se hace «a veces, no siempre» (E-54:175)"
        ],
        [
         "Meta",
         "100 % de los cargos de un país piloto evaluados en el ciclo anual siguiente"
        ],
        [
         "Se revisa si",
         "Planes que los gerentes reescriben en más del 50 %, o un reclamo por trato desigual"
        ],
        [
         "Dueño",
         "Gerente de Recursos Humanos (proceso 17.7)"
        ],
        [
         "Opera",
         "Gerentes y supervisores de área"
        ],
        [
         "Firma",
         "Gerente de Recursos Humanos con el gerente del área, que firman la evaluación y la promoción"
        ],
        [
         "Calificación",
         "Valor 2,0 (frenos 1 · volumen 2 · pedido 3) · Viabilidad 1,3 (dato 1 · dependencias 1 · esfuerzo 2) · Riesgo 3,0 (personas 1 · exposición 5 · autonomía 3)"
        ],
        [
         "Por qué",
         "Toca decisiones sobre personas (evaluación y promoción). No hay registro ni modelo de competencias, y depende de los cargos y de las fichas. Sin freno del circuito."
        ],
        [
         "Evidencia",
         "E-54:175 · E-21:122 · decision:8"
        ]
       ]
      },
      {
       "id": "m-compensacion-y-percentiles-salariales",
       "titulo": "78. Compensación y percentiles salariales",
       "chips": [
        "Ola 4",
        "nivel 1",
        "prioridad 1,88",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "explica la posición de cada cargo en su banda y simula ajustes (1)."
        ],
        [
         "Quién firma",
         "todo cambio salarial."
        ],
        [
         "Procesos",
         "[[proc:17.5]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-compensacion-y-percentiles-salariales|ver el módulo]]"
        ],
        [
         "Se mide",
         "Cargos con banda de compensación definida y posicionados contra el mercado"
        ],
        [
         "Línea base",
         "Por medir: no hay bandas ni referencia de mercado (decisión 10)"
        ],
        [
         "Meta",
         "Bandas para los 65 cargos del catálogo, en el año siguiente a contar con la encuesta de mercado"
        ],
        [
         "Se revisa si",
         "Cualquier acceso fuera de Compensación y la Dirección"
        ],
        [
         "Dueño",
         "Gerente de Recursos Humanos (proceso 17.5)"
        ],
        [
         "Opera",
         "Compensación (Recursos Humanos) y la Dirección"
        ],
        [
         "Firma",
         "Presidencia con el Director(a) de Finanzas y Negocios, que firman todo cambio de compensación"
        ],
        [
         "Calificación",
         "Valor 1,7 (frenos 1 · volumen 2 · pedido 2) · Viabilidad 1,3 (dato 1 · dependencias 1 · esfuerzo 2) · Riesgo 3,0 (personas 1 · exposición 5 · autonomía 3)"
        ],
        [
         "Por qué",
         "Datos y decisiones de compensación: el riesgo más alto en datos personales. Depende de la encuesta de mercado (decisión 10), de los permisos por campo (decisión 8) y de leer la nómina; casi nadie lo pide."
        ],
        [
         "Evidencia",
         "E-21:122 · E-13:226 · decision:8 · decision:10"
        ]
       ]
      }
     ]
    },
    {
     "t": "h",
     "x": "Datos e IA · 3 casos"
    },
    {
     "t": "tabla",
     "cab": [
      "#",
      "Caso",
      "Ola",
      "Nivel",
      "V",
      "Vi",
      "R",
      "Prioridad",
      "Estado"
     ],
     "num": [
      0,
      4,
      5,
      6,
      7
     ],
     "filas": [
      [
       "17",
       "[[mod:m-pronostico-base|Pronóstico base]]",
       "Ola 1",
       "1",
       "4,0",
       "2,7",
       "4,7",
       "3,70",
       "propuesto"
      ],
      [
       "31",
       "[[mod:m-catalogo-unico|Catálogo único]]",
       "Ola 1",
       "1·2",
       "4,3",
       "2,7",
       "3,3",
       "3,50",
       "propuesto"
      ],
      [
       "32",
       "Asistente IA del conocimiento del proyecto",
       "Ola 1",
       "1",
       "2,0",
       "5,0",
       "3,7",
       "3,47",
       "en operación"
      ]
     ]
    },
    {
     "t": "fichas",
     "items": [
      {
       "id": "m-pronostico-base",
       "titulo": "17. Pronóstico base",
       "chips": [
        "Ola 1",
        "nivel 1",
        "prioridad 3,70",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "explica el pronóstico y convierte lo cualitativo (campañas, cupos, lanzamientos) en ajustes con motivo (1)."
        ],
        [
         "Quién firma",
         "la mesa de compra decide."
        ],
        [
         "Procesos",
         "[[proc:15.4]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-pronostico-base|ver el módulo]]"
        ],
        [
         "Se mide",
         "Error del pronóstico fuera de muestra frente al método ingenuo (indicador 15.4)"
        ],
        [
         "Línea base",
         "Por medir; hoy conviven tres sugeridos que se pisan (M02)"
        ],
        [
         "Meta",
         "Razón de error < 1 en las series A de Casio y Cubitt tras 3 ciclos mensuales en paralelo con la sábana"
        ],
        [
         "Se revisa si",
         "Razón ≥ 1 en dos ciclos seguidos, o la mesa de compra no lo usa a los 90 días"
        ],
        [
         "Dueño",
         "Analista de Sistemas / Datos"
        ],
        [
         "Opera",
         "Planificador(a) de la demanda"
        ],
        [
         "Firma",
         "Mesa de compra (Dirección de compras)"
        ],
        [
         "Calificación",
         "Valor 4,0 (frenos 3 · volumen 4 · pedido 5) · Viabilidad 2,7 (dato 3 · dependencias 2 · esfuerzo 3) · Riesgo 4,7 (personas 5 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "Es lo más pedido por la dirección («alguien que lea para yo actuar») y por planificación, aunque alivia solo frenos lentos (1.2, 1.3, 1.4). El número lo pone un modelo estadístico y la IA explica, pero necesita el sell-out normalizado, la demanda perdida y las credenciales de Odoo."
        ],
        [
         "Evidencia",
         "M02 · freno:1.2 · freno:1.3 · freno:1.4 · E-08:168 · E-05:154 · E-40:174 · E-08:35 · E-10:58 · E-08:143 · propuestas-to-be.md:65 · arquitectura-ia.html:719 · arquitectura-ia.html:857"
        ]
       ]
      },
      {
       "id": "m-catalogo-unico",
       "titulo": "31. Catálogo único",
       "chips": [
        "Ola 1",
        "nivel 1·2",
        "prioridad 3,50",
        "propuesto"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "valida que cada producto esté completo y detecta duplicados (2); traduce alias (2); detecta antes de la llegada los productos que vienen sin precio y propone uno por regla de margen (1)."
        ],
        [
         "Quién firma",
         "el precio y la fusión de terceros."
        ],
        [
         "Procesos",
         "[[proc:15.2]] · [[proc:6.2]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         "[[mod:m-catalogo-unico|ver el módulo]]"
        ],
        [
         "Se mide",
         "Altas de producto completas a la primera y SKU que llegan sin precio"
        ],
        [
         "Línea base",
         "BI corrige errores de maestro cada día y hay productos que llegan a tienda sin precio (M09, M29); la tasa está por medir"
        ],
        [
         "Meta",
         "≥ 95 % de altas completas a la primera y ningún SKU sin precio al llegar, a los 6 meses del arranque"
        ],
        [
         "Se revisa si",
         "< 80 % de altas completas a los 3 meses"
        ],
        [
         "Dueño",
         "Analista de Sistemas / Datos"
        ],
        [
         "Opera",
         "Analista de datos maestros (inventarios y precios del hub)"
        ],
        [
         "Firma",
         "Dirección comercial (precio) y Analista de Sistemas / Datos (fusión de terceros)"
        ],
        [
         "Calificación",
         "Valor 4,3 (frenos 4 · volumen 5 · pedido 4) · Viabilidad 2,7 (dato 3 · dependencias 3 · esfuerzo 2) · Riesgo 3,3 (personas 3 · exposición 4 · autonomía 3)"
        ],
        [
         "Por qué",
         "Alivia frenos lentos (2b.3, 14c.2) con volumen diario en tres países, y sus alias sostienen el sell-out que resuelve 20.1; lo piden TI y un mando de Panamá, no la dirección. Lee y escribe en Odoo, toca identificadores de contactos y propone precios, de ahí la viabilidad y el riesgo medios."
        ],
        [
         "Evidencia",
         "M09 · M19 · M29 · M33 · M118 · freno:2b.3 · freno:14c.2 · freno:20.1 · E-07:244 · SC-01:329 · E-53:128 · E-03:136 · E-10:122 · propuestas-to-be.md:49 · propuestas-to-be.md:909 · arquitectura-ia.html:726"
        ]
       ]
      },
      {
       "id": "x-asistente-conocimiento",
       "titulo": "32. Asistente IA del conocimiento del proyecto",
       "chips": [
        "Ola 1",
        "nivel 1",
        "prioridad 3,47",
        "en operación"
       ],
       "campos": [
        [
         "Qué hace la IA",
         "Responde en lenguaje natural sobre todo el conocimiento levantado (entrevistas, documentos, manual de procesos, circuito y arquitectura) y cita la fuente. Usa Claude por API con el corpus en caché y búsqueda de texto en español."
        ],
        [
         "Quién firma",
         "Ninguna: es de consulta, en solo lectura; decide quien pregunta."
        ],
        [
         "Procesos",
         "[[proc:15.6]]"
        ],
        [
         "Frenos que resuelve",
         ""
        ],
        [
         "En la órbita",
         ""
        ],
        [
         "Se mide",
         "Consultas con cita verificable y costo por consulta"
        ],
        [
         "Línea base",
         "Por medir: no hay registro de uso publicado; cada arranque en frío cuesta del orden de USD 2 (CLAUDE.md:157)"
        ],
        [
         "Meta",
         "Registrar uso y costo por consulta desde nov-2026; ≥ 90 % de respuestas con cita correcta en una muestra mensual de 20"
        ],
        [
         "Se revisa si",
         "< 80 % de citas correctas, o menos de 10 consultas al mes de la Junta durante dos meses"
        ],
        [
         "Dueño",
         "Equipo consultor del proyecto mientras dure el encargo; luego, Gobierno de IA"
        ],
        [
         "Opera",
         "Junta Directiva y equipo del proyecto"
        ],
        [
         "Firma",
         "No requiere: responde en solo lectura y cita la fuente"
        ],
        [
         "Calificación",
         "Valor 2,0 (frenos 1 · volumen 2 · pedido 3) · Viabilidad 5,0 (dato 5 · dependencias 5 · esfuerzo 5) · Riesgo 3,7 (personas 2 · exposición 5 · autonomía 4)"
        ],
        [
         "Por qué",
         "En operación desde el 18-jul-2026 para la Junta (7 cuentas con rol Junta) y el equipo: viabilidad máxima. Su valor para el circuito es indirecto, el uso real está por medir y el corpus incluye material sensible de entrevistas, por eso el riesgo de datos personales es medio-alto."
        ],
        [
         "Evidencia",
         "CLAUDE.md:157 · BITACORA.md:468 · BITACORA.md:559 · BITACORA.md:581 · E-01:72"
        ]
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "ciclo",
   "num": "5",
   "titulo": "Ciclo de vida de un caso",
   "estado": "borrador",
   "bloques": [
    "El ciclo de un caso de uso está definido en el proceso [[proc:5.2|5.2 · identificación, priorización y aprobación de casos de uso]], que vive en el manual de procesos. Esta sección no lo redefine: lo resume y le agrega lo que un caso de IA necesita además de cualquier otro desarrollo.",
    {
     "t": "h",
     "x": "Lo que establece el proceso 5.2"
    },
    {
     "t": "pasos",
     "items": [
      {
       "t": "Registro",
       "x": "Quien tiene el problema registra el caso: el problema, los datos que usa, quién lo usará, el beneficio esperado y la herramienta. También se registran los que ya están construidos."
      },
      {
       "t": "Inventario y duplicidad",
       "x": "La PMO lo incorpora al inventario y verifica que otra área no haya resuelto ya lo mismo."
      },
      {
       "t": "Evaluación técnica y de riesgo",
       "x": "Tecnología evalúa qué datos toca, qué credenciales necesita, cómo se integra y si respeta la política."
      },
      {
       "t": "Priorización y decisión",
       "x": "El comité prioriza por valor y riesgo y decide; los descartados quedan registrados con su motivo."
      },
      {
       "t": "Quién lo construye",
       "x": "Tecnología o su socio cuando toca los sistemas centrales; la propia área con una herramienta autorizada cuando es de autoservicio."
      },
      {
       "t": "Construcción y prueba",
       "x": "En un entorno de prueba, con el mismo estándar técnico de cualquier desarrollo."
      },
      {
       "t": "Validación antes de producción",
       "x": "Seguridad, datos, integración y efecto sobre contabilidad e inventario, sin importar quién lo construyó."
      },
      {
       "t": "Medición a 90 días",
       "x": "El beneficio real frente al esperado, reportado al inventario. La decisión de negocio sigue siendo de la persona."
      }
     ]
    },
    {
     "t": "nota",
     "titulo": "Nombres",
     "x": "El manual todavía nombra al Comité de Inteligencia Artificial y a la Gerencia de Tecnología. En la estructura propuesta son el **Comité de Gobierno del Dato e IA** y la **Dirección de Tecnología, Gobernanza y Riesgo**, con **Gobierno de IA** como unidad que redacta la política y vela por ella. Quien aprueba la IA no es quien la implanta."
    },
    {
     "t": "h",
     "x": "Lo que un caso de IA agrega"
    },
    {
     "t": "pasos",
     "items": [
      {
       "t": "Nivel de autonomía declarado",
       "x": "Cada caso declara su nivel —1 prepara, 2 hace y avisa, 3 decide con firma previa— y quién firma. El nivel lo fija la [[doc:politica/autonomia|política de adopción]]; subir de nivel exige evidencia medida y lo aprueba el comité."
      },
      {
       "t": "Piloto con criterio de salida",
       "x": "Antes de operar, el caso corre en paralelo con el trabajo actual durante un ciclo completo. Se fija de antemano qué tasa de acierto o qué error lo deja pasar y qué lo devuelve a diseño."
      },
      {
       "t": "Evaluación antes de cada cambio",
       "x": "Un conjunto de casos reales con su respuesta esperada. Ningún cambio de instrucciones o de modelo pasa a producción si empeora el resultado."
      },
      {
       "t": "Monitoreo",
       "x": "Costo, aciertos, correcciones humanas y quejas, por caso y por mes, en la sala de agentes de la plataforma."
      },
      {
       "t": "Retiro",
       "x": "Si la métrica cae bajo su umbral dos meses seguidos, o el proceso cambia, el caso se revisa o se retira, y se liberan sus accesos."
      }
     ]
    }
   ]
  },
  {
   "id": "responsables",
   "num": "6",
   "titulo": "Quién responde por cada caso",
   "estado": "borrador",
   "bloques": [
    "Cada caso tiene un **dueño** (responde por el beneficio: es el dueño del proceso principal), un **operador** (lo usa a diario) y un **firmante** (firma lo que la IA prepara). Los roles son los del manual de procesos; la estructura propuesta puede cambiar su nombre, no su responsabilidad.",
    {
     "t": "tabla",
     "cab": [
      "Dueño",
      "Casos",
      "Cuáles (por prioridad)"
     ],
     "num": [
      1
     ],
     "filas": [
      [
       "Coordinador(a) de Logística y Bodega",
       "5",
       "13. [[mod:m-reposicion-a-tiendas-y-web|Reposición a tiendas y web]] · 21. [[mod:m-costo-en-destino|Costo en destino]] · 28. [[mod:m-inventario-confiable|Inventario confiable]] · 41. [[mod:m-llegada-a-zona-libre-y-liberacion|Llegada a Zona Libre y liberación]] · 55. [[mod:m-despacho-y-exportacion|Despacho y exportación]]"
      ],
      [
       "Gerente de E-commerce / Ventas Web (por país)",
       "5",
       "11. [[mod:m-plan-de-temporada|Plan de temporada]] · 35. [[mod:m-panel-unico-del-pedido|Panel único del pedido]] · 38. [[mod:m-limpieza-de-pedidos-cashea|Limpieza de pedidos Cashea]] · 66. [[mod:m-venta-asistida-por-chat|Venta asistida por chat]] · 69. [[mod:m-publicacion-por-canal|Publicación por canal]]"
      ],
      [
       "Comité Comercial / Director de Compras y Cadena de Suministros",
       "4",
       "6. [[mod:m-demanda-y-s-op|Demanda y S&OP]] · 8. [[mod:m-reporte-pci-a-casio|Reporte PCI a Casio]] · 15. [[mod:m-transito-internacional|Tránsito internacional]] · 18. [[mod:m-mesa-de-compra-casio|Mesa de compra Casio]]"
      ],
      [
       "Director(a) Comercial del Grupo",
       "3",
       "1. [[mod:m-vigia-de-reservas|Vigía de reservas]] · 37. [[mod:m-precios-y-promociones-con-margen|Precios y promociones con margen]] · 46. [[mod:m-reparto-en-escasez|Reparto en escasez]]"
      ],
      [
       "Analista de Sistemas / Datos",
       "2",
       "17. [[mod:m-pronostico-base|Pronóstico base]] · 31. [[mod:m-catalogo-unico|Catálogo único]]"
      ],
      [
       "Analista/Ejecutivo(a) Comercial, supervisado por el Gerente Comercial (País / Canal) (proceso 8.4)",
       "2",
       "64. [[mod:m-pedidos-b2b|Pedidos B2B]] · 73. [[mod:m-portal-de-clientes|Portal de clientes]]"
      ],
      [
       "Director(a) de Marca Propia (Cubitt)",
       "2",
       "42. [[mod:m-muestras-y-pruebas|Muestras y pruebas]] · 49. [[mod:m-embudo-de-oportunidades|Embudo de oportunidades]]"
      ],
      [
       "Gerente Comercial (País / Canal)",
       "2",
       "12. [[mod:m-aprobacion-comercial-por-reglas|Aprobación comercial por reglas]] · 30. [[mod:m-disponibilidad-y-oferta|Disponibilidad y oferta]]"
      ],
      [
       "Gerente de Contabilidad / Administración",
       "2",
       "3. [[mod:m-cuadre-previo-de-caja|Cuadre previo de caja]] · 14. [[mod:m-conciliacion-de-plataformas|Conciliación de plataformas]]"
      ],
      [
       "Gerente de Recursos Humanos (proceso 17.1)",
       "2",
       "71. [[mod:m-vacantes-y-requisiciones|Vacantes y requisiciones]] · 74. [[mod:m-reclutamiento-y-lector-de-cv|Reclutamiento y lector de CV]]"
      ],
      [
       "Gerente de Recursos Humanos (proceso 17.5)",
       "2",
       "70. [[mod:m-analitica-de-talento-en-tiempo-real|Analítica de talento en tiempo real]] · 78. [[mod:m-compensacion-y-percentiles-salariales|Compensación y percentiles salariales]]"
      ],
      [
       "Gerente de Servicio Técnico (proceso 11.1)",
       "2",
       "61. [[mod:m-bandeja-de-mayoristas|Bandeja de mayoristas]] · 68. [[mod:m-copiloto-de-atencion-omnicanal|Copiloto de atención omnicanal]]"
      ],
      [
       "Gerente de Servicio Técnico (proceso 11.2)",
       "2",
       "20. [[mod:m-expediente-unico-de-garantia|Expediente único de garantía]] · 52. [[mod:m-stock-de-garantia-y-reemplazos|Stock de garantía y reemplazos]]"
      ],
      [
       "Gerente de Tesorería",
       "2",
       "33. [[mod:m-flujo-de-caja|Flujo de caja]] · 62. [[mod:m-calendario-de-pagos-de-compra|Calendario de pagos de compra]]"
      ],
      [
       "Gerente Regional de Marketing (proceso 16.8)",
       "2",
       "25. [[mod:m-mercadeo-con-datos|Mercadeo con datos]] · 67. [[mod:m-paneles-de-pauta-y-redes|Paneles de pauta y redes]]"
      ],
      [
       "Analista de Facturación",
       "1",
       "2. [[mod:m-vigia-del-stage|Vigía del stage]]"
      ],
      [
       "Analista de Sistemas / Datos (célula de BI), dueño del proceso 15.1",
       "1",
       "4. [[mod:m-buzon-de-sell-out-de-clientes|Buzón de sell-out de clientes]]"
      ],
      [
       "Asesor(a) Jurídico(a) Externo(a) del Grupo (proceso 18.2)",
       "1",
       "53. [[mod:m-contratos-digitales|Contratos digitales]]"
      ],
      [
       "Asistente Ejecutivo(a) de la Presidencia (proceso 1.4)",
       "1",
       "26. [[mod:m-registro-de-acuerdos-y-decisiones|Registro de acuerdos y decisiones]]"
      ],
      [
       "Coordinador(a) Comercial (proceso 8.8)",
       "1",
       "75. [[mod:m-portal-de-socios-y-franquicias|Portal de socios y franquicias]]"
      ],
      [
       "Coordinador(a) de Logística y Bodega (país)",
       "1",
       "36. [[mod:m-pedido-intragrupo|Pedido intragrupo]]"
      ],
      [
       "Coordinador(a) de Recursos Humanos (proceso 17.4)",
       "1",
       "72. [[mod:m-repositorio-de-fichas-del-colaborador|Repositorio de fichas del colaborador]]"
      ],
      [
       "Coordinador(a) de Tesorería / Cobranzas (Cobranza)",
       "1",
       "5. [[mod:m-cartera-y-cobranza|Cartera y cobranza]]"
      ],
      [
       "Coordinador(a) de Tesorería / Cobranzas (Crédito)",
       "1",
       "39. [[mod:m-credito-de-clientes|Crédito de clientes]]"
      ],
      [
       "Coordinador(a) de Tesorería / Cobranzas (Cuentas por Pagar)",
       "1",
       "50. [[mod:m-pagos-a-proveedores-por-lote|Pagos a proveedores por lote]]"
      ],
      [
       "Coordinador(a) de Tesorería / Cobranzas, bajo el Gerente de Tesorería",
       "1",
       "10. [[mod:m-cuadre-entre-empresas|Cuadre entre empresas]]"
      ],
      [
       "Dirección de Tecnología, Gobernanza y Riesgo (en el manual, Gerente de Tecnología / Sistemas, que lleva el registro de herramientas)",
       "1",
       "54. Inventario y regularización de las islas de IA"
      ],
      [
       "Director Corporativo Comercial",
       "1",
       "29. [[mod:m-mesa-de-compra-cubitt|Mesa de compra Cubitt]]"
      ],
      [
       "Director(a) de Proyectos (PMO)",
       "1",
       "47. [[mod:m-bandeja-de-solicitudes|Bandeja de solicitudes]]"
      ],
      [
       "Equipo consultor del proyecto mientras dure el encargo; luego, Gobierno de IA",
       "1",
       "32. Asistente IA del conocimiento del proyecto"
      ],
      [
       "Gerente de E-commerce / Ventas Web (por país), de forma transitoria hasta que el proceso pase a Contabilidad / Tesorería",
       "1",
       "43. [[mod:m-validacion-de-pagos|Validación de pagos]]"
      ],
      [
       "Gerente de E-commerce / Ventas Web de Kenex USA (proceso 10.5)",
       "1",
       "65. [[mod:m-kenex-usa-y-marketplaces-de-ee-uu|Kenex USA y marketplaces de EE. UU.]]"
      ],
      [
       "Gerente de Marketing (país) (proceso 16.6)",
       "1",
       "56. [[mod:m-co-marketing|Co-marketing]]"
      ],
      [
       "Gerente de Operaciones y Logística",
       "1",
       "48. [[mod:m-reclamos-a-proveedor|Reclamos a proveedor]]"
      ],
      [
       "Gerente de Proyectos (PMO)",
       "1",
       "34. [[mod:m-lanzamientos-de-producto|Lanzamientos de producto]]"
      ],
      [
       "Gerente de Proyectos (PMO) para el proyecto, con el Gerente Regional Comercial / Retail para la decisión (proceso 9.8)",
       "1",
       "59. [[mod:m-expediente-de-apertura|Expediente de apertura]]"
      ],
      [
       "Gerente de Recursos Humanos (proceso 17.6)",
       "1",
       "45. [[mod:m-descripciones-y-estructura-de-cargos|Descripciones y estructura de cargos]]"
      ],
      [
       "Gerente de Recursos Humanos (proceso 17.7)",
       "1",
       "76. [[mod:m-desarrollo-y-carrera|Desarrollo y carrera]]"
      ],
      [
       "Gerente de Servicio Técnico (proceso 11.6)",
       "1",
       "77. [[mod:m-garantias-en-mercados-sin-operacion|Garantías en mercados sin operación]]"
      ],
      [
       "Gerente de Servicio Técnico (proceso 11.8)",
       "1",
       "60. [[mod:m-reembolsos-y-cambios-b2b|Reembolsos y cambios B2B]]"
      ],
      [
       "Gerente de Servicio Técnico, con alcance regional para Casio (proceso 11.5)",
       "1",
       "44. [[mod:m-repuestos-y-servicio-casio|Repuestos y servicio Casio]]"
      ],
      [
       "Gerente de Tienda / Supervisor de Ventas (proceso 9.6); el soporte lo presta Tecnología (14.5)",
       "1",
       "16. [[mod:m-mesa-de-ayuda-de-tiendas|Mesa de ayuda de tiendas]]"
      ],
      [
       "Gerente de Ventas al Detal (País); en Panamá, el Supervisor de Ventas (proceso 9.3)",
       "1",
       "19. [[mod:m-recepcion-en-tienda|Recepción en tienda]]"
      ],
      [
       "Gerente de Ventas al Detal (País); en Panamá, el Supervisor de Ventas (proceso 9.4)",
       "1",
       "27. [[mod:m-traslados-entre-tiendas|Traslados entre tiendas]]"
      ],
      [
       "Gerente Regional Comercial (Mayoreo)",
       "1",
       "63. [[mod:m-contactos-de-clientes|Contactos de clientes]]"
      ],
      [
       "Gerente Regional Comercial / Retail",
       "1",
       "23. [[mod:m-forecast-comercial|Forecast comercial]]"
      ],
      [
       "Gerente Regional Comercial / Retail (proceso 8.13)",
       "1",
       "58. [[mod:m-displays-y-mobiliario|Displays y mobiliario]]"
      ],
      [
       "Gerente Regional Comercial / Retail (proceso 9.2)",
       "1",
       "9. [[mod:m-torre-retail-y-cuadro-diario|Torre retail y cuadro diario]]"
      ],
      [
       "Gerente Regional de Visual Merchandising (proceso 16.7)",
       "1",
       "57. [[mod:m-piezas-y-etiquetas|Piezas y etiquetas]]"
      ],
      [
       "Gerentes Regionales / Gerentes Corporativos (proceso 1.2)",
       "1",
       "22. [[mod:m-tablero-de-direccion|Tablero de dirección]]"
      ],
      [
       "Gobierno de IA, unidad de la Presidencia (en el manual, Gerente de Tecnología / Sistemas del 5.1)",
       "1",
       "7. Uso asistencial con licencias corporativas de Claude"
      ],
      [
       "Líder de Administración / Importaciones",
       "1",
       "24. [[mod:m-expediente-de-importacion-en-destino|Expediente de importación en destino]]"
      ],
      [
       "Subgerente de Servicio Técnico (proceso 11.3)",
       "1",
       "40. [[mod:m-calidad-por-lote|Calidad por lote]]"
      ],
      [
       "Subgerente de Servicio Técnico (proceso 11.9)",
       "1",
       "51. [[mod:m-scrap-del-mes|Scrap del mes]]"
      ]
     ]
    }
   ]
  }
 ]
};
