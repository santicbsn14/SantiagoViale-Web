import type { Estado } from '../../utils/adminApi';
import './AdminEstadoBadge.css';

interface AdminEstadoBadgeProps {
  estado: Estado;
}

function AdminEstadoBadge({ estado }: AdminEstadoBadgeProps) {
  if (!estado) return null;

  return <span className={`admin-badge admin-badge--${estado}`}>{estado}</span>;
}

export default AdminEstadoBadge;
