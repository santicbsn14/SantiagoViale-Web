// Código de comprobante determinístico: mismo pago (mismo _id + misma fecha)
// siempre da el mismo código REC-YYYYMMDD-XXXX. Sin dependencias — se importa
// estático tanto desde AdminBotonBoleta (nombre de archivo) como desde
// src/pdf/ComprobantePago.tsx (texto del código en el PDF), así el chunk
// pesado de @react-pdf/renderer no se arrastra hasta acá.

import type { Pago } from './adminApi';

function formatYYYYMMDD(iso: string | null): string {
  if (!iso) return '00000000';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '00000000';

  const yyyy = date.getFullYear().toString().padStart(4, '0');
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  const dd = date.getDate().toString().padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
}

// FNV-1a de 32 bits: hash puro y sincrónico (no crypto.subtle, que es async),
// determinístico — el mismo string siempre da el mismo resultado.
function hashCorto(input: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(36).toUpperCase().padStart(4, '0').slice(-4);
}

export function generarCodigoComprobante(pago: Pago): string {
  return `REC-${formatYYYYMMDD(pago.fecha)}-${hashCorto(pago._id)}`;
}
