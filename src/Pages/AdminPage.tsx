import { useCallback, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AdminDashboard from '../Components/AdminDashboard/AdminDashboard';
import AdminHeader from '../Components/AdminHeader/AdminHeader';
import AdminProyectoDetalle from '../Components/AdminProyectoDetalle/AdminProyectoDetalle';
import isotipo from '../assets/brand/isotipo-mono.svg';
import './AdminPage.css';

const AUTH_STORAGE_KEY = 'admin_auth';

interface LoginResponse {
  ok: boolean;
}

function AdminPage() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true',
  );
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoized: the dashboard/detalle use it as an effect dependency, so a new
  // reference on every render (e.g. when loggingOut changes) would refetch.
  const handleSessionExpired = useCallback(() => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setAuthenticated(false);
  }, []);

  const handleLogin = async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = (await response.json().catch(() => null)) as LoginResponse | null;

      if (response.ok && data?.ok) {
        sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
        setAuthenticated(true);
      } else {
        setError('Contraseña incorrecta');
      }
    } catch {
      setError('No se pudo validar la contraseña. Intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await fetch('/api/logout', { method: 'POST', credentials: 'same-origin' });
    } catch {
      // Even if the request fails, the client-side session is closed below.
    } finally {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      setPassword('');
      setAuthenticated(false);
      setLoggingOut(false);
      navigate('/admin');
    }
  };

  if (authenticated) {
    return (
      <>
        <AdminHeader onLogout={handleLogout} loggingOut={loggingOut} />
        <Routes>
          <Route index element={<AdminDashboard onUnauthorized={handleSessionExpired} />} />
          <Route
            path="proyecto/:id"
            element={<AdminProyectoDetalle onUnauthorized={handleSessionExpired} />}
          />
        </Routes>
      </>
    );
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__marca">
          <img src={isotipo} alt="" className="admin-login__isotipo" />
          <span className="admin-login__nombre">Viale Sistemas</span>
        </div>
        <div className="section-label">Acceso restringido</div>
        <h1 className="section-title">Panel admin</h1>
        <label htmlFor="admin-password" className="visually-hidden">
          Contraseña
        </label>
        <input
          id="admin-password"
          type="password"
          className="admin-login__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleLogin();
          }}
          placeholder="Contraseña"
          disabled={loading}
        />
        <button className="btn btn-filled admin-login__button" onClick={handleLogin} disabled={loading}>
          {loading ? 'Validando...' : 'Ingresar'}
        </button>
        {error && (
          <p className="admin-login__error" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
