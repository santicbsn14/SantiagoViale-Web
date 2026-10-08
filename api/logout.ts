// Vercel serverless function (Node.js runtime). Clears the admin session
// cookie. Doesn't require a valid session — clearing the cookie is always
// safe, and the client must be able to log out even with an expired one.
//
// Local testing: same as login.ts — run `vercel dev`, not `npm run dev`.

import type { ServerlessRequest, ServerlessResponse } from './_http.js';
import { buildClearSessionCookieHeader } from './_session.js';

export default function handler(req: ServerlessRequest, res: ServerlessResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false });
    return;
  }

  res.setHeader('Set-Cookie', buildClearSessionCookieHeader());
  res.status(200).json({ ok: true });
}
