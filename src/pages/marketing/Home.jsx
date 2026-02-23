import React from 'react';
import { Link } from 'react-router-dom'; // Importante para que funcionen los clics
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/Home.css';

// --- CORRECCIÓN DE IMÁGENES ---
// Actualizado a los nombres reales que tenés ahora en la carpeta
import bannerBg from '../../assets/img/B.png';
import imgPareja from '../../assets/img/pareja_1.jpg';      // Antes pareja.jpg
import imgCumple from '../../assets/img/cumpleanos_1.jpg';  // Antes cumpleaños.jpg (sin ñ)
import imgAmistad from '../../assets/img/amistad_1.jpg';    // Antes amistad.jpg

import deco1 from '../../assets/img/decoration1.png';
import deco2 from '../../assets/img/decoration2.png';
import deco3 from '../../assets/img/decoration3.png';

const Home = () => {
  return (
    <>
      {/* SECCIÓN 1: BANNER PRINCIPAL */}
      <div className="bannerPrincipal">
        <img src={bannerBg} alt="Fondo" className="bImg" />
        
        <Navbar />

        <div className="containerInfoBanner">
            <p className="eslogan">Regalá una <br /> <span>BOXIE</span></p>
            <p className="esloganText">
                El regalo digital que le va a llegar al corazon. Regalá distinto, compartí un momento
                o conocé con una box digital pensada para esa persona especial.
            </p>
            <div className="containerButtons">
                <button className="preparemosTuRegalo">Preparemos tu regalo juntos</button>
                <button className="regalar">Regalar</button>
            </div>
        </div>
      </div>

      {/* SECCIÓN 2: CATEGORÍAS (Ahora con Links) */}
      <main className="emocionar-section">
        <h2 className="section-title">¿A QUIÉN QUERÉS EMOCIONAR HOY?</h2>

        <div className="cards-container">
            
            {/* CARD PAREJA (Linkeado a /producto/pareja) */}
            <Link to="/producto/pareja" className="card">
                <div className="card-image-container">
                    <img src={imgPareja} alt="Pareja" />
                </div>
                <div className="card-content">
                    <h4 className="card-title">Pareja</h4>
                    <p className="card-description">Un regalo lleno de amor para celebrar su conexión única.</p>
                </div>
            </Link>

            {/* CARD CUMPLEAÑOS (Linkeado a /producto/cumpleanos) */}
            <Link to="/producto/cumpleanos" className="card">
                <div className="card-image-container">
                    <img src={imgCumple} alt="Cumpleaños" />
                </div>
                <div className="card-content">
                    <h4 className="card-title black-adicional">Cumpleaños</h4>
                    <p className="card-description black-adicional">¡Celebra su día de manera especial con un detalle inolvidable!</p>
                </div>
            </Link>

            {/* CARD AMISTAD (Linkeado a /producto/amistad) */}
            <Link to="/producto/amistad" className="card">
                <div className="card-image-container">
                    <img src={imgAmistad} alt="Amistad" />
                </div>
                <div className="card-content">
                    <h4 className="card-title black-adicional">Amistad</h4>
                    <p className="card-description black-adicional">Demuéstrale lo mucho que lo valoras con un regalo hecho para él/ella.</p>
                </div>
            </Link>
        </div>
      </main>

      {/* SECCIÓN 3: BENEFICIOS */}
      <section className="textos">
        <h2 className="especialTitle">¡ESTO ES LO QUE HACE ESPECIAL A UNA BOXIE!</h2>
        <h3 className="regalaSubtitle">Regalá diferente, regalá con intención.</h3>
        <div className="containerGridCards">
            <div className="gridCard">
                <span>¡¡LLEGA AL INSTANTE!!</span>
                <p>Elegís la Boxie, la personalizás con un mensaje y ¡listo! Se entrega por mail o link en minutos.</p>
                <div className="container-decoration">
                    <img src={deco1} alt="" />
                </div>
            </div>
            <div className="gridCard">
                <span>EMOCIONA DE VERDAD</span>
                <p>No es un archivo más. Cada Boxie está diseñada para despertar sonrisas, lágrimas lindas o ese "ay, qué hermoso".</p>
                <div className="container-decoration">
                    <img src={deco2} alt="" />
                </div>
            </div>
            <div className="gridCard">
                <span>ES FÁCIL, ACCESIBLE Y SIEMPRE QUEDA BIEN</span>
                <p>No necesitás gastar una fortuna ni salir corriendo a comprar algo. Es un detalle distinto, emocional y pensado.</p>
                <div className="container-decoration">
                    <img src={deco3} alt="" />
                </div>
            </div>
        </div>
      </section>

      {/* SECCIÓN 4: FOOTER */}
      <Footer />
    </>
  );
};

export default Home;