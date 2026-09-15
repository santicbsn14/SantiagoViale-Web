

import React from 'react';
import './home.css';

const Home: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-grid" />
      <div className="hero-glow" />
      <div className="hero-content">
        <div className="hero-tag">Disponible para nuevos proyectos</div>
        <h1>
          <span className="hero-name">Santiago Viale</span>
          <span className="hero-role">Tu solución web,<br />de punta a punta.</span>
        </h1>
        <p className="hero-desc">
          Desarrollador Full-Stack. Llevo proyectos web <strong>completos de forma autónoma</strong> —
          de la primera reunión al deploy: diseño, desarrollo, base de datos y puesta en producción.
          Trabajo con <strong>negocios, comercios y equipos</strong> que necesitan soluciones concretas y bien ejecutadas.
        </p>
        <div className="hero-cta">
          <button className="btn btn-filled" onClick={() => scrollTo('proyectos')}>Ver proyectos →</button>
          <button className="btn btn-outline" onClick={() => scrollTo('contacto')}>Hablemos</button>
        </div>
        <div className="hero-stats">
          <div>
            <div className="stat-num">7+</div>
            <div className="stat-label">Proyectos entregados</div>
          </div>
          <div>
            <div className="stat-num">2</div>
            <div className="stat-label">En desarrollo activo</div>
          </div>
          <div>
            <div className="stat-num">Full</div>
            <div className="stat-label">Stack propio</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;