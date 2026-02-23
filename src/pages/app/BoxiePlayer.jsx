// src/pages/app/BoxiePlayer.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { 
  Play, Heart, Gift, Music, Film, Ticket, Smile, Sun, 
  ArrowDown, ArrowRight, Edit2, X, AlertCircle, Share2, 
  Camera, Download, CheckCircle, Utensils, Moon, Wind, Headphones, PenTool
} from 'lucide-react';
import '../../styles/Editor.css'; // Asegurate de que este archivo tenga los estilos necesarios
import confetti from 'canvas-confetti';

// Referencia al logo en la carpeta public
const boxieLogo = "/Boxie.png"; 
const logoBoxie = "/Boxie.png"; // Mantenemos ambas referencias por compatibilidad con tu código

// --- PRESETS DE TEMAS ---
export const THEME_CONTENT = {
    love: {
        editorialTitle: <>¿Quién<br/><span>eres tú</span><br/>para mí?</>,
        editorialText1: <>Cuando pienso en vos, no solo pienso en la persona que amo, sino en todo lo que significas en mi vida. <span className="editorial-highlight">Eres mi lugar seguro</span>, mi confidente y la razón por la que los días grises tienen color.</>,
        editorialText2: "Eres inspiración, calma en medio del caos y ese abrazo que me reinicia. A tu lado descubrí que los momentos sencillos son los más valiosos.",
        coupons: ["Cena Romántica", "Masaje Relajante", "Noche de Cine", "Desayuno en la Cama", "Deseo Hot", "Escapada", "Deseo Mágico", "Vale por un Beso"],
        reasons: ["Por tu forma de mirarme.", "Por cómo me hacés reír.", "Porque sos mi hogar.", "Por tu paciencia infinita.", "Porque me apoyás siempre.", "Por tus abrazos sanadores.", "Porque sos la persona más linda.", "Por nuestras charlas eternas.", "Porque me hacés mejor persona.", "Simplemente, porque Te Amo."]
    },
    friend: {
        editorialTitle: <>Más que<br/><span>amistad</span>,<br/>hermandad.</>,
        editorialText1: <>Dicen que los amigos son la familia que uno elige, y yo te elegiría mil veces. <span className="editorial-highlight">Sos mi partner in crime</span>, la persona que sabe todos mis secretos y aún así se queda.</>,
        editorialText2: "Gracias por estar en las buenas, en las malas y en las pésimas. Por las risas hasta que duele la panza y por los consejos (aunque a veces no los siga).",
        coupons: ["Birras & Charla", "Noche de Pizza", "Chofer Designado", "Sesión de Terapia", "Salida a Bailar", "Tarde de Gaming", "Secreto Guardado", "Favor Especial"],
        reasons: ["Porque siempre estás ahí.", "Por tu honestidad brutal.", "Porque nadie me hace reír como vos.", "Por todas nuestras anécdotas.", "Porque me bancás en todas.", "Por ser mi psicólog@ gratis.", "Porque con vos todo es un plan.", "Porque entendés mis memes.", "Por no juzgarme (tanto).", "Porque sos de fierro."]
    },
    bday: {
        editorialTitle: <>¡Feliz<br/><span>Vuelta al</span><br/>Sol! 🎂</>,
        editorialText1: <>Hoy el mundo brilla un poco más porque es tu día. <span className="editorial-highlight">Celebro tu existencia</span>, tu energía y todo lo que contagias a los que te rodean.</>,
        editorialText2: "Deseo que este nuevo año te traiga aventuras increíbles, salud de hierro y momentos inolvidables. Gracias por dejarme ser parte de tu historia un año más.",
        coupons: ["Torta Favorita", "Regalo Sorpresa", "Brindis Especial", "Organizo la Previa", "Fotógrafo Personal", "Día Libre", "Bajón Post-Fiesta", "Deseo de Cumple"],
        reasons: ["Porque iluminás todo.", "Por tu energía única.", "Porque te merecés todo lo bueno.", "Por ser un luchador/a.", "Por tu corazón enorme.", "Porque inspirás a los demás.", "Por cómo festejás la vida.", "Porque sos inolvidable.", "Por ser auténtico/a.", "¡Porque es tu día!"]
    }
};

/* --- UTILS --- */
export const FloatingParticles = ({ type = "circle" }) => {
  const getParticleContent = () => {
      if (type === 'heart') return '❤';
      if (type === 'friend') {
          const emojis = ['😎', '✌️', '✨', '⚡', '🥂', '🔥'];
          return emojis[Math.floor(Math.random() * emojis.length)];
      }
      if (type === 'bday-fest') {
          const emojis = ['🎂', '🎈', '🎉', '🎁', '✨', '🥳'];
          return emojis[Math.floor(Math.random() * emojis.length)];
      }
      return '';
  };

  const particles = useMemo(() => [...Array(15)].map(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${6 + Math.random() * 5}s`,
    size: `${Math.random() * 10 + 10}px`,
    content: getParticleContent()
  })), [type]);

  return (
    <div style={{position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:1}}>
      {particles.map((p, i) => (
        <div key={i} className="floating-particle" style={{
            left: p.left, top: p.top, 
            fontSize: type === 'circle' ? '0' : '24px', 
            width: type === 'circle' ? p.size : 'auto',
            height: type === 'circle' ? p.size : 'auto',
            animationDelay:p.delay, 
            animationDuration:p.duration, 
            backgroundColor: type==='circle' ? 'rgba(255,255,255,0.2)' : 'transparent', 
            borderRadius:'50%', 
            color: type === 'heart' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.8)',
            opacity: (type === 'friend' || type === 'bday-fest') ? 0.7 : 1
        }}>
          {p.content}
        </div>
      ))}
    </div>
  );
};

export const ConfettiLayer = () => {
    const pieces = useMemo(() => [...Array(50)].map((_, i) => ({ id: i, left: Math.random() * 100 + '%', size: Math.random() * 8 + 6 + 'px', color: ['#F44E63', '#FFD700', '#2A2433', '#ffffff'][Math.floor(Math.random() * 4)], shape: Math.random() > 0.5 ? '50%' : '0px', duration: Math.random() * 2 + 3 + 's', delay: Math.random() * 2 + 's' })), []);
    return (<div className="confetti-container">{pieces.map((p) => (<div key={p.id} className="confetti-piece" style={{ left: p.left, width: p.size, height: p.size, backgroundColor: p.color, borderRadius: p.shape, animationDuration: p.duration, animationDelay: p.delay }} />))}</div>);
};

/* --- SLIDE COMPONENT (FULL SCREEN REAL) --- */
const Slide = ({ theme, children, index, currentSlide, dragOffset, isDragging, particles, fullScreen }) => {
    const isVisible = Math.abs(index - currentSlide) <= 1;
    if (!isVisible) return null;
    
    const basePosition = (index - currentSlide) * 100;
    const pixelOffset = isDragging ? dragOffset : 0;
    let scale = 1;
    if (isDragging && index === currentSlide) scale = 1 - (Math.abs(dragOffset) / 2000); 
    
    return (
      <div className={`slide ${theme} ${index === currentSlide ? 'active-slide' : ''}`} style={{ 
          transform: `translateY(calc(${basePosition}% + ${pixelOffset}px)) scale(${scale})`, 
          transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)', 
          zIndex: index === currentSlide ? 10 : 0, 
          
          // Lógica de bordes
          borderRadius: isDragging ? '30px' : (fullScreen ? '0px' : '30px'),
          padding: fullScreen ? '0px' : '20px', 
          overflow: 'hidden' 
      }}>
          {particles && <FloatingParticles type={particles} />}
          <div className="slide-content" style={{width:'100%', height:'100%'}}>{children}</div>
      </div>
    );
};

/* --- RECIPIENT SLIDE --- */
const RecipientSlide = ({ data }) => {
    const animStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&display=swap');
        @keyframes scaleUp { 0% { opacity: 0; transform: scale(0.5); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes fadeIn { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes floatEmoji { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes flicker { 0% { opacity: 0.9; transform: scale(1); } 100% { opacity: 1; transform: scale(1.1); } }
        @keyframes popIn { 0% { transform: scale(0); } 80% { transform: scale(1.05); } 100% { transform: scale(1); } }
        
        .boxie-font { font-family: 'Fredoka', sans-serif; }
        .flame-anim { transform-origin: center bottom; animation: flicker 0.3s infinite alternate; }
    `;

    // 1. MODO CUMPLEAÑOS
    if (data.themeType === 'bday') {
        return (
            <div style={{width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', position:'relative', zIndex:10, background: '#FFB7C5'}}>
                <style>{animStyles}</style>
                <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(120deg, #FFC0CB 0%, #FFB7C5 100%)', zIndex: 0}}></div>
                
                <div style={{position: 'absolute', top: '15%', width: '100%', textAlign: 'center', zIndex: 20, animation: 'popIn 0.8s ease-out'}}>
                    <h1 className="boxie-font" style={{fontSize:'3.5rem', color:'white', textTransform:'uppercase', lineHeight: 0.9, margin: 0, textShadow: '2px 2px 0px rgba(0,0,0,0.1)'}}>
                        ¡FELIZ<br/>CUMPLE!
                    </h1>
                    <h2 className="boxie-font" style={{fontSize:'4.2rem', color:'#FFF9C4', margin: '10px 0 0 0', textShadow: '3px 3px 0px #F06292'}}>
                        {data.recipient}
                    </h2>
                </div>

                <div style={{width: '100%', height: '65%', position: 'relative', zIndex: 10, marginBottom: '-5px'}}>
                    {/* SVG TORTA */}
                    <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" style={{width:'100%', height:'100%', filter:'drop-shadow(0 10px 20px rgba(0,0,0,0.15))'}}>
                        <ellipse cx="150" cy="260" rx="130" ry="30" fill="rgba(0,0,0,0.1)" />
                        <path d="M40 280 Q 60 250, 80 270 T 120 280" fill="none" stroke="#4682B4" strokeWidth="8" strokeLinecap="round" />
                        <circle cx="50" cy="275" r="12" fill="#FFC0CB" />
                        
                        <g transform="translate(210, 220) rotate(-5) scale(1.1)">
                             <path d="M0,20 L40,0 L80,20 L40,40 Z" fill="#87CEEB" />
                             <path d="M0,20 L40,40 L40,80 L0,60 Z" fill="#4682B4" />
                             <path d="M40,40 L80,20 L80,60 L40,80 Z" fill="#5F9EA0" />
                             <path d="M20,10 L60,30 M40,0 L40,40" stroke="#FFC0CB" strokeWidth="6" />
                             <path d="M20,10 L20,50" stroke="#FFC0CB" strokeWidth="6" opacity="0.8"/>
                             <path d="M60,30 L60,70" stroke="#FFC0CB" strokeWidth="6" opacity="0.8"/>
                             <path d="M40,10 C 20,-10, 10,20, 40,20 C 70,20, 60,-10, 40,10" fill="#FFC0CB" stroke="#F48FB1" strokeWidth="2" />
                        </g>

                        <g transform="translate(75, 110) scale(1.1)">
                            <ellipse cx="75" cy="140" rx="80" ry="25" fill="#F8C8D8" />
                            <ellipse cx="75" cy="135" rx="75" ry="22" fill="#FFFFFF" />
                            <path d="M10,80 L10,110 A65,20 0 0,0 140,110 L140,80" fill="#4E342E" />
                            <path d="M10,95 L10,105 A65,20 0 0,0 140,105 L140,95 A65,20 0 0,1 10,95" fill="#FFC0CB" />
                            <path d="M10,80 Q10,105 75,105 Q140,105 140,80 L140,85 Q120,115 100,90 Q80,120 60,95 Q40,115 20,90 Q10,100 10,80 Z" fill="#5D4037" />
                            <ellipse cx="75" cy="80" rx="65" ry="25" fill="#5D4037" />
                            <text x="75" y="90" textAnchor="middle" fill="white" fontSize="16" fontFamily="'Brush Script MT', cursive" transform="rotate(-3, 75, 90)">Happy</text>
                            <text x="75" y="105" textAnchor="middle" fill="white" fontSize="16" fontFamily="'Brush Script MT', cursive" transform="rotate(-3, 75, 105)">Birthday</text>
                            <g transform="translate(0, -10)">
                                <rect x="35" y="40" width="5" height="40" fill="#FF69B4" rx="2" /><circle cx="37.5" cy="35" r="4" fill="#FFD700" className="flame-anim" />
                                <rect x="55" y="35" width="5" height="40" fill="#4682B4" rx="2" /><circle cx="57.5" cy="30" r="4" fill="#FFD700" className="flame-anim" style={{animationDelay:'0.1s'}} />
                                <rect x="75" y="30" width="5" height="40" fill="#FF69B4" rx="2" /><circle cx="77.5" cy="25" r="4" fill="#FFD700" className="flame-anim" style={{animationDelay:'0.2s'}} />
                                <rect x="95" y="35" width="5" height="40" fill="#4682B4" rx="2" /><circle cx="97.5" cy="30" r="4" fill="#FFD700" className="flame-anim" style={{animationDelay:'0.3s'}} />
                                <rect x="115" y="40" width="5" height="40" fill="#FF69B4" rx="2" /><circle cx="117.5" cy="35" r="4" fill="#FFD700" className="flame-anim" style={{animationDelay:'0.4s'}} />
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
        );
    }

    // 2. MODO AMIGOS
    if (data.themeType === 'friend') {
        return (
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', 
                zIndex:10, overflow:'hidden',
                background: '#FFF8F0' 
            }}>
                <style>{animStyles}</style>
                <div style={{position:'absolute', top:'-10%', right:'-20%', width:'350px', height:'350px', background:'rgba(244, 78, 99, 0.15)', borderRadius:'50%', filter: 'blur(60px)', zIndex: 0}}></div>
                <div style={{position:'absolute', bottom:'-10%', left:'-20%', width:'350px', height:'350px', background:'rgba(42, 36, 51, 0.1)', borderRadius:'50%', filter: 'blur(60px)', zIndex: 0}}></div>

                <div style={{position:'relative', zIndex:1, display:'flex', flexDirection:'column', alignItems:'center', width:'100%'}}>
                    <div className="boxie-font" style={{
                        fontSize:'0.9rem', color:'#F44E63', letterSpacing:'2px', 
                        textTransform:'uppercase', fontWeight:'700', marginBottom:'20px',
                        background:'white', padding:'10px 25px', borderRadius:'30px',
                        boxShadow: '0 4px 15px rgba(244, 78, 99, 0.15)'
                    }}>
                        FRIENDSHIP EDITION
                    </div>

                    <h1 className="boxie-font" style={{
                        color: '#F44E63', fontSize: '4.5rem', lineHeight: 0.9, marginBottom: '40px', textAlign: 'center',
                        textShadow: '3px 3px 0px rgba(244, 78, 99, 0.1)',
                        animation: 'scaleUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                    }}>
                        {data.recipient}
                    </h1>

                    <div style={{
                        background: 'white', padding: '30px', borderRadius: '25px',
                        maxWidth: '85%', textAlign: 'center',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
                        border: '2px solid rgba(244, 78, 99, 0.1)',
                        animation: 'popIn 0.8s ease-out 0.3s backwards'
                    }}>
                        <p className="boxie-font" style={{fontSize:'1.3rem', color:'#555', margin:0, lineHeight:1.5, fontWeight: '500'}}>
                            "La vida es mucho más divertida<br/>cuando estamos juntos."
                        </p>
                        <div style={{marginTop:'20px', color:'#F44E63', fontWeight:'800', fontSize:'1.2rem', letterSpacing:'0.5px'}}>
                            ¡Gracias por estar en todas! ✨
                        </div>
                    </div>

                    <div style={{position:'absolute', top:'-90px', left:'10%', fontSize:'3.5rem', animation:'floatEmoji 3s infinite ease-in-out', opacity:0.9}}>👯‍♀️</div>
                    <div style={{position:'absolute', bottom:'-60px', right:'10%', fontSize:'3.5rem', animation:'floatEmoji 4s infinite ease-in-out 1s', opacity:0.9}}>🥂</div>
                </div>

                <div style={{
                    marginTop: '50px', borderBottom: '2px solid #F44E63', paddingBottom: '5px',
                    color: '#2A2433', fontSize: '1.2rem', fontWeight: 'bold', fontFamily: 'Fredoka, sans-serif'
                }}>
                    De: {data.sender}
                </div>
            </div>
        );
    }
    
    // 3. MODO PAREJA (CLÁSICO)
    return (
        <div style={{width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', position:'relative', zIndex:10}}>
            <style>{animStyles}</style>
            <div className="anim-shape shape-1"></div><div className="anim-shape shape-2"></div>
            <div className="gift-icon-anim" style={{marginBottom:'30px'}}><Gift size={80} color="white" strokeWidth={1.5} /></div>
            <p className="recipient-label" style={{animation: 'fadeIn 1s ease 0.5s forwards', opacity: 0}}>Este regalo especial es para...</p>
            <h1 className="recipient-name-big boxie-font" style={{fontSize: '3.5rem', margin: '10px 0 40px 0', color: 'white', fontWeight: '900', animation: 'scaleUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.8s forwards', opacity: 0, transform: 'scale(0.5)'}}>{data.recipient}</h1>
            <div className="sender-minimal" style={{animation: 'fadeIn 1s ease 1.5s forwards', opacity: 0}}>Con amor, {data.sender}</div>
        </div>
    );
};

/* --- SLIDE INTRODUCCIÓN --- */
const IntroStorySlide = ({ data }) => {
    const [step, setStep] = useState(0);

    const content = useMemo(() => {
        const textMap = {
            love: { tag: "LOVE EDITION", title: "SENTIMIENTOS", msg: "Porque sos mi persona favorita." },
            friend: { tag: "FRIEND EDITION", title: "CONEXIÓN TOTAL", msg: "Risas, locuras y momentos únicos." },
            bday: { tag: "BIRTHDAY EDITION", title: "CELEBRACIÓN", msg: "Te merecés un día lleno de magia." }
        };
        return textMap[data.themeType] || textMap.love;
    }, [data.themeType]);

    useEffect(() => {
        const t1 = setTimeout(() => setStep(1), 2200); 
        const t2 = setTimeout(() => setStep(2), 5500); 
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@700&family=Permanent+Marker&display=swap');
        @keyframes popInRotate { 0% { transform: scale(0) rotate(-20deg); opacity: 0; } 60% { transform: scale(1.1) rotate(5deg); opacity: 1; } 100% { transform: scale(1) rotate(var(--rot)); opacity: 1; } }
        @keyframes slideInUp { 0% { transform: translateY(50px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        .sticker-box { display: inline-block; padding: 5px 15px; margin: 5px; box-shadow: 5px 5px 0px rgba(0,0,0,0.2); animation: popInRotate 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; opacity: 0; }
        .font-marker { font-family: 'Permanent Marker', cursive; }
        .font-bold { font-family: 'Fredoka', sans-serif; font-weight: 700; letter-spacing: 1px; }
        .scribble { position: absolute; z-index: 20; animation: popInRotate 0.5s ease 0.5s forwards; opacity:0; }
    `;

    return (
        <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: 'linear-gradient(135deg, #F44E63 0%, #FF8E9E 100%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '20px', textAlign: 'center', overflow: 'hidden'
        }}>
            <style>{styles}</style>
            <div style={{position:'absolute', top:'40px', background:'white', padding:'10px 15px', borderRadius:'15px', transform:'rotate(-3deg)', boxShadow:'0 4px 10px rgba(0,0,0,0.1)', zIndex: 50}}>
                <img src={boxieLogo} alt="Boxie" style={{height:'30px'}} />
            </div>

            {step === 0 && (
                <div style={{position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <div className="sticker-box font-bold" style={{background:'#2A2433', color:'white', fontSize:'4rem', '--rot': '-5deg', textTransform:'uppercase', lineHeight: 1}}>¡HOLA!</div>
                    <div className="sticker-box font-bold" style={{background:'white', color:'#F44E63', fontSize:'3rem', '--rot': '3deg', marginTop:'-10px', animationDelay:'0.3s'}}>{data.recipient}</div>
                    <svg className="scribble" style={{width:'60px', top:'-20px', right:'-30px', '--rot':'10deg'}} viewBox="0 0 50 50"><path d="M10 40 Q 25 10, 40 20" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" /></svg>
                </div>
            )}

            {step === 1 && (
                <div style={{position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <div className="font-marker" style={{color:'white', fontSize:'1.5rem', transform:'rotate(-5deg)', marginBottom:'10px', animation:'slideInUp 0.5s ease'}}>Esto no es un regalo...</div>
                    <div className="sticker-box font-bold" style={{background:'white', color:'#2A2433', fontSize:'1.8rem', '--rot': '2deg', textTransform:'uppercase'}}>ES UNA NUEVA</div>
                    <div className="sticker-box font-bold" style={{background:'#2A2433', color:'#FFD700', fontSize:'3rem', '--rot': '-3deg', textTransform:'uppercase', marginTop:'-5px', animationDelay:'0.3s'}}>EXPERIENCIA</div>
                    <div className="sticker-box font-bold" style={{background:'#87CEEB', color:'white', fontSize:'1.2rem', '--rot': '4deg', marginTop:'15px', animationDelay:'0.6s', borderRadius:'20px'}}>DISEÑADA PARA VOS</div>
                </div>
            )}

            {step === 2 && (
                <div style={{position:'relative', zIndex:10, width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <div className="sticker-box font-bold" style={{background:'white', color:'#F44E63', fontSize:'0.9rem', '--rot': '-2deg', borderRadius:'50px', padding:'8px 20px', marginBottom:'20px'}}>{content.tag}</div>
                    <div style={{marginBottom:'20px'}}>
                        <span className="font-marker" style={{display:'block', color:'white', fontSize:'1.2rem', textAlign:'left', marginLeft:'-20px'}}>Pensado en...</span>
                        <div className="sticker-box font-bold" style={{background:'#2A2433', color:'white', fontSize:'2.5rem', '--rot': '1deg', textTransform:'uppercase', padding:'10px 20px', border:'3px solid white'}}>{content.title}</div>
                    </div>
                    <p className="font-bold" style={{color:'white', fontSize:'1.4rem', maxWidth:'90%', lineHeight:1.4, textShadow:'2px 2px 0px rgba(0,0,0,0.1)', animation:'slideInUp 0.8s ease 0.5s backwards'}}>"{content.msg}"</p>
                    <div style={{marginTop:'50px', animation:'slideInUp 0.8s ease 1s backwards'}}>
                        <div style={{fontSize:'2rem', animation:'bounce 2s infinite'}}>👇</div>
                        <p style={{color:'white', fontSize:'0.8rem', opacity:0.8, letterSpacing:'2px', textTransform:'uppercase', marginTop:'5px'}}>EMPEZAR AHORA</p>
                    </div>
                </div>
            )}
        </div>
    );
};

/* --- SLIDE DEDICATORIA --- */
const DedicationSlide = ({ data }) => {
    const bgImage = data.dedicationImage || "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2070&auto=format&fit=crop"; 
    const text = data.dedicationText || "Te escribí esto pensando en todo lo que significas para mí. Espero que te guste este regalo.";

    const handleShare = async () => {
        if (navigator.share) {
            try { await navigator.share({ title: 'Una carta especial', text: `Dedicatoria de ${data.sender} para ${data.recipient}. 💌`, url: window.location.href }); } catch (err) { console.error(err); }
        } else { alert("Copia el link para compartir: " + window.location.href); }
    };

    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;700&family=Permanent+Marker&display=swap');
        .boxie-font { font-family: 'Fredoka', sans-serif; }
        .font-marker { font-family: 'Permanent Marker', cursive; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseBtn { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
        .share-btn { background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.4); color: white; padding: 12px 25px; border-radius: 30px; font-family: 'Fredoka', sans-serif; font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; gap: 10px; cursor: pointer; transition: all 0.3s ease; animation: fadeInUp 0.8s ease 0.8s backwards, pulseBtn 2s infinite 2s; }
    `;

    return (
        <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: '30px', textAlign: 'center', overflow: 'hidden'}}>
            <style>{styles}</style>
            <div style={{position:'absolute', top:0, left:0, width:'100%', height:'100%', backgroundImage: `url(${bgImage})`, backgroundSize:'cover', backgroundPosition:'center', zIndex: 0}}></div>
            <div style={{position:'absolute', top:0, left:0, width:'100%', height:'100%', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 100%)', zIndex: 1}}></div>
            <div style={{position:'absolute', top:'30px', zIndex:10, opacity:0.7}}><img src={boxieLogo} alt="Boxie" style={{height:'30px', filter:'brightness(0) invert(1)'}} /></div>
            
            <div style={{position:'relative', zIndex:10, marginBottom:'40px', width:'100%'}}>
                <div className="font-marker" style={{color:'#F44E63', fontSize:'1.8rem', transform:'rotate(-2deg)', marginBottom:'20px', animation:'fadeInUp 0.8s ease'}}>Carta para vos 💌</div>
                <div className="boxie-font" style={{color:'white', fontSize:'1.3rem', lineHeight:1.6, fontWeight:'500', textShadow:'0 2px 10px rgba(0,0,0,0.3)', animation:'fadeInUp 0.8s ease 0.3s backwards', maxHeight: '40vh', overflowY: 'auto'}}>"{text}"</div>
                <div style={{marginTop:'20px', color:'white', fontWeight:'bold', fontSize:'1.1rem', animation:'fadeInUp 0.8s ease 0.5s backwards'}}>- {data.sender}</div>
            </div>
            <button className="share-btn" onClick={handleShare} style={{zIndex:10}}><Share2 size={20} /> GUARDAR RECUERDO</button>
        </div>
    );
};

const SpotifySlide = ({ data }) => { 
    const playlists = [{ title: "Top 50: Global", desc: "Los hits mundiales.", image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300&q=80" }, { title: "Viva Latino", desc: "Los éxitos más calientes.", image: "https://images.unsplash.com/photo-1514525253440-b393452e2729?w=300&q=80" }, { title: "Today's Top Hits", desc: "Lo que suena ahora.", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80" }, { title: "Rock Classics", desc: "Leyendas del rock.", image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&q=80" }, { title: "Chill Hits", desc: "Relájate y disfruta.", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80" }, { title: "Mega Hit Mix", desc: "Una mezcla perfecta.", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&q=80" }, { title: "All Out 2010s", desc: "La década dorada.", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&q=80" }, { title: "Reggaeton Viejo", desc: "Para perrear.", image: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=300&q=80" }]; 
    const bgImage = data.dedicationImage || "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=800"; 
    return (<div className="spotify-container"><div className="spotify-header" style={{backgroundImage: `url(${bgImage})`}}><div className="spotify-gradient-overlay"></div><div className="spotify-header-content"><h1 className="spotify-title">Boxie Mix</h1><p className="spotify-subtitle">Creado especialmente para {data.recipient} • 8 Playlists</p></div><button className="spotify-play-btn"><Play size={24} fill="white" /></button></div><div className="spotify-list">{playlists.map((pl, i) => (<div className="spotify-row" key={i} onClick={()=>window.open('https://open.spotify.com')}><span className="spotify-index">{i + 1}</span><div className="spotify-cover-mini" style={{backgroundImage: `url(${pl.image})`}}></div><div className="spotify-row-info"><h4>{pl.title}</h4><p>{pl.desc}</p></div><div className="spotify-duration">...</div></div>))}</div></div>);
};

/* --- GAMER CONNECTOR --- */
const GamerConnector = () => {
    const [isActive, setIsActive] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsActive(true); observer.disconnect(); } }, { threshold: 0.5 });
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className={`gamer-boxie-container ${isActive ? 'is-active' : ''}`} style={{ width: '100%', height: '100%', background: '#fdfbfb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <style>{`
                @keyframes floatUp { 0% { transform: translateY(100px) rotate(0deg); opacity: 0; } 20% { opacity: 0.6; } 80% { opacity: 0.6; } 100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; } }
                @keyframes pulseText { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } }
                .gamer-shape-boxie { position: absolute; color: #F44E63; font-weight: bold; opacity: 0; font-family: monospace; user-select: none; }
                .is-active .gamer-shape-boxie { animation: floatUp 4s infinite linear; }
            `}</style>
            <div className="gamer-shape-boxie" style={{left:'10%', fontSize:'2rem', animationDelay:'0s', animationDuration:'6s'}}>✖</div>
            <div className="gamer-shape-boxie" style={{left:'80%', fontSize:'3rem', animationDelay:'1s', animationDuration:'8s'}}>○</div>
            <div className="gamer-shape-boxie" style={{left:'20%', fontSize:'4rem', animationDelay:'2.5s', animationDuration:'7s', opacity:0.3, color:'#ff9a9e'}}>△</div>
            <div className="gamer-shape-boxie" style={{left:'70%', fontSize:'2.5rem', animationDelay:'0.5s', animationDuration:'9s'}}>□</div>
            <div className="gamer-shape-boxie" style={{left:'50%', fontSize:'1.5rem', animationDelay:'3s', animationDuration:'5s'}}>✖</div>
            <div style={{ zIndex: 10, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <div style={{ fontSize: '5rem', filter: 'drop-shadow(0 10px 20px rgba(244, 78, 99, 0.3))', animation: 'pulseText 2s infinite ease-in-out' }}>🎮</div>
                <div><h2 style={{ color: '#2A2433', fontSize: '2rem', margin: 0, fontWeight: '900', letterSpacing: '-1px' }}>¿Estás listo?</h2><p style={{ color: '#F44E63', fontSize: '1.2rem', fontWeight: 'bold', margin: '5px 0 0 0', textTransform: 'uppercase', letterSpacing: '2px' }}>GAME START</p></div>
                <div style={{ width: '150px', height: '4px', background: '#eee', borderRadius: '10px', marginTop: '20px', overflow: 'hidden' }}>
                    <div style={{ width: '100%', height: '100%', background: '#F44E63', animation: 'loadingBar 1.5s infinite ease-in-out', transformOrigin: 'left' }}></div>
                    <style>{`@keyframes loadingBar { 0% { transform: scaleX(0); } 50% { transform: scaleX(1); } 100% { transform: scaleX(0); transform-origin: right; } }`}</style>
                </div>
            </div>
        </div>
    );
};

/* --- TRIVIA SLIDE --- */
const TriviaSlide = () => {
    const questions = useMemo(() => [
        { q: "¿En qué país se encuentra la Torre Eiffel?", options: ["Italia", "Francia", "España", "Alemania"], correct: 1, hint: "Es el país del amor y los croissants 🥐" },
        { q: "¿Cuál es el planeta conocido como el 'Planeta Rojo'?", options: ["Venus", "Marte", "Júpiter", "Saturno"], correct: 1, hint: "Lleva el nombre del dios romano de la guerra ⚔️" },
        { q: "¿Quién escribió 'Romeo y Julieta'?", options: ["Cervantes", "Hemingway", "Shakespeare", "Dickens"], correct: 2, hint: "Es un dramaturgo inglés muy famoso 🎭" }
    ], []);

    const [view, setView] = useState('intro');
    const [qIndex, setQIndex] = useState(0);
    const [selectedIdx, setSelectedIdx] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [showHint, setShowHint] = useState(false);
    const currentQuestion = questions[qIndex];

    const handleStart = () => setView('game');
    const handleAnswer = (index) => {
        if (selectedIdx !== null) return;
        setSelectedIdx(index);
        if (index === currentQuestion.correct) {
            setIsCorrect(true);
            setTimeout(() => {
                if (qIndex < questions.length - 1) { setQIndex(prev => prev + 1); setSelectedIdx(null); setIsCorrect(null); setShowHint(false); } 
                else { setView('prize'); }
            }, 1000);
        } else {
            setIsCorrect(false);
            setTimeout(() => { setSelectedIdx(null); setIsCorrect(null); }, 1000);
        }
    };

    return (
        <div className="trivia-container">
            <style>{`
                @keyframes popIn { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
                @keyframes floatLogo { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
                @keyframes shine { 0% { background-position: -200%; } 100% { background-position: 200%; } }
                .winner-card { background: white; padding: 40px 30px; border-radius: 30px; text-align: center; max-width: 90%; width: 350px; box-shadow: 0 20px 60px rgba(244, 78, 99, 0.25); animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275); position: relative; border: 4px solid #fff0f3; }
                .winner-badge { background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); color: white; padding: 15px 10px; border-radius: 15px; margin: 20px 0; box-shadow: 0 10px 20px rgba(255, 165, 0, 0.3); position: relative; overflow: hidden; display: flex; flexDirection: column; justify-content: center; align-items: center; }
                .winner-badge::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); background-size: 200% 100%; animation: shine 2s infinite linear; }
            `}</style>
            <div className="trivia-bg-pattern">{[...Array(60)].map((_, i) => (<img key={i} src={logoBoxie} className="bg-pattern-icon" alt="" />))}</div>
            {view === 'intro' && (
                <div className="trivia-intro-screen">
                    <div style={{fontSize:'4rem', marginBottom:'10px', animation:'floatLogo 3s infinite'}}>🎁</div>
                    <h2 className="intro-title">¡Desafío Boxie!</h2>
                    <p className="intro-text">Demostrá cuánto sabés.<br/>3 preguntas correctas = <strong>Premio Sorpresa</strong>.</p>
                    <button className="btn-preview" onClick={handleStart} style={{marginTop:0}}>¡Jugar Ahora!</button>
                </div>
            )}
            {view === 'game' && (
                <div className="trivia-game-content">
                    <div className="trivia-question-card"><div className="trivia-mascot">🤔</div><p className="trivia-question-text">{currentQuestion.q}</p></div>
                    {!showHint && (<button className="hint-btn" onClick={() => setShowHint(true)}><AlertCircle size={16}/> Ver Pista</button>)}
                    {showHint && (<div className="hint-box">💡 Pista: {currentQuestion.hint}</div>)}
                    <div className="trivia-options-grid">{currentQuestion.options.map((opt, i) => (<button key={i} className={`trivia-btn ${selectedIdx !== null ? (i === currentQuestion.correct ? 'correct' : (i === selectedIdx ? 'wrong' : '')) : ''}`} onClick={() => handleAnswer(i)}>{opt}</button>))}</div>
                </div>
            )}
            {view === 'prize' && (
                <div className="prize-popup-overlay">
                    <ConfettiLayer />
                    <div className="winner-card">
                        <div style={{width: '100px', height: '100px', margin: '-80px auto 20px', background: 'white', borderRadius: '50%', padding: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', animation: 'floatLogo 3s infinite ease-in-out'}}>
                            <img src={logoBoxie} alt="Boxie Logo" style={{width:'100%', height:'100%', objectFit:'contain'}} />
                        </div>
                        <h2 style={{color:'#F44E63', fontSize:'2rem', fontWeight:'900', margin:'0', lineHeight:1.1, textTransform:'uppercase'}}>¡Jugada<br/>Maestra!</h2>
                        <p style={{color:'#666', fontSize:'1rem', marginTop:'10px'}}>Lo lograste. Acá está tu recompensa:</p>
                        <div className="winner-badge">
                            <div style={{fontSize:'1.4rem', fontWeight:'900', letterSpacing:'2px'}}>BOXIE-GENIO</div>
                            <div style={{fontSize:'0.8rem', fontWeight:'normal', marginTop:'5px', opacity:0.95, borderTop:'1px solid rgba(255,255,255,0.4)', paddingTop:'5px', width: '80%'}}>VALE POR 15% OFF</div>
                        </div>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', color:'#2A2433', opacity:0.7, fontSize:'0.8rem'}}>
                            <Camera size={16} /><span>Hacé captura para canjear</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

/* --- CINEMA CONNECTOR --- */
const CinemaConnector = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [textStep, setTextStep] = useState(0); 
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setTimeout(() => setIsOpen(true), 300); setTimeout(() => setTextStep(1), 3500); observer.disconnect(); } }, { threshold: 0.5 });
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const senderName = data ? data.sender : "Alguien";

    return (
        <div ref={containerRef} className={`cinema-container ${isOpen ? 'open-curtains' : ''}`}>
            <style>{`
                .cinema-message { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80%; opacity: 0; transition: opacity 1s ease-in-out, transform 1s ease; pointer-events: none; }
                .cinema-message.active { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                .cinema-message.inactive { opacity: 0; transform: translate(-50%, -60%) scale(0.95); }
            `}</style>
            <div className="curtain-valance"></div><div className="curtain-panel curtain-left"></div><div className="curtain-panel curtain-right"></div>
            <div className="cinema-content" style={{position:'relative', height:'100%', width:'100%'}}>
                <div className={`cinema-message ${textStep === 0 ? 'active' : 'inactive'}`}>
                    <h1 className="cinema-title">Prepara los pochoclos...</h1><p className="cinema-subtitle">La función está por comenzar</p><div style={{fontSize:'4rem', marginTop:'20px', filter:'drop-shadow(0 0 20px rgba(255,215,0,0.5))'}}>🍿</div>
                </div>
                <div className={`cinema-message ${textStep === 1 ? 'active' : 'inactive'}`}>
                    <div style={{fontSize:'3rem', marginBottom:'20px'}}>🎬</div>
                    <h2 style={{color: 'white', fontSize: '1.5rem', lineHeight: '1.4', textShadow: '0 2px 10px black'}}><span style={{color:'#F44E63', fontWeight:'900', fontSize:'1.8rem', textTransform:'uppercase'}}>{senderName}</span><br/>quiere decirte algo...</h2>
                    <p style={{color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', marginTop: '20px', fontStyle: 'italic', background: 'rgba(0,0,0,0.6)', padding: '15px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.2)'}}>"No podés quedarte sin ver estas historias. Son recomendaciones imperdibles pensadas 100% para vos."</p>
                    <div style={{marginTop:'30px', fontSize:'0.8rem', opacity:0.7, textTransform:'uppercase', letterSpacing:'2px'}}>¡A maratonear!</div>
                </div>
            </div>
        </div>
    );
};

const StreamingSlide = () => { 
    // Nota: Las imágenes referenciadas aquí (ej: /1.jpg) deben existir en tu carpeta public/ o no se verán.
    const contentDB = { Netflix: [{ id: 1, title: "Stranger Things", tags: "Ciencia Ficción • Terror", img: "/1.jpg", link: "https://www.netflix.com" }, { id: 2, title: "Emily in Paris", tags: "Romance • Comedia", img: "/2.jpg", link: "https://www.netflix.com" }, { id: 3, title: "Peaky Blinders", tags: "Drama • Crimen", img: "/3.jpg", link: "https://www.netflix.com" }, { id: 4, title: "The Crown", tags: "Drama • Historia", img: "/4.jpg", link: "https://www.netflix.com" }, { id: 5, title: "Dark", tags: "Misterio • Sci-Fi", img: "/5.jpg", link: "https://www.netflix.com" }], Prime: [{ id: 6, title: "The Boys", tags: "Acción • Superhéroes", img: "6.jpg", link: "https://www.primevideo.com" }, { id: 7, title: "Fleabag", tags: "Comedia • Drama", img: "7.jpg", link: "https://www.primevideo.com" }, { id: 8, title: "Fallout", tags: "Post-apocalíptico", img: "8.jpg", link: "https://www.primevideo.com" }, { id: 9, title: "Invincible", tags: "Animación • Acción", img: "/img_peliculas/9.jpg", link: "https://www.primevideo.com" }, { id: 10, title: "Reacher", tags: "Crimen • Acción", img: "/img_peliculas/10.jpg", link: "https://www.primevideo.com" }], Disney: [{ id: 11, title: "El Rey León", tags: "Animación • Clásico", img: "11.jpg", link: "https://www.disneyplus.com" }, { id: 12, title: "Star Wars", tags: "Sci-Fi • Aventura", img: "/img_peliculas/12.jpg", link: "https://www.disneyplus.com" }, { id: 13, title: "Avengers", tags: "Marvel • Acción", img: "/img_peliculas/13.jpg", link: "https://www.disneyplus.com" }, { id: 14, title: "Avatar", tags: "Fantasía • Épico", img: "/img_peliculas/14.jpg", link: "https://www.disneyplus.com" }, { id: 15, title: "Bluey", tags: "Familia • Kids", img: "/img_peliculas/15.jpg", link: "https://www.disneyplus.com" }] }; 
    const logos = { Netflix: "/Netflix.png", Prime: "/PrimeVideo.png", Disney: "/Disney.png" }; 
    const [platform, setPlatform] = useState("Netflix"); 
    const [movieIdx, setMovieIdx] = useState(0); 
    const currentMovie = contentDB[platform][movieIdx]; 
    return (<div className="streaming-container"><div className="streaming-bg" style={{ backgroundImage: `url(${currentMovie.img})` }}></div><div className="streaming-gradient"></div><div className="streaming-navbar">{Object.keys(logos).map((platKey) => (<button key={platKey} className={`platform-logo-btn ${platform === platKey ? 'active' : ''}`} onClick={() => {setPlatform(platKey); setMovieIdx(0);}}><img src={logos[platKey]} alt={platKey} className="platform-logo-img" /></button>))}</div><div className="movie-hero-content"><div className="hero-logo-boxie">RECOMENDADO PARA VOS</div><h1 className="hero-movie-title">{currentMovie.title}</h1><div className="hero-tags"><span>{currentMovie.tags}</span><span className="tag-dot">•</span><span>HD</span></div><div className="hero-actions"><a href={currentMovie.link} target="_blank" rel="noreferrer" style={{flex:1, textDecoration:'none'}}><button className="btn-hero btn-play-hero"><Play fill="black" size={20} /> Ver Ahora</button></a><button className="btn-hero btn-info-hero" onClick={() => setMovieIdx((prev) => (prev + 1) % contentDB[platform].length)}><ArrowDown size={20} /> Siguiente</button></div></div></div>);
};

const JackpotSlide = () => { const [spinning, setSpinning] = useState(false); const [stopped, setStopped] = useState([true, true, true]); const [hasWon, setHasWon] = useState(false); const icons = ["💎", "🍭", "✨", "🍉", "⭐", "🎁"]; const handleSpin = () => { if (spinning) return; setSpinning(true); setStopped([false, false, false]); setHasWon(false); setTimeout(() => setStopped(prev => [true, false, false]), 1200); setTimeout(() => setStopped(prev => [true, true, false]), 1800); setTimeout(() => { setStopped(prev => [true, true, true]); setSpinning(false); setTimeout(() => setHasWon(true), 500); if (navigator.vibrate) navigator.vibrate([100,50,100,50,300]); }, 2500); }; return (<div className="slot-machine-container"><div className="neon-bg-lights"></div>{hasWon && <><div className="coin" style={{left:'10%', animationDelay:'0s'}}>✨</div><img src={boxieLogo} className="coin" style={{left:'30%', width:'50px', animationDelay:'0.5s'}} /><div className="coin" style={{left:'50%', animationDelay:'1s'}}>🎁</div></>}<h1 className="slot-main-title">TU DÍA DE<br/><span className="slot-highlight">SUERTE</span></h1><div className="reels-container-large"><div className="payline-glow"></div>{[0, 1, 2].map(index => (<div key={index} className={`reel-light ${!stopped[index] ? 'spinning' : ''}`}>{stopped[index] ? (<div className="slot-icon" style={{height:'100%', animation:'popIn 0.3s'}}><img src={boxieLogo} alt="Boxie Prize" className="slot-icon-img" style={{width: '80%', height: '80%', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(244, 78, 99, 0.5))'}} /></div>) : (<div className="reel-strip">{icons.map((icon, i) => <div key={i} className="slot-icon">{icon}</div>)}{icons.map((icon, i) => <div key={`dup-${i}`} className="slot-icon">{icon}</div>)}</div>)}</div>))}</div>{!hasWon ? <button className="spin-btn-large" onClick={handleSpin} disabled={spinning}>{spinning ? "..." : "¡GIRAR AHORA!"}</button> : <div style={{color:'white', fontWeight:'bold', fontSize:'1.5rem', animation:'pulse 1s infinite', zIndex:10}}>¡PREMIO MAYOR!</div>}{hasWon && <div className="winner-overlay-vibrant"><img src={boxieLogo} style={{width:'140px', filter:'drop-shadow(0 0 25px #F44E63)', marginBottom:'20px', animation:'popIn 0.8s'}} /><h1 className="win-title-boxie">¡JACKPOT!</h1><p style={{fontSize:'1.4rem', color:'white', marginBottom:'20px'}}>Has desbloqueado todos los deseos.</p><div className="scroll-hint-boxie">Scrollea para ver tus premios ➷</div></div>}</div>);};

/* --- CUPONERA --- */
const CouponsSlide = () => {
    const initialCoupons = [
        { id: 1, icon: "🍔", title: "Cena Rica", detail: "Yo invito y yo cocino (o delivery).", color: "#FF9A9E" },
        { id: 2, icon: "💆‍♂️", title: "Masajes", detail: "Sesión de 30 minutos de relax total.", color: "#a18cd1" },
        { id: 3, icon: "🎬", title: "Cine en Casa", detail: "Peli + Pochoclos + Manta.", color: "#84fab0" },
        { id: 4, icon: "🥐", title: "Desayuno", detail: "En la cama, un domingo cualquiera.", color: "#ffc3a0" },
        { id: 5, icon: "🔥", title: "Comodín", detail: "Vale por lo que vos quieras...", color: "#ff9a9e" },
        { id: 6, icon: "✈️", title: "Escapada", detail: "Un finde fuera de la ciudad.", color: "#a8edea" }
    ];
    const [activeCoupon, setActiveCoupon] = useState(null);
    const [readCoupons, setReadCoupons] = useState([]);
    const handleOpen = (coupon) => setActiveCoupon(coupon);
    const handleClose = () => { if (activeCoupon) { if (!readCoupons.includes(activeCoupon.id)) { setReadCoupons([...readCoupons, activeCoupon.id]); } setActiveCoupon(null); } };

    return (
        <div className="coupons-container" style={{overflowY: 'auto', paddingBottom: '100px'}}>
            <style>{`
                .premium-ticket { position: relative; background: white; border-radius: 12px; overflow: hidden; display: flex; flexDirection: column; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; height: 100%; min-height: 130px; }
                .premium-ticket:active { transform: scale(0.95); }
                .premium-ticket::before, .premium-ticket::after { content: ''; position: absolute; top: 70px; width: 20px; height: 20px; background: #fdfbfb; border-radius: 50%; }
                .premium-ticket::before { left: -12px; } .premium-ticket::after { right: -12px; }
                .ticket-divider { border-top: 2px dashed #eee; margin-top: 15px; margin-bottom: 15px; position: absolute; top: 70px; left: 0; right: 0; }
                .is-read-overlay { position: absolute; inset: 0; background: rgba(255,255,255,0.7); display: flex; alignItems: center; justifyContent: center; font-weight: bold; color: #555; font-size: 1.2rem; transform: rotate(-10deg); border: 2px solid #555; border-radius: 10px; width: 80%; height: 50%; margin: auto; }
            `}</style>
            <div className="trivia-bg-pattern">{[...Array(60)].map((_, i) => (<img key={i} src={logoBoxie} className="bg-pattern-icon" alt="" />))}</div>
            <div className="coupons-header" style={{position:'relative', zIndex:2, marginBottom:'20px'}}>
                <div style={{fontSize:'3rem', filter:'drop-shadow(0 5px 10px rgba(0,0,0,0.1))'}}>🎫</div><h2 className="coupons-title" style={{color:'#2A2433'}}>Cuponera</h2><p style={{color:'#888', fontSize:'0.9rem'}}>Tocá para canjear tus regalos.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '0 20px', position: 'relative', zIndex: 2 }}>
                {initialCoupons.map((c, i) => {
                    const isRead = readCoupons.includes(c.id);
                    return (
                        <div key={c.id} className="premium-ticket" onClick={() => handleOpen(c)} style={{ animation: `fadeInUp 0.5s ease backwards ${i * 0.1}s`, opacity: isRead ? 0.8 : 1 }}>
                            <div style={{ background: `linear-gradient(135deg, ${c.color} 0%, white 150%)`, height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>{c.icon}</div>
                            <div className="ticket-divider"></div>
                            <div style={{ padding: '10px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <h3 style={{ margin: 0, fontSize: '0.9rem', color: '#333', textAlign: 'center', fontWeight: 'bold' }}>{c.title}</h3>
                                <p style={{ fontSize: '0.65rem', color: '#888', marginTop: '5px', textTransform: 'uppercase', letterSpacing: '1px' }}>Ver Detalle</p>
                            </div>
                            {isRead && (<div className="is-read-overlay"><div style={{ border: '3px solid #555', color: '#555', padding: '5px 10px', borderRadius: '8px', fontWeight: '900', transform: 'rotate(-15deg)', fontSize: '0.9rem', opacity: 0.8 }}>VISTO</div></div>)}
                        </div>
                    );
                })}
            </div>
            {activeCoupon && (
                <div className="coupon-modal-overlay" onClick={handleClose}>
                    <div className="coupon-modal-card" onClick={(e) => e.stopPropagation()} style={{borderTop: `10px solid ${activeCoupon.color}`}}>
                        <div className="modal-icon" style={{background: activeCoupon.color}}>{activeCoupon.icon}</div>
                        <h3 className="modal-title">{activeCoupon.title}</h3>
                        <div className="modal-desc">"{activeCoupon.detail}"</div>
                        <button className="btn-close-modal" onClick={handleClose} style={{background: activeCoupon.color, border:'none', color:'black', fontWeight:'bold'}}>¡Lo quiero! ✨</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const ReasonsVideoSlide = ({ data }) => { const allReasons = data.reasons; const [visibleReasons, setVisibleReasons] = useState([]); const [currentText, setCurrentText] = useState(""); const [currentIndex, setCurrentIndex] = useState(0); const [isFinished, setIsFinished] = useState(false); useEffect(() => { if (currentIndex >= allReasons.length) { setTimeout(() => setIsFinished(true), 1000); return; } setCurrentText(""); const fullText = allReasons[currentIndex]; let charIndex = 0; const typeInterval = setInterval(() => { charIndex++; setCurrentText(fullText.slice(0, charIndex)); if (charIndex === fullText.length) { clearInterval(typeInterval); setTimeout(() => { setVisibleReasons(prev => [...prev, { id: currentIndex, text: fullText }]); setCurrentIndex(prev => prev + 1); }, 2000); } }, 50); return () => clearInterval(typeInterval); }, [currentIndex, allReasons]); return (<div className="reasons-video-container"><div className="parallax-blob blob-1"></div><div className="parallax-blob blob-2"></div><div className="parallax-blob blob-3"></div><div style={{position:'relative', zIndex:20, marginBottom:'25px', textAlign:'center'}}><h2 style={{fontSize:'2.2rem', fontWeight:'900', background: '-webkit-linear-gradient(#F44E63, #a73748)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0}}>10 Razones</h2>{!isFinished && <p style={{fontSize:'0.9rem', color:'#887c9c', marginTop:'5px', fontWeight:500}}>Para recordarte lo especial que sos...</p>}</div><div className="reasons-feed">{!isFinished && <div className="reason-bubble"><div className="reason-badge">RAZÓN #{currentIndex + 1}</div><div className="reason-bubble-text">{currentText}<span className="cursor-blink"></span></div></div>}{[...visibleReasons].reverse().map((r) => <div key={r.id} className="reason-bubble old"><div className="reason-bubble-text">{r.text}</div></div>)}{isFinished && <div className="reason-bubble" style={{background: 'linear-gradient(135deg, #F44E63 0%, #ff9a9e 100%)', color:'white', border:'none'}}><div className="reason-bubble-text" style={{color:'white'}}>¡Y un millón más! ✨<br/><small>Te quiero infinito.</small></div></div>}</div></div>);};

/* --- GRATITUD --- */
const GratitudeSlide = () => {
    const [view, setView] = useState('intro');
    const [introStep, setIntroStep] = useState(0);
    const questions = [
        { id: 1, icon: "✨", label: "EL MOMENTO", text: "¿Qué fue lo mejor que te pasó este año?", placeholder: "Ese recuerdo que te saca una sonrisa..." },
        { id: 2, icon: "❤️", label: "LA PERSONA", text: "¿Quién hizo tus días más felices?", placeholder: "Alguien que estuvo ahí para vos..." },
        { id: 3, icon: "💪", label: "EL LOGRO", text: "¿De qué desafío te sentís orgulloso/a?", placeholder: "Algo difícil que superaste..." }
    ];
    const [step, setStep] = useState(0); 
    const [answer, setAnswer] = useState(""); 
    
    useEffect(() => { if (view === 'intro') { const t1 = setTimeout(() => setIntroStep(1), 1500); const t2 = setTimeout(() => setIntroStep(2), 4500); return () => { clearTimeout(t1); clearTimeout(t2); }; } }, [view]);
    const handleNext = () => { if (step < questions.length - 1) { setAnswer(""); setStep(step + 1); } else { setView('outro'); } };

    return (
        <div className="gratitude-container" style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, #2A2433 0%, #1a1520 100%)', color: 'white', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'repeat(8, 1fr)', opacity: 0.03, pointerEvents: 'none', zIndex: 0 }}>
                {[...Array(40)].map((_, i) => (<div key={i} style={{display:'flex', alignItems:'center', justifyContent:'center'}}><img src={logoBoxie} alt="" style={{ width:'25px', transform: i % 2 === 0 ? 'rotate(15deg)' : 'rotate(-15deg)', filter: 'grayscale(1) brightness(2)' }} /></div>))}
            </div>
            <img src={logoBoxie} alt="Boxie" style={{ position: 'absolute', top: '40px', left: 0, right: 0, margin: 'auto', width: '130px', opacity: 1, zIndex: 10, filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))' }} />
            {view === 'intro' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', textAlign: 'center', zIndex: 2, position: 'relative' }}>
                    <div style={{height:'100px'}}></div>
                    <div style={{ opacity: introStep >= 0 ? 1 : 0, transform: introStep >= 0 ? 'translateY(0)' : 'translateY(20px)', transition: 'all 1s ease' }}>
                        <div style={{fontSize:'3rem', marginBottom:'20px'}}>🧘</div><h2 style={{fontSize:'1.8rem', fontWeight:'bold', marginBottom:'10px'}}>Pausa un segundo.</h2>
                    </div>
                    <p style={{ opacity: introStep >= 1 ? 1 : 0, transform: introStep >= 1 ? 'translateY(0)' : 'translateY(20px)', transition: 'all 1s ease', fontSize: '1.1rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', maxWidth: '300px' }}>En la velocidad del día a día, a veces olvidamos valorar lo importante.<br/><br/>Quiero invitarte a hacer un pequeño <strong>ejercicio de gratitud</strong> juntos.</p>
                    <div style={{ opacity: introStep >= 2 ? 1 : 0, marginTop: '40px', transition: 'all 1s ease 0.5s' }}>
                        <button onClick={() => setView('questions')} style={{ background: '#F44E63', color: 'white', border: 'none', padding: '15px 40px', borderRadius: '50px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 10px 30px rgba(244, 78, 99, 0.3)' }}>Comenzar ✨</button>
                    </div>
                </div>
            )}
            {view === 'questions' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '30px', animation: 'fadeIn 1s', zIndex: 2, position: 'relative' }}>
                    <div style={{display:'flex', gap:'5px', marginTop:'120px', marginBottom:'30px'}}>{questions.map((_, i) => (<div key={i} style={{flex:1, height:'3px', background: i <= step ? '#F44E63' : 'rgba(255,255,255,0.1)', borderRadius:'2px'}}></div>))}</div>
                    <div style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'center'}}>
                        <div style={{ color: '#F44E63', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>{questions[step].icon} {questions[step].label}</div>
                        <h2 style={{fontSize:'2rem', lineHeight:1.3, marginBottom:'30px'}}>{questions[step].text}</h2>
                        <textarea autoFocus placeholder={questions[step].placeholder} value={answer} onChange={(e) => setAnswer(e.target.value)} onTouchMove={(e) => e.stopPropagation()} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.2)', color: 'white', fontSize: '1.2rem', padding: '10px 0', outline: 'none', resize: 'none', fontFamily: 'inherit' }} />
                    </div>
                    <div style={{display:'flex', justifyContent:'flex-end', marginTop:'20px'}}><button onClick={handleNext} disabled={answer.length < 2} style={{ background: 'white', color: '#2A2433', border: 'none', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: answer.length < 2 ? 0.3 : 1, transition: 'all 0.2s', cursor: 'pointer' }}><ArrowRight size={24} /></button></div>
                </div>
            )}
            {view === 'outro' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', animation: 'fadeIn 1s', padding: '30px', zIndex: 2, position: 'relative' }}>
                    <div style={{fontSize:'4rem', marginBottom:'20px'}}>❤️</div><h2 style={{fontSize:'2rem', fontWeight:'bold'}}>Gracias.</h2>
                    <p style={{color:'rgba(255,255,255,0.7)', marginTop:'10px'}}>Tus respuestas se han guardado.<br/>Nunca dejes de agradecer.</p>
                    <div style={{marginTop:'40px', padding:'15px', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'15px', fontSize:'0.9rem', color:'#F44E63'}}>Ejercicio completado</div>
                </div>
            )}
        </div>
    );
};

/* --- JOURNALING --- */
const JournalSlide = () => {
    const [view, setView] = useState('intro');
    const [introStep, setIntroStep] = useState(0);
    const [journalEntry, setJournalEntry] = useState("");
    const journalPrompt = { title: "Tu Próximo Capítulo", text: "Si tuvieras que escribir el título del próximo gran capítulo de tu vida, ¿cuál sería y por qué?", placeholder: "Deja fluir tus ideas acá..." };

    useEffect(() => { if (view === 'intro') { const t1 = setTimeout(() => setIntroStep(1), 1500); const t2 = setTimeout(() => setIntroStep(2), 4000); return () => { clearTimeout(t1); clearTimeout(t2); }; } }, [view]);
    const handleFinish = () => { if (journalEntry.length > 5) { setView('outro'); } };

    return (
        <div className="journal-container" style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0}}>
                {[...Array(20)].map((_, i) => (<div key={i} style={{ position: 'absolute', bottom: '-100px', left: `${Math.random() * 100}%`, width: `${Math.random() * 60 + 20}px`, height: `${Math.random() * 60 + 20}px`, background: 'rgba(255,255,255,0.15)', borderRadius: '50%', backdropFilter: 'blur(2px)', animation: `floatUpBubbles ${Math.random() * 10 + 15}s infinite linear`, animationDelay: `${Math.random() * 5}s` }}></div>))}
            </div>
            <style>{`@keyframes floatUpBubbles { 0% { transform: translateY(0) scale(1); opacity: 0; } 20% { opacity: 0.6; } 80% { opacity: 0.3; } 100% { transform: translateY(-120vh) scale(1.5); opacity: 0; } }`}</style>
            <img src={logoBoxie} alt="Boxie" style={{ position: 'absolute', top: '40px', left: 0, right: 0, margin: 'auto', width: '80px', filter: 'brightness(0) invert(1) drop-shadow(0 2px 10px rgba(0,100,200,0.2))', zIndex: 10, opacity: 0.9 }} />
            {view === 'intro' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', textAlign: 'center', zIndex: 2, position: 'relative' }}>
                    <div style={{height:'80px'}}></div>
                    <div style={{ opacity: introStep >= 0 ? 1 : 0, transform: introStep >= 0 ? 'translateY(0)' : 'translateY(30px)', transition: 'all 1s ease' }}>
                        <div style={{fontSize:'4rem', marginBottom:'20px', filter:'drop-shadow(0 0 20px rgba(255,255,255,0.4))'}}>☁️</div><h2 style={{fontSize:'2.5rem', fontWeight:'900', marginBottom:'10px', textShadow:'0 5px 15px rgba(0,100,200,0.2)'}}>Espacio Libre.</h2>
                    </div>
                    <p style={{ opacity: introStep >= 1 ? 1 : 0, transform: introStep >= 1 ? 'translateY(0)' : 'translateY(30px)', transition: 'all 1s ease', fontSize: '1.2rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.95)', maxWidth: '320px', fontWeight:'500' }}>Despejá tu mente. Este es un lugar seguro para tus pensamientos más grandes.<br/><br/><strong>Escribir es aclarar.</strong></p>
                    <div style={{ opacity: introStep >= 2 ? 1 : 0, marginTop: '50px', transform: introStep >= 2 ? 'scale(1)' : 'scale(0.9)', transition: 'all 0.8s ease 0.3s' }}>
                        <button onClick={() => setView('writing')} style={{ background: 'white', color: '#00c6fb', border: 'none', padding: '18px 50px', borderRadius: '50px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 15px 40px rgba(0,198,251,0.3)', transition: 'transform 0.2s' }}>Abrir mi Diario 🖊️</button>
                    </div>
                </div>
            )}
            {view === 'writing' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '30px', animation: 'fadeInUp 0.8s', zIndex: 2, position: 'relative' }}>
                    <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }`}</style>
                    <div style={{height:'70px'}}></div>
                    <div style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'center'}}>
                        <div style={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem', marginBottom: '15px', opacity: 0.9, textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>{journalPrompt.title}</div>
                        <h2 style={{ fontSize:'2rem', lineHeight:1.3, marginBottom:'30px', fontWeight:'800', textShadow:'0 5px 20px rgba(0,100,200,0.2)' }}>{journalPrompt.text}</h2>
                        <div style={{position:'relative', flex: 1, maxHeight:'40vh'}}>
                            <textarea autoFocus placeholder={journalPrompt.placeholder} value={journalEntry} onChange={(e) => setJournalEntry(e.target.value)} onTouchMove={(e) => e.stopPropagation()} style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '25px', color: 'white', fontSize: '1.2rem', padding: '25px', outline: 'none', resize: 'none', fontFamily: 'inherit', lineHeight: 1.6, backdropFilter: 'blur(15px)', boxShadow: '0 20px 50px rgba(0,100,200,0.15)' }} />
                        </div>
                    </div>
                    <div style={{display:'flex', justifyContent:'center', marginTop:'30px'}}>
                        <button onClick={handleFinish} disabled={journalEntry.length < 5} style={{ background: 'white', color: '#00c6fb', border: 'none', padding: '15px 40px', borderRadius: '50px', fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', opacity: journalEntry.length < 5 ? 0.5 : 1, transform: journalEntry.length < 5 ? 'scale(0.95)' : 'scale(1)', transition: 'all 0.3s', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,198,251,0.2)' }}>Guardar Pensamiento ✨</button>
                    </div>
                </div>
            )}
            {view === 'outro' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', animation: 'fadeIn 1s', padding: '30px', zIndex: 2, position: 'relative' }}>
                    <div style={{fontSize:'5rem', marginBottom:'20px', filter:'drop-shadow(0 0 20px rgba(255,255,255,0.6))'}}>🦋</div><h2 style={{fontSize:'2.5rem', fontWeight:'900', margin:0, textShadow:'0 5px 15px rgba(0,100,200,0.2)'}}>Claridad.</h2>
                    <p style={{color:'rgba(255,255,255,0.95)', marginTop:'20px', fontSize:'1.2rem', lineHeight:1.5, maxWidth:'350px'}}>"Escribir es la forma más pura de escuchar lo que tu mente tiene para decir."</p>
                    <div style={{marginTop:'50px', padding:'15px 35px', background:'rgba(255,255,255,0.3)', borderRadius:'30px', fontSize:'1rem', color:'white', fontWeight:'bold', border:'1px solid rgba(255,255,255,0.4)', backdropFilter:'blur(10px)'}}>Entrada guardada en tu Boxie</div>
                </div>
            )}
        </div>
    );
};

/* --- FORTUNE SLIDE --- */
const FortuneSlide = () => {
    const [view, setView] = useState('intro');
    const [introStep, setIntroStep] = useState(0);
    const [finalMessage, setFinalMessage] = useState("");
    const fortunes = useMemo(() => [ "La suerte no es casualidad, es preparación encontrando oportunidad. Estás listo.", "Un gran cambio se acerca, y será exactamente lo que tu corazón estaba pidiendo.", "Tu intuición es tu superpoder. Si sentís que es por ahí, no lo dudes.", "Lo que buscás te está buscando a vos. Mantené los ojos (y el corazón) abiertos.", "Hoy es el día perfecto para empezar eso que venís postergando. El universo te avala." ], []);

    useEffect(() => { if (view === 'intro') { const t1 = setTimeout(() => setIntroStep(1), 1200); const t2 = setTimeout(() => setIntroStep(2), 2400); const t3 = setTimeout(() => setIntroStep(3), 3600); const t4 = setTimeout(() => setView('choose'), 4500); return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); }; } }, [view]);
    const handleSelect = (id) => { const randomMsg = fortunes[Math.floor(Math.random() * fortunes.length)]; setFinalMessage(randomMsg); setView('opening'); setTimeout(() => setView('result'), 1500); };

    return (
        <div className="fortune-container" style={{ width: '100%', height: '100%', background: 'linear-gradient(-45deg, #FF9A9E, #F44E63, #a18cd1, #fbc2eb)', backgroundSize: '400% 400%', animation: 'gradientBG 15s ease infinite', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <style>{` @keyframes gradientBG { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } } @keyframes floatCookie { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } } @keyframes moveHeaderPattern { 0% { background-position: 0% 0%; } 100% { background-position: 100% 100%; } } `}</style>
            <img src={logoBoxie} alt="Boxie" style={{ position:'absolute', top:'30px', left:0, right:0, margin:'auto', width:'80px', filter:'brightness(0) invert(1) drop-shadow(0 2px 5px rgba(0,0,0,0.2))', zIndex: 10 }} />
            {view === 'intro' && (
                <div style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'30px'}}>
                    <div style={{fontSize:'2.2rem', fontWeight:'900', color:'white', textTransform:'uppercase', letterSpacing:'-1px', textShadow:'0 2px 10px rgba(0,0,0,0.2)'}}>
                        {introStep === 0 && <span style={{animation:'fadeIn 0.5s'}}>Todo pasa por algo...</span>}
                        {introStep === 1 && <span style={{animation:'fadeIn 0.5s'}}>Tu intuición no falla...</span>}
                        {introStep === 2 && <span style={{animation:'fadeIn 0.5s'}}>El destino llama.</span>}
                        {introStep === 3 && <div style={{animation:'popIn 0.5s', fontSize:'5rem', filter:'drop-shadow(0 5px 15px rgba(0,0,0,0.2))'}}>🔮</div>}
                    </div>
                </div>
            )}
            {view === 'choose' && (
                <div style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', animation:'fadeIn 0.5s', padding:'20px'}}>
                    <div style={{height:'60px'}}></div><h2 style={{color:'white', fontSize:'2rem', fontWeight:'900', marginBottom:'10px', textAlign:'center', textShadow:'0 2px 10px rgba(0,0,0,0.2)'}}>Tu Destino</h2><p style={{color:'white', marginBottom:'40px', fontSize:'1.1rem', textAlign:'center', maxWidth:'300px', lineHeight: 1.5, fontWeight: '500'}}>Elegí con sabiduría.<br/><strong>Tu elección es la clave.</strong></p>
                    <div style={{display:'flex', gap:'15px', alignItems:'center', justifyContent:'center', width:'100%'}}>{[1, 2, 3].map((num) => (<div key={num} onClick={() => handleSelect(num)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', animation: `floatCookie ${3 + num}s infinite ease-in-out`, transition: 'transform 0.2s' }}><div style={{fontSize: '4.5rem', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))'}}>🥠</div><div style={{marginTop:'10px', background:'rgba(255,255,255,0.2)', padding:'5px 10px', borderRadius:'10px', fontSize:'0.7rem', color:'white', fontWeight:'bold'}}>OPCIÓN {num}</div></div>))}</div>
                </div>
            )}
            {view === 'opening' && (<div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center'}}><div style={{fontSize:'7rem', animation:'shake 0.5s infinite', filter:'drop-shadow(0 10px 30px rgba(0,0,0,0.2))'}}>🥠</div><style>{`@keyframes shake { 0% { transform: translate(1px, 1px) rotate(0deg); } 10% { transform: translate(-1px, -2px) rotate(-1deg); } 20% { transform: translate(-3px, 0px) rotate(1deg); } 30% { transform: translate(3px, 2px) rotate(0deg); } 40% { transform: translate(1px, -1px) rotate(1deg); } 50% { transform: translate(-1px, 2px) rotate(-1deg); } 60% { transform: translate(-3px, 1px) rotate(0deg); } 70% { transform: translate(3px, 1px) rotate(-1deg); } 80% { transform: translate(-1px, -1px) rotate(1deg); } 90% { transform: translate(1px, 2px) rotate(0deg); } 100% { transform: translate(1px, -2px) rotate(-1deg); } }`}</style></div>)}
            {view === 'result' && (
                <div className="prize-popup-overlay">
                    <ConfettiLayer />
                    <div style={{ background: 'white', width: '85%', maxWidth: '350px', borderRadius: '25px', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.3)', animation: 'popIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '150px', overflow:'hidden', position:'relative', backgroundColor: '#fff0f5', backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(244, 78, 99, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(161, 140, 209, 0.15) 0%, transparent 50%)', backgroundSize: '150% 150%', animation: 'moveHeaderPattern 10s ease infinite alternate' }}>
                            <div style={{position:'absolute', inset:0, background:'linear-gradient(to top, rgba(255,255,255,1) 5%, transparent 100%)'}}></div>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90px', height: '90px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 10 }}>
                                <img src={logoBoxie} alt="" style={{width:'60px', height:'auto'}} />
                            </div>
                        </div>
                        <div style={{padding: '10px 30px 40px 30px', textAlign: 'center', position:'relative', zIndex:5}}>
                            <div style={{ color:'#F44E63', fontWeight:'900', textTransform:'uppercase', letterSpacing:'2px', fontSize:'0.8rem', marginBottom:'15px', marginTop:'10px' }}>Mensaje del Universo</div>
                            <h3 style={{ fontFamily: 'serif', fontSize: '1.4rem', fontStyle: 'italic', lineHeight: '1.4', color: '#2A2433', marginBottom: '25px' }}>"{finalMessage}"</h3>
                            <div style={{width:'50px', height:'3px', background:'#eee', margin:'0 auto 20px auto', borderRadius:'2px'}}></div>
                            <p style={{fontSize:'0.85rem', color:'#888'}}>Tu instinto te trajo hasta acá.<br/><strong style={{color:'#F44E63'}}>Confiá.</strong></p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

/* --- ANECDOTE SLIDE --- */
const AnecdoteSlide = ({ data }) => {
    const imgURL = data?.anecdoteImage || data?.dedicationImage || "https://images.unsplash.com/photo-1524601500432-1e1a4c71d692?q=80&w=1000&auto=format&fit=crop";
    const title = data?.anecdoteTitle || "Momento Inolvidable";
    const text = data?.anecdoteText || "Acá va esa historia increíble que compartimos...";
    const [liked, setLiked] = useState(false);
    const handleShare = () => { /* Logic */ };

    return (
        <div className="anecdote-container" style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${imgURL})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(25px) brightness(1.1) saturate(1.3)', transform: 'scale(1.1)', zIndex: 0 }}></div>
            <div style={{position:'absolute', inset:0, background:'rgba(255,255,255,0.1)', zIndex:1}}></div>
            <div style={{ position: 'relative', zIndex: 10, background: 'rgba(255,255,255,0.95)', width: '100%', maxWidth: '380px', borderRadius: '30px', boxShadow: '0 25px 50px rgba(0,0,0,0.15)', overflow: 'hidden', animation: 'fadeInUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)', display: 'flex', flexDirection: 'column' }}>
                <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(40px) scale(0.95); } to { opacity:1; transform:translateY(0) scale(1); } }`}</style>
                <div style={{height: '220px', overflow: 'hidden', position:'relative'}}>
                    <img src={imgURL} alt="Anecdote" style={{width:'100%', height:'100%', objectFit:'cover'}} />
                    <div style={{position:'absolute', bottom:0, left:0, width:'100%', height:'40%', background:'linear-gradient(to top, rgba(255,255,255,1), transparent)'}}></div>
                </div>
                <div style={{padding: '10px 30px 30px', textAlign: 'center', position:'relative'}}>
                    <img src={logoBoxie} alt="Boxie" style={{ width: '60px', height: 'auto', margin: '-30px auto 15px', display: 'block', position: 'relative', zIndex: 5, filter: 'drop-shadow(0 5px 10px rgba(255,255,255,0.8))' }} />
                    <h3 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#2A2433', margin: '0 0 10px 0', letterSpacing: '-0.5px' }}>{title}</h3>
                    <p style={{ fontSize: '1rem', color: '#555', lineHeight: 1.5, marginBottom: '30px', fontStyle: 'italic' }}>"{text}"</p>
                    <div style={{display: 'flex', gap: '12px', alignItems: 'stretch'}}>
                        <button onClick={handleShare} style={{ flex: 1, border: 'none', background: 'linear-gradient(90deg, #F44E63 0%, #ff9a9e 100%)', color: 'white', padding: '16px', borderRadius: '18px', fontSize: '0.95rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 10px 20px rgba(244, 78, 99, 0.25)', transition: 'transform 0.2s' }} onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'} onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}> <Share2 size={18} /> Compartir Story </button>
                        <button onClick={() => setLiked(!liked)} style={{ width: '55px', border: 'none', background: liked ? '#ffe0e6' : '#f0f0f0', color: '#F44E63', borderRadius: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}> <Heart size={24} fill={liked ? "#F44E63" : "none"} strokeWidth={liked ? 0 : 2.5} /> </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* --- EDITORIAL SLIDE --- */
const EditorialSlide = ({ imageURL, themeType = "love" }) => {
    const content = THEME_CONTENT[themeType] || THEME_CONTENT.love;
    const finalImage = imageURL || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop";
    const [showShareHint, setShowShareHint] = useState(false);

    return (
        <div className="editorial-container">
            <div className="editorial-border"></div>
            <h1 className="editorial-title">{content.editorialTitle}</h1>
            <div className="editorial-content-grid">
                <div className="editorial-body"><p>{content.editorialText1}</p></div>
                <div className="editorial-photo-frame" style={{position:'relative', overflow:'hidden'}}>
                    <img src={finalImage} alt="Nosotros" className="editorial-img" />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%', background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '20px', pointerEvents: 'none' }}>
                        <img src={logoBoxie} alt="Boxie" style={{ width: '70px', height: 'auto', filter: 'brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.5))', opacity: 0.9 }} />
                    </div>
                </div>
                <div className="editorial-body"><p>{content.editorialText2}</p></div>
            </div>
            <div className="editorial-footer" style={{marginTop:'15px'}}>
                <button onClick={() => setShowShareHint(true)} style={{ background: 'white', border: '1px solid #eee', color: '#2A2433', padding: '12px 25px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', margin: '0 auto', transition: 'transform 0.2s' }} onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'} onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}> <Share2 size={16} color="#F44E63" /> Compartir Story </button>
            </div>
            {showShareHint && (
                <div className="modal-overlay" onClick={() => setShowShareHint(false)} style={{zIndex: 100, backdropFilter: 'blur(5px)'}}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{textAlign: 'center', maxWidth:'320px', padding:'30px 25px', border:'none', boxShadow:'0 20px 40px rgba(0,0,0,0.2)'}}>
                        <div style={{fontSize:'3rem', marginBottom:'10px'}}>📸</div>
                        <h3 style={{color:'#2A2433', margin:'0 0 10px 0', fontSize:'1.4rem'}}>¡Presumí tu regalo!</h3>
                        <p style={{color:'#666', fontSize:'0.95rem', marginBottom:'20px', lineHeight:1.5}}>Hacé una <strong>captura de pantalla</strong> de esta tarjeta (ya tiene el logo 😉) y subila a tus Historias.</p>
                        <div style={{background:'#f8f8f8', padding:'12px', borderRadius:'12px', fontSize:'0.85rem', color:'#555', marginBottom:'25px'}}>Etiquetanos para que lo veamos:<br/><strong style={{color:'#F44E63', fontSize:'1rem'}}>@boxie.app</strong></div>
                        <button onClick={() => setShowShareHint(false)} style={{background:'#2A2433', border:'none', padding:'12px 30px', borderRadius:'30px', color:'white', fontWeight:'bold', fontSize:'0.9rem', cursor:'pointer', width:'100%'}}>¡Entendido!</button>
                    </div>
                </div>
            )}
        </div>
    );
};

/* --- SUMMARY SLIDE --- */
const SummarySlide = () => {
    const [phase, setPhase] = useState('intro');
    const brandColor = '#F44E63'; 
    const timelineData = [ { icon: <Gift />, title: "El Inicio", text: "Una sorpresa preparada solo para vos." }, { icon: <Heart />, title: "Dedicatoria", text: "Palabras sinceras directo al corazón." }, { icon: <Music />, title: "Nuestra Canción", text: "Esa melodía que nos conecta." }, { icon: <Headphones />, title: "Playlist", text: "Una selección de temas para tu mood." }, { icon: <Smile />, title: "Desafío Trivia", text: "Jugaste y ganaste (¡esperamos!)." }, { icon: <Sun />, title: "Jackpot", text: "La suerte estuvo de tu lado hoy." }, { icon: <Ticket />, title: "Cuponera", text: "Vales por momentos para canjear cuando quieras." }, { icon: <Camera />, title: "Editorial", text: "Tu foto con estilo de revista. ¡Muy aesthetic!" }, { icon: <CheckCircle />, title: "10 Razones", text: "Un recordatorio de por qué sos especial." }, { icon: <Heart />, title: "Gratitud", text: "Pausa para valorar lo bueno del año." }, { icon: <PenTool />, title: "Journaling", text: "Espacio para escribir tu futuro." }, { icon: <Moon />, title: "Fortuna", text: "Un mensaje del universo para guiarte." }, { icon: <Film />, title: "Anécdota", text: "Ese recuerdo imborrable. ¡Compartilo en Stories!" }, ];
    const INTRO_DURATION = 4000; const ITEM_DELAY = 1.3; const SCROLL_START_DELAY = 2.5; 
    const TIMELINE_DURATION = (timelineData.length * ITEM_DELAY * 1000) + (SCROLL_START_DELAY * 1000) + 2000; 

    useEffect(() => { let timer; if (phase === 'intro') { timer = setTimeout(() => setPhase('timeline'), INTRO_DURATION); } else if (phase === 'timeline') { timer = setTimeout(() => setPhase('outro'), TIMELINE_DURATION); } return () => clearTimeout(timer); }, [phase]);
    const handleReplay = () => { setPhase('intro'); };

    return (
        <div className="summary-container" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#fff0f3', display: 'flex', flexDirection: 'column', color: '#2A2433' }}>
            <AnimatePresence mode='wait'>
                {phase === 'intro' && (
                    <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px', zIndex: 10 }}>
                        <motion.h3 initial={{opacity:0}} animate={{opacity:1}} style={{fontWeight:'normal', fontSize:'1.2rem', marginBottom:'10px'}}>Espera...</motion.h3>
                        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }} style={{ background: brandColor, color: 'white', padding: '15px 25px', fontSize: '2rem', fontWeight: '900', display: 'inline-block', transform: 'rotate(-2deg)', marginBottom: '15px', boxShadow: '5px 5px 0px rgba(0,0,0,0.1)' }}>¡QUÉ VIAJE!</motion.div>
                        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }} style={{ background: '#2A2433', color: 'white', padding: '15px 25px', fontSize: '1.5rem', fontWeight: '900', display: 'inline-block', transform: 'rotate(1deg)', alignSelf: 'flex-start', marginBottom: '20px', boxShadow: '5px 5px 0px rgba(244,78,99,0.3)' }}>TODO LO QUE VIMOS</motion.div>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} style={{fontSize:'1.2rem', marginTop:'20px'}}>Repasemos juntos todo lo que incluía tu Boxie...</motion.p>
                    </motion.div>
                )}
                {phase === 'timeline' && (
                    <motion.div key="timeline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95, transition:{duration:0.8} }} style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{paddingTop:'40px', paddingBottom:'20px', textAlign:'center', background:'linear-gradient(to bottom, #fff0f3 80%, transparent)', zIndex:10, position:'absolute', top:0, width:'100%'}}><h2 style={{color: brandColor, fontWeight:'900', fontSize:'1.5rem', margin:0}}>TU EXPERIENCIA</h2></div>
                        <motion.div style={{padding: '100px 20px 200px 20px', position:'relative'}} animate={{ y: [0, -1400] }} transition={{ delay: SCROLL_START_DELAY, duration: (TIMELINE_DURATION / 1000) - SCROLL_START_DELAY, ease: "linear" }}>
                            <svg width="100%" height="2000" viewBox="0 0 300 2000" style={{position:'absolute', top:0, left:0, zIndex:0, overflow:'visible'}}>
                                <motion.path d="M 150 80 C 250 180, 50 280, 150 380 C 250 480, 50 580, 150 680 C 250 780, 50 880, 150 980 C 250 1080, 50 1180, 150 1280 C 250 1380, 50 1480, 150 1580 C 250 1680, 50 1780, 150 1880" fill="transparent" stroke={brandColor} strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: SCROLL_START_DELAY - 0.5, duration: (TIMELINE_DURATION / 1000) - SCROLL_START_DELAY, ease: "linear" }} />
                            </svg>
                            <div style={{position:'relative', zIndex:2, display:'flex', flexDirection:'column', gap:'85px'}}>{timelineData.map((item, i) => (<TimelineItem key={i} item={item} index={i} brandColor={brandColor} delay={ITEM_DELAY} />))}</div>
                        </motion.div>
                    </motion.div>
                )}
                {phase === 'outro' && (
                    <motion.div key="outro" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', textAlign: 'center', background: 'linear-gradient(135deg, #fff0f3 0%, #ffe4e9 100%)' }}>
                        <motion.img src={logoBoxie} alt="Boxie" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type:"spring", bounce:0.5, delay:0.3 }} style={{width:'130px', marginBottom:'30px'}} />
                        <h2 style={{fontSize:'2.5rem', fontWeight:'900', color: brandColor, margin:'0 0 10px 0'}}>GRACIAS.</h2>
                        <p style={{fontSize:'1.1rem', maxWidth:'320px', lineHeight:1.5, marginBottom:'25px', color:'#555'}}>Por vivir esta experiencia con nosotros de principio a fin.</p>
                        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8, type:'spring' }} style={{background:'white', padding:'25px', borderRadius:'25px', boxShadow:'0 15px 30px rgba(244,78,99,0.15)', maxWidth:'320px'}}>
                             <Heart size={30} color={brandColor} fill={brandColor} style={{marginBottom:'15px'}} />
                             <p style={{fontWeight:'bold', fontSize:'1rem', marginBottom:'10px', color:'#2A2433'}}>Un último favor</p>
                             <p style={{fontSize:'0.9rem', color:'#666', marginBottom:'20px', lineHeight:1.4}}>Si te gustó, compartí tus capturas favoritas en <strong>Stories</strong>. ¡Nos ayudás muchísimo a seguir creando momentos así!</p>
                             <div style={{ background: brandColor, color:'white', padding:'12px', borderRadius:'50px', fontWeight:'bold', fontSize:'0.9rem', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', marginBottom:'15px' }}> <Share2 size={18}/> @boxie.app </div>
                             <button onClick={handleReplay} style={{ background: 'transparent', border: 'none', color: '#999', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline', marginTop: '5px' }}>Ver repaso de nuevo ↺</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const TimelineItem = ({ item, index, brandColor, delay }) => {
    const appearDelay = 0.5 + (index * delay); 
    const isEven = index % 2 === 0; 
    return (
        <motion.div initial={{ opacity: 0, x: isEven ? -30 : 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: appearDelay }} style={{ display: 'flex', alignItems: 'center', flexDirection: isEven ? 'row' : 'row-reverse', gap: '12px', position: 'relative' }}>
            <div style={{position: 'relative', zIndex: 2, flexShrink:0}}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: appearDelay, type:'spring' }} style={{ width: '42px', height: '42px', background: brandColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: `0 0 0 4px #fff0f3, 0 4px 10px rgba(244,78,99,0.3)` }}>{item.icon}</motion.div>
            </div>
            <div style={{ background: 'white', padding: '12px 18px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', flex: 1, textAlign: isEven ? 'left' : 'right', minWidth: 0 }}>
                <h4 style={{margin:'0 0 3px 0', color: brandColor, fontWeight:'900', fontSize:'0.95rem'}}>{item.title}</h4>
                <p style={{margin:0, fontSize:'0.8rem', color:'#666', lineHeight:1.3}}>{item.text}</p>
            </div>
        </motion.div>
    );
};

/* --- COMPONENTE PRINCIPAL --- */
const GiftBoxPlayer = ({ data, closePlayer, isPreview = false }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  // Asegurar que 'data' existe para evitar errores
  const safeData = data || { themeType: 'love', recipient: 'Alguien', sender: 'Alguien', reasons: [] };

  const getYoutubeID = (url) => { if(!url) return null; const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/; const match = url.match(regExp); return (match && match[2].length === 11) ? match[2] : null; };
  const videoID = getYoutubeID(safeData.youtubeLink);

  const slides = useMemo(() => [
    { theme: "theme-intro", content: (<div className="intro-logo-container" style={{position:'relative'}}><style>{`@keyframes popBounce {0% { transform: scale(0) rotate(-15deg); opacity: 0; } 50% { transform: scale(1.2) rotate(5deg); opacity: 1; } 70% { transform: scale(0.9) rotate(-3deg); } 100% { transform: scale(1) rotate(0); opacity: 1; }} @keyframes floatLogo {0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); }} .logo-intro-img {width: 180px; animation: popBounce 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards, floatLogo 3s ease-in-out infinite 1s; filter: drop-shadow(0 10px 20px rgba(244, 78, 99, 0.3));}`}</style><img src={logoBoxie} alt="Boxie" className="logo-intro-img" /><p className="intro-tagline" style={{marginTop:'20px', animation:'fadeIn 1s ease 0.5s forwards', opacity:0}}>Una experiencia digital para vos.</p><div className="swipe-hint" style={{animation:'fadeIn 1s ease 1s forwards', opacity:0}}>Desliza para comenzar ➷</div></div>)},
    
    // --- SLIDE DESTINATARIO DINÁMICA (FULL SCREEN ENABLED) ---
    { 
        theme: safeData.themeType === 'love' ? "theme-salmon" : "", 
        particles: safeData.themeType === 'bday' ? "bday-fest" : safeData.themeType === 'friend' ? "friend" : "heart",
        fullScreen: safeData.themeType === 'bday' || safeData.themeType === 'friend', 
        content: (<>{safeData.themeType === 'bday' && <ConfettiLayer />}<RecipientSlide data={safeData} /></>)
    },

   { 
        theme: "theme-white-boxie", 
        fullScreen: true, 
        content: <IntroStorySlide data={safeData} />
    },
    
    { 
        theme: "theme-full", 
        fullScreen: true, 
        content: <DedicationSlide data={safeData} /> 
    },
    // 4. SONG
    { 
        theme: "theme-full", 
        fullScreen: true,
        content: (
            <div style={{width:'100%', height:'100%', position:'relative', background:'black', overflow:'hidden'}}>
                
                <style>{`
                    .song-overlay-card { 
                        position: absolute; 
                        bottom: 60px; 
                        left: 0; right: 0; margin: 0 auto; 
                        width: 85%; max-width: 350px; 
                        background: rgba(255, 255, 255, 0.2); 
                        backdrop-filter: blur(10px); 
                        border: 1px solid rgba(255, 255, 255, 0.3); 
                        padding: 20px; border-radius: 20px; 
                        box-shadow: 0 10px 40px rgba(0,0,0,0.5); 
                        text-align: left; z-index: 20; 
                        pointer-events: none; 
                    }
                `}</style>

                <div className="slide-video-container" style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                    overflow: 'hidden',
                    pointerEvents: 'none' 
                }}>
                    {videoID ? (
                        <iframe 
                            className="full-video-iframe" 
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: '100%', 
                                height: '100%', 
                                border: 'none',
                                transform: 'translate(-50%, -50%) scale(4.5)', 
                                pointerEvents: 'none' 
                            }}
                            src={`https://www.youtube.com/embed/${videoID}?autoplay=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${videoID}&playsinline=1`} 
                            allow="autoplay; encrypted-media" 
                            allowFullScreen 
                            title="Song" 
                        />
                    ) : (
                        <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', color:'white'}}>
                            Sin Video
                        </div>
                    )}
                </div>

                <div className="song-overlay-card">
                    <h3 style={{color:'white', fontSize:'1.2rem', margin:'0 0 5px 0', display:'flex', alignItems:'center', gap:'10px', textShadow:'0 2px 4px rgba(0,0,0,0.5)'}}>
                        {safeData.songTitle} 🎵
                    </h3>
                    <p style={{color:'rgba(255,255,255,0.9)', fontSize:'0.95rem', margin:0, lineHeight:1.4}}>
                        <strong style={{color:'#F44E63'}}>{safeData.sender}</strong> siempre que se acuerda de vos, piensa en esta canción.
                    </p>
                </div>
            </div>
        )
    },
    { theme: "theme-full", content: <SpotifySlide data={safeData} /> },
    { theme: "theme-full", content: <GamerConnector /> },
    { theme: "theme-full", content: <TriviaSlide /> },
    { 
        theme: "theme-full", 
        content: <CinemaConnector data={safeData} /> 
    },
    { theme: "theme-full", content: <StreamingSlide /> },
    { theme: "theme-full", content: <JackpotSlide /> },
    { theme: "theme-full", content: <CouponsSlide data={safeData} /> },
    { theme: "theme-full", content: <EditorialSlide imageURL={safeData.dedicationImage} themeType={safeData.themeType} /> },
    { theme: "theme-full", content: <ReasonsVideoSlide data={safeData} /> },
    { theme: "theme-full", content: <GratitudeSlide /> },
    { theme: "theme-full", content: <JournalSlide /> },
    { theme: "theme-full", content: <FortuneSlide /> },
    { theme: "theme-full", content: <AnecdoteSlide data={safeData} /> },
    // 14. SUMMARY
    { theme: "theme-full", content: <SummarySlide /> },
    { theme: "theme-salmon", particles: "heart", content: <div><h1 style={{fontSize:'3rem', color:'white'}}>GRACIAS</h1><p style={{color:'white'}}>Por ser parte de mi vida.</p><button onClick={() => setCurrentSlide(0)} style={{background:'white', color:'#F44E63', padding:'10px 20px', borderRadius:'30px', border:'none', marginTop:'20px'}}>REPETIR BOXIE</button></div> }
  ], [safeData, videoID]);

  const handleStart = (e) => { setIsDragging(true); setStartY(e.clientY || e.touches[0].clientY); setDragOffset(0); };
  const handleMove = (e) => { if (!isDragging) return; const clientY = e.clientY || e.touches[0].clientY; const diff = clientY - startY; setDragOffset(((currentSlide === 0 && diff > 0) || (currentSlide === slides.length - 1 && diff < 0)) ? diff * 0.3 : diff); };
  const handleEnd = () => { setIsDragging(false); if (dragOffset < -80 && currentSlide < slides.length - 1) setCurrentSlide(s => s + 1); else if (dragOffset > 80 && currentSlide > 0) setCurrentSlide(s => s - 1); setDragOffset(0); };

  if (!data) return <div className="player-error">Cargando experiencia...</div>;

  return (
    <div className="player-overlay">
      <div className="mobile-container" onMouseDown={handleStart} onMouseMove={handleMove} onMouseUp={handleEnd} onMouseLeave={handleEnd} onTouchStart={handleStart} onTouchMove={handleMove} onTouchEnd={handleEnd}>
        
        {/* Barra de progreso superior */}
        <div className="progress-bar-container">
            {slides.map((_, i) => (
                <div key={i} className={`progress-segment ${i === currentSlide ? 'active' : ''}`}></div>
            ))}
        </div>
        
        {/* Botón cerrar (Solo si es Preview) */}
        {isPreview && (
            <button onClick={closePlayer} className="btn-close-player"><X size={20} /></button>
        )}
        
        {slides.map((slide, index) => (
            <Slide 
                key={index}
                theme={slide.theme}
                index={index}
                currentSlide={currentSlide}
                dragOffset={dragOffset}
                isDragging={isDragging}
                particles={slide.particles}
                fullScreen={slide.fullScreen} 
            >
                {slide.content}
            </Slide>
        ))}
      </div>
    </div>
  );
};

export default GiftBoxPlayer;