import React, { useState, useEffect, useRef } from 'react';
import isotipo from '../../assets/brand/isotipo-mono.svg';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  // Si el cierre fue con un link, no se devuelve el foco al hamburguesa (la página navega)
  const restoreFocus = useRef(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = (focusHamburger: boolean) => {
    restoreFocus.current = focusHamburger;
    setMenuOpen(false);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeMenu(false);
  };

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollTo(id);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Foco: al abrir pasa al primer link del drawer; al cerrar vuelve al hamburguesa
  const wasOpen = useRef(false);
  useEffect(() => {
    if (menuOpen) {
      drawerRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    } else if (wasOpen.current && restoreFocus.current) {
      hamburgerRef.current?.focus();
    }
    wasOpen.current = menuOpen;
    restoreFocus.current = true;
  }, [menuOpen]);

  // Escape cierra; Tab y Shift+Tab circulan entre el hamburguesa y los links del drawer
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu(true);
        return;
      }
      if (e.key !== 'Tab' || !hamburgerRef.current || !drawerRef.current) return;
      const focusables: HTMLElement[] = [
        hamburgerRef.current,
        ...Array.from(drawerRef.current.querySelectorAll<HTMLAnchorElement>('a')),
      ];
      const index = focusables.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey
        ? (index <= 0 ? focusables.length - 1 : index - 1)
        : (index === -1 || index === focusables.length - 1 ? 0 : index + 1);
      e.preventDefault();
      focusables[next].focus();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  const links = [
    { label: 'Servicios', id: 'servicios' },
    { label: 'Proyectos', id: 'proyectos' },
    { label: 'Sobre mí', id: 'sobre-mi' },
    { label: 'Contacto', id: 'contacto', cta: true },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <a href="#hero" className="nav-logo" onClick={(e) => handleLink(e, 'hero')}>
          <img src={isotipo} alt="" className="nav-logo-img" />
          <span className="nav-logo-text">Viale Sistemas</span>
        </a>

        {/* Desktop links */}
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={l.cta ? 'nav-cta' : undefined}
                onClick={(e) => handleLink(e, l.id)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className={`nav-hamburger ${menuOpen ? 'nav-hamburger--open' : ''}`}
          ref={hamburgerRef}
          onClick={() => (menuOpen ? closeMenu(true) : setMenuOpen(true))}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="nav-drawer"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Overlay */}
      <div
        className={`nav-overlay ${menuOpen ? 'nav-overlay--visible' : ''}`}
        onClick={() => closeMenu(true)}
      />

      {/* Mobile drawer */}
      <div id="nav-drawer" ref={drawerRef} className={`nav-drawer ${menuOpen ? 'nav-drawer--open' : ''}`}>
        <ul className="nav-drawer-links">
          {links.map((l, i) => (
            <li key={l.id} style={{ animationDelay: `${i * 60}ms` }}>
              <a href={`#${l.id}`} onClick={(e) => handleLink(e, l.id)}>{l.label}</a>
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
