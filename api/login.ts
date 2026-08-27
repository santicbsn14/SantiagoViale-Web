// Vercel serverless function (Node.js runtime). Deployed automatically because
// it lives under /api at the project root — no vercel.json/vite.config changes needed.
//
// Local testing: `npm run dev` (Vite) does NOT serve this folder. To test it
// locally, run `vercel dev` from this directory instead (needs the Vercel CLI
// and a `.env` file with ADMIN_PASSWORD set — see .env.example).

import type { ServerlessRequest, ServerlessResponse } from './_http.js';
import { buildSessionCookieHeader, createSessionCookieValue } from './_session.js';

interface LoginRequestBody {
  password?: unknown;
}

export default function handler(req: ServerlessRequest, res: ServerlessResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false });
    return;
  }

  // process.env.ADMIN_PASSWORD is read server-side only — it must never be
  // prefixed with VITE_, which would bundle it into the client build.
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    // Server misconfigured (env var not set) — fail closed, don't 401 a
    // request that could otherwise "match" an empty/undefined password.
    res.status(500).json({ ok: false });
    return;
  }

  const body = (req.body ?? {}) as LoginRequestBody;
  const password = typeof body.password === 'string' ? body.password : '';

  if (!password || password !== adminPassword) {
    res.status(401).json({ ok: false });
    return;
  }

  const sessionValue = createSessionCookieValue();
  if (!sessionValue) {
    // SESSION_SECRET missing — fail closed, don't log in without a cookie
    // (the client would think it's authenticated but every data fetch
    // would 401).
    res.status(500).json({ ok: false });
    return;
  }

  res.setHeader('Set-Cookie', buildSessionCookieHeader(sessionValue));
  res.status(200).json({ ok: true });
}
