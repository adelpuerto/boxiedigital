// src/pages/app/GiftLogin.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import GiftBoxPlayer from './BoxiePlayer'; 
import boxieLogo from '../../../Boxie.png'; 

const GiftLogin = () => {
    const [searchParams] = useSearchParams();
    const [boxId, setBoxId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [giftData, setGiftData] = useState(null);

    // Al cargar, chequeamos si hay un ID en el link (Ej: /gift?id=BOX-1234)
    useEffect(() => {
        const idFromUrl = searchParams.get('id');
        if (idFromUrl) {
            setBoxId(idFromUrl);
        }
    }, [searchParams]);

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        if (!boxId) {
            setError("Falta el ID de la Boxie.");
            return;
        }

        // 1. BUSCAR LA BOXIE ESPECÍFICA POR SU ID
        const storedData = localStorage.getItem(boxId);
        
        if (!storedData) {
            setError("No encontramos ninguna Boxie con ese ID. Revisá el código.");
            return;
        }

        const parsedData = JSON.parse(storedData);

        // 2. VERIFICAR PASSWORD
        if (password.toLowerCase().trim() === parsedData.accessPassword.toLowerCase().trim()) {
            setGiftData(parsedData);
            setIsAuthenticated(true);
        } else {
            setError("La clave es incorrecta.");
        }
    };

    // SI YA ENTRÓ -> MOSTRAR REGALO
    if (isAuthenticated && giftData) {
        return <GiftBoxPlayer data={giftData} isPreview={false} closePlayer={()=>{}} />;
    }

    return (
        <div style={{minHeight:'100vh', background:'#fdfbfb', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px'}}>
            <div style={{background:'white', padding:'40px', borderRadius:'25px', boxShadow:'0 10px 40px rgba(0,0,0,0.05)', width:'100%', maxWidth:'400px', textAlign:'center', border:'1px solid #eee'}}>
                
                <img src={boxieLogo} alt="Boxie" style={{width:'80px', marginBottom:'20px'}} />
                
                <h1 style={{fontSize:'1.8rem', color:'#2A2433', marginBottom:'10px'}}>¡Tenés un Regalo! 🎁</h1>
                <p style={{color:'#666', marginBottom:'30px', lineHeight:'1.5'}}>
                    Para abrir tu sorpresa, ingresá los datos de acceso.
                </p>

                <form onSubmit={handleLogin}>
                    {/* INPUT ID (Solo visible si no vino en la URL o si quieren cambiarlo) */}
                    <div style={{textAlign:'left', marginBottom:'10px'}}>
                        <label style={{fontSize:'0.8rem', fontWeight:'bold', color:'#888', marginLeft:'5px'}}>ID DE LA CAJA</label>
                        <input 
                            type="text" 
                            placeholder="Ej: BOX-1234"
                            className="boxie-input"
                            style={{
                                width: '100%', padding: '12px', borderRadius: '12px', border: '2px solid #eee', 
                                outline: 'none', fontFamily:'monospace', fontWeight:'bold', color:'#2A2433'
                            }}
                            value={boxId}
                            onChange={(e) => setBoxId(e.target.value)}
                        />
                    </div>

                    <div style={{textAlign:'left', marginBottom:'20px'}}>
                        <label style={{fontSize:'0.8rem', fontWeight:'bold', color:'#888', marginLeft:'5px'}}>CLAVE SECRETA</label>
                        <input 
                            type="text" 
                            placeholder="Escribí tu clave..."
                            className="boxie-input"
                            style={{
                                width: '100%', padding: '12px', borderRadius: '12px', border: '2px solid #eee', 
                                outline: 'none'
                            }}
                            value={password}
                            onChange={(e) => {setPassword(e.target.value); setError("");}}
                        />
                    </div>
                    
                    {error && <p style={{color:'#F44E63', fontSize:'0.9rem', marginBottom:'15px', fontWeight:'bold'}}>{error}</p>}

                    <button 
                        type="submit"
                        style={{
                            width:'100%', padding:'15px', borderRadius:'15px', border:'none',
                            background:'#F44E63', color:'white', fontSize:'1rem', fontWeight:'bold',
                            cursor:'pointer', boxShadow:'0 4px 10px rgba(244, 78, 99, 0.3)',
                            marginTop:'5px'
                        }}
                    >
                        ABRIR CAJA 🔓
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GiftLogin;