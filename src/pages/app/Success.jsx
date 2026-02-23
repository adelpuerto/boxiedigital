// src/pages/app/Success.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/Success.css';
import logo from '../../assets/img/Boxie.png'; 

// --- FIREBASE IMPORTS ---
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../firebase/config'; 

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState(null);
  const [loading, setLoading] = useState(true); // Para esperar a que termine de guardar en DB

  const paymentStatus = searchParams.get("status"); 
  const paymentId = searchParams.get("payment_id");

  useEffect(() => {
    const createBoxieInDb = async () => {
        // Solo creamos si el pago está aprobado
        if (paymentStatus === 'approved' && paymentId) {
            
            const randomId = "BOX-" + Math.floor(1000 + Math.random() * 9000);
            const randomPass = Math.random().toString(36).slice(-8).toUpperCase();

            // Datos iniciales de la Boxie
            const newBoxieData = {
                boxId: randomId,
                paymentId: paymentId,
                accessPassword: randomPass,
                themeType: "love", // Default
                createdAt: new Date().toISOString(),
                isLocked: false, // Abierta para editar
                recipient: "", 
                sender: "",
                dedicationText: "",
                youtubeLink: "",
                songTitle: "",
                anecdoteText: "",
                dedicationImage: null,
                anecdoteImage: null,
                // Arrays vacíos inicializados
                coupons: Array(8).fill(""), 
                reasons: Array(10).fill("")
            };

            try {
                // GUARDAMOS EN FIREBASE
                await setDoc(doc(db, "boxies", randomId), newBoxieData);
                
                // Mostramos credenciales en pantalla
                setCredentials({ id: randomId, password: randomPass });
            } catch (error) {
                console.error("Error creando Boxie en DB:", error);
            } finally {
                setLoading(false);
            }
        } else {
            // Si no es approved, dejamos de cargar para mostrar el error
            setLoading(false);
        }
    };

    // Ejecutamos la creación
    createBoxieInDb();
  }, [paymentStatus, paymentId]);

  // Función para ir al editor (autologin)
  const handleStartDesign = () => {
      if (credentials) {
          localStorage.setItem('active_box_id', credentials.id);
          navigate('/editor');
      }
  };

  // --- VISTA DE ERROR / PAGO RECHAZADO ---
  if (paymentStatus !== 'approved' && !loading) {
    return (
        <>
            <Navbar />
            <div className="success-page error-mode">
                <div className="success-card error-card">
                    <div className="error-icon">💔</div>
                    
                    <h1>¡Ups! No se pudo completar el pago</h1>
                    <p className="subtitle">Parece que hubo un problema al procesar tu compra.</p>

                    <div className="reasons-box">
                        <h3>¿Por qué pudo haber pasado?</h3>
                        <ul>
                            <li>Fondos insuficientes en la tarjeta.</li>
                            <li>La tarjeta rechazó la operación por seguridad.</li>
                            <li>Hubo un micro-corte de internet durante el proceso.</li>
                        </ul>
                    </div>

                    <div className="commercial-hook">
                        <p>
                            <strong>¡No te rindas ahora!</strong> Estás a un paso de regalar algo único. 
                            Tu Boxie está lista esperando que le pongas tu magia. ✨
                        </p>
                    </div>

                    <div className="actions">
                        <button className="btn-start btn-retry" onClick={() => navigate('/checkout')}>
                            Intentar pagar nuevamente
                        </button>
                        <Link to="/ayuda" className="link-help">
                            Tengo problemas, necesito ayuda
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
  }

  // --- ESTADO DE CARGA (Para que no parpadee el error mientras guarda) ---
  if (loading) {
      return (
        <div style={{height:'100vh', display:'flex', justifyContent:'center', alignItems:'center', background:'#f8f9fa', flexDirection:'column', gap:'20px'}}>
            <div className="success-logo" style={{width:'80px', height:'80px', borderRadius:'50%', border:'4px solid #F44E63', borderTopColor:'transparent', animation:'spin 1s linear infinite'}}></div>
            <p style={{fontFamily:'Poppins, sans-serif', color:'#666'}}>Preparando tu Boxie...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      );
  }

  // --- VISTA DE ÉXITO (APPROVED) ---
  return (
    <>
      <Navbar />
      <div className="success-page">
        <div className="success-card">
            
            <div className="logo-container">
                <img src={logo} alt="Boxie Logo" className="success-logo" />
            </div>

            <h1>¡Muchas gracias por tu compra!</h1>
            <p className="subtitle">Tu pago (ID: {paymentId}) fue procesado y guardado correctamente.</p>

            <div className="credentials-box">
                <h3>🔐 Tus Datos de Acceso</h3>
                <p className="instruction">Guardá estos datos. Los necesitarás para diseñar tu Boxie.</p>
                
                <div className="cred-row">
                    <span className="label">ID de Boxie:</span>
                    <span className="value">{credentials?.id}</span>
                </div>
                <div className="cred-row">
                    <span className="label">Clave de Edición:</span>
                    <span className="value">{credentials?.password}</span>
                </div>

                <div className="alert-mail">
                    📩 También enviamos una copia a tu email.
                </div>
            </div>

            <p className="legal-disclaimer">
                * Al realizar esta compra, aceptás nuestros <a href="/legales/terminos">Términos y Condiciones</a> y <a href="/legales/privacidad">Política de Privacidad</a>.
            </p>

            <div className="actions">
                <button className="btn-start" onClick={handleStartDesign}>
                    Comenzar a Diseñar Ahora
                </button>
                <button className="btn-home" onClick={() => navigate('/')}>
                    Volver al Inicio
                </button>
            </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Success;