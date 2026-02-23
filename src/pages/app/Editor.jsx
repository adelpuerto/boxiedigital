// src/pages/app/Editor.jsx
import React, { useState, useEffect } from 'react';
import { Play, Edit2, Camera, Share2, CheckCircle, AlertTriangle, Lock, Save } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/Editor.css';
import GiftBoxPlayer, { THEME_CONTENT } from './BoxiePlayer'; 

// --- FIREBASE IMPORTS ---
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/config';

/* --- COMPONENTE AUXILIAR: SUBIDA DE IMÁGENES (Modificado para Base64) --- */
const ImageUpload = ({ label, onChange, preview }) => {
    
    // Función para convertir la imagen a código (Base64) para que se guarde en la BD
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            // Límite de seguridad: si es muy grande (más de 2MB) avisamos
            if (file.size > 2 * 1024 * 1024) {
                alert("La imagen es muy pesada. Intentá con una menor a 2MB.");
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                onChange(reader.result); // Guardamos la imagen como texto
            };
        }
    };

    return (
        <div style={{marginBottom: '20px'}}>
            <label style={{display:'block', fontSize:'0.9rem', fontWeight:'bold', color:'#555', marginBottom:'8px'}}>
                {label} <span style={{color:'#F44E63', marginLeft:'5px'}}>* (Obligatorio)</span>
            </label>
            <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                <label className="btn-small-action" style={{
                    background: preview ? '#e6fffa' : '#2A2433', 
                    color: preview ? '#2c7a7b' : 'white', 
                    border: preview ? '1px solid #2c7a7b' : 'none',
                    display:'flex', alignItems:'center', gap:'5px', padding:'10px 15px', borderRadius:'10px', cursor:'pointer', fontSize:'0.9rem', transition: 'all 0.2s'
                }}>
                    {preview ? <CheckCircle size={16}/> : <Camera size={16}/>} 
                    {preview ? 'Cambiar Foto' : 'Subir Foto'}
                    <input type="file" accept="image/*" style={{display:'none'}} onChange={handleFileChange}/>
                </label>
                {preview && (
                    <div style={{width:'50px', height:'50px', borderRadius:'8px', overflow:'hidden', border:'2px solid #ddd'}}>
                        <img src={preview} alt="Preview" style={{width:'100%', height:'100%', objectFit:'cover'}} />
                    </div>
                )}
                {!preview && <span style={{fontSize:'0.8rem', color:'#999', fontStyle:'italic'}}>Sin foto seleccionada</span>}
            </div>
        </div>
    );
};

/* --- MODAL DE REVISIÓN --- */
const ReviewModal = ({ data, onClose, onConfirm }) => {
    const hasPassword = !!data.accessPassword;
    const hasDedicationImg = !!data.dedicationImage;
    const hasAnecdoteImg = !!data.anecdoteImage;
    const isReady = hasPassword && hasDedicationImg && hasAnecdoteImg;

    return (
        <div className="modal-overlay" style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', backdropFilter:'blur(5px)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <div className="modal-content" style={{background:'white', padding:'30px', borderRadius:'20px', maxWidth:'500px', width:'90%', textAlign:'center', border:'4px solid #F44E63', boxShadow:'0 20px 50px rgba(0,0,0,0.3)'}}>
                <div style={{fontSize:'3rem', marginBottom:'10px'}}>🧐</div>
                <h2 style={{color:'#2A2433', fontSize:'1.8rem', marginBottom:'10px'}}>Revisión Final</h2>
                <p style={{color:'#666', marginBottom:'20px'}}>Chequeá que no falte nada importante antes de crear el regalo.</p>
                
                <div style={{background:'#f9f9f9', padding:'20px', borderRadius:'15px', textAlign:'left', display:'flex', flexDirection:'column', gap:'15px'}}>
                    <div style={{display:'flex', justifyContent:'space-between', borderBottom:'1px dashed #ddd', paddingBottom:'10px'}}>
                        <span style={{fontWeight:'bold', color:'#888'}}>Para:</span>
                        <span style={{fontWeight:'bold', color:'#F44E63'}}>{data.recipient}</span>
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px dashed #ddd', paddingBottom:'10px'}}>
                        <span style={{fontWeight:'bold', color:'#888'}}>Clave de Acceso:</span>
                        {hasPassword ? (
                            <span style={{fontWeight:'900', color:'#2A2433', background:'#e0ffe0', padding:'2px 8px', borderRadius:'5px'}}>{data.accessPassword}</span>
                        ) : (
                            <span style={{color:'red', fontWeight:'bold', display:'flex', alignItems:'center', gap:'5px'}}><AlertTriangle size={14}/> Falta definir</span>
                        )}
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <span style={{fontWeight:'bold', color:'#888'}}>Foto Dedicatoria:</span>
                        {hasDedicationImg ? <span style={{color:'green', fontWeight:'bold'}}>OK ✅</span> : <span style={{color:'red', fontWeight:'bold'}}>Falta ❌</span>}
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <span style={{fontWeight:'bold', color:'#888'}}>Foto Anécdota:</span>
                        {hasAnecdoteImg ? <span style={{color:'green', fontWeight:'bold'}}>OK ✅</span> : <span style={{color:'red', fontWeight:'bold'}}>Falta ❌</span>}
                    </div>
                </div>

                {!isReady && (
                    <div style={{marginTop:'15px', padding:'10px', background:'#fff0f0', color:'#d32f2f', borderRadius:'10px', fontSize:'0.9rem'}}>
                        ⚠️ Faltan completar campos obligatorios (Clave o Fotos).
                    </div>
                )}

                {isReady && (
                    <div style={{marginTop:'20px', padding:'15px', background:'#fff8e1', color:'#856404', borderRadius:'12px', fontSize:'0.85rem', textAlign:'left', border:'1px solid #ffeeba'}}>
                        <p style={{marginBottom:'8px'}}>⚠️ <strong>ATENCIÓN: LEER ANTES DE SEGUIR</strong></p>
                        <ul style={{paddingLeft:'20px', margin:0, lineHeight:'1.4'}}>
                            <li>Al confirmar, la Boxie se <strong>bloqueará</strong> y <strong>NO podrás volver a editarla</strong>.</li>
                            <li>El regalo expirará automáticamente en <strong>60 días</strong>.</li>
                        </ul>
                        <p style={{marginTop:'10px', fontSize:'0.8rem', color:'#666'}}>
                            ¿Te equivocaste? Escribinos a <a href="mailto:ayuda@boxie.com.ar" style={{color:'#F44E63', fontWeight:'bold'}}>ayuda@boxie.com.ar</a>.
                        </p>
                    </div>
                )}

                <div style={{marginTop:'20px', display:'flex', gap:'10px'}}>
                    <button onClick={onClose} style={{flex:1, padding:'15px', borderRadius:'30px', border:'2px solid #ddd', background:'white', color:'#666', fontWeight:'bold', cursor:'pointer'}}>Seguir editando</button>
                    <button 
                        onClick={onConfirm} 
                        disabled={!isReady} 
                        style={{
                            flex:1, padding:'15px', borderRadius:'30px', border:'none', 
                            background: !isReady ? '#ccc' : '#F44E63', 
                            color:'white', fontWeight:'bold', 
                            cursor: !isReady ? 'not-allowed' : 'pointer', 
                            boxShadow: !isReady ? 'none' : '0 5px 15px rgba(244, 78, 99, 0.4)',
                            opacity: !isReady ? 0.7 : 1,
                            display:'flex', alignItems:'center', justifyContent:'center', gap:'8px'
                        }}
                    >
                        {isReady && <Lock size={16} />} CONFIRMAR 🎁
                    </button>
                </div>
            </div>
        </div>
    );
};

/* --- PANTALLA DE ÉXITO (COMPARTIR) --- */
const SuccessScreen = ({ data }) => {
    const appUrl = window.location.origin + "/gift?id=" + data.boxId; 
    const shareMessage = `¡Hola ${data.recipient}! ✨\n\nTe preparé una sorpresa digital en Boxie. 🎁\n\n1. Entrá acá:\n🔗 ${appUrl}\n\n2. Usá esta clave: *${data.accessPassword}*\n\n¡Espero que te guste!`;

    const handleCopy = () => { navigator.clipboard.writeText(shareMessage); alert("¡Copiado!"); };
    const handleWhatsApp = () => { window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`, '_blank'); };

    return (
        <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fdfbfb', padding: '20px', textAlign: 'center'}}>
            <div style={{background: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', maxWidth: '500px', width: '100%', zIndex: 10, border: '1px solid #eee'}}>
                <div style={{fontSize:'4rem', marginBottom:'20px'}}>🎁✨</div>
                <h1 style={{color:'#2A2433', fontSize:'2.5rem', marginBottom:'10px'}}>¡Boxie Lista!</h1>
                <p style={{color:'#666', fontSize:'1.1rem', marginBottom:'30px'}}>Ya podés compartir este regalo único.</p>

                <div style={{background: '#2A2433', color: 'white', borderRadius: '20px', padding: '25px', marginBottom: '30px', textAlign: 'left', position: 'relative', overflow: 'hidden'}}>
                    <div style={{position:'absolute', top:'-20px', right:'-20px', fontSize:'5rem', opacity:0.1}}>🔐</div>
                    <p style={{fontSize:'0.8rem', opacity:0.7, marginBottom:'5px'}}>LINK DE REGALO</p>
                    <p style={{fontSize:'0.9rem', color:'#F44E63', fontWeight:'bold', marginBottom:'15px', wordBreak:'break-all'}}>{appUrl}</p>
                    <div style={{display:'flex', gap:'20px'}}>
                        <div><p style={{fontSize:'0.8rem', opacity:0.7, marginBottom:'5px'}}>ID CAJA</p><p style={{fontSize:'1.2rem', fontWeight:'bold'}}>{data.boxId}</p></div>
                        <div><p style={{fontSize:'0.8rem', opacity:0.7, marginBottom:'5px'}}>CLAVE</p><p style={{fontSize:'1.2rem', fontWeight:'bold', color:'#FFD700'}}>{data.accessPassword}</p></div>
                    </div>
                </div>

                <div style={{display:'flex', flexDirection:'column', gap:'15px', marginBottom:'30px'}}>
                    <button onClick={handleWhatsApp} style={{background: '#25D366', color: 'white', border: 'none', padding: '18px', borderRadius: '15px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}><Share2 size={24} /> Enviar por WhatsApp</button>
                    <button onClick={handleCopy} style={{background: 'white', color: '#333', border: '2px solid #eee', padding: '15px', borderRadius: '15px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}><CheckCircle size={20} color="#666"/> Copiar Datos</button>
                </div>
                
                <div style={{borderTop:'1px dashed #eee', paddingTop:'20px'}}>
                    <p style={{fontSize:'0.85rem', color:'#888', lineHeight:'1.5'}}>
                        ¿Te equivocaste en algún dato?<br/>
                        Escribinos a <a href="mailto:ayuda@boxie.com.ar" style={{color:'#F44E63', fontWeight:'bold', textDecoration:'none'}}>ayuda@boxie.com.ar</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

/* --- ADMIN PANEL (FORMULARIO) --- */
const AdminPanel = ({ data, updateData }) => {
  const handleThemeSelect = (type) => {
    updateData('themeType', type);
    if (THEME_CONTENT[type]) {
        if (THEME_CONTENT[type].coupons) updateData('coupons', THEME_CONTENT[type].coupons.map(c => c.title));
        if (THEME_CONTENT[type].reasons) updateData('reasons', THEME_CONTENT[type].reasons);
    }
  };
  const handleArrayChange = (key, index, value) => { const newArray = [...data[key]]; newArray[index] = value; updateData(key, newArray); };

  return (
    <div className="admin-panel">
      <div className="panel-header"><h2><Edit2 size={18} /> Personalizar Boxie</h2><span style={{fontSize:'0.8rem', opacity:0.8}}>ID: {data.boxId}</span></div>
      <div className="panel-body">
        
        {/* SECCIÓN 0: CONFIGURACIÓN */}
        <div style={{marginBottom:'30px', paddingBottom:'20px', borderBottom:'1px dashed #eee'}}>
            <h3 className="form-section-title" style={{marginTop:0}}>0. Configuración</h3>
            <label style={{display:'block', marginBottom:'10px', fontWeight:'bold', fontSize:'0.9rem', color:'#555'}}>Tipo de Boxie:</label>
            <div style={{display:'flex', gap:'10px', marginBottom:'20px'}}>
                {['love', 'friend', 'bday'].map(type => (
                    <button key={type} onClick={() => handleThemeSelect(type)} style={{flex:1, padding:'15px', borderRadius:'12px', cursor:'pointer', border: data.themeType === type ? '2px solid #F44E63' : '1px solid #ddd', background: data.themeType === type ? '#fff0f3' : 'white', opacity: data.themeType === type ? 1 : 0.7}}>
                        <div style={{fontSize:'1.8rem'}}>{type === 'love' ? '❤️' : type === 'friend' ? '👯‍♀️' : '🎂'}</div>
                        <div style={{fontWeight:'bold', fontSize:'0.7rem', color:'#333'}}>{type === 'love' ? 'Pareja' : type === 'friend' ? 'Amigos' : 'Cumple'}</div>
                    </button>
                ))}
            </div>
            <div className="form-group">
                <label>🔒 Clave de Acceso: <span style={{color:'#F44E63'}}>*</span></label>
                <input type="text" className="form-input" placeholder="Ej: cumple2025" value={data.accessPassword} onChange={(e) => updateData('accessPassword', e.target.value)} />
            </div>
        </div>

        {/* SECCIONES EDITABLES */}
        <h3 className="form-section-title">1. Datos Personales</h3>
        <div className="form-group"><label>Para</label><input type="text" className="form-input" value={data.recipient} onChange={(e) => updateData('recipient', e.target.value)} /></div>
        <div className="form-group"><label>De Parte de</label><input type="text" className="form-input" value={data.sender} onChange={(e) => updateData('sender', e.target.value)} /></div>
        
        <h3 className="form-section-title">2. Dedicatoria</h3>
        <div className="form-group"><label>Mensaje</label><textarea className="form-textarea" maxLength={250} value={data.dedicationText} onChange={(e) => updateData('dedicationText', e.target.value)} /></div>
        <ImageUpload label="Foto Dedicatoria" preview={data.dedicationImage} onChange={(val) => updateData('dedicationImage', val)} />
        
        <h3 className="form-section-title">3. Contenido Extra</h3>
        <div className="form-group"><label>Link YouTube</label><input type="text" className="form-input" value={data.youtubeLink} onChange={(e) => updateData('youtubeLink', e.target.value)} /></div>
        <div className="form-group"><label>Canción (Título)</label><input type="text" className="form-input" value={data.songTitle} onChange={(e) => updateData('songTitle', e.target.value)} /></div>
        
        <div className="form-group"><label>Anécdota (Texto)</label><textarea className="form-textarea" value={data.anecdoteText} onChange={(e) => updateData('anecdoteText', e.target.value)} /></div>
        <ImageUpload label="Foto Anécdota" preview={data.anecdoteImage} onChange={(val) => updateData('anecdoteImage', val)} />
        
        <h3 className="form-section-title">4. Cuponera (8 items)</h3>
        <p style={{fontSize:'0.85rem', color:'#666', marginBottom:'15px', lineHeight:'1.4', background:'#f5f5f5', padding:'10px', borderRadius:'10px'}}>
            📝 <strong>¿Qué poner acá?</strong> Escribí 8 "vales" simbólicos.
        </p>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>{data.coupons.map((c, i) => (<input key={i} type="text" className="form-input" placeholder={`Cupón ${i+1}`} value={c} onChange={(e) => handleArrayChange('coupons', i, e.target.value)} />))}</div>
        
        <h3 className="form-section-title">5. 10 Razones</h3>
        <p style={{fontSize:'0.85rem', color:'#666', marginBottom:'15px', lineHeight:'1.4', background:'#f5f5f5', padding:'10px', borderRadius:'10px'}}>
            ❤️ Enumerá <strong>10 motivos</strong> por los cuales querés a esta persona.
        </p>
        {data.reasons.map((r, i) => (<input key={i} type="text" className="form-input" placeholder={`Razón #${i+1}`} value={r} onChange={(e) => handleArrayChange('reasons', i, e.target.value)} style={{marginBottom:'5px'}} />))}
        
        <div style={{height:'20px'}}></div>
      </div>
    </div>
  );
};

/* --- APP PRINCIPAL EDITOR --- */
const Editor = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState(null);

  const activeId = localStorage.getItem('active_box_id');

  // 1. CARGA INICIAL DESDE FIREBASE
  useEffect(() => {
      const fetchData = async () => {
          if (!activeId) return;
          try {
              const docRef = doc(db, "boxies", activeId);
              const docSnap = await getDoc(docRef);

              if (docSnap.exists()) {
                  setData(docSnap.data());
                  if (docSnap.data().isLocked) setIsPublished(true);
              } else {
                  alert("No se encontró la caja en la base de datos");
              }
          } catch (error) {
              console.error("Error cargando:", error);
          } finally {
              setLoading(false);
          }
      };
      fetchData();
  }, [activeId]);

  // 2. GUARDAR CAMBIOS EN FIREBASE
  const saveDataToFirebase = async (newData = data) => {
      setSaving(true);
      try {
          const docRef = doc(db, "boxies", activeId);
          await updateDoc(docRef, newData);
          // Opcional: mostrar un toast o mensaje pequeño
      } catch (error) {
          console.error("Error guardando:", error);
          alert("Hubo un problema al guardar. Revisá tu conexión.");
      } finally {
          setSaving(false);
      }
  };

  const updateData = (key, value) => {
      setData(prev => {
          const updated = { ...prev, [key]: value };
          return updated;
      });
  };

  const handlePublish = async () => {
      const finalData = { 
          ...data, 
          isLocked: true, 
          createdAt: new Date().toISOString() 
      };
      setData(finalData);
      await saveDataToFirebase(finalData); // Guardamos bloqueo en la nube
      setShowReview(false);
      setIsPublished(true);
  };

  if (loading) return <div style={{height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>Cargando Editor...</div>;
  if (!data) return null;
  if (isPublished) return <SuccessScreen data={data} />;

  return (
    <div className="editor-page">
      {!isPlaying && <Navbar />}
      {isPlaying ? (
        <GiftBoxPlayer data={data} closePlayer={() => setIsPlaying(false)} isPreview={true} /> 
      ) : (
        <div className="editor-container">
           <div className="bg-decoration">
               <span className="deco-icon" style={{top:'10%', left:'5%'}}>🎁</span>
               <span className="deco-icon" style={{bottom:'20%', right:'10%'}}>✨</span>
           </div>
           
           <div className="editor-title-block">
               <h1 className="editor-title">Creá tu <span>Boxie</span></h1>
               <div style={{background:'#2A2433', color:'white', display:'inline-block', padding:'5px 15px', borderRadius:'20px', fontSize:'0.8rem', marginBottom:'10px'}}>ID: {data.boxId}</div>
               <p className="editor-subtitle">Completá los datos y regalá emociones.</p>
               
               <div style={{display:'flex', gap:'10px', justifyContent:'center', marginTop:'20px'}}>
                   {/* BOTÓN GUARDAR BORRADOR (NUEVO) */}
                   <button onClick={() => saveDataToFirebase()} className="btn-preview" style={{background:'#2A2433', color:'white', border:'none'}}>
                       <Save size={16} /> {saving ? "Guardando..." : "Guardar Borrador"}
                   </button>
                   
                   <button onClick={() => setIsPlaying(true)} className="btn-preview" style={{background:'white', color:'#333', border:'1px solid #ddd'}}>
                       <Play fill="currentColor" size={16} /> Previsualizar
                   </button>
               </div>

               <div style={{marginTop:'15px'}}>
                   <button onClick={() => setShowReview(true)} className="btn-preview" style={{background:'#F44E63', color:'white', border:'none', width:'100%', justifyContent:'center', maxWidth:'300px', margin:'0 auto', boxShadow:'0 4px 15px rgba(244, 78, 99, 0.4)'}}>
                       🎁 FINALIZAR Y REGALAR
                   </button>
               </div>
           </div>

           <AdminPanel data={data} updateData={updateData} />
           {showReview && <ReviewModal data={data} onClose={() => setShowReview(false)} onConfirm={handlePublish} />}
        </div>
      )}
      {!isPlaying && <Footer />}
    </div>
  );
};

export default Editor;