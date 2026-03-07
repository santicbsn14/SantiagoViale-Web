import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { label: 'Servicios', id: 'servicios' },
    { label: 'Proyectos', id: 'proyectos' },
    { label: 'Sobre mí', id: 'sobre-mi' },
    { label: 'Contacto', id: 'contacto' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <span className="nav-logo" onClick={() => scrollTo('hero')}>
          Santiago<span>.</span>
        </span>

        {/* Desktop links */}
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.id}>
              <a onClick={() => scrollTo(l.id)}>{l.label}</a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className={`nav-hamburger ${menuOpen ? 'nav-hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Overlay */}
      <div
        className={`nav-overlay ${menuOpen ? 'nav-overlay--visible' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile drawer */}
      <div className={`nav-drawer ${menuOpen ? 'nav-drawer--open' : ''}`}>
        <ul className="nav-drawer-links">
          {links.map((l, i) => (
            <li key={l.id} style={{ animationDelay: `${i * 60}ms` }}>
              <a onClick={() => scrollTo(l.id)}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-drawer-footer">
          <a href="https://github.com/santicbsn14" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/santiago-viale-a0035123b/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;