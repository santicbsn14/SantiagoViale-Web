import React from 'react';
import './ComoTrabajo.css';

const steps = [
  {
    number: '01',
    title: 'Definición y arquitectura',
    desc: 'Antes de escribir una línea, defino cómo se estructura el proyecto: modelo de datos, seguridad, decisiones técnicas. La base bien pensada evita rehacer después.',
  },
  {
    number: '02',
    title: 'Ejecución asistida',
    desc: 'Construyo con herramientas de IA integradas al entorno de desarrollo, dirigiendo cada paso. Más velocidad, sin perder el control de lo que se escribe.',
  },
  {
    number: '03',
    title: 'Verificación continua',
    desc: 'Pruebo cada pieza antes de avanzar a la siguiente. Nada se da por hecho: si funciona, sigue; si no, se corrige en el momento.',
  },
  {
    number: '04',
    title: 'Entrega y autonomía',
    desc: 'El cliente recibe un proyecto completo y, cuando aplica, un panel para gestionarlo solo. Sin dependencias eternas.',
  },
];

const ComoTrabajo: React.FC = () => {
  return (
    <section id="como-trabajo" className="section como-trabajo-section">
      <div className="section-label">Método de trabajo</div>
      <h2 className="section-title">Cómo construyo, hoy</h2>
      <p className="como-trabajo-intro">
        La forma de desarrollar cambió, y la aprovecho a fondo. Trabajo con un flujo asistido por
        IA donde <strong>yo tomo las decisiones</strong> —arquitectura, seguridad, experiencia de
        uso— y acelero la ejecución sin resignar control ni calidad. El resultado: proyectos más
        complejos, entregados más rápido y mejor terminados.
      </p>
      <div className="como-trabajo-grid">
        {steps.map((s) => (
          <div key={s.number} className="como-trabajo-step">
            <span className="como-trabajo-number">{s.number}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ComoTrabajo;
