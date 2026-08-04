// ============================================================
// Proyecto Rower — Control de acceso de las Edge Functions
// ------------------------------------------------------------
// Todas las funciones exigen credencial desde el 04-ago-2026 (activación de
// Supabase Auth). Se aceptan exactamente dos clases de llamante:
//
//   · servicio — la credencial interna del proyecto (secreto ROWER_CLAVE_INTERNA,
//     y también se acepta la clave de servicio). La usan los triggers de Postgres
//     —schema §8 dispara "indexar" vía pg_net, leyendo la credencial de Supabase
//     Vault— y los guiones de mantenimiento. Nunca viaja al navegador.
//   · usuario  — un JWT de sesión emitido por Supabase Auth, validado contra
//     /auth/v1/user. Es lo que envía el panel admin con la sesión del consultor.
//
// La clave publishable/anon NO alcanza: es pública y está en el repositorio.
// Este chequeo es independiente del verify_jwt de la pasarela (defensa en dos
// capas: si alguien redespliega con --no-verify-jwt, la función sigue cerrada).
//
// Reponer la credencial interna (los dos lados tienen que coincidir):
//   supabase secrets set ROWER_CLAVE_INTERNA=<nueva> --project-ref <ref>
//   select vault.update_secret(
//     (select id from vault.secrets where name='clave_servicio'), '<nueva>');
// ============================================================

const SB_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICIO = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const INTERNA = Deno.env.get("ROWER_CLAVE_INTERNA") ?? "";

export type Quien =
  | { clase: "servicio" }
  | { clase: "usuario"; id: string; correo: string };

function bearer(req: Request): string {
  const h = req.headers.get("authorization") || "";
  return h.replace(/^Bearer\s+/i, "").trim();
}

/** Identifica al llamante. Devuelve null si no trae credencial válida. */
export async function identificar(req: Request): Promise<Quien | null> {
  const token = bearer(req);
  if (!token) return null;
  if (INTERNA && token === INTERNA) return { clase: "servicio" };
  if (SERVICIO && token === SERVICIO) return { clase: "servicio" };

  try {
    const r = await fetch(`${SB_URL}/auth/v1/user`, {
      headers: { apikey: SERVICIO, Authorization: `Bearer ${token}` },
    });
    if (!r.ok) return null;
    const u = await r.json();
    if (!u || !u.id) return null;
    return { clase: "usuario", id: u.id as string, correo: (u.email as string) ?? "" };
  } catch {
    return null;
  }
}

/** Respuesta 401 con los encabezados CORS de la función que la emite. */
export function noAutorizado(cors: Record<string, string>): Response {
  return new Response(
    JSON.stringify({
      error: "No autorizado. Inicia sesión en el aplicativo del Proyecto Rower y vuelve a intentarlo.",
    }),
    { status: 401, headers: { ...cors, "Content-Type": "application/json; charset=utf-8" } },
  );
}
