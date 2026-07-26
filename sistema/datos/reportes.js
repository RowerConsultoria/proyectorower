/* ============================================================================
   EL SISTEMA — Lo que manda cada frente sin Odoo       · Fase 17 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   Cada frente reporta su venta en SU archivo, con SUS columnas y llamando a
   los productos como quiere: unos mandan el código pegado, otros la referencia
   del fabricante, otros el nombre en mayúsculas, otros un nombre comercial que
   no existe en ningún catálogo. Ese es el problema — el mismo producto con
   seis nombres distintos — y es lo que el portal resuelve.

   ⚠️ DATOS DE PROTOTIPO generados con semilla fija.
   ============================================================================ */

const REPORTES = {
 "CR": {
  "archivo": "VENTAS_MES.xlsx",
  "filas": [
   {
    "nombre": "KXREL1084",
    "cant": 75,
    "sku": "KX-REL-1084",
    "resuelto": true
   },
   {
    "nombre": "KXMUS1035",
    "cant": 80,
    "sku": "KX-MUS-1035",
    "resuelto": true
   },
   {
    "nombre": "CTVIVA21",
    "cant": 67,
    "sku": "CT-VIVA2-1",
    "resuelto": true
   },
   {
    "nombre": "CTVIVAP21",
    "cant": 84,
    "sku": "CT-VIVAP2-1",
    "resuelto": true
   },
   {
    "nombre": "CTDUF1",
    "cant": 49,
    "sku": "CTDUF-1",
    "resuelto": true
   },
   {
    "nombre": "KXREL1077",
    "cant": 39,
    "sku": "KX-REL-1077",
    "resuelto": true
   },
   {
    "nombre": "KXREL1035",
    "cant": 135,
    "sku": "KX-REL-1035",
    "resuelto": true
   },
   {
    "nombre": "KXMUS1014 2024",
    "cant": 34,
    "sku": null,
    "resuelto": false,
    "candidatas": [
     "KX-MUS-1007",
     "KX-REL-1077",
     "KX-REL-1126"
    ]
   },
   {
    "nombre": "CTPWOE1",
    "cant": 77,
    "sku": "CT-PWOE1",
    "resuelto": true
   },
   {
    "nombre": "KXREL1049",
    "cant": 111,
    "sku": "KX-REL-1049",
    "resuelto": true
   },
   {
    "nombre": "KXREL1105 NEGRO",
    "cant": 36,
    "sku": null,
    "resuelto": false,
    "candidatas": [
     "KX-CAL-1021",
     "KX-CAL-1028",
     "KX-MUS-1049"
    ]
   }
  ],
  "periodo": "julio 2026",
  "recibido": "hoy 07:14"
 },
 "GT": {
  "archivo": "reporte_ix.xlsx",
  "filas": [
   {
    "nombre": "CT-VIVA2-1",
    "cant": 72,
    "sku": "CT-VIVA2-1",
    "resuelto": true
   },
   {
    "nombre": "DW-6900SK-1",
    "cant": 19,
    "sku": "KX-REL-1098",
    "resuelto": true
   },
   {
    "nombre": "CT-PWANCL1",
    "cant": 78,
    "sku": "CT-PWANCL1",
    "resuelto": true
   },
   {
    "nombre": "PROMO MIX 27",
    "cant": 6,
    "sku": null,
    "resuelto": false,
    "candidatas": [
     "CTHR-1",
     "KX-REL-1056",
     "CTBPK-1"
    ]
   },
   {
    "nombre": "GM-5600-1",
    "cant": 116,
    "sku": "KX-REL-1119",
    "resuelto": true
   },
   {
    "nombre": "CT-S400",
    "cant": 67,
    "sku": "KX-MUS-1021",
    "resuelto": true
   },
   {
    "nombre": "CT-PWANC1",
    "cant": 50,
    "sku": "CT-PWANC1",
    "resuelto": true
   },
   {
    "nombre": "GA-B2100DF-1A",
    "cant": 102,
    "sku": "KX-REL-1021",
    "resuelto": true
   },
   {
    "nombre": "GA-110RRB-4A",
    "cant": 99,
    "sku": "KX-REL-1049",
    "resuelto": true
   },
   {
    "nombre": "CT-4UR42-1",
    "cant": 18,
    "sku": null,
    "resuelto": false,
    "candidatas": [
     "CTHR-1",
     "KX-REL-1049",
     "KX-MUS-1056"
    ]
   },
   {
    "nombre": "PX-S1100BK",
    "cant": 79,
    "sku": "KX-MUS-1049",
    "resuelto": true
   }
  ],
  "periodo": "julio 2026",
  "recibido": "hoy 07:14"
 },
 "HN": {
  "archivo": "sellout hn.xls",
  "filas": [
   {
    "nombre": "TECLAD TECLAS",
    "cant": 18,
    "sku": "KX-MUS-1007",
    "resuelto": true
   },
   {
    "nombre": "VIVA 2",
    "cant": 138,
    "sku": "CT-VIVAP2-1",
    "resuelto": true
   },
   {
    "nombre": "TRAVEL MUG",
    "cant": 17,
    "sku": "CT-MUG1-N",
    "resuelto": true
   },
   {
    "nombre": "POWER PRO",
    "cant": 113,
    "sku": "CT-PWEP1",
    "resuelto": true
   },
   {
    "nombre": "CUBITT MUG",
    "cant": 30,
    "sku": "CT-COF1",
    "resuelto": true
   },
   {
    "nombre": "G-SHOC ORIGEN",
    "cant": 46,
    "sku": "KX-REL-1042",
    "resuelto": true
   },
   {
    "nombre": "BABY-G ANALÓGIC",
    "cant": 7,
    "sku": "KX-REL-1147",
    "resuelto": true
   },
   {
    "nombre": "TECLAD ESTUDIAN",
    "cant": 47,
    "sku": "KX-MUS-1021",
    "resuelto": true
   },
   {
    "nombre": "TECLAD TECLAS",
    "cant": 106,
    "sku": "KX-MUS-1056",
    "resuelto": true
   },
   {
    "nombre": "PROMO MIX 68",
    "cant": 21,
    "sku": null,
    "resuelto": false,
    "candidatas": [
     "KX-REL-1091",
     "KX-REL-1070",
     "KX-REL-1028"
    ]
   },
   {
    "nombre": "HYDRO OZ",
    "cant": 9,
    "sku": "CTHB24-1",
    "resuelto": true
   }
  ],
  "periodo": "julio 2026",
  "recibido": "hoy 07:14"
 },
 "SV": {
  "archivo": "INVENTARIO Y VENTAS.xlsx",
  "filas": [
   {
    "nombre": "G-SHOCK CASIOAK METAL",
    "cant": 97,
    "sku": "KX-REL-1112",
    "resuelto": true
   },
   {
    "nombre": "CALCULADORA FINANCIERA",
    "cant": 51,
    "sku": "KX-CAL-1028",
    "resuelto": true
   },
   {
    "nombre": "HYDRO BOTTLE 24 OZ",
    "cant": 45,
    "sku": "CTHB24-1",
    "resuelto": true
   },
   {
    "nombre": "G-SHOCK ESTÁNDAR ANALÓGICO-DIGITAL",
    "cant": 74,
    "sku": "KX-REL-1056",
    "resuelto": true
   },
   {
    "nombre": "TECLADO TECLAS ILUMINADAS V2",
    "cant": 18,
    "sku": null,
    "resuelto": false,
    "candidatas": [
     "KX-REL-1007",
     "KX-CAL-1035",
     "KX-REL-1112"
    ]
   },
   {
    "nombre": "BABY-G ESTÁNDAR DIGITAL",
    "cant": 43,
    "sku": "KX-REL-1154",
    "resuelto": true
   },
   {
    "nombre": "BABY-G G-SQUAD",
    "cant": 98,
    "sku": "KX-REL-1140",
    "resuelto": true
   },
   {
    "nombre": "BACKPACK",
    "cant": 31,
    "sku": "CTBPK-1",
    "resuelto": true
   },
   {
    "nombre": "G-SHOCK G-SQUAD RESINA",
    "cant": 131,
    "sku": "KX-REL-1014",
    "resuelto": true
   },
   {
    "nombre": "CLÁSIC0 C4B4LLER0 CUER0",
    "cant": 19,
    "sku": null,
    "resuelto": false,
    "candidatas": [
     "CT-PWOE1",
     "KX-REL-1014",
     "KX-CAL-1007"
    ]
   },
   {
    "nombre": "TECLADO CASIOTONE ESTUDIANTE",
    "cant": 21,
    "sku": "KX-MUS-1021",
    "resuelto": true
   },
   {
    "nombre": "HERO GEN 4",
    "cant": 86,
    "sku": "CTHR-1",
    "resuelto": true
   },
   {
    "nombre": "G-SHOCK ANILLO ROJO",
    "cant": 138,
    "sku": "KX-REL-1070",
    "resuelto": true
   }
  ],
  "periodo": "julio 2026",
  "recibido": "hoy 07:14"
 },
 "EC": {
  "archivo": "ventas_ec.csv",
  "filas": [
   {
    "nombre": "kx-mus-1021",
    "cant": 82,
    "sku": "KX-MUS-1021",
    "resuelto": true
   },
   {
    "nombre": "kx-rel-1189",
    "cant": 67,
    "sku": "KX-REL-1189",
    "resuelto": true
   },
   {
    "nombre": "kx-rel-1070",
    "cant": 140,
    "sku": "KX-REL-1070",
    "resuelto": true
   },
   {
    "nombre": "VARIOS 88",
    "cant": 24,
    "sku": null,
    "resuelto": false,
    "candidatas": [
     "KX-CAL-1021",
     "KX-REL-1189",
     "CT-PWOE1"
    ]
   },
   {
    "nombre": "kx-mus-1035",
    "cant": 53,
    "sku": "KX-MUS-1035",
    "resuelto": true
   },
   {
    "nombre": "ct-vivap2-1",
    "cant": 37,
    "sku": "CT-VIVAP2-1",
    "resuelto": true
   },
   {
    "nombre": "kx-rel-1007",
    "cant": 65,
    "sku": "KX-REL-1007",
    "resuelto": true
   },
   {
    "nombre": "kx-rel-1042",
    "cant": 97,
    "sku": "KX-REL-1042",
    "resuelto": true
   },
   {
    "nombre": "ct-cof1",
    "cant": 28,
    "sku": "CT-COF1",
    "resuelto": true
   },
   {
    "nombre": "kx-rel-1077",
    "cant": 118,
    "sku": "KX-REL-1077",
    "resuelto": true
   }
  ],
  "periodo": "julio 2026",
  "recibido": "hoy 07:14"
 },
 "DO": {
  "archivo": "Reporte Mensual.xlsx",
  "filas": [
   {
    "nombre": "G-Shock Estándar analógico-digital",
    "cant": 112,
    "sku": "KX-REL-1049",
    "resuelto": true
   },
   {
    "nombre": "G-Shock Estándar digital",
    "cant": 39,
    "sku": null,
    "resuelto": false,
    "candidatas": [
     "KX-REL-1168",
     "CT-VIVA2-1",
     "KX-MUS-1035"
    ]
   },
   {
    "nombre": "G-Shock Origen",
    "cant": 37,
    "sku": "KX-REL-1042",
    "resuelto": true
   },
   {
    "nombre": "Power 0pen-Ear Earbuds",
    "cant": 30,
    "sku": null,
    "resuelto": false,
    "candidatas": [
     "KX-REL-1091",
     "CT-CAPRUN-1",
     "KX-REL-1049"
    ]
   },
   {
    "nombre": "G-Shock Estándar digital solar",
    "cant": 109,
    "sku": "KX-REL-1084",
    "resuelto": true
   },
   {
    "nombre": "G-Shock G-Squad resina",
    "cant": 100,
    "sku": "KX-REL-1014",
    "resuelto": true
   },
   {
    "nombre": "VIVA Pro 2",
    "cant": 62,
    "sku": "CT-VIVAP2-1",
    "resuelto": true
   },
   {
    "nombre": "Calculadora científica ClassWiz",
    "cant": 57,
    "sku": "KX-CAL-1021",
    "resuelto": true
   },
   {
    "nombre": "Power Earbuds Pro",
    "cant": 116,
    "sku": "CT-PWEP1",
    "resuelto": true
   },
   {
    "nombre": "TERRA",
    "cant": 103,
    "sku": "CT-TERRA1",
    "resuelto": true
   },
   {
    "nombre": "Edifice cronógrafo acero",
    "cant": 15,
    "sku": "KX-REL-1161",
    "resuelto": true
   }
  ],
  "periodo": "julio 2026",
  "recibido": "hoy 07:14"
 },
 "US": {
  "archivo": "shopify_export.csv",
  "filas": [
   {
    "nombre": "KX-REL-1119",
    "cant": 134,
    "sku": "KX-REL-1119",
    "resuelto": true
   },
   {
    "nombre": "CT-AURAP2-1",
    "cant": 63,
    "sku": "CT-AURAP2-1",
    "resuelto": true
   },
   {
    "nombre": "CT-CAPRUN-1",
    "cant": 19,
    "sku": "CT-CAPRUN-1",
    "resuelto": true
   },
   {
    "nombre": "KX-REL-1049",
    "cant": 76,
    "sku": "KX-REL-1049",
    "resuelto": true
   },
   {
    "nombre": "SIN CODIGO 91",
    "cant": 12,
    "sku": null,
    "resuelto": false,
    "candidatas": [
     "KX-REL-1189",
     "CTHR-1",
     "KX-REL-1126"
    ]
   },
   {
    "nombre": "KX-REL-1098",
    "cant": 140,
    "sku": "KX-REL-1098",
    "resuelto": true
   },
   {
    "nombre": "CT-PWOE1",
    "cant": 58,
    "sku": "CT-PWOE1",
    "resuelto": true
   },
   {
    "nombre": "KX-MUS-1007",
    "cant": 40,
    "sku": "KX-MUS-1007",
    "resuelto": true
   },
   {
    "nombre": "CT-VIVAP2-1",
    "cant": 57,
    "sku": "CT-VIVAP2-1",
    "resuelto": true
   },
   {
    "nombre": "KX-CAL-1014",
    "cant": 64,
    "sku": "KX-CAL-1014",
    "resuelto": true
   },
   {
    "nombre": "KX-REL-1014",
    "cant": 60,
    "sku": "KX-REL-1014",
    "resuelto": true
   }
  ],
  "periodo": "julio 2026",
  "recibido": "hoy 07:14"
 }
};
