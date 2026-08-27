import './AdminTotalCard.css';

interface AdminTotalCardProps {
  label: string;
  value: string;
}

function AdminTotalCard({ label, value }: AdminTotalCardProps) {
  return (
    <div className="admin-total-card">
      <span className="admin-total-card__label">{label}</span>
      <span className="admin-total-card__value">{value}</span>
    </div>
  );
}

export default AdminTotalCard;
