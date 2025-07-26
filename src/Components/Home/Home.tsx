import * as React from 'react'
import './home.css'

const Home : React.FC = () => {
    return (
        <section id='home'>
            <section id="home" className="home-section">
                <div className="home-content">
                    <h1>Hola, soy <span className="highlight">Santiago Viale</span></h1>
                    <p>Desarrollador Full-Stack apasionado por crear soluciones web eficientes y modernas.</p>
                    <div className="cta-buttons">
                        <a href="#projects" className="btn-primary">Ver Mis Proyectos</a>
                        <a href="https://www.linkedin.com/in/santiago-viale-a0035123b/" target="_blank" rel="noopener noreferrer" className="btn-secondary">LinkedIn</a>
                    </div>
                    <div className="social-links">
                        <a href="https://github.com/santicbsn14" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href="https://x.com/Santicbsn9" target="_blank" rel="noopener noreferrer">Twitter</a>
                    </div>
                </div>
            </section>
        </section>
    )
}
export default Home