import { useState } from 'react';
import { generarCodigoComprobante } from '../../utils/comprobanteCodigo';
import type { Pago, Proyecto } from '../../utils/adminApi';
import './AdminBotonBoleta.css';

interface AdminBotonBoletaProps {
  pago: Pago;
  proyecto: Proyecto;
}

function AdminBotonBoleta({ pago, proyecto }: AdminBotonBoletaProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      // Import dinámico: @react-pdf/renderer y el documento del comprobante
      // solo se descargan cuando alguien efectivamente genera una boleta,
      // no se cuelan en el bundle del portfolio público.
      const [{ pdf }, { ComprobantePago }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('../../pdf/ComprobantePago'),
      ]);

      const blob = await pdf(<ComprobantePago pago={pago} proyecto={proyecto} />).toBlob();
      const codigo = generarCodigoComprobante(pago);
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `comprobante-${codigo}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      setError('No se pudo generar la boleta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-boton-boleta">
      <button className="btn btn-outline admin-boton-boleta__btn" onClick={handleClick} disabled={loading}>
        {loading ? 'Generando...' : 'Generar boleta'}
      </button>
      {error && <span className="admin-boton-boleta__error">{error}</span>}
    </div>
  );
}

export default AdminBotonBoleta;
