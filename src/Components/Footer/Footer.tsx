import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <span className="footer-copy">© 2025 Santiago Viale — Hecho con React + TypeScript</span>
      <div className="footer-links">
        <a href="https://github.com/santicbsn14" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/santiago-viale-a0035123b/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://x.com/Santicbsn9" target="_blank" rel="noopener noreferrer">Twitter</a>
      </div>
    </footer>
  );
};

export default Footer;