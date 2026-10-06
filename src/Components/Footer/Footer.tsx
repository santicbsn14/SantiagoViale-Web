import React from 'react';
import isotipo from '../../assets/brand/isotipo-mono.svg';
import './Footer.css';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-brand">
        <img className="footer-mark" src={isotipo} alt="" />
        <span className="footer-copy">© {year} Viale Sistemas · San Nicolás, Buenos Aires</span>
      </div>
      <div className="footer-links">
        <a href="https://www.instagram.com/vialesistemas/" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://www.linkedin.com/in/santiago-viale-a0035123b/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com/santicbsn14" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </footer>
  );
};

export default Footer;
