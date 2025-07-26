import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      };

      await emailjs.send(
        "service_cxamlaf", // Reemplaza con tu Service ID
        "template_5t82a1h", // Reemplaza con tu Template ID
        templateParams,
        "hRSiJamaLq6Y7oKoj" // Reemplaza con tu Public Key
      );

      setIsSent(true);
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => setIsSent(false), 5000);
    } catch (err) {
      console.log(err)
      setError("Hubo un problema al enviar el mensaje, intenta nuevamente.");
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-title">Contáctame</h2>
      <div className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Tu Nombre"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Tu Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Tu Mensaje"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Enviar Mensaje</button>
        </form>
        {isSent && <p className="success-message">Mensaje enviado con éxito 🎉</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </section>
  );
};

export default Contact;
