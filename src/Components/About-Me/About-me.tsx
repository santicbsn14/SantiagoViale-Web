import React from 'react';
import './AboutMe.css';
import santiagoViale from '../Imagenes/Santiago-Viale.jpg'

const stack = ['TypeScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Vite', 'Sanity CMS', 'Git', 'Vercel', 'Twilio'];

const AboutMe: React.FC = () => {
  return (
    <section id="sobre-mi" className="section about-section">
      <div className="section-label">Quién soy</div>
      <h2 className="section-title">Detrás de Viale Sistemas</h2>

      <div className="about-inner">
        <div className="about-text">
          <p>
            Soy Santiago Viale, desarrollador full stack de <strong>San Nicolás de los Arroyos</strong>.
            Detrás de Viale Sistemas estoy yo: el que te escucha, el que arma la propuesta y el que
            escribe el código.
          </p>
          <p>
            Hago el proyecto completo, del diseño a la puesta en marcha, así que tenés{' '}
            <strong>un solo interlocutor de punta a punta</strong>. Sin pasamanos ni equipos que no conocés.
          </p>
          <p>
            Trabajo con <strong>pymes y negocios locales</strong> de todo tipo: kinesiología, salones de
            belleza, peluquerías, gastronomía, distribuidoras, clubes, agencias y hasta un agente de bolsa.
          </p>
          <p className="stack-label">Con qué trabajo</p>
          <div className="stack-list">
            {stack.map((s) => (
              <span key={s} className="stack-pill">{s}</span>
            ))}
          </div>
        </div>

        <div className="about-visual">
          <div className="about-img-frame" aria-hidden="true" />

          <img src={santiagoViale} alt="Santiago Viale" className="about-img" />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
