import { useEffect, useState } from 'react';
import AdminTotalCard from '../AdminTotalCard/AdminTotalCard';
import AdminProyectoRow from '../AdminProyectoRow/AdminProyectoRow';
import {
  fetchProyectos,
  formatARS,
  organizarConAmpliaciones,
  UnauthorizedError,
  type Proyecto,
} from '../../utils/adminApi';
import './AdminDashboard.css';

interface AdminDashboardProps {
  onUnauthorized: () => void;
}

function AdminDashboard({ onUnauthorized }: AdminDashboardProps) {
  const [proyectos, setProyectos] = useState<Proyecto[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    fetchProyectos()
      .then((data) => {
        if (mounted) {
          setProyectos(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!mounted) return;

        if (err instanceof UnauthorizedError) {
          onUnauthorized();
          return;
        }

        setError(err instanceof Error ? err.message : 'Error al cargar los proyectos.');
      });

    return () => {
      mounted = false;
    };
  }, [onUnauthorized]);

  return (
    <div className="admin-dashboard">
      <div className="section-label">Panel admin</div>
      <h1 className="section-title">Dashboard</h1>

      {error && <p className="admin-dashboard__error">{error}</p>}

      {!error && proyectos === null && (
        <p className="admin-dashboard__loading">Cargando proyectos...</p>
      )}

      {!error && proyectos !== null && proyectos.length === 0 && (
        <p className="admin-dashboard__empty">Todavía no hay proyectos cargados.</p>
      )}

      {!error && proyectos !== null && proyectos.length > 0 && (
        <>
          <div className="admin-dashboard__totales">
            <AdminTotalCard
              label="Total por cobrar"
              value={formatARS(proyectos.reduce((acc, p) => acc + p.saldo, 0))}
            />
            <AdminTotalCard
              label="Proyectos activos"
              value={String(proyectos.filter((p) => p.estado === 'activo').length)}
            />
            <AdminTotalCard
              label="Total cobrado"
              value={formatARS(proyectos.reduce((acc, p) => acc + p.pagado, 0))}
            />
          </div>

          <div className="admin-dashboard__lista">
            {organizarConAmpliaciones(proyectos).map(({ proyecto, esAmpliacion }) => (
              <AdminProyectoRow key={proyecto._id} proyecto={proyecto} esAmpliacion={esAmpliacion} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
