/* ============================================================================
   EL SISTEMA — Demanda no atendida y disponibilidad     · Fase 16 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   Dos pantallas que van juntas porque son la misma conversación vista por sus
   dos extremos: lo que se pidió y no se pudo dar, y lo que se le promete a
   cada quien.

   1 · DEMANDA NO ATENDIDA. La cifra que hoy no existe en ninguna parte, porque
       la línea que no se puede despachar se elimina del pedido y con ella el
       rastro de que alguien la quiso. Aquí no se puede borrar.

   2 · DISPONIBILIDAD PUBLICADA. Y aquí una advertencia que el sistema respeta:
       publicar un RANGO en vez de la cantidad exacta NO es un defecto que
       corregir. Es reserva de información frente a un distribuidor que también
       compra a otros. El sistema no lo «arregla»: lo hace una política por
       cliente, con dueño y fecha, que se decide y se ve.
   ============================================================================ */

window.PANTALLAS = window.PANTALLAS || {};

const _dem = { vista: 'demanda', porFrente: false };

/** Lo que cada frente pidió y no se le pudo dar, línea por línea. */
function demandaNoAtendida() {
  const d = datosDe('X-01') || { porFrente: {} };
  const filas = [];
  for (const [fid, x] of Object.entries(d.porFrente)) {
    const f = FRENTES.find(y => y.id === fid);
    for (const l of x.lineas) {
      const falta = l.pide - l.recibe;
      if (falta <= 0) continue;
      const p = CATALOGO.find(y => y.sku === l.sku);
      if (!p) continue;
      const causa = CAUSA_ESCASEZ[l.sku];
      filas.push({
        f, p, pide: l.pide, recibe: l.recibe, falta,
        valor: Math.round(falta * p.pvp * 0.62),
        peldano: l.peldano,
        motivo: causa ? causa.texto : 'lo pedido superó lo disponible en el corte',
      });
    }
  }
  return filas.sort((a, b) => b.valor - a.valor);
}

/** Cómo se le publica el disponible a un frente, según su política. */
function publicadoPara(f, u) {
  if (f.politicaPublicacion === 'exacta') return { txt: u.toLocaleString('es-VE'), exacta: true };
  const r = POLITICA_PUBLICACION.rangos.find(([a, b]) => u >= a && (b === null || u < b));
  if (!r) return { txt: '—', exacta: false };
  return { txt: r[1] === null ? `+${r[0]}` : `${r[0]}–${r[1]}`, exacta: false };
}

window.PANTALLAS['comercial/demanda'] = function (lienzo) {
  const n = v => Math.round(v || 0).toLocaleString('es-VE');
  const filas = demandaNoAtendida();
  const totU = filas.reduce((a, x) => a + x.falta, 0);
  const totV = filas.reduce((a, x) => a + x.valor, 0);
  const refs = new Set(filas.map(x => x.p.sku)).size;
  const frentes = new Set(filas.map(x => x.f.id)).size;

  /* agrupada por frente o por referencia, según lo que se quiera mirar */
  const grupos = {};
  for (const x of filas) {
    const k = _dem.porFrente ? x.f.id : x.p.sku;
    const g = grupos[k] = grupos[k] || {
      titulo: _dem.porFrente ? x.f.nombre : x.p.nombre,
      sub: _dem.porFrente ? `${x.f.pais} · ${TIPOS_FRENTE[x.f.tipo].rotulo}` : x.p.sku,
      img: _dem.porFrente ? null : x.p.img, u: 0, valor: 0, lineas: [],
    };
    g.u += x.falta; g.valor += x.valor; g.lineas.push(x);
  }
  const orden = Object.values(grupos).sort((a, b) => b.valor - a.valor);

  lienzo.innerHTML = `
    <div class="lienzo-cab fila-sep">
      <div>
        <div class="sobretitulo">comercial</div>
        <div class="titulo-seccion" style="margin-top:4px">demanda no atendida y disponibilidad</div>
      </div>
      <div class="fila gap-8">
        <button class="btn btn-fantasma btn-mini" id="volver-com">← pedidos</button>
        <span class="chip ${_dem.vista === 'demanda' ? 'on' : ''}" data-vista="demanda">demanda no atendida</span>
        <span class="chip ${_dem.vista === 'publicado' ? 'on' : ''}" data-vista="publicado">disponibilidad publicada</span>
      </div>
    </div>
    <div id="cuerpo-dem"></div>`;

  const cuerpo = lienzo.querySelector('#cuerpo-dem');

  function pintaDemanda() {
    cuerpo.innerHTML = `
      <div class="cinta" style="margin-bottom:20px">
        <span class="orbe hecho"></span><span class="hora">${HOY.hora}</span>
        <div class="crece">archivé <b>${filas.length} líneas</b> que no se pudieron atender:
          <b>${n(totU)} unidades</b> por <b>${n(totV)} USD</b> en ${refs} referencias y ${frentes} frentes.
          Ninguna se borró</div>
        <span class="sello sello-2"><i></i>hice</span>
      </div>

      <div class="rejilla rejilla-4" style="margin-bottom:22px">
        <div class="tarjeta"><div class="kpi"><div class="rotulo">unidades no atendidas</div>
          <div class="valor" style="color:var(--n3)">${n(totU)}</div>
          <div class="pie">${filas.length} líneas de pedido</div></div></div>
        <div class="tarjeta"><div class="kpi"><div class="rotulo">valor perdido del corte</div>
          <div class="valor">${n(totV)}</div><div class="pie">USD que se dejaron de vender</div></div></div>
        <div class="tarjeta"><div class="kpi"><div class="rotulo">referencias</div>
          <div class="valor">${refs}</div><div class="pie">vuelven a la mesa de compra</div></div></div>
        <div class="tarjeta"><div class="kpi"><div class="rotulo">frentes afectados</div>
          <div class="valor">${frentes}</div><div class="pie">de ${FRENTES.length} en la red</div></div></div>
      </div>

      <div class="bloqueo" style="margin-bottom:22px">
        <div class="fila gap-8"><span class="orbe orbe-mini"></span>
          <b style="font-size:13px">esta serie no se puede reconstruir hacia atrás</b></div>
        <div class="apunte mt-8" style="max-width:840px">
          Todo lo demás que muestra el sistema se puede recalcular con los datos que ya existen.
          Esto no: <b>hoy la línea que no se puede despachar se elimina del pedido</b>, y con ella
          desaparece el rastro de que alguien la quiso. La serie empieza el día que el sistema
          arranca, y por eso este número va a crecer durante un año antes de valer para comparar.
          Decirlo es más útil que dibujar una gráfica de meses que nadie registró.
        </div>
      </div>

      <div class="fila-sep" style="margin-bottom:12px">
        <div class="sobretitulo">qué se dejó de vender</div>
        <div class="fila gap-8">
          <span class="chip ${!_dem.porFrente ? 'on' : ''}" data-agr="ref">por referencia</span>
          <span class="chip ${_dem.porFrente ? 'on' : ''}" data-agr="frente">por frente</span>
        </div>
      </div>

      <div class="tabla-envoltura" style="max-height:none">
        <table class="tabla">
          <thead><tr>
            <th>${_dem.porFrente ? 'frente' : 'referencia'}</th>
            <th class="num">no atendido</th><th class="num">valor</th>
            <th>por qué</th><th></th>
          </tr></thead>
          <tbody>
            ${orden.map(g => `<tr>
              <td><div class="producto">
                ${g.img ? `<img class="foto" src="img/${g.img}" alt="" loading="lazy">`
                        : '<div class="marcador" style="background:var(--panel-alto)">◈</div>'}
                <div class="txt"><div class="nom">${g.titulo}</div><div class="sub">${g.sub}</div></div>
              </div></td>
              <td class="num"><b>${n(g.u)}</b> <span class="tenue">u</span></td>
              <td class="num">${n(g.valor)}</td>
              <td class="apunte tenue" style="max-width:280px">${g.lineas[0].motivo}</td>
              <td>${!_dem.porFrente
                ? `<button class="btn btn-suave btn-mini" data-mesa="${g.lineas[0].p.marca}">a la mesa →</button>`
                : ''}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>

      <p class="apunte tenue mt-24" style="max-width:840px;line-height:1.55">
        Estas ${n(totU)} unidades <b>entran en la propuesta de compra del mes siguiente</b> como
        demanda real. Sin este registro, el sistema aprendería que de esas referencias se vendió
        lo que se pudo despachar — y compraría exactamente igual de poco el mes que viene.
      </p>`;

    cuerpo.querySelectorAll('[data-agr]').forEach(c => c.onclick = () => {
      _dem.porFrente = c.dataset.agr === 'frente';
      window.PANTALLAS['comercial/demanda'](lienzo);
    });
    /* cada referencia va a la mesa de SU marca: la de la marca propia se compra
       por fábrica y con pedido mínimo, no en la mesa del proveedor representado */
    cuerpo.querySelectorAll('[data-mesa]').forEach(b => b.onclick = () => {
      location.hash = b.dataset.mesa === 'Cubitt' ? '#/compras/cubitt' : '#/compras/casio';
    });
  }

  function pintaPublicado() {
    /* Se muestran referencias de los DOS extremos del disponible. Ordenar solo
       por demanda dejaba arriba las escasas y todo caía en el primer tramo;
       ordenar solo por disponible dejaba todo en «+50». Con ambos extremos se
       ve para qué sirve la escala — y se ve el caso que la explica: publicar
       «+50» teniendo 4.880 unidades es exactamente la reserva de información. */
    const conStock = CATALOGO.filter(p => disponible(p.sku, 'ZLC') > 0)
      .sort((a, b) => disponible(b.sku, 'ZLC') - disponible(a.sku, 'ZLC'));
    const top = [...conStock.slice(0, 4), ...conStock.slice(-4)];
    const exactas = FRENTES.filter(f => f.politicaPublicacion === 'exacta');
    const rangos = FRENTES.filter(f => f.politicaPublicacion === 'rango');

    cuerpo.innerHTML = `
      <div class="cinta" style="margin-bottom:20px">
        <span class="orbe hecho"></span><span class="hora">${HOY.hora}</span>
        <div class="crece">preparé la disponibilidad del corte para los <b>${FRENTES.length} frentes</b>,
          cada uno según su política: <b>${exactas.length}</b> en cantidad exacta y
          <b>${rangos.length}</b> en rango</div>
        <span class="sello sello-externo">↗ sale de Kenex</span>
      </div>

      <div class="panel" style="margin-bottom:22px">
        <div class="fila-sep">
          <div class="sobretitulo">la política de publicación</div>
          <span class="apunte tenue">dueño: ${POLITICA_PUBLICACION.dueno} ·
            versión ${POLITICA_PUBLICACION.ver} · vigente desde ${POLITICA_PUBLICACION.desde}</span>
        </div>
        <div class="apunte mt-8" style="max-width:860px">
          <b>Publicar un rango en vez de la cantidad exacta no es un defecto del sistema: es una
          decisión comercial.</b> A un distribuidor que también compra a otros no siempre conviene
          decirle cuánto hay exactamente. El sistema <b>no lo corrige</b> — lo hace explícito: cada
          frente tiene su política, con dueño y fecha, y se puede cambiar. Lo que antes era una
          costumbre pasa a ser una decisión que se ve.
        </div>
        <div class="fila gap-8 mt-16" style="flex-wrap:wrap">
          ${POLITICA_PUBLICACION.rangos.map(([a, b]) =>
            `<span class="chip" style="cursor:default">${b === null ? `+${a}` : `${a}–${b}`}</span>`).join('')}
          <span class="apunte tenue" style="align-self:center">escala de rangos vigente</span>
        </div>
      </div>

      <div class="fila-sep" style="margin-bottom:12px">
        <div class="sobretitulo">lo que ve cada frente</div>
        <span class="apunte tenue">compara la columna de disponible real con las de rango:
          ahí está la reserva de información, y es deliberada</span>
      </div>
      <div class="tabla-envoltura" style="max-height:none">
        <table class="tabla">
          <thead><tr>
            <th>referencia</th><th class="num">disponible real</th>
            ${FRENTES.map(f => `<th class="num" title="${f.nombre} · ${f.politicaPublicacion}">
              ${f.id}<div class="apunte tenue" style="font-size:9px;font-weight:400;text-transform:none;letter-spacing:0">
              ${f.politicaPublicacion === 'exacta' ? 'exacta' : 'rango'}</div></th>`).join('')}
          </tr></thead>
          <tbody>
            ${top.map(p => {
              const u = disponible(p.sku, 'ZLC');
              return `<tr>
                <td><div class="producto">
                  <img class="foto" src="img/${p.img}" alt="" loading="lazy">
                  <div class="txt"><div class="nom">${p.nombre}</div><div class="sub">${p.sku}</div></div>
                </div></td>
                <td class="num"><b>${n(u)}</b></td>
                ${FRENTES.map(f => {
                  const v = publicadoPara(f, u);
                  return `<td class="num ${v.exacta ? '' : 'tenue'}">${v.txt}</td>`;
                }).join('')}
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>

      <div class="panel mt-24">
        <div class="fila-sep">
          <div>
            <div class="fila gap-8"><span class="orbe"></span>
              <b style="font-size:13px">la publicación sale de Kenex, así que la firma una persona</b></div>
            <div class="apunte mt-8" style="max-width:700px">
              El agente prepara la tanda completa —una por frente, con su política aplicada— y la
              deja lista. <b>Firma en lote sobre la tanda</b>, no correo por correo, porque el
              formato y la política ya están aprobados: el agente solo instancia una decisión que
              ya se tomó. Pero el remitente sigue siendo una persona con nombre.
            </div>
          </div>
          <div class="fila gap-8">
            <span class="sello sello-externo">↗ sale de Kenex</span>
            <button class="btn btn-humano" id="firmar-pub" data-firma="disponibilidad">revisar y enviar la tanda</button>
          </div>
        </div>
      </div>`;

    const fp = cuerpo.querySelector('#firmar-pub');
    if (fp) fp.onclick = () => {
      anota({
        accion: 'V-04 · publicar la disponibilidad del corte',
        agente: 'publicación', modulo: 'comercial',
        dispara: 'corte semanal de disponibilidad',
        salida: `tanda preparada para ${FRENTES.length} frentes · ${exactas.length} en cantidad exacta ` +
                `y ${rangos.length} en rango, según la política de cada uno · firma en lote, remitente humano`,
        ejes: { perimetro: 'externo', reversibilidad: 'imposible', radio: 'borrador', dinero: 'ninguno', reloj: 'alcanza' },
        cruza: 'frentes',
      });
      alert(`Tanda lista para enviar.\n\n${FRENTES.length} frentes · ${exactas.length} en cantidad exacta, ${rangos.length} en rango\n\nSale con tu nombre como remitente. El agente no la envía.`);
      window.PANTALLAS['comercial/demanda'](lienzo);
    };
  }

  lienzo.querySelectorAll('[data-vista]').forEach(c => c.onclick = () => {
    _dem.vista = c.dataset.vista; window.PANTALLAS['comercial/demanda'](lienzo);
  });
  lienzo.querySelector('#volver-com').onclick = () => { location.hash = '#/comercial'; };

  if (_dem.vista === 'demanda') pintaDemanda(); else pintaPublicado();
};
