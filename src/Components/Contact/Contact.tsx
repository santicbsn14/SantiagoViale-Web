import React, { useEffect, useState } from 'react';
import { WhatsAppIcon, InstagramIcon, MailIcon, LinkedInIcon, PinIcon } from './ContactIcons';
import './Contact.css';

type SendStatus = 'idle' | 'sending' | 'sent' | 'error';

const WHATSAPP_URL =
  'https://wa.me/5493364022363?text=' +
  encodeURIComponent('Hola Santiago, vi tu web y quería consultarte por un proyecto.');

const emptyForm = { name: '', email: '', message: '', website: '' };

const Contact: React.FC = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState<SendStatus>('idle');

  // Los mensajes de éxito / error se ocultan solos a los ~5 segundos.
  useEffect(() => {
    if (status !== 'sent' && status !== 'error') return;
    const timer = setTimeout(() => setStatus('idle'), 5000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setFormData(emptyForm);
      setStatus('sent');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const isSending = status === 'sending';

  return (
    <section id="contacto" className="section contact-section">
      <div className="section-label">Trabajemos juntos</div>
      <h2 className="section-title">¿Tenés un proyecto en mente?</h2>

      <div className="contact-inner">
        <div className="contact-info">
          <p>
            Contame qué necesitás, aunque sea algo chico o todavía no sepas bien cómo resolverlo.{' '}
            <strong>La primera charla es sin cargo y sin compromiso.</strong>
          </p>
          <div className="contact-detail">
            <div className="contact-row">
              <WhatsAppIcon />
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">336 402-2363</a>
            </div>
            <div className="contact-row">
              <InstagramIcon />
              <a href="https://www.instagram.com/vialesistemas/" target="_blank" rel="noopener noreferrer">@vialesistemas</a>
            </div>
            <div className="contact-row">
              <MailIcon />
              <a href="mailto:santiagovialesistemas@gmail.com">santiagovialesistemas@gmail.com</a>
            </div>
            <div className="contact-row">
              <LinkedInIcon />
              <a href="https://www.linkedin.com/in/santiago-viale-a0035123b/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
            <div className="contact-row">
              <PinIcon />
              <span>San Nicolás de los Arroyos, Buenos Aires</span>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-name">Nombre</label>
            <input id="contact-name" className="form-input" type="text" name="name" placeholder="Tu nombre" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-email">Email</label>
            <input id="contact-email" className="form-input" type="email" name="email" placeholder="tu@email.com" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-message">Mensaje</label>
            <textarea id="contact-message" className="form-textarea" name="message" placeholder="Contame qué necesitás o qué te complica hoy…" value={formData.message} onChange={handleChange} required />
          </div>
          {/* Campo trampa (honeypot): oculto para personas, los bots lo completan. */}
          <div className="form-trap" aria-hidden="true">
            <label htmlFor="contact-website">Sitio web</label>
            <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleChange} />
          </div>
          <button type="submit" className="form-submit" disabled={isSending}>
            {isSending ? 'Enviando…' : 'Enviar mensaje'}
          </button>
          {status === 'sent' && (
            <p className="form-success" role="status">Mensaje enviado. Te respondo pronto.</p>
          )}
          {status === 'error' && (
            <p className="form-error" role="alert">
              No se pudo enviar el mensaje. Probá de nuevo o escribime por WhatsApp.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
