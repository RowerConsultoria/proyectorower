// Cliente Supabase para los módulos web del Proyecto Rower.
// La clave publishable es pública por diseño (protegida por RLS) — puede vivir en el repo.
// NUNCA poner aquí la clave service_role ni tokens sbp_.
//
// En un módulo HTML, cargar primero el cliente oficial:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
// <script src="../../supabase/cliente.js"></script>

const SUPABASE_URL = "https://kmhwqybqrcjhjeywjgxj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_a1TB2z327D8lIbeFDij0zg_qewS9ri1";

const rowerDB = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Ejemplos de uso desde los módulos:
//
// Estado del informe:
//   const { data } = await rowerDB.from("secciones").select("*").order("id");
//
// Comentarios de una sección:
//   const { data } = await rowerDB.from("comentarios")
//     .select("*").eq("seccion_id", "s9").order("creado_en");
//
// Riesgos para la matriz (sección 9):
//   const { data } = await rowerDB.from("riesgos").select("*");
