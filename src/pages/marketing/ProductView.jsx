import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/ProductView.css';

// --- IMÁGENES ---
import pareja1 from '../../assets/img/pareja_1.jpg';
import pareja2 from '../../assets/img/pareja_2.jpg';
import pareja3 from '../../assets/img/pareja_3.jpg';

import amistad1 from '../../assets/img/amistad_1.jpg';
import amistad2 from '../../assets/img/amistad_2.jpg';
import amistad3 from '../../assets/img/amistad_3.jpg';

import cumple1 from '../../assets/img/cumpleanos_1.jpg';
import cumple2 from '../../assets/img/cumpleanos_2.jpg';
import cumple3 from '../../assets/img/cumpleanos_3.jpg';

const productsData = {
  pareja: {
    id: 'pareja',
    title: 'Boxie para',
    highlight: 'Pareja',
    subtitle: 'El regalo digital perfecto para celebrar su amor.',
    price: 15000,
    images: [pareja1, pareja2, pareja3],
    description: [
      "Portada personalizada con sus nombres.",
      "Carrusel de 3 fotos para revivir momentos.",
      "Carta Dedicatoria para escribir lo que sentís.",
      "Su canción favorita sonando de fondo.",
      "Espacio final para agregar un regalo sorpresa."
    ]
  },
  amistad: {
    id: 'amistad',
    title: 'Boxie para',
    highlight: 'Amistad',
    subtitle: 'Para esa persona que está en todas.',
    price: 15000,
    images: [amistad1, amistad2, amistad3],
    description: [
      "Portada con diseño único para ustedes.",
      "Las mejores selfies y recuerdos juntos.",
      "Mensaje especial para agradecer la amistad.",
      "Ese temazo que cantan a los gritos.",
      "Espacio final para una sorpresa virtual."
    ]
  },
  cumpleanos: {
    id: 'cumpleanos',
    title: 'Boxie de',
    highlight: 'Cumpleaños',
    subtitle: '¡Hacé que su día sea inolvidable a la distancia!',
    price: 15000,
    images: [cumple1, cumple2, cumple3],
    description: [
      "Portada de Festejo con toda la onda.",
      "Recorrido por sus mejores momentos.",
      "Tus deseos para este nuevo año.",
      "Música de fiesta para celebrar.",
      "Espacio final para tu gift card o sorpresa."
    ]
  }
};

const ProductView = () => {
  const { type } = useParams(); 
  const navigate = useNavigate();
  const product = productsData[type] || productsData['pareja'];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // --- NUEVO ESTADO PARA LA OFERTA ---
  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    setCurrentImageIndex(0);
    window.scrollTo(0, 0);
    
    // Reiniciamos la oferta al cambiar de producto para que el contador empiece de cero
    setShowOffer(false); 

    // --- TEMPORIZADOR DE 45 SEGUNDOS ---
    const timer = setTimeout(() => {
      setShowOffer(true);
    }, 15000); // 45000 milisegundos = 45 segundos

    // Limpieza del timer si el usuario se va antes
    return () => clearTimeout(timer);

  }, [type]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

const handleBuy = () => {
    if (showOffer) {
        // Enviar con el cupón
        navigate('/checkout?coupon=LOQUIEROYA25');
    } else {
        // Enviar normal
        navigate('/checkout');
    }
};

  return (
    <>
      <Navbar />
      
      <div className="top-marquee">
        <div className="marquee-content">
          REGALÁ EL MOTIVO / PERSONALIZÁ / REGALÁ / ELEGÍ EL MOTIVO / PERSONALIZÁ / REGALÁ / ELEGÍ EL MOTIVO / 
        </div>
      </div>

      <div className="product-view-container">
        
        {/* TARJETA UNIFICADA */}
        <div className="product-main-card">
            
            {/* GALERÍA */}
            <div className="product-gallery">
                <div className="gallery-wrapper">
                    <button className="arrow-btn left" onClick={prevImage}>❮</button>
                    <img 
                        src={product.images[currentImageIndex]} 
                        alt={product.highlight} 
                        className="main-img fade-in"
                        key={`${product.id}-${currentImageIndex}`} 
                    />
                    <button className="arrow-btn right" onClick={nextImage}>❯</button>
                    
                    <div className="dots-overlay">
                        {product.images.map((_, index) => (
                        <div 
                            key={index}
                            className={`dot ${currentImageIndex === index ? 'active' : ''}`}
                            onClick={() => setCurrentImageIndex(index)}
                        ></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* INFO DEL PRODUCTO */}
            <div className="product-info">
                <div className="info-header">
                    <h1 className="p-title">{product.title} <span>{product.highlight}</span></h1>
                    <p className="p-subtitle">{product.subtitle}</p>
                </div>

                <div className="p-price-row">
                    {/* Si hay oferta mostramos el precio tachado visualmente */}
                    {showOffer ? (
                      <div className="price-offer-container">
                         <span className="old-price">$ {product.price.toLocaleString('es-AR')}</span>
                         <span className="new-price">$ {(product.price * 0.5).toLocaleString('es-AR')}</span>
                      </div>
                    ) : (
                      <span className="p-price">$ {product.price.toLocaleString('es-AR')}</span>
                    )}
                </div>

                <hr className="divider" />

                <ul className="p-features">
                    {product.description.map((item, index) => (
                        <li key={index}>
                            <span className="check-icon"></span> {item}
                        </li>
                    ))}
                </ul>

                <div className="action-area">
                    
                    {/* --- AQUÍ APARECE LA OFERTA --- */}
                    {showOffer && (
                      <div className="special-offer-box pop-in">
                        <span className="offer-emoji">🎁</span>
                        <div className="offer-texts">
                          <strong>¡OFERTA ESPECIAL PARA VOS!</strong>
                          <p>Si comprás YA, tenés un <span>50% OFF</span> aplicado.</p>
                        </div>
                      </div>
                    )}

                    <button className={`btn-buy ${showOffer ? 'btn-pulse' : ''}`} onClick={handleBuy}>
                        {showOffer ? 'QUIERO MI BOXIE CON DESCUENTO' : 'QUIERO MI BOXIE'}
                    </button>
                </div>

                <div className="why-boxie">
                    <h4>¿Por qué elegir Boxie?</h4>
                    <div className="benefits-grid">
                        <div className="benefit-item">
                            <span className="b-icon">🚀</span>
                            <p>Envío<br/>Inmediato</p>
                        </div>
                        <div className="benefit-item">
                            <span className="b-icon">🌎</span>
                            <p>Sin<br/>Distancias</p>
                        </div>
                        <div className="benefit-item">
                            <span className="b-icon">💖</span>
                            <p>Emoción<br/>Garantizada</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>

      <div className="recommendations-section">
        <h2 className="rec-title">Otras opciones</h2>
        <div className="rec-cards-container">
          {Object.values(productsData)
            .filter(p => p.id !== product.id)
            .map((recProduct) => (
              <div 
                key={recProduct.id} 
                className="rec-card"
                onClick={() => navigate(`/producto/${recProduct.id}`)}
              >
                <img src={recProduct.images[0]} alt={recProduct.highlight} />
                <div className="rec-card-overlay">
                  <h3>{recProduct.highlight}</h3>
                </div>
              </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductView;