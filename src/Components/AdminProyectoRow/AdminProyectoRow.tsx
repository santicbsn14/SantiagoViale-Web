import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import AdminEstadoBadge from '../AdminEstadoBadge/AdminEstadoBadge';
import { formatARS, type Proyecto } from '../../utils/adminApi';
import './AdminProyectoRow.css';

interface AdminProyectoRowProps {
  proyecto: Proyecto;
  esAmpliacion: boolean;
}

function AdminProyectoRow({ proyecto, esAmpliacion }: AdminProyectoRowProps) {
  const presupuesto = proyecto.presupuesto ?? 0;
  const progreso =
    presupuesto > 0 ? Math.min(100, Math.max(0, (proyecto.pagado / presupuesto) * 100)) : null;

  return (
    <Link
      to={`/admin/proyecto/${proyecto._id}`}
      className={`admin-proyecto-row ${esAmpliacion ? 'admin-proyecto-row--ampliacion' : ''}`}
    >
      <div className="admin-proyecto-row__info">
        <span className="admin-proyecto-row__titulo">
          {esAmpliacion ? `↳ ${proyecto.titulo}` : proyecto.titulo}
        </span>
        <span className="admin-proyecto-row__cliente">{proyecto.clienteNombre ?? 'Sin cliente'}</span>
      </div>
      <div className="admin-proyecto-row__aside">
        <AdminEstadoBadge estado={proyecto.estado} />
        <span className="admin-proyecto-row__financiero">
          {formatARS(proyecto.pagado)} / {formatARS(presupuesto)} · Saldo{' '}
          {formatARS(proyecto.saldo)}
        </span>
        {progreso !== null && (
          <div
            className={`admin-proyecto-row__progreso ${
              progreso === 100 ? 'admin-proyecto-row__progreso--completo' : ''
            }`}
            aria-hidden="true"
          >
            <span style={{ '--progreso': `${progreso}%` } as CSSProperties} />
          </div>
        )}
      </div>
    </Link>
  );
}

export default AdminProyectoRow;
