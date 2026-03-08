

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
          Desarrollador Full-Stack especializado en <strong>pymes y negocios locales</strong>.
          Catálogos, sistemas de turnos, webs institucionales —
          diseño, desarrollo y deploy: <strong>todo yo, todo junto</strong>.
        </p>
        <div className="hero-cta">
          <button className="btn btn-filled" onClick={() => scrollTo('proyectos')}>Ver proyectos →</button>
          <button className="btn btn-outline" onClick={() => scrollTo('contacto')}>Hablemos</button>
        </div>
        <div className="hero-stats">
          <div>
            <div className="stat-num">4+</div>
            <div className="stat-label">Proyectos entregados</div>
          </div>
          <div>
            <div className="stat-num">100%</div>
            <div className="stat-label">Proyectos completos</div>
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