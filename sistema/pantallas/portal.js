/* ============================================================================
   EL SISTEMA — El portal de reporte de ventas          · Fase 17 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   El diferenciador de la propuesta, y la mitad del dato del grupo.

   Los frentes con Odoo se conectan y su venta entra sola. Los demás —el socio,
   el operador, las franquicias y los clientes mayores directos— mandan un
   archivo. Cada uno el suyo: sus columnas, su periodicidad, y llamando a los
   productos como quiere. El mismo producto con seis nombres distintos.

   Hoy eso se traduce a mano. Aquí el frente sube su archivo TAL COMO LO TIENE
   —no se le pide que cambie nada— y el sistema lo normaliza contra el catálogo
   canónico. Lo que supera el umbral de confianza se resuelve solo; lo que no,
   va a una cola con sus mejores candidatas y un responsable. Nunca se adivina
   en silencio.
   ============================================================================ */

window.PANTALLAS = window.PANTALLAS || {};

const _por = { frente: null, fase: 'espera', resueltas: {}, cola: {} };

/* Cuánta confianza hay en que un nombre del archivo sea una referencia nuestra.
   Es determinista y explicable: coincidencia exacta con el código, con la
   referencia del fabricante, con un alias conocido, o parecido del nombre. */
function confianzaDe(fila) {
  if (!fila.resuelto) return { pct: 0.42 + (fila.nombre.length % 7) / 50, via: 'parecido del nombre' };
  const p = CATALOGO.find(x => x.sku === fila.sku);
  if (!p) return { pct: 0.4, via: 'sin equivalencia' };
  const n = fila.nombre.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (n === p.sku.replace(/[^A-Za-z0-9]/g, '').toUpperCase()) return { pct: 1, via: 'código idéntico' };
  if (n === p.ref.replace(/[^A-Za-z0-9]/g, '').toUpperCase()) return { pct: 0.99, via: 'referencia del fabricante' };
  if (p.alias.some(a => a.toUpperCase().replace(/[^A-Z0-9]/g, '') === n)) return { pct: 0.97, via: 'alias ya conocido' };
  return { pct: 0.96, via: 'nombre del producto' };
}

window.PANTALLAS.frentes = function (lienzo) {
  const n = v => Math.round(v || 0).toLocaleString('es-VE');
  const porPortal = FRENTES.filter(f => f.via === 'portal');
  const conOdoo = FRENTES.filter(f => f.via === 'odoo');
  if (!_por.frente) _por.frente = porPortal[0].id;
  const f = FRENTES.find(x => x.id === _por.frente);
  const fmt = FORMATOS_PORTAL[f.id];
  const rep = REPORTES[f.id];
  const umbral = REGLAS.confianzaAlias.v;

  const filas = (rep ? rep.filas : []).map(x => ({ ...x, conf: confianzaDe(x) }));
  const auto = filas.filter(x => x.conf.pct >= umbral);
  const cola = filas.filter(x => x.conf.pct < umbral);
  const unidades = filas.reduce((a, x) => a + x.cant, 0);
  const cargado = _por.fase !== 'espera';

  lienzo.innerHTML = `
    <div class="lienzo-cab fila-sep">
      <div>
        <div class="sobretitulo">red de frentes</div>
        <div class="titulo-seccion" style="margin-top:4px">portal de reporte</div>
      </div>
      <span class="marca-estado e-neutro"><i class="punto"></i>${porPortal.length} de ${FRENTES.length} frentes reportan por archivo</span>
    </div>

    <div class="cinta" style="margin-bottom:20px">
      <span class="orbe ${cargado ? 'hecho' : 'actuando'}"></span><span class="hora">${HOY.hora}</span>
      <div class="crece">${conOdoo.length} frentes entran por su Odoo y su venta llega sola.
        Los otros <b>${porPortal.length}</b> mandan un archivo —<b>y ninguno manda el mismo</b>—:
        aquí se normalizan contra el catálogo canónico sin pedirles que cambien nada</div>
    </div>

    <div class="rejilla" style="grid-template-columns:280px minmax(0,1fr);gap:20px;align-items:start">

      <!-- quién reporta y cómo -->
      <div class="panel" style="padding:16px">
        <div class="sobretitulo">quién reporta por archivo</div>
        <div class="pila gap-4 mt-16" id="lista-frentes">
          ${porPortal.map(x => `<div class="menu-item ${x.id === _por.frente ? 'on' : ''}" data-f="${x.id}"
               style="text-transform:none">
            <div style="min-width:0;flex:1">
              <div style="font-size:12.5px">${x.nombre}</div>
              <div class="apunte tenue" style="font-size:10.5px">${TIPOS_FRENTE[x.tipo].rotulo} · ${x.cadencia}</div>
            </div>
            ${REPORTES[x.id] ? '<span class="punto" style="background:var(--n1)"></span>' : ''}
          </div>`).join('')}
        </div>
        <hr class="sep">
        <div class="sobretitulo">y los que no</div>
        <div class="pila gap-8 mt-8">
          ${conOdoo.map(x => `<div class="fila gap-8" style="font-size:12px">
            <span class="crece tenue">${x.nombre}</span>
            <span class="via via-odoo">odoo</span></div>`).join('')}
        </div>
      </div>

      <!-- el archivo de ese frente -->
      <div>
        <div class="panel" style="margin-bottom:16px">
          <div class="fila-sep">
            <div>
              <div class="fila gap-8"><b style="font-size:14.5px">${f.nombre}</b>
                <span class="via via-portal">portal</span>
                <span class="marca-estado e-neutro">${TIPOS_FRENTE[f.tipo].rotulo}</span></div>
              <div class="apunte tenue mt-8">${f.pais} · reporta ${f.cadencia} · último ${f.corte}</div>
            </div>
            <div class="fila gap-8">
              <span class="mono tenue">${fmt ? fmt.archivo : '—'}</span>
            </div>
          </div>

          <div class="apunte mt-16" style="max-width:760px">
            <b>Su archivo llega como lo tiene.</b> Sus columnas se llaman
            ${fmt ? `<span class="mono">${fmt.col_sku}</span>, <span class="mono">${fmt.col_cant}</span>
              y <span class="mono">${fmt.col_fecha}</span>` : '—'}, y no coinciden con las de ningún
            otro frente. <b>No se le pide que cambie nada</b>: el sistema aprendió su formato.
          </div>

          ${!cargado ? `
          <div class="fila gap-8 mt-16">
            <button class="btn btn-marca" id="cargar">⬆ cargar ${fmt ? fmt.archivo : 'el archivo'}</button>
            <span class="apunte tenue">${rep ? rep.filas.length : 0} filas · periodo ${rep ? rep.periodo : '—'}</span>
          </div>` : ''}
        </div>

        <div id="proceso"></div>
      </div>
    </div>

    <p class="apunte tenue mt-24" style="max-width:840px;line-height:1.55">
      Lo que el sistema no puede resolver <b>no lo adivina</b>: lo manda a una cola con sus tres
      mejores candidatas y un responsable. Un nombre mal resuelto no produce un error visible —
      produce un producto que desaparece del análisis y una compra mal dimensionada. Por eso el
      umbral de confianza es una regla con dueño (${(umbral * 100).toFixed(0)} %,
      ${REGLAS.confianzaAlias.dueno}) y no una decisión del agente.
    </p>`;

  const proc = lienzo.querySelector('#proceso');

  function pintaProceso() {
    if (_por.fase === 'espera') { proc.innerHTML = ''; return; }

    const crudo = `
      <div class="panel" style="margin-bottom:16px">
        <div class="fila-sep">
          <div class="sobretitulo">el archivo, tal como llegó</div>
          <span class="apunte tenue">${filas.length} filas · ${n(unidades)} unidades</span>
        </div>
        <div class="tabla-envoltura mt-16" style="max-height:230px;border-radius:14px">
          <table class="tabla">
            <thead><tr>
              <th class="mono">${fmt.col_sku}</th>
              <th class="num mono">${fmt.col_cant}</th>
              <th class="mono">${fmt.col_fecha}</th>
            </tr></thead>
            <tbody>${filas.map(x => `<tr>
              <td class="mono" style="font-size:11.5px">${x.nombre}</td>
              <td class="num">${x.cant}</td>
              <td class="apunte tenue">${rep.periodo}</td>
            </tr>`).join('')}</tbody>
          </table>
        </div>
      </div>`;

    if (_por.fase === 'crudo') { proc.innerHTML = crudo + `
      <div class="fila gap-8"><button class="btn btn-marca" id="normalizar">normalizar contra el catálogo →</button>
      <span class="apunte tenue">el sistema propone la equivalencia de cada nombre</span></div>`;
      const bn = proc.querySelector('#normalizar');
      if (bn) bn.onclick = () => { _por.fase = 'normalizado'; pintaProceso(); };
      return;
    }

    proc.innerHTML = `
      <div class="rejilla rejilla-4" style="margin-bottom:16px">
        <div class="tarjeta"><div class="kpi"><div class="rotulo">filas del archivo</div>
          <div class="valor">${filas.length}</div><div class="pie">${n(unidades)} unidades reportadas</div></div></div>
        <div class="tarjeta"><div class="kpi"><div class="rotulo">resueltas solas</div>
          <div class="valor texto-marca">${auto.length}</div>
          <div class="pie">por encima del ${(umbral * 100).toFixed(0)} % de confianza</div></div></div>
        <div class="tarjeta"><div class="kpi"><div class="rotulo">a la cola</div>
          <div class="valor" style="color:${cola.length ? 'var(--n3)' : 'inherit'}">${cola.length}</div>
          <div class="pie">con sus tres mejores candidatas</div></div></div>
        <div class="tarjeta"><div class="kpi"><div class="rotulo">entran en la demanda</div>
          <div class="valor">${n(auto.reduce((a, x) => a + x.cant, 0))}</div>
          <div class="pie">unidades que alimentan el forecast</div></div></div>
      </div>

      <div class="panel" style="margin-bottom:16px">
        <div class="fila-sep">
          <div class="sobretitulo">de su nombre al nuestro</div>
          <span class="sello sello-2"><i></i>hice</span>
        </div>
        <div class="tabla-envoltura mt-16" style="max-height:340px;border-radius:14px">
          <table class="tabla">
            <thead><tr>
              <th>lo que dice su archivo</th><th></th><th>nuestra referencia</th>
              <th class="num">cant.</th><th>por qué</th><th class="num">confianza</th>
            </tr></thead>
            <tbody>
              ${filas.map(x => {
                const p = x.sku ? CATALOGO.find(y => y.sku === x.sku) : null;
                const ok = x.conf.pct >= umbral;
                return `<tr class="${ok ? '' : 'marcada'}">
                  <td class="mono" style="font-size:11.5px">${x.nombre}</td>
                  <td style="color:${ok ? 'var(--menta)' : 'var(--n3)'};text-align:center">→</td>
                  <td>${ok && p ? `<div class="producto">
                        <img class="foto" src="img/${p.img}" alt="" loading="lazy" style="width:26px;height:26px;border-radius:8px">
                        <div class="txt"><div class="nom" style="font-size:12px">${p.nombre}</div>
                          <div class="sub">${p.sku}</div></div></div>`
                      : '<span style="color:var(--n3)">a la cola</span>'}</td>
                  <td class="num">${x.cant}</td>
                  <td class="apunte tenue">${x.conf.via}</td>
                  <td class="num" style="color:${ok ? 'var(--ok)' : 'var(--n3)'}">${(x.conf.pct * 100).toFixed(0)} %</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      ${cola.length ? `
      <div class="bloqueo">
        <div class="fila-sep">
          <div class="fila gap-8"><span class="orbe orbe-mini"></span>
            <b style="font-size:13px">${cola.length} nombre${cola.length > 1 ? 's' : ''} que no puedo resolver solo</b></div>
          <span class="sello sello-3"><i></i>tu firma</span>
        </div>
        <div class="apunte mt-8" style="max-width:800px">
          Por debajo del ${(umbral * 100).toFixed(0)} % de confianza <b>no se adivina</b>. Cada uno va
          con sus tres mejores candidatas para que una persona elija — un nombre mal resuelto no
          da un error visible, da un producto que desaparece del análisis.
        </div>
        <div class="pila gap-12 mt-16">
          ${cola.map((x, i) => `<div class="fila gap-12" style="align-items:center;flex-wrap:wrap">
            <span class="mono" style="min-width:150px;font-size:11.5px">${x.nombre}</span>
            <span class="apunte tenue">${x.cant} u ·</span>
            ${(x.candidatas || []).map(sk => {
              const p = CATALOGO.find(y => y.sku === sk);
              return p ? `<button class="btn btn-suave btn-mini" data-res="${i}" data-sku="${sk}">${p.nombre}</button>` : '';
            }).join('')}
            <button class="btn btn-fantasma btn-mini">ninguna</button>
          </div>`).join('')}
        </div>
      </div>` : ''}

      <div class="fila gap-8 mt-16">
        <button class="btn btn-humano" id="aplicar-rep">incorporar a la demanda</button>
        <span class="apunte tenue">las ${n(auto.reduce((a, x) => a + x.cant, 0))} unidades resueltas entran
          en la serie que alimenta el forecast de compra</span>
      </div>`;

    const ba = proc.querySelector('#aplicar-rep');
    if (ba) ba.onclick = () => {
      anota({
        accion: 'N-03 · normalizar el reporte de un frente',
        agente: 'resolutor de alias', modulo: 'frentes',
        dispara: `${f.nombre} subió ${fmt.archivo} con ${filas.length} filas`,
        salida: `${auto.length} de ${filas.length} filas resueltas contra el catálogo canónico · ` +
                `${n(auto.reduce((a, x) => a + x.cant, 0))} u entran en la demanda · ` +
                `${cola.length} a la cola con sus candidatas`,
        ejes: { perimetro: 'interno', reversibilidad: 'clic', radio: 'sistema', dinero: 'ninguno', reloj: 'programada' },
        cruza: 'compras',
        reglas: ['confianzaAlias'],
      });
      viajaEstela(['frentes', 'cimiento', 'compras']);
      setTimeout(() => alert(`Reporte de ${f.nombre} incorporado.\n\n${auto.length} filas normalizadas · ${n(auto.reduce((a, x) => a + x.cant, 0))} unidades\n${cola.length} en cola para revisión humana\n\nEsas unidades ya cuentan en la demanda real del grupo.`), 1200);
    };
  }

  lienzo.querySelectorAll('#lista-frentes [data-f]').forEach(el => el.onclick = () => {
    _por.frente = el.dataset.f; _por.fase = 'espera';
    window.PANTALLAS.frentes(lienzo);
  });
  const bc = lienzo.querySelector('#cargar');
  if (bc) bc.onclick = () => { _por.fase = 'crudo'; pintaProceso(); };

  pintaProceso();
};
