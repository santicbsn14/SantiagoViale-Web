// Documento PDF del comprobante de pago (react-pdf, NO renderiza al DOM).
// Se importa dinámicamente desde AdminBotonBoleta para no arrastrar
// @react-pdf/renderer al bundle del portfolio público.
//
// Comprobante interno, NO fiscal — no reemplaza una factura (ver nota al pie).

import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import logo from '../assets/logo-boleta.png';
import { formatARS, formatFecha, type Pago, type Proyecto } from '../utils/adminApi';
import { generarCodigoComprobante } from '../utils/comprobanteCodigo';

const ACCENT = '#61dafb';
const TEXT = '#222222';
const MUTED = '#666666';
const BORDER = '#dddddd';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    color: TEXT,
    fontFamily: 'Helvetica',
    fontSize: 10,
    padding: '48pt 56pt',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 46,
  },
  headerText: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
    color: TEXT,
  },
  divider: {
    borderBottomWidth: 1.5,
    borderBottomColor: ACCENT,
    marginTop: 14,
    marginBottom: 20,
  },
  codigoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  codigo: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 14,
    color: ACCENT,
  },
  emitido: {
    fontSize: 9,
    color: MUTED,
    textAlign: 'right',
  },
  seccion: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 8,
    color: ACCENT,
    letterSpacing: 1,
    marginBottom: 4,
  },
  valor: {
    fontSize: 11,
    color: TEXT,
  },
  montoBox: {
    backgroundColor: '#f7f7f7',
    borderRadius: 6,
    padding: 16,
    marginBottom: 24,
  },
  montoLabel: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 8,
    color: MUTED,
    letterSpacing: 1,
    marginBottom: 4,
  },
  montoValor: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 26,
    color: TEXT,
    marginBottom: 6,
  },
  montoMeta: {
    fontSize: 9,
    color: MUTED,
  },
  estadoCuenta: {
    marginBottom: 32,
  },
  estadoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    fontSize: 10,
    color: TEXT,
  },
  estadoDivider: {
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    marginVertical: 6,
  },
  saldoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  saldoLabel: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
    color: ACCENT,
  },
  saldoValor: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 18,
    color: ACCENT,
  },
  footer: {
    fontSize: 8,
    color: MUTED,
    textAlign: 'center',
  },
});

interface ComprobantePagoProps {
  pago: Pago;
  proyecto: Proyecto;
}

export function ComprobantePago({ pago, proyecto }: ComprobantePagoProps) {
  const codigo = generarCodigoComprobante(pago);
  const presupuesto = proyecto.presupuesto ?? 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
          <Text style={styles.headerText}>Santiago Viale — Desarrollo Web</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.codigoRow}>
          <Text style={styles.codigo}>{codigo}</Text>
          <Text style={styles.emitido}>Emitido el {formatFecha(new Date().toISOString())}</Text>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.label}>RECIBIDO DE</Text>
          <Text style={styles.valor}>{proyecto.clienteNombre ?? 'Sin cliente'}</Text>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.label}>PROYECTO</Text>
          <Text style={styles.valor}>{proyecto.titulo}</Text>
        </View>

        <View style={styles.montoBox}>
          <Text style={styles.montoLabel}>MONTO RECIBIDO</Text>
          <Text style={styles.montoValor}>{formatARS(pago.monto)}</Text>
          <Text style={styles.montoMeta}>
            Fecha de pago: {formatFecha(pago.fecha)}
            {pago.metodo ? ` · ${pago.metodo}` : ''}
          </Text>
        </View>

        <View style={styles.estadoCuenta}>
          <Text style={styles.label}>ESTADO DE CUENTA DEL PROYECTO</Text>
          <View style={styles.estadoRow}>
            <Text>Presupuesto total</Text>
            <Text>{formatARS(presupuesto)}</Text>
          </View>
          <View style={styles.estadoRow}>
            <Text>Total pagado</Text>
            <Text>{formatARS(proyecto.pagado)}</Text>
          </View>
          <View style={styles.estadoDivider} />
          <View style={styles.saldoRow}>
            <Text style={styles.saldoLabel}>SALDO RESTANTE</Text>
            <Text style={styles.saldoValor}>{formatARS(proyecto.saldo)}</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Este comprobante no reemplaza una factura. Si necesita factura, solicítela.
        </Text>
      </Page>
    </Document>
  );
}
