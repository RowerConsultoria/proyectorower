/* ============================================================================
   EL SISTEMA — Pantalla: pedidos y bandeja de aprobación · Fase 15 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   Aquí NACE el pedido de venta, y eso es una decisión de arquitectura con
   consecuencias: si el pedido nace en el sistema, la línea que no se puede
   atender NO SE PUEDE BORRAR. Se archiva como demanda no atendida y vuelve a
   la mesa de compra del mes siguiente.

   Y aquí se aprueba. Hoy cada pedido de la región se revisa uno por uno, en
   medio minuto, mirando margen, cantidad y riesgo del cliente. El sistema hace
   los tres exámenes antes: lo que cumple los tres pasa EN LOTE, y solo sube la
   excepción, con el motivo escrito. No se elimina el criterio — se elimina
   revisar doscientas veces lo que no tiene nada que mirar.
   ============================================================================ */

window.PANTALLAS = window.PANTALLAS || {};

const _com = { abierto: null, aprobados: {}, vista: 'todo' };

window.PANTALLAS.comercial = function (lienzo) {
  const n = v => Math.round(v || 0).toLocaleString('es-VE');
  const d = datosDe('V-02') || { verde: [], excepcion: [] };
  const entrada = entradaDe('V-02');
  const todos = [...d.verde.map(x => ({ ...x, clase: 'verde' })),
                 ...d.excepcion.map(x => ({ ...x, clase: 'excepcion' }))];

  const pendientes = todos.filter(x => !_com.aprobados[x.id]);
  const verdes = pendientes.filter(x => x.clase === 'verde');
  const excep = pendientes.filter(x => x.clase === 'excepcion');
  const aprobados = todos.filter(x => _com.aprobados[x.id]);

  const visibles = _com.vista === 'verde' ? verdes
                 : _com.vista === 'excepcion' ? excep
                 : _com.vista === 'aprobado' ? aprobados : pendientes;

  const valorTotal = todos.reduce((a, x) => a + x.valor, 0);
  const sinAtender = todos.reduce((a, x) => a + Math.max(0, x.unidades - x.asignado), 0);
  /* Lo que importa es la PROPORCIÓN, no un ahorro en minutos: con diez pedidos
     de muestra cualquier cuenta de tiempo sale ridícula, y una cifra inventada
     en una pantalla llena de cifras calculadas se nota. La proporción, en
     cambio, es la misma con diez pedidos que con doscientos. */
  const pctVerde = todos.length ? Math.round(d.verde.length / todos.length * 100) : 0;

  lienzo.innerHTML = `
    <div class="lienzo-cab fila-sep">
      <div>
        <div class="sobretitulo">operación</div>
        <div class="titulo-seccion" style="margin-top:4px">comercial</div>
      </div>
      <span class="marca-estado e-neutro"><i class="punto"></i>el pedido nace aquí</span>
    </div>

    <div class="cinta" style="margin-bottom:20px">
      <span class="orbe hecho"></span><span class="hora">${HOY.hora}</span>
      <div class="crece">${entrada ? entrada.salida : ''} —
        <b>el ${pctVerde} % del corte no tiene nada que revisar</b>, y esa proporción es la misma
        con diez pedidos que con doscientos</div>
    </div>

    <div class="rejilla rejilla-4" style="margin-bottom:22px">
      <div class="tarjeta"><div class="kpi"><div class="rotulo">pedidos del corte</div>
        <div class="valor">${todos.length}</div>
        <div class="pie">${n(todos.reduce((a, x) => a + x.unidades, 0))} unidades pedidas</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">pasan en lote</div>
        <div class="valor texto-marca">${d.verde.length}</div>
        <div class="pie">cumplen crédito, rotación y margen${aprobados.length
          ? ` · <b>${aprobados.length} ya firmados</b>` : ''}</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">suben como excepción</div>
        <div class="valor" style="color:${excep.length ? 'var(--n3)' : 'inherit'}">${excep.length}</div>
        <div class="pie">con el motivo escrito, no en rojo a secas</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">valor del corte</div>
        <div class="valor">${n(valorTotal)}</div><div class="pie">USD de venta a los frentes</div></div></div>
    </div>

    ${sinAtender ? `
    <div class="bloqueo" style="margin-bottom:22px">
      <div class="fila-sep">
        <div class="fila gap-8"><span class="orbe orbe-mini hecho"></span>
          <b style="font-size:13px">${n(sinAtender)} unidades pedidas que no se pueden atender</b></div>
        <span class="sello sello-2"><i></i>hice</span>
      </div>
      <div class="apunte mt-8" style="max-width:820px">
        Hoy esas líneas <b>se eliminan del pedido</b> y con ellas desaparece el rastro de que
        alguien las quiso. Aquí no se pueden borrar: quedan archivadas como <b>demanda no
        atendida</b> —con cliente, cantidad, motivo y fecha— y vuelven a la mesa de compra del mes
        que viene. Es la única cifra del sistema que no se puede reconstruir hacia atrás: la serie
        empieza el día que el sistema arranca.
      </div>
      <div class="fila gap-8 mt-16">
        <button class="btn btn-suave btn-mini" id="ver-demanda">ver la demanda no atendida →</button>
      </div>
    </div>` : ''}

    <div class="fila-sep" style="margin-bottom:12px">
      <div class="sobretitulo">bandeja de aprobación</div>
      <div class="fila gap-8" id="vistas-com">
        ${[['todo', 'pendientes', pendientes.length],
           ['verde', 'en verde', verdes.length],
           ['excepcion', 'excepciones', excep.length],
           ['aprobado', 'aprobados', aprobados.length]].map(([k, t, c]) =>
          `<span class="chip ${_com.vista === k ? 'on' : ''}" data-v="${k}">${t} <span class="n">${c}</span></span>`).join('')}
      </div>
    </div>

    <div class="pila gap-12" id="pedidos"></div>

    <div class="barra-mesa">
      <div class="dato"><span class="r">en verde</span><span class="v">${verdes.length}</span></div>
      <div class="dato"><span class="r">excepciones</span><span class="v" style="color:${excep.length ? 'var(--n3)' : 'inherit'}">${excep.length}</span></div>
      <div class="crece"></div>
      <span class="apunte tenue">el criterio no se elimina: se deja de aplicar doscientas veces a lo que no tiene nada que mirar</span>
      <button class="btn btn-humano" id="firmar-lote" data-firma="pedidos" ${verdes.length ? '' : 'disabled'}>
        firmar los ${verdes.length} en verde</button>
    </div>`;

  const caja = lienzo.querySelector('#pedidos');

  function pinta() {
    caja.innerHTML = visibles.map(x => {
      const abierto = _com.abierto === x.id;
      const ok = x.clase === 'verde';
      const aprob = _com.aprobados[x.id];
      const pel = ESCALERA.find(e => e.clave === x.peldano);
      return `<div class="tarjeta" data-p="${x.id}">
        <div class="fila-sep" style="cursor:pointer" data-t="${x.id}">
          <div>
            <div class="fila gap-8">
              <b style="font-size:13.5px" class="mono">${x.id}</b>
              <b style="font-size:13.5px">${x.frente}</b>
              <span class="via ${x.via === 'odoo' ? 'via-odoo' : 'via-portal'}">${x.via}</span>
              ${aprob ? '<span class="marca-estado e-ok"><i class="punto"></i>firmado</span>'
                      : ok ? '<span class="marca-estado e-ok"><i class="punto"></i>en verde</span>'
                           : '<span class="marca-estado e-alerta"><i class="punto"></i>excepción</span>'}
            </div>
            <div class="apunte tenue mt-8">${x.lineas} líneas · ${n(x.unidades)} u pedidas ·
              ${n(x.asignado)} asignadas · ${TIPOS_FRENTE[x.tipo].rotulo} ·
              peldaño ${pel ? pel.n : '—'}</div>
            ${!ok ? `<div class="apunte mt-8" style="font-size:11.5px;color:var(--n3)">
              ⚠ ${x.motivos.join(' · ')}</div>` : ''}
          </div>
          <div class="fila gap-20" style="text-align:right">
            <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">valor</div>
              <div class="cifra-media">${n(x.valor)}</div></div>
            <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">margen</div>
              <div class="cifra-media" style="color:${x.margen < 0.28 ? 'var(--n3)' : 'var(--ok)'}">${(x.margen * 100).toFixed(0)} %</div></div>
            <span class="apunte tenue" style="align-self:center">${abierto ? '▾' : '▸'}</span>
          </div>
        </div>

        ${abierto ? `
        <hr class="sep">
        <div class="rejilla" style="grid-template-columns:1fr 1fr;gap:22px">
          <div>
            <div class="sobretitulo">los tres exámenes</div>
            <ul class="razones" style="margin-top:12px">
              <li class="${x.usoCupo > 0.7 ? 'aviso' : 'clave'}"><b>Crédito:</b> usa el
                <b>${(x.usoCupo * 100).toFixed(0)} %</b> de su cupo${x.atraso ? ` y lleva <b>${x.atraso} días</b> de atraso` : ' y está al día'}.</li>
              <li class="${x.margen < 0.28 ? 'aviso' : ''}"><b>Margen:</b> <b>${(x.margen * 100).toFixed(0)} %</b>
                sobre ${n(x.valor)} USD${x.margen < 0.28 ? ', por debajo del mínimo de la línea' : ''}.</li>
              <li class="${x.sobreRotacion.length ? 'aviso' : ''}"><b>Rotación:</b>
                ${x.sobreRotacion.length
                  ? `<b>${x.sobreRotacion.length} línea${x.sobreRotacion.length > 1 ? 's' : ''}</b> por encima de dos meses de su propia rotación`
                  : 'todas las líneas dentro de su rotación'}.</li>
            </ul>
            ${x.sobreRotacion.length ? `<div class="pila gap-4 mt-16">
              ${x.sobreRotacion.slice(0, 4).map(l => `<div class="fila gap-8" style="font-size:11.5px">
                <span class="crece tenue">· ${l.nombre}</span>
                <span>pide <b>${n(l.pide)}</b></span>
                <span class="tenue">rota ${n(l.rota)}/mes</span></div>`).join('')}
              <div class="apunte tenue mt-8" style="font-size:11px">Sobre-stockear al frente no es
                una venta: es una devolución en dos meses.</div>
            </div>` : ''}
          </div>
          <div>
            <div class="sobretitulo">qué se le asigna</div>
            <div class="fila-sep mt-12">
              <span class="cifra-media">${n(x.asignado)} <span class="tenue" style="font-size:12px;font-weight:400">de ${n(x.unidades)} u</span></span>
              <span class="apunte">${x.unidades ? (x.asignado / x.unidades * 100).toFixed(0) : 0} % de servicio</span>
            </div>
            <div class="barra ${x.asignado < x.unidades ? 'parcial' : ''} mt-8">
              <span style="width:${x.unidades ? (x.asignado / x.unidades * 100).toFixed(0) : 0}%"></span></div>
            ${x.unidades > x.asignado ? `<div class="apunte tenue mt-8" style="font-size:11.5px">
              <b>${n(x.unidades - x.asignado)} u</b> quedan como demanda no atendida y vuelven a la
              mesa de compra. No se borran.</div>` : ''}
            <div class="fila gap-8 mt-24">
              ${aprob ? '<span class="sello sello-2"><i></i>hice</span>'
                      : `<button class="btn btn-humano btn-mini" data-pedido="${x.id}" data-firma="pedidos">firmar este pedido</button>
                         <span class="sello sello-3"><i></i>tu firma</span>`}
            </div>
          </div>
        </div>` : ''}
      </div>`;
    }).join('') || '<div class="vacio"><div class="icono">◇</div>nada en esta vista</div>';

    caja.querySelectorAll('[data-t]').forEach(el => el.onclick = () => {
      _com.abierto = _com.abierto === el.dataset.t ? null : el.dataset.t;
      window.PANTALLAS.comercial(lienzo);
    });
    caja.querySelectorAll('[data-pedido]').forEach(b => b.onclick = e => {
      e.stopPropagation();
      firma([todos.find(x => x.id === b.dataset.pedido)], 'firma individual');
    });
  }

  function firma(lista, como) {
    lista.forEach(x => {
      _com.aprobados[x.id] = true;
      /* Firmar no es marcar: el pedido baja al frente como orden lista para
         facturar y por tanto CONSUME su cupo de crédito. Sin esto la pantalla
         volvía a prometer un efecto que no ocurría. */
      const f = FRENTES.find(y => y.id === x.frenteId);
      if (f) f.saldo += Math.round(x.valor * (x.unidades ? x.asignado / x.unidades : 1));
    });
    const u = lista.reduce((a, x) => a + x.asignado, 0);
    const v = lista.reduce((a, x) => a + x.valor, 0);
    anota({
      accion: 'V-03 · firmar pedidos de clientes mayores',
      agente: 'precalificador', modulo: 'comercial',
      dispara: como === 'lote' ? 'una persona firmó en lote los pedidos en verde'
                               : 'una persona firmó un pedido concreto',
      salida: `${lista.length} pedido${lista.length > 1 ? 's' : ''} firmado${lista.length > 1 ? 's' : ''} · ` +
              `${n(u)} u por ${n(v)} USD · bajan a cada frente como orden lista para facturar` +
              (lista.some(x => x.via === 'odoo') ? ', y a los que tienen Odoo se les escribe la transferencia' : ''),
      ejes: { perimetro: 'interno', reversibilidad: 'humana', radio: 'frente', dinero: 'caja', reloj: 'alcanza' },
      cruza: 'logística',
    });
    /* la estela sale sola: la acción se anota con `cruza` (fase 22 · P3) */
    setTimeout(() => window.PANTALLAS.comercial(lienzo), 800);
  }

  lienzo.querySelectorAll('#vistas-com .chip').forEach(c => c.onclick = () => {
    _com.vista = c.dataset.v; window.PANTALLAS.comercial(lienzo);
  });
  const fl = lienzo.querySelector('#firmar-lote');
  if (fl && verdes.length) fl.onclick = () => firma(verdes, 'lote');
  const vd = lienzo.querySelector('#ver-demanda');
  if (vd) vd.onclick = () => { location.hash = '#/comercial/demanda'; };

  pinta();
};
