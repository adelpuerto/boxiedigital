import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import '../../styles/Help.css';

const Help = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  
  // Estado para controlar qué pregunta del acordeón está abierta
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // --- DATOS: PREGUNTAS FRECUENTES ---
  const faqs = [
    {
      question: "¿Qué es exactamente una Boxie?",
      answer: "Boxie es una experiencia de regalo 100% digital. Es una página web personalizada y única que creás para alguien especial, donde podés incluir fotos, música, dedicatorias y sorpresas. Al finalizar, recibís un link mágico para enviárselo."
    },
    {
      question: "¿Cuánto tiempo dura el link activo?",
      answer: "Por cuestiones de privacidad y servidores, las Boxies tienen una vida útil de 60 días desde su creación. Durante ese tiempo, la persona agasajada puede entrar todas las veces que quiera."
    },
    {
      question: "¿Puedo editar la Boxie después de pagar?",
      answer: "¡Sí! Una vez que comprás, recibís un acceso de editor. Podés modificar el contenido las veces que necesites hasta que decidas 'Bloquear y Regalar'. Una vez bloqueada para el envío, ya no se puede modificar."
    },
    {
      question: "¿Cómo funcionan los pagos?",
      answer: "Procesamos todos los pagos a través de Mercado Pago, lo que garantiza la seguridad de tus datos. Podés pagar con tarjeta de crédito, débito o dinero en cuenta."
    }
  ];

  return (
    <>
      <Navbar />
      <div className="help-page">
        
        {/* HERO SECTION */}
        <div className={`help-hero ${loaded ? 'fade-in-up' : ''}`}>
          <h1>Centro de Ayuda y Legales</h1>
          <p>Todo lo que necesitás saber sobre Boxie, en un solo lugar.</p>
        </div>

        <div className="help-container">
          
          {/* --- SECCIÓN 1: PREGUNTAS FRECUENTES (FAQ) --- */}
          <section className={`faq-section ${loaded ? 'fade-in' : ''}`}>
            <h2>Preguntas Frecuentes</h2>
            <div className="accordion">
              {faqs.map((item, index) => (
                <div 
                  key={index} 
                  className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="accordion-header">
                    <h3>{item.question}</h3>
                    <span className="accordion-icon">{activeIndex === index ? '−' : '+'}</span>
                  </div>
                  <div className="accordion-body">
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* --- SECCIÓN 2: GRID DE LEGALES --- */}
          <section className="legal-section">
            <h2>Información Legal y Políticas</h2>
            <p className="legal-subtitle">Para tu tranquilidad y seguridad, cumplimos con las normativas vigentes en Argentina.</p>
            
            <div className="legal-grid">
              
              {/* Card: Términos y Condiciones */}
              <div className="legal-card" onClick={() => navigate('/legales/terminos')}>
                <div className="legal-icon">📜</div>
                <h3>Términos y Condiciones</h3>
                <p>Las reglas del juego. Leé nuestro contrato de servicio.</p>
              </div>

              {/* Card: Política de Privacidad */}
              <div className="legal-card" onClick={() => navigate('/legales/privacidad')}>
                <div className="legal-icon">🔒</div>
                <h3>Política de Privacidad</h3>
                <p>Cómo cuidamos tus datos y fotos (Ley 25.326).</p>
              </div>

              {/* Card: Pagos y Reembolsos (Botón de Arrepentimiento) */}
              <div className="legal-card" onClick={() => navigate('/legales/pagos')}>
                <div className="legal-icon">💳</div>
                <h3>Pagos y Reembolsos</h3>
                <p>Política de Mercado Pago y derecho de arrepentimiento.</p>
              </div>

              {/* Card: Propiedad Intelectual */}
              <div className="legal-card" onClick={() => navigate('/legales/propiedad-intelectual')}>
                <div className="legal-icon">©️</div>
                <h3>Propiedad Intelectual</h3>
                <p>Sobre la marca Boxie y el uso de contenidos.</p>
              </div>

            </div>

            {/* BOTÓN DEFENSA AL CONSUMIDOR (Obligatorio en AR) */}
            <div className="consumer-defense">
                <a href="https://www.argentina.gob.ar/produccion/defensadelconsumidor/formulario" target="_blank" rel="noopener noreferrer">
                    <p>Defensa de las y los consumidores. Para reclamos ingresá aquí.</p>
                </a>
            </div>
          </section>

          {/* --- SECCIÓN 3: NO ENCONTRÉ RESPUESTA (CTA) --- */}
          <section className="help-contact">
            <div className="contact-box">
                <h2>¿Seguís con dudas?</h2>
                <p>Nuestro equipo está listo para ayudarte con lo que necesites.</p>
                <button className="btn-primary-outline" onClick={() => navigate('/contacto')}>
                    Ir a Contacto
                </button>
            </div>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Help;