import React from 'react';
import './AboutMe.css'; // Asegúrate de tener un archivo CSS para estilos
import santiagoViale from '../Imagenes/Santiago-Viale.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJsSquare, faReact, faNodeJs, faHtml5, faCss3Alt, faGitAlt} from '@fortawesome/free-brands-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import tsIcon from '../../../public/ts_icon.svg'
const AboutMe: React.FC = () => {
  return (
<section id="aboutme" className="about-section">
  <h2 className="section-title">Sobre Mí</h2>
  <div className="about-content">
    <div className="about-text">
      <p>
        ¡Hola! Soy Santiago Viale, un desarrollador Full-Stack de 20 años, nacido en San Nicolás de los Arroyos, Argentina. Mi pasión por la programación surgió tras finalizar mis estudios secundarios en el Instituto de la Misericordia, donde decidí enfocarme tanto en mi carrera de básquet como en mi nuevo camino en el desarrollo web.
      </p>
      <p>
        Mi formación comenzó con la carrera de Full Stack Developer en Coderhouse, y desde entonces no he dejado de aprender. Me apasiona el desarrollo backend, y aunque tengo experiencia en ambos lados, disfruto más trabajar con sistemas, bases de datos y la lógica detrás de cada aplicación.
      </p>
      <h3>Experiencia Profesional</h3>
      <p>
        Actualmente trabajo como freelance, desarrollando soluciones a medida para clientes. Mi primer cliente formal fue un centro de kinesiología, para el cual creé un sistema completo de gestión de turnos. Este proyecto confirmó mi inclinación por el backend y todo lo relacionado con la creación de sistemas eficientes.
      </p>
      <h3>Habilidades</h3>
      <div className="skills-icons">
        <FontAwesomeIcon icon={faJsSquare} size="2x" />
        <img src={tsIcon} alt="TypeScript" className="skill-icon" style={{ marginTop: '1.2px', width: '29px', height: '29px', verticalAlign: 'middle'}} />
        <FontAwesomeIcon icon={faReact} size="2x" />
        <FontAwesomeIcon icon={faNodeJs} size="2x" />
        <FontAwesomeIcon icon={faDatabase} size="2x" />
        <FontAwesomeIcon icon={faHtml5} size="2x" />
        <FontAwesomeIcon icon={faCss3Alt} size="2x" />
        <FontAwesomeIcon icon={faGitAlt} size="2x" />
      </div>
      <h3>Intereses</h3>
      <p>
        Además del desarrollo web, también he completado cursos en Ciberseguridad y UML & UP. Me interesa seguir profundizando mis conocimientos en backend y sistemas. Fuera de la programación, soy un apasionado del básquet, deporte en el que he competido a nivel regional, provincial y nacional.
      </p>
    </div>
    <div className="about-image">
      <img src={santiagoViale} alt="Santiago Viale" />
    </div>
  </div>
</section>

  );
};

export default AboutMe;
