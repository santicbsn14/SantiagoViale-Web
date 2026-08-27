// Vercel serverless function (Node.js runtime). GET /api/pagos?proyectoId=...
//
// Local testing: `npm run dev` (Vite) does NOT serve this folder. To test it
// locally, run `vercel dev` from this directory instead (needs the Vercel CLI
// and a `.env` file with SANITY_READ_TOKEN set — see .env.example).

import type { ServerlessRequest, ServerlessResponse } from './_http';
import { getSanityClient } from './_sanityClient';
import { isSessionValid } from './_session';

interface PagoDoc {
  _id: string;
  monto: number;
  fecha: string | null;
  metodo: string | null;
  nota: string | null;
}

const QUERY = `*[_type == "pago" && proyecto._ref == $proyectoId] | order(fecha desc) {
  _id, monto, fecha, metodo, nota
}`;

export default async function handler(req: ServerlessRequest, res: ServerlessResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ ok: false });
    return;
  }

  if (!isSessionValid(req)) {
    res.status(401).json({ ok: false, error: 'No autorizado' });
    return;
  }

  const proyectoIdParam = req.query?.proyectoId;
  const proyectoId = Array.isArray(proyectoIdParam) ? proyectoIdParam[0] : proyectoIdParam;

  if (!proyectoId) {
    res.status(400).json({ ok: false, error: 'Falta el parámetro proyectoId.' });
    return;
  }

  const client = getSanityClient();
  if (!client) {
    res.status(500).json({ ok: false, error: 'Falta configurar SANITY_READ_TOKEN en el servidor.' });
    return;
  }

  try {
    // $proyectoId va como parámetro de la query de Sanity, no interpolado a
    // mano, para evitar inyección de GROQ.
    const pagos = await client.fetch<PagoDoc[]>(QUERY, { proyectoId });
    res.status(200).json({ ok: true, pagos });
  } catch {
    res.status(500).json({ ok: false, error: 'No se pudieron obtener los pagos.' });
  }
}
