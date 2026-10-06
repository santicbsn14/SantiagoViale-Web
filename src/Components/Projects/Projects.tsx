import React, { useState } from 'react';
import './Projects.css';


import kinefit from '../Imagenes/Kinefit-Project.jpg'
import clubBelgrano from '../Imagenes/ClubBelgrano-Project.png'
import nicolasSanetti from '../Imagenes/NicolasSanetti-Project.jpg'
import newConcepts from '../Imagenes/NewConcept.png'
import laJuana from '../Imagenes/LaJuana.jpeg'
import pañaleranano from '../Imagenes/pañaleraNano.jpeg'
import brioLogo from '../Imagenes/brio-logo.png'
import camilaGonzalez from '../Imagenes/CamilaGonzalez-Project.jpg'
import blackStationLogo from '../Imagenes/blackstation-logo.svg'
type ProjectType = 'catalog' | 'system' | 'web';

interface Project {
  title: string;
  desc: string;
  type: ProjectType;
  typeLabel: string;
  image: string;
  live?: string;
  enDesarrollo?: boolean;
}

const projects: Project[] = [
  {
    title: 'Pañalera Nano',
    desc: 'Plataforma completa para distribuidora con envíos a todo el país. Los clientes arman su pedido online y se redirigen al WhatsApp del negocio. El admin gestiona productos, deshabilita stock y tiene un panel para ver y filtrar todos los pedidos por fecha, producto y más.',
    type: 'catalog',
    typeLabel: 'Catálogo + Gestión',
    image: pañaleranano,
    live: 'https://panaleranano.com/',
  },
  {
    title: 'Camila González',
    desc: 'Sistema de turnos propio que reemplazó una app paga. Las clientas reservan online sin registrarse y reciben confirmaciones y recordatorios automáticos por WhatsApp.',
    type: 'system',
    typeLabel: 'Web + Turnos',
    image: camilaGonzalez,
    live: 'https://camilagonzalezbelleza.com',
  },
  {
    title: 'Kinefit',
    desc: 'Web institucional para centro de kinesiología con sistema de reservas online. Pacientes pueden agendar, cancelar y gestionar turnos.',
    type: 'system',
    typeLabel: 'Web + Turnos',
    image: kinefit,
    live: 'https://web-kinefit-front.vercel.app/',
  },
  {
    title: 'Nicolás Sanetti Coiffeur',
    desc: 'Sitio institucional + sistema de turnos para peluquería. Los profesionales administran su agenda; los clientes reservan online.',
    type: 'system',
    typeLabel: 'Web + Turnos',
    image: nicolasSanetti,
    live: 'http://nicolas-sanetti-front.vercel.app/',
  },
  {
    title: 'Club Belgrano San Nicolás',
    desc: 'Portal del club con panel de administración para publicar noticias, eventos y anuncios. Socios y comunidad siempre informados.',
    type: 'web',
    typeLabel: 'Web institucional',
    image: clubBelgrano,
    live: 'https://clubbelgrano.com.ar/',
  },
  {
    title: 'New Concepts Agency',
    desc: 'Sitio para agencia de DJs con roster, fechas de eventos, galería y CMS en Sanity. Los representantes actualizan sin tocar código.',
    type: 'web',
    typeLabel: 'Web + CMS',
    image: newConcepts,
    live: 'https://newconcepts-agency.com.ar/',
  },
  {
    title: 'La Juana',
    desc: 'Catálogo dinámico para que los clientes armen su pedido online. Los dueños habilitan o deshabilitan sabores según el stock. Al confirmar, el pedido se envía directo al WhatsApp del negocio con el detalle completo.',
    type: 'catalog',
    typeLabel: 'Catálogo de pedidos',
    image: laJuana,
    live: 'https://catalogo-la-juana.vercel.app/',
  },
  {
    title: 'Brío Valores',
    desc: 'Sitio empresarial para agente de bolsa (ALYC) de Rosario. Web totalmente autoadministrable: el equipo edita textos, imágenes y contenido sin tocar código. Presencia institucional a la altura del rubro financiero.',
    type: 'web',
    typeLabel: 'Web empresarial',
    image: brioLogo,
    enDesarrollo: true,
  },
  {
    title: 'Black Station',
    desc: 'Catálogo con pedidos para un carrito de comidas. El cliente arma su pedido y elige horario de retiro; el local recibe la comanda en vivo y el ticket se imprime solo.',
    type: 'catalog',
    typeLabel: 'Catálogo + Pedidos',
    image: blackStationLogo,
    enDesarrollo: true,
  },
];

const filters = [
  { key: 'todos', label: 'Todos' },
  { key: 'catalog', label: 'Catálogos' },
  { key: 'system', label: 'Sistemas' },
  { key: 'web', label: 'Webs' },
];

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('todos');

  const filtered = activeFilter === 'todos'
    ? projects
    : projects.filter((p) => p.type === activeFilter);

  return (
    <section id="proyectos" className="section projects-section">
      <div className="projects-header">
        <div>
          <div className="section-label">Trabajos reales</div>
          <h2 className="section-title">Proyectos</h2>
        </div>
        <div className="filter-tabs">
          {filters.map((f) => (
            <button
              key={f.key}
              className={`filter-tab ${activeFilter === f.key ? 'active' : ''}`}
              aria-pressed={activeFilter === f.key}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-grid">
        {filtered.map((p) => (
          <div key={p.title} className="project-card">
            {p.enDesarrollo ? (
              <div className="project-logo-wrap">
                <span className="badge-dev">En desarrollo</span>
                <img src={p.image} alt={`Logo de ${p.title}`} className="project-logo" />
              </div>
            ) : (
              <img src={p.image} alt={`Captura de ${p.title}`} className="project-img" />
            )}

            <div className="project-body">
              <span className={`project-type type-${p.type}`}>{p.typeLabel}</span>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              {p.enDesarrollo ? (
                <p className="project-soon">Próximamente</p>
              ) : (
                <div className="project-links">
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="project-link link-live">
                    Ver proyecto
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
