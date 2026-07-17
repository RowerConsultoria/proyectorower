# Base de datos — Supabase

Base de datos persistente del Proyecto Rower. Da soporte a los módulos interactivos (estado vivo del informe, comentarios de consultores, matriz de riesgos).

> ⚠️ **Nunca** guardar en este repositorio tokens de acceso (`sbp_...`), la clave `service_role`, ni la contraseña de la base de datos. La única credencial que puede vivir en el código es la clave **anon/publishable** (es pública por diseño y está protegida por RLS).

## Estado actual ✅ configurado (17-jul-2026)

- [x] Proyecto Supabase activo — **Rower Project** (org *Rower Org*), región `ca-central-1`, Postgres 17
- [x] Esquema aplicado vía migración `esquema_inicial_proyecto_rower`
- [x] Seed cargado: 17 secciones del informe (estado al 17-jul)
- [x] Endurecimiento de seguridad aplicado (`endurecimiento_seguridad`)
- [x] Credenciales públicas registradas en [`cliente.js`](cliente.js)

**Datos de conexión (públicos):**
- Project URL: `https://kmhwqybqrcjhjeywjgxj.supabase.co`
- Clave publishable: `sb_publishable_...` (ver `cliente.js`)
- Dashboard: https://supabase.com/dashboard/project/kmhwqybqrcjhjeywjgxj

La configuración se hizo desde Claude Code usando el **conector MCP de Supabase** (OAuth), que no pasa por el proxy de red del contenedor. Para re-crear el esquema en otro proyecto, `schema.sql` sigue siendo la fuente idempotente de referencia.

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

### Nota sobre avisos del linter de seguridad

`get_advisors` marca las políticas de escritura (`USING(true)` para `authenticated`) como "permisivas". **Es intencional**: en esta fase todo consultor autenticado es un miembro de confianza del equipo y puede editar. Cuando se afine el modelo de roles (p. ej. solo el dueño de una sección la edita), se restringen esas políticas. Los avisos de `search_path` y de la función `rls_auto_enable` (event trigger que auto-activa RLS en tablas nuevas) ya fueron resueltos en la migración `endurecimiento_seguridad`.

## Uso desde los módulos web

Ver [`cliente.ejemplo.js`](cliente.ejemplo.js). Los módulos en `modulos/` cargan el cliente oficial `@supabase/supabase-js` desde CDN y usan la URL + clave anon del proyecto.
