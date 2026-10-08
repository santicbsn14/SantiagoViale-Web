// Documento PDF del comprobante de pago (react-pdf, NO renderiza al DOM).
// Se importa dinámicamente desde AdminBotonBoleta para no arrastrar
// @react-pdf/renderer (ni las fuentes de marca registradas acá) al bundle
// del portfolio público.
//
// Comprobante interno, NO fiscal — no reemplaza una factura (ver nota al pie).

import {
  Defs,
  Document,
  Font,
  Image,
  LinearGradient,
  Page,
  Rect,
  Stop,
  StyleSheet,
  Svg,
  Text,
  View,
} from '@react-pdf/renderer';
import logo from '../assets/logo-boleta.png';
import chakraPetchSemiBold from '../assets/fonts/ChakraPetch-SemiBold.ttf';
import ibmPlexSansRegular from '../assets/fonts/IBMPlexSans-Regular.ttf';
import ibmPlexSansSemiBold from '../assets/fonts/IBMPlexSans-SemiBold.ttf';
import { formatARS, formatFecha, type Pago, type Proyecto } from '../utils/adminApi';
import { generarCodigoComprobante } from '../utils/comprobanteCodigo';

Font.register({
  family: 'Chakra Petch',
  fonts: [{ src: chakraPetchSemiBold, fontWeight: 600 }],
});
Font.register({
  family: 'IBM Plex Sans',
  fonts: [
    { src: ibmPlexSansRegular, fontWeight: 400 },
    { src: ibmPlexSansSemiBold, fontWeight: 600 },
  ],
});
// Sin esto react-pdf corta palabras largas con guiones.
Font.registerHyphenationCallback((word) => [word]);

// Paleta para fondo blanco. El menta no se usa para texto (no se lee impreso):
// solo para la barra de cobro, el borde del monto y el degradé.
const NAVY = '#30455b';
const TEXT = '#1d2a36';
const MUTED = '#6b7a8a';
const LABEL = '#0f8f7a';
const BORDER = '#dfe6ec';
const SOFT = '#f3f7f9';
const MINT = '#34f4c6';

const PAGE_PADDING_X = 52;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    color: TEXT,
    fontFamily: 'IBM Plex Sans',
    fontSize: 10,
    paddingTop: 44,
    paddingHorizontal: PAGE_PADDING_X,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  logo: {
    width: 150,
  },
  headerAside: {
    alignItems: 'flex-end',
  },
  headerAsideText: {
    fontSize: 8.5,
    color: MUTED,
  },
  degradeHeader: {
    marginTop: 14,
    marginBottom: 22,
  },
  label: {
    fontFamily: 'Chakra Petch',
    fontWeight: 600,
    fontSize: 7.5,
    color: LABEL,
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  codigoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  codigo: {
    fontFamily: 'Chakra Petch',
    fontWeight: 600,
    fontSize: 15,
    color: NAVY,
  },
  emitido: {
    fontSize: 9,
    color: MUTED,
    textAlign: 'right',
  },
  partesRow: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 22,
  },
  parte: {
    flex: 1,
  },
  valor: {
    fontSize: 11,
    color: TEXT,
  },
  montoBox: {
    backgroundColor: SOFT,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: MINT,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 26,
  },
  montoValor: {
    fontFamily: 'Chakra Petch',
    fontWeight: 600,
    fontSize: 28,
    color: NAVY,
    marginBottom: 4,
  },
  montoMeta: {
    fontSize: 9,
    color: MUTED,
  },
  estadoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  barraPista: {
    height: 5,
    borderRadius: 3,
    backgroundColor: BORDER,
    marginTop: 8,
    marginBottom: 4,
  },
  barraRelleno: {
    height: 5,
    borderRadius: 3,
    backgroundColor: MINT,
  },
  estadoDivider: {
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    marginVertical: 10,
  },
  saldoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saldoLabel: {
    fontFamily: 'Chakra Petch',
    fontWeight: 600,
    fontSize: 12,
    color: NAVY,
  },
  saldoValor: {
    fontFamily: 'Chakra Petch',
    fontWeight: 600,
    fontSize: 18,
    color: NAVY,
  },
  footer: {
    position: 'absolute',
    bottom: 36,
    left: PAGE_PADDING_X,
    right: PAGE_PADDING_X,
  },
  footerContacto: {
    marginTop: 10,
    fontSize: 8,
    color: MUTED,
    textAlign: 'center',
  },
  footerNota: {
    marginTop: 4,
    fontSize: 7.5,
    color: MUTED,
    textAlign: 'center',
  },
});

// Línea de degradé de marca a ancho completo. El viewBox es 100 × alto y
// preserveAspectRatio="none" la estira al ancho disponible.
function LineaDegrade({ id, alto }: { id: string; alto: number }) {
  return (
    <Svg width="100%" height={alto} viewBox={`0 0 100 ${alto}`} preserveAspectRatio="none">
      <Defs>
        <LinearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#1dcdff" />
          <Stop offset="0.6" stopColor="#34f4c6" />
          <Stop offset="1" stopColor="#21d0b3" />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width="100" height={alto} fill={`url(#${id})`} />
    </Svg>
  );
}

interface ComprobantePagoProps {
  pago: Pago;
  proyecto: Proyecto;
}

export function ComprobantePago({ pago, proyecto }: ComprobantePagoProps) {
  const codigo = generarCodigoComprobante(pago);
  const presupuesto = proyecto.presupuesto ?? 0;
  const progreso =
    presupuesto > 0 ? Math.min(100, Math.max(0, (proyecto.pagado / presupuesto) * 100)) : null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
          <View style={styles.headerAside}>
            <Text style={styles.headerAsideText}>Santiago Viale</Text>
            <Text style={styles.headerAsideText}>Desarrollo de software a medida</Text>
          </View>
        </View>
        <View style={styles.degradeHeader}>
          <LineaDegrade id="degrade-header" alto={2} />
        </View>

        <View style={styles.codigoRow}>
          <View>
            <Text style={styles.label}>COMPROBANTE DE PAGO</Text>
            <Text style={styles.codigo}>{codigo}</Text>
          </View>
          <Text style={styles.emitido}>Emitido el {formatFecha(new Date().toISOString())}</Text>
        </View>

        <View style={styles.partesRow}>
          <View style={styles.parte}>
            <Text style={styles.label}>RECIBIDO DE</Text>
            <Text style={styles.valor}>{proyecto.clienteNombre ?? 'Sin cliente'}</Text>
          </View>
          <View style={styles.parte}>
            <Text style={styles.label}>PROYECTO</Text>
            <Text style={styles.valor}>{proyecto.titulo}</Text>
          </View>
        </View>

        <View style={styles.montoBox}>
          <Text style={styles.label}>MONTO RECIBIDO</Text>
          <Text style={styles.montoValor}>{formatARS(pago.monto)}</Text>
          <Text style={styles.montoMeta}>
            Fecha de pago: {formatFecha(pago.fecha)}
            {pago.metodo ? ` · ${pago.metodo}` : ''}
          </Text>
        </View>

        <View>
          <Text style={styles.label}>ESTADO DE CUENTA DEL PROYECTO</Text>
          <View style={styles.estadoRow}>
            <Text>Presupuesto total</Text>
            <Text>{formatARS(presupuesto)}</Text>
          </View>
          <View style={styles.estadoRow}>
            <Text>Total pagado</Text>
            <Text>{formatARS(proyecto.pagado)}</Text>
          </View>
          {progreso !== null && (
            <View style={styles.barraPista}>
              <View style={[styles.barraRelleno, { width: `${progreso}%` }]} />
            </View>
          )}
          <View style={styles.estadoDivider} />
          <View style={styles.saldoRow}>
            <Text style={styles.saldoLabel}>SALDO RESTANTE</Text>
            <Text style={styles.saldoValor}>{formatARS(proyecto.saldo)}</Text>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <LineaDegrade id="degrade-footer" alto={1} />
          <Text style={styles.footerContacto}>
            Viale Sistemas · WhatsApp 336 402-2363 · santiagovialesistemas@gmail.com · @vialesistemas
          </Text>
          <Text style={styles.footerNota}>
            Este comprobante no reemplaza una factura. Si necesita factura, solicítela.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
