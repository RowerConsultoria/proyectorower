# Base de datos — Supabase

Base de datos persistente del Proyecto Rower. Da soporte a los módulos interactivos (estado vivo del informe, comentarios de consultores, matriz de riesgos).

> ⚠️ **Nunca** guardar en este repositorio tokens de acceso (`sbp_...`), la clave `service_role`, ni la contraseña de la base de datos. La única credencial que puede vivir en el código es la clave **anon/publishable** (es pública por diseño y está protegida por RLS).

## Estado actual ✅ configurado (17-jul-2026)

- [x] Proyecto Supabase activo — **Rower Project** (org *Rower Org*), región `ca-central-1`, Postgres 17
- [x] Esquema aplicado vía migración `esquema_inicial_proyecto_rower`
- [x] Seed cargado: 17 secciones del informe (estado al 17-jul)
- [x] Endurecimiento de seguridad aplicado (`endurecimiento_seguridad`)
- [x] Credenciales públicas registradas en [`cliente.js`](cliente.js)
- [x] **Supabase Auth activado (04-ago-2026)** — acceso anónimo cerrado en tablas, Storage y Edge Functions

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
| `entrevistas` | Crudos de entrevistas transcritas. Alimenta el módulo `admin/` (listar/crear/editar). Las transcripciones viven aquí, **no en el repo**. |
| `eventos` | Bitácora/línea de tiempo del proyecto (módulo admin «Línea de tiempo»). Sembrada el 18-jul-2026 con 148 eventos extraídos del corpus completo. `unique(fecha,titulo)` hace idempotente la siembra. |
| `conocimiento` | Documentos de síntesis del corpus (`resumenes`, `memoria`) que el Asistente IA lleva SIEMPRE en su contexto (cacheado). El flag `activo` permite excluir fuentes sin borrarlas. |
| `fragmentos` | Las 25 transcripciones troceadas (~1.090 chunks de diálogo limpio) con índice full-text en español. Se consulta vía RPC `buscar_fragmentos(consulta, cod, limite)` (AND estricto rankea primero, matching OR de respaldo). |
| `auth.users` | Las cuentas del aplicativo (Supabase Auth). No se toca por SQL: ver «Acceso» abajo. |

## Acceso (Supabase Auth) — activado el 04-ago-2026

Todo el aplicativo vive detrás de la pantalla **[`/acceso/`](../acceso/index.html)**: el portal raíz manda los dos caminos (informe y admin) al login, y el guardia [`sesion.js`](sesion.js) rebota cualquier página protegida que se abra sin sesión.

- **Cuentas:** las crea el equipo técnico. El **registro abierto está deshabilitado** (`disable_signup = true`) y los ingresos anónimos también. Sin eso, `authenticated` no protegería nada: cualquiera se daría de alta con la clave publishable.
- **Alta de una cuenta** (necesita la clave de servicio, nunca la publishable):
  ```bash
  curl -X POST "https://kmhwqybqrcjhjeywjgxj.supabase.co/auth/v1/admin/users" \
    -H "apikey: $SERVICE_KEY" -H "Authorization: Bearer $SERVICE_KEY" \
    -H "Content-Type: application/json" \
    -d '{"email":"persona@dominio.com","password":"…","email_confirm":true,
         "user_metadata":{"nombre":"Nombre Apellido","rol":"consultor"}}'
  ```
  …o Dashboard → **Authentication → Users → Add user**, marcando **Auto Confirm User** (el proyecto no tiene SMTP propio, así que sin autoconfirmar la cuenta no puede entrar).
- **Reponer una clave:** `PUT /auth/v1/admin/users/<id>` con `{"password":"…"}`, o desde el Dashboard.
- **Quién tiene acceso:** `select email, raw_user_meta_data->>'nombre', last_sign_in_at from auth.users order by created_at;`
- **Perfiles:** hoy toda cuenta autenticada ve el informe *y* el panel. Para separar (Junta = solo informe) el sitio es `user_metadata.rol` + chequeo en el guardia + políticas por rol.
- **Duración de sesión:** el token dura 1 h y el guardia lo renueva de fondo cuando falta poco; si venció del todo, pasa por `/acceso/`, que lo restaura sin pedir nada y reenvía al destino.

## Seguridad (RLS)

- **Lectura y escritura: solo `authenticated`.** Con la clave publishable (pública, está en el repo) no se ve ni una fila: comprobado tabla por tabla y también contra el bucket `insumos`.
- Las **políticas anónimas transitorias quedaron cerradas** el 04-ago-2026: `entrevistas_escritura_anon`, `archivos_escritura_anon`, `eventos_escritura_anon`, `conocimiento_escritura_anon`, `fragmentos_escritura_anon` e `insumos_anon`. **No reabrirlas** — aquí viven las transcripciones íntegras y el bucket con nóminas reales.
- Las **Edge Functions** usan la clave de servicio para leer/escribir, así que saltan RLS por diseño; su puerta es `_shared/acceso.ts`.
- **Escrituras desde guiones** (p. ej. `scripts/sincronizar-asistente.py`) necesitan la clave de servicio en el entorno: `$env:SUPABASE_SERVICE_KEY = "..."`. Nunca en el repositorio.

### Nota sobre avisos del linter de seguridad

`get_advisors` marca las políticas de escritura (`USING(true)` para `authenticated`) como "permisivas". **Es intencional**: en esta fase todo consultor autenticado es un miembro de confianza del equipo y puede editar. Cuando se afine el modelo de roles (p. ej. solo el dueño de una sección la edita), se restringen esas políticas. Los avisos de `search_path` y de la función `rls_auto_enable` (event trigger que auto-activa RLS en tablas nuevas) ya fueron resueltos en la migración `endurecimiento_seguridad`.

## Edge Functions

| Función | Propósito |
|---|---|
| [`extraer-entrevista`](functions/extraer-entrevista/index.ts) | Recibe el texto crudo de una entrevista y usa Claude (`claude-opus-4-8`) para extraer los metadatos del formulario del módulo admin. |
| [`asistente`](functions/asistente/index.ts) | Chat streaming (SSE) sobre el corpus para el módulo «Asistente IA»: Claude Opus 4.8 con la síntesis completa en contexto (prompt caching) + herramientas `buscar_pasajes`/`leer_entrevista`/`linea_tiempo`/`listar_archivos`. |
| [`indexar`](functions/indexar/index.ts) | Indexación automática del corpus (la disparan los triggers pg_net de schema §8 al cargar entrevistas/archivos): extrae texto (diálogo del transcriptor, xlsx vía SheetJS, pdf vía unpdf, docx/pptx vía JSZip), trocea a `fragmentos` y sintetiza con Claude hacia `conocimiento`. Acepta `{tipo,id}` o `{todo:true}` (backfill por lotes). |
| [`_shared/acceso.ts`](functions/_shared/acceso.ts) | La puerta común: `identificar(req)` acepta la credencial interna (secreto `ROWER_CLAVE_INTERNA`, que usan los triggers) o un JWT de sesión validado contra `/auth/v1/user`. Con la clave publishable devuelve **401**. |

- **Secretos requeridos:** `ANTHROPIC_API_KEY` (token `sk-ant-…`) y `ROWER_CLAVE_INTERNA` (credencial interna del proyecto). Se guardan en Supabase, **nunca** en el repo ni en el cliente: `supabase secrets set NOMBRE=... --project-ref <ref>`.
- **Deploy:** `supabase functions deploy asistente --project-ref <ref>` y lo mismo para `extraer-entrevista` (las dos **con** verificación de JWT, porque las llama el navegador). `indexar` va con `--no-verify-jwt` **a propósito**: la invoca Postgres, no un navegador, y la pasarela no puede validar ese llamante — el cierre lo hace su propio código.
- 🔑 **La credencial del trigger vive en Supabase Vault**, no en `schema.sql`. Si se repone hay que cambiarla en los **dos** lados o el indexado deja de dispararse (avisa con un `raise warning` y la fila queda pendiente para `{"todo":true}`):
  ```sql
  select vault.update_secret(
    (select id from vault.secrets where name = 'clave_servicio'), '<nueva>');
  ```
  ```bash
  supabase secrets set ROWER_CLAVE_INTERNA=<nueva> --project-ref <ref>
  ```
  Comprobar que el disparo llega: `select status_code, left(content,120) from net._http_response order by created desc limit 3;`

## Uso desde los módulos web

Ver [`cliente.ejemplo.js`](cliente.ejemplo.js). Los módulos en `modulos/` cargan el cliente oficial `@supabase/supabase-js` desde CDN y usan la URL + clave anon del proyecto.
