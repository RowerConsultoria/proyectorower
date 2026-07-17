# Base de datos — Supabase

Base de datos persistente del Proyecto Rower. Da soporte a los módulos interactivos (estado vivo del informe, comentarios de consultores, matriz de riesgos).

> ⚠️ **Nunca** guardar en este repositorio tokens de acceso (`sbp_...`), la clave `service_role`, ni la contraseña de la base de datos. La única credencial que puede vivir en el código es la clave **anon/publishable** (es pública por diseño y está protegida por RLS).

## Estado actual

- [ ] Proyecto Supabase creado
- [ ] Esquema aplicado (`schema.sql`)
- [ ] Credenciales públicas registradas en `cliente.ejemplo.js`

**Nota (17-jul-2026):** la configuración automática desde Claude Code quedó bloqueada porque la política de red del entorno no permite `api.supabase.com`. Ver "Cómo completar la configuración" abajo.

## Cómo completar la configuración

**Opción A — manual (5 minutos, recomendada):**
1. En [supabase.com/dashboard](https://supabase.com/dashboard) crear un proyecto llamado `proyectorower` (región recomendada: `us-east-1`). Guardar la contraseña de BD en un gestor de contraseñas del equipo.
2. Abrir **SQL Editor → New query**, pegar el contenido completo de [`schema.sql`](schema.sql) y ejecutar. Es idempotente (se puede re-ejecutar).
3. En **Settings → API**, copiar la **Project URL** y la clave **anon/publishable**, y ponerlas en `cliente.ejemplo.js` (renombrar a `cliente.js`).

**Opción B — desde Claude Code:** en la configuración del entorno de Claude Code on the web, permitir en la política de red los dominios `api.supabase.com` y `*.supabase.co`; en la siguiente sesión Claude puede crear el proyecto y aplicar el esquema vía Management API.

## Esquema

| Tabla | Propósito |
|---|---|
| `secciones` | Estado vivo del informe, sección por sección (espejo operable de `gestion/ESTADO.md`). Incluye seed con el estado al 17-jul. |
| `comentarios` | Comentarios/feedback de los consultores por sección, con marca de resuelto. |
| `riesgos` | Registro de riesgos (severidad × probabilidad × área) — alimenta la futura matriz visual de la sección 9. |

## Seguridad (RLS)

- **Lectura:** pública (clave anon) — el equipo puede consultar sin login.
- **Escritura:** solo usuarios autenticados (Supabase Auth).
- Si el equipo necesita escribir antes de configurar Auth, se puede abrir temporalmente la escritura ejecutando por ejemplo:
  ```sql
  create policy comentarios_escritura_anon on public.comentarios
    for insert to anon with check (true);
  ```
  …pero cerrarla en cuanto haya Auth (cualquiera con la URL podría escribir).

## Uso desde los módulos web

Ver [`cliente.ejemplo.js`](cliente.ejemplo.js). Los módulos en `modulos/` cargan el cliente oficial `@supabase/supabase-js` desde CDN y usan la URL + clave anon del proyecto.
