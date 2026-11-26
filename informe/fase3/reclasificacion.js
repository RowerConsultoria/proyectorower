/* Informe de reclasificación de personal. El tablero consume solo tabulados agregados. */
(function () {
  'use strict';

  const D = window.RECLASIFICACION_DATOS;
  const PAISES = ['#315d91', '#6292c6', '#869db8'];
  const COLORES = ['#b45138', '#398346', '#927119'];
  const SIN_NIVEL = 'Cargo por validar';
  const SIN_FAMILIA = 'Sin familia asignada';
  const ESTADOS = [
    'Brecha frente a la ficha', 'Sin brecha en datos evaluados', 'Sin ficha vinculada',
    'Identidad por verificar', 'Por verificar', 'Cargo optimizado por validar',
    'Ficha en progreso', 'Sin ficha completada'
  ];
  const MOTIVOS = [
    ESTADOS[2], ESTADOS[3], 'Formación o experiencia por verificar', ESTADOS[5], ESTADOS[6], ESTADOS[7]
  ];
  const SECCIONES = [
    ['resumen', 'Resumen ejecutivo'], ['brechas', 'Brechas de formación y experiencia'],
    ['plantilla', 'Plantilla, niveles y familias'], ['perfil', 'Género y antigüedad'],
    ['liderazgo', 'Liderazgo estimado'], ['criticidad', 'Cargos críticos'],
    ['recomendaciones', 'Recomendaciones de aprobación']
  ];
  const fmt = (value, digits = 0) => Number(value).toLocaleString('es-ES', {
    minimumFractionDigits: digits, maximumFractionDigits: digits
  });
  const pct = (value, base) => base ? fmt(value / base * 100, 1) + ' %' : '—';
  const esc = value => String(value).replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[ch]);
  const sum = (rows, get = value => value) => rows.reduce((total, row) => total + get(row), 0);
  const by = (rows, keys, index, amount) => keys.map(key => [
    key, sum(rows.filter(row => row[index] === key), row => row[amount])
  ]);
  const countryColor = pais => PAISES[D.paises.indexOf(pais)];
  const sectionTitle = (id, label) => `<section id="rc-${id}" class="rc-seccion" aria-labelledby="rc-t-${id}">
    <h2 id="rc-t-${id}">${label}</h2>`;
  const panel = (title, id, extra = '', wide = false) => `<section class="rc-panel${wide ? ' rc-ancho' : ''}">
    <h3>${title}</h3><div id="${id}"></div>${extra}</section>`;

  function resumenBrechas(rows) {
    const con = sum(rows.filter(row => row[2] === ESTADOS[0]), row => row[3]);
    const sin = sum(rows.filter(row => row[2] === ESTADOS[1]), row => row[3]);
    const total = sum(rows, row => row[3]);
    return [total, con, sin, total - con - sin];
  }

  function vista() {
    const [total, con, , pendientes] = resumenBrechas(D.brechas);
    const apoyo = sum(D.matriz.filter(row => row[2] === D.niveles[0]), row => row[3]);
    const ocupados = D.cargos.filter(row => row[3] > 0).length;
    const optimizados = sum(D.cargos, row => row[3]);
    return `<article class="rc">
      <header class="hero rc-hero">
        <div class="k">Fase 3 · Talento · Grupo Kenex</div>
        <h1>Reclasificación de personal</h1>
        <p>Informe sobre la reclasificación de personal y su impacto en la organización del talento del Grupo Kenex.</p>
      </header>
      ${sectionTitle('resumen', 'Resumen ejecutivo')}
        <div class="rc-indicios">
          <div><b>${fmt(optimizados)} de ${fmt(total)}</b><span>personas con cargo optimizado</span></div>
          <div><b>${fmt(ocupados)} de ${fmt(D.cargos.length)}</b><span>cargos del V6 con ocupantes</span></div>
          <div><b>${fmt(con)}</b><span>con brecha documentada</span></div>
          <div><b>${fmt(pendientes)}</b><span>evaluaciones pendientes</span></div>
        </div>
        <div class="rc-lectura">
          <h3>Impacto en la organización del talento</h3>
          <p>El V6 da una denominación y un nivel comunes a cargos que se registraban de manera distinta entre países. La familia y el área To-Be conservan el contexto que permite distinguir el alcance de puestos con un mismo nombre. Quedan ${fmt(total - optimizados)} personas con cargo por validar.</p>
          <p>Apoyo / Asistencial reúne a ${fmt(apoyo)} personas, el ${pct(apoyo,total)} de la plantilla. La concentración permite dimensionar el alcance de la reclasificación operativa. En paralelo, las brechas de formación y experiencia muestran dónde hace falta desarrollo o acreditación adicional, mientras que los pendientes reflejan la cobertura de la evaluación.</p>
        </div>
      </section>
      <div class="rc-controles">
        <label for="rc-pais">País</label>
        <select id="rc-pais"><option value="">Todos</option>${D.paises.map(p => `<option>${esc(p)}</option>`).join('')}</select>
        <span>Corte del maestro · ${esc(D.corte)}</span>
        <b id="rc-seleccion" aria-live="polite"></b>
        <small>El filtro se aplica al tablero de plantilla y brechas. La criticidad y las recomendaciones se calculan para todo el grupo.</small>
      </div>
      ${sectionTitle('brechas', 'Brechas de formación y experiencia')}
        <div class="rc-grid">
          ${panel('Resultado del cotejo', 'rc-r-brechas')}
          ${panel('Dimensión de la brecha documentada', 'rc-dimensiones')}
          ${panel('Brechas por país', 'rc-brecha-pais', '', true)}
          ${panel('Brechas por nivel del cargo optimizado', 'rc-brecha-nivel', '', true)}
          ${panel('Motivos pendientes de evaluación', 'rc-brecha-pendientes', '', true)}
        </div>
        <p class="rc-nota">La experiencia se compara con el mínimo del nivel V6 a partir de la trayectoria interna documentada. La formación técnica corta se registra como complemento por confirmar en Apoyo / Asistencial.</p>
      </section>
      ${sectionTitle('plantilla', 'Plantilla, niveles y familias')}
        <div class="rc-grid">
          ${panel('Colaboradores por país', 'rc-r-pais')}
          ${panel('Colaboradores por entidad', 'rc-entidades')}
          ${panel('Grupos de niveles', 'rc-grupos')}
          ${panel('Niveles por país', 'rc-niveles')}
          ${panel('Familias principales', 'rc-r-familias')}
          ${panel('Familias por país', 'rc-familias')}
          ${panel('Matriz familia × nivel', 'rc-matriz', '', true)}
        </div>
      </section>
      ${sectionTitle('perfil', 'Género y antigüedad')}
        <div class="rc-grid">
          ${panel('Género registrado en Venezuela', 'rc-r-genero')}
          ${panel('Cobertura del dato de género', 'rc-cobertura')}
          ${panel('Género por nivel en Venezuela', 'rc-n-genero', '', true)}
          ${panel('Antigüedad por tramos', 'rc-tramos', '<p class="rc-nota" id="rc-d-ant"></p>')}
          ${panel('Género por país', 'rc-t-genero')}
        </div>
      </section>
      ${sectionTitle('liderazgo', 'Liderazgo y colaboradores por líder')}
        <div class="rc-grid">
          ${panel('Composición por nivel', 'rc-r-lideres')}
          ${panel('Colaboradores por líder estimado', 'rc-b-lideres')}
          ${panel('Indicadores por país', 'rc-t-lideres', '', true)}
        </div>
        <p class="rc-nota">El nivel de Coordinación I o superior sirve para estimar el liderazgo. Los cargos denominados Especialista se agrupan entre los demás cargos clasificados. La estimación usa la unidad del maestro dentro del mismo país y entidad.</p>
      </section>
      ${sectionTitle('criticidad', 'Cargos críticos para revisar')}
        <div class="rc-umbrales">
          <label>Ocupantes <input type="number" id="rc-u1" min="1" value="15"></label>
          <label>Denominaciones actuales <input type="number" id="rc-u2" min="1" value="4"></label>
          <label>Personas con conflicto <input type="number" id="rc-u3" min="1" value="5"></label>
        </div>
        <div class="rc-grid">
          ${panel('Cargos por criticidad', 'rc-r-crit')}
          ${panel('Conflictos de fondo al homologar', 'rc-r-conf')}
          ${panel('Ocupantes de los diez cargos más críticos', 'rc-b-crit', '', true)}
          ${panel('Cargos priorizados para la revisión', 'rc-t-crit', '', true)}
        </div>
        <p class="rc-nota" id="rc-criterio"></p>
      </section>
      ${sectionTitle('recomendaciones', 'Recomendaciones para aprobar el catálogo')}
        <div class="rc-grid">
          ${panel('Estado de las recomendaciones', 'rc-r-recom')}
          ${panel('Recomendaciones e indicadores', 'rc-t-recom', '', true)}
        </div>
      </section>
      <footer class="rc-fuentes">Fuentes del informe · maestro de personal de noviembre de 2026, catálogo optimizado V6 y las pestañas «Brechas por persona To-Be» y «Homologación por país». El tablero presenta resultados agregados.</footer>
    </article>`;
  }

  function tabla(headers, rows, total) {
    const tr = (row, css = '') => `<tr class="${css}">${row.map((value, i) =>
      i === 0 ? `<th scope="row">${esc(value)}</th>` : `<td>${esc(value)}</td>`
    ).join('')}</tr>`;
    return `<div class="rc-scroll" tabindex="0" role="region" aria-label="${esc(headers[0])}"><table><thead><tr>${headers.map(
      h => `<th scope="col">${esc(h)}</th>`
    ).join('')}</tr></thead><tbody>${rows.map(row => tr(row)).join('')}${total ? tr(total, 'rc-total') : ''}</tbody></table></div>`;
  }

  function reparto(items, central, pie) {
    const total = sum(items, item => item[1]);
    const segments = [];
    let position = 0;
    items.forEach(([, n, color]) => {
      if (!n) return;
      const start = position;
      position += n / total * 100;
      segments.push(`${color} ${start}% ${position}%`);
    });
    const style = segments.length ? ` style="--rc-ring:conic-gradient(${segments.join(',')})"` : '';
    return `<div class="rc-reparto"><div class="rc-dona"${style} aria-hidden="true"><span><b>${esc(central)}</b><small>${esc(pie)}</small></span></div>
      <ul>${items.map(([label, n, color]) => `<li><i style="background:${color}"></i><span>${esc(label)}</span><b>${fmt(n)}</b><small>${pct(n, total)}</small></li>`).join('')}</ul></div>`;
  }

  function barras(items) {
    const max = Math.max(1, ...items.map(([, segments]) => sum(segments, ([, n]) => n)));
    return `<div class="rc-barras">${items.map(([label, segments, value]) => {
      const total = sum(segments, ([, n]) => n);
      return `<div class="rc-barra"><span>${esc(label)}</span><div class="rc-pista" aria-hidden="true">${segments.map(
        ([key, n, color]) => `<i title="${esc(key)} · ${fmt(n, Number.isInteger(n) ? 0 : 1)}" style="width:${n / max * 100}%;background:${color}"></i>`
      ).join('')}</div><b>${esc(value ?? fmt(total))}</b></div>`;
    }).join('')}</div>`;
  }

  const leyenda = items => `<div class="rc-leyenda">${items.map(([label, color]) =>
    `<span><i style="background:${color}"></i>${esc(label)}</span>`
  ).join('')}</div>`;
  const numeroFila = ([label, ...values]) => [label, ...values.map(n => fmt(n))];

  function montar(root) {
    const $ = id => root.querySelector('#rc-' + id);
    const coloresGrupo = [...PAISES, '#8996a8', '#a1aab8', '#65768c', '#a8b6c8'];
    const pintar = (id, html) => { $(id).innerHTML = html; };
    const lista = (pairs, colors = coloresGrupo) => pairs.map(([label, n], i) => [label, n, colors[i % colors.length]]);

    function pintarBrechas(paises) {
      const rows = D.brechas.filter(row => paises.includes(row[0]));
      const total = resumenBrechas(rows);
      pintar('r-brechas', reparto(lista([
        ['Con brecha documentada', total[1]], ['Sin brecha en datos evaluados', total[2]], ['Evaluación pendiente', total[3]]
      ], COLORES), fmt(total[0]), 'personas'));
      const dimensiones = D.dimensiones.filter(row => paises.includes(row[0]));
      pintar('dimensiones', barras(by(dimensiones, ['Formación', 'Experiencia', 'Ambas'], 1, 2)
        .map(([label, n]) => [label, [[label, n, COLORES[0]]]])));
      const resultados = (labels, index) => labels.map(label => [
        label, ...resumenBrechas(rows.filter(row => row[index] === label))
      ]).filter(row => row[1] > 0).map(numeroFila);
      const cabecera = ['Personas', 'Con brecha', 'Sin brecha', 'Pendientes'];
      pintar('brecha-pais', tabla(['País', ...cabecera], resultados(paises, 0), numeroFila(['Total', ...total])));
      pintar('brecha-nivel', tabla(['Nivel', ...cabecera], resultados(D.niveles, 1), numeroFila(['Total', ...total])));
      const motivos = ESTADOS.slice(2).map((s, i) => [
        MOTIVOS[i], sum(rows.filter(row => row[2] === s), row => row[3])
      ]);
      pintar('brecha-pendientes', tabla(['Motivo', 'Personas'], motivos.map(numeroFila), numeroFila(['Total', total[3]])));
    }

    function pintarPlantilla(paises, perfiles, matriz, total) {
      pintar('r-pais', reparto(perfiles.map(p => [p.pais, p.total, countryColor(p.pais)]), fmt(total), 'colaboradores'));
      pintar('entidades', reparto(lista(perfiles.flatMap(p => p.entidades.map(([entidad, n]) =>
        [paises.length > 1 ? entidad + ' · ' + p.pais : entidad, n]
      ))), fmt(total), 'colaboradores'));

      const niveles = by(matriz, D.niveles, 2, 3);
      const grupos = [
        ['Apoyo / Asistencial', [0]], ['Analistas', [1, 2]], ['Coordinación y especialidad', [3, 4]],
        ['Gerencia y dirección', [5, 6, 7]], [SIN_NIVEL, [8]]
      ];
      pintar('grupos', reparto(lista(grupos.map(([label, indices]) => [
        label, sum(indices, index => niveles[index][1])
      ])), fmt(total), 'colaboradores'));
      const porPais = (labels, index) => barras(labels.map(label => [
        label, paises.map(p => [p, sum(matriz.filter(r => r[0] === p && r[index] === label), r => r[3]), countryColor(p)])
      ])) + leyenda(paises.map(p => [p, countryColor(p)]));
      pintar('niveles', porPais(D.niveles, 2));

      const familias = by(matriz, D.familias, 1, 3);
      const orden = familias.filter(([f]) => f !== SIN_FAMILIA).sort((a, b) => b[1] - a[1]);
      pintar('r-familias', reparto(lista(orden.slice(0, 5).concat([
        ['Otras familias', sum(orden.slice(5), row => row[1])], familias.find(row => row[0] === SIN_FAMILIA)
      ])), fmt(total), 'colaboradores'));
      pintar('familias', porPais(D.familias, 1));

      const values = D.familias.map(f => {
        const row = by(matriz.filter(r => r[1] === f), D.niveles, 2, 3);
        return numeroFila([f, ...row.map(([, n]) => n), sum(row, r => r[1])]);
      });
      pintar('matriz', tabla(['Familia', ...D.niveles, 'Total'], values, numeroFila([
        'Total', ...niveles.map(([, n]) => n), total
      ])));
    }

    function pintarPerfil(paises, perfiles, total) {
      const rows = D.genero.filter(row => paises.includes(row[0]));
      const types = ['Femenino', 'Masculino', 'Sin dato'];
      const byGender = by(rows, types, 2, 3);
      const known = byGender[0][1] + byGender[1][1];
      const covColor = ['#5284b7', '#8e9aab'];
      const ven = rows.filter(row => row[0] === 'Venezuela');
      const genderColors = ['#ac527b', '#315d91'];
      pintar('r-genero', ven.length ? reparto(lista(by(ven, types.slice(0, 2), 2, 3), genderColors),
        fmt(sum(ven, row => row[3])), 'personas') : '<p class="rc-nota">Disponible en Todos o Venezuela.</p>');
      pintar('cobertura', reparto(lista([['Con dato', known], ['Sin dato', total - known]], covColor),
        pct(known, total), 'cobertura'));
      pintar('n-genero', ven.length ? barras(D.niveles.map(nivel => [
        nivel, lista(by(ven.filter(row => row[1] === nivel), types.slice(0, 2), 2, 3), genderColors)
      ])) + leyenda(types.slice(0, 2).map((t, i) => [t, genderColors[i]])) :
        '<p class="rc-nota">Disponible en Todos o Venezuela.</p>');
      const antig = perfiles.map(p => p.antiguedad);
      const fechados = sum(antig, a => a.conDato);
      const tramo = ['Menos de 1 año', '1 a 3 años', '3 a 5 años', '5 a 10 años', '10 años o más'];
      pintar('tramos', barras(tramo.map((label, i) => [label, [[label, sum(antig, a => a.tramos[i]), PAISES[0]]]])));
      $('d-ant').textContent = `Antigüedad promedio · ${fechados ? fmt(sum(antig, a => a.suma) / fechados, 1) + ' años' : '—'}. Fecha de ingreso pendiente para ${fmt(total - fechados)} personas.`;
      pintar('t-genero', tabla(['Género', ...paises, 'Total'], types.map((t, i) => numeroFila([
        t, ...paises.map(p => sum(rows.filter(r => r[0] === p && r[2] === t), r => r[3])), byGender[i][1]
      ]))));
    }

    function pintarLiderazgo(perfiles, total) {
      const tot = [0, 1, 2, 3].map(i => sum(perfiles, p => p.liderazgo[i]));
      pintar('r-lideres', reparto(lista([
        ['Líderes estimados', tot[0]], ['Otros cargos clasificados', tot[1]], [SIN_NIVEL, tot[3]]
      ]), fmt(total), 'personas'));
      pintar('b-lideres', barras(perfiles.map(({pais, liderazgo: [le, , cl]}) => [
        pais, [[pais, le ? cl / le : 0, countryColor(pais)]], le ? fmt(cl / le, 1) : '—'
      ])));
      const forma = ([pais, le, co, cl, pend]) => [
        pais, fmt(le), fmt(co), fmt(cl), le ? fmt(cl / le, 1) : '—', pct(co - cl, co), fmt(pend)
      ];
      pintar('t-lideres', tabla(['País', 'Líderes', 'Otros cargos clasificados', 'Con líder en su unidad',
        'Colaboradores por líder', '% sin líder en su unidad', SIN_NIVEL],
      perfiles.map(p => forma([p.pais, ...p.liderazgo])), forma(['Total', ...tot])));
    }

    function pintarPais() {
      const pais = $('pais').value;
      const paises = pais ? [pais] : D.paises;
      const perfiles = D.perfiles.filter(perfil => paises.includes(perfil.pais));
      const matriz = D.matriz.filter(row => paises.includes(row[0]));
      const total = sum(perfiles, p => p.total);
      const cargos = pais ? perfiles[0].cargos : D.cargos.filter(row => row[3] > 0).length;
      const familias = new Set(matriz.map(row => row[1]).filter(familia => familia !== SIN_FAMILIA)).size;
      $('seleccion').textContent = `${fmt(total)} personas · ${fmt(cargos)} cargos con ocupantes · ${fmt(familias)} familias`;
      pintarBrechas(paises);
      pintarPlantilla(paises, perfiles, matriz, total);
      pintarPerfil(paises, perfiles, total);
      pintarLiderazgo(perfiles, total);
    }

    function pintarRecomendaciones(cargos, altaMedia) {
      const sinOc = cargos.filter(r => !r.oc).length;
      const unOc = cargos.filter(r => r.oc === 1).length;
      const barrasNombre = cargos.filter(r => r.cargo.includes('/')).length;
      const cambian = sum(cargos, r => r.cambian);
      const comparables = sum(cargos, r => r.comparables);
      const conGenero = sum(D.genero.filter(r => r[2] !== 'Sin dato'), r => r[3]);
      const personas = sum(D.perfiles, p => p.total);
      const rel = D.homologacion.prioritarios;
      const rows = [
        ['Resolver los conflictos de homologación en las posiciones relevantes.', 'Personas en posiciones relevantes con conflicto', fmt(rel), rel ? 'Pendiente' : 'Listo', 'Desarrollo Corporativo y RR. HH.'],
        ['Revisar los cargos de mayor criticidad antes de aprobar.', 'Cargos de criticidad Alta o Media', fmt(altaMedia), altaMedia ? 'Pendiente' : 'Listo', 'Desarrollo Corporativo'],
        ['Revisar las denominaciones que reúnen perfiles con barra.', 'Cargos con barra en el nombre', fmt(barrasNombre), barrasNombre ? 'Pendiente' : 'Listo', 'Desarrollo Corporativo'],
        ['Decidir qué cargos sin ocupantes se mantienen en el catálogo.', 'Cargos sin ocupantes', fmt(sinOc), sinOc ? 'Pendiente' : 'Listo', 'Desarrollo Corporativo'],
        ['Justificar o fusionar los cargos con un solo ocupante.', 'Cargos con un ocupante', fmt(unOc), unOc > 5 ? 'Pendiente' : 'Revisar', 'Líder de cada área'],
        ['Aprobar el uso de denominaciones corporativas comunes.', '% con cambio entre cargos comparables', pct(cambian, comparables), 'Pendiente', 'Desarrollo Corporativo y RR. HH.'],
        ['Completar los datos faltantes de género, ingreso y departamento del maestro.', 'Cobertura de género', pct(conGenero, personas), conGenero === personas ? 'Listo' : 'Pendiente', 'RR. HH. de cada país'],
        ['Aprobar familias, cargos, denominaciones y estructura de Operaciones antes del maestro cargo por cargo.', 'Pasos de aprobación', '5', 'Pendiente', 'Desarrollo Corporativo']
      ];
      pintar('r-recom', reparto(lista(['Pendiente', 'Revisar', 'Listo'].map(s => [
        s, rows.filter(r => r[3] === s).length
      ]), [COLORES[0], COLORES[2], COLORES[1]]), fmt(rows.length), 'recomendaciones'));
      pintar('t-recom', tabla(['Recomendación', 'Indicador', 'Valor', 'Estado', 'Responsable'], rows));
    }

    function pintarCriticidad() {
      const umbrales = ['u1', 'u2', 'u3'].map(id => Math.max(1, Number($(id).value) || 1));
      const [u1, u2, u3] = umbrales;
      const categorias = [
        ['Alta', COLORES[0]], ['Media', COLORES[2]], ['Baja', PAISES[1]], ['Normal', PAISES[2]], ['Sin ocupantes', '#8996a8']
      ];
      const cargos = D.cargos.map(([codigo, familia, cargo, oc, den, paises, cambian, comparables, conflictos]) => {
        const volumen = oc >= u1;
        const variacion = den >= u2 || paises >= 3;
        const conflicto = conflictos >= u3;
        const score = Number(volumen) + Number(variacion) + Number(conflicto);
        const categoria = categorias[oc ? 3 - score : 4][0];
        const accion = conflicto ? 'Resolver conflicto' : variacion ? 'Revisar denominación' : volumen ? 'Revisar alcance' : 'Aprobar';
        return {codigo, familia, cargo, oc, den, paises, cambian, comparables, conflictos, score, categoria, accion};
      });
      const top = cargos.filter(c => c.oc).sort((a,b) => b.score-a.score || b.oc-a.oc || a.cargo.localeCompare(b.cargo,'es')).slice(0, 12);
      pintar('r-crit', reparto(categorias.map(([t, c]) => [t, cargos.filter(r => r.categoria === t).length, c]),
        fmt(cargos.length), 'cargos'));
      const h = D.homologacion;
      pintar('r-conf', reparto([
        ['Con conflicto de fondo', h.conflicto, COLORES[0]], ['Sin conflicto de fondo', h.sinConflicto, PAISES[1]],
        ['Sin dato de homologación', h.sinDato, '#8996a8']
      ], pct(h.conflicto, h.conflicto + h.sinConflicto), 'con dato'));
      pintar('b-crit', barras(top.slice(0, 10).map(c => [
        c.cargo + ' · ' + c.codigo, [[c.categoria, c.oc, categorias.find(row => row[0] === c.categoria)[1]]]
      ])) + leyenda(categorias.slice(0, 4)));
      pintar('t-crit', tabla(['Cargo optimizado', 'Código', 'Familia', 'Ocupantes', 'Nombres actuales', 'Países', '% que cambia',
        'Con conflicto', 'Criticidad', 'Revisión'], top.map(r => [r.cargo, r.codigo, r.familia, fmt(r.oc), fmt(r.den),
        fmt(r.paises), pct(r.cambian, r.comparables), fmt(r.conflictos), r.categoria, r.accion])));
      const altaMedia = cargos.filter(c => c.oc && c.score >= 2);
      $('criterio').textContent = `${fmt(altaMedia.length)} cargos de criticidad Alta o Media concentran a ${fmt(sum(altaMedia, c => c.oc))} personas. El puntaje suma volumen, variación de denominaciones o presencia en tres países y conflicto de fondo.`;
      pintarRecomendaciones(cargos, altaMedia.length);
    }

    $('pais').addEventListener('change', pintarPais);
    ['u1', 'u2', 'u3'].forEach(id => $(id).addEventListener('input', pintarCriticidad));
    pintarPais();
    pintarCriticidad();
  }

  window.ReclasificacionTalento = { vista, montar, secciones: SECCIONES, titulo: 'Reclasificación de personal' };
})();
