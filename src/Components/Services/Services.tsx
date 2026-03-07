import React from 'react';
import './Services.css';

const services = [
  {
    icon: '🗂️',
    title: 'Catálogo Web',
    desc: 'Presencia digital rápida para tu negocio. Mostrá tus productos o servicios con una web profesional lista en pocos días.',
    tag: '⚡ Entrega rápida',
  },
  {
    icon: '📅',
    title: 'Sistema de Turnos',
    desc: 'Tu negocio toma turnos 24/7 sin que tengas que contestar mensajes. Tus clientes reservan solos, vos solo aparecés.',
    tag: '🔁 Automatiza tu agenda',
  },
  {
    icon: '🛠️',
    title: 'Desarrollo a Medida',
    desc: '¿Necesitás algo más específico? Diseño, backend, base de datos y deploy. Todo el proyecto, de punta a punta.',
    tag: '🎯 Proyecto completo',
  },
  {
    icon: '📊',
    title: 'Panel de Administración',
    desc: 'Control total sin conocimientos técnicos. Cargá novedades, productos o precios desde un panel simple e intuitivo.',
    tag: '🧩 Sin depender de nadie',
  },
];

const Services: React.FC = () => {
  return (
    <section id="servicios" className="section services-section">
      <div className="section-label">Lo que ofrezco</div>
      <h2 className="section-title">Soluciones web para tu negocio</h2>
      <p className="section-subtitle">Sin agencias, sin intermediarios. Hablo con vos directamente y construyo lo que necesitás.</p>
      <div className="services-grid">
        {services.map((s, i) => (
          <div key={i} className="service-card">
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