import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/LoginBoxie.css'; 

// FIREBASE
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/config';

const LoginBoxie = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Si ya hay sesión local, validamos si sigue siendo útil o redirigimos
  useEffect(() => {
    if (localStorage.getItem('active_box_id')) {
        navigate('/editor');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ 
        ...credentials, 
        [name]: name === 'id' ? value.toUpperCase() : value 
    });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!credentials.id || !credentials.password) {
        setError('Por favor completá todos los datos.');
        return;
    }

    setLoading(true);

    try {
        // 1. BUSCAR EN FIREBASE
        const docRef = doc(db, "boxies", credentials.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            
            // 2. VERIFICAR CONTRASEÑA
            // (Nota: En producción real usaríamos hash, pero para este MVP texto plano sirve)
            if (data.accessPassword === credentials.password) {
                // ÉXITO
                localStorage.setItem('active_box_id', credentials.id);
                navigate('/editor');
            } else {
                setError('La contraseña es incorrecta.');
            }
        } else {
            setError('No encontramos una Boxie con ese ID.');
        }
    } catch (err) {
        console.error(err);
        setError('Error de conexión. Intentá de nuevo.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-page">
        <div className="login-card">
            <div className="login-header">
                <h2>Ingresá a tu Boxie</h2>
                <p>Usá el ID que recibiste en tu compra.</p>
            </div>
            <div className="login-body">
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>ID de Boxie</label>
                        <input type="text" name="id" placeholder="BOX-XXXX" onChange={handleChange} value={credentials.id} maxLength={10}/>
                    </div>
                    <div className="input-group">
                        <label>Clave de Edición</label>
                        <input type="password" name="password" placeholder="••••••••" onChange={handleChange} value={credentials.password}/>
                    </div>

                    {error && <div className="error-msg">⚠️ {error}</div>}

                    <button type="submit" className="btn-login" disabled={loading}>
                        {loading ? "Verificando..." : "INGRESAR AL EDITOR"}
                    </button>
                </form>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginBoxie;