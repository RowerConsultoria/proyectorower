-- ============================================================
-- 19-sep-2026 — Rescate de las 48 fichas que se completaron y volvieron atrás
--
-- Qué pasó: `guardar` de la Edge Function `ficha` escribe SIEMPRE
-- estado='en_progreso', y el formulario tenía un autoguardado con 2 s de
-- retardo que NO se cancelaba al pulsar «Marcar como completada». Quien
-- completaba antes de que venciera el retardo —o corregía algo después— veía
-- el «✅ completada» y el autoguardado la devolvía a «en progreso».
--
-- Cómo se reconocen: `enviada_en` solo lo escribe la acción `completar`, y
-- nada lo borra. Una ficha con enviada_en y estado<>'completada' solo puede
-- haber llegado ahí por este camino. Medido: 48 fichas, y las 48 siguen
-- cumpliendo hoy los 11 mínimos que exige faltantes().
--
-- Reversión: el trigger de historial (migración hermana) registra cada cambio,
-- así que deshacerlo es
--   update public.fichas_perfil f set estado = h.anterior->>'estado'
--     from public.fichas_perfil_historial h
--    where h.ficha_id = f.id and h.actor = 'rescate-48-20260919' and h.columnas = array['estado'];
-- ============================================================

begin;

-- Firma la intervención en el diario SIN tocar `llenada_por`, que guarda el
-- nombre de la persona que llenó y no es un campo de auditoría.
set local rower.actor = 'rescate-48-20260919';

create temporary table rescate_48 on commit drop as
select f.id
  from public.fichas_perfil f
 where f.enviada_en is not null
   and f.estado <> 'completada'
   -- réplica exacta de faltantes() en supabase/functions/ficha/index.ts
   and coalesce(btrim(f.documento),'')       <> ''
   and coalesce(btrim(f.antiguedad_org),'')  <> ''
   and coalesce(btrim(f.nivel_educativo),'') <> ''
   and coalesce(btrim(f.cargo_actual),'')    <> ''
   and coalesce(btrim(f.area_sede),'')       <> ''
   and exists (select 1 from jsonb_array_elements_text(f.responsabilidades) r where btrim(r) <> '')
   and coalesce(btrim(f.habilidades->>'excel'),'')   <> ''
   and coalesce(btrim(f.habilidades->>'odoo'),'')    <> ''
   and coalesce(btrim(f.habilidades->>'lark'),'')    <> ''
   and coalesce(btrim(f.habilidades->>'powerbi'),'') <> ''
   and coalesce(btrim(f.habilidades->>'ia'),'')      <> '';

-- Cortafuegos: si el recuento no es el medido, no se toca nada.
do $$
declare n int;
begin
  select count(*) into n from rescate_48;
  if n <> 48 then
    raise exception 'Esperaba 48 fichas a rescatar y encontré %. Abortado.', n;
  end if;
end $$;

update public.fichas_perfil f
   set estado = 'completada'
  from rescate_48 r
 where f.id = r.id;

commit;
