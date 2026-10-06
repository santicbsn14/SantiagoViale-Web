import React from 'react';
import './ComoTrabajo.css';

const steps = [
  {
    number: '01',
    title: 'Charla inicial',
    desc: 'Me contás cómo funciona tu negocio y qué te complica. La primera charla es sin cargo y sin compromiso.',
  },
  {
    number: '02',
    title: 'Propuesta clara',
    desc: 'Te paso por escrito qué voy a hacer, en cuánto tiempo y cuánto cuesta. Sin letra chica.',
  },
  {
    number: '03',
    title: 'Desarrollo con avances',
    desc: 'Construyo dirigiendo herramientas de IA paso a paso: más velocidad, sin perder el control. Probamos cada parte antes de seguir.',
  },
  {
    number: '04',
    title: 'Entrega y autonomía',
    desc: 'Recibís tu sistema funcionando, y es tuyo. Cuando aplica, con un panel para manejarlo solo, sin depender de nadie.',
  },
];

const ComoTrabajo: React.FC = () => {
  return (
    <section id="como-trabajo" className="section como-trabajo-section">
      <div className="section-label">Método de trabajo</div>
      <h2 className="section-title">De la primera charla a la entrega</h2>
      <p className="como-trabajo-intro">
        La forma de desarrollar cambió y la aprovecho: trabajo con herramientas de IA, pero{' '}
        <strong>las decisiones las tomo yo</strong>. Eso se traduce en proyectos completos,
        entregados más rápido y bien probados.
      </p>
      <ol className="como-trabajo-timeline">
        {steps.map((s) => (
          <li key={s.number} className="como-trabajo-step">
            <span className="como-trabajo-number" aria-hidden="true">{s.number}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default ComoTrabajo;
