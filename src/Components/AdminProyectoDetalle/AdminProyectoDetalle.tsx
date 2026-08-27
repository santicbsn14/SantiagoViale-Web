import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AdminEstadoBadge from '../AdminEstadoBadge/AdminEstadoBadge';
import AdminBotonBoleta from '../AdminBotonBoleta/AdminBotonBoleta';
import {
  fetchPagos,
  fetchProyectos,
  formatARS,
  formatFecha,
  UnauthorizedError,
  type Pago,
  type Proyecto,
} from '../../utils/adminApi';
import './AdminProyectoDetalle.css';

interface AdminProyectoDetalleProps {
  onUnauthorized: () => void;
}

function AdminProyectoDetalle({ onUnauthorized }: AdminProyectoDetalleProps) {
  const { id } = useParams<{ id: string }>();

  const [proyecto, setProyecto] = useState<Proyecto | null>(null);
  const [proyectoPadre, setProyectoPadre] = useState<Proyecto | null>(null);
  const [pagos, setPagos] = useState<Pago[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    let mounted = true;

    setProyecto(null);
    setProyectoPadre(null);
    setPagos(null);
    setError(null);
    setNotFound(false);

    Promise.all([fetchProyectos(), fetchPagos(id)])
      .then(([proyectos, pagosData]) => {
        if (!mounted) return;

        const encontrado = proyectos.find((p) => p._id === id) ?? null;
        if (!encontrado) {
          setNotFound(true);
          return;
        }

        setProyecto(encontrado);
        setPagos(pagosData);

        if (encontrado.padreId) {
          setProyectoPadre(proyectos.find((p) => p._id === encontrado.padreId) ?? null);
        }
      })
      .catch((err) => {
        if (!mounted) return;

        if (err instanceof UnauthorizedError) {
          onUnauthorized();
          return;
        }

        setError(err instanceof Error ? err.message : 'Error al cargar el proyecto.');
      });

    return () => {
      mounted = false;
    };
  }, [id, onUnauthorized]);

  if (error) {
    return (
      <div className="admin-detalle">
        <Link to="/admin" className="admin-detalle__volver">
          ← Volver
        </Link>
        <p className="admin-detalle__error">{error}</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="admin-detalle">
        <Link to="/admin" className="admin-detalle__volver">
          ← Volver
        </Link>
        <p className="admin-detalle__empty">Proyecto no encontrado.</p>
      </div>
    );
  }

  if (proyecto === null || pagos === null) {
    return (
      <div className="admin-detalle">
        <Link to="/admin" className="admin-detalle__volver">
          ← Volver
        </Link>
        <p className="admin-detalle__loading">Cargando proyecto...</p>
      </div>
    );
  }

  return (
    <div className="admin-detalle">
      <Link to="/admin" className="admin-detalle__volver">
        ← Volver
      </Link>

      <div className="admin-detalle__header">
        <div>
          <div className="section-label">Detalle de proyecto</div>
          <h1 className="section-title">{proyecto.titulo}</h1>
          {proyecto.padreId && (
            <p className="admin-detalle__ampliacion">
              Ampliación de: {proyectoPadre ? proyectoPadre.titulo : '(proyecto no encontrado)'}
            </p>
          )}
        </div>
        <div className="admin-detalle__header-aside">
          <AdminEstadoBadge estado={proyecto.estado} />
        </div>
      </div>

      <div className="admin-detalle__grid">
        <div className="admin-detalle__campo">
          <span className="admin-detalle__label">Cliente</span>
          <span className="admin-detalle__valor">{proyecto.clienteNombre ?? 'Sin cliente'}</span>
        </div>
        <div className="admin-detalle__campo">
          <span className="admin-detalle__label">Contacto</span>
          <span className="admin-detalle__valor">{proyecto.clienteContacto ?? '—'}</span>
        </div>
        <div className="admin-detalle__campo">
          <span className="admin-detalle__label">Presupuesto</span>
          <span className="admin-detalle__valor">{formatARS(proyecto.presupuesto ?? 0)}</span>
        </div>
        <div className="admin-detalle__campo">
          <span className="admin-detalle__label">Pagado</span>
          <span className="admin-detalle__valor">{formatARS(proyecto.pagado)}</span>
        </div>
        <div className="admin-detalle__campo">
          <span className="admin-detalle__label">Saldo</span>
          <span className="admin-detalle__valor admin-detalle__valor--acento">
            {formatARS(proyecto.saldo)}
          </span>
        </div>
        <div className="admin-detalle__campo">
          <span className="admin-detalle__label">Moneda</span>
          <span className="admin-detalle__valor">{proyecto.moneda ?? '—'}</span>
        </div>
        <div className="admin-detalle__campo">
          <span className="admin-detalle__label">Fecha de inicio</span>
          <span className="admin-detalle__valor">{formatFecha(proyecto.fechaInicio)}</span>
        </div>
      </div>

      <div className="admin-detalle__pagos">
        <h2 className="admin-detalle__pagos-title">Pagos</h2>

        {pagos.length === 0 && (
          <p className="admin-detalle__empty">Todavía no hay pagos registrados.</p>
        )}

        {pagos.length > 0 && (
          <div className="admin-detalle__pagos-lista">
            {pagos.map((pago) => (
              <div key={pago._id} className="admin-detalle__pago">
                <div className="admin-detalle__pago-info">
                  <div className="admin-detalle__pago-principal">
                    <span className="admin-detalle__pago-monto">{formatARS(pago.monto)}</span>
                    <span className="admin-detalle__pago-fecha">{formatFecha(pago.fecha)}</span>
                  </div>
                  <div className="admin-detalle__pago-secundario">
                    {pago.metodo && <span className="admin-detalle__pago-metodo">{pago.metodo}</span>}
                    {pago.nota && <span className="admin-detalle__pago-nota">{pago.nota}</span>}
                  </div>
                </div>
                <AdminBotonBoleta pago={pago} proyecto={proyecto} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProyectoDetalle;
