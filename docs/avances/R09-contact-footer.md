# Avance R09 — Contact (envío con Nodemailer) + Footer

## Qué se hizo
- **Función `api/contacto.ts` (nueva):** sigue el esquema de `login.ts`: tipos de `./_http.js` y fail closed.
  - Si no es `POST`, devuelve 405. Si falta `SMTP_USER`, `SMTP_PASS` o `CONTACT_TO`, devuelve 500.
  - Honeypot: si `website` llega con contenido, devuelve `200 { ok: true }` sin enviar nada.
  - Validación después de `trim`: `name` de 1 a 100, `email` de hasta 200 y con regex simple, `message` de 5 a 5000. Si algo falla, 400. Los saltos de línea de `name` y `email` se reemplazan por espacios, así que un email con salto queda inválido por la regex.
  - Transporte Gmail (`smtp.gmail.com:465`, `secure`). El remitente es `Web Viale Sistemas <SMTP_USER>`, el destinatario `CONTACT_TO` y el `replyTo` es el nombre y el email del usuario. El asunto es `Nuevo mensaje desde la web — {name}`.
  - Se arma un `text` y un `html` con nombre, email y mensaje. En el HTML se escapa todo lo que escribió el usuario (`& < > " '`) y los saltos de línea pasan a `<br>`.
  - Si `sendMail` falla: `console.error` y 500. Si sale bien: 200.
- **`.env.example`:** se agregaron `SMTP_USER`, `SMTP_PASS` y `CONTACT_TO` con un comentario en el mismo estilo: que la clave es una contraseña de aplicación y no la de la cuenta, y que no llevan prefijo `VITE_`.
- **Formulario (`Contact.tsx`):**
  - Se sacó EmailJS y con eso las claves hardcodeadas. El submit hace `fetch('/api/contacto', POST JSON)`.
  - El estado es `'idle' | 'sending' | 'sent' | 'error'`.
    - Mientras está en `sending`, el botón queda `disabled` y dice "Enviando…".
    - En `sent`, se limpia el formulario y se muestra el mensaje con `role="status"`.
    - En `error` (respuesta no ok o falla de red), se muestra el mensaje con `role="alert"` y los datos no se borran.
    - Los dos mensajes se ocultan a los 5 s.
  - Los labels están asociados a los campos (`htmlFor`/`id`: `contact-name`, `contact-email`, `contact-message`). Se cambió el placeholder del mensaje.
  - El campo trampa `name="website"` está en un `div.form-trap` con `aria-hidden="true"`. El input lleva `tabIndex={-1}` y `autoComplete="off"`, y su valor se manda en el body.
- **Contenido:** el texto nuevo, con la segunda oración en `<strong>`. Las filas van en orden: WhatsApp (link `wa.me` con el mensaje pasado por `encodeURIComponent`), Instagram, Email (`mailto`, sin `target`), LinkedIn y Ubicación (sin link). Se sacó GitHub.
- **Íconos (`ContactIcons.tsx`, nuevo):** `WhatsAppIcon`, `InstagramIcon`, `MailIcon`, `LinkedInIcon` y `PinIcon`, con el mismo `iconProps` que `ServiceIcons.tsx`.
- **`Contact.css`:**
  - Párrafo en peso 400, con el `strong` en `--text` y peso 500.
  - Íconos de 18px en `--accent`. Los links van en `--text` y pasan a `--accent` en hover, sin subrayado.
  - Labels en Chakra Petch, en mayúsculas.
  - Foco de los campos: borde `--accent` y sombra `--accent-soft`.
  - Botón: `--on-accent` y display 600. Hover en `--accent3`. En `:disabled`, opacidad 0.6 y sin movimiento.
  - Error en `--danger` y estilos de `.form-trap`.
  - `:focus-visible` en los links y en el botón.
- **Footer:**
  - A la izquierda, el isotipo mono de 22px y `© {año} Viale Sistemas · San Nicolás, Buenos Aires`. El año sale de `new Date().getFullYear()`.
  - A la derecha, los links Instagram, LinkedIn y GitHub (se sacó Twitter), en Chakra Petch y en mayúsculas, con `:focus-visible`.
  - Se mantienen el borde superior y el layout responsive.
- **Dependencias:** se instalaron `nodemailer` y `@types/nodemailer` (dev). Se verificó que `@emailjs/browser` y `@fortawesome/*` no se usaban fuera de `Contact.tsx` (FontAwesome no se usaba en ningún lado) y se desinstalaron con `npm uninstall`.
- `npm run build` compila sin errores. Solo aparece el aviso de tamaño de chunk de `react-pdf`, que ya estaba. `npx tsc -p api/tsconfig.json` también pasa.

## Archivos creados / modificados
- `api/contacto.ts`: creado.
- `src/Components/Contact/ContactIcons.tsx`: creado.
- `docs/avances/R09-contact-footer.md`: creado.
- `.env.example`: modificado.
- `src/Components/Contact/Contact.tsx` y `Contact.css`: modificados.
- `src/Components/Footer/Footer.tsx` y `Footer.css`: modificados.
- `package.json` y `package-lock.json`: modificados.

## Decisiones tomadas durante la implementación
- **Ocultar los mensajes:** se hace con un `useEffect` que depende de `status`, con limpieza del timer. Así un segundo envío no deja un timeout viejo que oculte el mensaje nuevo antes de tiempo.
- **Doble submit:** además del `disabled`, `handleSubmit` sale enseguida si ya está en `sending`.
- **Campo trampa:** el contenedor tiene un `<label>` para que el input no quede "sin etiqueta" en los validadores. Igual es invisible y queda fuera del árbol de accesibilidad por el `aria-hidden`.
- **Mobile:** los links de contacto llevan `overflow-wrap: anywhere` por si el email no entra en pantallas angostas. En el footer, isotipo y texto se apilan (≤768px), en línea con el `text-align: center` que ya estaba.
- **Hover del botón deshabilitado:** se fija `background: var(--accent)` y `transform: none` para que no cambie de color ni se mueva.

## Desvíos respecto al brief
- **La prueba de envío no se hizo con `vercel dev`.** `vercel dev` no arranca: `.vercel/project.json` apunta a un proyecto que la CLI reporta como "deleted, transferred to a new Team, or you don't have access to it anymore", y pide confirmar con `--yes` para vincular o crear uno. No se confirmó para no crear ni re-vincular un proyecto de Vercel sin tu OK. En su lugar se corrió **el handler real** (`api/contacto.ts`) con Node 24, cargando el `.env` con `process.loadEnvFile` y con un `req`/`res` simulados. Resultados:

  | Caso | Respuesta |
  |---|---|
  | `GET` | 405 `{ ok: false }` |
  | Honeypot lleno | 200 `{ ok: true }` (no envía) |
  | Email inválido (`ana@`) | 400 `{ ok: false }` |
  | Mensaje solo con espacios | 400 `{ ok: false }` |
  | Nombre que es solo un salto de línea | 400 `{ ok: false }` |
  | Envío real | 200 `{ ok: true }`: Gmail aceptó el mensaje con las credenciales del `.env` |

  El envío real usó nombre `Prueba R09 <script>`, email `santicbsn9@gmail.com` y un mensaje de dos líneas con `<b>html</b> &`. Sirve para comprobar el escapado y el Reply-To.

## Pendientes o problemas encontrados
- **Revisar en la casilla `CONTACT_TO`** que llegó el mail "Nuevo mensaje desde la web — Prueba R09 <script>". El `<script>` y el `<b>` tienen que verse como texto y el mensaje en dos líneas. Al tocar "Responder", el destinatario tiene que ser `santicbsn9@gmail.com`.
- **Re-vincular Vercel:** correr `vercel link` (o `vercel dev` y confirmar) eligiendo el proyecto correcto del team, y después repetir la prueba desde el formulario con `vercel dev`.
- No se probó el formulario en el navegador: el estado "Enviando…", los mensajes y el layout a 390px quedan para revisar a ojo.
- `npm audit` reporta 25 vulnerabilidades (3 moderate, 22 high) en el árbol de dependencias. Ya estaban antes de este brief y no se tocaron.

## Cómo probarlo
1. Re-vincular el proyecto (`vercel link`), tener el `.env` con las tres variables y correr `vercel dev`.
2. Ir a `#contacto` y enviar el formulario con datos válidos. El botón dice "Enviando…" y queda bloqueado, después aparece "Mensaje enviado. Te respondo pronto." y el formulario se limpia. El mail llega a `CONTACT_TO`, y "Responder" va al email cargado.
3. Escribir el email mal (por ejemplo, editar el `type` en DevTools para saltar la validación del navegador) o mandar `curl -X POST localhost:3000/api/contacto -H "Content-Type: application/json" -d '{"name":"A","email":"x","message":"hola hola"}'`. Responde 400 y el formulario muestra el error sin borrar lo escrito.
4. Honeypot: `curl ... -d '{"name":"A","email":"a@b.com","message":"hola hola","website":"x"}'`. Responde `{ ok: true }` y no llega ningún mail.
5. Sección Contact: texto nuevo, 5 filas con íconos SVG y sin emojis. WhatsApp abre el chat con el mensaje ya escrito.
6. Footer: isotipo, año actual y los links INSTAGRAM, LINKEDIN y GITHUB.
7. DevTools a 390px: sin scroll horizontal.
8. `npm run build`.
