import React from 'react';
import './Projects.css'; // Asegúrate de tener un archivo CSS para estilos
import kinefit from '../Imagenes/Kinefit-Project.jpg'
import ClubBelgrano from '../Imagenes/ClubBelgrano-Project.png'
import NicolasSanetti from '../Imagenes/NicolasSanetti-Project.jpg'
import NewConcepts from '../Imagenes/NewConcept.png'
const projects = [
  {
    title: 'Web Centro "Kinefit" y sistema gestor de turnos',
    description: 'Web institucional para un centro de kinesiología, incluyendo información sobre servicios, contacto y ubicación. Además, el proyecto integra un sistema de gestión de turnos en línea que permite a los pacientes reservar, cancelar y gestionar sus citas',
    image: kinefit,
    liveLink: 'https://web-kinefit-front.vercel.app/',
    codeLink: 'https://github.com/santicbsn14/web-kinefit-front'
  },
  {
    title: 'Sitio Web Club Belgrano San Nicolas',
    description: 'Desarrollo de la página web institucional para el Club Belgrano San Nicolás, diseñada para proporcionar información relevante sobre el club, sus actividades y novedades. La plataforma permite a los administradores del club subir noticias, eventos y anuncios importantes para mantener a los socios y la comunidad informados.',
    image: ClubBelgrano,
    liveLink: 'https://clubbelgrano.com.ar/',
    codeLink: 'https://github.com/santicbsn14/WebOficialClubBelgrano1'
  },
{
  title: 'Sitio web "Nicolás Sanetti Coiffeur" con sistema integral de turnos',
  description: "Desarrollo de un sitio web completo para la peluquería Nicolás Sanetti Coiffeur, que combina una sección institucional —con páginas como inicio, servicios, historia y contacto— con un sistema de gestión de turnos totalmente funcional. La plataforma permite a los clientes solicitar turnos online y a los profesionales del equipo administrar sus agendas, crear y gestionar servicios, y visualizar los turnos asignados de manera eficiente.",
  image: NicolasSanetti,
  liveLink: 'http://nicolas-sanetti-front.vercel.app/', // actualizar si tenés el link real
  codeLink: 'https://github.com/santicbsn14/nicolasSanetti-Front' // actualizar si tenés repo real
},
{
  title: 'Sitio web "New Concepts Agency" – Agencia de DJs de música electrónica',
  description:
    "Diseño y desarrollo de un sitio web institucional para la agencia de representación de DJs 'New Concepts Agency'. El sitio incluye secciones como inicio, roster de artistas, fechas de eventos, galería de imágenes y contacto. Se destacan funcionalidades dinámicas como el filtrado por DJ en la sección de fechas, animaciones modernas y una estructura completamente responsiva. La información de artistas y fechas se administra desde un panel CMS creado con Sanity, permitiendo a los representantes de la agencia mantener la web actualizada sin conocimientos técnicos.",
  image: NewConcepts, // reemplazalo por el import correspondiente
  liveLink: 'https://newconcepts-agency.vercel.app/', // actualizá si tenés otro hosting
  codeLink: 'https://github.com/santicbsn14/newconcepts-agency' // actualizá si es otro repo
}


];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">Mis Proyectos</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="card" key={index}>
            <img src={project.image} alt={`${project.title} screenshot`} className="card-image" />
            <div className="card-content">
              <h3 className="card-title">{project.title}</h3>
              <p className="card-description">{project.description}</p>
              <div className="card-links">
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn-primary">Ver Proyecto</a>
                <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="btn-secondary">Código</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
