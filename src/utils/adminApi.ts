// Shared data layer for the /admin panel: types matching what api/proyectos.ts
// and api/pagos.ts return, fetch helpers, and formatting/grouping utilities.
// Both AdminDashboard and (later) AdminProyectoDetalle import from here so
// there's a single source of truth instead of duplicating this per view.

export type Estado = 'activo' | 'terminado' | 'pausado' | null;

export interface Proyecto {
  _id: string;
  titulo: string;
  presupuesto: number | null;
  moneda: string | null;
  estado: Estado;
  fechaInicio: string | null;
  clienteNombre: string | null;
  clienteContacto: string | null;
  padreId: string | null;
  pagado: number;
  saldo: number;
}

export interface Pago {
  _id: string;
  monto: number;
  fecha: string | null;
  metodo: string | null;
  nota: string | null;
}

// Lanzado cuando un fetch a los datos devuelve 401: la cookie de sesión no
// existe o venció. Los componentes lo distinguen de un error genérico para
// mandar al usuario de vuelta al login en vez de mostrar un mensaje de error.
export class UnauthorizedError extends Error {}

async function fetchJson<T>(url: string): Promise<T> {
  // credentials: 'same-origin' es el default del browser para fetch a rutas
  // del mismo origen, pero lo dejamos explícito: sin esto la cookie httpOnly
  // de sesión no viajaría con la request.
  const response = await fetch(url, { credentials: 'same-origin' });
  const data = await response.json().catch(() => null);

  if (response.status === 401) {
    throw new UnauthorizedError('No autorizado');
  }

  if (!response.ok || !data?.ok) {
    const message = typeof data?.error === 'string' ? data.error : 'Error al obtener los datos.';
    throw new Error(message);
  }

  return data as T;
}

export async function fetchProyectos(): Promise<Proyecto[]> {
  const data = await fetchJson<{ ok: true; proyectos: Proyecto[] }>('/api/proyectos');
  return data.proyectos;
}

export async function fetchPagos(proyectoId: string): Promise<Pago[]> {
  const data = await fetchJson<{ ok: true; pagos: Pago[] }>(
    `/api/pagos?proyectoId=${encodeURIComponent(proyectoId)}`,
  );
  return data.pagos;
}

export function formatARS(value: number): string {
  return `$${Math.round(value).toLocaleString('es-AR')}`;
}

const fechaFormatter = new Intl.DateTimeFormat('es-AR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

export function formatFecha(iso: string | null): string {
  if (!iso) return '—';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';
  return fechaFormatter.format(date);
}

export interface FilaProyecto {
  proyecto: Proyecto;
  esAmpliacion: boolean;
}

// GROQ ya trae los proyectos ordenados por título; acá solo reordenamos para
// que los "activo" queden arriba. Array.prototype.sort es estable, así que
// dentro de cada grupo (activo / no activo) se conserva el orden por título.
function ordenarActivosPrimero(proyectos: Proyecto[]): Proyecto[] {
  return [...proyectos].sort((a, b) => {
    const aActivo = a.estado === 'activo' ? 0 : 1;
    const bActivo = b.estado === 'activo' ? 0 : 1;
    return aActivo - bActivo;
  });
}

// Agrupa las ampliaciones debajo de su proyecto padre (un solo nivel). Un
// proyecto es "de nivel superior" si no tiene padreId, o si lo tiene pero ese
// padre no está en la lista (referencia rota/ausente): no se pierde, se
// muestra igual como fila de nivel superior. Mismo algoritmo que en el
// Resumen financiero del Sanity Studio.
export function organizarConAmpliaciones(proyectos: Proyecto[]): FilaProyecto[] {
  const porId = new Map(proyectos.map((p) => [p._id, p]));
  const hijosPorPadre = new Map<string, Proyecto[]>();
  const nivelSuperior: Proyecto[] = [];

  for (const proyecto of proyectos) {
    if (proyecto.padreId && porId.has(proyecto.padreId)) {
      const hijos = hijosPorPadre.get(proyecto.padreId) ?? [];
      hijos.push(proyecto);
      hijosPorPadre.set(proyecto.padreId, hijos);
    } else {
      nivelSuperior.push(proyecto);
    }
  }

  const filas: FilaProyecto[] = [];
  for (const padre of ordenarActivosPrimero(nivelSuperior)) {
    filas.push({ proyecto: padre, esAmpliacion: false });
    const hijos = hijosPorPadre.get(padre._id);
    if (hijos) {
      for (const hijo of ordenarActivosPrimero(hijos)) {
        filas.push({ proyecto: hijo, esAmpliacion: true });
      }
    }
  }
  return filas;
}
