import { Link } from 'react-router-dom';
import isotipo from '../../assets/brand/isotipo-mono.svg';
import './AdminHeader.css';

interface AdminHeaderProps {
  onLogout: () => void;
  loggingOut: boolean;
}

function AdminHeader({ onLogout, loggingOut }: AdminHeaderProps) {
  return (
    <header className="admin-header">
      <div className="admin-header__inner">
        <Link to="/admin" className="admin-header__brand">
          <img src={isotipo} alt="" className="admin-header__isotipo" />
          <span className="admin-header__nombre">Viale Sistemas</span>
          <span className="admin-header__tag">Admin</span>
        </Link>

        <div className="admin-header__acciones">
          <Link to="/" className="admin-header__link">
            Ver sitio
          </Link>
          <button
            type="button"
            className="btn btn-outline admin-header__logout"
            onClick={onLogout}
            disabled={loggingOut}
          >
            {loggingOut ? 'Saliendo…' : 'Cerrar sesión'}
          </button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
