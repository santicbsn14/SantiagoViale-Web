// Shared minimal types for Vercel Node.js serverless functions.
// Prefixed with "_" so Vercel does NOT deploy this file as a route — it's a
// plain module imported by the actual endpoint files (login.ts, proyectos.ts,
// pagos.ts). We hand-roll these instead of depending on @vercel/node so the
// endpoints stay dependency-free for typing purposes.
//
// req.body and req.query are populated by Vercel's Node.js runtime itself
// (JSON body parsing, query-string parsing) before our handler runs — that
// happens regardless of which types we import here. req.headers is the raw
// Node http.IncomingMessage headers object, always present — _session.ts
// parses the "cookie" header from it by hand rather than relying on any
// platform helper we can't verify locally.

export interface ServerlessRequest {
  method?: string;
  body?: unknown;
  query?: Record<string, string | string[] | undefined>;
  headers?: Record<string, string | string[] | undefined>;
}

export interface ServerlessResponse {
  status(code: number): ServerlessResponse;
  json(body: unknown): void;
  // Raw http.ServerResponse primitive (not a Vercel-added helper) — used to
  // set the Set-Cookie header for the session.
  setHeader(name: string, value: string | string[]): void;
}
