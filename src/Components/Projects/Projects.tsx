import React, { useState } from 'react';
import './Projects.css';


import kinefit from '../Imagenes/Kinefit-Project.jpg'
import clubBelgrano from '../Imagenes/ClubBelgrano-Project.png'
import nicolasSanetti from '../Imagenes/NicolasSanetti-Project.jpg'
import newConcepts from '../Imagenes/NewConcept.png'

type ProjectType = 'catalog' | 'system' | 'web';

interface Project {
  title: string;
  desc: string;
  type: ProjectType;
  typeLabel: string;
  emoji: string;
  image: string;  // descomentar cuando uses imágenes reales
  live: string;
  code: string;
}

const projects: Project[] = [
  {
    title: 'Web + Sistema de Turnos — Kinefit',
    desc: 'Web institucional para centro de kinesiología con sistema de reservas online. Pacientes pueden agendar, cancelar y gestionar turnos.',
    type: 'system',
    typeLabel: 'Sistema',
    emoji: '🏥',
    image: kinefit,
    live: 'https://web-kinefit-front.vercel.app/',
    code: 'https://github.com/santicbsn14/web-kinefit-front',
  },
  {
    title: ' Web — Nicolás Sanetti Coiffeur',
    desc: 'Sitio institucional + sistema de turnos para peluquería. Los profesionales administran su agenda; los clientes reservan online.',
    type: 'catalog',
    typeLabel: 'Catálogo + Turnos',
    emoji: '✂️',
    image: nicolasSanetti,
    live: 'http://nicolas-sanetti-front.vercel.app/',
    code: 'https://github.com/santicbsn14/nicolasSanetti-Front',
  },
  {
    title: 'Web Institucional — Club Belgrano San Nicolás',
    desc: 'Portal del club con panel de administración para publicar noticias, eventos y anuncios. Socios y comunidad siempre informados.',
    type: 'web',
    typeLabel: 'Web Institucional',
    emoji: '⚽',
    image: clubBelgrano,
    live: 'https://clubbelgrano.com.ar/',
    code: 'https://github.com/santicbsn14/WebOficialClubBelgrano1',
  },
  {
    title: 'Web + CMS — New Concepts Agency',
    desc: 'Sitio para agencia de DJs con roster, fechas de eventos, galería y CMS en Sanity. Los representantes actualizan sin tocar código.',
    type: 'catalog',
    typeLabel: 'Catálogo + CMS',
    emoji: '🎧',
    image: newConcepts,
    live: 'https://newconcepts-agency.com.ar/',
    code: 'https://github.com/santicbsn14/newconcepts-agency',
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
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-grid">
        {filtered.map((p, i) => (
          <div key={i} className="project-card">
            {/* Cuando tengas imágenes reales, reemplazá esto: */}
            
            <img src={p.image} alt={p.title} className="project-img" />

            <div className="project-body">
              <span className={`project-type type-${p.type}`}>{p.typeLabel}</span>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-links">
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="project-link link-live">
                  Ver proyecto
                </a>
                <a href={p.code} target="_blank" rel="noopener noreferrer" className="project-link link-code">
                  Código
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;