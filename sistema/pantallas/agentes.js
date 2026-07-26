/* ============================================================================
   EL SISTEMA — Sala de agentes                          · Fase 20 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   La pantalla que decide si la Junta confía o no en todo lo demás. Por eso
   está ordenada al revés de como se suele enseñar un sistema:

     1. EL FRENO, primero. Se enseña cómo se apaga antes de enseñar cómo
        funciona. Y el freno detiene de verdad: un agente detenido deja de
        llegar a las bandejas de firma de todo el sistema.
     2. Quiénes son, con su cargo y su techo — y qué eje se lo fija.
     3. El árbitro y el libro de reservas: qué pasa cuando dos quieren lo
        mismo. La respuesta no es «el sistema decide», es «el sistema lo
        detecta antes y lo sube a una persona».
     4. La bitácora, con el botón de deshacer donde de verdad se puede.
     5. El perímetro externo: la cuenta que la Junta pregunta primero.

   Aquí no se maquilla nada. Lo que no se puede deshacer se dice que no se
   puede deshacer, y se explica por qué el sistema nunca lo hizo solo.
   ============================================================================ */

window.PANTALLAS = window.PANTALLAS || {};

/* Quién está mirando, para que el freno tenga un nombre en la bitácora. */
const _quienFrena = () => (ROLES[ESTADO.rol] || {}).nombre || 'una persona';

/* Motivo por defecto: honesto y corto. Un freno sin motivo no es auditable. */
const _MOTIVO = 'detenido a mano desde la sala de agentes';

window.PANTALLAS.agentes = function (lienzo) {
  const n = v => Math.round(v || 0).toLocaleString('es-VE');
  const r = resumenAgentes();
  const registro = turno();

  /* Los agentes salen de las acciones declaradas, no de una lista aparte:
     si mañana se añade una acción, aparece sola en el organigrama. */
  const agentes = [];
  for (const [id, a] of Object.entries(ACCIONES)) {
    const niv = calculaNivel(a.ejes);
    const entrada = registro.find(e => e.accion.startsWith(id));
    agentes.push({
      id, modulo: a.modulo, nombre: a.agente, hace: a.nombre, dispara: a.dispara,
      cruza: a.cruza || null, nivel: niv.nivel, verbo: niv.verbo, fija: niv.fijado,
      ejes: a.ejes, salida: entrada ? entrada.salida : '', bitacora: entrada ? entrada.id : null,
      parado: detenido(a.agente),
    });
  }
  const porModulo = {};
  agentes.forEach(a => (porModulo[a.modulo] = porModulo[a.modulo] || []).push(a));

  const arbitro = datosDe('A-01') || { choques: [] };
  const externas = BITACORA.filter(e => e.perimetro === 'externo');
  const paradosAhora = agentes.filter(a => a.parado).length;

  /* Reservas agrupadas por dueño: el libro se lee por quién retiene, que es
     la pregunta de quien reclama unidades que creía suyas. */
  const porDueno = {};
  RESERVAS.forEach(x => {
    porDueno[x.dueno] = porDueno[x.dueno] || { lineas: 0, unidades: 0 };
    porDueno[x.dueno].lineas++; porDueno[x.dueno].unidades += x.unidades;
  });

  lienzo.innerHTML = `
    <div class="lienzo-cab fila-sep">
      <div>
        <div class="sobretitulo">sistema · ${HOY.mes} ${HOY.anio} · ${HOY.hora}</div>
        <div class="titulo-seccion" style="margin-top:4px">sala de agentes</div>
      </div>
      <span class="marca-estado ${FRENO.general ? 'e-riesgo' : 'e-ok'}">
        <i class="punto"></i>${FRENO.general ? 'sistema detenido' : 'en marcha'}
      </span>
    </div>

    <!-- 1 · EL FRENO — lo primero, a propósito -->
    <div class="panel freno ${FRENO.general ? 'accionado' : ''}" style="margin-bottom:22px">
      <div class="fila-sep">
        <div>
          <div class="sobretitulo">el freno</div>
          <div class="apunte mt-8" style="max-width:640px">
            Se enseña cómo se apaga <b>antes</b> de enseñar cómo funciona. Este botón detiene a
            todos los agentes de una vez: dejan de llegar a las bandejas de firma de cualquier
            pantalla, y lo que tenían esperando queda bloqueado.
          </div>
        </div>
        <button class="btn ${FRENO.general ? 'btn-marca' : 'btn-humano'} btn-freno" id="freno-general">
          ${FRENO.general ? '▶  reanudar el sistema' : '■  detener todos los agentes'}
        </button>
      </div>

      <div class="rejilla rejilla-3 mt-16" style="gap:12px">
        <div class="nota-freno">
          <div class="rotulo">no borra lo calculado</div>
          <div class="apunte tenue">Lo que ya se calculó está en la bitácora y ahí se queda. El freno
            impide que vuelva a correr; no reescribe el pasado.</div>
        </div>
        <div class="nota-freno">
          <div class="rotulo">no deshace lo aplicado</div>
          <div class="apunte tenue">Para eso está la compensación, una por una y con motivo. Un
            movimiento aplicado se revierte con otro movimiento, nunca borrándolo.</div>
        </div>
        <div class="nota-freno">
          <div class="rotulo">no suelta las reservas</div>
          <div class="apunte tenue">Están sobre unidades concretas y protegen a quien ya contaba
            con ellas. Soltarlas de golpe rompería pedidos ya comprometidos.</div>
        </div>
      </div>

      <div id="estado-freno" class="mt-16">${estadoFreno()}</div>
    </div>

    <!-- 2 · QUIÉNES SON -->
    <div class="panel" style="margin-bottom:22px">
      <div class="fila-sep">
        <div class="sobretitulo">los agentes · ${agentes.length} en total</div>
        <span class="apunte tenue">cada uno con su techo, y con el eje que se lo fija</span>
      </div>
      <div class="apunte mt-8" style="max-width:820px">
        Ninguno tiene un permiso escrito a mano: el techo <b>se calcula</b> con los cinco ejes y
        manda el más restrictivo. Por eso un agente no puede ganar permiso portándose bien —para
        subirle el techo hay que cambiarle la naturaleza de lo que hace.
      </div>
      <div class="pila gap-8 mt-16">
        ${Object.entries(porModulo).map(([mod, lista]) => `
          <div class="grupo-agentes">
            <div class="rotulo-modulo">${esc((MODULOS[mod] || {}).nombre || mod)}</div>
            ${lista.map(a => `
              <div class="agente ${a.parado ? 'parado' : ''}" data-agente="${esc(a.nombre)}">
                <div class="ag-cab">
                  <span class="orbe orbe-mini ${a.parado ? '' : 'hecho'}"></span>
                  <div class="crece">
                    <div class="ag-nombre">${esc(a.nombre)}
                      <span class="ag-id">${a.id}</span>
                      ${a.cruza ? `<span class="ag-cruza">cruza a ${esc(a.cruza)}</span>` : ''}
                    </div>
                    <div class="ag-hace">${esc(a.hace)}</div>
                  </div>
                  <span class="sello ${NIVELES[a.nivel].clase}">${a.verbo}</span>
                  <button class="btn btn-fantasma btn-mini bt-parar" data-a="${esc(a.nombre)}">
                    ${a.parado ? 'reanudar' : 'detener'}
                  </button>
                </div>
                <div class="ag-pie">
                  <span class="apunte tenue">lo dispara: ${esc(a.dispara)}</span>
                  <span class="ag-fija">techo ${a.nivel} · lo fija <b>${esc(a.fija)}</b></span>
                </div>
                ${a.parado ? '<div class="ag-aviso">detenido · no llega a ninguna bandeja de firma</div>' : ''}
              </div>`).join('')}
          </div>`).join('')}
      </div>
    </div>

    <div class="rejilla" style="grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:20px;align-items:start;margin-bottom:22px">

      <!-- 3 · EL ÁRBITRO -->
      <div class="panel">
        <div class="fila-sep">
          <div class="sobretitulo">el árbitro · cuando dos quieren lo mismo</div>
          <span class="sello sello-1">preparé</span>
        </div>
        <div class="apunte mt-8">
          El único agente con jurisdicción sobre los demás es también <b>el único que no puede
          ejecutar nada</b>: publica un dictamen y sube la decisión un nivel. Un árbitro que
          además ejecutara sería juez y parte.
        </div>
        ${(arbitro.choques || []).length ? `
          <div class="tabla-envoltura mt-16"><table class="tabla">
            <thead><tr><th>referencia · ubicación</th><th class="num">pretensiones</th><th>qué hace el árbitro</th></tr></thead>
            <tbody>
              ${arbitro.choques.map(c => `
                <tr>
                  <td><b>${esc(c.clave)}</b></td>
                  <td class="num">${c.pretensiones}</td>
                  <td class="apunte">publica el dictamen y sube la decisión a firma</td>
                </tr>`).join('')}
            </tbody>
          </table></div>` : `
          <div class="vacio mt-16">
            <b>Ninguna colisión en el turno de anoche.</b> No es que no las haya: el libro de
            reservas convirtió la carrera en una cola <b>antes</b> de que llegara a la pantalla de
            nadie. Cuando el árbitro funciona, no se ve — se ve el libro de abajo.
          </div>`}
        <div class="mt-16">
          <div class="rotulo">el libro de reservas · ${RESERVAS.length} vivas</div>
          <div class="apunte tenue mt-8">
            Ninguna acción propone sobre existencia libre: antes de calcular nada toma una reserva
            sobre unidades concretas. <b>La IA no tiene puerta privilegiada</b> — pide al mismo
            libro que usa cualquier persona.
          </div>
          <div class="pila gap-8 mt-8">
            ${Object.entries(porDueno).sort((a, b) => b[1].unidades - a[1].unidades).map(([d, v]) => `
              <div class="fila-sep barra-duena">
                <span>${esc(d)}</span>
                <span class="apunte tenue">${v.lineas} líneas · <b>${n(v.unidades)} u</b></span>
              </div>`).join('')}
          </div>
        </div>
      </div>

      <!-- 5 · EL PERÍMETRO EXTERNO -->
      <div class="panel">
        <div class="fila-sep">
          <div class="sobretitulo">el perímetro externo</div>
          <span class="apunte tenue">la cuenta que se pregunta primero</span>
        </div>
        <div class="bloqueo mt-16" style="border-color:rgba(54,246,187,.4);background:rgba(54,246,187,.05)">
          <div class="fila-sep">
            <div>
              <div class="rotulo">enviadas sin firma humana</div>
              <div class="apunte mt-8">${externas.length} acciones tocaron el perímetro externo</div>
            </div>
            <div class="cifra-grande texto-marca">${r.enviadasSinFirmaHumana}</div>
          </div>
        </div>
        <div class="apunte mt-16">
          No es una calibración que salió bien: es <b>una imposibilidad de construcción</b>. El eje
          de perímetro topa en nivel 1 y ese tope no admite excepción ni promoción. Escribir a un
          proveedor, a una naviera o a un cliente siempre queda redactado y nunca enviado.
        </div>
        <div class="pila gap-8 mt-16">
          ${externas.map(e => `
            <div class="ext">
              <span class="sello sello-1">preparé</span>
              <div class="crece">
                <div class="ext-t">${esc(e.accion)}</div>
                <div class="apunte tenue">${esc(e.salida)}</div>
              </div>
            </div>`).join('')}
        </div>
        <div class="apunte tenue mt-16" style="font-size:11.5px">
          Un correo enviado no se desenvía. Por eso lo irreversible no sube de nivel aunque sea
          rutinario, y lo reversible puede subir aunque parezca grande.
        </div>
      </div>
    </div>

    <!-- 4 · LA BITÁCORA -->
    <div class="panel">
      <div class="fila-sep">
        <div class="sobretitulo">la bitácora · <span id="cuenta-bitacora">${BITACORA.length}</span> entradas</div>
        <span class="apunte tenue">se añade, no se corrige</span>
      </div>
      <div class="apunte mt-8" style="max-width:820px">
        Cada entrada dice qué la disparó, qué regla usó y qué produjo. Deshacer <b>no borra</b>:
        emite el movimiento inverso y enlaza los dos como un par, para que quede la huella de que
        algo se hizo y luego se revirtió.
      </div>
      <div class="pila gap-8 mt-16" id="hilo">${hilo()}</div>
    </div>`;

  /* ---------------------------------------------------------------- piezas */

  function estadoFreno() {
    if (FRENO.general) {
      return `<div class="aviso-freno">
        <b>Sistema detenido</b> desde las ${HOY.hora} por ${esc(_quienFrena())} · ${esc(FRENO.motivo || _MOTIVO)}.
        ${r.bloqueadas} ${r.bloqueadas === 1 ? 'acción queda bloqueada' : 'acciones quedan bloqueadas'}
        y ningún módulo muestra pendientes de firma. Queda en la bitácora, como todo lo demás.
      </div>`;
    }
    if (paradosAhora) {
      return `<div class="aviso-freno parcial">
        <b>${paradosAhora} ${paradosAhora === 1 ? 'agente detenido' : 'agentes detenidos'}</b> ·
        ${r.bloqueadas} ${r.bloqueadas === 1 ? 'acción bloqueada' : 'acciones bloqueadas'}.
        El resto del sistema sigue corriendo.
      </div>`;
    }
    return `<div class="apunte tenue">
      Todos los agentes en marcha. ${r.esperanFirma} ${r.esperanFirma === 1 ? 'acción espera' : 'acciones esperan'}
      una firma humana; ninguna se aplica sola.
    </div>`;
  }

  function hilo() {
    return BITACORA.map(e => {
      const par = e.compensaA ? BITACORA.find(x => x.id === e.compensaA) : null;
      const puede = e.estado !== 'compensada' && !e.compensaA && e.reversible !== 'imposible';
      return `<div class="entrada ${e.estado === 'compensada' ? 'anulada' : ''} ${e.compensaA ? 'es-compensacion' : ''}">
        <div class="en-cab">
          <span class="en-id">${e.id}</span>
          <span class="sello ${NIVELES[e.nivel].clase}">${e.verbo}</span>
          <div class="crece en-t">${esc(e.accion)}</div>
          <span class="apunte tenue">${esc(e.firmante || 'sin firmar')}</span>
          ${puede ? `<button class="btn btn-fantasma btn-mini bt-revertir" data-id="${e.id}">deshacer</button>`
                  : `<span class="en-no" title="${esc(razonNo(e))}">${esc(etiquetaNo(e))}</span>`}
        </div>
        <div class="en-salida">${esc(e.salida)}</div>
        <div class="en-pie">
          <span>lo disparó: ${esc(e.dispara)}</span>
          ${e.reglas && e.reglas.length ? `<span class="en-reglas">reglas: ${e.reglas.map(esc).join(' · ')}</span>` : ''}
          <span>reversión: ${esc(e.ventanaReversion)}</span>
          ${par ? `<span class="en-par">compensa a ${par.id}</span>` : ''}
        </div>
      </div>`;
    }).reverse().join('');
  }

  function etiquetaNo(e) {
    if (e.compensaA) return 'es la compensación';
    if (e.estado === 'compensada') return 'ya compensada';
    return 'no se puede deshacer';
  }
  function razonNo(e) {
    if (e.compensaA) return 'Deshacer una compensación sería volver a hacer lo deshecho: se hace de nuevo, no se borra.';
    if (e.estado === 'compensada') return 'Ya tiene su movimiento inverso enlazado.';
    return 'Reversibilidad imposible: por eso su techo es nivel 1 y nunca se ejecutó sola.';
  }

  /* --------------------------------------------------------------- sucesos */

  const repinta = () => window.PANTALLAS.agentes(lienzo);

  lienzo.querySelector('#freno-general').onclick = () => {
    frena(null, !FRENO.general, _quienFrena(), _MOTIVO);
    repinta(); pintaMenu(); pintaHud(); pintaFreno();
    /* El freno se ve cruzar el menú entero: es un efecto de todo el sistema,
       no de esta pantalla. */
    viajaEstela(['agentes', 'cimiento', 'compras', 'distribucion', 'logistica', 'comercial']);
  };

  lienzo.querySelectorAll('.bt-parar').forEach(b => b.onclick = ev => {
    ev.stopPropagation();
    const a = b.dataset.a;
    frena(a, !detenido(a), _quienFrena(), _MOTIVO);
    repinta(); pintaMenu(); pintaHud(); pintaFreno();
  });

  lienzo.querySelectorAll('.bt-revertir').forEach(b => b.onclick = () => {
    const orig = BITACORA.find(x => x.id === b.dataset.id);
    const c = compensa(b.dataset.id, 'revertido a mano desde la bitácora', _quienFrena());
    if (!c) return;
    repinta(); pintaMenu(); pintaHud(); pintaFreno();
    /* La compensación viaja al módulo donde la acción original escribió. */
    if (orig && MODULOS[orig.modulo]) viajaEstela(['agentes', orig.modulo]);
  });
};
