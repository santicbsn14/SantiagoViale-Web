import React from 'react';
import logo from '../../assets/Santiago-Viale-Sistemas.png'
import './Navbar.css'; // Asegúrate de tener un archivo CSS para estilos

const NavBar: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Desplazamiento suave
    }
  };
  return (
    <nav className="navbar">
      <div >
      <a onClick={() => scrollToSection('home')}><img className="logo" src={logo} alt="" /></a>
      </div>
      <ul className="nav-links">
        <li>
        <a onClick={() => scrollToSection('projects')}>Projects</a>
        </li>
        <li>
          <a href='#aboutme'>About Me</a>
        </li>
        <li>
          <a href='#contact'>Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
