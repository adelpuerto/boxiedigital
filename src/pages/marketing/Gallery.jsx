import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import '../../styles/Gallery.css';

// --- DATA: LAS 3 BOXIES OFICIALES ---
const galleryItems = [
  {
    id: 1,
    category: 'Amor',
    title: 'Pareja',
    // Nueva foto de pareja (Atardecer romántico)
    image: 'https://images.unsplash.com/photo-1529619768328-e37af76c6fe5?q=80&w=800&auto=format&fit=crop', 
    desc: 'Un regalo lleno de amor para celebrar su conexión única.',
    path: '/producto/pareja'
  },
  {
    id: 2,
    category: 'Cumpleaños',
    title: 'Cumpleaños',
    // Nueva foto de cumpleaños (Torta y velas, súper festivo)
    image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?q=80&w=800&auto=format&fit=crop', 
    desc: '¡Celebra su día de manera especial con un detalle inolvidable!',
    path: '/producto/cumpleanos'
  },
  {
    id: 3,
    category: 'Amistad',
    title: 'Amistad',
    // Foto de Amistad (Mantenemos la que SÍ funcionaba o usamos esta de grupo en la playa)
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop', 
    desc: 'Demuéstrale lo mucho que lo valoras con un regalo hecho para él/ella.',
    path: '/producto/amistad'
  }
];

const categories = ['Todos', 'Amor', 'Cumpleaños', 'Amistad'];

const Gallery = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Todos');
  const [loaded, setLoaded] = useState(false);
  const [filteredItems, setFilteredItems] = useState(galleryItems);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (filter === 'Todos') {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter(item => item.category === filter));
    }
  }, [filter]);

  return (
    <>
      <Navbar />
      <div className="gallery-page">
        
        {/* HERO SECTION */}
        <div className={`gallery-hero ${loaded ? 'fade-in-up' : ''}`}>
          <h1>Inspirate</h1>
          <p>Elegí el estilo perfecto para emocionar.</p>
        </div>

        {/* FILTROS */}
        <div className={`gallery-filters ${loaded ? 'fade-in' : ''}`}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID DE TARJETAS */}
        <div className="gallery-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="gallery-card fade-in">
              <div className="card-image">
                <img src={item.image} alt={item.title} />
                <div className="card-overlay">
                  {/* Botón que redirige al producto específico */}
                  <button className="btn-use-template" onClick={() => navigate(item.path)}>
                    Ver Boxie
                  </button>
                </div>
              </div>
              <div className="card-info">
                <span className="card-cat">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* SECCIÓN: ¿QUÉ BOXIE ELEGIR? */}
        <div className="choose-guide-section">
            <h2 className="section-title">¿Qué Boxie elegir?</h2>
            <p className="section-subtitle">Cada momento tiene su magia. Encontrá la tuya.</p>
            
            <div className="guide-cards-container">
                <div className="guide-card" onClick={() => navigate('/producto/pareja')}>
                    <div className="guide-icon">💘</div>
                    <h3>Para Enamorar</h3>
                    <p>Ideal para aniversarios, mesesarios o simplemente decir "Te amo". Incluye secciones románticas y línea de tiempo.</p>
                </div>
                
                <div className="guide-card" onClick={() => navigate('/producto/cumpleanos')}>
                    <div className="guide-icon">🎂</div>
                    <h3>Para Festejar</h3>
                    <p>¡La fiesta digital! Perfecta para saludos grupales, videos de amigos y recuerdos de cumpleaños anteriores.</p>
                </div>

                <div className="guide-card" onClick={() => navigate('/producto/amistad')}>
                    <div className="guide-icon">👯‍♀️</div>
                    <h3>Para Agradecer</h3>
                    <p>Para ese amigo/a de fierro. Un espacio para recordar viajes, anécdotas y risas compartidas.</p>
                </div>
            </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default Gallery;