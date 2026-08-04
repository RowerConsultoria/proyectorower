-- ============================================================
-- Proyecto Rower — Esquema de base de datos (Supabase/Postgres)
-- Ejecutar en: Supabase Dashboard → SQL Editor → New query
-- Idempotente: se puede re-ejecutar sin duplicar datos.
-- ============================================================

-- ---------- 1. Secciones del informe (estado vivo) ----------
create table if not exists public.secciones (
  id             text primary key,            -- 's1'..'s17', 'indice'
  numero         text not null,               -- '1', 'A (s15)', etc.
  titulo         text not null,
  estado         text not null default 'pendiente'
                 check (estado in ('completa','parcial','borrador','pendiente','interna')),
  responsable    text,
  notas          text,
  actualizado_en timestamptz not null default now()
);

-- ---------- 2. Comentarios de los consultores ----------
create table if not exists public.comentarios (
  id          uuid primary key default gen_random_uuid(),
  seccion_id  text references public.secciones(id) on delete set null,
  autor       text not null,                  -- Clemencia, Gabriel, Jesús, Vanessa, Josué, Melanieth
  contenido   text not null,
  resuelto    boolean not null default false,
  creado_en   timestamptz not null default now()
);

-- ---------- 3. Riesgos (alimenta la matriz de la sección 9) ----------
create table if not exists public.riesgos (
  id             uuid primary key default gen_random_uuid(),
  titulo         text not null,
  descripcion    text,
  area           text,                        -- gobierno, estructura, talento, procesos, tecnología, cultura
  severidad      text check (severidad in ('critica','alta','media','baja')),
  probabilidad   text check (probabilidad in ('alta','media','baja')),
  fuente_seccion text references public.secciones(id) on delete set null,
  creado_en      timestamptz not null default now()
);

-- ---------- Trigger: mantener actualizado_en ----------
create or replace function public.touch_actualizado_en()
returns trigger language plpgsql as $$
begin
  new.actualizado_en = now();
  return new;
end $$;

drop trigger if exists trg_secciones_touch on public.secciones;
create trigger trg_secciones_touch
  before update on public.secciones
  for each row execute function public.touch_actualizado_en();

-- ---------- Seguridad: RLS ----------
-- 🔒 Desde el 04-ago-2026 (activación de Supabase Auth) NADA es anónimo:
-- lectura y escritura exigen sesión (rol `authenticated`). La clave publishable
-- es pública y vive en el repositorio: con ella sola no se ve ni se escribe nada.
-- Las Edge Functions usan la clave de servicio, que salta RLS por diseño.
alter table public.secciones   enable row level security;
alter table public.comentarios enable row level security;
alter table public.riesgos     enable row level security;

-- Las políticas viven en la §10 (necesitan public.tiene_permiso, que nace allí).

-- ---------- Datos iniciales: estado del informe al 17-jul-2026 ----------
insert into public.secciones (id, numero, titulo, estado, responsable, notas) values
  ('indice','—','Índice del documento','completa',null,'Partes I/II/III + Anexos + grupo Uso interno'),
  ('s1','1','Resumen ejecutivo','pendiente',null,'Se redacta al final, cuando s9 y s13 cierren'),
  ('s2','2','Metodología y fuentes','completa',null,null),
  ('s3','3','Fundamentos, gobierno y estrategia','completa','Clemencia','Despersonalizada'),
  ('s4','4','Estructura organizativa global','completa',null,'Alertas movidas a s17'),
  ('s5','5','Talento y RRHH','completa','Vanessa','Pendiente decidir integración de Estructura_Patron_de_Cargos'),
  ('s6','6','Procesos y operaciones','completa','Jesús','6.5 = Mapa v7: 22/104/260'),
  ('s7','7','Tecnología, sistemas y datos','completa','Gabriel',null),
  ('s8','8','Cultura y adopción de IA','completa','Josué',null),
  ('s9','9','Síntesis de hallazgos críticos y riesgos','borrador',null,'Consolidar en matriz de severidad'),
  ('s10','10','Propuesta de estructura','parcial',null,'Falta placeholder 10.2: elementos adicionales'),
  ('s11','11','Auditoría Lark y Odoo','completa','Gabriel','Fase documental'),
  ('s12','12','Arquitectura IA preliminar','completa','Gabriel','Contiene el modal del diagrama'),
  ('s13','13','Hoja de ruta de automatización','pendiente','Gabriel','Insumos disponibles en 7.9, 11.4, 11.5, 12.5'),
  ('s15','A','Anexo A — Inventario de entrevistas','borrador',null,'Cotejar contra 2.3'),
  ('s16','B','Anexo B — Plan de trabajo interno F1','interna',null,'Fuera de la versión cliente'),
  ('s17','—','Apartado interno — Alertas de identidad','interna',null,'Fuera de la versión cliente')
on conflict (id) do nothing;

-- ---------- 4. Entrevistas transcritas (crudos) ----------
-- Insumo del módulo admin. Las transcripciones NO viven en el repo (material sensible).
create table if not exists public.entrevistas (
  id             uuid primary key default gen_random_uuid(),
  codigo         text unique,                 -- 'E-01'… para cotejar con Anexo A
  entrevistado   text not null,
  cargo          text,
  area           text,                        -- gobierno, estructura, talento, procesos, tecnología, cultura, operaciones
  pais           text,                        -- Venezuela, Panamá, Colombia, Costa Rica, Guatemala, EE.UU.
  fecha          date,
  entrevistador  text,
  duracion_min   integer,
  estado         text not null default 'crudo'
                 check (estado in ('crudo','revisado','procesado','descartado')),
  transcripcion  text,
  notas          text,
  etiquetas      text[],
  creado_en      timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);

drop trigger if exists trg_entrevistas_touch on public.entrevistas;
create trigger trg_entrevistas_touch
  before update on public.entrevistas
  for each row execute function public.touch_actualizado_en();

alter table public.entrevistas enable row level security;

-- Las políticas viven en la §10 (necesitan public.tiene_permiso, que nace allí).
-- La política anónima transitoria quedó CERRADA el 04-ago-2026 al activar Auth.
-- No reabrirla: aquí viven las transcripciones íntegras del corpus.
drop policy if exists entrevistas_escritura_anon on public.entrevistas;

insert into public.entrevistas
  (codigo, entrevistado, cargo, area, pais, entrevistador, estado, transcripcion, notas, etiquetas)
values
  ('E-DEMO','Ejemplo — reemplazar','Cargo de ejemplo','tecnología','Venezuela','Gabriel','crudo',
   'Transcripción de ejemplo para validar el módulo. Puede borrarse: el corpus real ya está cargado.',
   'Fila semilla de demostración. Puede borrarse.', array['demo','ejemplo'])
on conflict (codigo) do nothing;

-- ---------- 5. Archivos (insumos: Excel, PowerPoint, PDF, etc.) ----------
-- Binarios en Storage (bucket 'insumos'); metadatos en public.archivos.
insert into storage.buckets (id, name, public, file_size_limit)
values ('insumos', 'insumos', false, 104857600)   -- 100 MB por archivo, bucket privado
on conflict (id) do nothing;

-- El bucket es privado y solo lo ve quien tenga el permiso admin.archivos: aquí
-- hay nóminas reales. insumos_anon quedó CERRADA el 04-ago-2026 — no reabrirla.
-- La política vive en la §10.
drop policy if exists insumos_anon on storage.objects;

create table if not exists public.archivos (
  id            uuid primary key default gen_random_uuid(),
  nombre        text not null,
  descripcion   text,
  categoria     text,                          -- procesos, talento, tecnología, gobierno, financiero, operaciones, general
  tipo          text,                          -- xlsx, pptx, pdf, otro
  storage_path  text not null unique,
  size_bytes    bigint,
  mime          text,
  subido_por    text,
  etiquetas     text[],
  creado_en     timestamptz not null default now()
);

alter table public.archivos enable row level security;

-- Las políticas viven en la §10 (necesitan public.tiene_permiso, que nace allí).
drop policy if exists archivos_escritura_anon on public.archivos;   -- cerrada el 04-ago-2026

-- ---------- 6. Línea de tiempo (bitácora del proyecto) ----------
-- Eventos día a día del proyecto consultor: entrevistas, reuniones internas,
-- hitos, entregables, análisis, decisiones y visitas. Alimenta el módulo
-- "Línea de tiempo" del admin. unique(fecha,titulo) hace idempotente la semilla.
create table if not exists public.eventos (
  id          uuid primary key default gen_random_uuid(),
  fecha       date not null,
  titulo      text not null,
  descripcion text,
  tipo        text not null default 'hito'
              check (tipo in ('entrevista','reunion_interna','hito','entregable','analisis','decision','visita')),
  fuente      text,                          -- E-01, minuta 29-jun, propuesta, estatus 30-jun…
  pais        text,
  actores     text[],
  creado_en   timestamptz not null default now(),
  unique (fecha, titulo)
);

alter table public.eventos enable row level security;

-- Las políticas viven en la §10 (necesitan public.tiene_permiso, que nace allí).
drop policy if exists eventos_escritura_anon on public.eventos;      -- cerrada el 04-ago-2026

-- ---------- 7. Asistente IA (conocimiento + fragmentos) ----------
-- Base de conocimiento del asistente conversacional del admin:
--  · conocimiento: documentos de síntesis del corpus (van SIEMPRE al contexto
--    del modelo, cacheados). clave = 'resumenes' | 'memoria' | …
--  · fragmentos: las transcripciones troceadas (~1.600 chars con solape) con
--    índice full-text en español, para que el asistente cite pasajes textuales.
-- El flag "activo" permite excluir una fuente del corpus sin borrarla
-- (p. ej. si se decide curar el material visible para la Junta).

create table if not exists public.conocimiento (
  id             uuid primary key default gen_random_uuid(),
  clave          text not null unique,
  titulo         text not null,
  contenido      text not null,
  activo         boolean not null default true,
  actualizado_en timestamptz not null default now()
);

-- Diálogo limpio de la entrevista (extraído del JSON/markdown del transcriptor:
-- "S1: …" por turno de habla). Lo consume la herramienta leer_entrevista del
-- asistente — leer el JSON crudo triplica los tokens.
alter table public.entrevistas add column if not exists dialogo text;

create table if not exists public.fragmentos (
  id           bigint generated always as identity primary key,
  codigo       text not null,          -- E-01 … E-24 (pt.1/pt.2)
  entrevistado text,
  orden        int not null,           -- posición del fragmento en la entrevista
  contenido    text not null,
  activo       boolean not null default true,
  tsv          tsvector generated always as (to_tsvector('spanish', contenido)) stored,
  unique (codigo, orden)
);
create index if not exists fragmentos_tsv_idx    on public.fragmentos using gin (tsv);
create index if not exists fragmentos_codigo_idx on public.fragmentos (codigo);

-- Búsqueda léxica en español. Primero intenta que aparezcan TODOS los términos
-- (websearch, admite "frases entre comillas"); como las palabras raras dejan
-- consultas AND sin resultados, el matching real es OR y los fragmentos que
-- cumplen el AND estricto se rankean primero (+1 al rango).
create or replace function public.buscar_fragmentos(consulta text, cod text default null, limite int default 8)
returns table (codigo text, entrevistado text, orden int, contenido text, rango real)
language sql stable
set search_path = public
as $$
  with q as (
    select websearch_to_tsquery('spanish', consulta) as estricta
  ), qq as (
    select estricta,
           case when numnode(estricta) > 0
                then to_tsquery('spanish', regexp_replace(estricta::text, '&', '|', 'g'))
                else estricta end as amplia
    from q
  )
  select f.codigo, f.entrevistado, f.orden, f.contenido,
         (ts_rank(f.tsv, qq.amplia) + (f.tsv @@ qq.estricta)::int)::real as rango
  from public.fragmentos f, qq
  where f.activo
    and f.tsv @@ qq.amplia
    and (cod is null or f.codigo = cod)
  order by rango desc
  limit least(greatest(limite, 1), 20);
$$;

alter table public.conocimiento enable row level security;
alter table public.fragmentos   enable row level security;

-- Las políticas viven en la §10 (necesitan public.tiene_permiso, que nace allí).
drop policy if exists conocimiento_escritura_anon on public.conocimiento;   -- cerrada el 04-ago-2026
drop policy if exists fragmentos_escritura_anon   on public.fragmentos;     -- cerrada el 04-ago-2026

-- ---------- 8. Indexación automática del corpus ----------
-- Cada entrevista o archivo que se carga dispara (vía pg_net) la Edge Function
-- "indexar", que: extrae el texto (diálogo limpio / contenido del xlsx-pdf-docx-pptx),
-- lo trocea en fragmentos (FTS), y genera con Claude una síntesis que se guarda
-- en "conocimiento" — con lo que entra AUTOMÁTICAMENTE al contexto del Asistente IA
-- (su caché de conocimiento refresca cada 5 min).

create extension if not exists pg_net;
create extension if not exists supabase_vault with schema vault;

alter table public.entrevistas add column if not exists indexado_en timestamptz;
alter table public.archivos    add column if not exists indexado_en timestamptz;

-- 🔑 La credencial con que Postgres invoca la función NO vive en este archivo:
-- se guarda cifrada en Supabase Vault bajo el nombre 'clave_servicio'. Sembrarla
-- una vez por proyecto (SQL Editor, con el valor real de la clave de servicio):
--
--   select vault.create_secret(
--     '<SUPABASE_SERVICE_ROLE_KEY>', 'clave_servicio',
--     'Clave con que los triggers invocan la Edge Function indexar');
--
-- Para reponerla:  select vault.update_secret(
--     (select id from vault.secrets where name = 'clave_servicio'), '<CLAVE>');
-- Comprobar que está:  select name from vault.secrets where name = 'clave_servicio';
create or replace function public.disparar_indexado()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  clave text;
begin
  select decrypted_secret into clave
    from vault.decrypted_secrets
   where name = 'clave_servicio';

  if clave is null or clave = '' then
    -- Sin credencial no se indexa, pero la carga del insumo NO debe fallar:
    -- se avisa y queda pendiente para el backfill ({"todo":true}).
    raise warning 'Rower: falta el secreto ''clave_servicio'' en Vault; % % queda sin indexar',
                  TG_ARGV[0], NEW.id;
    return NEW;
  end if;

  perform net.http_post(
    url     := 'https://kmhwqybqrcjhjeywjgxj.supabase.co/functions/v1/indexar',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || clave
    ),
    body := jsonb_build_object('tipo', TG_ARGV[0], 'id', NEW.id::text)
  );
  return NEW;
end;
$$;

-- Entrevistas: al crear con transcripción, o cuando la transcripción cambia.
drop trigger if exists entrevistas_indexar_ins on public.entrevistas;
create trigger entrevistas_indexar_ins
  after insert on public.entrevistas
  for each row
  when (new.transcripcion is not null and length(new.transcripcion) > 50)
  execute function public.disparar_indexado('entrevista');

drop trigger if exists entrevistas_indexar_upd on public.entrevistas;
create trigger entrevistas_indexar_upd
  after update of transcripcion on public.entrevistas
  for each row
  when (old.transcripcion is distinct from new.transcripcion
        and new.transcripcion is not null and length(new.transcripcion) > 50)
  execute function public.disparar_indexado('entrevista');

-- Archivos: al insertar la metadata (el binario ya está en Storage en ese punto).
drop trigger if exists archivos_indexar_ins on public.archivos;
create trigger archivos_indexar_ins
  after insert on public.archivos
  for each row
  execute function public.disparar_indexado('archivo');

-- ---------- 9. Acceso: Supabase Auth (activado el 04-ago-2026) ----------
-- Todo el aplicativo vive detrás de /acceso/ (pantalla de login) y del guardia
-- supabase/sesion.js. Las políticas de arriba solo reconocen `authenticated`,
-- así que sin sesión no hay lectura ni escritura, ni desde el navegador ni con
-- la clave publishable en la mano.
--
-- Las cuentas NO se crean con SQL: van por la API de administración de Auth,
-- que exige la clave de servicio (nunca la publishable, nunca desde el repo).
--
--   POST https://<ref>.supabase.co/auth/v1/admin/users
--   apikey: <SERVICE_ROLE>   Authorization: Bearer <SERVICE_ROLE>
--   { "email": "...", "password": "...", "email_confirm": true,
--     "user_metadata": { "nombre": "...", "rol": "admin" } }
--
-- …o desde el Dashboard → Authentication → Users → Add user (marcar
-- "Auto Confirm User", porque el proyecto no tiene SMTP propio configurado).
--
-- El registro abierto está deshabilitado (Authentication → Providers → Email →
-- "Allow new users to sign up" en off): las cuentas las da el equipo técnico.
--
-- Consultar quién tiene acceso:
--   select email, raw_user_meta_data->>'nombre' as nombre,
--          email_confirmed_at, last_sign_in_at
--     from auth.users order by created_at;
--
-- Reponer una clave:
--   PUT https://<ref>.supabase.co/auth/v1/admin/users/<id>  { "password": "..." }
--
-- Cuando haga falta separar perfiles (Junta = solo informe · equipo = admin),
-- el sitio natural es user_metadata.rol + un chequeo en el guardia y políticas
-- por rol; hoy toda cuenta autenticada ve todo.

-- ---------- 10. Gobierno del acceso: usuarios, roles y permisos ----------
-- Módulos «Usuarios» y «Roles y permisos» del panel admin.
--
-- El rol NO vive en user_metadata: eso lo puede editar el propio usuario con su
-- sesión (se ascendería solo). Vive en public.perfiles, que solo escribe la
-- Edge Function `usuarios` con la clave de servicio.
--
-- `permisos` es un CATÁLOGO acoplado al código: añadir una fila no crea un
-- permiso nuevo si nadie lo comprueba. Se edita aquí, no desde la pantalla.

create table if not exists public.permisos (
  clave       text primary key,             -- 'admin.entrevistas'
  nombre      text not null,
  descripcion text,
  grupo       text not null default 'Panel', -- 'Front' | 'Panel' | 'Gobierno del acceso'
  orden       int  not null default 100
);

create table if not exists public.roles (
  clave       text primary key,             -- 'admin', 'consultor', 'junta', 'pendiente'
  nombre      text not null,
  descripcion text,
  es_sistema  boolean not null default false, -- no se puede borrar desde la pantalla
  orden       int not null default 100,
  creado_en   timestamptz not null default now()
);

create table if not exists public.roles_permisos (
  rol     text not null references public.roles(clave)    on delete cascade,
  permiso text not null references public.permisos(clave) on delete cascade,
  primary key (rol, permiso)
);

-- Un perfil por cuenta de auth.users. Se crea solo (trigger de abajo), así que
-- una cuenta dada de alta desde el Dashboard tampoco queda sin gobierno: cae en
-- el rol 'pendiente', que no tiene ningún permiso.
create table if not exists public.perfiles (
  id             uuid primary key references auth.users(id) on delete cascade,
  correo         text,
  nombre         text,
  rol            text not null default 'pendiente' references public.roles(clave),
  activo         boolean not null default true,
  notas          text,
  creado_en      timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);
create index if not exists perfiles_rol_idx on public.perfiles (rol);

drop trigger if exists trg_perfiles_touch on public.perfiles;
create trigger trg_perfiles_touch
  before update on public.perfiles
  for each row execute function public.touch_actualizado_en();

-- ---------- Semilla: los cuatro roles y los diez permisos ----------
insert into public.permisos (clave, nombre, descripcion, grupo, orden) values
  ('ver.informe',     'Ver el informe',        'Informe Diagnóstico Fase 1 y sus módulos: organigramas, mapa de procesos, presentación y la torre de arquitectura de IA.', 'Front', 10),
  ('ver.sistema',     'Ver el prototipo',      'Prototipo del sistema Kenex y sus dos portales (vendedor y cliente).', 'Front', 20),
  ('admin.entrar',    'Entrar al panel',       'Abrir el panel administrativo. Sin este permiso no se ve ningún módulo interno.', 'Panel', 30),
  ('admin.asistente', 'Asistente IA',          'Conversar con el corpus completo del proyecto: entrevistas crudas, síntesis y notas internas. Gasta cuota de Anthropic.', 'Panel', 40),
  ('admin.entrevistas','Entrevistas transcritas','Leer, crear y editar las transcripciones íntegras de las entrevistas.', 'Panel', 50),
  ('admin.archivos',  'Archivos (insumos)',    'Subir, descargar y borrar los insumos del bucket. Incluye material sensible como las escalas salariales.', 'Panel', 60),
  ('admin.timeline',  'Línea de tiempo',       'Bitácora cronológica del proyecto.', 'Panel', 70),
  ('admin.informe',   'Estado del informe',    'Estado por sección, comentarios de los consultores y matriz de riesgos.', 'Panel', 80),
  ('admin.usuarios',  'Administrar usuarios',  'Crear cuentas, reponer claves, asignar roles y dar de baja. Permiso delicado.', 'Gobierno del acceso', 90),
  ('admin.roles',     'Definir roles',         'Crear roles y decidir qué puede hacer cada uno. Permiso delicado.', 'Gobierno del acceso', 100)
on conflict (clave) do update
  set nombre = excluded.nombre, descripcion = excluded.descripcion,
      grupo = excluded.grupo, orden = excluded.orden;

insert into public.roles (clave, nombre, descripcion, es_sistema, orden) values
  ('admin',     'Administrador', 'Gobierna el aplicativo: todos los módulos y la administración de accesos.', true, 10),
  ('consultor', 'Consultor',     'Equipo de UCAB Consultores: el informe y todos los módulos de trabajo, sin tocar accesos.', true, 20),
  ('junta',     'Junta',         'Lectura del informe. Pensado para la Junta Directiva de Kenex.', true, 30),
  ('pendiente', 'Sin accesos',   'Cuenta creada pero sin permisos todavía. Es donde cae toda cuenta nueva de origen desconocido.', true, 90)
on conflict (clave) do nothing;

-- Matriz inicial. Solo se siembra lo que falte: si alguien ya ajustó un rol
-- desde la pantalla, re-ejecutar este archivo no le deshace el trabajo.
insert into public.roles_permisos (rol, permiso)
select 'admin', clave from public.permisos
on conflict do nothing;

insert into public.roles_permisos (rol, permiso)
select 'consultor', clave from public.permisos
 where clave in ('ver.informe','ver.sistema','admin.entrar','admin.asistente',
                 'admin.entrevistas','admin.archivos','admin.timeline','admin.informe')
on conflict do nothing;

insert into public.roles_permisos (rol, permiso) values ('junta','ver.informe')
on conflict do nothing;
-- 'pendiente' se queda a propósito sin ninguna fila.

-- ---------- Perfil automático al crear una cuenta ----------
create or replace function public.crear_perfil_auth()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.perfiles (id, correo, nombre, rol)
  values (
    new.id,
    new.email,
    nullif(trim(coalesce(new.raw_user_meta_data->>'nombre', '')), ''),
    case when exists (select 1 from public.roles r
                       where r.clave = coalesce(new.raw_user_meta_data->>'rol', ''))
         then new.raw_user_meta_data->>'rol'
         else 'pendiente' end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists auth_users_perfil on auth.users;
create trigger auth_users_perfil
  after insert on auth.users
  for each row execute function public.crear_perfil_auth();

-- Perfil para las cuentas que ya existían antes de este módulo.
insert into public.perfiles (id, correo, nombre, rol)
select u.id, u.email,
       nullif(trim(coalesce(u.raw_user_meta_data->>'nombre','')), ''),
       'pendiente'
  from auth.users u
 where not exists (select 1 from public.perfiles p where p.id = u.id)
on conflict (id) do nothing;

-- ---------- Los dos ayudantes que usan TODAS las políticas ----------
-- security definer: leen perfiles/roles_permisos saltándose RLS, para que las
-- políticas que los invocan no entren en recursión.
create or replace function public.tiene_permiso(p text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
      from public.perfiles pf
      join public.roles_permisos rp on rp.rol = pf.rol
     where pf.id = auth.uid()
       and pf.activo
       and rp.permiso = p
  );
$$;

-- Lo que el navegador necesita saber de sí mismo (RPC del guardia y del admin).
create or replace function public.mi_acceso()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  pf    record;
  perms jsonb;
begin
  select p.id, p.correo, p.nombre, p.rol, p.activo, r.nombre as rol_nombre
    into pf
    from public.perfiles p
    left join public.roles r on r.clave = p.rol
   where p.id = auth.uid();

  if pf.id is null then
    return jsonb_build_object('existe', false, 'activo', false, 'permisos', '[]'::jsonb);
  end if;

  if pf.activo then
    select coalesce(jsonb_agg(rp.permiso order by rp.permiso), '[]'::jsonb)
      into perms
      from public.roles_permisos rp
     where rp.rol = pf.rol;
  else
    perms := '[]'::jsonb;
  end if;

  return jsonb_build_object(
    'existe', true, 'id', pf.id, 'correo', pf.correo, 'nombre', pf.nombre,
    'rol', pf.rol, 'rol_nombre', pf.rol_nombre, 'activo', pf.activo,
    'permisos', perms);
end;
$$;

revoke all on function public.mi_acceso() from anon;
revoke all on function public.tiene_permiso(text) from anon;

-- ---------- Que nadie se deje fuera ----------
-- El rol 'admin' no puede perder el gobierno del acceso, ni por descuido ni por
-- un clic en la matriz: sin admin.usuarios/admin.roles nadie podría reabrirlo.
create or replace function public.proteger_gobierno()
returns trigger
language plpgsql
as $$
begin
  if old.rol = 'admin' and old.permiso in ('admin.usuarios', 'admin.roles') then
    raise exception 'El rol Administrador no puede quedarse sin «%»: nadie podría volver a repartir accesos', old.permiso;
  end if;
  return old;
end;
$$;

drop trigger if exists trg_proteger_gobierno on public.roles_permisos;
create trigger trg_proteger_gobierno
  before delete on public.roles_permisos
  for each row execute function public.proteger_gobierno();

create or replace function public.proteger_roles_sistema()
returns trigger
language plpgsql
as $$
begin
  if old.es_sistema then
    raise exception 'El rol «%» es de sistema: se puede reasignar sus permisos, no borrarlo', old.nombre;
  end if;
  return old;
end;
$$;

drop trigger if exists trg_proteger_roles_sistema on public.roles;
create trigger trg_proteger_roles_sistema
  before delete on public.roles
  for each row execute function public.proteger_roles_sistema();

-- ---------- RLS del gobierno del acceso ----------
alter table public.permisos       enable row level security;
alter table public.roles          enable row level security;
alter table public.roles_permisos enable row level security;
alter table public.perfiles       enable row level security;

-- Catálogo de permisos: se lee (para pintar la matriz), no se escribe desde la app.
drop policy if exists permisos_lectura on public.permisos;
create policy permisos_lectura on public.permisos for select to authenticated using (true);

-- Roles y matriz: los ve cualquier autenticado; los cambia quien tenga admin.roles.
drop policy if exists roles_lectura   on public.roles;
drop policy if exists roles_escritura on public.roles;
create policy roles_lectura   on public.roles for select to authenticated using (true);
create policy roles_escritura on public.roles for all    to authenticated
  using (public.tiene_permiso('admin.roles')) with check (public.tiene_permiso('admin.roles'));

drop policy if exists roles_permisos_lectura   on public.roles_permisos;
drop policy if exists roles_permisos_escritura on public.roles_permisos;
create policy roles_permisos_lectura   on public.roles_permisos for select to authenticated using (true);
create policy roles_permisos_escritura on public.roles_permisos for all    to authenticated
  using (public.tiene_permiso('admin.roles')) with check (public.tiene_permiso('admin.roles'));

-- Perfiles: cada quien ve el suyo; la lista completa, solo con admin.usuarios.
-- La ESCRITURA no tiene política: se hace por la Edge Function `usuarios`, que
-- usa la clave de servicio y comprueba el permiso del llamante.
drop policy if exists perfiles_lectura on public.perfiles;
create policy perfiles_lectura on public.perfiles for select to authenticated
  using (id = auth.uid() or public.tiene_permiso('admin.usuarios'));

-- ---------- Las políticas de TODO el esquema, por permiso ----------
-- Van al final a propósito: `tiene_permiso()` tiene que existir antes.
-- Cada tabla pide el permiso de SU módulo, el mismo que comprueban el panel
-- y las Edge Functions. Cambiar un permiso en el módulo «Roles y permisos»
-- cambia lo que la base de datos deja ver, sin tocar este archivo.

drop policy if exists secciones_lectura   on public.secciones;
drop policy if exists secciones_escritura on public.secciones;
create policy secciones_lectura   on public.secciones for select to authenticated
  using (public.tiene_permiso('admin.informe'));
create policy secciones_escritura on public.secciones for all to authenticated
  using (public.tiene_permiso('admin.informe')) with check (public.tiene_permiso('admin.informe'));

drop policy if exists comentarios_lectura   on public.comentarios;
drop policy if exists comentarios_escritura on public.comentarios;
create policy comentarios_lectura   on public.comentarios for select to authenticated
  using (public.tiene_permiso('admin.informe'));
create policy comentarios_escritura on public.comentarios for all to authenticated
  using (public.tiene_permiso('admin.informe')) with check (public.tiene_permiso('admin.informe'));

drop policy if exists riesgos_lectura   on public.riesgos;
drop policy if exists riesgos_escritura on public.riesgos;
create policy riesgos_lectura   on public.riesgos for select to authenticated
  using (public.tiene_permiso('admin.informe'));
create policy riesgos_escritura on public.riesgos for all to authenticated
  using (public.tiene_permiso('admin.informe')) with check (public.tiene_permiso('admin.informe'));

drop policy if exists entrevistas_lectura   on public.entrevistas;
drop policy if exists entrevistas_escritura on public.entrevistas;
create policy entrevistas_lectura   on public.entrevistas for select to authenticated
  using (public.tiene_permiso('admin.entrevistas'));
create policy entrevistas_escritura on public.entrevistas for all to authenticated
  using (public.tiene_permiso('admin.entrevistas')) with check (public.tiene_permiso('admin.entrevistas'));

drop policy if exists archivos_lectura   on public.archivos;
drop policy if exists archivos_escritura on public.archivos;
create policy archivos_lectura   on public.archivos for select to authenticated
  using (public.tiene_permiso('admin.archivos'));
create policy archivos_escritura on public.archivos for all to authenticated
  using (public.tiene_permiso('admin.archivos')) with check (public.tiene_permiso('admin.archivos'));

drop policy if exists eventos_lectura   on public.eventos;
drop policy if exists eventos_escritura on public.eventos;
create policy eventos_lectura   on public.eventos for select to authenticated
  using (public.tiene_permiso('admin.timeline'));
create policy eventos_escritura on public.eventos for all to authenticated
  using (public.tiene_permiso('admin.timeline')) with check (public.tiene_permiso('admin.timeline'));

drop policy if exists conocimiento_lectura   on public.conocimiento;
drop policy if exists conocimiento_escritura on public.conocimiento;
create policy conocimiento_lectura   on public.conocimiento for select to authenticated
  using (public.tiene_permiso('admin.asistente'));
create policy conocimiento_escritura on public.conocimiento for all to authenticated
  using (public.tiene_permiso('admin.asistente')) with check (public.tiene_permiso('admin.asistente'));

drop policy if exists fragmentos_lectura   on public.fragmentos;
drop policy if exists fragmentos_escritura on public.fragmentos;
create policy fragmentos_lectura   on public.fragmentos for select to authenticated
  using (public.tiene_permiso('admin.asistente'));
create policy fragmentos_escritura on public.fragmentos for all to authenticated
  using (public.tiene_permiso('admin.asistente')) with check (public.tiene_permiso('admin.asistente'));

drop policy if exists insumos_anon on storage.objects;
drop policy if exists insumos_auth on storage.objects;
create policy insumos_auth on storage.objects for all to authenticated
  using (bucket_id = 'insumos' and public.tiene_permiso('admin.archivos'))
  with check (bucket_id = 'insumos' and public.tiene_permiso('admin.archivos'));
