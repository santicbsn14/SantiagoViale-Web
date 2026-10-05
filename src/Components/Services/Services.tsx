import React from 'react';
import './Services.css';
import { ToolIcon, BrowserIcon, CalendarCheckIcon, DashboardIcon } from './ServiceIcons';

type Service = {
  num: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  tag: string;
  featured?: boolean;
};

const services: Service[] = [
  {
    num: '01',
    icon: <ToolIcon />,
    title: 'Herramientas puntuales',
    desc: 'Ese proceso que hoy hacés a mano o en una planilla: carteles de precios, registros, cálculos. Una herramienta simple, hecha justo para eso.',
    tag: 'Arrancá por lo que urge',
  },
  {
    num: '02',
    icon: <BrowserIcon />,
    title: 'Webs y catálogos',
    desc: 'Tu negocio online, con tus productos o servicios y un panel para cargar precios, fotos y novedades sin depender de nadie.',
    tag: 'Autoadministrable',
  },
  {
    num: '03',
    icon: <CalendarCheckIcon />,
    title: 'Sistemas de turnos',
    desc: 'Tus clientes reservan solos, a cualquier hora, y reciben confirmaciones y recordatorios por WhatsApp.',
    tag: 'Agenda automática',
  },
  {
    num: '04',
    icon: <DashboardIcon />,
    title: 'Gestión a medida',
    desc: 'Pedidos, stock, ventas, clientes y pagos en un sistema armado según cómo trabaja tu negocio, no al revés.',
    tag: 'Hecho a tu medida',
    featured: true,
  },
];

const Services: React.FC = () => {
  return (
    <section id="servicios" className="section services-section">
      <div className="section-label">Lo que ofrezco</div>
      <h2 className="section-title">De una herramienta puntual a un sistema completo</h2>
      <p className="section-subtitle">Arrancás con lo que más te urge y lo vas ampliando. Sin agencias ni intermediarios: hablás directo con quien lo hace.</p>
      <div className="services-grid">
        {services.map((s) => (
          <div key={s.num} className={`service-card${s.featured ? ' service-card--featured' : ''}`}>
            <span className="service-num">{s.num}</span>
            <div className="service-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <span className="service-tag">{s.tag}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
