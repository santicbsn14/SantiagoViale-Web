import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await emailjs.send(
        'service_cxamlaf',
        'template_5t82a1h',
        { name: formData.name, email: formData.email, message: formData.message },
        'hRSiJamaLq6Y7oKoj'
      );
      setIsSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    } catch (err) {
      console.log(err)
      setError('Hubo un problema al enviar el mensaje, intentá nuevamente.',);
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <section id="contacto" className="section contact-section">
      <div className="section-label">Trabajemos juntos</div>
      <h2 className="section-title">¿Tenés un proyecto en mente?</h2>

      <div className="contact-inner">
        <div className="contact-info">
          <p>
            Si tenés un negocio y querés una presencia web que realmente funcione,
            escribime. Te respondo rápido y sin vueltas.
          </p>
          <div className="contact-detail">
            <div className="contact-row">📍 San Nicolás de los Arroyos, Argentina</div>
            <div className="contact-row">
              💼 <a href="https://www.linkedin.com/in/santiago-viale-a0035123b/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
            <div className="contact-row">
              🐙 <a href="https://github.com/santicbsn14" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nombre</label>
            <input className="form-input" type="text" name="name" placeholder="Tu nombre" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" name="email" placeholder="tu@email.com" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Mensaje</label>
            <textarea className="form-textarea" name="message" placeholder="Contame sobre tu proyecto..." value={formData.message} onChange={handleChange} required />
          </div>
          <button type="submit" className="form-submit">Enviar mensaje</button>
          {isSent && <p className="form-success">✓ Mensaje enviado. Te respondo pronto.</p>}
          {error && <p className="form-error">{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;