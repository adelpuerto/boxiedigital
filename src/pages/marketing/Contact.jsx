import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/Contact.css';

const Contact = () => {
  const [loaded, setLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '', // Aquí guardamos la "razón"
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- CONFIGURACIÓN DE LAS OPCIONES Y MAILS ---
  const contactOptions = [
    { label: "Seleccioná el motivo...", value: "", email: "" },
    { label: "Quiero editar mi Boxie / Ayuda", value: "ayuda", email: "ayuda@boxie.com.ar" },
    { label: "Quiero contactarme con Publicidad", value: "marketing", email: "marketing@boxie.com.ar" },
    { label: "Área Comercial / Ventas", value: "comercial", email: "marketing@boxie.com.ar" },
    { label: "Reclamos o Problemas Técnicos", value: "reclamos", email: "reclamos@boxie.com.ar" },
    { label: "Enviar mi Curriculum (RRHH)", value: "rrhh", email: "rrhh@boxie.com.ar" },
    { label: "Otras consultas generales", value: "general", email: "hola@boxie.com.ar" }
  ];

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Buscamos el email correspondiente a la opción elegida
    const selectedOption = contactOptions.find(opt => opt.value === formData.subject);
    const targetEmail = selectedOption ? selectedOption.email : "contacto@boxie.com.ar";

    // --- SIMULACIÓN DE ENVÍO ---
    // Aquí es donde conectaríamos con tu Backend real más adelante.
    // Por ahora, simulamos que tarda 2 segundos y funciona.
    console.log(`Enviando mensaje a: ${targetEmail}`);
    console.log("Datos:", formData);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Opcional: Resetear formulario
      // setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div className="contact-page">
        
      {/* HERO HEADER */}
        <div className={`contact-header ${loaded ? 'fade-in-up' : ''}`}>
          <h1>Hablemos</h1>
          <p>Estamos acá para ayudarte, escucharte y crear juntos.</p>
        </div>
        

        <div className="contact-container">
          
          {/* TARJETA DEL FORMULARIO */}
          <div className={`contact-card ${loaded ? 'scale-in' : ''}`}>
            
            {!isSuccess ? (
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label>Nombre Completo</label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Tu nombre" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="input-group">
                  <label>Email de contacto</label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="tucorreo@ejemplo.com" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="input-group">
                  <label>¿Con qué área querés hablar?</label>
                  <select 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleChange} 
                    required
                    className={formData.subject === "" ? "empty" : "filled"}
                  >
                    {contactOptions.map((opt, index) => (
                      <option key={index} value={opt.value} disabled={opt.value === ""}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label>Mensaje</label>
                  <textarea 
                    name="message" 
                    rows="5" 
                    placeholder="Contanos, ¿en qué podemos ayudarte?" 
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                  ></textarea>
                </div>

                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="loader"></span>
                  ) : (
                    "Enviar Mensaje"
                  )}
                </button>
              </form>
            ) : (
              // --- VISTA DE ÉXITO ---
              <div className="success-message fade-in">
                <div className="success-icon">✨</div>
                <h2>¡Mensaje Enviado!</h2>
                <p>
                    Gracias por escribirnos, <strong>{formData.name}</strong>.
                    <br />
                    Hemos derivado tu consulta al área correspondiente.
                    Te responderemos a la brevedad a <u>{formData.email}</u>.
                </p>
                <button className="btn-back" onClick={() => setIsSuccess(false)}>
                  Enviar otro mensaje
                </button>
              </div>
            )}
          </div>

          {/* INFORMACIÓN EXTRA (EMAIL DIRECTO) */}
          <div className={`contact-info ${loaded ? 'fade-in-up-delay' : ''}`}>
            <p>¿Preferís enviarnos un mail directo?</p>
            <a href="mailto:hola@boxie.com.ar" className="email-link">hola@boxie.com.ar</a>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;