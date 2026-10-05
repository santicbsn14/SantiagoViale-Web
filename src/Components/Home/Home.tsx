import React from 'react';
import isotipo from '../../assets/brand/isotipo-mono.svg';
import './home.css';

const HERO_STATS = [
  { num: '7+', label: 'Proyectos entregados' },
  { num: '2', label: 'En desarrollo activo' },
  { num: '1 a 1', label: 'Trato directo' },
];

const Home: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow hero-glow--cyan" aria-hidden="true" />
      <div className="hero-glow hero-glow--mint" aria-hidden="true" />
      <img className="hero-mark" src={isotipo} alt="" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-tag">Disponible para nuevos proyectos</div>
        <h1>
          Tu solución web,<br /><span className="hero-title-accent">de punta a punta.</span>
        </h1>
        <p className="hero-desc">
          Soy <strong>Santiago Viale</strong>, desarrollador full stack. Hago webs, catálogos, sistemas
          de turnos y de gestión a medida, o una herramienta para ese proceso puntual que hoy te
          complica. <strong>Trato directo con quien lo hace</strong>, de la primera charla a la puesta
          en marcha.
        </p>
        <div className="hero-cta">
          <button className="btn btn-filled" onClick={() => scrollTo('proyectos')}>Ver proyectos →</button>
          <button className="btn btn-outline" onClick={() => scrollTo('contacto')}>Hablemos</button>
        </div>
        <div className="hero-stats">
          {HERO_STATS.map((s) => (
            <div key={s.label}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
