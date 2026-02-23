import React from 'react';
import { Link } from 'react-router-dom';
import logo from '/Boxie.png'; // Asegúrate que la ruta sea la correcta (si está en public es /Boxie.png)
import { Facebook, Instagram, Music2, Youtube, Mail, MapPin } from 'lucide-react';
import '../styles/Footer.css'; // Crearemos este archivo nuevo para no ensuciar Home.css

const Footer = () => {
  return (
    <footer className="boxie-footer">
      <div className="footer-container">
        
        {/* COLUMNA 1: MARCA Y BIO */}
        <div className="footer-col brand-col">
          <img src={logo} alt="Boxie Digital" className="footer-logo" />
          <p className="footer-tagline">
            Conectando emociones y rompiendo distancias. Regalos digitales con alma.
          </p>
          <div className="contact-item">
            <MapPin size={16} className="contact-icon" />
            <span>Buenos Aires, Argentina</span>
          </div>
          <div className="contact-item">
            <Mail size={16} className="contact-icon" />
            <span>hola@boxie.com.ar</span>
          </div>
        </div>

        {/* COLUMNA 2: EXPLORA */}
        <div className="footer-col">
          <h3>Explora</h3>
          <ul className="footer-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/galeria">Galería de Ejemplos</Link></li>
            <li><Link to="/about">Nuestra Historia</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        {/* COLUMNA 3: LEGALES Y AYUDA */}
        <div className="footer-col">
          <h3>Te Ayudamos</h3>
          <ul className="footer-links">
            <li><Link to="/ayuda">Preguntas Frecuentes</Link></li>
            <li><Link to="/legales/terminos">Términos y Condiciones</Link></li>
            <li><Link to="/legales/privacidad">Política de Privacidad</Link></li>
            <li><Link to="/legales/pagos">Medios de Pago</Link></li>
            <li><Link to="/legales/propiedad-intelectual">Propiedad Intelectual</Link></li>
          </ul>
        </div>

        {/* COLUMNA 4: REDES Y DATA FISCAL (QR) */}
        <div className="footer-col social-col">
          <h3>Sigamos Conectados</h3>
          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram /></a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer"><Music2 /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer"><Youtube /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><Facebook /></a>
          </div>

          {/* QR DATA FISCAL (AFIP) */}
          <div className="afip-qr-container">
            <p className="qr-label">Data Fiscal</p>
            <a href="#" target="_blank" rel="noreferrer" className="qr-link">
               {/* PLACEHOLDER DEL QR - Reemplazar src con tu imagen real de AFIP */}
               <img 
                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/QR_Code_F960_AFIP.svg/1200px-QR_Code_F960_AFIP.svg.png" 
                 alt="Data Fiscal AFIP" 
                 className="afip-img"
               />
            </a>
          </div>
        </div>

      </div>

      {/* BARRA INFERIOR */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Boxie Digital. Todos los derechos reservados.</p>
        <p className="made-with">Hecho con ❤️ en Argentina</p>
      </div>
    </footer>
  );
};

export default Footer;