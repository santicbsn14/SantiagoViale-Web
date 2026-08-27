// Shared Sanity client factory for serverless functions. Prefixed with "_" so
// Vercel does NOT deploy this file as a route — it's a plain module imported
// by the actual endpoint files (proyectos.ts, pagos.ts).
//
// This talks to a separate, read-only Sanity project (gestion-viale-sistemas).
// The read token lives in SANITY_READ_TOKEN, a server-only env var — it must
// never be prefixed with VITE_, which would bundle it into the client build.

import { createClient, type SanityClient } from '@sanity/client';

const PROJECT_ID = 'x36vjzgv';
const DATASET = 'production';
const API_VERSION = '2024-01-01';

/**
 * Returns a configured Sanity client, or `null` if SANITY_READ_TOKEN isn't
 * set on the server. Callers should fail with a 500 rather than querying
 * without a token.
 */
export function getSanityClient(): SanityClient | null {
  const token = process.env.SANITY_READ_TOKEN;
  if (!token) {
    return null;
  }

  return createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: API_VERSION,
    useCdn: false,
    token,
  });
}
