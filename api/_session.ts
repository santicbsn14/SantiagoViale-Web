// Signed, httpOnly session cookie for the /admin panel. Prefixed with "_" so
// Vercel does NOT deploy this file as a route — it's a plain module imported
// by login.ts (issues the cookie) and proyectos.ts/pagos.ts (validate it).
//
// Cookie value format: "<issuedAtMs>.<hmacHex>" — an issuance timestamp plus
// its HMAC-SHA256 signature (keyed with SESSION_SECRET, server-only, never
// prefixed with VITE_). No JSON/base64, just enough to check integrity and
// expiration. Uses node:crypto only — no new dependencies.

import { createHmac, timingSafeEqual } from 'node:crypto';
import type { ServerlessRequest } from './_http.js';

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 días

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('hex');
}

/**
 * Builds the signed cookie value. Returns `null` if SESSION_SECRET isn't
 * configured — callers must fail closed (500), never issue an unsigned
 * cookie.
 */
export function createSessionCookieValue(): string | null {
  const secret = process.env.SESSION_SECRET;
  if (!secret) return null;

  const issuedAt = Date.now().toString();
  const signature = sign(issuedAt, secret);
  return `${issuedAt}.${signature}`;
}

/**
 * Builds the full `Set-Cookie` header value for a given session value.
 * `Secure` is only added when NODE_ENV is production, so `vercel dev`
 * (plain http, local) still works.
 */
export function buildSessionCookieHeader(value: string): string {
  const parts = [
    `${SESSION_COOKIE_NAME}=${value}`,
    'HttpOnly',
    'Path=/',
    'SameSite=Lax',
    `Max-Age=${SESSION_MAX_AGE_SECONDS}`,
  ];

  if (process.env.NODE_ENV === 'production') {
    parts.push('Secure');
  }

  return parts.join('; ');
}

function parseCookieHeader(header: string | undefined): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!header) return cookies;

  for (const pair of header.split(';')) {
    const separatorIndex = pair.indexOf('=');
    if (separatorIndex === -1) continue;

    const key = pair.slice(0, separatorIndex).trim();
    const value = pair.slice(separatorIndex + 1).trim();
    if (key) cookies[key] = decodeURIComponent(value);
  }

  return cookies;
}

/**
 * Validates the session cookie on an incoming request: signature integrity
 * (via crypto.timingSafeEqual, not a plain string compare) and expiration.
 * Fails closed — any missing/malformed/unsigned piece returns `false`,
 * including when SESSION_SECRET itself isn't configured.
 */
export function isSessionValid(req: ServerlessRequest): boolean {
  const secret = process.env.SESSION_SECRET;
  if (!secret) return false;

  const cookieHeader = req.headers?.cookie;
  const cookies = parseCookieHeader(typeof cookieHeader === 'string' ? cookieHeader : undefined);
  const value = cookies[SESSION_COOKIE_NAME];
  if (!value) return false;

  const separatorIndex = value.indexOf('.');
  if (separatorIndex === -1) return false;

  const issuedAtStr = value.slice(0, separatorIndex);
  const signature = value.slice(separatorIndex + 1);
  if (!issuedAtStr || !signature) return false;

  const expectedSignature = sign(issuedAtStr, secret);

  const signatureBuffer = Buffer.from(signature, 'hex');
  const expectedBuffer = Buffer.from(expectedSignature, 'hex');
  if (signatureBuffer.length !== expectedBuffer.length) return false;
  if (!timingSafeEqual(signatureBuffer, expectedBuffer)) return false;

  const issuedAt = Number(issuedAtStr);
  if (!Number.isFinite(issuedAt)) return false;

  const ageMs = Date.now() - issuedAt;
  if (ageMs < 0 || ageMs > SESSION_MAX_AGE_SECONDS * 1000) return false;

  return true;
}
