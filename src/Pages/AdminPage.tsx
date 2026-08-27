import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../Components/AdminDashboard/AdminDashboard';
import AdminProyectoDetalle from '../Components/AdminProyectoDetalle/AdminProyectoDetalle';
import './AdminPage.css';

const AUTH_STORAGE_KEY = 'admin_auth';

interface LoginResponse {
  ok: boolean;
}

function AdminPage() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true',
  );
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSessionExpired = () => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setAuthenticated(false);
  };

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

  if (authenticated) {
    return (
      <Routes>
        <Route index element={<AdminDashboard onUnauthorized={handleSessionExpired} />} />
        <Route
          path="proyecto/:id"
          element={<AdminProyectoDetalle onUnauthorized={handleSessionExpired} />}
        />
      </Routes>
    );
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="section-label">Acceso restringido</div>
        <h1 className="section-title">Panel admin</h1>
        <input
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
