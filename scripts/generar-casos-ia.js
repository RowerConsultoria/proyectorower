/* Genera informe/fase2/ia/casos-datos.js (casos de uso de IA priorizados).
 *
 *   node scripts/generar-casos-ia.js
 *
 * Fuentes:
 *   informe/fase2/ia/orbita-datos.js       GENERADO por el generador de la órbita: módulos,
 *                                          sectores y frenos (la parte «IA» de cada módulo es un caso)
 *   informe/fase2/ia/casos-evaluacion.json A MANO: calificaciones (9 criterios, 1–5), métrica,
 *                                          responsables por rol, evidencia, casos fuera de la
 *                                          órbita (extras) y los textos de «Cómo se priorizó» y
 *                                          «Ciclo de vida». Editar ESTE archivo y volver a correr.
 *
 * Falla sin escribir si un módulo con IA no está evaluado, si sobra una evaluación,
 * si una nota no es un entero de 1 a 5 o si falta la métrica o un responsable.
 * Prioridad = 0,40 × valor + 0,35 × viabilidad + 0,25 × riesgo (5 = riesgo bajo).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const IA = path.join(__dirname, '..', 'informe', 'fase2', 'ia');
const w = {}; new Function('window', fs.readFileSync(path.join(IA, 'orbita-datos.js'), 'utf8'))(w);
const O = w.ORBITA;
const E = JSON.parse(fs.readFileSync(path.join(IA, 'casos-evaluacion.json'), 'utf8'));
const PESOS = { valor: 0.40, viabilidad: 0.35, riesgo: 0.25 };
const SUB = { valor: ['frenos', 'volumen', 'pedido'], viabilidad: ['dato', 'dependencias', 'esfuerzo'], riesgo: ['personales', 'cliente', 'autonomia'] };
const errores = [];

// ── casos: la parte IA de cada módulo + los extras ──
const numSector = {}; O.sectores.forEach(s => s.areas.forEach(a => { numSector[a] = s; }));
const areaNum = {}; O.areas.forEach(a => { areaNum[a.id] = a.num; });
const sinIA = m => /^ninguna/i.test((m.campos.ia.txt || '').trim());
const niveles = t => [...new Set((t.match(/\((\d)\)/g) || []).map(x => x[1]))].sort().join('·');

const casos = [];
O.mods.filter(m => !sinIA(m)).forEach(m => {
  const ev = E.casos[m.id];
  if (!ev) { errores.push('sin evaluación: ' + m.id); return; }
  const s = numSector[areaNum[m.area]];
  casos.push(Object.assign({ id: m.id, nom: m.nom, mod: true, sector: s.id, sectorNom: s.nom, ola: m.ola,
    nivel: niveles(m.campos.ia.txt), ia: m.campos.ia.txt.trim(), firma: m.campos.firma.txt.trim(),
    procs: m.procs || [], frenos: m.trombos || [] }, ev));
});
Object.keys(E.casos).forEach(id => { if (!O.mods.some(m => m.id === id && !sinIA(m))) errores.push('evaluación de un módulo sin IA o inexistente: ' + id); });
(E.extras || []).forEach(x => {
  const s = O.sectores.find(z => z.id === x.sector);
  if (!s) errores.push('extra con sector inexistente: ' + x.id);
  casos.push(Object.assign({ mod: false, sectorNom: s ? s.nom : '', procs: x.procs || [], frenos: [] }, x));
});

const media = o => (o.a + o.b + o.c) / 3;
casos.forEach(c => {
  for (const d of Object.keys(SUB)) {
    const v = c[d] || {};
    SUB[d].forEach(k => { if (!Number.isInteger(v[k]) || v[k] < 1 || v[k] > 5) errores.push(`${c.id}: ${d}.${k} = ${v[k]} (entero de 1 a 5)`); });
    c['m_' + d] = media({ a: v[SUB[d][0]], b: v[SUB[d][1]], c: v[SUB[d][2]] });
  }
  c.prioridad = PESOS.valor * c.m_valor + PESOS.viabilidad * c.m_viabilidad + PESOS.riesgo * c.m_riesgo;
  if (!c.metrica || !c.metrica.nombre) errores.push(c.id + ': falta la métrica');
  ['dueno', 'firmante'].forEach(k => { if (!c[k]) errores.push(c.id + ': falta ' + k); });
});
if (errores.length) { console.error('NO SE GENERA — ' + errores.length + ' problemas:\n  ' + errores.join('\n  ')); process.exit(1); }

casos.sort((a, b) => b.prioridad - a.prioridad || b.m_valor - a.m_valor || b.m_viabilidad - a.m_viabilidad || a.nom.localeCompare(b.nom, 'es'));
casos.forEach((c, i) => { c.rank = i + 1; });

// ── utilidades de texto ──
const n1 = x => x.toFixed(1).replace('.', ',');
const n2 = x => x.toFixed(2).replace('.', ',');
const ref = c => c.mod ? `[[mod:${c.id}|${c.nom}]]` : c.nom;
const olaTxt = o => o ? 'Ola ' + o : '—';
const escA = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escT = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ── dispersión valor × viabilidad (SVG; colores por variable CSS, validados) ──
function dispersion() {
  const W = 760, H = 520, L = 64, R = 24, T = 64, B = 58;
  const px = x => L + (x - 0.75) / 4.5 * (W - L - R);
  const py = y => T + (5.25 - y) / 4.5 * (H - T - B);
  const grupo = o => (o >= 3 ? 3 : o || 1);
  let s = `<svg class="viz" viewBox="0 0 ${W} ${H}" role="img" aria-label="Dispersión de los ${casos.length} casos: valor en el eje vertical, viabilidad en el horizontal; color por ola. La tabla completa está en el inventario.">`;
  // leyenda (ola) arriba, en una fila
  [['Ola 1', 1], ['Ola 2', 2], ['Olas 3 y 4', 3]].forEach(([t, g], i) => {
    const x = L + i * 120;
    s += `<circle cx="${x + 6}" cy="16" r="5" fill="var(--s${g})" class="pt"/><text x="${x + 18}" y="20">${t}</text>`;
  });
  s += `<text x="${W - R}" y="20" text-anchor="end" class="eje">número = puesto en el top 10</text>`;
  // grilla y ejes
  for (let v = 1; v <= 5; v++) {
    s += `<line class="grilla" x1="${px(v)}" y1="${T}" x2="${px(v)}" y2="${H - B}"/><line class="grilla" x1="${L}" y1="${py(v)}" x2="${W - R}" y2="${py(v)}"/>`;
    s += `<text class="eje" x="${px(v)}" y="${H - B + 18}" text-anchor="middle">${v}</text><text class="eje" x="${L - 10}" y="${py(v) + 4}" text-anchor="end">${v}</text>`;
  }
  s += `<line class="guia" x1="${px(3)}" y1="${T}" x2="${px(3)}" y2="${H - B}"/><line class="guia" x1="${L}" y1="${py(3)}" x2="${W - R}" y2="${py(3)}"/>`;
  // rótulos de cuadrante en el margen superior, fuera del área de puntos (no chocan con las etiquetas del top 10)
  s += `<text class="cuad" x="${W - R}" y="${T - 12}" text-anchor="end">↗ más valor y más viable: primero</text>`;
  s += `<text class="cuad" x="${L}" y="${T - 12}">↖ más valor, hay que preparar el terreno</text>`;
  s += `<text x="${(L + W - R) / 2}" y="${H - 14}" text-anchor="middle">Viabilidad →</text>`;
  s += `<text transform="translate(18 ${(T + H - B) / 2}) rotate(-90)" text-anchor="middle">Valor →</text>`;
  // puntos: los que coinciden se separan alrededor de su posición (sin mover el centro del grupo)
  const grupos = {};
  casos.forEach(c => { const k = n2(c.m_viabilidad) + '|' + n2(c.m_valor); (grupos[k] = grupos[k] || []).push(c); });
  const marcas = [], etiquetas = [];
  Object.values(grupos).forEach(g => {
    g.forEach((c, i) => {
      let x = px(c.m_viabilidad), y = py(c.m_valor);
      if (g.length > 1) { const a = -Math.PI / 2 + 2 * Math.PI * i / g.length, d = 6 + 1.6 * g.length; x += d * Math.cos(a); y += d * Math.sin(a); }
      const tip = `#${c.rank} ${c.nom}\nValor ${n1(c.m_valor)} · Viabilidad ${n1(c.m_viabilidad)} · Riesgo ${n1(c.m_riesgo)}\nPrioridad ${n2(c.prioridad)} · ${olaTxt(c.ola)}`;
      marcas.push(`<circle class="pt" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="var(--s${grupo(c.ola)})"/>` +
        `<circle class="hit" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="12" tabindex="0" data-tip="${escA(tip)}" aria-label="${escA(tip.replace(/\n/g, '. '))}"/>`);
      if (c.rank <= 10) etiquetas.push(`<text class="rot" x="${(x + 8).toFixed(1)}" y="${(y - 7).toFixed(1)}">${c.rank}</text>`);
    });
  });
  return s + marcas.join('') + etiquetas.join('') + '</svg>';
}

// ── secciones ──
const top = casos.slice(0, 10);
const porOla = o => casos.filter(c => (o >= 3 ? c.ola >= 3 : c.ola === o)).length;
const enOperacion = casos.filter(c => /operaci/.test(c.estado || '')).length;
const riesgoAlto = casos.filter(c => c.m_riesgo <= 2.5).length;

const secMetodo = (E.textos.metodo || []).concat([
  { t: 'kpis', items: [
    { v: String(casos.length), x: 'casos evaluados' },
    { v: String(porOla(1)), x: 'en la Ola 1' },
    { v: String(enOperacion), x: 'ya en operación' },
    { v: String(riesgoAlto), x: 'con riesgo alto (media ≤ 2,5)' } ] }]);

const secTop = [
  'Los diez casos con mayor prioridad. La métrica y la meta son propuestas para validar con su dueño; la línea base sale de la práctica actual cuando hay cifra, o se mide en el piloto.',
  { t: 'tabla', cab: ['#', 'Caso', 'Sector', 'Ola', 'Prioridad', 'Se mide', 'Meta', 'Dueño'], num: [0, 4],
    filas: top.map(c => [String(c.rank), ref(c), c.sectorNom, olaTxt(c.ola), n2(c.prioridad), c.metrica.nombre, c.metrica.meta || 'por definir', c.dueno]) },
  { t: 'fichas', items: top.map(c => { const f = ficha(c); delete f.id; return f; }) }];   // el id va solo en el inventario

const secMapa = [
  'Cada punto es un caso: más arriba, más valor; más a la derecha, más viable hoy. El color indica la ola en que la órbita lo construye. Los casos con la misma calificación se muestran juntos alrededor de su posición. Al pasar el puntero o enfocar un punto se ve su detalle.',
  { t: 'fig', svg: dispersion(), pie: 'Valor y viabilidad, de 1 a 5. El riesgo no está en el gráfico: entra en la prioridad y se ve en el detalle de cada punto y en el [[sec:inventario|inventario]].' }];

function ficha(c) {
  const v = c.valor, vi = c.viabilidad, r = c.riesgo;
  return { id: c.id, titulo: `${c.rank}. ${c.nom}`, chips: [olaTxt(c.ola), c.nivel ? 'nivel ' + c.nivel : '', 'prioridad ' + n2(c.prioridad), c.estado || 'propuesto'].filter(Boolean),
    campos: [
      ['Qué hace la IA', c.ia],
      ['Quién firma', c.firma],
      ['Procesos', c.procs.map(p => `[[proc:${p}]]`).join(' · ')],
      ['Frenos que resuelve', c.frenos.map(f => `[[freno:${f}]]`).join(' · ')],
      ['En la órbita', c.mod ? `[[mod:${c.id}|ver el módulo]]` : ''],
      ['Se mide', c.metrica.nombre],
      ['Línea base', c.metrica.base],
      ['Meta', c.metrica.meta],
      ['Se revisa si', c.metrica.umbral],
      ['Dueño', c.dueno], ['Opera', c.operador], ['Firma', c.firmante],
      ['Calificación', `Valor ${n1(c.m_valor)} (frenos ${v.frenos} · volumen ${v.volumen} · pedido ${v.pedido}) · Viabilidad ${n1(c.m_viabilidad)} (dato ${vi.dato} · dependencias ${vi.dependencias} · esfuerzo ${vi.esfuerzo}) · Riesgo ${n1(c.m_riesgo)} (personas ${r.personales} · exposición ${r.cliente} · autonomía ${r.autonomia})`],
      ['Por qué', c.nota],
      ['Evidencia', (c.evidencia || []).join(' · ')] ] };
}

const secInventario = ['Todos los casos, por sector y de mayor a menor prioridad. V = valor, Vi = viabilidad, R = riesgo (5 = bajo). Cada ficha trae su métrica, sus responsables y la evidencia de su calificación.'];
O.sectores.forEach(s => {
  const l = casos.filter(c => c.sector === s.id);
  if (!l.length) return;
  secInventario.push({ t: 'h', x: `${s.nom} · ${l.length} caso${l.length > 1 ? 's' : ''}` });
  secInventario.push({ t: 'tabla', cab: ['#', 'Caso', 'Ola', 'Nivel', 'V', 'Vi', 'R', 'Prioridad', 'Estado'], num: [0, 4, 5, 6, 7],
    filas: l.map(c => [String(c.rank), ref(c), olaTxt(c.ola), c.nivel || '—', n1(c.m_valor), n1(c.m_viabilidad), n1(c.m_riesgo), n2(c.prioridad), c.estado || 'propuesto']) });
  secInventario.push({ t: 'fichas', items: l.map(ficha) });
});

const porDueno = {};
casos.forEach(c => { (porDueno[c.dueno] = porDueno[c.dueno] || []).push(c); });
const secResp = [
  'Cada caso tiene un **dueño** (responde por el beneficio: es el dueño del proceso principal), un **operador** (lo usa a diario) y un **firmante** (firma lo que la IA prepara). Los roles son los del manual de procesos; la estructura propuesta puede cambiar su nombre, no su responsabilidad.',
  { t: 'tabla', cab: ['Dueño', 'Casos', 'Cuáles (por prioridad)'], num: [1],
    filas: Object.entries(porDueno).sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0], 'es'))
      .map(([d, l]) => [d, String(l.length), l.map(c => `${c.rank}. ${ref(c)}`).join(' · ')]) }];

const D = {
  id: 'casos',
  titulo: 'Casos de uso de IA priorizados',
  lede: E.textos.lede,
  estado: 'borrador', version: E.version || '0.1', corte: E.corte || '',
  secciones: [
    { id: 'metodo', num: '1', titulo: 'Cómo se priorizó', estado: 'borrador', bloques: secMetodo },
    { id: 'top', num: '2', titulo: 'Los diez primeros', estado: 'borrador', bloques: secTop },
    { id: 'mapa', num: '3', titulo: 'Valor frente a viabilidad', estado: 'borrador', bloques: secMapa },
    { id: 'inventario', num: '4', titulo: 'Inventario completo', estado: 'borrador', bloques: secInventario },
    { id: 'ciclo', num: '5', titulo: 'Ciclo de vida de un caso', estado: 'borrador', bloques: E.textos.ciclo },
    { id: 'responsables', num: '6', titulo: 'Quién responde por cada caso', estado: 'borrador', bloques: secResp } ] };

const salida = '/* GENERADO por scripts/generar-casos-ia.js desde ia/orbita-datos.js y ia/casos-evaluacion.json\n' +
  '   — no editar a mano: los cambios van en casos-evaluacion.json y se vuelve a correr el guion. */\n' +
  'window.IA_DOC = ' + JSON.stringify(D, null, 1) + ';\n';
fs.writeFileSync(path.join(IA, 'casos-datos.js'), salida, 'utf8');
console.log(`casos-datos.js: ${casos.length} casos (${casos.filter(c => c.mod).length} de la órbita + ${casos.filter(c => !c.mod).length} extras) · top 3: ` +
  top.slice(0, 3).map(c => `${c.nom} (${n2(c.prioridad)})`).join(', '));
