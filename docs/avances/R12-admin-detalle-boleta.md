# Avance R12 — Admin: detalle de proyecto y boleta PDF

Rama: `rediseno-admin` (sin mergear). Se suma a los cambios de R11, que tampoco están commiteados todavía.

## Qué se hizo
- **Boleta PDF (`src/pdf/ComprobantePago.tsx`):**
  - **Fuentes:** se registran `'Chakra Petch'` (600) e `'IBM Plex Sans'` (400 y 600) con `Font.register`, importando los `.ttf` como URL de Vite. Se agregó `Font.registerHyphenationCallback((w) => [w])`. El registro vive en este archivo, así que solo se ejecuta con el import dinámico de `AdminBotonBoleta`.
  - **Estructura nueva**, con la misma lógica y los mismos textos de datos:
    1. Header con el logo (150pt) a la izquierda y, a la derecha, "Santiago Viale" / "Desarrollo de software a medida" en `MUTED` 8.5pt, alineados abajo.
    2. Línea de degradé de 2pt (`Svg` + `LinearGradient` `#1dcdff` → `#34f4c6` 60% → `#21d0b3`).
    3. "COMPROBANTE DE PAGO" con el código en Chakra 600 15pt `NAVY`, y "Emitido el …" a la derecha.
    4. "RECIBIDO DE" y "PROYECTO" en dos columnas (`flex: 1`, `gap` 24).
    5. Caja del monto: fondo `SOFT`, radio 6, borde izquierdo de 3pt `MINT`, monto en Chakra 600 28pt `NAVY`.
    6. Estado de cuenta con la barra de cobro: pista de 5pt `BORDER` y relleno `MINT`, limitada a 0–100. No se muestra si el presupuesto es 0 o null. Después, el divisor y "SALDO RESTANTE" en `NAVY`.
    7. Pie absoluto (`bottom: 36`, márgenes de 52pt): línea de degradé de 1pt, datos de contacto y la nota de "no reemplaza una factura".
  - **Estilos generales:** página A4 blanca, IBM Plex Sans 10pt, `TEXT`, padding 44 / 52 / 40. Etiquetas en Chakra 600 7.5pt `LABEL` con `letterSpacing` 1.2. Ningún texto va en menta.
  - Ya no quedan `#61dafb`, `Helvetica` ni "Santiago Viale — Desarrollo Web".
- **Detalle de proyecto:**
  - Bloque "**XX%** cobrado" con la barra debajo (pista de 6px, degradé y menta sólido al 100%), entre la grilla de datos y "Pagos", solo si el presupuesto es mayor a 0. La barra lleva `aria-hidden="true"`.
  - "← Volver" en Chakra Petch 500, 0.8rem, uppercase, `letter-spacing: 0.08em`, con `:focus-visible` menta.
  - `.admin-detalle__label` en Chakra 500 con `letter-spacing: 0.1em`, error en `--danger` y sin `min-height: 100vh`. El título de pagos ya estaba en Chakra 700.
- **`AdminBotonBoleta.css`:** el error pasa a `--danger`.
- **Revisión final del admin:** se buscaron `#61dafb`, `#f7c948`, `rgba(97, 218, 251`, `rgba(247, 201, 72`, `font-weight: 800`, `accent2`, `Helvetica` y cualquier `rgba(` en `src/Pages/AdminPage*`, `src/Components/Admin*` y `src/pdf/`.
  - Antes de este brief quedaban: `--accent2` en `.admin-detalle__error` y `.admin-boton-boleta__error`, y `#61dafb` + `Helvetica` en la boleta. Los tres se corrigieron arriba.
  - Después de los cambios, la búsqueda da **cero coincidencias**.
- **PDF de ejemplo:** `docs/avances/R12-boleta-ejemplo.pdf`, generado con el botón real "Generar boleta" del build, con datos ficticios (ver "Cómo se verificó").

## Archivos creados / modificados
- `src/pdf/ComprobantePago.tsx`: modificado (rediseño completo).
- `src/assets/logo-boleta.png`: reemplazado (ver Desvíos).
- `src/assets/fonts/ChakraPetch-SemiBold.ttf`, `IBMPlexSans-Regular.ttf` e `IBMPlexSans-SemiBold.ttf`: creados (ver Desvíos).
- `src/Components/AdminProyectoDetalle/AdminProyectoDetalle.tsx` y `.css`: modificados.
- `src/Components/AdminBotonBoleta/AdminBotonBoleta.css`: modificado.
- `docs/avances/R12-boleta-ejemplo.pdf`: creado.
- `docs/avances/R12-admin-detalle-boleta.md`: creado.

## Decisiones tomadas durante la implementación
- **Porcentaje del detalle con `Math.floor`:** así "100%" aparece solo cuando está realmente pagado completo, y coincide con el relleno sólido. Con redondeo, un 99,6% diría "100%" con la barra todavía en degradé.
- **Espaciado entre la grilla y "Pagos":** la grilla bajó su `margin-bottom` a 1.75rem y `.admin-detalle__pagos` tiene `padding-top: 1.25rem`. Así quedan 3rem con o sin barra. Se usó padding y no margin porque el margin colapsaría con el de arriba.
- **Barra del detalle:** se copió el estilo de `AdminProyectoRow` al CSS del detalle, como permitía el brief. El ancho va por la custom property `--progreso`.
- **Degradé del PDF:** es un `Svg` con `viewBox="0 0 100 alto"` y `preserveAspectRatio="none"`, para que se estire al ancho disponible sin calcular puntos. Está en un helper `LineaDegrade` que se usa en el header (2pt) y en el pie (1pt), con ids distintos.
- **El pie va con `fixed`**, además de `position: absolute`, por si algún día la boleta pasa a dos páginas.

## Desvíos respecto al brief
- **Los assets que el brief daba por cargados no estaban en el repo:**
  - `src/assets/logo-boleta.png` seguía siendo el viejo (318×274, sin cambios desde el commit "subiendo admin").
  - La carpeta `src/assets/fonts/` no existía.
  - Para no frenar el brief se resolvió así (**revisar y, si tenés tus versiones, reemplazar los archivos con el mismo nombre**):
    - **Logo:** se renderizó `src/assets/brand/logo-horizontal-positivo.svg` a PNG de **1400×289** con fondo transparente. Es exactamente el tamaño que indicaba el brief, porque sale de la proporción del SVG. Tiene el isotipo con su degradé y "Viale Sistemas" en navy.
    - **Fuentes:** se bajaron las TTF oficiales estáticas (licencia OFL): Chakra Petch SemiBold del repo de Google Fonts (`google/fonts`) e IBM Plex Sans Regular y SemiBold del repo de IBM (`IBM/plex`).
- **Assets sin uso:** `src/assets/Santiago-Viale-Sistemas.png` ya no existía. Los únicos archivos de imagen sin referencias en `src/` son `src/assets/brand/isotipo-color.svg` y `src/assets/brand/logo-horizontal-positivo.svg`. **No se borraron:** son assets nuevos de la marca, no viejos, y el segundo es la fuente del logo de la boleta.

## Pendientes o problemas encontrados
- **Fechas corridas un día (ya pasaba antes, fuera de alcance):** `formatFecha` (`src/utils/adminApi.ts`) hace `new Date('2026-08-04')`, que JS interpreta como UTC. En Argentina (UTC−3) eso muestra **03/08/2026**.
  - Si Sanity guarda fechas sin hora (`date`), afecta la fecha de inicio del detalle, la fecha de pago de la boleta y el `YYYYMMDD` del código `REC-…` (`comprobanteCodigo.ts`).
  - No se tocó porque el brief prohíbe modificar los dos archivos. Además, corregir el código cambiaría los códigos de boletas ya emitidas.
  - Conviene revisarlo en un brief aparte con una fecha real de Sanity.
- **IBM Plex Sans SemiBold** queda registrada pero hoy la boleta no la usa (los textos en negrita van en Chakra). react-pdf solo descarga las fuentes que se usan, así que no pesa en la generación.
- Sigue el aviso de tamaño de chunk de `react-pdf` en el build (ya estaba antes; es el chunk lazy).
- **Badge "pausado" (de R11):** sigue sin verificarse a ojo. El proyecto ficticio `demo-2` estaba pausado, pero no se capturó su color.

## Cómo se verificó
- `npm run build` y `npx tsc -p api/tsconfig.json` compilan sin errores.
- **Bundle público:**
  - En el build, `index-*.js` no tiene ningún `.ttf`, ni `logo-boleta` ni `registerHyphenationCallback`; solo los `import()` de `ComprobantePago-*.js` y `react-pdf.browser-*.js`.
  - Las tres fuentes y el logo solo se referencian desde `ComprobantePago-*.js`.
  - En el navegador, la home no pide ninguno de esos archivos. En el detalle tampoco se piden hasta tocar "Generar boleta". Ahí se descargan `ComprobantePago`, `react-pdf.browser`, `IBMPlexSans-Regular`, `ChakraPetch-SemiBold` y `logo-boleta`.
- **Detalle y boleta (Chromium headless sobre `vite preview`)**, con `/api/proyectos` y `/api/pagos` respondidos por el script con datos ficticios:
  - Presupuesto $850.000 y pagado $510.000: "60% cobrado" con la barra al 60% en degradé.
  - Sin presupuesto: no hay barra.
  - Pagado completo: "100% cobrado" con relleno sólido.
  - "← Volver" en Chakra Petch 500 uppercase.
  - `scrollWidth` igual al viewport a 1440 y 390px.
  - El clic en "Generar boleta" descargó `comprobante-REC-20261001-D8T7.pdf` (nombre y formato de código sin cambios).
- **PDF:** se renderizó con pdf.js y se revisó a ojo: una página, logo nuevo, fuentes de marca, degradés, monto en navy en la caja con borde menta, barra al 60% y pie con los contactos. Ningún texto va en menta.

## Cómo probarlo
1. `vercel dev` (o `npm run build` + `vite preview` para la UI) y entrar a `/admin`.
2. Abrir un proyecto con presupuesto: arriba de "Pagos" tiene que verse "XX% cobrado" con la barra. Si está pagado completo, el relleno es menta sólido.
3. Navegar con Tab hasta "← Volver": muestra el contorno menta.
4. "Generar boleta" en un pago: se descarga `comprobante-REC-….pdf`. Revisar el logo, las fuentes, la barra y el pie. Conviene imprimirla una vez para confirmar que se lee bien.
5. En DevTools → Network, recargar la home: no tiene que aparecer ningún `.ttf`, `react-pdf` ni `ComprobantePago`.
6. Modo responsive a 390px en el detalle: sin scroll horizontal.
7. Comparar con `docs/avances/R12-boleta-ejemplo.pdf`.
