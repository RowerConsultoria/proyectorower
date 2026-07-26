/* ============================================================================
   EL SISTEMA — Pantalla: desarrollo de producto        · Fase 10 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   De aquí sale lo que después se compra. El embudo del candidato —idea,
   muestra pedida, en prueba, decisión— y la regla que conecta este módulo
   con todo lo demás: SOLO UN PRODUCTO GRADUADO PUEDE COMPRARSE.

   Lo que aporta el sistema no es una lista de ideas: es que la decisión se
   tome con la evidencia delante. Cada candidato se proyecta contra un
   equivalente que YA está en catálogo, así que la demanda esperada no se
   inventa — y las pruebas con falla la corrigen a la baja, con su aritmética
   a la vista.
   ============================================================================ */

window.PANTALLAS = window.PANTALLAS || {};

const _prod = { etapa: 'todo', abierto: null };

const _ICONO_PRUEBA = { ok: '●', duda: '●', falla: '●', pendiente: '○' };
const _COLOR_PRUEBA = { ok: 'var(--ok)', duda: 'var(--alerta)', falla: 'var(--riesgo)', pendiente: 'var(--tinta-tenue)' };

window.PANTALLAS.producto = function (lienzo) {
  const n = v => Math.round(v || 0).toLocaleString('es-VE');
  const activos = CANDIDATOS.filter(c => !['graduado', 'descartado'].includes(c.etapa));
  const enDecision = CANDIDATOS.filter(c => c.etapa === 'decision');
  const listos = enDecision.filter(c => bloqueantesDe(c).length === 0);
  const atascados = activos.filter(c => c.diasEnEtapa > 21);

  const visibles = _prod.etapa === 'todo' ? CANDIDATOS : CANDIDATOS.filter(c => c.etapa === _prod.etapa);

  lienzo.innerHTML = `
    <div class="lienzo-cab fila-sep">
      <div>
        <div class="sobretitulo">operación</div>
        <div class="titulo-seccion" style="margin-top:4px">desarrollo de producto</div>
      </div>
      <span class="marca-estado e-neutro"><i class="punto"></i>solo un producto graduado es comprable</span>
    </div>

    <div class="cinta" style="margin-bottom:20px">
      <span class="orbe hecho"></span><span class="hora">${HOY.hora}</span>
      <div class="crece">revisé los <b>${activos.length} candidatos activos</b>:
        <b>${listos.length}</b> ${listos.length === 1 ? 'está listo' : 'están listos'} para decidir sin bloqueantes,
        <b>${enDecision.length - listos.length}</b> en decisión con algo abierto,
        y <b>${atascados.length}</b> llevan más de tres semanas en la misma etapa</div>
    </div>

    <div class="rejilla rejilla-4" style="margin-bottom:22px">
      <div class="tarjeta"><div class="kpi"><div class="rotulo">candidatos activos</div>
        <div class="valor">${activos.length}</div><div class="pie">de ${CANDIDATOS.length} en el embudo</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">listos para decidir</div>
        <div class="valor texto-marca">${listos.length}</div><div class="pie">sin pruebas abiertas ni bloqueantes</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">atascados</div>
        <div class="valor" style="color:${atascados.length ? 'var(--n3)' : 'inherit'}">${atascados.length}</div>
        <div class="pie">más de 21 días en la misma etapa</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">graduados</div>
        <div class="valor">${CANDIDATOS.filter(c => c.etapa === 'graduado').length}</div>
        <div class="pie">ya comprables en su mesa</div></div></div>
    </div>

    <!-- el embudo -->
    <div class="panel" style="margin-bottom:20px">
      <div class="sobretitulo">el embudo</div>
      <div class="fila gap-8 mt-16" style="flex-wrap:wrap" id="embudo">
        <span class="chip ${_prod.etapa === 'todo' ? 'on' : ''}" data-e="todo">todo <span class="n">${CANDIDATOS.length}</span></span>
        ${ETAPAS.map(e => {
          const c = CANDIDATOS.filter(x => x.etapa === e.id).length;
          return `<span class="chip ${_prod.etapa === e.id ? 'on' : ''} ${c ? '' : 'oculto'}" data-e="${e.id}">${e.rotulo} <span class="n">${c}</span></span>`;
        }).join('<span class="apunte tenue" style="align-self:center">→</span>')}
      </div>
    </div>

    <div class="rejilla" style="grid-template-columns:minmax(0,1fr) ${_prod.abierto ? '400px' : '0'};gap:20px;align-items:start">
      <div class="pila gap-12" id="lista"></div>
      <div id="ficha"></div>
    </div>

    <p class="apunte tenue mt-24" style="max-width:820px;line-height:1.55">
      La demanda esperada de un candidato <b>no se inventa</b>: se toma la de su equivalente ya en
      catálogo y se corrige por lo que dijeron las pruebas — cada falla descuenta un 30 % y cada
      duda un 10 %. Y la primera compra no la fija la demanda sino <b>el pedido mínimo de la
      fábrica</b>, que es lo que de verdad decide si un producto nuevo entra o no.
    </p>`;

  const lista = lienzo.querySelector('#lista');

  function pintaLista() {
    lista.innerHTML = visibles.map(c => {
      const p = proyeccionCandidato(c);
      const bl = bloqueantesDe(c);
      const et = ETAPAS.find(e => e.id === c.etapa);
      const grad = c.etapa === 'graduado', desc = c.etapa === 'descartado';
      return `<div class="tarjeta pulsable ${_prod.abierto === c.id ? '' : ''}" data-c="${c.id}"
                   style="${_prod.abierto === c.id ? 'border-color:var(--menta)' : ''}">
        <div class="fila-sep">
          <div class="fila gap-12">
            <!-- Un candidato no tiene fotografía propia todavía: se muestra la de su
                 equivalente, con borde punteado para que no se confunda con el producto real. -->
            <div style="position:relative;flex:none">
              ${p.eq ? `<img src="img/${p.eq.img}" alt="" loading="lazy"
                   style="width:46px;height:46px;border-radius:14px;object-fit:cover;
                          background:var(--panel-alto);border:1.5px dashed var(--borde);opacity:${desc ? '.4' : '.9'}">`
                : `<div class="marcador" style="width:46px;height:46px;border-radius:14px">${c.familia.slice(0, 2).toUpperCase()}</div>`}
              ${grad ? `<span style="position:absolute;right:-4px;bottom:-4px;width:19px;height:19px;border-radius:50%;
                   background:var(--ok);color:var(--tinta-inversa);font-size:11px;font-weight:700;display:flex;
                   align-items:center;justify-content:center;border:2px solid var(--fondo)">✓</span>` : ''}
              ${desc ? `<span style="position:absolute;right:-4px;bottom:-4px;width:19px;height:19px;border-radius:50%;
                   background:var(--tinta-tenue);color:var(--tinta-inversa);font-size:11px;font-weight:700;display:flex;
                   align-items:center;justify-content:center;border:2px solid var(--fondo)">×</span>` : ''}
            </div>
            <div>
              <div class="fila gap-8"><b style="font-size:14px">${c.nombre}</b>
                <span class="marca-estado ${grad ? 'e-ok' : desc ? 'e-neutro' : bl.length ? 'e-alerta' : 'e-ok'}">
                  <i class="punto"></i>${et.rotulo}</span>
                ${c.diasEnEtapa > 21 && !grad && !desc ? `<span class="apunte" style="color:var(--n3)">${c.diasEnEtapa} días aquí</span>` : ''}
              </div>
              <div class="apunte tenue mt-8">${c.familia} · ${p.fab ? p.fab.nombre : '—'} ·
                equivalente ${p.eq ? p.eq.nombre : '—'}</div>
            </div>
          </div>
          <div class="fila gap-16" style="text-align:right">
            <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">margen</div>
              <div class="cifra-media" style="color:${p.margenPct < 0.45 ? 'var(--n3)' : 'inherit'}">${(p.margenPct * 100).toFixed(0)} %</div></div>
            <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">demanda proyectada</div>
              <div class="cifra-media">${n(p.mensual)} <span class="tenue" style="font-size:11px;font-weight:400">u/mes</span></div></div>
          </div>
        </div>
        ${bl.length && !grad && !desc ? `<div class="apunte mt-16" style="color:var(--n3);font-size:11.5px">
          ⚠ ${bl.join(' · ')}</div>` : ''}
        ${grad && c.skuCanonico ? `<div class="apunte mt-16" style="color:var(--ok);font-size:11.5px">
          ✓ en catálogo como <b>${c.skuCanonico}</b> — ya aparece en la mesa de compra</div>` : ''}
      </div>`;
    }).join('') || '<div class="vacio"><div class="icono">◇</div>ningún candidato en esta etapa</div>';

    lista.querySelectorAll('[data-c]').forEach(el => el.onclick = () => {
      _prod.abierto = _prod.abierto === el.dataset.c ? null : el.dataset.c;
      window.PANTALLAS.producto(lienzo);
    });
  }

  function pintaFicha() {
    const caja = lienzo.querySelector('#ficha');
    if (!_prod.abierto) { caja.innerHTML = ''; return; }
    const c = CANDIDATOS.find(x => x.id === _prod.abierto);
    if (!c) { caja.innerHTML = ''; return; }
    const p = proyeccionCandidato(c);
    const bl = bloqueantesDe(c);

    caja.innerHTML = `<div class="explica" style="width:auto">
      <div class="fila-sep"><div class="sobretitulo">ficha del candidato</div>
        <button class="btn btn-fantasma btn-mini" id="cerrar-f">✕</button></div>

      <h4 class="mt-16">${c.nombre}</h4>
      <div class="apunte tenue mono" style="margin-top:3px">${c.id} · ${c.familia}</div>
      <div class="apunte mt-8">${c.porQue}</div>

      <hr class="sep">
      <div class="sobretitulo">economía</div>
      <div class="rejilla" style="grid-template-columns:1fr 1fr;gap:10px;margin-top:12px">
        <div><div class="apunte tenue" style="font-size:10.5px">costo objetivo</div>
          <div class="cifra-media">$${c.costoObjetivo}</div></div>
        <div><div class="apunte tenue" style="font-size:10.5px">precio previsto</div>
          <div class="cifra-media">$${c.pvpPrevisto}</div></div>
        <div><div class="apunte tenue" style="font-size:10.5px">margen</div>
          <div class="cifra-media" style="color:${p.margenPct < 0.45 ? 'var(--n3)' : 'var(--ok)'}">${(p.margenPct * 100).toFixed(0)} %</div></div>
        <div><div class="apunte tenue" style="font-size:10.5px">margen del equivalente</div>
          <div class="cifra-media tenue">${(p.margenEq * 100).toFixed(0)} %</div></div>
      </div>

      <hr class="sep">
      <div class="sobretitulo">comparado con lo que ya vendes</div>
      ${p.eq ? `<div class="fila gap-12 mt-12">
        <img src="img/${p.eq.img}" alt="" style="width:44px;height:44px;border-radius:12px;object-fit:cover;
             background:var(--panel-alto);border:1px solid var(--borde)">
        <div><b style="font-size:12.5px">${p.eq.nombre}</b>
          <div class="apunte tenue">${p.eq.sku} · ${n(demandaSaneada(p.eq.sku).mensual)} u/mes</div></div>
      </div>` : '<div class="apunte tenue mt-12">sin equivalente en catálogo</div>'}
      <ul class="razones">
        <li>Demanda del equivalente: <b>${n(p.eq ? demandaSaneada(p.eq.sku).mensual : 0)} u/mes</b>.</li>
        <li class="${p.factor < 1 ? 'aviso' : 'clave'}">Corrección por las pruebas: <b>×${p.factor.toFixed(2)}</b>
          ${p.fallas ? `(${p.fallas} falla${p.fallas > 1 ? 's' : ''} −30 % cada una)` : ''}
          ${p.dudas ? `(${p.dudas} duda${p.dudas > 1 ? 's' : ''} −10 % cada una)` : ''}
          ${p.factor === 1 ? '— sin descuentos' : ''}</li>
        <li>Demanda proyectada: <b>${n(p.mensual)} u/mes</b>.</li>
        <li class="clave">Primera compra: <b>${n(p.primeraCompra)} u</b> — la fija el pedido mínimo de
          ${p.fab ? p.fab.nombre : 'la fábrica'} (${n(p.fab ? p.fab.moq : 0)} u), no la demanda.
          ${p.mesesQueDura ? `Ese mínimo dura <b>${p.mesesQueDura.toFixed(1)} meses</b> de venta.` : ''}</li>
      </ul>

      <hr class="sep">
      <div class="sobretitulo">muestras y pruebas</div>
      <div class="apunte mt-8">${c.muestras.recibidas
        ? `${c.muestras.recibidas} de ${c.muestras.pedidas} muestras recibidas el ${c.muestras.fecha}`
        : c.muestras.pedidas ? `${c.muestras.pedidas} muestras pedidas, ninguna recibida` : 'sin muestras pedidas'}</div>
      <div class="pila gap-8 mt-12">
        ${c.pruebas.length ? c.pruebas.map(t => `<div class="fila gap-8" style="font-size:12px">
          <span style="color:${_COLOR_PRUEBA[t.resultado]};flex:none">${_ICONO_PRUEBA[t.resultado]}</span>
          <span class="crece">${t.que}</span>
          <span class="apunte tenue" style="text-align:right;max-width:150px">${t.nota}</span></div>`).join('')
          : '<div class="apunte tenue">todavía no hay pruebas</div>'}
      </div>

      ${c.riesgos.length ? `<div class="bloqueo mt-16">
        <div class="sobretitulo" style="color:var(--n3)">riesgos declarados</div>
        ${c.riesgos.map(r => `<div class="apunte mt-8">${r}</div>`).join('')}
      </div>` : ''}

      <hr class="sep">
      ${c.etapa === 'graduado' ? `
        <div class="apunte" style="color:var(--ok)">✓ graduado el ${c.graduadoEl}
          ${c.skuCanonico ? `· en catálogo como <b>${c.skuCanonico}</b>` : ''}</div>
        ${c.skuCanonico ? '<button class="btn btn-suave btn-mini mt-16" id="ver-mesa">ver en la mesa de compra →</button>' : ''}
      ` : c.etapa === 'descartado' ? `
        <div class="apunte tenue">descartado · ${c.motivoDescarte}</div>
      ` : bl.length ? `
        <div class="sobretitulo" style="color:var(--n3)">no puede graduar todavía</div>
        <div class="pila gap-4 mt-8">${bl.map(x => `<div class="apunte" style="color:var(--n3)">· ${x}</div>`).join('')}</div>
        <div class="apunte tenue mt-16" style="font-size:11.5px">El botón de graduar no existe mientras
          haya un bloqueante. No se esconde: se dice por qué.</div>
      ` : `
        <div class="fila gap-8">
          <button class="btn btn-marca btn-mini" id="graduar">graduar al catálogo</button>
          <span class="sello sello-3"><i></i>tu firma</span>
        </div>
        <div class="apunte tenue mt-8" style="font-size:11.5px">Al graduar entra al catálogo canónico
          y <b>solo entonces</b> puede aparecer en una mesa de compra. Hasta que tenga histórico y
          fotografía propios, hereda los de su equivalente y queda marcado como <b>nuevo</b>: es una
          proyección, no un dato.</div>
      `}
    </div>`;

    const x = caja.querySelector('#cerrar-f');
    if (x) x.onclick = () => { _prod.abierto = null; window.PANTALLAS.producto(lienzo); };
    const g = caja.querySelector('#graduar');
    if (g) g.onclick = () => {
      const e = graduar(c.id);
      viajaEstela(['producto', 'compras']);
      setTimeout(() => {
        window.PANTALLAS.producto(lienzo);
        alert(`${c.nombre} graduado al catálogo.\n\n${e.salida}\n\nYa aparece en la mesa de compra de su fábrica.`);
      }, 900);
    };
    const vm = caja.querySelector('#ver-mesa');
    if (vm) vm.onclick = () => { viajaEstela(['producto', 'compras']); setTimeout(() => location.hash = '#/compras/cubitt', 800); };
  }

  lienzo.querySelectorAll('#embudo .chip').forEach(c => c.onclick = () => {
    _prod.etapa = c.dataset.e; window.PANTALLAS.producto(lienzo);
  });

  pintaLista();
  pintaFicha();
};
