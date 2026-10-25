// Comprueba las operaciones y la validación de la estructura del Agente IA
// (supabase/functions/agente/estructura.ts) contra la estructura real del archivo.
//
//   npx -y deno@2 run --allow-read scripts/comprobar-estructura-agente.ts
//
// Incluye los casos de la revisión del 25-oct: lo que el dibujo no sabe pintar, rutas
// con __proto__, comités sin lidera, premisas sin su forma. Sale con 1 si algo falla.
import JSON5 from "npm:json5@2.2.3";
import { aplicar, validar, resumen, indice } from "../supabase/functions/agente/estructura.ts";
const t = Deno.readTextFileSync(new URL("../informe/fase2/estructura-tobe-datos.js", import.meta.url));
const i = t.indexOf("window.ESTRUCTURA_TOBE"), a = t.indexOf("=", i) + 1, b = t.lastIndexOf("}") + 1;
const E = JSON5.parse(t.slice(a, b));
let fallos = 0;
const ok = (c: boolean, m: string) => { console.log((c ? "OK    " : "FALLA ") + m); if (!c) fallos++; };
ok(validar(E, E).length === 0, "la estructura del archivo es válida: " + validar(E, E).join(" | "));
console.log(resumen(E).split("\n").slice(0, 8).join("\n"));
// cambios válidos
const r = aplicar(E, [
  { op: "agregar", padre: "opl", unidad: { id: "calidad-op", n: "Coordinación de Calidad Operativa", nivel: "ccorp", ocupante: { nombre: "Por definir", estado: "pordefinir" }, funciones: ["Audita la operación."] } },
  { op: "modificar", id: "finanzas", cambios: { ocupante: { nombre: "Jaime González", estado: "validar" } } },
  { op: "mover", id: "pmo", padre: "DIRECCIONES", despues_de: null },
  { op: "fijar", ruta: "PENDIENTES/-", valor: { t: "Pendiente de prueba", d: "Detalle." } },
]);
ok(validar(r.datos, E).length === 0, "operaciones válidas pasan: " + validar(r.datos, E).join(" | "));
ok(r.datos.DIRECCIONES[0].id === "pmo", "mover con despues_de null la pone primera");
ok(indice(r.datos).get("calidad-op")?.padre === "opl", "agregar cuelga bajo opl");
console.log(r.cambios.join("\n"));
ok(JSON.stringify(E).indexOf("calidad-op") < 0, "no toca el original");
// referencias rotas
const q = aplicar(E, [{ op: "quitar", id: "pmo", con_hijos: true }]);
const ev = validar(q.datos, E);
ok(ev.some((x) => x.includes("pmo")), "quitar una unidad nombrada por un comité se detecta: " + ev[0]);
// errores de operación
const lanza = (ops: any[], m: string) => { try { aplicar(E, ops); ok(false, m); } catch (e) { ok(true, m + " → " + (e as Error).message); } };
lanza([{ op: "mover", id: "opl", padre: "opl" }], "no cuelga de sí misma");
lanza([{ op: "agregar", padre: "opl", unidad: { id: "finanzas", n: "x" } }], "id repetido");
lanza([{ op: "modificar", id: "opl", cambios: { id: "otro" } }], "no se cambia el id");
lanza([{ op: "quitar", id: "opl" }], "no quita una unidad con hijas sin con_hijos");
lanza([{ op: "fijar", ruta: "DIRECCIONES/0", valor: {} }], "fijar no toca las unidades");
const m2 = aplicar(E, [{ op: "modificar", id: "opl", cambios: { nivel: "zz", ocupante: { nombre: "X", estado: "raro" } } }]);
ok(validar(m2.datos, E).length >= 2, "nivel y estado inválidos se detectan");
const m3 = aplicar(E, [{ op: "agregar", padre: "DIRECCIONES", unidad: { id: "toString", n: "x" } }]);
ok(validar(m3.datos, E).some((x) => x.includes("id inválido")), "un id raro no pasa");
// --- casos de la revisión ---
const r2 = (ops: any[]) => { try { const x = aplicar(E, ops); return validar(x.datos, E); } catch (e) { return ["LANZA: " + (e as Error).message]; } };
ok(r2([{ op: "modificar", id: "c-cal", cambios: { lidera: null } }]).some((x) => x.includes("lidera")), "comité sin lidera no pasa");
ok(r2([{ op: "mover", id: "opl", padre: "COMITES" }]).length > 0, "una unidad no entra en COMITES: " + r2([{ op: "mover", id: "opl", padre: "COMITES" }])[0]);
ok(r2([{ op: "agregar", padre: "juridica", unidad: { id: "hija-staff", n: "x" } }]).length > 0, "no se cuelgan hijas bajo el staff");
ok(r2([{ op: "fijar", ruta: "FUNCIONAMIENTO", valor: "texto" }]).length > 0, "FUNCIONAMIENTO como texto no pasa");
ok(r2([{ op: "fijar", ruta: "CAPAS", valor: {} }]).length > 0, "CAPAS vacío no pasa");
ok(r2([{ op: "fijar", ruta: "PENDIENTES/-", valor: null }]).length === 0, "fijar null en «-» no hace nada raro");
ok(r2([{ op: "fijar", ruta: "PENDIENTES/-", valor: { t: "Pendiente nuevo", d: "Detalle." } }]).length === 0, "un pendiente con su forma pasa");
ok(r2([{ op: "fijar", ruta: "PENDIENTES/-", valor: "solo texto" }]).length > 0, "un pendiente sin su forma no pasa");
ok(r2([{ op: "fijar", ruta: "ESTADOS/__proto__/x", valor: 1 }])[0].startsWith("LANZA"), "ruta con __proto__ se rechaza");
ok(r2([{ op: "modificar", id: "opl", cambios: JSON.parse('{"__proto__": {"esAdmin": true}}') }])[0].startsWith("LANZA"), "cambios con __proto__ se rechazan");
ok(({} as any).esAdmin === undefined, "el prototipo sigue limpio");
ok(r2([{ op: "mover", id: "c-cal", padre: "DIRECCIONES" }])[0].startsWith("LANZA"), "un comité solo se reordena en su lista");
ok(r2([{ op: "modificar", id: "c-cal", cambios: { principal: ["@direcciones"] } }]).length === 0, "@direcciones se acepta");
ok(r2([{ op: "modificar", id: "mercadeopais", cambios: { atiende: ["c-cal"] } }]).length > 0, "atiende no puede nombrar un comité");
Deno.exit(fallos ? 1 : 0);
