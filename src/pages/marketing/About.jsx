import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import logoBoxie from '/Boxie.png'; // Asegúrate que esta ruta sea correcta
import '../../styles/About.css';

// --- FOTOS DE EJEMPLO (Reemplazalas por las de ustedes en src/assets) ---
// import agustinImg from '../../assets/agustin.jpg';
// import francoImg from '../../assets/franco.jpg';
const agustinPhoto = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=400&h=400"; // Placeholder
const francoPhoto = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=400&h=400"; // Placeholder

const About = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Navbar />
      <div className="about-page">
        
        {/* HERO SECTION */}
        <section className={`about-hero ${loaded ? 'fade-in-up' : ''}`}>
          <h1>Más que un regalo,<br /> <span className="highlight">una experiencia.</span></h1>
          <p className="subtitle">
            Conectando emociones y rompiendo distancias, una Boxie a la vez.
          </p>
        </section>

        {/* HISTORIA + MARCA */}
        <section className="our-story">
          <div className="story-container">
            {/* Esfera con LOGO BOXIE */}
         <div className={`image-wrapper ${loaded ? 'drop-in' : ''}`}>
              <div className="blob-bg"></div>
              
              {/* Agregamos la clase 'logo-sphere-container' para centrar bien el logo */}
              <div className="photo-sphere floating-subtle logo-sphere-container">
                <img src={logoBoxie} alt="Logo Boxie" className="boxie-logo-img" />
              </div>
            </div>

            <div className={`text-wrapper ${loaded ? 'slide-in-right' : ''}`}>
              <h2>Nuestra Historia</h2>
              <p>
                Todo empezó con un problema simple: <strong>¿Cómo abrazar a un amigo que está a 10.000 km de distancia?</strong>
              </p>
              <p>
                Cansados de los regalos fríos y las gift cards impersonales, buscábamos una forma de enviar algo que tuviera "alma". Queríamos regalar recuerdos, música, risas y momentos.
              </p>
              <p>
                Así nació <strong>Boxie</strong>. Diseñada para ser original, 100% personalizada y capaz de viajar instantáneamente a cualquier parte del mundo. Porque la distancia separa cuerpos, pero no historias.
              </p>
            </div>
          </div>
        </section>

        {/* TEAM SECTION: ¿QUIÉNES ESTÁN DETRÁS? */}
        <section className="team-section">
            <h2 className="section-title">¿Quiénes están detrás de esto?</h2>
            <div className="team-grid">
                
                {/* AGUSTÍN */}
                <div className="team-card">
                    <div className="member-photo">
                        <img src={agustinPhoto} alt="Agustín Del Puerto" />
                    </div>
                    <h3>Agustín Del Puerto</h3>
                    <span className="role">CEO & Co-Founder</span>
                    <p className="mini-bio">El estratega detrás de la visión. Obsesionado con conectar personas a través de la tecnología.</p>
                    <a href="https://linkedin.com/in/tu-usuario" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                        <span>in</span> LinkedIn
                    </a>
                </div>

                {/* FRANCO */}
                <div className="team-card">
                    <div className="member-photo">
                        <img src={francoPhoto} alt="Franco Alvarez" />
                    </div>
                    <h3>Franco Alvarez</h3>
                    <span className="role">Head of Design & Co-Founder</span>
                    <p className="mini-bio">El arquitecto visual. Creador de la identidad estética y la experiencia de usuario de Boxie.</p>
                    <a href="https://linkedin.com/in/tu-usuario" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                        <span>in</span> LinkedIn
                    </a>
                </div>

            </div>
        </section>

        {/* VALORES (ICONOS) */}
        <section className="values-section">
          <div className="value-card">
            <div className="icon">🚀</div>
            <h3>100% Digital</h3>
            <p>Llega al instante. Sin envíos, sin esperas.</p>
          </div>
          <div className="value-card">
            <div className="icon">🎨</div>
            <h3>Creatividad Pura</h3>
            <p>Un lienzo en blanco para tus fotos y anécdotas.</p>
          </div>
          <div className="value-card">
            <div className="icon">❤️</div>
            <h3>Emoción Real</h3>
            <p>Diseñada para generar sonrisas y lágrimas felices.</p>
          </div>
        </section>

        {/* ¿QUÉ BOXIE ELEGIR? */}
        <section className="guide-section">
            <h2 className="section-title">¿Qué Boxie elegir?</h2>
            <p className="section-desc">Cada Boxie tiene una misión diferente. ¿Cuál es la tuya hoy?</p>
            
            <div className="guide-grid">
                <div className="guide-item">
                    <span className="emoji">💘</span>
                    <h4>Boxie Amor</h4>
                    <p>Ideal para aniversarios, mesesarios o simplemente decir "Te amo" de una forma única.</p>
                </div>
                <div className="guide-item">
                    <span className="emoji">✈️</span>
                    <h4>Boxie Distancia</h4>
                    <p>Para ese amigo/a que se fue a vivir lejos. Un abrazo digital lleno de recuerdos.</p>
                </div>
                <div className="guide-item">
                    <span className="emoji">🎂</span>
                    <h4>Boxie Cumpleaños</h4>
                    <p>El regalo sorpresa perfecto cuando no puedes estar en la fiesta presencialmente.</p>
                </div>
            </div>
        </section>

        {/* CTA FINAL */}
        <section className="about-cta">
          <h2>¿Listo para emocionar a alguien?</h2>
          <button className="btn-primary-lg" onClick={() => navigate('/galeria')}>
            Crear mi primera Boxie
          </button>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default About;