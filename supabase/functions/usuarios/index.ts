// ============================================================
// Proyecto Rower — Edge Function: usuarios
// Administración de cuentas del aplicativo para el módulo «Usuarios» del panel.
//
// Crear una cuenta o reponer una clave exige la clave de SERVICIO de Supabase,
// que no puede vivir en el navegador. Por eso el panel no habla con Auth
// directamente: pide aquí, y aquí se comprueba que quien pide tenga el permiso
// `admin.usuarios`.
//
// Entrada:  POST { accion, ... }
//   listar                                  → { usuarios: [...], roles: [...] }
//   crear      { correo, clave, nombre, rol }→ { usuario }
//   actualizar { id, nombre?, rol?, activo? }→ { usuario }
//   clave      { id, clave }                 → { ok: true }
//   eliminar   { id }                        → { ok: true }
//
// Deploy:  supabase functions deploy usuarios --project-ref <ref>
// ============================================================

import { identificar, noAutorizado } from "../_shared/acceso.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SB_URL = Deno.env.get("SUPABASE_URL")!;
const SB_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const CLAVE_MINIMA = 10;

type Perfil = {
  id: string;
  correo: string | null;
  nombre: string | null;
  rol: string;
  activo: boolean;
  creado_en: string;
  actualizado_en: string;
};

function json(obj: unknown, status = 200): Response {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...CORS, "Content-Type": "application/json; charset=utf-8" },
  });
}

/** REST/Auth de Supabase con la clave de servicio (salta RLS por diseño). */
async function sb(ruta: string, init: RequestInit = {}): Promise<Response> {
  return await fetch(`${SB_URL}${ruta}`, {
    ...init,
    headers: {
      apikey: SB_KEY,
      Authorization: `Bearer ${SB_KEY}`,
      "Content-Type": "application/json",
      ...(init.headers as Record<string, string> | undefined),
    },
  });
}

async function sbJson(ruta: string, init: RequestInit = {}): Promise<unknown> {
  const r = await sb(ruta, init);
  const txt = await r.text();
  if (!r.ok) throw new Error(`Supabase ${r.status}: ${txt.slice(0, 300)}`);
  return txt.trim() ? JSON.parse(txt) : null;
}

/* ============================================================
   Comprobaciones
   ============================================================ */

/** ¿El llamante tiene el permiso? El servicio (triggers, guiones) siempre. */
async function puedeAdministrar(quien: { clase: string; id?: string }): Promise<boolean> {
  if (quien.clase === "servicio") return true;
  const pf = await sbJson(`/rest/v1/perfiles?id=eq.${quien.id}&select=rol,activo`) as
    Array<{ rol: string; activo: boolean }>;
  if (!pf.length || !pf[0].activo) return false;
  return await rolGobierna(pf[0].rol);
}

function correoValido(c: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c);
}

function problemaDeClave(c: string): string | null {
  if (typeof c !== "string" || c.length < CLAVE_MINIMA) {
    return `La clave necesita al menos ${CLAVE_MINIMA} caracteres.`;
  }
  if (!/[A-Za-z]/.test(c) || !/[0-9]/.test(c)) {
    return "La clave necesita al menos una letra y un número.";
  }
  return null;
}

async function rolExiste(rol: string): Promise<boolean> {
  const r = await sbJson(`/rest/v1/roles?clave=eq.${encodeURIComponent(rol)}&select=clave`) as unknown[];
  return r.length > 0;
}

/** Cuántas cuentas activas conservan un rol con admin.usuarios. */
async function administradoresActivos(excluyendo?: string): Promise<number> {
  const roles = await sbJson(
    `/rest/v1/roles_permisos?permiso=eq.admin.usuarios&select=rol`,
  ) as Array<{ rol: string }>;
  if (!roles.length) return 0;
  const lista = roles.map((r) => `"${r.rol}"`).join(",");
  const pf = await sbJson(
    `/rest/v1/perfiles?activo=eq.true&rol=in.(${encodeURIComponent(lista)})&select=id`,
  ) as Array<{ id: string }>;
  return pf.filter((p) => p.id !== excluyendo).length;
}

/** Un rol que conserve el gobierno del acceso. */
async function rolGobierna(rol: string): Promise<boolean> {
  const r = await sbJson(
    `/rest/v1/roles_permisos?rol=eq.${encodeURIComponent(rol)}&permiso=eq.admin.usuarios&select=permiso`,
  ) as unknown[];
  return r.length > 0;
}

/* ============================================================
   Acciones
   ============================================================ */

async function listar(): Promise<Response> {
  const perfiles = await sbJson(
    "/rest/v1/perfiles?select=id,correo,nombre,rol,activo,notas,creado_en,actualizado_en&order=creado_en",
  ) as Perfil[];

  // último acceso y confirmación viven en auth.users, no en el perfil
  const cuentas = await sbJson("/auth/v1/admin/users?per_page=200") as
    { users?: Array<{ id: string; email: string; last_sign_in_at: string | null; email_confirmed_at: string | null }> };
  const porId = new Map((cuentas.users || []).map((u) => [u.id, u]));

  const roles = await sbJson(
    "/rest/v1/roles?select=clave,nombre,descripcion,es_sistema,orden&order=orden",
  ) as Array<{ clave: string; nombre: string }>;

  return json({
    usuarios: perfiles.map((p) => {
      const u = porId.get(p.id);
      return {
        ...p,
        correo: p.correo || u?.email || null,
        ultimo_acceso: u?.last_sign_in_at ?? null,
        confirmado: !!u?.email_confirmed_at,
        huerfano: !u,
      };
    }),
    roles,
  });
}

async function crear(b: Record<string, unknown>): Promise<Response> {
  const correo = String(b.correo ?? "").trim().toLowerCase();
  const clave = String(b.clave ?? "");
  const nombre = String(b.nombre ?? "").trim();
  const rol = String(b.rol ?? "pendiente").trim();

  if (!correoValido(correo)) return json({ error: "El correo no tiene un formato válido." }, 400);
  const malaClave = problemaDeClave(clave);
  if (malaClave) return json({ error: malaClave }, 400);
  if (!(await rolExiste(rol))) return json({ error: `El rol «${rol}» no existe.` }, 400);

  const r = await sb("/auth/v1/admin/users", {
    method: "POST",
    body: JSON.stringify({
      email: correo,
      password: clave,
      email_confirm: true, // el proyecto no tiene SMTP: sin esto la cuenta no entra
      user_metadata: { nombre, rol },
    }),
  });
  const cuenta = await r.json();
  if (!r.ok) {
    const msg = String(cuenta?.msg || cuenta?.error_description || cuenta?.message || "");
    if (/already|exists|registered/i.test(msg)) {
      return json({ error: "Ya existe una cuenta con ese correo." }, 409);
    }
    return json({ error: msg || `Auth ${r.status}` }, 400);
  }

  // El trigger auth_users_perfil ya creó el perfil; se afina con lo pedido.
  const pf = await sbJson(`/rest/v1/perfiles?id=eq.${cuenta.id}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ correo, nombre: nombre || null, rol, activo: true }),
  }) as Perfil[];

  return json({ usuario: pf[0] ?? { id: cuenta.id, correo, nombre, rol, activo: true } });
}

async function actualizar(b: Record<string, unknown>, quien: { id?: string }): Promise<Response> {
  const id = String(b.id ?? "");
  if (!id) return json({ error: "Falta el identificador de la cuenta." }, 400);

  const actual = (await sbJson(`/rest/v1/perfiles?id=eq.${id}&select=*`) as Perfil[])[0];
  if (!actual) return json({ error: "Esa cuenta no existe." }, 404);

  const cambio: Record<string, unknown> = {};
  if (b.nombre !== undefined) cambio.nombre = String(b.nombre).trim() || null;
  if (b.notas !== undefined) cambio.notas = String(b.notas).trim() || null;
  if (b.rol !== undefined) {
    const rol = String(b.rol);
    if (!(await rolExiste(rol))) return json({ error: `El rol «${rol}» no existe.` }, 400);
    cambio.rol = rol;
  }
  if (b.activo !== undefined) cambio.activo = !!b.activo;

  // Nadie se deja fuera: si este cambio quita el último gobierno del acceso, no va.
  const perderiaGobierno =
    (cambio.rol !== undefined && !(await rolGobierna(String(cambio.rol)))) ||
    cambio.activo === false;
  if (perderiaGobierno && await rolGobierna(actual.rol) && actual.activo) {
    if (await administradoresActivos(id) === 0) {
      return json({
        error: "Es la última cuenta que puede administrar accesos. Dale ese rol a otra persona antes de cambiar esta.",
      }, 409);
    }
  }
  if (id === quien.id && cambio.activo === false) {
    return json({ error: "No puedes desactivar tu propia cuenta." }, 409);
  }

  if (!Object.keys(cambio).length) return json({ usuario: actual });

  const pf = await sbJson(`/rest/v1/perfiles?id=eq.${id}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(cambio),
  }) as Perfil[];

  // se refleja en user_metadata para que quede legible en el Dashboard de Auth
  await sb(`/auth/v1/admin/users/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      user_metadata: {
        nombre: (cambio.nombre ?? actual.nombre) || "",
        rol: (cambio.rol ?? actual.rol) || "pendiente",
      },
    }),
  });

  return json({ usuario: pf[0] });
}

async function reponerClave(b: Record<string, unknown>): Promise<Response> {
  const id = String(b.id ?? "");
  const clave = String(b.clave ?? "");
  if (!id) return json({ error: "Falta el identificador de la cuenta." }, 400);
  const mala = problemaDeClave(clave);
  if (mala) return json({ error: mala }, 400);

  const r = await sb(`/auth/v1/admin/users/${id}`, {
    method: "PUT",
    body: JSON.stringify({ password: clave }),
  });
  if (!r.ok) return json({ error: `Auth ${r.status}: ${(await r.text()).slice(0, 200)}` }, 400);
  return json({ ok: true });
}

async function eliminar(b: Record<string, unknown>, quien: { id?: string }): Promise<Response> {
  const id = String(b.id ?? "");
  if (!id) return json({ error: "Falta el identificador de la cuenta." }, 400);
  if (id === quien.id) return json({ error: "No puedes eliminar tu propia cuenta." }, 409);

  const actual = (await sbJson(`/rest/v1/perfiles?id=eq.${id}&select=*`) as Perfil[])[0];
  if (actual && actual.activo && await rolGobierna(actual.rol) && await administradoresActivos(id) === 0) {
    return json({
      error: "Es la última cuenta que puede administrar accesos: no se puede eliminar.",
    }, 409);
  }

  const r = await sb(`/auth/v1/admin/users/${id}`, { method: "DELETE" });
  if (!r.ok && r.status !== 404) {
    return json({ error: `Auth ${r.status}: ${(await r.text()).slice(0, 200)}` }, 400);
  }
  // perfiles tiene on delete cascade desde auth.users; por si acaso queda huérfano:
  await sb(`/rest/v1/perfiles?id=eq.${id}`, { method: "DELETE" });
  return json({ ok: true });
}

/* ============================================================
   Servidor
   ============================================================ */
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);

  const quien = await identificar(req);
  if (!quien) return noAutorizado(CORS);

  let permitido = false;
  try {
    permitido = await puedeAdministrar(quien);
  } catch (e) {
    console.error(e);
    return json({ error: "No pude comprobar tus permisos: " + String(e) }, 500);
  }
  if (!permitido) {
    return json({
      error: "Tu cuenta no tiene el permiso «Administrar usuarios».",
    }, 403);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Cuerpo inválido: se espera JSON { accion, … }" }, 400);
  }

  const yo = quien.clase === "usuario" ? { id: quien.id } : {};
  try {
    switch (String(body.accion ?? "")) {
      case "listar":     return await listar();
      case "crear":      return await crear(body);
      case "actualizar": return await actualizar(body, yo);
      case "clave":      return await reponerClave(body);
      case "eliminar":   return await eliminar(body, yo);
      default:
        return json({ error: "Acción desconocida. Se esperan: listar, crear, actualizar, clave, eliminar." }, 400);
    }
  } catch (e) {
    console.error(e);
    return json({ error: String(e) }, 500);
  }
});
