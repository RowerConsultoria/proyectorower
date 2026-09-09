// Mapa interactivo de «Fase 2 — Procesos»: posiciones y flujos entre macroprocesos.
//
// Las CAJAS (20 macroprocesos) salen de manual-procesos-datos.js. Este archivo
// añade lo que ese dato no trae: dónde va cada caja en el lienzo y las flechas
// entre ellas.
//
// Opción (c) acordada: la TRONCAL de la cadena de valor se fija aquí a mano
// desde ya; los CRUCES son preliminares y se completan/depuran con la sección
// «Interfaces con otros macroprocesos» (§2.5) de cada manual cuando el pipeline
// la llene. Editar el mapa = editar SOLO este archivo.

window.MAPA_FASE2_FLUJOS = {
  lienzo: { w: 3280, h: 1520 },

  bandas: [
    { id: "estrategico", et: "Procesos estratégicos — orientan el rumbo",        x: 360,  y: 62 },
    { id: "operativo",   et: "Cadena de valor — producen y entregan",            x: 300,  y: 360 },
    { id: "soporte",     et: "Procesos de soporte — sostienen la operación",     x: 160,  y: 1096 }
  ],

  // clave = prefijo del macroproceso (1..20). corto = rótulo para la caja.
  nodos: {
    "1":  { x: 360,  y: 120,  corto: "Dirección y Gobierno" },
    "2":  { x: 830,  y: 120,  corto: "Planeación Comercial" },
    "3":  { x: 1300, y: 120,  corto: "R&D y Producto (Cubitt)" },
    "4":  { x: 1770, y: 120,  corto: "Gobierno de Portafolio (PMO)" },
    "5":  { x: 2240, y: 120,  corto: "Adopción de IA" },

    "6":  { x: 300,  y: 650,  corto: "Compras y Abastecimiento" },
    "7":  { x: 780,  y: 650,  corto: "Logística y Operaciones" },
    "8":  { x: 1260, y: 430,  corto: "Ventas Mayor" },
    "9":  { x: 1260, y: 650,  corto: "Ventas Retail" },
    "10": { x: 1260, y: 870,  corto: "Ventas Web (E-Commerce)" },
    "11": { x: 1740, y: 650,  corto: "Postventa y Experiencia" },

    "12": { x: 160,  y: 1150, corto: "Contabilidad" },
    "13": { x: 505,  y: 1150, corto: "Administración y Finanzas" },
    "14": { x: 850,  y: 1150, corto: "Tecnología (TI)" },
    "15": { x: 1195, y: 1150, corto: "Datos e Inteligencia" },
    "16": { x: 1540, y: 1150, corto: "Mercadeo y Comunicaciones" },
    "17": { x: 1885, y: 1150, corto: "Talento Humano" },
    "18": { x: 2230, y: 1150, corto: "Legal y Cumplimiento" },
    "19": { x: 2575, y: 1150, corto: "Servicios Generales" },
    "20": { x: 2920, y: 1150, corto: "Procesos y Mejora Continua" }
  },

  externos: [
    { id: "casio",    n: "Casio (casa matriz)", x: 40,   y: 430 },
    { id: "fabricas", n: "Fábricas y ODM",      x: 40,   y: 810 },
    { id: "clientes", n: "Canales y clientes",  x: 2080, y: 650 }
  ],

  // troncal de la cadena de valor (línea «metro»)
  troncal: [
    ["6", "7"], ["7", "8"], ["7", "9"], ["7", "10"],
    ["8", "11"], ["9", "11"], ["10", "11"], ["11", "clientes"]
  ],

  // entradas desde actores externos
  entrada: [
    ["casio", "6", "Cupos y catálogo Casio"],
    ["fabricas", "6", "OC de producto propio Cubitt"]
  ],

  // cruces preliminares (se depuran con §2.5 de cada manual)
  cruces: [
    ["2", "6", "Plan de demanda → compras"],
    ["15", "2", "Forecast y analítica → planeación"],
    ["3", "2", "Roadmap de producto Cubitt"],
    ["1", "2", "Lineamientos del plan estratégico"],
    ["12", "1", "Reportería consolidada → Junta"],
    ["13", "6", "Pago a proveedores"],
    ["14", "7", "Odoo / WMS sostienen la operación"],
    ["4", "14", "PMO: proyectos de sistemas"],
    ["16", "10", "Campañas → comercial digital"],
    ["17", "11", "Universidad Cubitt (cliente + talento)"],
    ["18", "7", "Aduana y permisología"],
    ["5", "15", "Casos de IA sobre el dato certificado"]
  ]
};
