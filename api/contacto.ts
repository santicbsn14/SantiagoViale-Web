// Vercel serverless function (Node.js runtime) for the contact form.
// Sends the message by Gmail SMTP with Nodemailer.
//
// Local testing: `npm run dev` (Vite) does NOT serve this folder. Run
// `vercel dev` from this directory instead (needs a `.env` file with
// SMTP_USER, SMTP_PASS and CONTACT_TO set — see .env.example).

import nodemailer from 'nodemailer';
import type { ServerlessRequest, ServerlessResponse } from './_http.js';

interface ContactRequestBody {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Trims and strips line breaks, so the value is safe for headers
// (subject, reply-to).
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

export default async function handler(req: ServerlessRequest, res: ServerlessResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false });
    return;
  }

  // Server-side only — must never be prefixed with VITE_.
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const contactTo = process.env.CONTACT_TO;

  if (!smtpUser || !smtpPass || !contactTo) {
    // Server misconfigured — fail closed.
    res.status(500).json({ ok: false });
    return;
  }

  const body = (req.body ?? {}) as ContactRequestBody;

  // Honeypot: real users never see the "website" field. If it comes filled,
  // it's a bot — answer ok so it doesn't retry, but send nothing.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    res.status(200).json({ ok: true });
    return;
  }

  const name = typeof body.name === 'string' ? singleLine(body.name) : '';
  const email = typeof body.email === 'string' ? singleLine(body.email) : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  const isValid =
    name.length >= 1 && name.length <= 100 &&
    email.length <= 200 && EMAIL_RE.test(email) &&
    message.length >= 5 && message.length <= 5000;

  if (!isValid) {
    res.status(400).json({ ok: false });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const messageHtml = escapeHtml(message).replace(/\r?\n/g, '<br>');

  try {
    await transporter.sendMail({
      from: { name: 'Web Viale Sistemas', address: smtpUser },
      to: contactTo,
      replyTo: { name, address: email },
      subject: `Nuevo mensaje desde la web — ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
      html:
        `<p><strong>Nombre:</strong> ${escapeHtml(name)}</p>` +
        `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` +
        `<p><strong>Mensaje:</strong></p>` +
        `<p>${messageHtml}</p>`,
    });
  } catch (err) {
    console.error('Error enviando el mensaje de contacto:', err);
    res.status(500).json({ ok: false });
    return;
  }

  res.status(200).json({ ok: true });
}
