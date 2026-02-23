import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/LegalDoc.css';

// --- AQUÍ PEGAREMOS LOS TEXTOS LEGALES ---
// (Están separados en objetos para no ensuciar el código visual)
import { termsText, privacyText, paymentsText, ipText } from '../../data/legalTexts';

const LegalDoc = () => {
  const { slug } = useParams(); // Lee la URL (ej: /legales/terminos)
  const navigate = useNavigate();

  // Diccionario de documentos
  const documents = {
    'terminos': { title: "Términos y Condiciones", content: termsText },
    'privacidad': { title: "Política de Privacidad", content: privacyText },
    'pagos': { title: "Pagos y Reembolsos", content: paymentsText },
    'propiedad-intelectual': { title: "Propiedad Intelectual", content: ipText },
  };

  const currentDoc = documents[slug];

  useEffect(() => {
    window.scrollTo(0, 0); // Ir arriba al cambiar de página
  }, [slug]);

  // Si ponen una url cualquiera (ej: /legales/cualquiercosa), volver a Ayuda
  if (!currentDoc) {
    return (
        <div style={{textAlign:'center', padding:'50px'}}>
            <p>Documento no encontrado. Redirigiendo...</p>
            {setTimeout(() => navigate('/ayuda'), 2000)}
        </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="legal-page">
        <div className="legal-container">
            {/* Botón Volver */}
            <button className="btn-back-legal" onClick={() => navigate('/ayuda')}>
                ← Volver al Centro de Ayuda
            </button>

            <div className="legal-content">
                <h1>{currentDoc.title}</h1>
                <p className="last-update">Última actualización: {new Date().toLocaleDateString()}</p>
                <hr />
                
                {/* Renderizamos el texto HTML (peligroso si viene de usuarios, seguro si es nuestro texto) */}
                <div 
                    className="legal-text-body"
                    dangerouslySetInnerHTML={{ __html: currentDoc.content }} 
                />
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LegalDoc;