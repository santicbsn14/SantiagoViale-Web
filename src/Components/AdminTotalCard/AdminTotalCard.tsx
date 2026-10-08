import './AdminTotalCard.css';

interface AdminTotalCardProps {
  label: string;
  value: string;
  destacado?: boolean;
}

function AdminTotalCard({ label, value, destacado = false }: AdminTotalCardProps) {
  return (
    <div className={`admin-total-card ${destacado ? 'admin-total-card--destacado' : ''}`}>
      <span className="admin-total-card__label">{label}</span>
      <span className="admin-total-card__value">{value}</span>
    </div>
  );
}

export default AdminTotalCard;
