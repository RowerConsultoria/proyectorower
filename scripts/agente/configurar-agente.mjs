// Crea o actualiza el Agente IA del manual (Claude Managed Agents) y su entorno.
//
//   cd scripts/agente && npm install && node configurar-agente.mjs
//
// Lee ANTHROPIC_API_KEY del .env de la raíz. La primera vez CREA el agente y el
// entorno e imprime sus ids: guárdalos en el .env (AGENTE_ID, AGENTE_ENTORNO_ID)
// y como secretos de la Edge Function:
//   npx supabase secrets set AGENTE_ID=… AGENTE_ENTORNO_ID=… --project-ref <ref>
// Las siguientes veces ACTUALIZA el agente desde definicion.mjs (versión nueva;
// las sesiones abiertas siguen con la suya). No crea agentes de más.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Anthropic from '@anthropic-ai/sdk';
import { NOMBRE, MODELO, INSTRUCCIONES, HERRAMIENTAS } from './definicion.mjs';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const env = {};
for (const linea of fs.readFileSync(path.join(RAIZ, '.env'), 'utf8').split(/\r?\n/)) {
  const m = linea.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || env.ANTHROPIC_API_KEY });

const campos = { name: NOMBRE, model: MODELO, system: INSTRUCCIONES, tools: HERRAMIENTAS,
                 description: 'Agente flotante del manual de Fase 2: responde sobre los procesos y propone cambios al flujo del To-Be.' };

let entornoId = process.env.AGENTE_ENTORNO_ID || env.AGENTE_ENTORNO_ID;
if (!entornoId) {
  // Sin red: el agente no tiene herramientas de terminal ni web; todo lo hace la Edge Function.
  const entorno = await client.beta.environments.create({
    name: 'rower-agente-manual',
    config: { type: 'cloud', networking: { type: 'limited' } },
  });
  entornoId = entorno.id;
  console.log('Entorno creado:', entornoId);
}

let agenteId = process.env.AGENTE_ID || env.AGENTE_ID;
let agente;
if (!agenteId) {
  agente = await client.beta.agents.create(campos);
  agenteId = agente.id;
  console.log('Agente creado:', agenteId, '· versión', agente.version);
} else {
  const actual = await client.beta.agents.retrieve(agenteId);
  agente = await client.beta.agents.update(agenteId, { ...campos, version: actual.version });
  console.log('Agente actualizado:', agenteId, '· versión', actual.version, '→', agente.version);
}

console.log('\nAGENTE_ID=' + agenteId + '\nAGENTE_ENTORNO_ID=' + entornoId);
