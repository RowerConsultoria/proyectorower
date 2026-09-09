// Fuente única del módulo «Fase 2 — Procesos» del aplicativo.
// GENERADO por scripts/generar-armazon-fase2.py desde el mapa v18 — NO editar a mano.
// El árbol (20 macroprocesos / 182 procesos) y la ficha de cada proceso vienen
// del mapa validado; el contenido de las secciones lo llena el pipeline de manuales.
window.MANUAL_FASE2 = {
 "meta": {
  "version": "v18",
  "generado": "2026-09-09",
  "fuenteMapa": "Mapa de Procesos Actualizado v18 — validado por el equipo consultor",
  "niveles": "N0 (macroprocesos) y N1 (procesos). Sin N2: los procedimientos quedaron fuera del alcance de la Fase 2.",
  "totales": {
   "macroprocesos": 20,
   "procesos": 182,
   "categoria": {
    "estrategico": {
     "m": 5,
     "p": 32
    },
    "operativo": {
     "m": 6,
     "p": 80
    },
    "soporte": {
     "m": 9,
     "p": 70
    }
   },
   "madurez": {
    "híbrido": 90,
    "to-be": 35,
    "as-is": 57
   }
  }
 },
 "categorias": [
  {
   "id": "estrategico",
   "n": "Estratégicos",
   "g": "Definen el rumbo: qué vender, dónde crecer y cómo se gobierna el grupo."
  },
  {
   "id": "operativo",
   "n": "Operativos",
   "g": "La cadena de valor de punta a punta: comprar, mover, vender y atender al cliente."
  },
  {
   "id": "soporte",
   "n": "Soporte",
   "g": "Habilitan la operación: finanzas, tecnología, datos, personas y cumplimiento."
  }
 ],
 "actoresExternos": [
  {
   "n": "Casio (casa matriz, Japón)",
   "r": "Marca representada: catálogo, cupos de compra y lineamientos de marca."
  },
  {
   "n": "Fábricas y ODM (Asia)",
   "r": "Manufactura del producto propio Cubitt y de accesorios."
  },
  {
   "n": "Operadores logísticos y aduanas",
   "r": "Transporte internacional, nacionalización y permisología por país."
  },
  {
   "n": "Socios y terceros de canal",
   "r": "Importbel (Costa Rica) como socio; franquicias, mayoristas y retail de terceros."
  },
  {
   "n": "Clientes finales",
   "r": "Consumidor de los canales mayoreo, retail y e-commerce."
  },
  {
   "n": "Entes reguladores y banca",
   "r": "Marcos tributario, aduanal y cambiario; sistema financiero por país."
  }
 ],
 "seccionesN0": [
  {
   "id": "introduccion",
   "n": "Introducción",
   "sub": [
    "Propósito del manual",
    "Alcance",
    "Audiencia"
   ]
  },
  {
   "id": "contexto",
   "n": "Contexto del macroproceso",
   "sub": [
    "Ubicación en el mapa de procesos",
    "Dueños y responsabilidades",
    "Entidades y países involucrados",
    "Sistemas utilizados",
    "Interfaces con otros macroprocesos"
   ]
  },
  {
   "id": "gobernanza",
   "n": "Gobernanza y responsabilidades",
   "sub": [
    "Actores y límites de autoridad",
    "Comités e instancias de decisión"
   ]
  },
  {
   "id": "marco",
   "n": "Marco de referencia",
   "sub": [
    "Principios rectores",
    "Políticas aplicables",
    "Marco normativo"
   ]
  },
  {
   "id": "procesos",
   "n": "Procesos del macroproceso",
   "indice": true,
   "sub": []
  },
  {
   "id": "agenda",
   "n": "Agenda de mejora y brechas",
   "sub": [
    "Procesos por implementar",
    "Procesos por formalizar o consolidar",
    "Brechas por atender en procesos vigentes"
   ]
  },
  {
   "id": "anexos",
   "n": "Anexos",
   "sub": [
    "Glosario del macroproceso",
    "Matriz RACI consolidada",
    "Catálogo de sistemas y herramientas",
    "Interfaces con otros macroprocesos (detalle)",
    "Catálogo de documentación de Lark",
    "Variaciones operativas por país"
   ]
  }
 ],
 "seccionesN1": [
  {
   "id": "proposito",
   "n": "Propósito y alcance",
   "semilla": "alcance"
  },
  {
   "id": "dueno",
   "n": "Dueño y participantes",
   "semilla": "dueno"
  },
  {
   "id": "disparador",
   "n": "Disparador, cadencia y output",
   "semilla": "disparador"
  },
  {
   "id": "flujo",
   "n": "Flujo de actividades",
   "nota": "Descripción numerada de las actividades y su flujograma (BPMN)."
  },
  {
   "id": "riesgos",
   "n": "Matriz de riesgos"
  },
  {
   "id": "indicadores",
   "n": "Indicadores propuestos"
  }
 ],
 "macros": [
  {
   "prefijo": "1",
   "cat": "estrategico",
   "n": "Dirección y Gobierno Corporativo",
   "n0": {
    "introduccion": {
     "estado": "pendiente"
    },
    "contexto": {
     "estado": "pendiente"
    },
    "gobernanza": {
     "estado": "pendiente"
    },
    "marco": {
     "estado": "pendiente"
    },
    "agenda": {
     "estado": "pendiente"
    },
    "anexos": {
     "estado": "pendiente"
    }
   },
   "procesos": [
    {
     "codigo": "1.1",
     "n": "Formulación y revisión del plan estratégico del grupo",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Sesión anual de formulación estratégica de los accionistas con moderación de un director externo, definición del horizonte a tres años por marca y por país, redacción y aprobación del plan, y revisiones formales de avance durante el año.",
      "dueno": "Country Manager",
      "participantes": [
       "Accionistas y Directores de la familia",
       "Director(a) Externo(a) de Junta Directiva (moderación y redacción)",
       "Planificador Financiero",
       "Junta Directiva como órgano aprobador (responsabilidad colegiada)"
      ],
      "cadencia": "Anual (primera quincena del año); revisión formal de avance semestral como deber ser",
      "disparador": "Inicio del ciclo anual del grupo; cambio relevante del entorno o del portafolio de marcas",
      "output": "Plan estratégico a tres años aprobado, documentado y comunicado a la primera línea gerencial",
      "fuentes": "E-01 Bernardo Roizental F1 (2026-06-16) — líneas 35-37, 52-58, 61-63; E-20 Máximo Dolman F1 (2026-07-07) — líneas 4, 29-31; E-12 Carmela Iribarren F1 (2026-07-09) — línea 111; E-26 Presentación Junta Directiva (2026-07-27) — línea 129"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "1.2",
     "n": "Despliegue de objetivos e indicadores de gestión del grupo",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Traducción del plan estratégico en un cuadro de indicadores de la Junta Directiva, cascadeo hacia las gerencias regionales y de país, homologación del set de indicadores entre funciones que hoy no miden, y revisión periódica del avance frente a presupuesto y forecast.",
      "dueno": "Country Manager (con el Planificador Financiero como responsable de la consolidación)",
      "participantes": [
       "Junta Directiva",
       "Planificador Financiero",
       "Gerentes regionales por función",
       "Asistente Administrativo(a) / Servicios Generales (consolidación y seguimiento)",
       "Director(a) Externo(a) de Junta Directiva"
      ],
      "cadencia": "Anual (definición del set); mensual (revisión de presupuesto y forecast)",
      "disparador": "Aprobación del plan estratégico y del presupuesto del ejercicio",
      "output": "Cuadro de indicadores vigente por nivel, con metas asignadas y revisión mensual documentada",
      "fuentes": "E-01 F1 (2026-06-16) — líneas 109-124; E-12 F1 (2026-07-09) — línea 111; E-20 F1 (2026-07-07) — línea 155; E-23 Alberto Bassan F1 (2026-07-09) — línea 36"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "1.3",
     "n": "Preparación y conducción de las sesiones de los órganos de gobierno",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Ciclo de las sesiones de la Junta Directiva, del Comité Directivo y de los comités especializados: convocatoria y reserva del espacio en las tres zonas horarias, construcción de la agenda priorizada en formato de una página, circulación previa con los soportes, conducción de la sesión y captura de las decisiones tomadas.",
      "dueno": "Country Manager",
      "participantes": [
       "Asistente Administrativo(a) / Servicios Generales (secretaría del órgano)",
       "Directores de la familia",
       "Director(a) Externo(a) de Junta Directiva",
       "Planificador Financiero",
       "Asesor(a) Externo de Finanzas y Auditoría",
       "gerentes invitados por punto de agenda"
      ],
      "cadencia": "Junta Directiva mensual como deber ser; Comité Directivo quincenal; Comité de Finanzas quincenal; comités funcionales mensuales",
      "disparador": "Llegada de la fecha del calendario del órgano, o punto que requiere decisión colegiada elevado por un director o un gerente",
      "output": "Sesión celebrada con agenda cumplida y decisiones registradas con su responsable",
      "fuentes": "E-01 F1 (2026-06-16) — líneas 126-180; E-12 F1 (2026-07-09) — líneas 57, 63, 65, 71, 75-77; E-20 F1 (2026-07-07) — líneas 65-67, 88; E-23 F1 (2026-07-09) — líneas 33-36; E-26 (2026-07-27) — línea 134"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "1.4",
     "n": "Registro, seguimiento y cierre de los acuerdos de gobierno",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Documentación de la decisión tomada en cualquier instancia de gobierno —incluidas las que se toman fuera de sesión—, asignación de responsable y nivel de urgencia, comunicación de las conclusiones a los participantes, seguimiento periódico del avance y cierre formal del acuerdo o su reescalamiento al órgano.",
      "dueno": "Asistente Administrativo(a) / Servicios Generales",
      "participantes": [
       "Country Manager",
       "Directores de la familia (dueños de acuerdo)",
       "Gerente de Proyectoss (PMO) para los acuerdos que derivan en proyecto",
       "Director(a) Externo(a) de Junta Directiva",
       "gerentes responsables de la ejecución"
      ],
      "cadencia": "Continua; revisión concentrada al inicio y al cierre de semana, y antes de cada sesión del órgano",
      "disparador": "Decisión tomada en una sesión de gobierno o fuera de ella por el CEO o los directores",
      "output": "Acuerdo registrado con dueño y urgencia, seguido hasta su cierre o su reescalamiento documentado",
      "fuentes": "E-12 F1 (2026-07-09) — líneas 41, 52-59, 63, 73; E-20 F1 (2026-07-07) — líneas 29-31, 88, 152; E-01 F1 (2026-06-16) — líneas 139-140; E-26 (2026-07-27) — línea 133"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "1.5",
     "n": "Gobierno de la relación familia-empresa",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Mantenimiento y aplicación del protocolo familiar: reglas de relación entre la familia y la empresa, criterios de ingreso y permanencia de familiares consanguíneos y políticos, operación del consejo de familia y del consejo de accionistas, y celebración de la asamblea anual de accionistas con la rendición de resultados.",
      "dueno": "Junta Directiva (responsabilidad colegiada, presidida por el Country Manager)",
      "participantes": [
       "Director(a) Externo(a) de Junta Directiva (custodio y redactor del protocolo)",
       "Accionistas y miembros de la familia consanguíneos y políticos",
       "Asesor(a) Jurídico(a) Externo(a) del Grupo (revisión legal)",
       "Asistente Administrativo(a) / Servicios Generales (convocatoria y registro)"
      ],
      "cadencia": "Asamblea de accionistas anual; consejo de familia una o dos veces al año; revisión del protocolo por evento",
      "disparador": "Cierre del ejercicio anual, o evento familiar o societario previsto en el protocolo (ingreso, matrimonio, divorcio, retiro de un miembro)",
      "output": "Protocolo familiar vigente y firmado, con el consejo de familia constituido y la asamblea anual celebrada",
      "fuentes": "E-20 Máximo Dolman F1 (2026-07-07) — líneas 67-73, 101, 172; E-01 F1 (2026-06-16) — líneas 104-108, 130, 146-148"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "1.6",
     "n": "Planificación de la sucesión y del relevo de la línea directiva",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Identificación de las posiciones críticas del grupo y de sus sucesores potenciales, conversación estructurada de proyección de carrera con la tercera generación de la familia, evaluación del ajuste de los ocupantes actuales al perfil requerido, y decisión de nombramiento o relevo de la primera línea gerencial.",
      "dueno": "Junta Directiva (responsabilidad colegiada, presidida por el Country Manager)",
      "participantes": [
       "Director(a) Externo(a) de Junta Directiva (facilita el ejercicio)",
       "Country Manager",
       "Gerente de Recursos Humanos (rol corporativo aún no constituido)",
       "Directores de la familia",
       "ocupantes y candidatos de las posiciones críticas"
      ],
      "cadencia": "Anual (revisión del mapa de posiciones críticas); por evento (vacante o decisión de relevo)",
      "disparador": "Revisión anual del mapa de posiciones críticas, o detección de una brecha entre el ocupante y el perfil requerido",
      "output": "Mapa de posiciones críticas con sucesores identificados y plan de desarrollo acordado para cada uno",
      "fuentes": "E-20 Máximo Dolman F1 (2026-07-07) — líneas 162-176; E-01 F1 (2026-06-16) — líneas 200-213; E-12 F1 (2026-07-09) — línea 27"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "1.7",
     "n": "Diseño del modelo organizativo y de la línea rectora corporativa",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Definición de qué decisiones se rigen desde la capa corporativa y cuáles quedan en el país, constitución de la línea rectora por función, resolución de las funciones que hoy carecen de capa corporativa, y aprobación y mantenimiento del organigrama del grupo incluidas todas las entidades legales.",
      "dueno": "Country Manager",
      "participantes": [
       "Junta Directiva (aprueba)",
       "Gerentes regionales por función",
       "Gerente de Recursos Humanos y Coordinador(a) de Recursos Humanos (mantienen el organigrama)",
       "Director(a) Externo(a) de Junta Directiva",
       "Gerente de Proyectoss (PMO)"
      ],
      "cadencia": "Revisión anual; por evento (creación de una gerencia regional, incorporación de una entidad, cambio de reporte)",
      "disparador": "Decisión de crear o modificar una gerencia regional, incorporar una entidad al modelo de gestión, o brecha de reporte detectada",
      "output": "Modelo organizativo vigente con la línea rectora definida por función y el organigrama del grupo actualizado y aprobado",
      "fuentes": "E-01 F1 (2026-06-16) — líneas 182-196, 322-354; E-20 F1 (2026-07-07) — líneas 126-134; E-12 F1 (2026-07-09) — línea 129"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "1.8",
     "n": "Gobierno de socios, distribuidores y operaciones tercerizadas",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Gobierno de las unidades que no son de operación propia directa: sociedad al cincuenta por ciento en un país, operación tercerizada bajo marca en otro, distribuidores en mercados sin presencia, y la filial de Estados Unidos que opera con estructura y sistemas propios. Incluye la definición del formato y la periodicidad del reporte exigido, la alineación de políticas de marca y la revisión periódica de la relación.",
      "dueno": "Country Manager",
      "participantes": [
       "Junta Directiva",
       "Planificador Financiero (recepción y análisis del reporte)",
       "Gerente Regional Comercial / Retail",
       "socio, operador tercerizado o distribuidor (actores externos)",
       "Gerente Regional de Marketing"
      ],
      "cadencia": "Mensual (reporte financiero y comercial); anual (revisión de la relación y de los acuerdos)",
      "disparador": "Cierre del período con la recepción del reporte del socio u operador, o evento que afecte los términos de la relación",
      "output": "Reporte del socio u operador recibido en el formato estándar del grupo y relación revisada con acciones acordadas",
      "fuentes": "E-01 F1 (2026-06-16) — líneas 219-245, 302-322; E-20 F1 (2026-07-07) — líneas 22, 142-148; E-04 Arani González F1 (2026-06-18) — línea 26"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "1.9",
     "n": "Comunicación institucional interna y gestión de la cultura",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Definición y emisión del mensaje institucional del grupo hacia la organización, cascadeo a través de la primera línea gerencial, encuentros presenciales con el personal de todos los países, actualización y difusión de la identidad, misión, visión y valores del grupo, y gobierno de los canales internos de comunicación.",
      "dueno": "Country Manager",
      "participantes": [
       "Asistente Administrativo(a) / Servicios Generales (canaliza y da seguimiento)",
       "Gerente de Recursos Humanos y Coordinador(a) de Recursos Humanos",
       "Gerente Regional de Marketing",
       "gerentes de primera línea (responsables del cascadeo)",
       "Coordinador(a) de Sistemas (canales)"
      ],
      "cadencia": "Continua (canales); anual (encuentro con el personal y actualización de la identidad); por evento (comunicado institucional)",
      "disparador": "Decisión o hito institucional que debe conocer la organización; ciclo anual de encuentro con el personal",
      "output": "Mensaje institucional emitido y cascadeado con confirmación de alcance, e identidad del grupo vigente y publicada",
      "fuentes": "E-01 F1 (2026-06-16) — líneas 43, 52, 379-386; E-12 F1 (2026-07-09) — líneas 43, 111, 123-127, 131"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    }
   ]
  },
  {
   "prefijo": "2",
   "cat": "estrategico",
   "n": "Planeación Comercial",
   "n0": {
    "introduccion": {
     "estado": "pendiente"
    },
    "contexto": {
     "estado": "pendiente"
    },
    "gobernanza": {
     "estado": "pendiente"
    },
    "marco": {
     "estado": "pendiente"
    },
    "agenda": {
     "estado": "pendiente"
    },
    "anexos": {
     "estado": "pendiente"
    }
   },
   "procesos": [
    {
     "codigo": "2.1",
     "n": "Inteligencia de mercado y análisis competitivo",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Adquisición y explotación de data de sell-out de terceros por producto, mercado y punto de venta; análisis del ticket promedio y de la participación de la marca por categoría y país; benchmarking de precio y propuesta de la competencia; identificación de huecos de mercado y de tendencias de temporada que alimentan las decisiones de portafolio, precio y forecast.",
      "dueno": "Gerente Regional Comercial / Retail",
      "participantes": [
       "Especialista de Marketing / Brand (rol en constitución)",
       "Coordinador(a) Comercial",
       "Gerente Regional de Marketing",
       "Gerente Regional Comercial / Retail",
       "Especialista de Producto / Proyecto",
       "proveedor externo de data de sell-out (actor externo)"
      ],
      "cadencia": "Continua (monitoreo de mercado); revisión trimestral consolidada; anual para el ciclo de portafolio del año siguiente",
      "disparador": "Ciclo de planificación del portafolio del año siguiente, movimiento relevante de la competencia, o decisión de entrar en una categoría nueva",
      "output": "Informe de inteligencia de mercado con participación por categoría y país, precios de referencia de la competencia y oportunidades priorizadas",
      "fuentes": "E-60 Alejandro y Estefanía Roizental F2 (2026-08-20) — líneas 21, 24, 26, 40, 43-46; E-63 John Mordoch F2 (2026-08-24) — líneas 29, 39, 45"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "2.2",
     "n": "Construcción y aprobación del forecast comercial regional",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Elaboración del forecast anual de venta a partir de la base histórica y del crecimiento esperado por mercado, dilución mensual según el peso histórico de cada mes, desagregación por país, cliente y familia de producto, consolidación de los requerimientos que cada filial presenta para su propio mercado, y revisión trimestral del cumplimiento con reajuste del número.",
      "dueno": "Gerente Regional Comercial / Retail",
      "participantes": [
       "Coordinador(a) Comercial",
       "Gerente Regional Comercial / Retail",
       "Gerente Regional de Marketing",
       "Gerente Regional Comercial / Retail",
       "Gerente Comercial (País / Canal)",
       "Gerente Regional Comercial / Retail",
       "Gerente de E-commerce / Ventas Web",
       "Coordinador(a) de Logística y Bodega (receptor del forecast)"
      ],
      "cadencia": "Anual (construcción); trimestral (revisión de cumplimiento y reajuste)",
      "disparador": "Cierre del ciclo comercial anual e inicio de la planificación del año siguiente",
      "output": "Forecast regional aprobado, mensualizado y desagregado por país, cliente y familia, y transferido a Compras como insumo del plan de suministro",
      "fuentes": "E-63 F2 (2026-08-24) — líneas 135, 141, 145; E-60 F2 (2026-08-20) — líneas 24, 42; E-01 Bernardo Roizental F1 (2026-06-16) — líneas 116-118"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "2.3",
     "n": "Definición de la política de precios y de márgenes por mercado",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Determinación del precio de referencia por producto y mercado y de la estructura de márgenes: análisis del precio de la competencia en cada país, decisión entre precio regional homogéneo y precio ajustado a la competitividad local, definición de las listas de precio por tipología de cliente, y validación colegiada en el comité de estrategia.",
      "dueno": "Gerente Regional Comercial / Retail (responsabilidad colegiada con el comité de estrategia comercial)",
      "participantes": [
       "Gerente Regional Comercial / Retail",
       "Gerente Regional de Marketing",
       "Gerente Regional Comercial / Retail",
       "Coordinador(a) Comercial (análisis de margen y costo)",
       "Gerente Comercial (País / Canal)",
       "Planificador Financiero"
      ],
      "cadencia": "Revisión anual de la estructura de precios; por evento (lanzamiento, movimiento de la competencia, cambio de costo o de carga fiscal local)",
      "disparador": "Lanzamiento de un producto, movimiento de precio de un competidor relevante, o cambio en el costo o en la carga fiscal de un mercado",
      "output": "Lista de precios vigente por mercado y por tipología de cliente, con el margen objetivo aprobado por el comité",
      "fuentes": "E-63 F2 (2026-08-24) — líneas 29, 45-47, 39; E-60 F2 (2026-08-20) — línea 40"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "2.4",
     "n": "Planificación del portafolio comercial y depuración del surtido",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Decisión comercial sobre la composición del ecosistema de producto que se ofrece en cada mercado: qué referencias se incorporan, cuáles se refuerzan por su peso en el Pareto, cuáles se depuran por baja rotación, y con qué peso por color, modelo y variante se planifica cada familia para el ciclo siguiente.",
      "dueno": "Gerente Regional Comercial / Retail",
      "participantes": [
       "Gerente Regional de Marketing (decisión final sobre el producto)",
       "Coordinador(a) Comercial",
       "Especialista de Marketing / Brand",
       "Especialista de Producto / Proyecto",
       "Gerente Regional Comercial / Retail",
       "Gerente Comercial (País / Canal)"
      ],
      "cadencia": "Anual (definición del surtido del ciclo); trimestral (revisión de rotación y depuración)",
      "disparador": "Ciclo anual de definición del surtido, o detección de una referencia con rotación insuficiente o con desempeño excepcional",
      "output": "Surtido aprobado por mercado con el peso planificado por variante y la lista de referencias a depurar o reforzar",
      "fuentes": "E-63 F2 (2026-08-24) — líneas 39, 67, 137; E-60 F2 (2026-08-20) — líneas 24, 26, 43"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "2.5",
     "n": "Planificación del calendario promocional y de campañas comerciales",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Construcción del calendario comercial del año: temporadas fuertes, ventanas de descuento por cambio de línea, campañas de alto volumen con cadenas, lanzamientos de producto y activaciones conjuntas con los clientes ancla de cada mercado, con la reserva de inventario y el presupuesto de apoyo que cada acción requiere.",
      "dueno": "Gerente Regional Comercial / Retail",
      "participantes": [
       "Gerente Regional de Marketing",
       "Gerente Regional Comercial / Retail",
       "Gerente Regional Comercial / Retail",
       "Gerente de E-commerce / Ventas Web",
       "Coordinador(a) de Logística y Bodega (reserva de inventario)",
       "Gerente Comercial (País / Canal)",
       "cliente cadena (actor externo)"
      ],
      "cadencia": "Anual (construcción del calendario); revisión trimestral; por evento para las campañas puntuales",
      "disparador": "Inicio del ciclo anual, aproximación de una temporada fuerte, cambio de línea de producto, o campaña de lanzamiento de un cliente ancla",
      "output": "Calendario comercial aprobado con las acciones por mercado, el inventario reservado y el apoyo de marketing comprometido",
      "fuentes": "E-63 F2 (2026-08-24) — líneas 19, 95, 137; E-60 F2 (2026-08-20) — líneas 37-38"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "2.6",
     "n": "Asignación de inventario y planificación de la preventa por mercado",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Distribución del inventario planificado entre los mercados y canales según el forecast aprobado, reserva de stock adicional para los clientes clave y para las campañas, gestión de la preventa comprometida contra tránsito, definición del colchón de cobertura objetivo, y resolución de los conflictos de asignación cuando la demanda de un mercado excede su cuota.",
      "dueno": "Gerente Regional Comercial / Retail",
      "participantes": [
       "Coordinador(a) de Logística y Bodega",
       "Gerente Regional Comercial / Retail",
       "Gerente Comercial (País / Canal)",
       "Gerente Regional Comercial / Retail",
       "Coordinador(a) Comercial"
      ],
      "cadencia": "Mensual (asignación del ciclo); por evento (campaña, preventa comprometida o conflicto de asignación)",
      "disparador": "Confirmación del plan de suministro, compromiso de preventa con un cliente, o solicitud de un mercado que excede su cuota asignada",
      "output": "Asignación de inventario aprobada por mercado y canal, con la preventa registrada y el stock reservado para campañas y cuentas clave",
      "fuentes": "E-63 F2 (2026-08-24) — líneas 95, 135, 137, 145; E-60 F2 (2026-08-20) — líneas 36, 55"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "2.7",
     "n": "Consolidación del desempeño comercial regional y ajuste del plan",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Lectura periódica del desempeño consolidado de los tres canales y las dos marcas contra el plan: avance frente a meta anual y a meta a la fecha, proyección de cierre del mes, comparación interanual y semaforización por país, vendedor, cliente y familia de producto, con la decisión de ajuste del forecast, del surtido o del calendario que corresponda.",
      "dueno": "Gerente Regional Comercial / Retail",
      "participantes": [
       "Gerente Regional Comercial / Retail",
       "Coordinador(a) Comercial",
       "Analista de Sistemas / Datos",
       "Gerente Regional Comercial / Retail",
       "Gerente de E-commerce / Ventas Web",
       "Gerente Comercial (País / Canal)",
       "Junta Directiva (destinataria del reporte)"
      ],
      "cadencia": "Diaria (actualización del tablero); semanal (lectura con el equipo); mensual y trimestral (revisión de cumplimiento y ajuste del plan)",
      "disparador": "Cierre del día con la actualización del tablero; corte semanal, mensual o trimestral de revisión",
      "output": "Lectura consolidada del desempeño regional con la decisión de ajuste del forecast, del surtido o del calendario documentada",
      "fuentes": "E-63 F2 (2026-08-24) — líneas 67-69, 123, 141; E-18 Alexis Mujica F1 (2026-07-06) — líneas 55, 67-69; E-60 F2 (2026-08-20) — línea 42"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    }
   ]
  },
  {
   "prefijo": "3",
   "cat": "estrategico",
   "n": "R&D y Desarrollo de Producto (Cubitt)",
   "n0": {
    "introduccion": {
     "estado": "pendiente"
    },
    "contexto": {
     "estado": "pendiente"
    },
    "gobernanza": {
     "estado": "pendiente"
    },
    "marco": {
     "estado": "pendiente"
    },
    "agenda": {
     "estado": "pendiente"
    },
    "anexos": {
     "estado": "pendiente"
    }
   },
   "procesos": [
    {
     "codigo": "3.1",
     "n": "Generación y evaluación de oportunidades de producto",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Captación de la idea de producto desde sus tres fuentes —retroalimentación del equipo comercial en la calle, inteligencia de mercado y propuestas espontáneas de las fábricas—, evaluación preliminar de su encaje en el ecosistema de la marca y de su viabilidad técnica y comercial, y decisión colegiada de perseguirla, aplazarla o descartarla.",
      "dueno": "Gerente Regional de Marketing",
      "participantes": [
       "Especialista de Producto / Proyecto",
       "Gerente Regional Comercial / Retail",
       "Gerente Regional Comercial / Retail",
       "Especialista de Marketing / Brand (rol en constitución)",
       "Especialista de Producto / Proyecto",
       "fábricas proponentes (actores externos)"
      ],
      "cadencia": "Continua (captación); revisión concentrada en el ciclo anual de definición del portafolio",
      "disparador": "Idea propuesta por el equipo comercial, hallazgo de la inteligencia de mercado, o propuesta de producto recibida de una fábrica",
      "output": "Oportunidad evaluada con decisión documentada de desarrollar, aplazar o descartar, y brief inicial cuando procede",
      "fuentes": "E-60 Alejandro y Estefanía Roizental F2 (2026-08-20) — líneas 21, 24, 31-34, 39-40; E-63 John Mordoch F2 (2026-08-24) — línea 39; E-64 PA F2 (2026-08-24) — línea 19"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "3.2",
     "n": "Sourcing y homologación de fábricas de desarrollo",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Búsqueda, calificación y homologación de las fábricas que desarrollan y producen cada categoría de la marca propia —relojería de adulto y de niño, audio, básculas, termos y accesorios—, negociación de condiciones técnicas y comerciales, y sostenimiento de la relación operativa con el hub de sourcing en origen.",
      "dueno": "Gerente Regional de Marketing",
      "participantes": [
       "Gerente de Operaciones y Logística y Logística",
       "Especialista de Producto / Proyecto",
       "Gerente Regional Comercial / Retail",
       "Asesor(a) Jurídico(a) Externo(a) del Grupo (contratos con fábrica)",
       "fábricas (actores externos)"
      ],
      "cadencia": "Por evento (nueva categoría o necesidad técnica no cubierta); revisión anual de la cartera de fábricas",
      "disparador": "Necesidad de una capacidad técnica que ninguna fábrica actual cubre, o desempeño insuficiente de una fábrica homologada",
      "output": "Fábrica homologada y contratada con condiciones acordadas, incorporada a la cartera de desarrollo de la marca",
      "fuentes": "E-60 F2 (2026-08-20) — líneas 13-15, 21, 55; E-64 PA F2 (2026-08-24) — líneas 19, 123-125; E-01 Bernardo Roizental F1 (2026-06-16) — línea 302"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "3.3",
     "n": "Diseño y especificación del producto",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Traducción del brief en un producto especificado: diseño industrial propio o adaptación de la propuesta de la fábrica, definición de las especificaciones técnicas y de materiales, selección de colores y variantes con criterio de tendencia de temporada, y cierre del paquete de diseño que se envía a fábrica para muestra.",
      "dueno": "Gerente Regional de Marketing",
      "participantes": [
       "Diseñador(a) / Analista de Contenido",
       "Especialista de Producto / Proyecto",
       "Especialista de Producto / Proyecto",
       "Gerente de Operaciones y Logística y Logística",
       "Gerente Regional de Marketing (identidad de marca)",
       "fábrica (actor externo)"
      ],
      "cadencia": "Por producto; ciclo de tres meses o más entre el diseño cerrado y la salida al mercado",
      "disparador": "Oportunidad aprobada con brief inicial, o decisión de renovar una familia existente con nuevas variantes",
      "output": "Paquete de diseño y especificación cerrado y enviado a fábrica para producción de muestra",
      "fuentes": "E-60 F2 (2026-08-20) — líneas 21-24, 44; E-64 PA F2 (2026-08-24) — líneas 128-130"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "3.4",
     "n": "Gestión de muestras y aprobación del producto",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Ciclo de la muestra física: solicitud a fábrica, registro de la muestra esperada con fecha estimada, recepción y prueba técnica contra la lista de verificación del producto, circulación para retroalimentación del equipo, iteración con la fábrica hasta la corrección, aprobación final y disposición de la muestra descartada.",
      "dueno": "Especialista de Producto / Proyecto (aprobación final del Gerente Regional de Marketing)",
      "participantes": [
       "Gerente Regional de Marketing (decisión final)",
       "Especialista de Producto / Proyecto (registro y custodia)",
       "Diseñador(a) / Analista de Contenido",
       "Gerente de Operaciones y Logística y Logística",
       "equipo comercial de la casa matriz (retroalimentación)",
       "fábrica (actor externo)"
      ],
      "cadencia": "Por muestra; ciclos de iteración de semanas a meses según la categoría",
      "disparador": "Envío de una muestra por parte de la fábrica, o solicitud de una nueva muestra tras una corrección pedida",
      "output": "Muestra aprobada con especificación congelada para producción, o muestra rechazada con la corrección solicitada a la fábrica",
      "fuentes": "E-60 F2 (2026-08-20) — líneas 51-53, 56-59; E-64 PA F2 (2026-08-24) — línea 19"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "3.5",
     "n": "Desarrollo y evolución del software y de la aplicación de marca",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Definición y priorización de las funciones nuevas de la aplicación y del firmware de los dispositivos, coordinación del desarrollo con los programadores de la fábrica, pruebas de las versiones antes de su liberación, integración con aplicaciones de terceros del ecosistema deportivo, y gestión de la dependencia sobre el código fuente que hoy reside en el proveedor.",
      "dueno": "Gerente Regional de Marketing",
      "participantes": [
       "Especialista de Producto / Proyecto (pruebas y liberación)",
       "Subgerente de Servicio Técnico (reporte de fallas desde el campo)",
       "Gerente de Tecnología / Sistemas",
       "Junta Directiva (decisión de internalizar el desarrollo)",
       "fábrica de relojería de adulto y sus desarrolladores (actores externos)"
      ],
      "cadencia": "Continua (comunicación diaria con la fábrica de relojería de adulto); por versión para la liberación de funciones",
      "disparador": "Necesidad de una función nueva identificada por el mercado o por la marca, o falla de software reportada desde el campo",
      "output": "Versión de aplicación o firmware liberada y probada, con la función disponible para el usuario final",
      "fuentes": "E-64 PA F2 (2026-08-24) — líneas 128-130; E-20 Máximo Dolman F1 (2026-07-07) — líneas 8, 12-14; E-01 F1 (2026-06-16) — línea 361"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "3.6",
     "n": "Gestión de licencias de marca de terceros",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Ciclo de las colecciones bajo licencia de propiedad intelectual de terceros: selección de la licencia y de los personajes con base en el desempeño de las colecciones anteriores, propuesta de modelos y arte al licenciante, obtención de la aprobación, control de las condiciones de uso durante la producción, y tratamiento del producto que no obtiene aprobación.",
      "dueno": "Especialista de Producto / Proyecto",
      "participantes": [
       "Gerente Regional de Marketing",
       "Coordinador(a) Comercial (desempeño de colecciones previas)",
       "Diseñador(a) / Analista de Contenido",
       "Gerente Regional de Marketing",
       "Asesor(a) Jurídico(a) Externo(a) del Grupo",
       "licenciante (actor externo)"
      ],
      "cadencia": "Por colección; ciclos anuales de renovación de la licencia",
      "disparador": "Decisión de desarrollar una colección bajo licencia, o renovación del acuerdo con el licenciante",
      "output": "Colección aprobada por el licenciante y liberada para producción, con las condiciones de uso registradas",
      "fuentes": "E-60 Alejandro y Estefanía Roizental F2 (2026-08-20) — líneas 43, 58-59"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    }
   ]
  },
  {
   "prefijo": "4",
   "cat": "estrategico",
   "n": "Gobierno de Portafolio (PMO)",
   "n0": {
    "introduccion": {
     "estado": "pendiente"
    },
    "contexto": {
     "estado": "pendiente"
    },
    "gobernanza": {
     "estado": "pendiente"
    },
    "marco": {
     "estado": "pendiente"
    },
    "agenda": {
     "estado": "pendiente"
    },
    "anexos": {
     "estado": "pendiente"
    }
   },
   "procesos": [
    {
     "codigo": "4.1",
     "n": "Recepción, categorización y evaluación de solicitudes",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Entrada de la solicitud mediante el formulario de requerimiento de proyecto, que solo puede levantar un gerente de primera línea tras validar necesidad, presupuesto y tiempo con su equipo; evaluación de viabilidad en el comité interno de la oficina; categorización como proyecto, iniciativa o tarea según el número de departamentos involucrados y la existencia de entregables y fechas; y asignación del gestor o devolución al área.",
      "dueno": "Gerente de Proyectoss (PMO)",
      "participantes": [
       "Gerente de Proyectoss",
       "Gerente de Proyectoss",
       "gerentes de primera línea solicitantes",
       "Country Manager (solicitudes de origen directivo)"
      ],
      "cadencia": "Continua (recepción); evaluación en el comité interno semanal",
      "disparador": "Formulario de requerimiento de proyecto levantado por un gerente de primera línea, o encargo directo de la Junta Directiva",
      "output": "Solicitud categorizada como proyecto, iniciativa o tarea, con gestor asignado o devuelta al área con criterio explicado",
      "fuentes": "E-09 Ricardo Candanedo F1 (2026-06-23) — líneas 22, 26-34; E-04 Arani González F1 (2026-06-18) — línea 40"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "4.2",
     "n": "Planificación, ejecución y cierre de proyectos",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Ciclo completo del proyecto de categoría uno: elaboración del cronograma con entregables, responsables e hitos; asignación del código de proyecto y del presupuesto; ejecución con seguimiento de hitos, riesgos y desviaciones; puesta en marcha; y reunión de lecciones aprendidas al cierre, cuyas conclusiones se aplican al proyecto siguiente.",
      "dueno": "Gerente de Proyectoss (con supervisión del Gerente Regional de Proyectos)",
      "participantes": [
       "Gerente de Proyectoss (PMO)",
       "gerentes de las áreas involucradas",
       "Planificador Financiero (código y control de presupuesto)",
       "proveedores externos del proyecto",
       "Junta Directiva (invitada a las lecciones aprendidas)"
      ],
      "cadencia": "Por proyecto; seguimiento en el comité interno semanal y actualización del avance por el gestor",
      "disparador": "Solicitud categorizada como proyecto y con gestor asignado",
      "output": "Proyecto entregado y cerrado, con el acta de lecciones aprendidas registrada y disponible para el siguiente ciclo",
      "fuentes": "E-09 F1 (2026-06-23) — líneas 26, 36-44, 62; E-04 F1 (2026-06-18) — línea 40"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "4.3",
     "n": "Acompañamiento a iniciativas departamentales",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Modelo de consultoría interna para las solicitudes de categoría dos: la oficina reúne a los dos departamentos involucrados, levanta lo que cada uno necesita del otro, identifica los bloqueos que han impedido avanzar, entrega un plan inicial acordado y devuelve la ejecución y el reporte de resultados a los gerentes, sin acompañamiento continuo.",
      "dueno": "Gerente de Proyectoss",
      "participantes": [
       "Gerente de Proyectoss (PMO)",
       "gerentes de los dos departamentos involucrados (responsables de la ejecución y del resultado)"
      ],
      "cadencia": "Por iniciativa; el acompañamiento se concentra en la fase inicial y termina con la entrega del plan",
      "disparador": "Solicitud categorizada como iniciativa, con dos departamentos involucrados y sin entregables que justifiquen un proyecto",
      "output": "Plan inicial acordado y entregado a los gerentes, con responsabilidades y secuencia definidas y la ejecución devuelta al área",
      "fuentes": "E-04 Arani González F1 (2026-06-18) — línea 40; E-09 F1 (2026-06-23) — línea 26"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "4.4",
     "n": "Gestión de lanzamientos de producto",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Conducción del lanzamiento como proyecto transversal: categorización del lanzamiento según sea producto nuevo, mejora de un producto existente o variante, definición del alcance por país y de la simultaneidad requerida, cronograma con marketing, visual, comercial, logística y soporte técnico, ejecución de la puesta en mercado y seguimiento del calendario trimestral de lanzamientos.",
      "dueno": "Gerente de Proyectoss",
      "participantes": [
       "Gerente de Proyectoss (PMO)",
       "Gerente Regional de Marketing",
       "Especialista de Producto / Proyecto",
       "Gerente Regional de Marketing",
       "Gerente Regional de Visual Merchandising",
       "Gerente Regional Comercial / Retail",
       "Gerente Regional Comercial / Retail",
       "Subgerente de Servicio Técnico"
      ],
      "cadencia": "Por lanzamiento; seguimiento del calendario por trimestre",
      "disparador": "Producto aprobado para producción con fecha objetivo de salida al mercado",
      "output": "Producto lanzado en los mercados definidos con todos los departamentos habilitados, y desviación de fecha medida contra el plan",
      "fuentes": "E-09 F1 (2026-06-23) — líneas 12, 18, 56, 62; E-04 F1 (2026-06-18) — líneas 16, 18; E-60 F2 (2026-08-20) — línea 24"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "4.5",
     "n": "Seguimiento del portafolio y reportería a la Junta Directiva",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Mantenimiento del repositorio único del portafolio con el estado, progreso, hito de la semana, área responsable, tipo, prioridad y país de cada iniciativa; comité interno semanal de la oficina para revisar avances, cuellos de botella, riesgos y desviaciones de presupuesto o cronograma; y emisión automatizada del reporte ejecutivo semanal a la Junta Directiva.",
      "dueno": "Gerente de Proyectoss (PMO)",
      "participantes": [
       "Gerente de Proyectoss",
       "Gerente de Proyectoss",
       "Junta Directiva (destinataria del reporte)",
       "Country Manager (sesión de alineación quincenal)"
      ],
      "cadencia": "Semanal (comité interno de la oficina y emisión automática del reporte); quincenal (alineación con el CEO)",
      "disparador": "Corte semanal del portafolio; actualización de avance cargada por cada gestor",
      "output": "Reporte ejecutivo del portafolio emitido a la Junta con el estado y el progreso de cada proyecto y lanzamiento",
      "fuentes": "E-09 F1 (2026-06-23) — líneas 48, 54, 56, 58, 62, 66, 72, 118"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "4.6",
     "n": "Gestión de la demanda y de la capacidad del portafolio",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Control del volumen de entrada de solicitudes frente a la capacidad real de la oficina: medición de la carga por gestor, identificación del punto de saturación, decisión de suspender temporalmente la recepción de nuevas solicitudes, análisis de la serie histórica para distinguir el pico de la media, y sustentación de la necesidad de incorporar capacidad adicional.",
      "dueno": "Gerente de Proyectoss (PMO)",
      "participantes": [
       "Gerente de Proyectoss",
       "Gerente de Proyectoss",
       "Country Manager (aprueba la incorporación de capacidad)",
       "Gerente de Recursos Humanos"
      ],
      "cadencia": "Revisión mensual de carga; decisión de suspensión o de incorporación de capacidad por evento",
      "disparador": "Superación del umbral de proyectos simultáneos por gestor, o cierre de un lote de proyectos que libera capacidad",
      "output": "Decisión documentada sobre la recepción de nuevas solicitudes y sobre la capacidad de la oficina, con la carga por gestor medida",
      "fuentes": "E-09 F1 (2026-06-23) — líneas 20, 24, 114-116; E-04 F1 (2026-06-18) — línea 40"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "4.7",
     "n": "Gestión del presupuesto de proyecto",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Asignación de un código de proyecto enlazado con Finanzas y del presupuesto correspondiente, exigencia de cotizaciones múltiples antes de comprometer un gasto, seguimiento del consumo contra lo asignado durante la ejecución, y alerta y reescalamiento cuando el proyecto se desvía.",
      "dueno": "Gerente de Proyectoss (PMO)",
      "participantes": [
       "Planificador Financiero (asignación y control del código)",
       "Gerente de Proyectoss",
       "Gerente de Tesorería",
       "Junta Directiva (aprueba el presupuesto del proyecto)",
       "proveedores cotizantes (actores externos)"
      ],
      "cadencia": "Por proyecto; seguimiento del consumo en el comité interno semanal",
      "disparador": "Aprobación de un proyecto que requiere desembolso, o solicitud de compra o contratación asociada a un proyecto en curso",
      "output": "Presupuesto asignado con código de proyecto y consumo controlado contra lo aprobado, con las desviaciones reportadas",
      "fuentes": "E-09 Ricardo Candanedo F1 (2026-06-23) — líneas 127-130"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    }
   ]
  },
  {
   "prefijo": "5",
   "cat": "estrategico",
   "n": "Adopción de IA y Transformación Digital",
   "n0": {
    "introduccion": {
     "estado": "pendiente"
    },
    "contexto": {
     "estado": "pendiente"
    },
    "gobernanza": {
     "estado": "pendiente"
    },
    "marco": {
     "estado": "pendiente"
    },
    "agenda": {
     "estado": "pendiente"
    },
    "anexos": {
     "estado": "pendiente"
    }
   },
   "procesos": [
    {
     "codigo": "5.1",
     "n": "Gobierno de la adopción de inteligencia artificial y de la información del grupo",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Definición de la política de adopción de inteligencia artificial vinculada a los valores, la estrategia y el código de ética del grupo; criterios de asignación de licencias corporativas; lineamientos de tratamiento y seguridad de la información que se carga en herramientas externas; control de las credenciales privilegiadas usadas para conectar herramientas de IA a los sistemas; y nivelación de expectativas de la dirección sobre lo que la tecnología puede y no puede resolver.",
      "dueno": "Gerente de Tecnología / Sistemas (responsabilidad colegiada con la Junta Directiva)",
      "participantes": [
       "Country Manager",
       "Coordinador(a) de Sistemas",
       "Gerente de Proyectoss (PMO)",
       "Asistente Administrativo(a) / Servicios Generales (levantamiento de uso y necesidades)",
       "Asesor(a) Jurídico(a) Externo(a) del Grupo",
       "Planificador Financiero"
      ],
      "cadencia": "Continua (asignación y acompañamiento); revisión semestral de la política y del inventario de licencias y accesos",
      "disparador": "Solicitud de licencia o de acceso, detección de una herramienta conectada sin autorización, incidente de tratamiento de información, o revisión programada de la política",
      "output": "Política de adopción vigente, con el inventario de licencias y de accesos privilegiados actualizado y los lineamientos de tratamiento de información aplicados",
      "fuentes": "E-52 César Rivodo y Mariela Castro F2 (2026-08-18) — líneas 30, 34-36, 40-41; E-12 Carmela Iribarren F1 (2026-07-09) — líneas 105, 115-121; E-01 Bernardo Roizental F1 (2026-06-16) — líneas 61, 72"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "5.2",
     "n": "Identificación, priorización y aprobación de casos de uso de IA y automatización",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Captura de las iniciativas de automatización que hoy nacen de forma dispersa en cada área, mantenimiento del inventario de casos de uso activos y de las plataformas sobre las que corren, evaluación del valor y del riesgo de cada uno, decisión de si se construye internamente, con el partner o no se construye, y aprobación para pasar a desarrollo.",
      "dueno": "Gerente de Proyectoss (PMO)",
      "participantes": [
       "Gerente de Tecnología / Sistemas",
       "Coordinador(a) de Sistemas",
       "Analista de Sistemas / Datos",
       "gerentes de área proponentes",
       "Country Manager (aprueba las iniciativas de alcance regional)"
      ],
      "cadencia": "Continua (captura de iniciativas); revisión mensual del inventario y de la priorización",
      "disparador": "Iniciativa de automatización propuesta por un área, o detección de un desarrollo en curso que no está inventariado",
      "output": "Caso de uso inventariado, priorizado y aprobado o descartado, con la plataforma y el responsable de construcción definidos",
      "fuentes": "E-52 F2 (2026-08-18) — líneas 30, 34-36; E-09 Ricardo Candanedo F1 (2026-06-23) — líneas 22, 26; E-58 Patrick Corujo F2 (2026-08-19) — líneas 66, 72; E-64 PA F2 (2026-08-24) — líneas 58, 64"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "5.3",
     "n": "Formación y certificación en competencias digitales y de inteligencia artificial",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Despliegue del programa de formación en competencias digitales y de inteligencia artificial: definición del grupo piloto de primera línea y de personas clave, ejecución de los módulos y niveles, medición de la adopción real frente a la inscripción, acompañamiento a los rezagados, y lanzamiento masivo escalonado al resto de la organización.",
      "dueno": "Gerente de Recursos Humanos (Formación y Desarrollo)",
      "participantes": [
       "Country Manager (patrocinio y convocatoria)",
       "Gerente de Tecnología / Sistemas",
       "Gerente de Proyectoss (PMO)",
       "gerentes de primera línea (participantes y replicadores)",
       "Asistente Administrativo(a) / Servicios Generales (convocatoria y seguimiento)"
      ],
      "cadencia": "Por cohorte (piloto y luego despliegue masivo escalonado); seguimiento semanal de avance durante cada cohorte",
      "disparador": "Aprobación del programa y definición de la cohorte; incorporación de un colaborador a una posición que requiere la competencia",
      "output": "Cohorte formada con nivel de adopción medido y colaboradores certificados en el uso autorizado de las herramientas",
      "fuentes": "E-01 F1 (2026-06-16) — líneas 370-374, 379-383; E-12 F1 (2026-07-09) — líneas 115-117; E-52 F2 (2026-08-18) — línea 8; E-02 Patrick Corujo F1 (2026-06-18) — líneas 261-263"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    }
   ]
  },
  {
   "prefijo": "6",
   "cat": "operativo",
   "n": "Compras y Abastecimiento",
   "n0": {
    "introduccion": {
     "estado": "pendiente"
    },
    "contexto": {
     "estado": "pendiente"
    },
    "gobernanza": {
     "estado": "pendiente"
    },
    "marco": {
     "estado": "pendiente"
    },
    "agenda": {
     "estado": "pendiente"
    },
    "anexos": {
     "estado": "pendiente"
    }
   },
   "procesos": [
    {
     "codigo": "6.1",
     "n": "Planificación de demanda y S&OP",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Consolidación de inventario, sell-in y sell-out, proyección de forecast de demanda por SKU/país/canal, y validación cross-funcional en la reunión mensual de S&OP para producir el plan único de suministro aprobado.",
      "dueno": "Coordinador(a) de Logística y Bodega",
      "participantes": [
       "Gerente Regional Comercial / Retail",
       "Gerente Regional de Marketing",
       "Gerente Regional Comercial / Retail",
       "Planificador Financiero",
       "Analista de Sistemas / Datos",
       "Gerente Regional Comercial / Retail",
       "responsabilidad colegiada en la reunión S&OP"
      ],
      "cadencia": "Mensual (S&OP); análisis continuo de insumos",
      "disparador": "Cierre del mes comercial e inicio del ciclo de planificación mensual",
      "output": "Plan de suministro aprobado con propuesta de reposición por SKU/país/canal",
      "fuentes": "E5 Andrés F1; E8 Roberto F1; E10 Vera F1; E40 Jimena F2; Documentación de Lark (self-report Jimena Levantamiento Procesos Compras); reportes Power BI Alexis Mujica"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "6.2",
     "n": "Gestión del ciclo de vida del proveedor (SRM)",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Homologación de nuevos proveedores, contratación formal, evaluación periódica de desempeño mediante scorecards y decisiones de continuidad, renovación o baja del proveedor.",
      "dueno": "Coordinador(a) de Logística y Bodega (con validación de Gerente Regional Comercial / Retail para proveedores estratégicos)",
      "participantes": [
       "Gerente Regional Comercial / Retail",
       "Gerente Regional de Marketing",
       "Planificador Financiero",
       "Gerente de Contabilidad / Administración"
      ],
      "cadencia": "Evaluación semestral de proveedores estratégicos; homologación por evento",
      "disparador": "Necesidad de nuevo proveedor, vencimiento de contrato o ciclo de evaluación programada",
      "output": "Proveedor homologado y contratado; scorecard de desempeño; decisión de continuidad documentada",
      "fuentes": "Best practices CIPS/APQC PCF; brecha identificada en E5 Andrés F1; E6 Alejandro F1 (riesgo mono-proveedor firmware Cubitt)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "6.3",
     "n": "Compra internacional a marca representada (Casio)",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Recepción de la cuota o asignación de casa matriz Casio, validación de cantidades por país, confirmación de la orden de compra y seguimiento del pedido hasta el arribo al hub Kenex Panamá.",
      "dueno": "Gerente Regional Comercial / Retail",
      "participantes": [
       "Coordinador(a) de Logística y Bodega",
       "Gerente Regional Comercial / Retail",
       "Analista/Ejecutivo(a) Comercial (KAM Casio)"
      ],
      "cadencia": "Mensual",
      "disparador": "Recepción de la asignación mensual de cuota Casio desde casa matriz",
      "output": "Orden de compra Casio confirmada y en seguimiento",
      "fuentes": "E5 Andrés F1; E8 Roberto F1; E10 Vera F1; E3 Fernando/Alejandra F1"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "6.4",
     "n": "Compra internacional a marca propia (Cubitt)",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Comité informal revisa necesidades de Cubitt, decisión de compra con la fábrica china seleccionada, coordinación de sourcing con Marina, gestión de muestras, decisión aéreo/marítimo y confirmación de la orden.",
      "dueno": "Gerente Regional de Marketing (con decisión colegiada del comité Cubitt: Gerente Regional Comercial / Retail, Gerente Regional Cubitt, Director Ventas Regional Cubitt)",
      "participantes": [
       "Sourcing en China (Marina)",
       "Coordinador(a) de Logística y Bodega",
       "PMO"
      ],
      "cadencia": "Por evento (lanzamiento, reposición ad-hoc); menos estructurado que Casio",
      "disparador": "Necesidad detectada por el comité (nuevo lanzamiento, cobertura de stock crítica, oportunidad comercial)",
      "output": "Orden de compra Cubitt confirmada con fábrica y modo de envío decidido",
      "fuentes": "E5 Andrés F1; E6 Alejandro F1; E3 Fernando/Alejandra F1"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "6.5",
     "n": "Compra local por país (nacionales y de urgencia)",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Detección de necesidad puntual en el país (Venezuela al proveedor Mundo, Panamá a proveedor local, Costa Rica y otros), aprobación local por el coordinador responsable y registro de la orden en el ERP local.",
      "dueno": "Asistente Administrativo(a) / Servicios Generales (según país: Venezuela, Panamá, Costa Rica, Colombia)",
      "participantes": [
       "Country Manager",
       "Coordinador(a) de Logística y Bodega (para visibilidad regional)"
      ],
      "cadencia": "Por evento (necesidad puntual)",
      "disparador": "Necesidad extrema o puntual no cubierta por el hub regional",
      "output": "Orden de compra local registrada en el ERP del país",
      "fuentes": "E34 Elvis/Vladimir/Yoly F2 (proveedor Mundo VE); E59 Hugo/Itai F2 (Costa Rica)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "6.6",
     "n": "Gestión de reposición inter-compañía (país-hub)",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Armado del pedido de reposición del país contra la disponibilidad del hub Kenex Panamá, validación operativa local, aprobación de cantidades finales por el Director(a) Comercial y de Compras, y transferencia a Logística para preparación y despacho.",
      "dueno": "Coordinador(a) de Logística y Bodega",
      "participantes": [
       "Coordinador(a) de Logística y Bodega (validación operativa)",
       "Gerente Regional Comercial / Retail (aprobación cantidades finales)",
       "Coordinador(a) Comercial (handoff a Logística)"
      ],
      "cadencia": "Mensual (reposición total país); quincenal para mayorista",
      "disparador": "Inicio del ciclo mensual de reposición del país",
      "output": "Pedido inter-compañía aprobado y transferido a Logística para despacho desde Kenex Panamá",
      "fuentes": "E40 Jimena F2; E8 Roberto F1; E34 Elvis/Vladimir/Yoly F2; Documentación de Lark (self-report Jimena)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "6.7",
     "n": "Gestión de reposición a punto de venta",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Análisis de inventario y ventas de tiendas y mayorista local, armado del pedido de reposición al punto de venta y transferencia a Logística local para despacho.",
      "dueno": "Coordinador(a) de Logística y Bodega (con contraparte local por país)",
      "participantes": [
       "Supervisor de Ventas",
       "Analista/Ejecutivo(a) Comercial (Mayor)",
       "Coordinador(a) de Logística y Bodega"
      ],
      "cadencia": "Semanal (tiendas VE/PA); por evento para mayorista",
      "disparador": "Ciclo semanal de reposición de tiendas o alerta de cobertura crítica",
      "output": "Pedido de reposición al punto de venta aprobado y transferido a Logística local",
      "fuentes": "E40 Jimena F2; E34 Elvis/Vladimir/Yoly F2; E53 Blas García F2 (piloto reposición directa Zona Libre PA)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "6.8",
     "n": "Gobierno, política y control de compras",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Aplicación de la política de compras, matriz de aprobación por monto y tipo, tablero de KPIs de compras, gestión de riesgos de la cadena de suministro y estructura del departamento. Capa transversal; puede documentarse con diagrama de gobernanza en lugar de BPMN operativo.",
      "dueno": "Gerente Regional Comercial / Retail",
      "participantes": [
       "Planificador Financiero",
       "Gerente de Contabilidad / Administración",
       "Coordinador(a) de Logística y Bodega",
       "auditoría interna cuando aplique"
      ],
      "cadencia": "Continua; revisión trimestral de política y KPIs",
      "disparador": "Aplicación permanente; revisión programada trimestral",
      "output": "Política vigente; matriz de aprobación aplicada; tablero de KPIs monitoreado; riesgos mapeados",
      "fuentes": "Best practices CIPS; brechas identificadas en E5 Andrés F1, E8 Roberto F1, E40 Jimena F2 (departamento no estructurado, sin matriz de aprobación, sin KPIs formalizados)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "6.9",
     "n": "Devoluciones y no conformidades a proveedor",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Detección de defecto o discrepancia en la mercancía recibida, apertura del reclamo con el proveedor, seguimiento del caso y recuperación del costo o de la mercancía correspondiente.",
      "dueno": "Coordinador(a) de Logística y Bodega (con soporte del Director(a) responsable de la marca)",
      "participantes": [
       "Gerente Regional Comercial / Retail (Casio)",
       "Gerente Regional de Marketing (Cubitt)",
       "Coordinador(a) de Logística y Bodega (detección en recepción)",
       "Gerente de Contabilidad / Administración (recuperación de costo)"
      ],
      "cadencia": "Por evento",
      "disparador": "Detección de defecto o discrepancia (en recepción o durante operación)",
      "output": "Reclamo cerrado con proveedor; costo o mercancía recuperada; NCR documentada",
      "fuentes": "Best practices CIPS/APQC PCF; brecha identificada en E6 Alejandro F1 (devoluciones Kenex USA acumuladas sin política; defectos Cubitt sin trazabilidad)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    }
   ]
  },
  {
   "prefijo": "7",
   "cat": "operativo",
   "n": "Logística y Operaciones",
   "n0": {
    "introduccion": {
     "estado": "pendiente"
    },
    "contexto": {
     "estado": "pendiente"
    },
    "gobernanza": {
     "estado": "pendiente"
    },
    "marco": {
     "estado": "pendiente"
    },
    "agenda": {
     "estado": "pendiente"
    },
    "anexos": {
     "estado": "pendiente"
    }
   },
   "procesos": [
    {
     "codigo": "7.1",
     "n": "Recepción de mercancía importada y costeo en destino",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Cubre el flujo desde el arribo del contenedor al hub o al país destino hasta que la mercancía queda disponible en el WMS/ERP con su costo cargado. Incluye descarga, paletización, ubicación en almacén, validación de la orden de compra contra lo recibido, confirmación de preventas y aplicación de costes en destino con el flete.",
      "dueno": "Coordinador(a) de Logística y Bodega",
      "participantes": [
       "Gerente de Operaciones y Logística y Logística",
       "Supervisor(a) de Bodega / Despacho",
       "Auxiliar / Ayudante de Bodega y Tráfico",
       "Coordinador(a) de Logística y Bodega",
       "Auxiliar / Ayudante de Bodega y Tráfico",
       "Coordinador(a) Contable (registro del flete)",
       "Coordinador(a) de Logística y Bodega (validación de OC y preventas)"
      ],
      "cadencia": "Por evento (arribo de contenedor marítimo o carga aérea); observada: Casio mensual, Cubitt frecuente semanal/aérea",
      "disparador": "Arribo físico del contenedor o carga aérea al almacén (hub Kenex PA para import primaria; bodega VE/CO/CR para import secundaria o directa)",
      "output": "Mercancía ubicada en bodega con estatus 'disponible' en WMS y costo en destino cargado; preventas confirmadas y ventas notificadas",
      "fuentes": "E-34 Elvis/Vladimir/Yoly VE (ago 2026); E-03 Fernando/Alejandra Kenex PA (jun 2026); Documentación de Lark PA 'Procesos.pdf' (secciones 2 y 4); Documentación de Lark VE 'flujo logistico.xlsx' hoja Recepcion; E-19 Jill Porat (recepción CR con freight forwarder)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "7.2",
     "n": "Gestión y control de inventarios",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Ejecución de conteos físicos programados (cíclicos por SKU y semestrales/anuales tipo World-to-Work), auditoría de referencias con diferencias mayores a umbral, revisión de movimientos de inventario para identificar causa de la diferencia, ajustes contables coordinados con Contabilidad y reporte a la junta directiva.",
      "dueno": "Coordinador(a) de Logística y Bodega (ejecución); Analista de Logística (auditoría y consolidación regional)",
      "participantes": [
       "Supervisor(a) de Bodega / Despacho",
       "Auxiliar / Ayudante de Bodega y Tráfico",
       "Coordinador(a) Contable (registro de ajustes)",
       "Gerente de Operaciones y Logística y Logística (validación semestral)",
       "Junta Directiva (reporte de resultados)"
      ],
      "cadencia": "Continua (conteos cíclicos por SKU diarios/semanales); semestral (inventario tipo World-to-Work meta 99.9%)",
      "disparador": "Ciclo programado de conteo; alerta de discrepancia detectada en operación; cierre semestral",
      "output": "Reporte de inventario conciliado; ajustes contables aplicados; diferencias explicadas y presentadas a la junta",
      "fuentes": "E-03 Fernando/Alejandra (visión formal Samsung 99.9% meta, hoy 45% Covid PA); Documentación de Lark PA 'Procesos.pdf' sección 5; E-34 Elvis (VE con nuevo WMS); E-42 Valentina (Rosita hace inventarios a mano). Brecha reclamada por Bernardo y Fernando"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "7.3",
     "n": "Preparación de pedidos (picking, packing y embalaje)",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Del recibo del pedido en el WMS (liberado por Facturación o por gestión de reposición) hasta que la mercancía queda embalada, etiquetada y en zona de despacho lista para tránsito. Incluye ola de picking con pistolas láser sobre WMS, packing con control de calidad, resolución de discrepancias y embalaje final.",
      "dueno": "Coordinador(a) de Logística y Bodega",
      "participantes": [
       "Supervisor(a) de Bodega / Despacho (asigna olas de picking)",
       "Auxiliar / Ayudante de Bodega y Tráfico (picker)",
       "Auxiliar / Ayudante de Bodega y Tráfico",
       "Auxiliar / Ayudante de Bodega y Tráfico"
      ],
      "cadencia": "Continua diaria; picos por evento; SLA en VE: pedido normal 48 horas, urgentes línea dedicada",
      "disparador": "Recibo del pedido en el WMS como 'liberado y aprobado comercialmente'; aviso directo del supervisor para pedidos urgentes",
      "output": "Pedido embalado, etiquetado y ubicado en zona de despacho, con estatus 'listo para tránsito' en WMS",
      "fuentes": "Documentación de Lark VE 'Procedimientos de Almacen y Despacho.docx' V1.0 mayo 2026 (Gerencia de Almacén y Logística — Elvis); E-34 Elvis/Vladimir/Yoly VE; E-03 Fernando (PA en migración a EBS)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "7.4",
     "n": "Facturación logística y transferencia a despacho",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Recepción por parte del asistente administrativo de logística del pedido pistoleado y verificado por almacén, cotejo contra el pedido original (cantidades, colores, códigos), verificación de que el cliente no esté en backorder o con retenciones, emisión de la factura de venta en el ERP y entrega física/digital del pedido al Supervisor de Despacho/Tránsito. No incluye causación contable ni conciliación de CxC.",
      "dueno": "Auxiliar / Ayudante de Bodega y Tráfico",
      "participantes": [
       "Supervisor(a) de Bodega / Despacho (entrega pedido pistoleado)",
       "Gerente Comercial (País / Canal) (validación previa de condiciones comerciales)",
       "Supervisor(a) de Bodega / Despacho (recepción del pedido facturado)",
       "Coordinador(a) Contable (causación posterior)"
      ],
      "cadencia": "Continua diaria",
      "disparador": "Recepción del pedido pistoleado y embalado desde el área de packing/embalaje",
      "output": "Factura de venta emitida en el ERP; pedido transferido a Tránsito con documentación (factura, guía, permisología si aplica)",
      "fuentes": "E-34 Yoly Pacheco VE; Documentación de Lark VE 'flujo logistico.xlsx' hoja facturacion; E-03 Fernando (identifica como zona a revisar: 'tráfico también factura, es algo que tenemos que ir viendo cómo mejorar')"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "7.5",
     "n": "Despacho y última milla",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Coordinación y ejecución de la entrega física de la mercancía al destinatario final (cliente al mayor, tienda propia, sucursal de otro país, cliente retail). Cubre las tres vertientes: flota propia, courier tercero (MRW, Tealca, DHL, SPRE) y cliente retira. Incluye asignación de rutas, guías, seguimiento por Lark, notificación a vendedor y cliente, y gestión operativa de la flota.",
      "dueno": "Supervisor(a) de Bodega / Despacho",
      "participantes": [
       "Coordinador(a) de Logística y Bodega",
       "Coordinador(a) de Logística y Bodega",
       "Chofer(es) de Flota Propia",
       "Coordinador(a) de Logística y Bodega (permisología rutas foráneas)",
       "Gerente Comercial (País / Canal) (notificación de entrega)",
       "Servicios Generales (apoyo puntual)"
      ],
      "cadencia": "Continua diaria; SLA observado: pedidos normales 48 horas, urgentes prioridad inmediata",
      "disparador": "Pedido facturado recibido en zona de tránsito con documentación completa",
      "output": "Mercancía entregada al destinatario con confirmación registrada en Lark; notificación al vendedor y al cliente",
      "fuentes": "E-34 Elvis/Vladimir VE (Segundo supervisor despacho; tercero Jaime 30 años; rutas Valencia/Barquisimeto/Maracaibo/Margarita); Documentación de Lark VE 'Procedimientos de Almacen y Despacho.docx' (secciones Cliente Retira, Flota Propia, Couriers); E-03 Fernando PA; E-19 Jill Porat (CR puerta a puerta desde Zona Libre PA)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "7.6",
     "n": "Tráfico e importaciones",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Coordinación end-to-end de la importación de mercancía desde el proveedor origen hasta la disponibilidad en el almacén del país destino. Incluye seguimiento del BL y arribo naviera/aérea, gestión aduanal (freight forwarder, agente aduanal), tramitación de permisología país-específica (Sencamer, Panatel, etc.), pago de impuestos aduanales coordinado con Tesorería y traspaso al proceso de recepción física (7.1). Frontera aguas arriba con Compras (OC ya confirmada) y aguas abajo con 7.1 (mercancía lista para descarga).",
      "dueno": "Coordinador(a) de Logística y Bodega",
      "participantes": [
       "Gerente de Operaciones y Logística y Logística",
       "Coordinador(a) de Tesorería / Cobranzas / Cobranzas (pago de impuestos aduanales)",
       "Apoyo administrativo/Recepción",
       "freight forwarder externo",
       "agente aduanal externo",
       "Coordinador(a) de Logística y Bodega (información de compra)"
      ],
      "cadencia": "Continua (seguimiento de tránsitos activos); por evento (cada arribo)",
      "disparador": "Emisión de OC internacional con salida programada del proveedor; recepción de BL/documentos de embarque",
      "output": "Mercancía nacionalizada con permisología completa, impuestos pagados y liberada para descarga en el almacén destino",
      "fuentes": "E-34 Vladimir VE (Sencamer/Panatel, Verónica de Tesorería, coordinación con tráfico Kenex PA); E-03 Fernando PA (departamento formal de tráfico 5-6 personas import/export/interno con Yanilka Martínez); E-19 Jill Porat CR (freight forwarder + almacén fiscal + digitación + semáforo aduanal)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "7.7",
     "n": "Gestión de logística inversa (garantías y devoluciones de cliente)",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Recepción del producto devuelto por garantía o no conformidad del cliente, ubicación en bodega de garantías (bodega 37 en VE), coordinación con Servicio Técnico para determinación (reparación para Casio, reemplazo directo para Cubitt), ejecución del traslado del reemplazo o retorno de la unidad reparada al cliente, y disposición final de mercancía no recuperable (bodega 38 en VE, para desecho o baja contable). Frontera con Servicio Técnico: la determinación técnica y reparación son de SVC; la gestión física en bodega es de Logística.",
      "dueno": "Coordinador(a) de Logística y Bodega; personal dedicado (Cristian y Abraham en VE; equipo Cubitt en PA)",
      "participantes": [
       "Supervisor(a) de Bodega / Despacho",
       "Subgerente de Servicio Técnico (frontera de determinación técnica)",
       "Relojero Casio (Gilbert en VE)",
       "Servicio al Cliente (comunicación con el cliente)"
      ],
      "cadencia": "Continua; cortes de procesamiento diarios (10am y 2pm en VE); volúmenes observados 300-500 garantías por corte en VE",
      "disparador": "Recepción del producto devuelto (en almacén central, tienda o vía courier); apertura de caso RMA",
      "output": "Producto reemplazado o reparado entregado al cliente; mercancía no conforme dispuesta según política (desecho, baja contable o devolución a proveedor); registro en sistema de trazabilidad",
      "fuentes": "E-34 Elvis VE (bodega 37 entradas, bodega 38 desecho, Cristian/Abraham dedicados, Gilbert relojero con piezas Japón); E-51 Yusseth/Johan/Gustavo Servicio Técnico VE (cuello botella dos tiempos diarios); E-64 Jesús Rockmar y Eloy Servicio Técnico PA (Cubitt reemplazo directo, RMA en desarrollo, envío DHL/SPRE, dashboard Terra más garantías)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "7.8",
     "n": "Traslados internos entre bodegas y áreas",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Ejecución de movimientos de mercancía entre bodegas del mismo país o entre áreas de la organización, cuando no corresponden a un pedido de venta ni a una reposición inter-compañía. Incluye traslados a Marketing (con salida a costo), a Servicio Técnico (repuestos y reemplazos), entre tiendas de la misma plaza por urgencia, de tienda a bodega central por retorno, y entre bodegas de la matriz por reorganización.",
      "dueno": "Auxiliar / Ayudante de Bodega y Tráfico",
      "participantes": [
       "Supervisor(a) de Bodega / Despacho",
       "Coordinador(a) de Marca (solicitante frecuente)",
       "Subgerente de Servicio Técnico (solicitante frecuente)",
       "Supervisor de Ventas (solicitante para urgencias)",
       "Gerente de Operaciones y Logística y Logística (aprobación para traslados entre tiendas)"
      ],
      "cadencia": "Continua diaria",
      "disparador": "Solicitud de traslado formal (por Lark o sistema) desde el área requirente",
      "output": "Mercancía trasladada físicamente al destino con movimiento registrado en el ERP; salida a costo cuando corresponda (marketing)",
      "fuentes": "E-34 Yoly VE (traslados a marketing, entre bodegas, a servicio técnico); Documentación de Lark VE 'flujo logistico.xlsx' hojas Traslados Marketing y Traslados Solicitudes; E-42 Valentina; E-51 Servicio Técnico VE (traslado desde bodega es cuello botella)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "7.9",
     "n": "Gobierno logístico, KPIs y excelencia operativa",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Capa transversal que integra definición y monitoreo de KPIs logísticos (OTIF, fill rate, inventory accuracy, cycle time, dock-to-stock, costo logístico), dashboards ejecutivos, política logística y matriz de responsabilidades regional, unificación de procesos y sistemas entre países (VE, PA, CO, CR, US), coordinación con Ventas y Compras para reducir ruido en las interfaces, gestión de riesgos de la cadena de suministro y planes de mejora continua. Se documenta con diagrama de gobernanza en lugar de BPMN operativo.",
      "dueno": "Gerente de Operaciones y Logística y Logística",
      "participantes": [
       "Junta Directiva (reporte y aprobación)",
       "Gerente Regional Comercial / Retail",
       "Planificador Financiero",
       "Coordinador(a) de Logística y Bodega",
       "Analista de Sistemas / Datos"
      ],
      "cadencia": "Continua; revisión trimestral de política y KPIs con la junta",
      "disparador": "Aplicación permanente; revisión programada trimestral; alertas de KPI fuera de rango",
      "output": "Tablero de KPIs monitoreado; política regional aplicada; roadmap de excelencia logística en ejecución; brechas y riesgos gestionados",
      "fuentes": "E-03 Fernando (visión formal: no había indicadores, ahora seteo con la junta; downfall PA→VE→CO→Miami; migración EBS); best practices SCOR/APQC PCF supply chain; brechas E-11 Joel (CO sin procesos, apagando incendios), E-19 Jill (CR flojos en fulfillment), E-63 John (dependencia cadena suministro, política 3 meses colchón, Kenex tarda 1-3 semanas)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    }
   ]
  },
  {
   "prefijo": "8",
   "cat": "operativo",
   "n": "Ventas Mayor",
   "n0": {
    "introduccion": {
     "estado": "pendiente"
    },
    "contexto": {
     "estado": "pendiente"
    },
    "gobernanza": {
     "estado": "pendiente"
    },
    "marco": {
     "estado": "pendiente"
    },
    "agenda": {
     "estado": "pendiente"
    },
    "anexos": {
     "estado": "pendiente"
    }
   },
   "procesos": [
    {
     "codigo": "8.1",
     "n": "Planificación comercial anual y trimestral",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Construcción del forecast de ventas por vendedor, cliente, marca y país sobre base del año anterior con % de crecimiento pedido por dirección; validación por Dirección Comercial Regional; bajada de cuotas mensuales, trimestrales y anuales; ajuste trimestral por cumplimiento y calendarización comercial (campañas Q, temporadas, lanzamientos). NO cubre planificación de compra ni allocation de inventario (eso corresponde a 6.1 S&OP).",
      "dueno": "Gerente Regional Comercial / Retail (Cubitt) / Brand Manager Casio Wholesale (a contratar); consolida Gerente Regional Comercial / Retail",
      "participantes": [
       "Gerente(s) de Ventas Mayor por país",
       "vendedores por cartera",
       "Country Manager (aprueba metas globales)",
       "Coordinador(a) de Logística y Bodega (insumo de disponibilidad)"
      ],
      "cadencia": "Anual con revisión trimestral obligatoria; ajuste ad-hoc por cumplimiento material",
      "disparador": "Cierre del año fiscal e inicio del Q siguiente; llegada de datos de sellout consolidado del período anterior",
      "output": "Plan comercial vigente por vendedor/cliente/país con cuotas mensuales, trimestrales y anuales; calendario comercial de campañas por canal; base para 6.1 S&OP y para 8.14 comisiones",
      "fuentes": "E5 Andrés Roizental F2 (regional); E14 Santiago Ramírez F2 (trimestral con calendario canal); E35 Andrés Márquez F2 (proyección semanal/mensual/trimestral, cambio a trimestral en curso); E36 José Ramón/Henry Lucena F2 (herencia anual, debe ser trimestral); E39 Edumar Escalona F2 (proyección anual sobre base 2025 + % crecimiento); E63 John Mordoch F2 (forecast por cliente con 3 meses de colchón, ajustes 3x año)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "8.2",
     "n": "Segmentación de clientes y gobierno de política comercial",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Clasificación de clientes en tipologías (A/B/C/D por volumen y frecuencia; y por canal: tienda pequeña, gran superficie, cadena, franquicia Casio, corporativo, redistribuidor, e-tailer); definición y mantenimiento de listas de precios (MA bolívares, MB dólares, MI PVP + descuentos por cliente y precios directos negociados a costo); matriz de descuentos y crédito; política de aprobación por monto y tipo de decisión; política de comisiones (techos, tramos por descuento aplicado, atadura a recaudación). NO cubre la aprobación transaccional del pedido (8.5) ni el cálculo mensual de comisiones (8.14).",
      "dueno": "Gerente Regional Comercial / Retail; con Country Manager como aprobador de política de comisiones y descuentos estratégicos",
      "participantes": [
       "Gerente Regional Comercial / Retail",
       "Gerente Regional Comercial / Retail",
       "Gerente Regional de Marketing",
       "Country Manager",
       "Planificador Financiero",
       "Contabilidad",
       "Marketing (acuerdos comerciales de canal)"
      ],
      "cadencia": "Revisión anual formal; ajustes ad-hoc por cambio de mercado, apertura de canal/país o nuevo tipo de cliente; revisión de comisiones al menos anual",
      "disparador": "Cierre de planificación anual (8.1); apertura de nuevo canal o cliente estratégico; cambio material en costo, margen o competencia",
      "output": "Catálogo vigente de tipologías de cliente; listas de precios activas por país y por lista (MA/MB/MI + directos); matriz de aprobación por monto; tabla de comisiones vigente; política de crédito y descuento documentada",
      "fuentes": "E5 Andrés Roizental F2 (listas por mercado, allocation por SKU, indicador de riesgo de cliente); E14 Santiago Ramírez F2 (clasificación A/B/C que él implementó en CO); E35 Andrés Márquez F2 (listas MA/MB/MI + directos Farmatodo; governance ambiguo Rodolfo-Reina); E63 John Mordoch F2 (clústeres A/B/C/D, política de reserva 20% para clientes preferentes, correo estándar corporativo 25%)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "8.3",
     "n": "Envío de disponibilidad y oferta comercial recurrente",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Envío parametrizado (deber ser semanal, lunes) a cada cliente de su lista de disponibilidad con SKU, imagen, precio según su lista, inventario disponible, tránsito confirmado y columna de orden para que el cliente devuelva su pedido. Aplica principalmente a clientes recurrentes de Cubitt y Casio con cartera activa; excluye consignación pura (trabaja por sellout) y venta inorgánica de alto volumen (flujo propio, 8.10).",
      "dueno": "Gerente Comercial (País / Canal) (con soporte del Brand Manager para diseño de la plantilla y curaduría del portafolio ofrecido)",
      "participantes": [
       "Analista/Ejecutivo(a) Comercial (envían y siguen su cartera)",
       "Coordinador(a) de Logística y Bodega (visibilidad de tránsito)",
       "Marketing (piezas de comunicación cuando hay campaña asociada)"
      ],
      "cadencia": "Semanal (deber ser: lunes); refuerzo a los 15 días si el cliente no ha respondido",
      "disparador": "Inicio de semana; llegada de nuevo tránsito con impacto en disponibilidad; lanzamiento de producto con fecha de arribo",
      "output": "Excel/plantilla enviado al cliente con disponibilidad vigente; base para la carga masiva del pedido en Odoo (8.4)",
      "fuentes": "E5 Andrés Roizental F2 (describe el deber ser: todos los lunes vendedores mandan listas con SKU, imagen, precio, disponibilidad, tránsito, columna de orden; se busca parametrizar en Odoo); E36 José Ramón/Henry Lucena F2 (José Ramón manda listado a los 15 días si el cliente no pide); E63 John Mordoch F2 (envío automatizado de listas de precios semanal ya en curso en su equipo)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "8.4",
     "n": "Toma y montaje del pedido en Odoo",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Recepción del pedido del cliente (respuesta a lista de disponibilidad, sugerido del vendedor sobre inventario del cliente, o pedido levantado en visita); montaje en plantilla Excel; carga masiva a Odoo generando presupuesto (estado que no reserva inventario); conversión inmediata a orden de venta (reserva inventario). Cubre pedido del canal wholesale regular; consignación se documenta como variante (nota de entrega en vez de factura); grandes superficies y cadenas pueden venir con sellout del cliente. NO cubre venta corporativa (8.9), inorgánica (8.10) ni línea blanca (8.11).",
      "dueno": "Analista/Ejecutivo(a) Comercial; supervisado por Gerente Comercial (País / Canal)",
      "participantes": [
       "Cliente",
       "Coordinador(a) de Logística y Bodega (visibilidad de tránsito para responder brechas)",
       "Odoo (sistema transaccional)"
      ],
      "cadencia": "Continua (a demanda); pedidos pequeños semanales o 2-3 veces/semana; pedidos de cadenas mensuales",
      "disparador": "Recepción del pedido del cliente en cualquiera de sus formas (respuesta a lista, WhatsApp, correo, visita)",
      "output": "Presupuesto y orden de venta creados en Odoo con SKU, cantidades, precio de lista aplicable, cliente y condiciones; listo para 8.5",
      "fuentes": "E5 Andrés Roizental F2 (carga masiva Excel → Odoo, presupuesto → orden de venta, no reserva vs reserva inventario); E35 Andrés Márquez F2 (VE: pedido en plantilla Excel, alerta rojo/verde disponibilidad); E36 José Ramón/Henry Lucena F2 (mismo flujo VE, alerta inventario que no es real); E39 Edumar Escalona F2 (PA: vendedor monta directo en Odoo)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "8.5",
     "n": "Aprobación comercial del pedido",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Revisión y autorización del pedido antes de enviarlo a preparación en bodega. Doble aprobación en Odoo: trabajar el pedido y facturar. Criterios: margen contra lista aplicable, allocation por SKU (evitar que un solo cliente agote los top-sellers), riesgo de crédito (indicador sobre historial de pagos, deuda vigente), condición contado/crédito. Vista máster en Odoo permite decisión en 30 segundos. Pedidos de contado en PA pueden saltar aprobación. Los internacionales de Casio pasan por Roberto o Dir Comercial Regional; los de Cubitt regional por Dir Comercial Wholesale/Regional; los locales por Gerente de Mayor país.",
      "dueno": "Gerente Regional Comercial / Retail y Gerente Regional Comercial / Retail a nivel regional; Gerente Comercial (País / Canal) a nivel local",
      "participantes": [
       "Analista/Ejecutivo(a) Comercial (responde por deuda del cliente)",
       "Odoo (vista máster con indicadores)"
      ],
      "cadencia": "Continua; parte del trabajo diario del aprobador",
      "disparador": "Orden de venta creada en Odoo (output de 8.4)",
      "output": "Pedido aprobado con flag para pasar a WMS de bodega (dispara 7.3 Preparación); o rechazado/modificado con feedback al vendedor",
      "fuentes": "E5 Andrés Roizental F2 (todos los pedidos pasan por él o Roberto; criterio margen + allocation + crédito; vista máster 30 seg); E39 Edumar Escalona F2 (PA: dos aprobaciones Odoo, contado salta, crédito pasa por él); E35 Andrés Márquez F2 (VE: teóricamente aprueba hasta cierto monto pero governance ambiguo)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "8.6",
     "n": "Gestión de preventa contra tránsito y demanda no cumplida",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Cuando un pedido excede la disponibilidad, el remanente queda como presupuesto marcado como preventa contra un tránsito confirmado; el vendedor reserva mercancía del tránsito y comunica fecha estimada. Segunda pata (hoy sin cerrar, brecha crítica): captura y trazabilidad de la demanda no cumplida cuando el tránsito no llega o llega parcialmente, para retroalimentar a 6.1 S&OP sobre el gap real entre demanda y venta ejecutada.",
      "dueno": "Gerente Regional Comercial / Retail (lo marca como prioridad número uno)",
      "participantes": [
       "Analista/Ejecutivo(a) Comercial (marca la preventa y comunica al cliente)",
       "Coordinador(a) de Logística y Bodega (visibilidad de tránsito y confirma fechas)",
       "Odoo (estados presupuesto/preventa/orden de venta)"
      ],
      "cadencia": "Continua; cierre de ciclo por tránsito (típicamente mensual para Casio; irregular para Cubitt)",
      "disparador": "Pedido cuyo remanente no puede cubrirse con inventario disponible al momento del montaje (8.4/8.5)",
      "output": "Preventa registrada en Odoo con tránsito referenciado y fecha comprometida al cliente; log persistente (deber ser) de demanda no cumplida por SKU/cliente/país cuando el tránsito no cubre",
      "fuentes": "E5 Andrés Roizental F2 (explica el proceso completo y lo llama prioridad número uno; perder trazabilidad significa que Roberto compra la mitad de lo que debería); E36 José Ramón/Henry Lucena F2 (el gran valor de Jimena: ahora saben con una semana lo que viene)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "8.7",
     "n": "Gestión de cuentas clave y grandes superficies (KAM)",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Atención dedicada de clientes de alto volumen o alto reconocimiento: grandes superficies (Falabella, Éxito, Locatel, Panamericana en CO; Naida, Canguro en VE; Panafoto en PA; distribuidores electrónica top por país en Centroamérica), cadenas con múltiples tiendas donde hay que seleccionar en cuáles estar y con qué portafolio, y clústeres A y B. Incluye acuerdos comerciales anuales, planificación de campañas por canal con calendario propio, mueble propio y visual dentro de la tienda del cliente, promotoría en punto de venta, capacitación técnica, monitoreo de inventario del cliente y semanas de cobertura, apoyo con material POP y activaciones específicas. Consignación cuando aplica. NO cubre pedido puntual (8.4), campañas masivas inorgánicas (8.10) ni corporativo (8.9).",
      "dueno": "Coordinador(a) Comercial; Gerente Regional Comercial / Retail para cuentas top regionales de Cubitt",
      "participantes": [
       "Analista/Ejecutivo(a) Comercial",
       "Marketing (piezas de campaña 15 días antes, materiales POP)",
       "Visual (muebles, exhibición)",
       "Promotoría (asesores en punto de venta)",
       "Coordinador(a) de Logística y Bodega (allocation)",
       "Logística (despacho certificado con transportadora aprobada por la cadena)"
      ],
      "cadencia": "Reuniones y seguimiento semanal por cadena; acuerdos comerciales anuales con revisión trimestral; visitas de KAM al comprador según agenda",
      "disparador": "Existencia del acuerdo comercial anual y del calendario de canal; solicitud puntual del comprador de la cadena; lanzamiento de producto",
      "output": "Acuerdo comercial vigente por cuenta clave (márgenes, condiciones, apoyos comprometidos, calendario de campañas); pedidos consolidados; dashboard de inventario y semanas de cobertura por cadena; informe de sellout por cadena",
      "fuentes": "E14 Santiago Ramírez F2 (flujo completo CO: CAM, calendario comercial por canal, simulador de precios, dashboard sellout con inventario por cadena, malla de horarios de promotoría, cross-selling por tienda); E35 Andrés Márquez F2 (Naida, Canguro; Jefferson ingresado para cadenas y grandes superficies); E63 John Mordoch F2 (visión regional Cubitt: escalera 5 pasos, clústeres A/B/C/D, tiendas top por país, reserva 20%); E5 Andrés Roizental F2"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "8.8",
     "n": "Gestión de franquicias Casio",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Relación con franquiciados Casio: firma y mantenimiento de contrato de franquicia con royalty, acceso a data de venta del franquiciado, provisión de materiales POP y marquesina, negociación de remodelaciones cuando la marca cambia, capacitación del personal del franquiciado, subida de necesidades específicas a Casio para presupuestos de apoyo. Aplica solo a Casio (no a Cubitt), solo a las franquicias vigentes (2 activas en VE de 39 originales; se está retomando).",
      "dueno": "Coordinador(a) de Ventas Mayor país con línea a Casio (en VE hoy lo atiende Coordinador Ventas)",
      "participantes": [
       "Franquiciado (dueño de la tienda)",
       "Gerente Regional de Marketing (a contratar)",
       "Marketing y Visual (materiales)",
       "Legal (contrato)",
       "Casio (aprobación de presupuestos de apoyo)"
      ],
      "cadencia": "Visitas periódicas (mensual o trimestral) al franquiciado; revisión anual del contrato; ciclo semestral/anual de presupuestos con Casio",
      "disparador": "Firma o renovación de contrato; visita programada; solicitud puntual del franquiciado; cambio de imagen de la marca; recepción de nueva línea Casio",
      "output": "Contrato de franquicia vigente; data de sellout del franquiciado; plan de acción por franquicia; presupuestos aprobados por Casio para apoyos",
      "fuentes": "E35 Andrés Márquez F2 (diagnóstico completo: 39 originales, 2 activas hoy, contrato nuevo en trabajo, Henry se encarga, se abandonó y se está retomando; describe qué debería suceder)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "8.9",
     "n": "Gestión de venta corporativa",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Venta a empresas que compran para consumo propio (regalos a empleados, incentivos, dotaciones) o para dispersar entre sus propios clientes con marca propia o co-branding (Farmatodo con termos grabados, Reebok, Polar, La Baza, Drija, concesionarios de carros que regalan producto con la compra, constructoras que regalan al comprar apartamento). Incluye cotización especial (a costo con margen negociado, no aplica lista MA/MB/MI), grabado y customización del producto, coordinación con múltiples gerentes de marketing patrocinantes cuando hay co-branding, aprobación de arte, plazos de producción especial. Correo estándar de primer contacto (tu empresa califica como distribuidor corporativo, 25% descuento).",
      "dueno": "Analista/Ejecutivo(a) Comercial",
      "participantes": [
       "Cliente corporativo",
       "Marketing (arte, aprobación co-branding, coordinación con marcas patrocinantes)",
       "Producción (customización, grabado, empaque especial)",
       "Coordinador(a) de Logística y Bodega (si el volumen requiere pedido específico a China)",
       "Contabilidad (facturación con condiciones especiales)"
      ],
      "cadencia": "A demanda (venta transaccional); ciclos anuales con clientes recurrentes",
      "disparador": "Contacto inicial del cliente corporativo; llamado del comprador de una cuenta corporativa recurrente; oportunidad identificada por Dir Comercial Wholesale",
      "output": "Cotización especial firmada; producto customizado producido y entregado; venta facturada con condiciones corporativas",
      "fuentes": "E35 Andrés Márquez F2 (Farmatodo caso completo: cadena, consumo propio, coffee mugs grabados, 8000 termos con marcas patrocinantes múltiples); E39 Edumar Escalona F2 (Carlos creado en pandemia para concesionarios y constructoras); E63 John Mordoch F2 (correo estándar 25% descuento, línea Nestlé, Reebok como ejemplo)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "8.10",
     "n": "Gestión de venta puntual de alto volumen y promociones tácticas",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Campañas de alto volumen y corta duración donde se pone el producto en manos de una masa amplia a precio agresivo, típicamente vía cadena de retail masivo con mecánica de \"por la compra de X dólares llévate producto Cubitt a mitad de precio\" u ofertas de descuento del 40% pactadas con cliente. Ejemplo diciembre 2025: 85K unidades comprometidas, 70K vendidas en mes y medio. Requiere reserva de inventario específica, negociación puntual con la cadena, coordinación con logística para el volumen concentrado, y sale del ciclo comercial regular. Distinta a la venta orgánica (siembra con forecast a 12 meses) y a la corporativa (consumo propio).",
      "dueno": "Gerente Regional Comercial / Retail directamente; no delegable a nivel país",
      "participantes": [
       "Cliente cadena o supermercado",
       "Coordinador(a) de Logística y Bodega (reserva del volumen específico, colchón de 3 meses aparte de venta comprometida)",
       "Logística (concentración del despacho)",
       "Marketing (comunicación conjunta con la cadena si aplica)",
       "Junta directiva (aprobación por monto)"
      ],
      "cadencia": "Ad-hoc; 2-3 campañas de alto volumen al año; alineados con temporadas fuertes (diciembre)",
      "disparador": "Cierre del acuerdo con la cadena; oportunidad de volumen identificada por Dir Comercial Wholesale",
      "output": "Acuerdo firmado con la cadena; despacho consolidado del volumen; reporte de sellout de la campaña",
      "fuentes": "E63 John Mordoch F2 (define claramente las tres líneas: orgánica, inorgánica de alto volumen, línea blanca; caso diciembre 85K/70K, política de reservar 20% adicional para clientes preferentes)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "8.11",
     "n": "Gestión de línea blanca / marca privada",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Cliente (Reebok, La Baza, Drija) solicita fabricación de audífono, headphone, termo o bocina con su propia marca; se le diseña y muestra el producto, se aprueba la muestra, firma proforma, se produce, se le vende y despacha. Flujo completo desde brief comercial hasta entrega, con involucramiento intensivo del área de desarrollo de producto por el lado de sourcing. Facturación año pasado aproximadamente 2M USD (siete cifras). Es un negocio de costado que se trae al portafolio.",
      "dueno": "Gerente Regional Comercial / Retail como generador y cerrador; Gerente Regional de Marketing como responsable del componente de desarrollo de producto y sourcing en China",
      "participantes": [
       "Cliente marca-blanca",
       "Desarrollo de producto (diseño, muestra)",
       "Compras China Cubitt (Marina en China + Alejandro)",
       "Producción del proveedor chino",
       "Logística (embarque específico)",
       "Contabilidad (facturación)"
      ],
      "cadencia": "Ad-hoc por proyecto; ciclos de 2-6 meses entre firma de proforma y entrega según origen de producción",
      "disparador": "Contacto del cliente corporativo interesado en marca privada, típicamente por handshake y red del Dir Comercial Wholesale",
      "output": "Proforma firmada con el cliente; muestra aprobada; producción liberada; entrega del pedido; facturación cerrada",
      "fuentes": "E63 John Mordoch F2 (describe la línea completa como su tercera vertical, 2M USD año pasado, casos Reebok/La Baza/Drija)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "8.12",
     "n": "Prospección y apertura de nuevo cliente",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Identificación de leads (referidos, tocar puertas, LinkedIn, plataforma web con seguimiento en PA); calificación y análisis del prospecto (visitas a puntos de venta, redes sociales, número de tiendas, categorización — paso 1 de la escalera Cubitt: análisis, approach, venta, expansión, volumen); creación del código de cliente en Odoo; firma de documento de crédito legal (creado como respaldo para demandas por mora); asignación a vendedor; primer pedido y arranque en 5 puntos top con capacitación + incentivos + garantías + exhibición; luego expansión a las tiendas restantes. Cubre cliente nuevo y reactivación de cliente dormido.",
      "dueno": "Analista/Ejecutivo(a) Comercial; supervisado por Gerente Comercial (País / Canal)",
      "participantes": [
       "Prospecto",
       "Contabilidad y Legal (documento de crédito, evaluación de riesgo)",
       "Marketing (materiales de presentación)",
       "Visual (propuesta inicial de exhibición)",
       "Gerente Comercial (País / Canal) (aprobación de condiciones iniciales)"
      ],
      "cadencia": "Continua pero secundaria en la carga del vendedor senior; vendedores junior sí lo hacen",
      "disparador": "Lead identificado; oportunidad detectada por Dir Comercial Wholesale o por vendedor en calle; cliente dormido a reactivar",
      "output": "Cliente creado en Odoo con código, lista de precios asignada, condición de crédito, documento de crédito firmado; primer pedido cerrado; plan de expansión definido",
      "fuentes": "E14 Santiago Ramírez F2 (rutas de visita, clasificación por tipo); E35 Andrés Márquez F2 (Jefferson y Génesis ingresados para prospección); E36 José Ramón/Henry Lucena F2 (casi no hacemos prospección, nos arropa); E39 Edumar Escalona F2 (documento de crédito legal creado tras cliente moroso); E63 John Mordoch F2 (la escalera Cubitt de 5 pasos como sistema formal, con fase 6.5 Mercadeo Key Account faltante)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "8.13",
     "n": "Gestión de mobiliario, POP y activaciones en punto de venta",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Solicitud de muebles de exhibición, material POP, habladores, vallas, activaciones y mesas de experiencia por parte del vendedor o KAM; evaluación de la solicitud contra plan de compras del cliente o ROI proyectado (activación no aprobada si no hay respaldo comercial); producción del mueble o material; entrega y montaje en el punto de venta; seguimiento del rendimiento post-instalación. Cliente antiguo con muebles viejos puede recibir renovación bajo criterios distintos.",
      "dueno": "Gerente Regional Comercial / Retail o KAM del cliente (según monto); con Visual Merchandising como ejecutor",
      "participantes": [
       "Cliente/canal",
       "Visual regional",
       "Marketing (arte, campañas asociadas)",
       "Coordinador(a) de Logística y Bodega (producción de muebles)",
       "Finanzas (aprobación por monto según matriz 8.2)",
       "Analista/Ejecutivo(a) Comercial (levanta solicitud y aporta plan de venta)"
      ],
      "cadencia": "Continua a demanda; picos alrededor de lanzamientos y aperturas de tienda del cliente",
      "disparador": "Solicitud del vendedor o KAM; apertura de nueva tienda del cliente; lanzamiento de producto que requiere exhibición dedicada; deterioro de mueble existente",
      "output": "Solicitud aprobada con business case; mueble o material producido y entregado; instalación documentada; seguimiento del sellout asociado",
      "fuentes": "E14 Santiago Ramírez F2 (proceso que él activó en CO: cada solicitud de muebles tiene que tener detrás una aprobación de que sea rentable); E35 Andrés Márquez F2 (mesas de experiencia 4000 USD, governance ambiguo); E63 John Mordoch F2 (crítica al proceso de Display de 37 días hábiles que le parece camisa de fuerza)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "8.14",
     "n": "Cálculo, aprobación y pago de comisiones",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Cierre mensual de facturación por vendedor; aplicación de tabla vigente de comisiones (tramos por descuento aplicado, tope por techo); filtro de recaudación efectiva (solo se paga comisión sobre lo cobrado, no sobre lo facturado); consolidación por vendedor; envío a CEO para aprobación; activación de Tesorería/Nómina para el pago. Aplica a fuerza de venta mayor de todos los países.",
      "dueno": "Gerente Comercial (País / Canal) (calcula y consolida); Country Manager (aprueba); Tesorería/Nómina (paga)",
      "participantes": [
       "Analista/Ejecutivo(a) Comercial (recibe el pago)",
       "Contabilidad/CxC (confirma qué facturas están efectivamente cobradas para aplicar el filtro de recaudación)",
       "Odoo (fuente de facturación y cobranza)"
      ],
      "cadencia": "Mensual; cierre en fecha fija al inicio del mes siguiente",
      "disparador": "Cierre contable del mes",
      "output": "Reporte de comisiones mensual por vendedor con montos a pagar; aprobación firmada por CEO; pago ejecutado por Tesorería/Nómina",
      "fuentes": "E14 Santiago Ramírez F2 (comisión al 100% solo con recaudación al 100%, tabla diferenciada por descuento, one-to-one con vendedor); E35 Andrés Márquez F2 (reporte mensual, se imprime, Bernardo aprueba tras insistencia, activa a Josefina); E5 Andrés Roizental F2 (Handani propuso homologación regional de esquemas de comisión)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "8.15",
     "n": "Cobranza comercial y conciliación multi-instrumento",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Seguimiento de la cuenta por cobrar de cada cliente por parte del vendedor asignado; envío de recordatorios; recepción de comprobantes de pago del cliente (retenciones, transferencias, pago móvil, dólares en efectivo, bolívares indexados en VE, link de pago en PA); carga de los soportes de pago en Odoo por vendedor; conciliación de factura contra los múltiples instrumentos y monedas; aplicación de indexación cuando corresponde. En PA existe herramienta LARK que envía Excel al cliente y llega a CxC. Cuenta con apoyo puntual para documentación y procesamiento contable. Departamento de CxC formal está en construcción.",
      "dueno": "Analista/Ejecutivo(a) Comercial; supervisado por Gerente Comercial (País / Canal) con revisión semanal (lunes) uno a uno de la deuda por cliente",
      "participantes": [
       "Cliente (paga)",
       "CxC/Contabilidad (recibe, concilia formalmente, aplica en Odoo)",
       "Tesorería (confirma ingreso)",
       "soporte administrativo (Noel PA, Yajaira VE)"
      ],
      "cadencia": "Diaria por vendedor (registro de pagos recibidos); semanal con gerente (revisión de deuda vigente); mensual para reporte agregado y para filtro de comisiones (8.14)",
      "disparador": "Vencimiento de factura; recepción de pago del cliente; corte semanal de revisión",
      "output": "Factura descargada correctamente en Odoo con sus pagos aplicados; reporte semanal de cobranza al gerente; input al filtro de comisiones",
      "fuentes": "E35 Andrés Márquez F2 (VE: multi-moneda, retenciones, indexación; había 100 excepciones contables que Henry bajó a 20 en un mes); E36 José Ramón/Henry Lucena F2 (departamento de CxC prácticamente es nuevo, no existe; trabajo administrativo enorme); E39 Edumar Escalona F2 (herramienta LARK, cuadro semanal de lunes, se sienta uno a uno con cada vendedor); E14 Santiago Ramírez F2 (simulador y dashboard automatizado para seguimiento)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "8.16",
     "n": "Devoluciones y notas de crédito comerciales",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Vendedor monta la solicitud de devolución en LARK indicando cliente, factura, SKU, motivo, cantidad; Gerente Ventas Mayor país aprueba (verifica motivo, condiciones, impacto); Bodega recibe físicamente el producto y confirma en el sistema con observaciones; Contabilidad genera la nota de crédito, la aplica al cliente y si aplica devuelve dinero. Flujo bien definido en LARK. NO cubre garantías de producto (servicio técnico, macroproceso propio) ni logística inversa de reposición (7.7).",
      "dueno": "Gerente Comercial (País / Canal) como aprobador; Contabilidad como ejecutor final",
      "participantes": [
       "Analista/Ejecutivo(a) Comercial (levanta)",
       "Cliente (regresa el producto o solicita la devolución)",
       "Bodega (recibe físico)",
       "Contabilidad (nota de crédito)"
      ],
      "cadencia": "Continua a demanda; volumen bajo en wholesale",
      "disparador": "Solicitud del cliente por producto defectuoso, no conforme, cambio de pedido o error en despacho",
      "output": "Devolución cerrada en LARK con producto recibido en bodega; nota de crédito emitida y aplicada; dinero devuelto al cliente si corresponde",
      "fuentes": "E39 Edumar Escalona F2 (flujo completo LARK: vendedor monta → aprobación → Bodega recibe → Contabilidad NC; optimización para que el producto se entregue directo a bodega sin subir al piso 10)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "8.17",
     "n": "Reportería comercial y toma de decisión basada en data",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Extracción de data transaccional (Odoo, EBS, Excel diarios); procesamiento en dashboard externo (creado con Cloud, alojado en On Render, fuera de Lark y Odoo pero cruzado con su data); visualización por marca, cliente, país, vendedor, familia de productos, ritmo mes, proyección cierre, meta anual, meta a fecha, real, avance vs plan, YTD anterior, % avance, semáforo verde/amarillo/rojo. Vendedores top elaboran reportería en Cloud para su cartera. Reunión semanal por vendedor con Gerente; reunión semanal por Gerente con Dir Comercial Regional; reporte al comité directivo. Reporte semanal a Dir Comercial Regional por parte de Gerente país (resultado, proyección mensual/trimestral, faltantes, temas administrativos-operativos-logísticos, negociaciones), con copia a CEO y Dir Marca Propia.",
      "dueno": "Gerente Regional Comercial / Retail como generador y consumidor principal del dashboard regional; Gerente Comercial (País / Canal) para reportería local",
      "participantes": [
       "Analista/Ejecutivo(a) Comercial (aportan reportes propios)",
       "Odoo/EBS (fuentes)",
       "Cloud (procesamiento)",
       "Dir Comercial Wholesale y equipo (consumidores)",
       "Junta directiva"
      ],
      "cadencia": "Dashboard actualizado diario; reunión semanal por vendedor; reporte semanal por gerente país; revisión trimestral por Q",
      "disparador": "Cierre del día (actualización automática); inicio de semana (reuniones); cierre de Q (revisión de plan)",
      "output": "Dashboard vigente por marca/cliente/país/vendedor con semáforo; reporte semanal por gerente país al Dir Comercial Regional; input a decisiones de ajuste de forecast (8.1) y política (8.2)",
      "fuentes": "E5 Andrés Roizental F2 (reportería regional, vendedor top usando Cloud); E14 Santiago Ramírez F2 (dashboard automatizado con inventario y semanas de cobertura, presupuesto por Q); E35 Andrés Márquez F2 (reporte semanal a Andrés, Roberto, con copia a Bernardo y Alejandro); E63 John Mordoch F2 (dashboard On Render con visualización completa por país/cliente/familia, YTD, semáforos)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    }
   ]
  },
  {
   "prefijo": "9",
   "cat": "operativo",
   "n": "Ventas Retail",
   "n0": {
    "introduccion": {
     "estado": "pendiente"
    },
    "contexto": {
     "estado": "pendiente"
    },
    "gobernanza": {
     "estado": "pendiente"
    },
    "marco": {
     "estado": "pendiente"
    },
    "agenda": {
     "estado": "pendiente"
    },
    "anexos": {
     "estado": "pendiente"
    }
   },
   "procesos": [
    {
     "codigo": "9.1",
     "n": "Planificación comercial retail y forecast por tienda",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Construcción del forecast anual de ventas retail para países propios, franquicias y socios; presentación mensual a junta; reajuste ante desviaciones; bajada individualizada de metas por tienda con corrección al alza o baja por contexto local.",
      "dueno": "Gerente Regional Comercial / Retail",
      "participantes": [
       "Gerente Regional Comercial / Retail",
       "Gerente Comercial (País / Canal) al Detal (País) (País) (País) (por país)",
       "Analista de Sistemas / Datos",
       "Planificador Financiero"
      ],
      "cadencia": "Anual (montaje noviembre) con revisión trimestral y presentación mensual; ajustes puntuales por evento",
      "disparador": "Cierre del ciclo anual para el nuevo año; evento disruptivo (calamidad país) que dispara reajuste intermedio",
      "output": "Forecast anual aprobado, mensualizado por tienda y país, cargado en cuadros de seguimiento y comunicado por Lark a cada gerente de tienda con su meta individual",
      "fuentes": "E55 Handani F2 (2026-08-18); E47 María Eugenia F2 (2026-08-12); Documentación de Lark VE (cuadro estandarizado en Drive por Handani)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "9.2",
     "n": "Torre de control retail regional y consolidación de KPIs",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Diseño y operación del dashboard LATAM que consolida KPIs de todos los países (VPT, UPT, conversión, ticket promedio, cobertura de inventario, headcount por talla y género) a partir de queries desde los ERP de cada país y del diligenciamiento manual del cierre por gerente. Habilita decisiones ágiles basadas en data.",
      "dueno": "Gerente Regional Comercial / Retail",
      "participantes": [
       "Analista de Sistemas / Datos",
       "Gerente Comercial (País / Canal) al Detal (País) (País) (País) (por país)",
       "Gerente de Tienda / Supervisor de Ventas / Supervisor de Ventas",
       "Supervisor de Ventas (PA)",
       "Líder de Punto de Venta / Impulsadores (VE)"
      ],
      "cadencia": "Diaria (diligenciamiento por tienda) y semanal/mensual (consolidación regional); presentación mensual a junta",
      "disparador": "Cierre de caja diario en cada tienda; corte semanal y mensual",
      "output": "Dashboard actualizado por país y tienda con KPIs comerciales, de inventario y de personal; alertas de tiendas rezagadas; base para presentación ejecutiva mensual",
      "fuentes": "E55 Handani F2 (2026-08-18); E47 María Eugenia F2 (2026-08-12); E53 Blas García F2 (2026-08-18)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "9.3",
     "n": "Reposición de tiendas y kioscos",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Ciclo semanal donde la analista central genera sugerido de reposición por tienda a partir de inventarios y ventas; el supervisor local revisa aplicando ojo clínico por capacidad física del kiosco y patrones de venta; el pedido se aprueba y despacha desde bodega principal al punto de venta con carga posterior al inventario. Incluye proceso piloto PA de despacho directo desde Colón sin bodega intermedia.",
      "dueno": "Supervisor de Ventas (PA); Gerente Comercial (País / Canal) al Detal (País) (País) (País) (VE)",
      "participantes": [
       "Analista de Logística (Regional)",
       "Gerente de Operaciones y Logística y Logística",
       "Gerente Regional Comercial / Retail (aprueba pedidos)",
       "Gerente de Tienda / Supervisor de Ventas / Supervisor de Ventas",
       "Auxiliar / Ayudante de Bodega y Tráfico"
      ],
      "cadencia": "Semanal (montaje lunes, entrega miércoles-jueves) con pedidos extraordinarios puntuales",
      "disparador": "Sugerido semanal de reposición; venta especial o pedido corporativo que dispara reposición extraordinaria",
      "output": "Pedidos aprobados y despachados por tienda; mercancía cargada al inventario del punto de venta y disponible para la venta",
      "fuentes": "E53 Blas García F2 (2026-08-18); E47 María Eugenia F2 (2026-08-12); E55 Handani F2 (2026-08-18); referencia E57 Carlos Meléndez F2 (2026-08-19)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "9.4",
     "n": "Transferencias entre tiendas dentro del país",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Movimiento de mercancía entre puntos de venta del mismo país para atender ventas urgentes, cerrar quiebres puntuales o rebalancear stock. En PA lo ejecuta centralizadamente el supervisor; en VE se delegó recientemente a gerentes dentro del mismo centro comercial. Restricciones: Margarita requiere trámite CENIA por impuesto de salida.",
      "dueno": "Supervisor de Ventas (PA); Gerente de Tienda / Supervisor de Ventas / Supervisor de Ventas (VE) para intra-mall, Gerente Comercial (País / Canal) al Detal (País) (VE) para casos interior",
      "participantes": [
       "Gerente de Tienda / Supervisor de Ventas / Supervisor de Ventas (origen y destino)",
       "Auxiliar / Ayudante de Bodega y Tráfico",
       "Auxiliar / Ayudante de Bodega y Tráfico"
      ],
      "cadencia": "Por demanda (semanal en volumen, diaria en ocurrencia puntual)",
      "disparador": "Solicitud del gerente por venta urgente o cliente que exige modelo/color no disponible; detección de sobrestock a rebalancear",
      "output": "Mercancía movida físicamente al punto de venta destino, con traslado registrado en Odoo y ajuste de inventarios",
      "fuentes": "E53 Blas García F2 (2026-08-18); E47 María Eugenia F2 (2026-08-12); E55 Handani F2 (2026-08-18)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "9.5",
     "n": "Cierre de caja y consolidación diaria de ventas por tienda",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Actividad nocturna del cierre en cada tienda: cuadre físico de caja (efectivo, tarjetas, transferencias, dólares \"cachea\"), reporte condensado por línea de producto enviado por correo a Ventas al Detal y diligenciamiento manual del cuadro estandarizado en Drive con venta/unidades/transacciones. Diligenciamiento intencionalmente no automatizado para que el gerente \"sienta el número\".",
      "dueno": "Gerente de Tienda / Supervisor de Ventas / Supervisor de Ventas",
      "participantes": [
       "Encargado(a) de Tienda",
       "Asesor(a) de Ventas - Tienda",
       "Gerente Comercial (País / Canal) al Detal (País) (País) (País) (revisa consolidado)",
       "Gerente Regional Comercial / Retail (consume dashboard)"
      ],
      "cadencia": "Diaria (al cierre de operaciones del punto de venta)",
      "disparador": "Cierre de operaciones diarias de la tienda",
      "output": "Cierre de caja cuadrado; reporte condensado enviado a Ventas al Detal; fila diligenciada en cuadro consolidado regional en Drive que alimenta la Torre de Control",
      "fuentes": "E47 María Eugenia F2 (2026-08-12); E55 Handani F2 (2026-08-18); E53 Blas García F2 (2026-08-18)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "9.6",
     "n": "Operación diaria de tienda",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Rutina diaria del punto de venta: apertura (verificación de sistema, tasa actualizada, exhibiciones), atención al cliente con protocolo de servicio (Cubis Cubitt / Universidad Cubi PA), cumplimiento de uniforme y carnet, exhibición por líneas Casio (G-Shock, Edifice, BBG, deportiva, metálica, cuero, calculadoras, teclados) o Cubitt agrupada por familia, limpieza de vitrinas y etiquetas, normativa de uso de celular, cierre y aseguramiento físico.",
      "dueno": "Gerente de Tienda / Supervisor de Ventas / Supervisor de Ventas",
      "participantes": [
       "Encargado(a) de Tienda",
       "Asesor(a) de Ventas - Tienda",
       "Asesor(a) de Ventas - Tienda",
       "Personal de Seguridad (donde aplica)",
       "Coordinador(a) de Recursos Humanos"
      ],
      "cadencia": "Diaria (apertura y cierre) con actividades continuas durante horario comercial",
      "disparador": "Apertura de horario comercial del centro comercial",
      "output": "Punto de venta operativo con exhibición conforme a estándar, personal en cumplimiento y experiencia de cliente entregada",
      "fuentes": "E53 Blas García F2 (2026-08-18); E47 María Eugenia F2 (2026-08-12); E55 Handani F2 (2026-08-18); referencia E50 Sabrina y Reina F2 (2026-08-16)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "9.7",
     "n": "Supervisión y visitas periódicas a tiendas",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Recorrido regular del supervisor a cada punto de venta para verificar exhibición, uniforme, cumplimiento de normativa, sistemas y cámaras, resolución de incidencias en piso y acompañamiento al gerente. En PA un único supervisor cubre las 11 tiendas semanalmente. En VE 3 supervisores rotan interior más la Gerente de Ventas al Detal.",
      "dueno": "Supervisor de Ventas (PA); Gerente Comercial (País / Canal) al Detal (País) (País) (VE) coordina equipo de supervisores",
      "participantes": [
       "Supervisor de Ventas (VE)",
       "Gerente de Tienda / Supervisor de Ventas / Supervisor de Ventas",
       "Gerente Regional Comercial / Retail (visitas de acompañamiento cuando viaja al país)"
      ],
      "cadencia": "Semanal (cada tienda urbana); mensual o por viaje planificado al interior",
      "disparador": "Programación semanal; incidencia en piso reportada por gerente; visita periódica al interior",
      "output": "Acta o registro de visita (hoy en papel en VE); observaciones corregidas en piso o escaladas por Lark/WhatsApp; insumos para reunión semanal con gerentes",
      "fuentes": "E53 Blas García F2 (2026-08-18); E47 María Eugenia F2 (2026-08-12); E55 Handani F2 (2026-08-18)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "9.8",
     "n": "Apertura de tienda o kiosco propio",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Ciclo end-to-end desde identificación del local (con apoyo del supervisor por contactos en administradoras de malls), ACP financiero regional (proyección ventas/gastos/márgenes/payback bajo regla de 3 años), diseño de layout con arquitecto externo, gestión de permisos (alcaldía, bomberos, patente, publicidad), plantilla por turno respetando ley, contratación de POS y merchant, adecuación IT y cámaras, instalación de visual merchandising, hasta inauguración. Orquestado como proyecto formal por la PMO.",
      "dueno": "Gerente de Proyectoss (PMO) para el proyecto; Gerente Regional Comercial / Retail para ACP y decisión de negocio",
      "participantes": [
       "Gerente de Proyectoss (PMO)",
       "Gerente de Proyectoss",
       "Gerente Regional Comercial / Retail",
       "Planificador Financiero",
       "Gerente Regional Comercial / Retail",
       "Supervisor de Ventas (PA)",
       "Gerente Comercial (País / Canal) al Detal (País) (País) (País) (VE)",
       "Gerente Regional de Visual Merchandising",
       "Coordinador(a) de Visual Merchandising",
       "Arquitecto (proveedor externo)",
       "Gerente de Recursos Humanos",
       "Coordinador(a) de Tesorería / Cobranzas / Cobranzas",
       "Coordinador(a) de Sistemas",
       "Gerente de Marketing"
      ],
      "cadencia": "Por proyecto (hasta 8 aperturas paralelas en pico; trimestral en cadencia normal)",
      "disparador": "Oportunidad de local identificada; decisión de junta sobre expansión regional",
      "output": "Tienda o kiosco operativo con inventario, personal, POS activo, visual instalado, permisos vigentes y evento de inauguración ejecutado; ACP archivado como línea base para medir payback",
      "fuentes": "E53 Blas García F2 (2026-08-18); E55 Handani F2 (2026-08-18); E47 María Eugenia F2 (2026-08-12); E9 Ricardo Candanedo F1 (2026-06-23); referencia E50 Sabrina y Reina F2 (2026-08-16)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "9.9",
     "n": "Remodelación y renovación de imagen de tienda",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Adecuación planificada de puntos de venta existentes: cambio de iluminación blanca/azul a cálida, cambio de paneles, incorporación de mobiliario boutique Casio, intervención de piso o vitrinas dañadas, alineación con nuevo estándar visual regional. Se agrupan intervenciones múltiples para no intervenir dos veces la misma sala. Proveedor de aperturas suele ejecutar remodelaciones.",
      "dueno": "Gerente Regional Comercial / Retail (define estándar y prioriza cola)",
      "participantes": [
       "Gerente Regional de Visual Merchandising",
       "Gerente Comercial (País / Canal) al Detal (País) (País) (País) (por país)",
       "Supervisor de Ventas",
       "Arquitecto/Proveedor de Remodelación",
       "Gerente de Proyectoss (PMO)"
      ],
      "cadencia": "Por proyecto (agrupada en cola cuando el material está disponible)",
      "disparador": "Envejecimiento de imagen; disponibilidad de material del proveedor; alineación con nuevo concepto; daño estructural o de mobiliario",
      "output": "Tienda renovada operando bajo nuevo estándar visual y funcional; presupuesto ejecutado; proyecto cerrado en PMO",
      "fuentes": "E47 María Eugenia F2 (2026-08-12); E55 Handani F2 (2026-08-18); referencia E50 Sabrina y Reina F2 (2026-08-16)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "9.10",
     "n": "Gestión de franquicias Cubitt",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Diseño y operación del modelo de franquicia Cubitt: contrato estandarizado (primer caso Nicaragua próximo a abrir; aplicado a Dominicana y Honduras), definición del fee, protocolo de reportería obligatoria de la franquicia, auditoría de cumplimiento, transferencia de herramientas de gestión y acompañamiento continuo. Distinto de franquicias Casio (8.8) porque Cubitt lo está creando el grupo desde cero.",
      "dueno": "Gerente Regional Comercial / Retail",
      "participantes": [
       "Gerente Regional Comercial / Retail",
       "Gerente Regional Comercial / Retail (mantiene compra y negociación bajo estándares regionales)",
       "Gerente Regional de Visual Merchandising",
       "Coordinador(a) de Recursos Humanos",
       "Legal Corporativo",
       "Planificador Financiero"
      ],
      "cadencia": "Por evento (firma nueva franquicia); mensual (reportería y consolidación en Torre); anual (auditoría integral)",
      "disparador": "Interés de franquiciado potencial en nuevo mercado; renovación o modificación de contrato existente",
      "output": "Contrato firmado bajo modelo estandarizado; franquicia operativa con reportería fluyendo a Torre de Control; auditoría periódica ejecutada",
      "fuentes": "E55 Handani F2 (2026-08-18)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "9.11",
     "n": "Gestión de socios y partners regionales retail",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Coordinación operativa con unidades retail que no son propiedad plena ni franquicia estándar: Costa Rica (socios 50/50), Guatemala (partner operador con fee), Ecuador (Atensa), Boutique aeropuerto PA. Acceso a queries por partner para consumir información sin acceder a sus sistemas, monitoreo de P&L por tienda-partner para renegociar cuando entra en rojo, y traslado de estándares regionales (metas, follow up, comisiones, visual).",
      "dueno": "Gerente Regional Comercial / Retail",
      "participantes": [
       "Gerente Regional Comercial / Retail",
       "Gerente Regional Comercial / Retail",
       "Planificador Financiero",
       "Analista de Sistemas / Datos",
       "Gerente Regional de Visual Merchandising"
      ],
      "cadencia": "Mensual (revisión P&L por tienda-partner); trimestral (revisión de acuerdos comerciales)",
      "disparador": "Cierre mensual de P&L; señal negativa en KPIs de tienda-partner que dispara renegociación; oportunidad de expansión con nuevo partner",
      "output": "P&L revisado y con acciones correctivas; acuerdos comerciales renegociados cuando aplica; estándares regionales aplicados en el partner",
      "fuentes": "E55 Handani F2 (2026-08-18)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "9.12",
     "n": "Auditoría de tienda y autoauditoría del gerente",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Verificación periódica del estándar operativo, visual y de mantenimiento. Hoy como acta de visita en papel que el Gerente Regional Retail deja cuando viaja a un país. En desarrollo (to-be) aplicación de autoauditoría donde el gerente sube fotos, marca mantenimiento pendiente y remodelaciones necesarias, y la app notifica cuando una tienda excede intervalo. Diseño operativo separado de la Torre de Control comercial.",
      "dueno": "Gerente Regional Comercial / Retail",
      "participantes": [
       "Gerente Comercial (País / Canal) al Detal (País) (País) (País) (por país)",
       "Supervisor de Ventas",
       "Gerente de Tienda / Supervisor de Ventas / Supervisor de Ventas (autoauditoría)"
      ],
      "cadencia": "Mensual (autoauditoría del gerente); por viaje regional (auditoría externa)",
      "disparador": "Programación mensual; visita del Gerente Regional Retail; alerta de la aplicación por intervalo excedido",
      "output": "Acta de visita con hallazgos y responsables (as-is); registro digital de autoauditoría con fotos y pendientes por país (to-be); cola de mantenimiento y remodelación priorizada",
      "fuentes": "E55 Handani F2 (2026-08-18)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "9.13",
     "n": "Garantías y servicio postventa en tienda",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Recepción del reclamo en tienda, decisión inmediata de cambio versus derivación a taller según criticidad y disponibilidad, ejecución diferenciada por marca: Casio con relojero de tienda (cambios menores) o relojera central (reparaciones mayores) más envío de número de serie a analista corporativo que reporta a Casio Japón para nota de crédito; Cubitt vía flujo Lark creado por Servicio Técnico PA con recepción y ajuste mensual en bodega. En VE existe sistema paralelo Cisco. Incluye recepción de garantías de clientes que compraron en tiendas de terceros que revenden la marca.",
      "dueno": "Gerente de Servicio Técnico (por país)",
      "participantes": [
       "Gerente de Tienda / Supervisor de Ventas / Supervisor de Ventas (recepción del reclamo)",
       "Técnico(a) de Servicio / Relojero(a) (reparaciones menores Casio)",
       "Técnico(a) de Servicio / Relojero(a)",
       "Técnico(a) de Servicio / Relojero(a)",
       "Especialista de Producto / Proyecto (reporte a Casio Japón)",
       "Cliente"
      ],
      "cadencia": "Diaria (recepción en tienda); mensual (consolidación y revisión en bodega central Cubitt)",
      "disparador": "Cliente presenta reclamo en el punto de venta",
      "output": "Producto cambiado o reparado al cliente; nota de crédito solicitada a fábrica cuando aplica; registro de garantía procesada en Lark/Cisco; ajuste de inventario",
      "fuentes": "E53 Blas García F2 (2026-08-18); E47 María Eugenia F2 (2026-08-12); referencia E51 Yusseth-Johan-Gustavo F2 (2026-08-18); E32 Jose F2 (2026-08-07)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "9.14",
     "n": "Inventarios selectivos y general de tienda",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Conteos parciales semanales por 2-3 líneas de producto que el gerente ejecuta con tablet en WMS y el supervisor valida contra existencia de sistema, con ajustes al día siguiente. Inventario general anual bajo la misma herramienta. En VE hoy es más manual, aunque PA ha compartido la práctica de WMS/tablet como benchmark. Especial cuidado en fechas fuertes: inventario antes y después. Cultura asigna responsabilidad económica al personal por faltantes.",
      "dueno": "Supervisor de Ventas (PA); Supervisor(a) de Bodega / Despacho (VE)",
      "participantes": [
       "Gerente de Tienda / Supervisor de Ventas / Supervisor de Ventas",
       "Encargado(a) de Tienda",
       "Asesor(a) de Ventas - Tienda",
       "Gerente Comercial (País / Canal) al Detal (País) (País) (País) (VE)",
       "Analista de Logística"
      ],
      "cadencia": "Semanal (2-3 líneas por tienda); anual (general consolidado); adicional antes y después de fecha comercial fuerte",
      "disparador": "Programación semanal por línea; calendario anual; proximidad de fecha comercial fuerte",
      "output": "Diferencias identificadas y comunicadas a la tienda para ajuste; inventario cuadrado en sistema; registro histórico para análisis de merma",
      "fuentes": "E53 Blas García F2 (2026-08-18); E47 María Eugenia F2 (2026-08-12)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "9.15",
     "n": "Manejo de efectivo y depósito de ventas de tienda",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Gestión del efectivo generado por venta diaria. En PA la mayoría deposita directo en banco del propio centro comercial; una tienda sin banco cercano opera con mensajero de contabilidad. En VE el transporte del grupo (lunes-miércoles-viernes) recoge efectivo, documentos y facturas y los entrega a tesorería. Interior VE por valija MRW o Zoom con documentación; efectivo se deposita localmente. Incluye gestión de transferencias con retardo bancario y plan B ante falla de merchant (dos POS de bancos distintos por tienda en PA).",
      "dueno": "Gerente de Tienda / Supervisor de Ventas / Supervisor de Ventas (custodia y depósito diario); Coordinador(a) de Tesorería / Cobranzas / Cobranzas (recepción y conciliación); Personal de Contabilidad (verificación)",
      "participantes": [
       "Asesor(a) de Ventas - Tienda",
       "Encargado(a) de Tienda",
       "Auxiliar Contable (PA)",
       "Auxiliar / Ayudante de Bodega y Tráfico (VE)",
       "Oficial de Cuenta del Banco"
      ],
      "cadencia": "Diaria (depósito por tienda); lunes-miércoles-viernes (transporte VE); por valija en interior según acumulación",
      "disparador": "Cierre de caja diario con efectivo consolidado",
      "output": "Efectivo depositado en cuenta bancaria del grupo; comprobantes y documentos físicos entregados a contabilidad para conciliación; incidencias de POS reportadas y resueltas con banco",
      "fuentes": "E53 Blas García F2 (2026-08-18); E47 María Eugenia F2 (2026-08-12)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "9.16",
     "n": "Gestión operativa del personal de tiendas",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Ejecución en primera línea del ciclo de personal de tienda: aprobación de plantillas por turno y horario respetando ley (una persona no puede trabajar 12h), cobertura de faltantes con movimientos entre tiendas, aprobación de permisos y vacaciones, primera instancia disciplinaria, gestión de dotación con headcount por talla y género, inducción y refrescamiento de normativa, coordinación de capacitación de producto y protocolo de servicio. RRHH cierra el circuito para nómina formal.",
      "dueno": "Gerente Comercial (País / Canal) al Detal (País) (País) (País) (VE); Supervisor de Ventas (PA)",
      "participantes": [
       "Supervisor de Ventas (VE)",
       "Gerente de Tienda / Supervisor de Ventas / Supervisor de Ventas",
       "Encargado(a) de Tienda",
       "Gerente Regional Comercial / Retail (política regional dotación y protocolo)",
       "Coordinador(a) de Recursos Humanos (regional)",
       "Gerente de Recursos Humanos (por país)",
       "Analista de Recursos Humanos / Nómina"
      ],
      "cadencia": "Semanal (plantillas y coberturas); mensual (permisos, evaluaciones); por evento (disciplina, inducción, refrescamiento)",
      "disparador": "Ausencia o rotación de personal; incidencia disciplinaria detectada; nueva contratación; llegada de dotación o cambio de uniforme; nuevo producto que exige capacitación",
      "output": "Plantilla cubierta y operativa; incidencia disciplinaria escalada a RRHH cuando amerita; dotación entregada con acta firmada; personal capacitado y evaluado",
      "fuentes": "E47 María Eugenia F2 (2026-08-12); E53 Blas García F2 (2026-08-18); E55 Handani F2 (2026-08-18); referencia E37 Evelyn Manso y Mayari F2"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "9.17",
     "n": "Comisiones e incentivos del personal retail",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Cálculo, pago y evolución del esquema de compensación variable del personal de tienda (gerentes de país, gerentes de tienda, asesores). Hoy opera por país con esquemas heredados. El Gerente Regional Retail está lanzando para el próximo semestre (fin 2026) un esquema homologado regional único más incentivos discretos para gerentes de país y asesores atados a KPIs (conversión, UPT, VPT).",
      "dueno": "Gerente Regional Comercial / Retail (diseño del esquema homologado); Gerente de Recursos Humanos (cálculo y pago mensual)",
      "participantes": [
       "Gerente Regional Comercial / Retail (aprueba esquema)",
       "Planificador Financiero (revisa impacto en costos)",
       "Gerente Comercial (País / Canal) al Detal (País) (País) (País) (por país)",
       "Analista de Recursos Humanos / Nómina",
       "Gerente de Tienda / Supervisor de Ventas / Supervisor de Ventas"
      ],
      "cadencia": "Mensual (cálculo y pago); anual o semestral (revisión de esquema)",
      "disparador": "Cierre mensual de venta y KPIs por tienda y asesor; lanzamiento de nuevo esquema homologado",
      "output": "Comisiones e incentivos calculados y pagados; esquema homologado regional publicado y activo (to-be, fin 2026)",
      "fuentes": "E55 Handani F2 (2026-08-18); referencia E37 Evelyn Manso y Mayari F2"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "9.18",
     "n": "Mantenimiento e incidencias de infraestructura de tienda",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Gestión de infraestructura física: cuotas de mantenimiento del centro comercial y extraordinarias, permisos con administración del mall y respuesta a órdenes de chequeo, cámaras (con IT y monitoreo externo diario en VE), POS con oficial de cuenta del banco, alarmas contra incendios, permisos de alcaldía y bomberos vigentes, ajustes de vitrinas o piso dañado, resolución de incidencias urgentes. El supervisor de tienda opera como puente entre la tienda y otros departamentos.",
      "dueno": "Supervisor de Ventas (PA); Gerente Comercial (País / Canal) al Detal (País) (País) (País) (VE)",
      "participantes": [
       "Gerente de Tienda / Supervisor de Ventas / Supervisor de Ventas",
       "Coordinador(a) de Sistemas",
       "Coordinador(a) de Tesorería / Cobranzas / Cobranzas (POS y banca)",
       "Contabilidad (cuotas del centro comercial)",
       "Proveedores externos de mantenimiento",
       "Administración del Centro Comercial"
      ],
      "cadencia": "Continua (respuesta a incidencias por demanda); mensual (cuotas y renovaciones); por evento (renovación de contrato de local)",
      "disparador": "Incidencia reportada por gerente; notificación del centro comercial (orden de chequeo, cambio de cuota); vencimiento de permiso o contrato; falla de POS o cámara",
      "output": "Incidencia resuelta con proveedor pagado y facturado; cuota o permiso al día; POS y cámaras operativos; documentación del centro comercial atendida",
      "fuentes": "E53 Blas García F2 (2026-08-18); E47 María Eugenia F2 (2026-08-12); E55 Handani F2 (2026-08-18)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    }
   ]
  },
  {
   "prefijo": "10",
   "cat": "operativo",
   "n": "Ventas Web (E-Commerce)",
   "n0": {
    "introduccion": {
     "estado": "pendiente"
    },
    "contexto": {
     "estado": "pendiente"
    },
    "gobernanza": {
     "estado": "pendiente"
    },
    "marco": {
     "estado": "pendiente"
    },
    "agenda": {
     "estado": "pendiente"
    },
    "anexos": {
     "estado": "pendiente"
    }
   },
   "procesos": [
    {
     "codigo": "10.1",
     "n": "Planificación comercial de e-commerce y forecast por canal",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Construcción del forecast anual y trimestral por canal digital (sitios propios, marketplaces LATAM, marketplaces USA, WhatsApp, venta en vivo), asignación de presupuesto de pauta por canal (coordinada con Marketing regional), definición de metas grupales de venta y de tiempo de respuesta de chats, y comunicación de metas al equipo de e-commerce por país. Hoy opera informalmente sin reportería estructurada al cierre de mes; una acción anual la baja el Director Comercial Regional con un incremento del 10% sobre el año previo, sin desglose por línea de negocio dentro del e-commerce.",
      "dueno": "Gerente de E-commerce / Ventas Web (por país); Gerente de E-commerce / Ventas Web (rol en formación regional según Natasha Betancourt)",
      "participantes": [
       "Gerente Regional Comercial / Retail",
       "Planificador Financiero",
       "Gerente Regional de Marketing (planificación de pauta digital)",
       "Supervisor(a) de Operaciones E-commerce (Colombia)",
       "Analista de Sistemas / Datos"
      ],
      "cadencia": "Anual (montaje con corte fiscal); revisión trimestral por canal; presentación mensual informal a Bernardo/Andrés",
      "disparador": "Cierre del ciclo anual para el nuevo año; alineación con forecast global de la corporación",
      "output": "Forecast anual aprobado con desglose por canal digital, metas comunicadas al equipo, presupuesto de pauta digital asignado a Marketing por país",
      "fuentes": "E-16 Jesmir Ojeda F1 (2026-07-02); E-41 Jesmir, Ricardo Martínez y Leonardo F2 (2026-08-10) — líneas 259-267 (meta anual grupal sin desglose por línea; reportería informal); E-30 Isabella Roizental F2 (2026-08-06) — líneas 143-146 (reuniones mensuales P&L Kenex USA); E-22 Natasha Betancourt F1 (2026-07-07) — líneas 13, 91 (transición organizacional del e-commerce)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "10.2",
     "n": "Onboarding y expansión de marketplaces",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Desde la decisión estratégica de entrar a un marketplace nuevo (Kenex USA en 15 marketplaces distintos; en VE reciente entrada al Marketplace de Yummy próximo a lanzar) hasta la operación estable: postulación, aceptación, subida de todos los listings con requerimientos específicos por marketplace (cada uno pide campos distintos, no hay Excel único que sirva para todos), conexión de cuenta bancaria, integración con Shopify como agregador central, activación del canal de customer service específico, y pruebas de flujo end-to-end. Incluye la reactivación de cuentas suspendidas (Amazon reabierta el año pasado con apoyo de agencia especializada).",
      "dueno": "Gerente de E-commerce / Ventas Web (USA — Isabella); Gerente de E-commerce / Ventas Web (por país que acomete la expansión)",
      "participantes": [
       "Gerente Comercial (País / Canal) (Marca Propia para Cubitt USA",
       "Comercial Regional para LATAM)",
       "Gerente Regional de Marketing",
       "Agencia externa especializada (Amazon growth agency contratada por Kenex USA)",
       "Diseñador(a) / Analista de Contenido (Cintia en Colombia",
       "equivalentes por país)"
      ],
      "cadencia": "Por evento (nueva plataforma identificada); revisión periódica de marketplaces subactivos para reactivación",
      "disparador": "Oportunidad comercial identificada (nuevo marketplace relevante en mercado); necesidad de reactivar cuenta previamente cerrada; expansión geográfica de la marca",
      "output": "Marketplace operativo con listings vigentes, integración con Shopify y contabilidad activa, primer pedido procesado end-to-end, cuentas bancarias y flujo de conciliación activos",
      "fuentes": "E-30 Isabella Roizental F2 (2026-08-06) — líneas 45-51 (15 marketplaces con listings específicos por cada uno); E-41 Jesmir F2 (2026-08-10) — líneas 70-74 (apertura próxima de Yummy)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "10.3",
     "n": "Gestión operativa de sitios propios Shopify",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Operación diaria de las webs propias de Cubitt y Casio por país (Cubitt VE, Casio VE, Cubitt Deltadir CO, Cubitt Kenex USA, y equivalentes en otros países): actualización de inventario y precios, publicación de productos nuevos (Cintia en Colombia carga masiva a todas las webs desde Odoo), cambio de banners y contenido visual coordinado con Marketing, activación de nuevos métodos de pago (Cubitt VE agregó Cachea como método de pago en la web hace un mes; también pago móvil, tarjetas débito/crédito Banco Plaza), integración con MRW y Zoom para generación automática de guía, monitoreo de disponibilidad, precios y reglas de envío. Incluye la migración pendiente de todos estos métodos a las webs de Casio.",
      "dueno": "Gerente de E-commerce / Ventas Web (por país); Gerente de E-commerce / Ventas Web (en formación)",
      "participantes": [
       "Diseñador(a) / Analista de Contenido (Cintia global en Colombia)",
       "Supervisor(a) de Operaciones E-commerce (Colombia — Tatiana)",
       "Marketing (banners, campañas visuales)",
       "Coordinador(a) de Sistemas",
       "Gerente de Proyectoss (PMO — para integraciones nuevas)"
      ],
      "cadencia": "Continua (actualización diaria); por evento (lanzamiento de producto nuevo, cambio de banner de campaña, activación de nuevo método de pago)",
      "disparador": "Llegada de mercancía nueva; campaña de Marketing programada; incidencia técnica en pasarela de pago o integración",
      "output": "Web operativa con catálogo actualizado, precios vigentes, banners de la campaña activa, métodos de pago funcionando y guías generándose automáticamente",
      "fuentes": "E-16 Jesmir F1 (2026-07-02) — líneas 39, 50-53; E-41 Jesmir F2 (2026-08-10) — líneas 88-94 (métodos de pago recientes, migración pendiente Casio); E-56 Leslie F2 (2026-08-19) — líneas 50, 62 (Colombia crece 80% mensual en web); E-22 Natasha F1 (2026-07-07) — líneas 13 (más de 15 websites en transición a departamento propio); referencia E-30 Isabella F2 (2026-08-06) — línea 116-117 (Shopify Kenex USA con paypal, tarjeta, Klarna)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "10.4",
     "n": "Gestión operativa de marketplaces LATAM",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Operación diaria del canal de venta por marketplace LATAM: monitoreo de pedidos entrantes en el CRM Mercateli (agregador de canales), extracción de la data de pedidos desde el marketplace y cruce con Odoo (los pedidos de Cachea entran a Odoo incluidos los cancelados, por lo que hay un Analista de Pedidos dedicado —Jaker en VE— que hace el cruce manual antes de enviar a preparación), participación en promociones estructurales del marketplace (Cachea 0%, Prime Day de Cachea, cosecha), gestión del canal Cachea Link para venta por WhatsApp con integración de pago Cachea, monitoreo de tiempos de respuesta como KPI del marketplace, gestión de la promesa de entrega. En VE llega hasta 120-130 pedidos por día de Cachea; en pico diciembre hasta 350 por día.",
      "dueno": "Gerente de E-commerce / Ventas Web (por país)",
      "participantes": [
       "Asesor(a) de Ventas Web (Jaker VE)",
       "Asesor(a) de Ventas Web (chats Cachea)",
       "Supervisor(a) de Operaciones E-commerce (Colombia — Tatiana)",
       "Diseñador(a) / Analista de Contenido",
       "Marketing (participación en promociones estructurales del marketplace)"
      ],
      "cadencia": "Continua (monitoreo permanente durante horario operativo); por evento (participación en promociones estructurales del marketplace)",
      "disparador": "Pedido entrante en el marketplace; anuncio de promoción estructural del marketplace; incidencia con integración",
      "output": "Pedidos procesados y facturados; participación en promociones ejecutada con inventario suficiente; KPIs de tiempo de respuesta cumplidos",
      "fuentes": "E-16 Jesmir F1 (2026-07-02) — líneas 27, 52-53, 65, 126, 137; E-41 Jesmir F2 (2026-08-10) — líneas 64-66, 126-133, 197-198 (proceso de extracción manual por pedidos cancelados en Odoo), 303-306 (Cachea 0%); referencia E-56 Leslie F2 (2026-08-19) — línea 62-66 (Colombia no usa Cachea, todo por web propia)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "10.5",
     "n": "Gestión operativa de marketplaces USA",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Operación diaria de los 15 marketplaces USA que opera Kenex USA con Cubitt como única marca (Casio no se vende en USA): impresión y envío diario de órdenes al warehouse Miami que no tiene acceso a Amazon, respuesta a customer service de Amazon (centralizada en Isabella, más de 7 años haciéndolo personalmente), envío de inventario a Amazon FBA varias veces por semana (con apoyo de agencia especializada nueva desde hace 2 meses), gestión del inventario por marketplace (poner en cero cuando se agota un producto para evitar sobreventa), operación paralela por la compañía hermana TEC 770 exclusiva para Amazon, uso de Sellerboard como herramienta analítica.",
      "dueno": "Gerente de E-commerce / Ventas Web (Isabella Roizental)",
      "participantes": [
       "Gerente Regional de Marketing (Alejandro Roizental)",
       "Agencia externa Amazon Growth (nueva, desde 2 meses)",
       "Asistente de E-commerce / Almacén Web (2 personas)",
       "Customer Service USA remoto (1 persona)",
       "Personal Administrativo remoto (Andrés Mendoza VE, Víctor Tobar VE)",
       "Contadora externa (Camila Roizental)"
      ],
      "cadencia": "Diaria (impresión de órdenes, customer service, envío a FBA); semanal (llamadas con agencia Amazon); por evento (Prime Day, campañas)",
      "disparador": "Pedidos entrantes diarios; niveles bajos de inventario en FBA; devoluciones acumuladas (miles por mes según Isabella)",
      "output": "Pedidos impresos y enviados al warehouse; inventario FBA repuesto; customer service atendido; conciliación de pagos por marketplace ejecutada",
      "fuentes": "E-30 Isabella Roizental F2 (2026-08-06) — líneas 17, 25, 31, 45-53, 71, 75, 108-113 (Sellerboard, 15 marketplaces, TEC 770, agencia Amazon, devoluciones masivas)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "10.6",
     "n": "Venta asistida por chat multiplataforma",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Recepción del cliente por WhatsApp Business o DM redirigido desde redes sociales, atención por un asesor de ventas digitales usando Mercateli como CRM, cotización con las listas de precios, monteo del pedido directamente en Odoo (no en la web para no perder la venta redirigiendo), cierre y coordinación de pago vía pago móvil o transferencia. En abril 2026 en VE, la venta por WhatsApp superó a la web de Cubitt (USD 37K vs USD 30K); en VE hay 6 asesores dedicados a chat. Incluye la operación específica del canal Cachea Link (WhatsApp con integración de pago Cachea).",
      "dueno": "Gerente de E-commerce / Ventas Web (por país)",
      "participantes": [
       "Asesor(a) de Ventas Web (equipo dedicado — 6 en VE)",
       "Coordinador(a) de Soporte / Servicio al Cliente",
       "Asesor(a) de Ventas Web (montaje en Odoo)",
       "Marketing (redirección desde redes sociales)",
       "Coordinador(a) de Tesorería / Cobranzas / Cobranzas (validación de pago móvil/transferencia)"
      ],
      "cadencia": "Continua (todo el horario operativo)",
      "disparador": "Cliente escribe a WhatsApp Business, DM de red social redirigido, o link Cachea de WhatsApp",
      "output": "Pedido montado en Odoo con pago validado, cliente informado de la promesa de entrega, cierre de la venta",
      "fuentes": "E-16 Jesmir F1 (2026-07-02) — líneas 64-66 (Cachea Link, venta WhatsApp), 138-139 (abril WhatsApp > Web); E-41 Jesmir F2 (2026-08-10) — líneas 95-104 (Mercateli como CRM, botonera de derivación); referencia E-56 Leslie F2 (2026-08-19) — línea 58 (Gaby servicio al cliente Colombia por WhatsApp con venta directa)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "10.7",
     "n": "Toma y montaje del pedido en Odoo/WMS",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Ingreso del pedido en Odoo (venido de Shopify, marketplace LATAM, marketplace USA vía TEC 770, WhatsApp o cliente presencial que retira), asignación del origen del pedido (Jesmir mantiene traceabilidad por canal), asignación del método de envío (delivery propio, MRW, Zoom, retiro en oficina de Cachea, retiro en tienda), envío del comando de preparación al WMS del almacén web (aplicación en tablet), asignación al preparador. El asesor de ventas dispara la preparación cuando el pago está validado.",
      "dueno": "Asesor(a) de Ventas Web (Jaker VE — dedicado a montaje de todas las órdenes)",
      "participantes": [
       "Asesor(a) de Ventas Web",
       "Gerente de E-commerce / Ventas Web (supervisa)",
       "Supervisor(a) de Bodega / Despacho (Ricardo Martínez VE)",
       "Asistente de E-commerce / Almacén Web"
      ],
      "cadencia": "Continua (por pedido)",
      "disparador": "Confirmación de pago validado del cliente; en Cachea, confirmación del pago dentro del marketplace",
      "output": "Pedido en Odoo con origen, método de envío y método de pago asignados; instrucción en tablet WMS para preparar; timer del SLA de despacho activado",
      "fuentes": "E-16 Jesmir F1 (2026-07-02) — líneas 55-72; E-41 Jesmir, Ricardo y Leonardo F2 (2026-08-10) — líneas 197-198, 213-220 (proceso completo Cachea → Odoo → tablet → facturación)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "10.8",
     "n": "Validación de pagos y conciliación multi-instrumento",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Validación de cada pago recibido por el canal web: los asesores mandan el número de pedido al grupo Lark \"Confirmaciones\", el Gerente de Ventas Web (VE — Jesmir hoy) o Verónica (analista de pagos VE en construcción) entra al portal del banco y verifica referencia contra referencia y monto, y responde por Lark con fecha/referencia/monto. Instrumentos habilitados en Cubitt VE web: pago móvil, transferencia, tarjeta débito/crédito Banco Plaza, Cachea 0% (a 14 días). Instrumentos habilitados en Kenex USA: PayPal, tarjeta de crédito, Klarna. En USA la conciliación mensual de cada marketplace la ejecuta hoy el Analista Administrativo remoto. La actividad de validación en VE se reconoce explícitamente por Jesmir como \"actividad que debería estar en Contabilidad\" pero quedó en Ventas Web por rapidez.",
      "dueno": "Gerente de E-commerce / Ventas Web (por país — situación transitoria hasta migrar a Contabilidad/Tesorería)",
      "participantes": [
       "Asesor(a) de Ventas Web (envía notificación)",
       "Analista de Cuentas por Cobrar (Verónica VE — figura en construcción)",
       "Contabilidad (destino natural de la actividad)",
       "Coordinador(a) de Tesorería / Cobranzas / Cobranzas"
      ],
      "cadencia": "Continua (por pago recibido)",
      "disparador": "Pago recibido notificado por el asesor; conciliación mensual de marketplace en USA",
      "output": "Pago verificado y confirmado en Lark; asesor libera el pedido a preparación; conciliación mensual de cada marketplace cerrada en QuickBooks/Odoo",
      "fuentes": "E-41 Jesmir, Ricardo y Leonardo F2 (2026-08-10) — líneas 44-58, 78-80 (Jesmir reconoce que debería estar en Contabilidad); E-16 Jesmir F1 (2026-07-02) — línea 96 (bajada inicial de Cachea la aprueba Bernardo por impacto en caja); referencia E-30 Isabella F2 (2026-08-06) — líneas 53, 128-131 (conciliación mensual delegada al Analista Administrativo remoto)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "10.9",
     "n": "Preparación, embalaje y escaneo de pedidos e-commerce",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Ejecución física de la preparación del pedido en el almacén web (separado del almacén principal): el preparador ve la orden en la tablet WMS, busca el producto físicamente en el almacén, arma el paquete, imprime la etiqueta o guía según el canal (guía Cachea generada por Cachea; guía MRW/Zoom generada por integración desde la web; guía manual con datos del cliente para venta WhatsApp), pega la guía al paquete, escanea el código de la caja hasta la agencia (Cachea desde mayo 2026 exige que cada caja se ingrese al sistema con pistola), y envía foto de la etiqueta a un grupo Lark para que Facturación libere la factura. Distinto del almacén principal por la presencia de códigos por pedido, la exigencia de la pistola para Cachea, y la operación como \"tienda\" con inventario propio.",
      "dueno": "Supervisor(a) de Bodega / Despacho (Ricardo Martínez VE); Auxiliar / Ayudante de Bodega y Tráfico (Miami en USA)",
      "participantes": [
       "Auxiliar / Ayudante de Bodega y Tráfico (Leonardo VE)",
       "Asistente de E-commerce / Almacén Web",
       "Gerente de E-commerce / Ventas Web (supervisa capacidad y organización del almacén web)"
      ],
      "cadencia": "Continua (por pedido)",
      "disparador": "Pedido en la tablet WMS listo para preparar",
      "output": "Pedido físicamente empacado, guía pegada, caja escaneada en agencia (cuando aplica Cachea), foto de la etiqueta enviada al grupo Lark de facturación",
      "fuentes": "E-41 Ricardo Martínez F2 (2026-08-10) — líneas 128-135, 220-224 (proceso completo con WMS, escaneo Cachea, foto para facturación); E-16 Jesmir F1 (2026-07-02) — líneas 55-56, 60-61 (evolución del proceso desde hojas impresas hasta WMS con tablet); referencia E-30 Isabella F2 (2026-08-06) — línea 89 (dos personas de warehouse Miami sin acceso a marketplaces preparan las órdenes impresas por Isabella)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "10.10",
     "n": "Facturación fiscal del pedido web",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Emisión de la factura del pedido web una vez que el almacén termina la preparación y envía la foto de la etiqueta al grupo Lark. En VE hoy se hace física (Alexandra en VE opera la impresora fiscal), lo que genera cuello de botella porque las cajas quedan abiertas esperando la factura antes de cerrar. Migración pendiente a facturación digital anunciada para eliminar el cuello. Cada caja de Cachea requiere adicionalmente una guía impresa que el Analista de Pedidos Web (Jaker) enlaza con la factura antes de entregarla al almacén.",
      "dueno": "Analista de Facturación (Alexandra VE)",
      "participantes": [
       "Asistente de E-commerce / Almacén Web (recibe la factura)",
       "Asesor(a) de Ventas Web (enlaza factura + guía en el caso de Cachea)",
       "Gerente de E-commerce / Ventas Web (monitoreo del cuello de botella)",
       "Coordinador(a) de Sistemas (migración a facturación digital)"
      ],
      "cadencia": "Continua (por pedido preparado)",
      "disparador": "Foto de la etiqueta enviada al grupo Lark por el preparador",
      "output": "Factura emitida y enlazada al pedido; caja cerrada y lista para despacho o retiro",
      "fuentes": "E-16 Jesmir F1 (2026-07-02) — líneas 60-61 (cuello de botella por facturación física); E-41 Jesmir, Ricardo F2 (2026-08-10) — línea 224 (proceso paso a paso Alexandra → Jaker → almacén; anuncio de facturación digital pendiente)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "10.11",
     "n": "Despacho, retiro en tienda y última milla e-commerce",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Salida del pedido web hacia el cliente por una de tres modalidades: (a) delivery propio con motorizados de Cachea que retiran en el punto de operación (activados o desactivados según capacidad — hoy desactivados en VE por falta de espacio); (b) retiro por el cliente en el punto de operación (Cachea Retiro en Oficina, cliente que compró por WhatsApp y viene personalmente); (c) courier nacional MRW o Zoom con colecta martes, jueves y viernes en VE; en Kenex USA todo por FBA de Amazon o por warehouse Miami con couriers USA. Incluye la gestión de reclamos con MRW por pérdidas o daños en tránsito.",
      "dueno": "Supervisor(a) de Bodega / Despacho (Ricardo Martínez VE); Supervisor(a) de Operaciones E-commerce (Colombia); Gerente de E-commerce / Ventas Web (Isabella)",
      "participantes": [
       "Auxiliar / Ayudante de Bodega y Tráfico",
       "Motorizado externo (Cachea Delivery)",
       "MRW / Zoom (couriers nacionales)",
       "Agencia de Cachea (retiro en oficina)",
       "Asistente de E-commerce / Almacén Web"
      ],
      "cadencia": "Continua (delivery y retiro); calendarizada (colecta MRW/Zoom martes/jueves/viernes en VE)",
      "disparador": "Pedido facturado y físicamente listo; llegada del motorizado; día de colecta programado; llegada del cliente al punto de operación",
      "output": "Pedido entregado al cliente o al courier con guía firmada; contabilización del envío por agencia; SLA de entrega cumplido",
      "fuentes": "E-41 Ricardo Martínez F2 (2026-08-10) — líneas 129-166 (proceso completo por agencia, MRW pérdidas, Zoom, delivery); E-16 Jesmir F1 (2026-07-02) — líneas 46-48 (contexto histórico del despacho manual desde antes de WMS); referencia E-30 Isabella F2 (2026-08-06) — líneas 41, 89 (FBA de Amazon y warehouse Miami)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "10.12",
     "n": "Reposición e inventario del almacén e-commerce",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Gestión del stock del almacén web como unidad independiente del almacén principal: sincronización de inventarios entre todos los canales digitales (Shopify + marketplaces) para evitar sobreventa, cruce diario del inventario del almacén web con el del almacén principal en Odoo, generación proactiva de \"pedido sugerido\" hacia el almacén principal (Jesmir en VE se adelanta a las promociones y a los quiebres de stock especialmente en producto estrella como Hydro Bottle negro), aceptación de traslados desde el almacén principal cuando llega mercancía de contenedor, inventarios mensuales para detectar y corregir discrepancias, gestión de casos especiales (pedido corporativo grande no previsto que se solicita traslado urgente arriba). Recibe reposición desde el almacén principal (VE) o desde bodega Colón/Panamá según el país. En USA el almacén Miami se abastece desde China directo con reserva de emergencia desde Panamá.",
      "dueno": "Gerente de E-commerce / Ventas Web (por país)",
      "participantes": [
       "Supervisor(a) de Bodega / Despacho (Ricardo VE)",
       "Analista de Logística (Jimena — recibe el sugerido)",
       "Gerente de Operaciones y Logística y Logística (Vladimir VE)",
       "Asistente de E-commerce / Almacén Web"
      ],
      "cadencia": "Diaria (cruce de inventarios); semanal (sugerido a Jimena); mensual (inventario de ajuste); por evento (adelanto a promoción, pedido corporativo grande, llegada de contenedor)",
      "disparador": "Cruce diario que detecta niveles bajos; promoción anunciada que exige adelanto; venta corporativa que agota una referencia",
      "output": "Sugerido enviado a Jimena; traslado aceptado y cargado al inventario del almacén web; inventarios sincronizados en todos los canales digitales; discrepancias corregidas mensualmente",
      "fuentes": "E-16 Jesmir F1 (2026-07-02) — líneas 74-85 (proceso completo de sugerido, cruce diario, casos con inventario reservado por Mayor); E-41 Jesmir F2 (2026-08-10) — líneas 207-213, 237-247 (Jesmir opera \"como una tienda\", gestión de pedidos corporativos); referencia E-30 Isabella F2 (2026-08-06) — líneas 33-37 (warehouse Miami abastecido desde China directo con reserva desde Panamá)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "10.13",
     "n": "Servicio al cliente digital pre y postventa",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Atención al cliente por WhatsApp Business, Mercateli, DM de redes sociales derivados, chat de Cachea. Preventa: información de producto, disponibilidad, cotización, ayuda para completar la compra. Postventa: seguimiento del pedido (\"¿ya salió?\", \"¿cuándo llega?\"), reclamos por daño en tránsito, escalamiento a Servicio Técnico cuando el reclamo es de garantía. Uso intensivo de macros por parte de los asesores; uso creciente de IA (Gemini con licencia paga) para redactar respuestas complejas. En VE llegan ~6.000 chats mensuales de Cubitt y ~2.000 de Casio (mientras que en otros países del grupo apenas ~900). El KPI hoy medido es \"primera respuesta\" y \"tiempo promedio\" con meta grupal (no individual). La atención de garantías se deriva a Servicio Técnico postventa (Patrick PA, Yusa VE) que es macroproceso propio.",
      "dueno": "Gerente de E-commerce / Ventas Web (por país); Coordinador(a) de Soporte / Servicio al Cliente (Colombia — Gaby en Deltadir)",
      "participantes": [
       "Asesor(a) de Ventas Web",
       "Gerente de Servicio Técnico (recibe derivaciones)",
       "Marketing (derivación de DM de redes sociales)",
       "Analista de Sistemas / Datos (uso de Gemini)"
      ],
      "cadencia": "Continua (todo el horario operativo, extendido en temporada alta)",
      "disparador": "Cliente escribe por cualquier canal digital; reclamo derivado desde red social por Marketing",
      "output": "Consulta resuelta con macro o con respuesta armada; venta cerrada (si es preventa); pedido escalado a Servicio Técnico (si es garantía); métrica de tiempo de respuesta actualizada",
      "fuentes": "E-16 Jesmir F1 (2026-07-02) — líneas 129-141 (equipo de 6 chats, planificación con IA, 6.000 chats mensuales); E-41 Jesmir F2 (2026-08-10) — líneas 105-112, 168-183 (garantía derivada a Soporte), 261-274 (KPI de tiempo de respuesta, uso de Gemini); referencia E-30 Isabella F2 (2026-08-06) — líneas 25, 77 (Isabella hace personalmente Customer Service de Amazon+Whatnot desde hace 7 años); E-56 Leslie F2 (2026-08-19) — línea 58 (Gaby servicio al cliente por WhatsApp en Colombia)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "10.14",
     "n": "Devoluciones y logística inversa e-commerce",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Gestión del ciclo completo cuando un pedido web debe volver: cliente insatisfecho por daño en tránsito (reclamo con courier + reemplazo o nota de crédito), cambio de color/talla sin defecto (política que Cubitt VE acepta con condicionalidad), devolución de compra por retracto en marketplaces USA (miles por mes en Amazon según Isabella y Bernardo, hoy sin sistema formal — en migración a Odoo con tracker de código de barras que distinga nuevo/usado/dañado), reingreso al inventario del almacén web con marcado de estado, decisión de rehabilitar/reponer/desechar/reportar a fábrica. Se solapa con Servicio Técnico cuando la devolución es por garantía técnica y no por retracto.",
      "dueno": "Gerente de E-commerce / Ventas Web (por país)",
      "participantes": [
       "Supervisor(a) de Bodega / Despacho (recepción física)",
       "Auxiliar / Ayudante de Bodega y Tráfico (reingreso al inventario)",
       "Gerente de Servicio Técnico (si el retorno es por garantía)",
       "Contabilidad (nota de crédito)",
       "Coordinador(a) de Sistemas (implementación del tracker en Odoo — proyecto Kenex USA)"
      ],
      "cadencia": "Continua (por evento de devolución); mensual (consolidación y análisis de devoluciones masivas en USA)",
      "disparador": "Cliente reporta problema con el pedido; retorno de courier por dirección errada o rechazado; ventana de retracto de marketplace USA (Amazon)",
      "output": "Mercancía reingresada al inventario con estado marcado; nota de crédito emitida cuando aplica; producto rehabilitado, revendido, desechado o reportado a fábrica",
      "fuentes": "E-30 Isabella Roizental F2 (2026-08-06) — líneas 101-104 (devoluciones masivas Amazon, migración a Odoo con tracker); E-16 Jesmir F1 (2026-07-02) — líneas 87-90 (caso MRW con audífonos robados, inventario mensual para conciliar devoluciones); E-41 Jesmir F2 (2026-08-10) — líneas 159-162 (cliente que firmó conforme, disputa con MRW)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "10.15",
     "n": "Planificación de temporadas altas y capacidad operativa",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Planificación anticipada de picos comerciales (Black Friday-diciembre, Prime Day USA, Cachea Prime Day, cosecha marzo en VE): proyección de volumen esperado (Jesmir hoy lo hace con IA — Gemini — cruzando venta histórica, cantidad de chats promedio, tiempo por chat y % de crecimiento estacional para dimensionar exactamente cuántas personas adicionales necesita), contratación de personal temporal para chat y almacén, adecuación del espacio del almacén web, adelanto de reposición de mercancía estrella, coordinación con Marketing para campañas de pauta y con Vladimir/Jimena para asegurar inventario en profundidad. En diciembre 2025 VE cerró 5.000 órdenes/mes; proyección 2026 es 7-8.000/mes. Aporta buenas prácticas a otros países (Bernardo felicitó a VE por no colapsar).",
      "dueno": "Gerente de E-commerce / Ventas Web (por país)",
      "participantes": [
       "Analista de Sistemas / Datos (Jesmir con Gemini)",
       "Supervisor(a) de Bodega / Despacho",
       "Coordinador(a) de Recursos Humanos (contratación temporal)",
       "Analista de Logística (Jimena — inventario adelantado)",
       "Gerente Regional de Marketing (pauta digital de campañas)",
       "Planificador Financiero (aprobación de contratación temporal)"
      ],
      "cadencia": "Por evento (aproximadamente 4 picos al año); revisión anual del modelo",
      "disparador": "Proximidad de temporada alta (agosto-septiembre para diciembre; enero-febrero para cosecha); campaña estructural del marketplace anunciada",
      "output": "Plan de capacidad aprobado con headcount, contratación ejecutada, mercancía en el almacén, espacio adecuado, campaña de Marketing sincronizada",
      "fuentes": "E-16 Jesmir F1 (2026-07-02) — líneas 137-143 (planificación con Gemini de temporada alta y cosecha); E-41 Jesmir F2 (2026-08-10) — líneas 277-293 (metodología de proyección con IA; 5.063 órdenes julio 2026)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "10.16",
     "n": "Reportería y KPIs de e-commerce",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Diseño, generación y comunicación de la reportería del canal web: hoy limitada a un reporte básico de Odoo por origen que Jesmir muestra informalmente a Andrés Roizental al cierre de mes, sin niveles de servicio, sin comparativos, sin visualización estructurada. En USA reunión mensual formal Isabella+Alejandro+Bernardo+Jaime+Analista Administrativo con P&L de Kenex USA sobre QuickBooks (a migrar a Odoo). En Colombia dashboard Clara con Plot para pauta digital, social, email y e-commerce. Debe evolucionar a reportería mensual estructurada con KPIs por canal (venta $, unidades, tickets, tiempo de respuesta, tasa de conversión, tasa de devolución, costo de despacho por pedido), integrada a la Torre de Control regional (que hoy es de Retail — ver N1 9.2 del mapa) o como Torre de Control paralela específica de digital.",
      "dueno": "Gerente de E-commerce / Ventas Web (rol en formación); Gerente de E-commerce / Ventas Web (por país)",
      "participantes": [
       "Analista de Sistemas / Datos",
       "Gerente Regional Comercial / Retail",
       "Gerente Regional de Marketing (dashboards de pauta)",
       "Planificador Financiero",
       "Supervisor(a) de Operaciones E-commerce (Colombia)",
       "Asistente Administrativo(a) / Servicios Generales"
      ],
      "cadencia": "Semanal (chats y tiempo de respuesta); mensual (venta, unidades, tickets, comparativos, presentación a junta)",
      "disparador": "Cierre semanal (KPIs de servicio); cierre mensual (revisión ejecutiva)",
      "output": "Dashboard de KPIs de e-commerce por canal y país; reporte mensual entregado a junta; acciones correctivas priorizadas por canal",
      "fuentes": "E-41 Jesmir F2 (2026-08-10) — líneas 257-267, 299-301 (reportería informal, ausencia de niveles de servicio); E-30 Isabella F2 (2026-08-06) — líneas 121-122 (reunión mensual P&L Kenex USA); E-56 Leslie F2 (2026-08-19) — línea 62 (crecimiento 80% mensual medido en Colombia); E-22 Natasha F1 (2026-07-07) — líneas 65, 91 (dashboard con Plot de Clara para pauta digital y e-commerce)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    }
   ]
  },
  {
   "prefijo": "11",
   "cat": "operativo",
   "n": "Postventa y Experiencia de Cliente",
   "n0": {
    "introduccion": {
     "estado": "pendiente"
    },
    "contexto": {
     "estado": "pendiente"
    },
    "gobernanza": {
     "estado": "pendiente"
    },
    "marco": {
     "estado": "pendiente"
    },
    "agenda": {
     "estado": "pendiente"
    },
    "anexos": {
     "estado": "pendiente"
    }
   },
   "procesos": [
    {
     "codigo": "11.1",
     "n": "Gestión de la atención omnicanal al cliente",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Recepción, clasificación y enrutamiento de todo contacto entrante del cliente final (WhatsApp Business, correo, DM de redes, chat web, atención presencial en oficina y en el centro de experiencia) a través de la plataforma de omnicanalidad, con bifurcación entre ruta comercial y ruta de soporte, asignación al agente del país y seguimiento hasta el cierre del contacto bajo SLA de respuesta.",
      "dueno": "Gerente de Servicio Técnico",
      "participantes": [
       "Subgerente de Servicio Técnico",
       "Asesor(a) de Servicio al Cliente (por país)",
       "Coordinador(a) de Soporte / Servicio al Cliente (Colombia)",
       "Gerente de E-commerce / Ventas Web (por país) para la ruta comercial",
       "Gerente de Servicio Técnico (por país)"
      ],
      "cadencia": "Continua (todo el horario operativo; extendida en temporada alta)",
      "disparador": "Contacto entrante del cliente por cualquiera de los canales habilitados",
      "output": "Caso clasificado, asignado y cerrado en la plataforma de omnicanalidad, con registro del tiempo de respuesta y del agente responsable",
      "fuentes": "E-02 Patrick Corujo F1 (2026-06-18) — líneas 22-26, 48, 78; E-58 Patrick Corujo F2 (2026-08-19) — líneas 50, 72; E-64 Jesús Arratia/Rockmar/Eloy PA F2 (2026-08-24) — líneas 31, 74, 100; E-11 Joel Cohen CO F1 (2026-07-01) — línea 138"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "11.2",
     "n": "Gestión de garantías y reemplazo de producto de marca propia",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Desde la recepción del producto reclamado (oficina, tienda o envío) hasta la entrega del reemplazo al cliente: verificación de elegibilidad contra la carta de garantía, diagnóstico inicial, traslado en el ERP hacia la bodega de desecho, validación cruzada de bodega o del gerente de servicio del país, entrega del producto nuevo y carga del reporte de garantía en la tabla compartida.",
      "dueno": "Gerente de Servicio Técnico",
      "participantes": [
       "Subgerente de Servicio Técnico",
       "Asesor(a) de Servicio al Cliente (por país)",
       "Supervisor(a) de Bodega / Despacho (valida el traslado)",
       "Gerente de Tienda / Supervisor de Ventas / Supervisor de Ventas (recepción en punto de venta)",
       "Gerente de Servicio Técnico (por país) como auditor en la vía tienda"
      ],
      "cadencia": "Continua diaria (25 a 30 casos por día solo en Panamá); auditoría de cierre mensual",
      "disparador": "Cliente presenta un producto con falla dentro del período de garantía de un año",
      "output": "Producto reemplazado y entregado al cliente, traslado cerrado en el ERP y registro cargado en la tabla de garantías",
      "fuentes": "E-58 Patrick Corujo F2 (2026-08-19) — línea 48; E-02 Patrick Corujo F1 (2026-06-18) — línea 72; E-64 PA F2 (2026-08-24) — líneas 43, 86, 92, 96-98, 108"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "11.3",
     "n": "Gestión de casos técnicos y reporte de calidad con fábrica",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Clasificación del caso como falla de hardware o de software; para software, carga en la tabla compartida con la fábrica, ciclo de corrección de siete días, prueba y devolución al cliente sin reemplazo; consolidación de defectos recurrentes por producto, serial y lote y reporte a la fábrica para cobertura de garantía o retiro de lote.",
      "dueno": "Subgerente de Servicio Técnico",
      "participantes": [
       "Gerente de Servicio Técnico",
       "Especialista de Producto / Proyecto (interlocución con fábricas)",
       "Gerente Regional de Marketing (decisión final sobre el producto)",
       "Asesor(a) de Servicio al Cliente",
       "fábrica (actor externo)"
      ],
      "cadencia": "Continua por caso; ciclo de siete días para corrección de software; consolidación mensual hacia fábrica",
      "disparador": "Caso diagnosticado como falla de software, o detección de un patrón de fallas en un producto o lote",
      "output": "Producto corregido y devuelto al cliente sin reemplazo, o reporte de defecto enviado a fábrica con serial y lote para cobertura o retiro",
      "fuentes": "E-64 PA F2 (2026-08-24) — líneas 43, 90, 92, 94, 128, 130; E-02 F1 (2026-06-18) — líneas 164, 170-176; E-58 F2 (2026-08-19) — líneas 32, 166; E-51 Josep/Johan/Gustavo VE F2 (2026-08-18) — líneas 105-109, 244-246"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "11.4",
     "n": "Servicio técnico y reparación de marca representada",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Ciclo del producto reparable de la marca representada: recepción y apertura de la orden de servicio, valoración técnica, presupuesto y cobro al cliente cuando está fuera de garantía, reparación por el relojero, cierre de la orden y devolución al cliente o a la tienda de origen.",
      "dueno": "Gerente de Servicio Técnico (por país)",
      "participantes": [
       "Técnico(a) de Servicio / Relojero(a)",
       "Técnico(a) de Servicio / Relojero(a)",
       "Gerente de Tienda / Supervisor de Ventas / Supervisor de Ventas (recepción y devolución)",
       "Asesor(a) de Servicio al Cliente (canal de accesorios y repuestos)",
       "Coordinador(a) de Logística y Bodega (ruta de recolección entre tiendas)"
      ],
      "cadencia": "Continua diaria; concentración de recepción los lunes por la ruta nacional de tiendas (del orden de 700 órdenes por mes en Venezuela)",
      "disparador": "Cliente entrega un producto reparable en tienda, en el taller o por envío nacional",
      "output": "Producto reparado y entregado con la orden de servicio cerrada, y cargo cobrado cuando no aplica garantía",
      "fuentes": "E-51 VE F2 (2026-08-18) — líneas 41, 45-47, 59-61, 131, 145-155, 194-199; E-19 Jill Porat CR F1 (2026-07-07) — línea 182; E-02 F1 (2026-06-18) — líneas 190-200"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "11.5",
     "n": "Gestión de repuestos y accesorios de servicio",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Determinación de la necesidad de repuestos y accesorios para el servicio postventa, consolidación y filtro de los pedidos de los países, validación de razonabilidad y destino, colocación del pedido ante la casa matriz de la marca representada o ante la fábrica de marca propia, y definición del tope de precio de venta del repuesto.",
      "dueno": "Gerente de Servicio Técnico (por país), con alcance regional para la marca representada",
      "participantes": [
       "Country Manager (aprueba pedidos por encima del umbral)",
       "Subgerente de Servicio Técnico",
       "Gerente Regional de Marketing (gestión de repuestos ante fábrica de marca propia)",
       "Gerente de Servicio Técnico de otros países (solicitantes)"
      ],
      "cadencia": "Por evento (pedido consolidado); ciclos de reposición de 6 a 8 meses en marca propia",
      "disparador": "Necesidad de repuesto detectada en taller, o solicitud de repuesto de otro país o de un cliente mayorista",
      "output": "Pedido de repuestos colocado y aprobado, con repuesto disponible en el inventario de servicio y precio de venta topado",
      "fuentes": "E-51 VE F2 (2026-08-18) — líneas 147-159, 165, 167, 175-185, 199; E-02 F1 (2026-06-18) — línea 200"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "11.6",
     "n": "Gestión de garantías en mercados sin operación propia",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Atención de garantías de clientes ubicados en países donde el grupo no tiene operación ni socio (compra en tránsito aeroportuario, mercados atendidos por un agente): envío de stock de reposición al agente del país, coordinación del despacho internacional del reemplazo, y registro y control del costo logístico asociado.",
      "dueno": "Gerente de Servicio Técnico",
      "participantes": [
       "Subgerente de Servicio Técnico",
       "agente de servicio del país (externo o freelance)",
       "Coordinador(a) de Logística y Bodega",
       "Analista de Cuentas por Cobrar (facturación del courier)"
      ],
      "cadencia": "Por evento; reposición de stock al agente cada dos o tres meses",
      "disparador": "Reclamo de garantía de un cliente en un mercado sin operación propia, o nivel bajo de stock de servicio en el agente del país",
      "output": "Reemplazo entregado al cliente en el mercado remoto y costo del envío registrado en el flujo de control",
      "fuentes": "E-58 F2 (2026-08-19) — líneas 128, 136, 138; E-64 PA F2 (2026-08-24) — líneas 33, 41, 108; E-51 VE F2 (2026-08-18) — líneas 189-191"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "11.7",
     "n": "Escalamiento y recuperación del cliente insatisfecho",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Tratamiento de los casos que exceden la resolución del agente: clasificación por nivel de escalamiento, intervención del coordinador o del gerente, revisión del historial del cliente y del producto, y acuerdo de una solución excepcional (cambio de generación, reembolso, compensación) con el cliente.",
      "dueno": "Gerente de Servicio Técnico",
      "participantes": [
       "Subgerente de Servicio Técnico",
       "Gerente de Servicio Técnico (por país)",
       "Gerente de Tienda / Supervisor de Ventas / Supervisor de Ventas",
       "Asesor(a) de Servicio al Cliente",
       "Gerente Regional de Marketing para excepciones de alto impacto"
      ],
      "cadencia": "Por evento",
      "disparador": "Caso marcado como crítico por el agente, la tienda o el gerente del país (reincidencia del producto, cliente molesto, reclamo público)",
      "output": "Caso cerrado con la solución acordada y registro del acuerdo excepcional en el historial del cliente",
      "fuentes": "E-64 PA F2 (2026-08-24) — línea 78; E-51 VE F2 (2026-08-18) — líneas 89, 91-99; E-58 F2 (2026-08-19) — líneas 152-158"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "11.8",
     "n": "Gestión de reembolsos y reversos de postventa",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Ciclo del reembolso al cliente cuando no procede el reemplazo (falta de stock, reincidencia o decisión del cliente): levantamiento de la solicitud en el flujo de aprobación, validación por Contabilidad, ejecución del pago y confirmación al cliente dentro del SLA acordado.",
      "dueno": "Gerente de Servicio Técnico (levanta la solicitud y responde por el SLA)",
      "participantes": [
       "Analista de Cuentas por Cobrar (ejecución del pago)",
       "Gerente de Contabilidad / Administración (aprobación)",
       "Asesor(a) de Servicio al Cliente (comunicación al cliente)"
      ],
      "cadencia": "Por evento",
      "disparador": "Decisión de reembolsar acordada con el cliente en un caso de postventa",
      "output": "Reembolso ejecutado y confirmado al cliente dentro del SLA vigente (de 48 horas a 5 días según país)",
      "fuentes": "E-02 Patrick Corujo F1 (2026-06-18) — líneas 88, 96; E-58 Patrick Corujo F2 (2026-08-19) — línea 214"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "11.9",
     "n": "Disposición final de producto defectuoso (scrap)",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Acumulación del producto reemplazado en la bodega de desecho, segunda revisión para recuperación de unidades y partes, extracción mensual de los traslados del ERP y conciliación contra los reportes de garantía y el inventario físico de bodega, y entrega a la empresa certificada de reciclaje.",
      "dueno": "Subgerente de Servicio Técnico",
      "participantes": [
       "Gerente de Servicio Técnico (aprueba el cierre mensual)",
       "Supervisor(a) de Bodega / Despacho",
       "Gerente de Servicio Técnico (por país)",
       "empresa de reciclaje certificada (actor externo)"
      ],
      "cadencia": "Mensual (extracción y conciliación en los días 28 a 29)",
      "disparador": "Cierre del mes con la conciliación de los traslados de garantía del período",
      "output": "Lote de producto desechado con certificado de disposición y conciliación cerrada entre ERP, inventario físico y reportes de garantía",
      "fuentes": "E-58 F2 (2026-08-19) — línea 48; E-02 F1 (2026-06-18) — línea 72; E-64 PA F2 (2026-08-24) — línea 116; E-51 VE F2 (2026-08-18) — línea 103"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "11.10",
     "n": "Gobierno del modelo de servicio, estándares y base de conocimiento",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Definición y mantenimiento de la carta de garantía, los protocolos de atención, los estándares de servicio y el catálogo de manuales del wiki; homologación del modelo entre países propios, socios y distribuidores; inducción de los nuevos agentes al estándar; y sostenimiento de la agenda de mejora del macroproceso.",
      "dueno": "Gerente de Servicio Técnico",
      "participantes": [
       "Subgerente de Servicio Técnico",
       "Gerente de Servicio Técnico (por país)",
       "Gerente de E-commerce / Ventas Web (por país)",
       "Gerente Regional de Marketing",
       "Gerente de Proyectoss (PMO) para iniciativas transversales"
      ],
      "cadencia": "Continua; revisión por evento (nuevo mercado, nuevo producto, cambio de plataforma o de política)",
      "disparador": "Apertura de operación en un nuevo mercado, cambio de política de garantía o brecha detectada en la homologación entre países",
      "output": "Carta de garantía y protocolos vigentes, publicados en el wiki y aplicados de forma homologada en los países",
      "fuentes": "E-64 PA F2 (2026-08-24) — líneas 23, 52; E-58 F2 (2026-08-19) — líneas 24, 98, 102, 204; E-02 F1 (2026-06-18) — líneas 232, 237-241; E-19 Jill Porat CR F1 (2026-07-07) — línea 182"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "11.11",
     "n": "Medición de la experiencia del cliente y reportería de postventa",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Definición y seguimiento de los indicadores del macroproceso (SLA de respuesta al cliente y a la fábrica, índice y porcentaje de garantías sobre sell-out, satisfacción y reputación digital), operación de los tableros de garantías y del centro de mando de omnicanalidad, y emisión del reporte mensual a la Junta Directiva.",
      "dueno": "Gerente de Servicio Técnico",
      "participantes": [
       "Subgerente de Servicio Técnico",
       "Analista de Sistemas / Datos",
       "Gerente Regional Comercial / Retail (provisión del sell-out)",
       "Gerente Regional de Marketing",
       "Junta Directiva (destinataria del reporte)"
      ],
      "cadencia": "Diaria (actualización de tableros); mensual (reporte a la Junta); revisión anual del esquema de indicadores",
      "disparador": "Carga de casos y garantías en las tablas de origen; cierre mensual del período",
      "output": "Tablero de garantías y de servicio actualizado por país, producto y motivo, y reporte mensual de postventa entregado a la Junta Directiva",
      "fuentes": "E-58 F2 (2026-08-19) — líneas 54, 60, 72, 168, 176, 180, 192, 200; E-64 PA F2 (2026-08-24) — líneas 92, 94, 100"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    }
   ]
  },
  {
   "prefijo": "12",
   "cat": "soporte",
   "n": "Contabilidad",
   "n0": {
    "introduccion": {
     "estado": "pendiente"
    },
    "contexto": {
     "estado": "pendiente"
    },
    "gobernanza": {
     "estado": "pendiente"
    },
    "marco": {
     "estado": "pendiente"
    },
    "agenda": {
     "estado": "pendiente"
    },
    "anexos": {
     "estado": "pendiente"
    }
   },
   "procesos": [
    {
     "codigo": "12.1",
     "n": "Registro contable de operaciones y control de la imputación",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Registro de las operaciones que nacen en el propio departamento (asientos de diario, provisiones, reclasificaciones, ajustes por diferencial cambiario) y validación de la imputación contable de los registros originados en otros módulos y áreas (ventas de tienda y web, cuentas por pagar, nómina, inventario, importaciones), incluida la solicitud de corrección de parametrización al ERP cuando la imputación es incorrecta.",
      "dueno": "Coordinador(a) Contable",
      "participantes": [
       "Gerente de Contabilidad / Administración (revisión y aprobación)",
       "Analista Contable Senior / Contador(a) Senior / Contador(a)",
       "Analista Contable Senior / Contador(a) Senior / Contador(a)",
       "Analista de Cuentas por Cobrar (registro de factura de proveedor)",
       "Coordinador(a) de Sistemas y el partner del ERP (corrección de parametrización)"
      ],
      "cadencia": "Continua diaria",
      "disparador": "Ocurrencia de una operación económica o detección de una imputación incorrecta en un registro originado en otra área",
      "output": "Asiento contable registrado y correctamente imputado en el ERP, con la parametrización corregida cuando aplica",
      "fuentes": "E-38 Víctor Padovani VE F2 (2026-08-06) — líneas 20, 56-58, 100, 108-110, 182-190; E-44 Ian Chen/Fernando/Yamanis PA F2 (2026-08-11) — líneas 81, 195, 201, 203; E-46 Marcella Ramírez CO F2 (2026-08-13) — línea 94"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "12.2",
     "n": "Validación de ingresos y control del cierre de caja de punto de venta",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Verificación de que todo lo vendido en cada punto de venta fue efectivamente cobrado: recepción del cierre de caja de la tienda con su reporte fiscal y sus soportes por medio de pago, cotejo contra el registro del sistema, control de la remesa de efectivo y divisas hacia la oficina principal, y liberación del ingreso hacia la cuenta transitoria que alimenta la conciliación bancaria.",
      "dueno": "Gerente de Contabilidad / Administración",
      "participantes": [
       "Analista Contable Senior / Contador(a) Senior / Contador(a)",
       "Gerente de Tienda / Supervisor de Ventas y Asesor(a) de Ventas - Tienda (emisión del cierre y de los soportes)",
       "Asistente Administrativo(a) / Servicios Generales (recepción de efectivo y divisas)",
       "Coordinador(a) de Logística y Bodega (valija entre tiendas y oficina)"
      ],
      "cadencia": "Diaria por punto de venta; consolidación y revisión al cierre del mes",
      "disparador": "Cierre de caja diario de cada punto de venta",
      "output": "Ingreso validado contra sus soportes y cargado a la cuenta transitoria, con las diferencias identificadas y escaladas a la tienda",
      "fuentes": "E-38 VE F2 (2026-08-06) — líneas 38-42, 52, 166-176, 232; E-44 PA F2 (2026-08-11) — líneas 136, 140-145; E-46 CO F2 (2026-08-13) — línea 20"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "12.3",
     "n": "Conciliación bancaria y de plataformas de recaudo",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Carga del extracto bancario y de los reportes de las plataformas de recaudo (financiadora de consumo, pasarelas y marketplaces) en el ERP, cruce contra el movimiento contable y contra las cuentas transitorias, registro de comisiones, intereses y retenciones, gestión de las partidas no identificadas y emisión del resumen de conciliación cerrado por cuenta.",
      "dueno": "Gerente de Contabilidad / Administración",
      "participantes": [
       "Analista Contable Senior / Contador(a) Senior / Contador(a)",
       "Analista Contable Senior / Contador(a) Senior / Contador(a) (revisión de transitorias)",
       "Analista Contable Senior / Contador(a) Senior / Contador(a)",
       "Coordinador(a) Contable",
       "entidades bancarias y plataformas de recaudo (actores externos)"
      ],
      "cadencia": "Diaria (carga y cruce); cierre mensual de la conciliación dentro de los primeros días del mes siguiente",
      "disparador": "Disponibilidad del extracto bancario o del reporte de la plataforma de recaudo del período",
      "output": "Conciliación cerrada por cuenta, con la cuenta transitoria en cero y la relación de partidas pendientes con su responsable asignado",
      "fuentes": "E-38 VE F2 (2026-08-06) — líneas 30, 37-52, 68, 107-122, 220, 232; E-44 PA F2 (2026-08-11) — líneas 40, 48, 52, 56; E-46 CO F2 (2026-08-13) — líneas 20, 112-118"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "12.4",
     "n": "Análisis y depuración de cuentas de balance",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Revisión periódica de los auxiliares y de las cuentas de balance (cuentas por cobrar, cuentas por pagar, anticipos, transitorias de inventario y de recaudo, socios de negocio) para verificar que el auxiliar concilie con el mayor, identificar el origen de los saldos indebidos, y ordenar el ajuste o el reproceso con el área responsable del registro.",
      "dueno": "Analista Contable Senior / Contador(a) Senior / Contador(a)",
      "participantes": [
       "Gerente de Contabilidad / Administración (revisión final)",
       "Coordinador(a) Contable",
       "Analista Contable Senior / Contador(a) Senior / Contador(a)",
       "Analista de Cuentas por Cobrar",
       "responsable del área que originó el registro"
      ],
      "cadencia": "Quincenal (revisión intermedia) y mensual (revisión de cierre)",
      "disparador": "Corte quincenal o de cierre mensual, o detección de un saldo sin explicación en una cuenta de balance",
      "output": "Cuentas de balance analizadas con los saldos explicados o ajustados, y las transitorias del período depuradas",
      "fuentes": "E-44 PA F2 (2026-08-11) — líneas 203-213; E-38 VE F2 (2026-08-06) — líneas 34-36, 92, 180; E-46 CO F2 (2026-08-13) — línea 20"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "12.5",
     "n": "Facturación fiscal y emisión de documentos accesorios",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Emisión de la factura de venta una vez validados el pedido, el pago y la preparación en bodega; emisión de notas de crédito y de débito; operación del medio de facturación autorizado en cada país (máquina fiscal, proveedor de facturación digital o PAC de facturación electrónica) y su enlace con el ERP y con la autoridad tributaria.",
      "dueno": "Gerente de Contabilidad / Administración",
      "participantes": [
       "Analista de Facturación",
       "Analista Contable Senior / Contador(a) Senior / Contador(a)",
       "Gerente de Tesorería y Analista de Cuentas por Cobrar (validación del pago recibido)",
       "Supervisor(a) de Bodega / Despacho (confirmación del pedido preparado)",
       "proveedor de facturación electrónica y autoridad tributaria (actores externos)"
      ],
      "cadencia": "Continua diaria por pedido; corte quincenal en el país con medio de facturación mixto",
      "disparador": "Pedido con pago validado y con la preparación confirmada por bodega",
      "output": "Factura fiscal emitida y transmitida al cliente y a la autoridad tributaria, con el documento accesorio cuando corresponde",
      "fuentes": "E-44 PA F2 (2026-08-11) — líneas 63, 67, 69, 71, 237; E-38 VE F2 (2026-08-06) — líneas 100, 127-138; E-46 CO F2 (2026-08-13) — línea 128"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "12.6",
     "n": "Gestión tributaria y cumplimiento de obligaciones fiscales",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Determinación, declaración y control del pago de las obligaciones tributarias nacionales, municipales y parafiscales de cada país: extracción y depuración de los libros de ventas y compras, cálculo del impuesto, presentación en la plataforma de la autoridad, notificación del monto y de la fecha a Tesorería para el desembolso, y archivo electrónico de declaraciones y comprobantes para futuras fiscalizaciones.",
      "dueno": "Gerente de Contabilidad / Administración",
      "participantes": [
       "Analista Contable Senior / Contador(a) Senior / Contador(a)",
       "Analista Contable Senior / Contador(a) Senior / Contador(a)",
       "Gerente de Tesorería (ejecución del pago y disponibilidad de fondos)",
       "Revisor(a) Fiscal (revisión previa en Colombia)",
       "asesor tributario externo",
       "autoridad tributaria nacional y municipal (actores externos)"
      ],
      "cadencia": "Mensual, bimestral, quincenal y anual según el tributo y el país; calendario fiscal por localidad",
      "disparador": "Llegada de la fecha del calendario fiscal del tributo correspondiente",
      "output": "Declaración presentada dentro del plazo, con el pago notificado a Tesorería y el soporte archivado",
      "fuentes": "E-38 VE F2 (2026-08-06) — líneas 54, 68-76, 194, 232; E-44 PA F2 (2026-08-11) — líneas 75-77, 86, 88, 219; E-46 CO F2 (2026-08-13) — líneas 52, 62"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "12.7",
     "n": "Gestión de activos fijos y depreciación",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Alta del activo al momento de la compra según el criterio de capitalización, clasificación por categoría, cálculo y registro de la depreciación del período, registro de las bajas por daño o retiro, y mantenimiento del cuadro de activos que sustenta el requerimiento de auditoría y la declaración fiscal.",
      "dueno": "Analista Contable Senior / Contador(a) Senior / Contador(a)",
      "participantes": [
       "Gerente de Contabilidad / Administración (aprueba el criterio de capitalización)",
       "Analista Contable Senior / Contador(a) Senior / Contador(a)",
       "Analista de Cuentas por Cobrar (registro de la compra)",
       "Coordinador(a) de Sistemas (activos de cómputo)",
       "firma de auditoría externa o revisoría fiscal (requerimiento anual)"
      ],
      "cadencia": "Mensual (depreciación y altas del período); anual (cuadro para auditoría y declaración de renta)",
      "disparador": "Compra de un bien que supera el umbral de capitalización, baja de un activo, o cierre mensual para el cálculo de la depreciación",
      "output": "Cuadro de activos fijos actualizado con la depreciación del período registrada y conciliada con la contabilidad",
      "fuentes": "E-44 PA F2 (2026-08-11) — líneas 90, 94, 100-111, 132, 153-157; E-46 CO F2 (2026-08-13) — líneas 64-76; E-38 VE F2 (2026-08-06) — líneas 30, 146-152"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "12.8",
     "n": "Cierre contable y emisión de estados financieros",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Ejecución del calendario de cierre del período: verificación de que los procesos alimentadores están cerrados, registro de los ajustes y provisiones de cierre, cuadre de los auxiliares contra el mayor, y emisión y firma del estado de resultados y del estado de situación financiera del país o entidad legal.",
      "dueno": "Gerente de Contabilidad / Administración",
      "participantes": [
       "Coordinador(a) Contable",
       "Analista Contable Senior / Contador(a) Senior / Contador(a)",
       "Analista Contable Senior / Contador(a) Senior / Contador(a)",
       "Planificador Financiero (destinatario de los estados financieros)",
       "Revisor(a) Fiscal (firma en Colombia)"
      ],
      "cadencia": "Mensual, con meta de corte dentro de los primeros cinco días del mes siguiente; cierre anual al 31 de diciembre",
      "disparador": "Fin del período contable y confirmación de que los procesos alimentadores del período están cerrados",
      "output": "Estados financieros del período emitidos y firmados, con los auxiliares cuadrados contra el mayor",
      "fuentes": "E-38 VE F2 (2026-08-06) — líneas 78-86; E-44 PA F2 (2026-08-11) — líneas 115, 119-121, 130; E-46 CO F2 (2026-08-13) — líneas 46, 86"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "12.9",
     "n": "Reportería contable a la dirección y a terceros",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Preparación de la información financiera que se entrega fuera del cierre estándar: análisis de variaciones y memorando para la revisión previa con la Dirección de Finanzas y para el comité quincenal, rentabilidad por tienda y por canal mediante centros de costo, y paquetes de información requeridos por bancos y por entidades externas (flujo de caja proyectado, informes para líneas de crédito).",
      "dueno": "Gerente de Contabilidad / Administración",
      "participantes": [
       "Planificador Financiero (revisa y presenta a la Junta)",
       "Analista Contable Senior / Contador(a) Senior / Contador(a)",
       "Asesor(a) Externo de Finanzas y Auditoría",
       "Junta Directiva (destinataria)",
       "entidades bancarias (actores externos)"
      ],
      "cadencia": "Mensual (paquete de cierre); quincenal (comité de finanzas); por evento (requerimiento bancario o de un ente externo)",
      "disparador": "Cierre contable emitido, convocatoria del comité de finanzas, o requerimiento de información de un banco o de un ente externo",
      "output": "Reporte de análisis financiero entregado a la Dirección de Finanzas y paquete de información remitido al tercero solicitante",
      "fuentes": "E-38 VE F2 (2026-08-06) — líneas 90, 103-104, 144; E-44 PA F2 (2026-08-11) — líneas 115-123; E-46 CO F2 (2026-08-13) — líneas 86-90, 134-136; E-23 Alberto Bassan F1 (2026-07-09) — líneas 36, 38"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "12.10",
     "n": "Atención de la auditoría externa y de la revisoría fiscal",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Coordinación del ciclo de revisión externa: entrega del balance de comprobación, atención del listado de requerimientos y de las muestras solicitadas a las áreas involucradas, respuesta a las observaciones, elaboración de las notas a los estados financieros, y recepción de los estados financieros auditados y su empalme con la declaración de renta.",
      "dueno": "Gerente de Contabilidad / Administración",
      "participantes": [
       "Analista Contable Senior / Contador(a) Senior / Contador(a) (lidera la auditoría de la entidad que le corresponde)",
       "Analista Contable Senior / Contador(a) Senior / Contador(a)",
       "Gerente de Tesorería y Gerente de Talento Humano (aportan muestras)",
       "Asesor(a) Externo de Finanzas y Auditoría",
       "firma de auditoría externa o revisoría fiscal (actores externos)"
      ],
      "cadencia": "Anual con corte semestral intermedio; en Colombia la revisoría fiscal opera de forma continua con plan de revisión acordado",
      "disparador": "Inicio del ciclo de auditoría del período o entrega del listado de requerimientos por parte de la firma",
      "output": "Estados financieros auditados emitidos y observaciones de auditoría atendidas o con plan de acción acordado",
      "fuentes": "E-44 PA F2 (2026-08-11) — líneas 173-187; E-46 CO F2 (2026-08-13) — líneas 46, 96-98; E-38 VE F2 (2026-08-06) — línea 90; E-23 Alberto Bassan F1 (2026-07-09) — línea 20"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "12.11",
     "n": "Control interno contable y verificación de cumplimiento",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Diseño y ejecución de las verificaciones de control interno sobre los procesos que alimentan la contabilidad: arqueos y verificaciones sorpresivas de efectivo y de custodia de divisas en sedes, resguardo de la factura original en cartera, toma física de activos fijos, revisión de la segregación de funciones, y emisión de memorandos de hallazgos con plan de acción al dueño del proceso.",
      "dueno": "Gerente de Contabilidad / Administración (mientras no exista la función de auditoría interna)",
      "participantes": [
       "Gerente de Contabilidad / Administración",
       "Planificador Financiero",
       "Analista Contable Senior / Contador(a) Senior / Contador(a)",
       "dueños de los procesos auditados (tiendas, tesorería, cartera, almacén)",
       "Asesor(a) Externo de Finanzas y Auditoría"
      ],
      "cadencia": "Continua para las verificaciones embebidas en el cierre; programada y sorpresiva para los arqueos y tomas físicas",
      "disparador": "Hallazgo detectado en el análisis contable, o programación del plan de verificaciones del período",
      "output": "Memorando de hallazgos con causa raíz y plan de acción asignado al dueño del proceso",
      "fuentes": "E-38 VE F2 (2026-08-06) — líneas 120-122, 154-160, 176, 180, 192; E-44 PA F2 (2026-08-11) — línea 67; E-23 Alberto Bassan F1 (2026-07-09) — línea 26"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "12.12",
     "n": "Gobierno de la política contable del grupo y documentación de procedimientos",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Definición y mantenimiento de los criterios contables comunes a las entidades del grupo (umbral de capitalización de activos, tratamiento del diferencial cambiario, catálogo de cuentas y centros de costo, criterios de provisión), elaboración y actualización de las instrucciones de trabajo por proceso, y homologación de prácticas entre países aprovechando los desarrollos ya maduros en una filial.",
      "dueno": "Planificador Financiero (responsabilidad colegiada con los Gerentes de Contabilidad de cada país)",
      "participantes": [
       "Gerente de Contabilidad / Administración (Venezuela, Panamá y Colombia)",
       "Gerente de Contabilidad / Administración",
       "Coordinador(a) Contable",
       "Asesor(a) Externo de Finanzas y Auditoría",
       "Coordinador(a) de Sistemas (parametrización del ERP)"
      ],
      "cadencia": "Continua; revisión formal anual y por evento (nueva entidad, cambio normativo, nuevo desarrollo del ERP)",
      "disparador": "Divergencia de criterio detectada entre países, cambio normativo, o brecha de documentación identificada en un proceso",
      "output": "Política contable del grupo vigente y publicada, con las instrucciones de trabajo por proceso actualizadas y homologadas entre países",
      "fuentes": "E-44 PA F2 (2026-08-11) — líneas 102, 104, 239-243; E-38 VE F2 (2026-08-06) — líneas 126, 196, 220, 230-232; E-46 CO F2 (2026-08-13) — líneas 108, 152"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    }
   ]
  },
  {
   "prefijo": "13",
   "cat": "soporte",
   "n": "Administración y Finanzas",
   "n0": {
    "introduccion": {
     "estado": "pendiente"
    },
    "contexto": {
     "estado": "pendiente"
    },
    "gobernanza": {
     "estado": "pendiente"
    },
    "marco": {
     "estado": "pendiente"
    },
    "agenda": {
     "estado": "pendiente"
    },
    "anexos": {
     "estado": "pendiente"
    }
   },
   "procesos": [
    {
     "codigo": "13.1",
     "n": "Gestión de cuentas por pagar a proveedores",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Ciclo desde la recepción y validación de la factura del proveedor hasta el registro del documento por pagar en el ERP con sus retenciones (ISLR/IVA), el cálculo del neto, la preparación del lote de pago para Tesorería, el control de anticipos y el registro del pago una vez ejecutado.",
      "dueno": "Coordinador(a) de Tesorería / Cobranzas (función de Cuentas por Pagar)",
      "participantes": [
       "Analista de Cuentas por Cobrar (registro de la factura y del pago)",
       "Gerente de Contabilidad / Administración (recepción y validación de facturas y control de anticipos)",
       "Gerente de Tesorería (ejecución del pago)",
       "Coordinador(a) Contable (conciliación y causación posterior)"
      ],
      "cadencia": "Continua diaria; lotes de pago en días de caja fijos (martes y jueves en Venezuela)",
      "disparador": "Recepción de una factura o de una solicitud de pago de un proveedor o de un área",
      "output": "Documento por pagar registrado con retenciones, lote de pago preparado y pago registrado en el ERP",
      "fuentes": "E-65 Andrés Largo VE F2 (2026-08) — registro de factura, retenciones, cálculo del neto, entrega a Tesorería y registro del pago; E-61 Felipe PA F2 (2026-08-24) — programación de pago por LARK; E-59 Hugo e Itai CR F2 (2026-08-20) — recepción y aceptación de facturas electrónicas; E-15 Jaime VE F1 (2026-07-02)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "13.2",
     "n": "Gestión del flujo de caja y ejecución de pagos",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Apertura y monitoreo diario de saldos, construcción y actualización del flujo de caja proyectado, aprobación y programación de las solicitudes de pago (flujo de LARK en Panamá), ejecución de los desembolsos (proveedores, nómina y financiamiento) y cierre diario con reporte de disponibilidad.",
      "dueno": "Gerente de Tesorería",
      "participantes": [
       "Coordinador(a) de Tesorería / Cobranzas",
       "Analista de Cuentas por Cobrar (ejecución de los pagos)",
       "Planificador Financiero (supervisión y aprobación por monto según matriz)",
       "Analista de Recursos Humanos (estimado de nómina)"
      ],
      "cadencia": "Diaria (apertura, flujo y cierre); días de pago fijos (martes y jueves en Venezuela; miércoles en Panamá)",
      "disparador": "Apertura del día y recepción de las solicitudes de pago aprobadas",
      "output": "Pagos ejecutados y conciliados con soporte, flujo de caja proyectado actualizado y disponibilidad reportada",
      "fuentes": "E-43 Alí Carmona / Norman Vanegas VE-PA F2 (2026-08-11) — apertura de caja, flujo proyectado, días de caja y aprobación de pagos; E-61 Felipe PA F2 (2026-08-24) — programación de pago; E-15 Jaime VE F1 (2026-07-02) — flujo de caja diario; E-59 Hugo e Itai CR F2 (2026-08-20) — calendario de pagos"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "13.3",
     "n": "Gestión de compra de divisas y repatriación de fondos",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Adquisición de divisas en mesa de cambio con la banca, distribución de fondos entre cuentas y repatriación de recursos a la casa matriz (Kenex, Panamá) para sostener el ciclo de compra de mercancía, con el cumplimiento normativo cambiario. Proceso particular de Venezuela.",
      "dueno": "Coordinador(a) de Tesorería / Cobranzas (mesa de cambio - Venezuela)",
      "participantes": [
       "Gerente de Tesorería",
       "Planificador Financiero (política e intervención cambiaria)",
       "Analista de Cuentas por Cobrar (ejecución de pagos a la casa matriz)",
       "ejecutivos de banca (actores externos)"
      ],
      "cadencia": "Diaria / por ventana de intervención cambiaria",
      "disparador": "Disponibilidad de bolívares y necesidad de pago a la casa matriz o al proveedor internacional",
      "output": "Divisas adquiridas y fondos repatriados a la casa matriz, registrados en el ERP",
      "fuentes": "E-43 Alí Carmona VE F2 (2026-08-11) — mesa de cambio, indicador de compra y repatriación a Panamá; E-15 Jaime VE F1 (2026-07-02) — compra de divisas y sostenibilidad del pago al proveedor; E-65 Andrés Largo VE F2 (2026-08) — pagos de importación"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "13.4",
     "n": "Gestión del financiamiento bancario y relación con entidades financieras",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Gestión de las líneas de crédito y de los pagarés y su renovación, amortizaciones e intereses, negociación de tasas, entrega de estados financieros a la banca y relación institucional con los bancos para financiar el ciclo de compra.",
      "dueno": "Gerente de Tesorería (responsabilidad compartida con el Planificador Financiero y la dirección)",
      "participantes": [
       "Planificador Financiero",
       "Junta Directiva y Director(a) Externo(a) de Junta Directiva (aprobación del endeudamiento)",
       "Coordinador(a) de Tesorería / Cobranzas",
       "Gerente de Contabilidad / Administración (estados financieros para la banca)",
       "bancos (actores externos)"
      ],
      "cadencia": "Por evento y trimestral (renovaciones, vencimientos y amortizaciones)",
      "disparador": "Necesidad de financiamiento del ciclo de compra, o vencimiento o renovación de una línea",
      "output": "Líneas de crédito vigentes o renovadas y financiamiento colocado, con los compromisos formalizados",
      "fuentes": "E-15 Jaime VE F1 (2026-07-02) — preparación de líneas para la compra y relación con bancos; E-43 Norman Vanegas PA F2 (2026-08-11) — líneas, amortizaciones e intereses; corrob. E-20 Máximo Dolman F2 (2026-07-07)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "13.5",
     "n": "Evaluación y aprobación de crédito de clientes",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Afiliación del cliente a crédito, debida diligencia y análisis de riesgo mediante la matriz de riesgo, definición y aprobación de la línea de crédito y control de crédito sobre los pedidos (bloqueo por saldo vencido).",
      "dueno": "Coordinador(a) de Tesorería / Cobranzas (función de Crédito)",
      "participantes": [
       "Analista de Cuentas por Cobrar",
       "Coordinador(a) Comercial y fuerza de ventas (solicitud y aprobación comercial del pedido)",
       "Gerente de Tesorería",
       "Planificador Financiero"
      ],
      "cadencia": "Por evento (nueva afiliación o revisión de línea); control por pedido",
      "disparador": "Solicitud de afiliación o de una nueva línea de crédito de un cliente",
      "output": "Cliente creado con línea de crédito aprobada y decisión de crédito documentada",
      "fuentes": "E-62 Noel PA F2 (2026-08-24) — afiliación, debida diligencia, matriz de riesgo y control por saldo vencido; E-48 Yajaira VE F2 (2026-08-13) — registro de cliente; E-15 Jaime VE F1 (2026-07-02); E-59 Hugo e Itai CR F2 (2026-08-20)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "13.6",
     "n": "Gestión de cuentas por cobrar y cobranza",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Registro y aplicación de los cobros multi-instrumento (con tasa del día e indexación en Venezuela), gestión y seguimiento de la cartera por antigüedad, emisión de estados de cuenta, escalamiento de saldos vencidos, informe de morosidad y tratamiento de notas de crédito/débito e incobrables.",
      "dueno": "Coordinador(a) de Tesorería / Cobranzas (función de Cobranza)",
      "participantes": [
       "Analista de Cuentas por Cobrar",
       "Coordinador(a) Comercial y fuerza de ventas (gestión comercial del cobro)",
       "Coordinador(a) Contable (conciliación de ingresos)",
       "Gerente de Tesorería"
      ],
      "cadencia": "Diaria (registro de cobros, tasa y cartera); mensual (informe de morosidad y cierre)",
      "disparador": "Emisión de una factura a crédito o recepción de un cobro",
      "output": "Cobro aplicado a la factura, cartera actualizada y conciliada, e informe de morosidad",
      "fuentes": "E-48 Yajaira Cotoreal VE F2 (2026-08-13) — tasa diaria, cobro multi-instrumento, reporte de cartera y seguimiento de vencidos; E-62 Noel PA F2 (2026-08-24) — aplicación de cobros, cartera, estado de cuenta y morosidad; E-15 Jaime VE F1 (2026-07-02); E-59 Hugo e Itai CR F2 (2026-08-20)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "13.7",
     "n": "Conciliación de operaciones y saldos intercompañía",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Conciliación periódica de los saldos y operaciones entre las compañías del grupo (compras a Kenex, repatriaciones y notas), emparejando las cuentas por pagar y por cobrar entre países hasta cuadrar al detalle.",
      "dueno": "Responsabilidad colegiada - Coordinador(a) de Tesorería / Cobranzas (funciones de Cuentas por Pagar y de Cobranza), bajo el Gerente de Tesorería",
      "participantes": [
       "Analista de Cuentas por Cobrar",
       "Gerente de Contabilidad / Administración de cada país",
       "Planificador Financiero"
      ],
      "cadencia": "Mensual / por corte de período",
      "disparador": "Cierre de período o detección de un descuadre en cuentas de compañías relacionadas",
      "output": "Saldos intercompañía conciliados y cuadrados entre las entidades del grupo",
      "fuentes": "E-62 Noel PA F2 (2026-08-24) — conciliación con Venezuela, Costa Rica y Colombia al centavo; E-65 Andrés Largo VE F2 (2026-08) — contrapartida con Panamá; E-15 Jaime VE F1 (2026-07-02)"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "13.8",
     "n": "Planificación financiera y reporte de resultados a la dirección",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Elaboración de proyecciones y de la situación financiera a partir de los cierres contables, análisis de rentabilidad y de márgenes (incluido el efecto cambiario) y preparación de la reportería financiera a la Junta y a la banca.",
      "dueno": "Planificador Financiero",
      "participantes": [
       "Gerente de Contabilidad / Administración (cierre e insumos)",
       "Junta Directiva, Director(a) Externo(a) de Junta Directiva y Asesor(a) Externo de Finanzas y Auditoría (destinatarios)",
       "Coordinador(a) de Tesorería / Cobranzas (flujo de caja)",
       "Gerente de Operaciones y Logística (premisas de margen)"
      ],
      "cadencia": "Mensual (situación financiera y comité); por evento (análisis de precios y de margen)",
      "disparador": "Cierre contable del período o requerimiento de la Junta o de la banca",
      "output": "Situación financiera, proyecciones y análisis de resultados presentados a la dirección y a terceros",
      "fuentes": "E-15 Jaime VE F1 (2026-07-02) — proyecciones, situación financiera, modelos y análisis de margen cambiario; E-20 Máximo Dolman F2 (2026-07-07) — reportería y presupuesto a la Junta; E-43 Alí Carmona VE F2 (2026-08-11) — flujo de caja"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "13.9",
     "n": "Gestión presupuestaria y control del gasto",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Formulación del presupuesto operativo del grupo, seguimiento de presupuesto frente a ejecución y control del gasto por centro de costo y por rubro, con la clasificación analítica del gasto.",
      "dueno": "Planificador Financiero",
      "participantes": [
       "Gerente de Contabilidad / Administración (control y clasificación del gasto por centro de costo)",
       "líderes de área (dueños de presupuesto)",
       "Junta Directiva (aprobación)"
      ],
      "cadencia": "Anual (formulación) con seguimiento mensual",
      "disparador": "Inicio del ciclo presupuestario anual o revisión periódica de la ejecución",
      "output": "Presupuesto aprobado y reporte de ejecución y de desviaciones por centro de costo",
      "fuentes": "E-20 Máximo Dolman F2 (2026-07-07) — presupuesto, forecast y su revisión; E-15 Jaime VE F1 (2026-07-02) — modelos y control; E-59 Hugo e Itai CR F2 (2026-08-20) — análisis del gasto por rubro"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    }
   ]
  },
  {
   "prefijo": "14",
   "cat": "soporte",
   "n": "Gestión de Tecnología de Información (TI)",
   "n0": {
    "introduccion": {
     "estado": "pendiente"
    },
    "contexto": {
     "estado": "pendiente"
    },
    "gobernanza": {
     "estado": "pendiente"
    },
    "marco": {
     "estado": "pendiente"
    },
    "agenda": {
     "estado": "pendiente"
    },
    "anexos": {
     "estado": "pendiente"
    }
   },
   "procesos": [
    {
     "codigo": "14.1",
     "n": "Gestión de la arquitectura de sistemas y de las integraciones",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Mantenimiento del mapa de plataformas del grupo —ERP multiempresa y multiversión, sistemas de gestión de almacén, plataformas de comercio electrónico, plataforma colaborativa, omnicanalidad de atención, facturación electrónica y pasarelas de pago por país—, definición de la fuente única de verdad para cada dominio de información, y diseño, construcción y mantenimiento de las interfaces entre ellas, incluida la sincronización de maestros entre las bases de datos de los países.",
      "dueno": "Gerente de Tecnología / Sistemas",
      "participantes": [
       "Coordinador(a) de Sistemas",
       "Coordinador(a) de Sistemas",
       "desarrolladores externos del equipo de sistemas",
       "partners del ERP por país (actores externos)",
       "Gerente de Contabilidad / Administración",
       "Gerente de Operaciones y Logística y Logística",
       "Gerente de E-commerce / Ventas Web (por país)"
      ],
      "cadencia": "Continua; revisión por evento (nueva plataforma, nueva entidad o nuevo país en operación)",
      "disparador": "Incorporación de una plataforma o de una entidad al ecosistema, o detección de un punto de información que no viaja entre sistemas",
      "output": "Mapa de plataformas e interfaces actualizado, con la integración construida y en producción",
      "fuentes": "E-07 Mariela Castro F1 (2026-06-22) — líneas 30, 62, 70-79; E-32 José VE F2 (2026-08-07) — líneas 42-50; E-52 César Rivodo y Mariela Castro F2 (2026-08-18) — línea 28; E-44 Ian Chen PA F2 (2026-08-11) — líneas 230-237"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "14.2",
     "n": "Gestión de requerimientos y evolución funcional del ERP",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Recepción del requerimiento funcional del área usuaria por el canal formal, evaluación de viabilidad y de impacto cruzado sobre otras áreas antes de comprometerlo, decisión de si se resuelve con configuración interna o corresponde a la localización propiedad del partner del país, asignación al desarrollador con competencia sobre el módulo, y acompañamiento hasta la validación del usuario.",
      "dueno": "Gerente de Tecnología / Sistemas",
      "participantes": [
       "Coordinador(a) de Sistemas",
       "gerentes de área solicitantes",
       "desarrolladores del equipo de sistemas",
       "partner del ERP por país (localización fiscal y desarrollos propios, actores externos)",
       "Gerente Regional Comercial / Retail o Country Manager como aprobadores según el alcance"
      ],
      "cadencia": "Continua; atención por solicitud y por prioridad acordada con el área",
      "disparador": "Requerimiento funcional levantado por un área usuaria, o cambio normativo que obliga a adaptar la localización del país",
      "output": "Requerimiento validado por el área usuaria, o descartado con justificación documentada",
      "fuentes": "E-07 F1 (2026-06-22) — líneas 95-140; E-32 VE F2 (2026-08-07) — líneas 12-14; E-38 Víctor Padovani VE F2 (2026-08-06) — líneas 56-58; E-44 PA F2 (2026-08-11) — líneas 153-157; E-46 Marcella Ramírez CO F2 (2026-08-13) — línea 108"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "14.3",
     "n": "Gestión del ciclo de desarrollo y despliegue a producción",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Ciclo del desarrollo sobre los tres ambientes del ERP: construcción en desarrollo por el programador asignado, certificación funcional en el ambiente de pruebas junto con el usuario, solicitud del pase a producción al partner —que retiene esa potestad—, ejecución del despliegue dentro de la ventana nocturna de lunes a jueves para no interrumpir la operación, y documentación de la personalización para sostener las migraciones de versión.",
      "dueno": "Gerente de Tecnología / Sistemas",
      "participantes": [
       "Coordinador(a) de Sistemas (certificación funcional)",
       "desarrolladores del equipo de sistemas",
       "partner del ERP por país (ejecuta el pase a producción, actor externo)",
       "usuario funcional del área solicitante"
      ],
      "cadencia": "Continua; ventana de despliegue restringida a las noches de lunes a jueves",
      "disparador": "Desarrollo certificado en el ambiente de pruebas y listo para pasar a producción",
      "output": "Desarrollo en producción, documentado en el inventario de personalizaciones del grupo",
      "fuentes": "E-32 José VE F2 (2026-08-07) — líneas 78-86; E-07 Mariela Castro F1 (2026-06-22) — líneas 101-107, 138-140"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "14.4",
     "n": "Gestión de accesos, ciberseguridad y protección de la información",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Alta, modificación y baja de usuarios y perfiles en las plataformas del grupo, control de las credenciales privilegiadas, operación de los filtros de seguridad y del antivirus, administración de dominios y de la configuración inicial de los sitios por país, atención de incidentes, y difusión de las prácticas seguras entre los usuarios.",
      "dueno": "Coordinador(a) de Sistemas",
      "participantes": [
       "Gerente de Tecnología / Sistemas",
       "Analista de Sistemas / Datos",
       "Gerente Regional de Marketing (solicitud de nuevos dominios y sitios)",
       "Coordinador(a) de Recursos Humanos (altas y bajas de personal)",
       "asesor externo de seguridad de la información (actor externo)"
      ],
      "cadencia": "Continua; revisión periódica de accesos y de vigencia de dominios",
      "disparador": "Ingreso, cambio de rol o salida de un colaborador; apertura de un mercado o de un sitio nuevo; incidente de seguridad detectado",
      "output": "Acceso otorgado, modificado o revocado con registro, e incidente contenido con las acciones correctivas aplicadas",
      "fuentes": "E-52 F2 (2026-08-18) — líneas 8-14, 20-21, 34-41, 47; E-12 Carmela Iribarren F1 (2026-07-09) — línea 93; E-07 F1 (2026-06-22) — línea 52"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "14.5",
     "n": "Soporte a usuario y gestión del parque tecnológico",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Atención de las incidencias tecnológicas de los usuarios de oficina y de punto de venta —equipos, redes, conectividad, periféricos de caja, impresora fiscal y acceso a las plataformas— a través del canal único de soporte por país, con cobertura extendida al horario comercial de las tiendas y escalamiento entre niveles, y gestión del inventario y del ciclo de vida de los equipos del grupo.",
      "dueno": "Gerente de Tecnología / Sistemas",
      "participantes": [
       "Coordinador(a) de Sistemas",
       "Analista de Sistemas / Datos",
       "Gerente de Tienda / Supervisor de Ventas y Asesor(a) de Ventas - Tienda (usuarios en punto de venta)",
       "Analista Contable Senior / Contador(a) Senior / Contador(a) (alta del equipo como activo fijo)",
       "proveedores de conectividad y de equipos (actores externos)"
      ],
      "cadencia": "Continua durante el horario operativo; cobertura extendida a fin de semana para el punto de venta",
      "disparador": "Incidencia reportada por un usuario de oficina o de tienda, o requerimiento de dotación o reemplazo de equipo",
      "output": "Incidencia resuelta con registro, o equipo dotado y registrado en el parque tecnológico",
      "fuentes": "E-32 José VE F2 (2026-08-07) — líneas 10-20; E-33 Héctor VE F2 (2026-08-07) — líneas 7-14; E-07 F1 (2026-06-22) — líneas 52-58"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "14.6",
     "n": "Habilitación tecnológica de puntos de venta y sedes nuevas",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Preparación tecnológica de una apertura o remodelación: levantamiento de requerimientos sobre el plano, inspección del local, definición de puntos eléctricos y de datos, coordinación de proveedores de conectividad, cableado, cámaras, telefonía y sonido, armado y prueba del equipamiento en laboratorio antes de la instalación, y parametrización del punto de venta en el ERP con sus métodos de pago, diarios contables e importación de la data maestra.",
      "dueno": "Coordinador(a) de Sistemas",
      "participantes": [
       "Analista de Sistemas / Datos (infraestructura física)",
       "Gerente de Proyectoss (coordinación de la apertura)",
       "Gerente de Contabilidad / Administración (creación de diarios contables)",
       "Gerente de Tecnología / Sistemas",
       "proveedores de conectividad, cámaras, telefonía e integración bancaria (actores externos)"
      ],
      "cadencia": "Por apertura o remodelación; picos por trimestre según el plan de expansión",
      "disparador": "Aprobación de la apertura de un punto de venta o sede, o decisión de remodelación que afecte la infraestructura tecnológica",
      "output": "Punto de venta operativo con equipamiento instalado y certificado, y configurado en el ERP con métodos de pago y diarios listos para facturar",
      "fuentes": "E-32 José VE F2 (2026-08-07) — líneas 86-92, 96-104; E-33 Héctor VE F2 (2026-08-07) — líneas 30-42"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "14.7",
     "n": "Gestión de proveedores y partners tecnológicos",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Identificación, evaluación y coordinación de los terceros de los que depende la operación tecnológica: partners del ERP por país que retienen la localización fiscal y el pase a producción, desarrolladores contratados de forma independiente y distribuidos en varios países, proveedor único de integración bancaria de los puntos de venta, y proveedores de conectividad, seguridad física y equipamiento de tienda.",
      "dueno": "Gerente de Tecnología / Sistemas",
      "participantes": [
       "Coordinador(a) de Sistemas",
       "Analista de Sistemas / Datos",
       "Gerente Regional Comercial / Retail",
       "Planificador Financiero (aprobación del gasto)",
       "Country Manager (decisión sobre partners estratégicos)",
       "partners y proveedores (actores externos)"
      ],
      "cadencia": "Continua (coordinación operativa); revisión por evento (incorporación o sustitución de un proveedor)",
      "disparador": "Necesidad de una capacidad técnica no cubierta internamente, o desempeño insuficiente de un proveedor o partner en operación",
      "output": "Proveedor o partner contratado y coordinado, con el alcance de su responsabilidad delimitado frente al equipo interno",
      "fuentes": "E-07 Mariela Castro F1 (2026-06-22) — líneas 95-101, 138-140; E-33 Héctor VE F2 (2026-08-07) — líneas 14-24, 40-44; E-32 VE F2 (2026-08-07) — líneas 32-38; E-46 Marcella Ramírez CO F2 (2026-08-13) — línea 132"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    }
   ]
  },
  {
   "prefijo": "15",
   "cat": "soporte",
   "n": "Gestión de Datos e Inteligencia de Negocio",
   "n0": {
    "introduccion": {
     "estado": "pendiente"
    },
    "contexto": {
     "estado": "pendiente"
    },
    "gobernanza": {
     "estado": "pendiente"
    },
    "marco": {
     "estado": "pendiente"
    },
    "agenda": {
     "estado": "pendiente"
    },
    "anexos": {
     "estado": "pendiente"
    }
   },
   "procesos": [
    {
     "codigo": "15.1",
     "n": "Captación y normalización de datos de origen",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Extracción, transformación y carga de la información que llega desde más de mil orígenes distintos: puntos de venta propios, cuentas de terceros que reportan en decenas de formatos incompatibles, y puntos de conexión habilitados sobre el ERP. Incluye la homologación de las nomenclaturas de producto que cada cliente usa y la construcción de la tabla normalizada que el grupo trata como fuente única de la verdad.",
      "dueno": "Analista de Sistemas / Datos (ETL)",
      "participantes": [
       "Analista de Sistemas / Datos (define la estructura destino)",
       "Gerente de Tecnología / Sistemas y Coordinador(a) de Sistemas (habilitación de puntos de conexión sobre el ERP)",
       "responsables comerciales de cuenta (envío de la data del cliente)",
       "clientes de terceros (actores externos)"
      ],
      "cadencia": "Diaria para los orígenes conectados al ERP; según la periodicidad pactada con cada cuenta para los orígenes externos",
      "disparador": "Llegada de la data del período desde un origen, o alta de un producto, cuenta o punto de venta nuevo",
      "output": "Tabla normalizada actualizada con la data del período cargada y homologada, disponible como fuente única de la verdad",
      "fuentes": "E-18 Alexis Mujica F1 (2026-07-06) — líneas 18, 26-35, 44, 47, 74, 115"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "15.2",
     "n": "Control de calidad y gobierno de la fuente de la verdad",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Verificación diaria de la integridad de la data cargada —ceros, valores nulos, valores atípicos, períodos fuera de rango y registros incompletos—, corrección o devolución al responsable del origen, validación de los cálculos y de los tipos de dato, y mantenimiento del diccionario de medidas que define cada indicador del repositorio.",
      "dueno": "Analista de Sistemas / Datos",
      "participantes": [
       "Analista de Sistemas / Datos (ETL)",
       "Analista de Sistemas / Datos",
       "Coordinador(a) de Sistemas",
       "responsables comerciales de cuenta (corrección del origen)"
      ],
      "cadencia": "Diaria para los orígenes conectados; por lote para los orígenes externos",
      "disparador": "Carga de un lote de data en el repositorio, o alerta del algoritmo de detección de valores atípicos",
      "output": "Data validada e incorporada al repositorio, o devuelta al responsable del origen con el defecto identificado",
      "fuentes": "E-18 F1 (2026-07-06) — líneas 21, 40, 48, 57, 99"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "15.3",
     "n": "Gestión del calendario de entrega de datos con las fuentes",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Acuerdo del cronograma de entrega de información con cada cuenta de terceros y con cada responsable interno, comunicación de la plantilla y del contenido mínimo esperado, seguimiento del cumplimiento del calendario, y escalamiento al responsable comercial de la cuenta cuando la entrega no llega, llega tarde o llega incompleta.",
      "dueno": "Analista de Sistemas / Datos",
      "participantes": [
       "Coordinador(a) Comercial",
       "Gerente Regional Comercial / Retail",
       "responsables comerciales de cuenta",
       "Analista de Sistemas / Datos (ETL)",
       "clientes de terceros (actores externos)"
      ],
      "cadencia": "Mensual como mínimo por cuenta; semanal o quincenal en las cuentas que lo permiten",
      "disparador": "Vencimiento de la fecha comprometida de entrega por parte de una fuente, o incorporación de una cuenta nueva al reporte de sell-out",
      "output": "Calendario de entrega acordado y cumplido por fuente, con las excepciones escaladas al responsable comercial",
      "fuentes": "E-18 F1 (2026-07-06) — líneas 47, 73-74, 89, 99, 108-115"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "15.4",
     "n": "Desarrollo de modelos analíticos y reglas de negocio",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Definición de las heurísticas y reglas de negocio con el área usuaria, validación estadística del método antes de adoptarlo, construcción de los modelos de proyección y de salud de inventario en sus tres niveles de negocio —mayor, tienda propia y tienda de tercero—, y calibración periódica del ajuste del modelo.",
      "dueno": "Analista de Sistemas / Datos",
      "participantes": [
       "Analista de Sistemas / Datos",
       "Coordinador(a) Comercial (aporta las heurísticas)",
       "Gerente Regional Comercial / Retail",
       "Gerente Regional Comercial / Retail",
       "Coordinador(a) de Logística y Bodega"
      ],
      "cadencia": "Por modelo (ciclos de desarrollo de semanas); calibración periódica del ajuste",
      "disparador": "Requerimiento de un área usuaria de resolver un problema de decisión, o degradación del ajuste de un modelo en producción",
      "output": "Modelo en producción con sus heurísticas documentadas y su ajuste validado contra la serie histórica",
      "fuentes": "E-18 F1 (2026-07-06) — líneas 50-56, 60; E-09 Ricardo Candanedo F1 (2026-06-23) — líneas 106-108"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "15.5",
     "n": "Construcción, publicación y mantenimiento de tableros",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Diseño de la interfaz del producto analítico, programación de la frecuencia de actualización según el uso —varias veces al día para punto de venta y consolidación mensual para los modelos—, publicación en el espacio de trabajo con los permisos correspondientes, y administración de la capacidad de cómputo y de las licencias del entorno analítico.",
      "dueno": "Analista de Sistemas / Datos",
      "participantes": [
       "Especialista de Producto / Proyecto",
       "Analista de Sistemas / Datos",
       "Gerente de Tecnología / Sistemas",
       "Coordinador(a) de Sistemas (permisos)",
       "Planificador Financiero (licencias)"
      ],
      "cadencia": "Continua (actualización programada); por producto para la construcción y publicación",
      "disparador": "Modelo o reporte aprobado para publicación, o vencimiento de una licencia o saturación de la capacidad de cómputo",
      "output": "Tablero publicado y actualizándose según la frecuencia definida, con los accesos otorgados a los usuarios autorizados",
      "fuentes": "E-18 F1 (2026-07-06) — líneas 44, 50-51, 57, 65, 71; E-63 John Mordoch F2 (2026-08-24) — líneas 67-69"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "15.6",
     "n": "Documentación, habilitación y medición del uso de los productos analíticos",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Entrega de manual de usuario, diccionario de medidas y heurísticas con cada producto analítico; formación de los usuarios clave que difunden la información hacia sus equipos; medición del uso real en la plataforma frente al uso declarado; y decisión de reforzar la habilitación o de retirar el producto que nadie consume.",
      "dueno": "Analista de Sistemas / Datos",
      "participantes": [
       "Analista de Sistemas / Datos (elabora manual y diccionario)",
       "Coordinador(a) Comercial (usuarios clave)",
       "Gerente de Recursos Humanos (Formación y Desarrollo)",
       "Gerente Regional Comercial / Retail",
       "Gerente Regional Comercial / Retail"
      ],
      "cadencia": "Por producto (entrega y habilitación); revisión trimestral de las métricas de uso",
      "disparador": "Publicación de un producto analítico nuevo, o detección de un producto publicado con uso nulo o marginal",
      "output": "Producto documentado y usuarios clave habilitados, con la métrica de uso medida y la decisión de refuerzo o retiro tomada",
      "fuentes": "E-18 Alexis Mujica F1 (2026-07-06) — líneas 57, 67, 102-107"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    }
   ]
  },
  {
   "prefijo": "16",
   "cat": "soporte",
   "n": "Gestión de Mercadeo y Comunicaciones",
   "n0": {
    "introduccion": {
     "estado": "pendiente"
    },
    "contexto": {
     "estado": "pendiente"
    },
    "gobernanza": {
     "estado": "pendiente"
    },
    "marco": {
     "estado": "pendiente"
    },
    "agenda": {
     "estado": "pendiente"
    },
    "anexos": {
     "estado": "pendiente"
    }
   },
   "procesos": [
    {
     "codigo": "16.1",
     "n": "Planificación del plan anual de mercadeo y del presupuesto",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Recepción del presupuesto anual aprobado, mapeo del calendario de campañas fijas de temporada por marca y por país, distribución de la inversión entre canales digitales y fuera de línea, y articulación del plan con el calendario comercial y con el de lanzamientos de producto.",
      "dueno": "Gerente Regional de Marketing",
      "participantes": [
       "Gerente de Marketing",
       "Gerente de Marketing",
       "Planificador Financiero (aprobación del presupuesto)",
       "Gerente Regional Comercial / Retail",
       "Gerente Regional de Marketing",
       "Gerente de Proyectoss"
      ],
      "cadencia": "Anual (construcción del plan y del presupuesto); revisión trimestral; seguimiento semanal de ejecución",
      "disparador": "Aprobación del presupuesto del ejercicio e inicio del ciclo anual de planificación",
      "output": "Plan anual de mercadeo aprobado con calendario de campañas por marca y país y presupuesto distribuido por canal",
      "fuentes": "E-22 Natasha Betancourt F1 (2026-07-07) — líneas 21, 43; E-49 Sofiana PA F2 (2026-08-13) — líneas 3, 20; E-42 Valentina VE F2 (2026-08-11) — líneas 34, 38"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "16.2",
     "n": "Desarrollo y ejecución de campañas",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Ciclo de la campaña desde el concepto: bajada de la idea creativa, construcción de los recursos visuales y del tono de la comunicación, definición de la mezcla de canales en línea y fuera de línea, producción de las piezas, despliegue coordinado entre países y cierre con la medición de resultados de la campaña.",
      "dueno": "Gerente Regional de Marketing",
      "participantes": [
       "Gerente de Marketing",
       "Coordinador(a) de Marca",
       "equipo creativo y de diseño gráfico",
       "Gerente de Marketing",
       "Gerente Regional de Visual Merchandising",
       "Gerente Regional Comercial / Retail",
       "Gerente de Proyectoss"
      ],
      "cadencia": "Por campaña; concentración en las temporadas fijas del calendario y en los lanzamientos",
      "disparador": "Campaña prevista en el calendario anual, lanzamiento de producto confirmado, o acción comercial acordada con un cliente ancla",
      "output": "Campaña desplegada en los mercados definidos con todas sus piezas producidas, y resultado medido contra el objetivo",
      "fuentes": "E-22 F1 (2026-07-07) — líneas 19, 21, 49; E-42 VE F2 (2026-08-11) — líneas 34, 38; E-49 PA F2 (2026-08-13) — línea 40"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "16.3",
     "n": "Gestión de solicitudes y tráfico creativo",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Canalización de toda solicitud de material a través del formulario único, clasificación y priorización del pedido, asignación al recurso creativo disponible, seguimiento del avance y entrega del recurso al solicitante, con trazabilidad del tráfico y de los tiempos de respuesta.",
      "dueno": "Coordinador(a) de Marca",
      "participantes": [
       "Gerente Regional de Marketing",
       "Gerente de Marketing",
       "diseñadores gráficos y editores de video",
       "áreas solicitantes (comercial, retail, ventas web, visual, servicio al cliente)"
      ],
      "cadencia": "Continua; asignación y seguimiento diarios",
      "disparador": "Solicitud de material creativo levantada por un área a través del formulario",
      "output": "Recurso creativo entregado al solicitante con la solicitud cerrada y el tiempo de atención registrado",
      "fuentes": "E-22 Natasha Betancourt F1 (2026-07-07) — líneas 21, 25, 49; E-42 VE F2 (2026-08-11) — línea 44"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "16.4",
     "n": "Adaptación local y despliegue por país de la comunicación regional",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Recepción del paquete regional de campaña con sus recursos y lineamientos, adaptación a los canales, formatos y condiciones comerciales de cada mercado —incluidos los marketplaces locales que exigen piezas propias—, publicación en los canales del país y devolución de la evidencia de despliegue al equipo regional.",
      "dueno": "Coordinador(a) de Marca",
      "participantes": [
       "Gerente Regional de Marketing (emite el paquete regional)",
       "Gerente de Marketing",
       "equipo creativo local",
       "Gerente de E-commerce / Ventas Web (por país)",
       "Gerente Regional de Visual Merchandising"
      ],
      "cadencia": "Por campaña; continua para las adaptaciones de canal recurrentes",
      "disparador": "Publicación del paquete regional de una campaña, o necesidad de una adaptación específica de un canal local",
      "output": "Campaña adaptada y publicada en los canales del país, con la evidencia de despliegue reportada al equipo regional",
      "fuentes": "E-42 Valentina VE F2 (2026-08-11) — líneas 21, 38, 44; E-56 Leslie CO F2 (2026-08-19) — líneas 58, 60; E-49 PA F2 (2026-08-13) — línea 40"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "16.5",
     "n": "Gestión de contenido, redes sociales y comunidad",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Construcción del calendario de contenido del período por marca y país, producción y publicación en los canales sociales propios, gestión de la conversación con la comunidad y derivación de las consultas comerciales o de postventa al canal correspondiente, y monitoreo de la reputación digital de la marca.",
      "dueno": "Coordinador(a) de Marca",
      "participantes": [
       "Líder de Marketing",
       "Gerente Regional de Marketing",
       "equipo creativo local",
       "Gerente de E-commerce / Ventas Web (por país)",
       "Coordinador(a) de Soporte / Servicio al Cliente (derivación de consultas)"
      ],
      "cadencia": "Continua (publicación y conversación); mensual (construcción del calendario de contenido)",
      "disparador": "Inicio del ciclo mensual de contenido, o mensaje entrante de un usuario en un canal social",
      "output": "Calendario de contenido publicado y conversación atendida, con las consultas comerciales y de postventa derivadas a su canal",
      "fuentes": "E-42 Valentina VE F2 (2026-08-11) — línea 38; E-56 Leslie CO F2 (2026-08-19) — línea 58; E-58 Patrick Corujo F2 (2026-08-19) — línea 144"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "16.6",
     "n": "Gestión de influencers, embajadores y alianzas de marca",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Identificación y selección de creadores de contenido, embajadores y equipos de atletas por mercado, negociación de la contraprestación y del alcance del acuerdo, coordinación del calendario de publicaciones y activaciones, y medición del retorno de cada relación.",
      "dueno": "Gerente de Marketing",
      "participantes": [
       "Gerente Regional de Marketing",
       "Gerente de Marketing",
       "Gerente de Marketing",
       "Country Manager (embajadores de alto perfil)",
       "creadores, embajadores y agencias (actores externos)"
      ],
      "cadencia": "Continua (relación y publicaciones); por evento (campaña, lanzamiento o apertura de mercado)",
      "disparador": "Campaña o lanzamiento que requiere vocería externa, o apertura de un mercado que exige construir comunidad",
      "output": "Acuerdo vigente con el creador o embajador y calendario de publicaciones cumplido, con el alcance medido",
      "fuentes": "E-12 Carmela Iribarren F1 (2026-07-09) — líneas 83-85; E-49 Sofiana PA F2 (2026-08-13) — línea 36; E-01 Bernardo Roizental F1 (2026-06-16) — línea 43"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "16.7",
     "n": "Visual merchandising y ejecución de la imagen en punto de venta",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Definición del estándar visual de cada marca y su implantación en el punto de venta: montaje visual de aperturas y remodelaciones, mantenimiento del estándar en la red de tiendas propias, y provisión de mobiliario de exhibición y material de punto de venta al canal mayorista y a las grandes superficies.",
      "dueno": "Gerente Regional de Visual Merchandising",
      "participantes": [
       "Ejecutivo(a) de Visual Merchandising",
       "Gerente Regional de Marketing",
       "Gerente Regional Comercial / Retail",
       "Gerente Comercial (País / Canal) al Detal (País) por país",
       "Gerente Regional Comercial / Retail y Key Account Manager (material para el canal)",
       "Gerente de Proyectoss (aperturas)",
       "proveedores de mobiliario y producción gráfica (actores externos)"
      ],
      "cadencia": "Continua (mantenimiento del estándar en tienda); por proyecto (apertura o remodelación); por solicitud (material para el canal)",
      "disparador": "Apertura o remodelación de un punto de venta, campaña que exige cambio de imagen en tienda, o solicitud de mobiliario o material de un cliente del canal",
      "output": "Punto de venta o exhibidor implantado conforme al estándar visual vigente de la marca",
      "fuentes": "E-31 Sesión de levantamiento con Visual y Marketing VE (2026-08-07) — líneas 2-10; E-50 Sabrina y Reina (2025-08-16) — líneas 27, 33; E-01 F1 (2026-06-16) — líneas 346-348"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "16.8",
     "n": "Reportería de mercadeo y medición del desempeño de marca",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Definición y seguimiento de los indicadores de mercadeo por marca y país —alcance, interacción, tráfico, conversión, inversión y retorno—, atención de la reportería exigida por la casa matriz de la marca representada, y presentación del avance en la instancia mensual de reporte a la dirección.",
      "dueno": "Gerente Regional de Marketing",
      "participantes": [
       "Gerente de Marketing",
       "Gerente de Marketing",
       "Analista de Sistemas / Datos",
       "Gerente Regional Comercial / Retail",
       "Junta Directiva (destinataria del reporte)",
       "casa matriz de la marca representada (actor externo)"
      ],
      "cadencia": "Semanal (estatus con los equipos de país); mensual (reporte a la dirección y a la casa matriz de la marca representada)",
      "disparador": "Cierre del período de campaña o del mes, o requerimiento de reportería de la casa matriz de la marca representada",
      "output": "Reporte de desempeño de mercadeo por marca y país entregado a la dirección y a la casa matriz cuando corresponde",
      "fuentes": "E-49 Sofiana PA F2 (2026-08-13) — línea 45; E-22 Natasha Betancourt F1 (2026-07-07) — línea 43; E-01 F1 (2026-06-16) — líneas 171-175"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    }
   ]
  },
  {
   "prefijo": "17",
   "cat": "soporte",
   "n": "Gestión del Talento Humano",
   "n0": {
    "introduccion": {
     "estado": "pendiente"
    },
    "contexto": {
     "estado": "pendiente"
    },
    "gobernanza": {
     "estado": "pendiente"
    },
    "marco": {
     "estado": "pendiente"
    },
    "agenda": {
     "estado": "pendiente"
    },
    "anexos": {
     "estado": "pendiente"
    }
   },
   "procesos": [
    {
     "codigo": "17.1",
     "n": "Atracción, selección y contratación",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Desde la requisición del gerente hasta la incorporación formal: definición del perfil, publicación en portales de empleo y activación de la red de referidos internos, filtro de candidatos, entrevistas técnicas y directivas, oferta, y formalización del vínculo con el registro del colaborador ante los entes de seguridad social y laborales del país.",
      "dueno": "Gerente de Recursos Humanos",
      "participantes": [
       "Analista de Recursos Humanos / Nómina (búsqueda y filtro)",
       "Coordinador(a) de Recursos Humanos",
       "gerente solicitante",
       "Country Manager (entrevistas de posiciones clave)",
       "Asistente Administrativo(a) / Servicios Generales",
       "empresa de servicios de personal en el país donde la relación está tercerizada (actor externo)"
      ],
      "cadencia": "Continua; picos por el ritmo de expansión de la red de tiendas",
      "disparador": "Requisición de personal levantada por un gerente, o vacante generada por una salida",
      "output": "Colaborador contratado, registrado ante los entes correspondientes y con su expediente abierto",
      "fuentes": "E-37 Evelyn Manso y Mayari VE (2026-08-07) — líneas 3, 90, 162; E-54 Catherine Jiménez PA F2 (2026-08-18) — líneas 52, 58; E-13 Nuria Ashby PA F1 (2026-07-01); E-01 Bernardo Roizental F1 (2026-06-16) — líneas 205-213"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "17.2",
     "n": "Inducción e incorporación del colaborador",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Recibimiento formal del colaborador que ingresa: presentación de la organización, de las marcas y de la cultura del grupo, entrega de la información de beneficios y de las condiciones de la relación, presentación al equipo y al puesto, y entrega del material de incorporación.",
      "dueno": "Coordinador(a) de Recursos Humanos",
      "participantes": [
       "Gerente de Recursos Humanos",
       "gerente del área receptora",
       "Gerente de Recursos Humanos (Formación y Desarrollo)",
       "Coordinador(a) de Sistemas (alta de accesos y dotación)",
       "Subgerente de Servicio Técnico (formación de producto para roles de cara al cliente)"
      ],
      "cadencia": "Por ingreso",
      "disparador": "Confirmación de la fecha de ingreso de un colaborador nuevo",
      "output": "Colaborador incorporado con la inducción recibida, los accesos otorgados y la dotación entregada",
      "fuentes": "E-37 VE (2026-08-07) — líneas 78, 92; E-54 PA F2 (2026-08-18) — líneas 8, 105; E-12 Carmela Iribarren F1 (2026-07-09) — línea 43; E-02 Patrick Corujo F1 (2026-06-18) — líneas 143, 149"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "17.3",
     "n": "Administración de nómina y de las obligaciones laborales",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Ciclo de la nómina del período: recolección de las novedades que reportan las gerencias y los puntos de venta —asistencia, variaciones, comisiones y ausencias—, cálculo en el sistema de nómina, revisión y aprobación, ejecución del pago, y declaración y pago de las obligaciones ante los entes de seguridad social y parafiscales, con entrega del reporte a Contabilidad para su contabilización.",
      "dueno": "Gerente de Recursos Humanos",
      "participantes": [
       "Analista de Recursos Humanos / Nómina",
       "Coordinador(a) de Recursos Humanos",
       "Gerentes de área y Gerentes de Tienda (reporte de novedades)",
       "Gerente de Tesorería (ejecución del pago)",
       "Gerente de Contabilidad / Administración (contabilización y cuadre con los entes)",
       "empresa de servicios de personal donde la relación está tercerizada (actor externo)"
      ],
      "cadencia": "Quincenal o mensual según el país; declaraciones mensuales, trimestrales y anuales según el ente",
      "disparador": "Cierre del período de nómina, o vencimiento del calendario de declaración de un ente",
      "output": "Nómina pagada y conciliada, con las obligaciones declaradas y pagadas y el reporte entregado a Contabilidad",
      "fuentes": "E-37 VE (2026-08-07) — líneas 3, 5-11, 162, 166; E-54 PA F2 (2026-08-18) — líneas 24, 106, 112; E-44 Ian Chen PA F2 (2026-08-11) — líneas 195, 201; E-46 Marcella Ramírez CO F2 (2026-08-13) — líneas 100-106"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "17.4",
     "n": "Administración de la relación laboral y del expediente",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Gestión de los hechos que ocurren durante la relación laboral: emisión de constancias y cartas, tramitación de permisos, ausencias, reposos y vacaciones, registro de amonestaciones e incidencias disciplinarias, mantenimiento del expediente exigido por la normativa de cada país, y atención de las visitas de fiscalización de los entes laborales.",
      "dueno": "Coordinador(a) de Recursos Humanos",
      "participantes": [
       "Gerente de Recursos Humanos",
       "Analista de Recursos Humanos / Nómina",
       "gerentes de área y Gerentes de Tienda (originan y aprueban la incidencia)",
       "Asesor(a) Jurídico(a) Externo(a) del Grupo y asesoría laboral externa",
       "entes laborales y de seguridad social (actores externos)"
      ],
      "cadencia": "Continua; por evento para las fiscalizaciones",
      "disparador": "Solicitud de un colaborador o de su gerente, incidencia disciplinaria, o visita de fiscalización de un ente",
      "output": "Solicitud o incidencia resuelta y documentada en el expediente del colaborador, con la documentación disponible para fiscalización",
      "fuentes": "E-37 VE (2026-08-07) — líneas 149-150, 162, 166; E-54 PA F2 (2026-08-18) — líneas 24, 52; E-46 CO F2 (2026-08-13) — línea 106"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "17.5",
     "n": "Gestión de compensación y beneficios",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Aplicación y mantenimiento de la escala salarial aprobada por Finanzas: ubicación del colaborador en la escala al ingreso y ante un movimiento, revisión periódica de la equidad interna, administración de la póliza de salud corporativa y del resto de beneficios, y comunicación de los cambios a los colaboradores.",
      "dueno": "Gerente de Recursos Humanos",
      "participantes": [
       "Planificador Financiero (aprueba la escala y los movimientos)",
       "Coordinador(a) de Recursos Humanos",
       "Analista de Recursos Humanos / Nómina",
       "Country Manager (decisiones de compensación de posiciones clave)",
       "corredores y aseguradoras (actores externos)"
      ],
      "cadencia": "Continua (aplicación); revisión anual de la escala y por evento ante un cambio de proveedor de beneficios",
      "disparador": "Ingreso o movimiento de un colaborador, revisión anual de la escala, o cambio en las condiciones de un beneficio",
      "output": "Colaborador ubicado en la escala con su paquete de beneficios activo, y escala vigente aprobada por Finanzas",
      "fuentes": "E-37 VE (2026-08-07) — líneas 93-94, 101; E-54 PA F2 (2026-08-18) — línea 106; E-01 Bernardo Roizental F1 (2026-06-16) — líneas 208-209"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "17.6",
     "n": "Administración de la estructura de cargos y descripciones de puesto",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Mantenimiento del organigrama de cada país y de las descripciones de puesto asociadas: creación y modificación de posiciones conforme a la línea rectora aprobada, redacción y actualización de la descripción de cada cargo, y conciliación entre el cargo formal registrado y las funciones que la persona realmente ejerce.",
      "dueno": "Gerente de Recursos Humanos",
      "participantes": [
       "Gerente de Recursos Humanos",
       "Country Manager (aprueba la creación de posiciones)",
       "gerentes de área",
       "Coordinador(a) de Recursos Humanos",
       "Director(a) Externo(a) de Junta Directiva"
      ],
      "cadencia": "Continua (mantenimiento); revisión anual del organigrama por país",
      "disparador": "Creación o modificación de una posición, o detección de una brecha entre el cargo formal y las funciones reales",
      "output": "Organigrama del país actualizado con las descripciones de puesto vigentes y conciliadas con las funciones reales",
      "fuentes": "E-01 F1 (2026-06-16) — líneas 207, 330-334, 348; E-37 VE (2026-08-07) — línea 3; E-33 Héctor VE F2 (2026-08-07) — líneas 7-11; E-58 Patrick Corujo F2 (2026-08-19) — línea 24"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "17.7",
     "n": "Gestión del desempeño",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Definición de los objetivos individuales alineados con los indicadores del área, conversación de seguimiento entre el colaborador y su supervisor durante el período, evaluación formal del desempeño al cierre del ciclo, y traducción del resultado en decisiones de desarrollo, movimiento o compensación.",
      "dueno": "Gerente de Recursos Humanos",
      "participantes": [
       "Gerente de Recursos Humanos",
       "gerentes y supervisores de área (evaluadores)",
       "Country Manager",
       "Planificador Financiero (vínculo con compensación)",
       "Director(a) Externo(a) de Junta Directiva"
      ],
      "cadencia": "Anual (ciclo de evaluación); trimestral o semestral (conversación de seguimiento)",
      "disparador": "Cierre del ciclo anual de desempeño, o incorporación de un colaborador que requiere fijar objetivos",
      "output": "Evaluación de desempeño registrada por colaborador, con el plan de acción y la recomendación de desarrollo acordados",
      "fuentes": "E-37 VE (2026-08-07) — línea 99; E-54 PA F2 (2026-08-18) — línea 8; E-20 Máximo Dolman F1 (2026-07-07) — línea 162; E-01 F1 (2026-06-16) — línea 120"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "17.8",
     "n": "Formación y desarrollo",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Detección de las necesidades de formación por área y por rol, construcción del plan de formación del período con su presupuesto, diseño o contratación de la actividad según sea contenido que el equipo domina o requiera un tercero, ejecución y registro de la asistencia, y evaluación del aprovechamiento.",
      "dueno": "Gerente de Recursos Humanos (Formación y Desarrollo)",
      "participantes": [
       "Gerente de Recursos Humanos",
       "Analista de Recursos Humanos / Nómina",
       "gerentes de área (definen la necesidad)",
       "Subgerente de Servicio Técnico (formación de producto)",
       "Gerente de Tecnología / Sistemas (competencias digitales)",
       "proveedores de formación (actores externos)"
      ],
      "cadencia": "Anual (plan y presupuesto); por actividad para la ejecución",
      "disparador": "Necesidad de formación detectada por un área, incorporación de una tecnología o producto nuevo, o brecha identificada en la evaluación de desempeño",
      "output": "Actividad de formación ejecutada con asistencia registrada y aprovechamiento evaluado",
      "fuentes": "E-37 VE (2026-08-07) — líneas 5, 99; E-54 PA F2 (2026-08-18) — línea 60; E-58 Patrick Corujo F2 (2026-08-19) — línea 32; E-64 PA F2 (2026-08-24) — línea 146"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "17.9",
     "n": "Clima organizacional y bienestar",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Diseño y ejecución del programa de bienestar y de las actividades de clima con su presupuesto asignado, medición periódica del clima y de la experiencia del colaborador, y canalización de las iniciativas de bienestar que proponen los propios equipos.",
      "dueno": "Gerente de Recursos Humanos",
      "participantes": [
       "Gerente de Recursos Humanos",
       "Coordinador(a) de Recursos Humanos",
       "Asistente Administrativo(a) / Servicios Generales",
       "Gerente Regional de Marketing (comunicación interna de las actividades)",
       "gerentes de área"
      ],
      "cadencia": "Anual (programa y presupuesto); continua (ejecución de actividades); anual o bienal (medición del clima)",
      "disparador": "Aprobación del programa de bienestar del período, o iniciativa propuesta por un equipo o por un colaborador",
      "output": "Actividad de bienestar ejecutada con participación registrada, y resultado de la medición de clima disponible",
      "fuentes": "E-54 Catherine Jiménez PA F2 (2026-08-18) — líneas 8, 82; E-37 VE (2026-08-07) — líneas 99, 102; E-12 Carmela Iribarren F1 (2026-07-09) — líneas 25, 43"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "17.10",
     "n": "Desvinculación y liquidación",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Cierre de la relación laboral: registro de la causa y de la fecha de salida, cálculo de la liquidación con las prestaciones, vacaciones pendientes y descuentos aplicables incluidos los préstamos internos vigentes, revocación de accesos y recuperación de la dotación, ejecución del pago y baja ante los entes.",
      "dueno": "Gerente de Recursos Humanos",
      "participantes": [
       "Analista de Recursos Humanos / Nómina (cálculo)",
       "Coordinador(a) de Recursos Humanos",
       "Gerente de Contabilidad / Administración (validación del cálculo y registro)",
       "Gerente de Tesorería (pago)",
       "Coordinador(a) de Sistemas (revocación de accesos y recuperación de equipos)",
       "gerente del área",
       "asesoría laboral externa (actor externo)"
      ],
      "cadencia": "Por evento",
      "disparador": "Renuncia, terminación de la relación laboral o vencimiento de un contrato",
      "output": "Liquidación calculada, validada y pagada, con los accesos revocados, la dotación recuperada y la baja registrada ante los entes",
      "fuentes": "E-38 Víctor Padovani VE F2 (2026-08-06) — líneas 186-190; E-37 VE (2026-08-07) — línea 3; E-54 PA F2 (2026-08-18) — línea 52"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    }
   ]
  },
  {
   "prefijo": "18",
   "cat": "soporte",
   "n": "Gestión Legal y Cumplimiento",
   "n0": {
    "introduccion": {
     "estado": "pendiente"
    },
    "contexto": {
     "estado": "pendiente"
    },
    "gobernanza": {
     "estado": "pendiente"
    },
    "marco": {
     "estado": "pendiente"
    },
    "agenda": {
     "estado": "pendiente"
    },
    "anexos": {
     "estado": "pendiente"
    }
   },
   "procesos": [
    {
     "codigo": "18.1",
     "n": "Gobierno de la política jurídica del grupo",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Definición y mantenimiento del marco jurídico común a todas las entidades: criterios de contratación con terceros, exigencia y modelo de acuerdo de confidencialidad, delegación de firma y umbrales de aprobación, y coordinación del asesor jurídico corporativo con los bufetes locales y con la asesoría laboral y tributaria de cada país.",
      "dueno": "Country Manager",
      "participantes": [
       "Asesor(a) Jurídico(a) Externo(a) del Grupo (General Counsel)",
       "bufetes locales por país y asesoría laboral externa (actores externos)",
       "Planificador Financiero",
       "Gerente de Recursos Humanos",
       "Junta Directiva (aprueba la política)"
      ],
      "cadencia": "Continua (atención de consultas); revisión anual de la política y del marco contractual",
      "disparador": "Cambio en el marco de operación del grupo, incorporación de una entidad o de un tipo de tercero no previsto, o brecha detectada en la aplicación de la política",
      "output": "Política jurídica del grupo vigente, con los modelos y umbrales de aprobación definidos y aplicados de forma homogénea entre entidades",
      "fuentes": "E-01 Bernardo Roizental F1 (2026-06-16) — líneas 25-32, 192-195; E-12 Carmela Iribarren F1 (2026-07-09) — líneas 89-93; E-20 Máximo Dolman F1 (2026-07-07) — línea 68"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "18.2",
     "n": "Gestión del ciclo de vida contractual",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Ciclo del instrumento contractual desde la necesidad hasta el archivo: elaboración o revisión del texto según el modelo aplicable, negociación de las cláusulas con la contraparte, validación jurídica antes de la firma, firma por el apoderado con facultad, custodia del original y seguimiento de vencimientos y renovaciones de contratos con fábricas, marcas representadas, socios, distribuidores, arrendadores y proveedores.",
      "dueno": "Asesor(a) Jurídico(a) Externo(a) del Grupo (General Counsel)",
      "participantes": [
       "Country Manager (firma)",
       "Gerente Regional de Marketing y Gerente Regional Comercial / Retail (contratos con fábricas y proveedores)",
       "Gerente Regional Comercial / Retail (contratos con clientes y distribuidores)",
       "Gerente de Recursos Humanos (contratos de trabajo)",
       "bufetes locales (actores externos)"
      ],
      "cadencia": "Por evento; revisión periódica del vencimiento de los contratos vigentes",
      "disparador": "Necesidad de formalizar una relación con un tercero, o proximidad del vencimiento de un contrato en vigor",
      "output": "Instrumento firmado por las partes, archivado y con su fecha de vencimiento y condiciones registradas para seguimiento",
      "fuentes": "E-01 F1 (2026-06-16) — líneas 28-32, 193; E-63 John Mordoch F2 (2026-08-24) — líneas 87, 92; E-60 Alejandro y Estefanía Roizental F2 (2026-08-20) — línea 43; E-49 Sofiana PA F2 (2026-08-13) — líneas 133, 138"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "18.3",
     "n": "Gestión de la estructura societaria y de las representaciones legales",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Mantenimiento de las sociedades del grupo en cuatro países y en Estados Unidos, más las entidades intermediarias e inmobiliarias: constitución y modificación estatutaria, actualización de poderes y de representantes legales, registro mercantil, cumplimiento de las obligaciones societarias anuales, y coordinación con los bufetes que administran las entidades en cada jurisdicción.",
      "dueno": "Country Manager",
      "participantes": [
       "Asesor(a) Jurídico(a) Externo(a) del Grupo",
       "bufete corporativo de la jurisdicción de las sociedades (actor externo)",
       "Planificador Financiero",
       "Gerente de Contabilidad / Administración",
       "Junta Directiva"
      ],
      "cadencia": "Anual (obligaciones societarias); por evento (constitución, modificación o cambio de representante)",
      "disparador": "Constitución o modificación de una sociedad, cambio de representante legal o de apoderado, o vencimiento de una obligación societaria anual",
      "output": "Sociedad vigente y en cumplimiento, con sus poderes y representantes actualizados en el registro correspondiente",
      "fuentes": "E-01 F1 (2026-06-16) — líneas 193, 304, 316; E-07 Mariela Castro F1 (2026-06-22) — línea 78; E-44 Ian Chen PA F2 (2026-08-11) — líneas 42, 77; E-19 Jill Porat CR F1 (2026-07-07) — línea 5"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "18.4",
     "n": "Protección de la propiedad intelectual y de la marca",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Registro y mantenimiento de las marcas propias en los mercados donde el grupo opera o proyecta operar, control del uso correcto de la marca por parte de franquiciados, socios y distribuidores, administración de las licencias de propiedad intelectual de terceros y de sus condiciones de uso, y atención de los casos de uso indebido o de producto no autorizado en circulación.",
      "dueno": "Asesor(a) Jurídico(a) Externo(a) del Grupo (General Counsel)",
      "participantes": [
       "Gerente Regional de Marketing",
       "Especialista de Producto / Proyecto",
       "Gerente Regional de Marketing",
       "Gerente Regional Comercial / Retail (franquiciados y distribuidores)",
       "licenciantes y agentes de propiedad industrial (actores externos)"
      ],
      "cadencia": "Por evento (registro, renovación o incidencia); revisión anual del portafolio de marcas y licencias",
      "disparador": "Entrada a un mercado nuevo, desarrollo de una colección bajo licencia de un tercero, vencimiento de un registro, o detección de uso indebido de la marca",
      "output": "Marca registrada y vigente en la jurisdicción, o licencia de tercero administrada dentro de las condiciones acordadas",
      "fuentes": "E-60 F2 (2026-08-20) — líneas 43, 58-59; E-01 F1 (2026-06-16) — líneas 28, 56; E-20 Máximo Dolman F1 (2026-07-07) — líneas 8, 12-14"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "18.5",
     "n": "Cumplimiento regulatorio y atención de fiscalizaciones",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Mantenimiento del inventario de obligaciones regulatorias no tributarias que aplican a la operación en cada país —permisología de importación y certificación de producto, normas de protección al consumidor, permisos de trabajo de personal extranjero, licencias de funcionamiento y normativa de seguridad de las sedes—, seguimiento de su vigencia, y coordinación de la respuesta cuando un ente fiscalizador se presenta o requiere información.",
      "dueno": "Country Manager",
      "participantes": [
       "Asesor(a) Jurídico(a) Externo(a) del Grupo",
       "Gerente de Contabilidad / Administración (fiscalización tributaria)",
       "Gerente de Recursos Humanos (fiscalización laboral)",
       "Coordinador(a) de Logística y Bodega (permisología de producto)",
       "Gerente Regional de Marketing (normativa de protección al consumidor)",
       "entes reguladores (actores externos)"
      ],
      "cadencia": "Continua (seguimiento de vigencias); por evento (visita o requerimiento de un ente)",
      "disparador": "Vencimiento de un permiso o certificación, cambio normativo en un país, o visita o requerimiento de un ente fiscalizador",
      "output": "Obligación regulatoria vigente y documentada, o fiscalización atendida con la respuesta remitida y el hallazgo cerrado",
      "fuentes": "E-54 Catherine Jiménez PA F2 (2026-08-18) — líneas 282, 286; E-37 Evelyn Manso y Mayari VE (2026-08-07) — líneas 162, 166; E-49 Sofiana PA F2 (2026-08-13) — línea 199; E-38 Víctor Padovani VE F2 (2026-08-06) — línea 74"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "18.6",
     "n": "Gestión de contingencias, litigios y asesoría legal especializada",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Detección temprana de la contingencia legal, evaluación del riesgo y de la exposición, decisión sobre la estrategia de defensa o de negociación, designación y coordinación del abogado especializado, seguimiento del caso hasta su cierre, y registro de la lección para prevenir su repetición.",
      "dueno": "Country Manager",
      "participantes": [
       "Asesor(a) Jurídico(a) Externo(a) del Grupo",
       "asesoría laboral externa y bufetes especializados (actores externos)",
       "Planificador Financiero (provisión y exposición)",
       "Gerente de Recursos Humanos",
       "Junta Directiva (decisión en casos de impacto material)"
      ],
      "cadencia": "Por evento; seguimiento periódico de los casos abiertos",
      "disparador": "Reclamo de un colaborador, cliente, proveedor o ente; incidente con exposición legal; o consulta especializada que excede al asesor corporativo",
      "output": "Caso cerrado con la decisión y su fundamento documentados, y la exposición cuantificada e informada a Finanzas",
      "fuentes": "E-54 PA F2 (2026-08-18) — línea 306; E-12 Carmela Iribarren F1 (2026-07-09) — línea 91; E-01 F1 (2026-06-16) — línea 43"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    }
   ]
  },
  {
   "prefijo": "19",
   "cat": "soporte",
   "n": "Gestión de Servicios Generales y Administración",
   "n0": {
    "introduccion": {
     "estado": "pendiente"
    },
    "contexto": {
     "estado": "pendiente"
    },
    "gobernanza": {
     "estado": "pendiente"
    },
    "marco": {
     "estado": "pendiente"
    },
    "agenda": {
     "estado": "pendiente"
    },
    "anexos": {
     "estado": "pendiente"
    }
   },
   "procesos": [
    {
     "codigo": "19.1",
     "n": "Mantenimiento de infraestructura e instalaciones",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Atención de las fallas y del mantenimiento preventivo de las instalaciones de oficinas, depósitos y puntos de venta: sistema eléctrico y de alumbrado, circuito cerrado de televisión, centrales de alarma de incendio y de intrusión, y el resto de la infraestructura física, sea con ejecución directa cuando la competencia es interna o mediante contratista cuando no lo es.",
      "dueno": "Asistente Administrativo(a) / Servicios Generales",
      "participantes": [
       "Asistente Administrativo(a) / Servicios Generales",
       "Gerente Comercial (País / Canal) al Detal (País) y Gerente de Tienda / Supervisor de Ventas (solicitantes desde el punto de venta)",
       "Analista de Sistemas / Datos (frontera con la infraestructura tecnológica)",
       "contratistas de electricidad, obra civil, alarmas y mantenimiento (actores externos)"
      ],
      "cadencia": "Continua (atención correctiva); preventivo programado en el sistema eléctrico",
      "disparador": "Falla reportada por un gerente, encargado de departamento o personal de tienda, o llegada de la fecha del mantenimiento preventivo programado",
      "output": "Falla resuelta o mantenimiento ejecutado, con la sede o el punto de venta operativo",
      "fuentes": "E-45 William Porras VE F2 (2026-08-12) — líneas 8, 16, 32, 92, 100, 116, 160-176; E-33 Héctor VE F2 (2026-08-07) — líneas 30-42"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "19.2",
     "n": "Gestión de la sede y relación con el arrendador o condominio",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Administración de las condiciones de ocupación de cada sede y punto de venta: relación con la administración del edificio o del centro comercial, coordinación de las intervenciones que afectan áreas comunes, atención de las cuotas y obligaciones del condominio, y gestión de los servicios básicos y de las contingencias de suministro.",
      "dueno": "Asistente Administrativo(a) / Servicios Generales",
      "participantes": [
       "Asistente Administrativo(a) / Servicios Generales",
       "Supervisor de Ventas y Gerente Comercial (País / Canal) al Detal (País) (sedes comerciales)",
       "Gerente de Contabilidad / Administración (cuotas y facturación)",
       "Country Manager",
       "administración del edificio o del centro comercial (actor externo)"
      ],
      "cadencia": "Continua; mensual para las cuotas y obligaciones recurrentes",
      "disparador": "Requerimiento o notificación de la administración del inmueble, o incidencia de servicios que afecta la operación de la sede",
      "output": "Obligación de la sede atendida y relación con el arrendador o condominio en orden, sin interrupción de la operación",
      "fuentes": "E-45 VE F2 (2026-08-12) — líneas 16, 242-244; E-33 VE F2 (2026-08-07) — línea 42; E-38 Víctor Padovani VE F2 (2026-08-06) — línea 70"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "19.3",
     "n": "Gestión de suministros de oficina y consumibles",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Control del inventario de insumos de oficina, papelería, consumibles y material de limpieza en cada sede, detección de la necesidad de reposición, solicitud y aprobación de la compra, recepción y descarga del insumo en el depósito interno, y entrega al área solicitante.",
      "dueno": "Asistente Administrativo(a) / Servicios Generales",
      "participantes": [
       "Asistente Administrativo(a) / Servicios Generales",
       "asistentes administrativas de sede",
       "Analista de Cuentas por Cobrar (pago al proveedor)",
       "Gerente de Tesorería (aprobación del desembolso)",
       "proveedores de insumos (actores externos)"
      ],
      "cadencia": "Continua; reposición según el nivel del inventario interno",
      "disparador": "Nivel bajo detectado en el inventario interno de la sede, o solicitud puntual de un área",
      "output": "Insumo repuesto en el depósito interno de la sede y entregado al solicitante",
      "fuentes": "E-45 William Porras VE F2 (2026-08-12) — líneas 8, 48-52, 107-110, 138-142; E-44 Ian Chen PA F2 (2026-08-11) — línea 59"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "19.4",
     "n": "Mensajería, correspondencia y transporte administrativo",
     "madurez": "as-is",
     "mapa": {
      "alcance": "Gestión de los movimientos físicos de la operación administrativa: distribución y recepción de correspondencia y documentación entre sedes, entidades bancarias y entes públicos, traslado de valores y soportes desde los puntos de venta hacia la oficina principal, y coordinación del personal motorizado y del transporte administrativo.",
      "dueno": "Asistente Administrativo(a) / Servicios Generales",
      "participantes": [
       "Auxiliar / Ayudante de Bodega y Tráfico",
       "Gerente de Contabilidad / Administración (traslado de soportes y valores)",
       "Coordinador(a) de Logística y Bodega (valija entre tiendas y oficina)",
       "Gerente de Recursos Humanos (trámites ante entes)"
      ],
      "cadencia": "Continua diaria; rutas programadas para la recolección en puntos de venta",
      "disparador": "Necesidad de traslado de documentación, valores o soportes entre sedes, entidades o entes",
      "output": "Documento, valor o soporte entregado en destino con la constancia de recepción correspondiente",
      "fuentes": "E-45 VE F2 (2026-08-12) — líneas 107, 136-138; E-38 VE F2 (2026-08-06) — líneas 168-172; E-44 PA F2 (2026-08-11) — línea 195"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "19.5",
     "n": "Seguridad física y control de acceso a las sedes",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Operación de los dispositivos y rutinas de seguridad física de las sedes y puntos de venta: apertura y cierre de las instalaciones, custodia de llaves y claves de acceso, operación de las centrales de alarma de intrusión e incendio, coordinación con la vigilancia del inmueble, y respuesta ante un evento de seguridad.",
      "dueno": "Asistente Administrativo(a) / Servicios Generales",
      "participantes": [
       "Asistente Administrativo(a) / Servicios Generales",
       "Gerente de Tienda / Supervisor de Ventas / Supervisor de Ventas (apertura y cierre del punto de venta)",
       "Analista de Sistemas / Datos (circuito cerrado y sistemas asociados)",
       "Coordinador(a) de Sistemas (frontera con la seguridad lógica)",
       "empresas de vigilancia y de monitoreo de alarmas (actores externos)"
      ],
      "cadencia": "Continua diaria (apertura y cierre); por evento ante una alarma o incidente",
      "disparador": "Apertura o cierre de la sede, activación de una alarma, o incidente de seguridad reportado",
      "output": "Sede abierta o cerrada con el control ejercido, e incidente de seguridad atendido y reportado",
      "fuentes": "E-45 William Porras VE F2 (2026-08-12) — líneas 8, 32; E-33 Héctor VE F2 (2026-08-07) — líneas 40-42"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "19.6",
     "n": "Gestión de contratistas y proveedores de servicios generales",
     "madurez": "híbrido",
     "mapa": {
      "alcance": "Identificación y calificación de los contratistas que ejecutan lo que el equipo interno no cubre —obra civil, plomería, pintura, limpieza, mantenimiento general y montaje de tienda—, obtención y comparación de presupuestos, presentación de la propuesta al aprobador con facultad, supervisión de la ejecución en sitio, y recepción conforme del trabajo.",
      "dueno": "Asistente Administrativo(a) / Servicios Generales",
      "participantes": [
       "Asistente Administrativo(a) / Servicios Generales (aprobación del gasto ordinario)",
       "Gerente Comercial (País / Canal) al Detal (País) (País) (País) (intervenciones en punto de venta)",
       "Gerente de Operaciones y Logística y Logística (aprobación por encima del umbral)",
       "Analista de Cuentas por Cobrar",
       "contratistas (actores externos)"
      ],
      "cadencia": "Por evento; recurrente para los contratistas de mantenimiento y limpieza",
      "disparador": "Necesidad de una intervención que excede la competencia del equipo interno, o vencimiento del contrato de un servicio recurrente",
      "output": "Trabajo ejecutado y recibido conforme, con el presupuesto aprobado y la factura tramitada",
      "fuentes": "E-45 William Porras VE F2 (2026-08-12) — líneas 8, 38-40, 48-52, 100, 116-120, 176-180"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    }
   ]
  },
  {
   "prefijo": "20",
   "cat": "soporte",
   "n": "Gestión de Procesos y Mejora Continua",
   "n0": {
    "introduccion": {
     "estado": "pendiente"
    },
    "contexto": {
     "estado": "pendiente"
    },
    "gobernanza": {
     "estado": "pendiente"
    },
    "marco": {
     "estado": "pendiente"
    },
    "agenda": {
     "estado": "pendiente"
    },
    "anexos": {
     "estado": "pendiente"
    }
   },
   "procesos": [
    {
     "codigo": "20.1",
     "n": "Gobierno del mapa de procesos y de la arquitectura documental",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Custodia del mapa de procesos del grupo como artefacto único: definición y mantenimiento de los niveles de descomposición, de las convenciones de nomenclatura y de las fronteras entre macroprocesos, asignación del dueño de cada proceso, y priorización de la cola de macroprocesos a documentar y a actualizar.",
      "dueno": "Gerente de Proyectoss (PMO) mientras no exista una función dedicada",
      "participantes": [
       "Country Manager",
       "Junta Directiva (aprueba el mapa)",
       "dueños de proceso de cada macroproceso",
       "Gerente de Tecnología / Sistemas",
       "equipo consultor externo (actor externo durante la fase de implantación)"
      ],
      "cadencia": "Continua; revisión formal anual del mapa completo",
      "disparador": "Creación o reorganización de un macroproceso, cambio estructural en la organización, o revisión programada del mapa",
      "output": "Mapa de procesos vigente y aprobado, con el dueño de cada proceso asignado y las fronteras resueltas",
      "fuentes": "E-26 Presentación del Informe a la Junta Directiva (2026-07-27) — líneas 129, 634-639; E-01 Bernardo Roizental F1 (2026-06-16) — líneas 20-22; E-38 Víctor Padovani VE F2 (2026-08-06) — línea 176"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "20.2",
     "n": "Levantamiento, documentación y validación de procesos",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Ciclo de documentación de un proceso: levantamiento de la operación real con los actores, contraste con las mejores prácticas del sector, diseño de la versión deber ser, redacción del manual con su flujograma y sus instrucciones de trabajo, validación con el dueño del proceso y con las áreas involucradas, y aprobación para su publicación.",
      "dueno": "Gerente de Proyectoss (PMO) mientras no exista una función dedicada",
      "participantes": [
       "Dueño del proceso documentado",
       "actores del proceso en cada país",
       "Gerente de Tecnología / Sistemas (herramientas y sistemas involucrados)",
       "Junta Directiva (aprobación de los procesos críticos)",
       "equipo consultor externo (actor externo durante la fase de implantación)"
      ],
      "cadencia": "Por proceso; ciclos de semanas según la complejidad y la cantidad de países involucrados",
      "disparador": "Proceso priorizado en la cola de documentación, o cambio relevante en un proceso ya documentado",
      "output": "Manual del proceso con su flujograma e instrucciones de trabajo, validado por el dueño y aprobado para publicación",
      "fuentes": "E-38 VE F2 (2026-08-06) — líneas 126, 196, 220, 230-232; E-44 Ian Chen PA F2 (2026-08-11) — líneas 30, 240-243; E-46 Marcella Ramírez CO F2 (2026-08-13) — línea 152; E-02 Patrick Corujo F1 (2026-06-18) — líneas 232, 237-241"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "20.3",
     "n": "Publicación, versionado y control de cambios de la documentación",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Administración del repositorio único donde vive la documentación de procesos: publicación del manual aprobado, asignación de versión y de fecha de vigencia, retiro de las versiones superadas, control de las modificaciones posteriores mediante solicitud formal, y notificación del cambio a los usuarios del proceso.",
      "dueno": "Gerente de Proyectoss (PMO) mientras no exista una función dedicada",
      "participantes": [
       "Dueño del proceso",
       "Gerente de Tecnología / Sistemas (administración del repositorio)",
       "Coordinador(a) de Sistemas (permisos de acceso)",
       "Gerente de Recursos Humanos (uso del estándar en la inducción)"
      ],
      "cadencia": "Continua; revisión de vigencia anual por proceso",
      "disparador": "Manual aprobado listo para publicar, o solicitud de modificación de un proceso ya publicado",
      "output": "Documento publicado en el repositorio con su versión vigente identificada y las versiones superadas retiradas",
      "fuentes": "E-02 Patrick Corujo F1 (2026-06-18) — líneas 232, 237, 241; E-58 Patrick Corujo F2 (2026-08-19) — líneas 98-104; E-38 VE F2 (2026-08-06) — líneas 227-232"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "20.4",
     "n": "Identificación, evaluación y ejecución de iniciativas de mejora",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Captación de la oportunidad de mejora desde sus fuentes —hallazgo de una auditoría o revisión, dolor reportado por el dueño del proceso, indicador fuera de rango, o propuesta de un colaborador—, evaluación del impacto y del esfuerzo, priorización, ejecución del cambio sobre el proceso y verificación del resultado.",
      "dueno": "Gerente de Proyectoss (PMO) mientras no exista una función dedicada",
      "participantes": [
       "Dueño del proceso",
       "gerentes de las áreas involucradas",
       "Analista de Sistemas / Datos (indicadores)",
       "Gerente de Tecnología / Sistemas (habilitación tecnológica)",
       "colaboradores proponentes"
      ],
      "cadencia": "Continua (captación); revisión mensual de la cartera de iniciativas priorizadas",
      "disparador": "Hallazgo, dolor reportado, indicador fuera de rango, o propuesta de mejora levantada por un colaborador",
      "output": "Mejora implantada sobre el proceso con el documento actualizado y el resultado verificado contra la situación inicial",
      "fuentes": "E-09 Ricardo Candanedo F1 (2026-06-23) — líneas 34, 36-44; E-04 Arani González F1 (2026-06-18) — línea 40; E-01 F1 (2026-06-16) — línea 22; E-20 Máximo Dolman F1 (2026-07-07) — línea 182"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "20.5",
     "n": "Medición de la adherencia al proceso",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Verificación de que la operación se ejecuta como el proceso documentado establece: definición de los puntos de control por proceso, revisión periódica o sorpresiva de su cumplimiento en cada país, registro de las desviaciones con su causa, y devolución del hallazgo al dueño del proceso para su corrección o para revisar el estándar cuando la desviación es razonable.",
      "dueno": "Gerente de Proyectoss (PMO) mientras no exista una función dedicada",
      "participantes": [
       "Dueño del proceso",
       "Gerente de Contabilidad / Administración",
       "Gerente de Contabilidad / Administración (control interno contable)",
       "gerentes y supervisores de las áreas revisadas",
       "Asesor(a) Externo de Finanzas y Auditoría"
      ],
      "cadencia": "Programada por proceso y por país; sorpresiva en los puntos de control críticos",
      "disparador": "Programación de la revisión del período, o alerta de desviación detectada en la operación o en un indicador",
      "output": "Informe de adherencia con las desviaciones registradas y el plan de corrección acordado con el dueño del proceso",
      "fuentes": "E-38 Víctor Padovani VE F2 (2026-08-06) — líneas 154-160, 176, 180; E-58 Patrick Corujo F2 (2026-08-19) — línea 40; E-26 (2026-07-27) — línea 133"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    },
    {
     "codigo": "20.6",
     "n": "Gestión del cambio y habilitación del estándar en la operación",
     "madurez": "to-be",
     "mapa": {
      "alcance": "Acompañamiento de la puesta en uso del proceso documentado: comunicación del cambio a los equipos afectados, formación en el estándar nuevo, incorporación del proceso a la inducción del personal que ingresa, atención de la resistencia y de los ajustes que surgen en los primeros ciclos, y confirmación de que el estándar quedó instalado.",
      "dueno": "Gerente de Recursos Humanos (Formación y Desarrollo)",
      "participantes": [
       "Gerente de Proyectoss (PMO)",
       "dueño del proceso",
       "gerentes de las áreas afectadas",
       "Country Manager (patrocinio de los cambios transversales)",
       "Gerente Regional de Marketing (comunicación interna)"
      ],
      "cadencia": "Por proceso implantado; acompañamiento concentrado en los primeros ciclos de operación",
      "disparador": "Publicación de un proceso nuevo o modificado que cambia la forma de trabajar de un equipo",
      "output": "Equipo operando bajo el estándar publicado, con el proceso incorporado a la inducción y la adopción confirmada",
      "fuentes": "E-38 VE F2 (2026-08-06) — línea 176; E-23 Alberto Bassan F1 (2026-07-09) — línea 26; E-58 Patrick Corujo F2 (2026-08-19) — línea 268; E-20 Máximo Dolman F1 (2026-07-07) — línea 182"
     },
     "n1": {
      "proposito": {
       "estado": "semilla"
      },
      "dueno": {
       "estado": "semilla"
      },
      "disparador": {
       "estado": "semilla"
      },
      "flujo": {
       "estado": "pendiente"
      },
      "riesgos": {
       "estado": "pendiente"
      },
      "indicadores": {
       "estado": "pendiente"
      }
     }
    }
   ]
  }
 ]
};
