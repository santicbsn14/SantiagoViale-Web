// Vercel serverless function (Node.js runtime). GET /api/proyectos
//
// Local testing: `npm run dev` (Vite) does NOT serve this folder. To test it
// locally, run `vercel dev` from this directory instead (needs the Vercel CLI
// and a `.env` file with SANITY_READ_TOKEN set — see .env.example).

import type { ServerlessRequest, ServerlessResponse } from './_http.js';
import { getSanityClient } from './_sanityClient.js';
import { isSessionValid } from './_session.js';

interface ProyectoDoc {
  _id: string;
  titulo: string;
  presupuesto: number | null;
  moneda: string | null;
  estado: string | null;
  fechaInicio: string | null;
  clienteNombre: string | null;
  clienteContacto: string | null;
  padreId: string | null;
  pagado: number;
}

interface ProyectoConSaldo extends ProyectoDoc {
  saldo: number;
}

const QUERY = `*[_type == "proyecto"] | order(titulo asc) {
  _id,
  titulo,
  presupuesto,
  moneda,
  estado,
  fechaInicio,
  "clienteNombre": cliente->nombre,
  "clienteContacto": cliente->contacto,
  "padreId": proyectoPadre._ref,
  "pagado": coalesce(math::sum(*[_type == "pago" && references(^._id)].monto), 0)
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

  const client = getSanityClient();
  if (!client) {
    res.status(500).json({ ok: false, error: 'Falta configurar SANITY_READ_TOKEN en el servidor.' });
    return;
  }

  try {
    const proyectos = await client.fetch<ProyectoDoc[]>(QUERY);

    // Saldo se calcula acá, no en GROQ: repetir el math::sum correlacionado
    // dentro de la misma proyección duplicaría esa subquery por proyecto
    // (GROQ no permite referenciar un alias ya calculado en el mismo objeto).
    const proyectosConSaldo: ProyectoConSaldo[] = proyectos.map((proyecto) => ({
      ...proyecto,
      saldo: (proyecto.presupuesto ?? 0) - proyecto.pagado,
    }));

    res.status(200).json({ ok: true, proyectos: proyectosConSaldo });
  } catch {
    res.status(500).json({ ok: false, error: 'No se pudieron obtener los proyectos.' });
  }
}
