import React from 'react';
import './AboutMe.css';
import santiagoViale from '../Imagenes/Santiago-Viale.jpg'

const stack = ['TypeScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Vite', 'Sanity CMS', 'Git'];

const AboutMe: React.FC = () => {
  return (
    <section id="sobre-mi" className="section about-section">
      <div className="section-label">Quién soy</div>
      <h2 className="section-title">Sobre mí</h2>

      <div className="about-inner">
        <div className="about-text">
          <p>
            Soy Santiago Viale, desarrollador Full-Stack de <strong>San Nicolás de los Arroyos</strong>.
            Me especialicé en construir soluciones web completas para negocios que quieren crecer online
            sin depender de equipos grandes ni presupuestos enormes.
          </p>
          <p>
            Con la evolución de las herramientas de desarrollo, <strong>puedo cubrir todo el proyecto</strong>:
            diseño, frontend, backend, base de datos y deploy. Eso significa menos coordinación,
            más velocidad y un único interlocutor para vos.
          </p>
          <p>
            Trabajo principalmente con <strong>pymes y negocios locales</strong>: peluquerías, centros de salud,
            clubes, agencias. Gente que necesita soluciones concretas, no presupuestos inflados.
          </p>
          <div className="stack-list">
            {stack.map((s) => (
              <span key={s} className="stack-pill">{s}</span>
            ))}
          </div>
        </div>

        <div className="about-visual">
          <div className="about-img-frame" />

          <img src={santiagoViale} alt="Santiago Viale" className="about-img" />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;