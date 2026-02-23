import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // <--- AGREGADO: Para leer la URL
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import logoBoxie from '/Boxie.png'; 
import '../../styles/Checkout.css';

// Tu Public Key
initMercadoPago('APP_USR-c6c6624c-fa62-430b-a359-71c21c1a054e', { locale: 'es-AR' });

const Checkout = () => {
  const [searchParams] = useSearchParams(); // <--- AGREGADO: Hook para leer URL
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
 
  // Estados para Cupones
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState("");
 
  // Estado para Términos y Condiciones
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const originalPrice = 15000;
  const currentPrice = appliedCoupon
      ? originalPrice - (originalPrice * appliedCoupon.percent / 100)
      : originalPrice;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- VALIDAR CUPÓN (MODIFICADO PARA FUNCIONAR AUTOMÁTICO) ---
  // Ahora acepta un argumento opcional "codeOverride"
  const handleApplyCoupon = async (codeOverride) => {
    // Si recibe un string (del useEffect), usa ese. Si no (click del botón), usa el estado couponInput.
    const codeToValidate = typeof codeOverride === 'string' ? codeOverride : couponInput;

    if (!codeToValidate || !codeToValidate.trim()) return;
   
    try {
        const response = await fetch("http://127.0.0.1:3000/validate_coupon", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ coupon: codeToValidate })
        });
        const data = await response.json();

        if (data.valid) {
            setAppliedCoupon({ code: codeToValidate, percent: data.discountPercent });
            setCouponMessage(`¡Descuento del ${data.discountPercent}% aplicado!`);
            // Aseguramos que el input muestre el código si fue automático
            setCouponInput(codeToValidate);
        } else {
            setAppliedCoupon(null);
            setCouponMessage("El cupón no es válido o expiró.");
        }
    } catch (error) {
        console.error(error);
        setCouponMessage("Error de conexión. Verificá que el servidor esté encendido.");
    }
  };

  // --- NUEVO: EFECTO PARA DETECTAR CUPÓN EN URL ---
  useEffect(() => {
    const couponFromUrl = searchParams.get('coupon');
    // Si hay cupón en la URL y aún no hemos aplicado ninguno...
    if (couponFromUrl && !appliedCoupon) {
        setCouponInput(couponFromUrl); // Lo escribe visualmente
        handleApplyCoupon(couponFromUrl); // Lo valida automáticamente
    }
  }, [searchParams]);

  // --- CREAR PEDIDO ---
  const handleCreateOrder = async (e) => {
    e.preventDefault();
   
    // Validación de Términos
    if (!termsAccepted) {
        alert("Por favor, aceptá los términos y condiciones para continuar.");
        return;
    }

    setIsLoading(true);

    try {
      if (!formData.name || !formData.email || !formData.phone) {
        alert("Completa tus datos primero.");
        setIsLoading(false);
        return;
      }

      const orderData = {
        title: "Boxie Personalizable", 
        price: originalPrice,
        quantity: 1,
        coupon: appliedCoupon ? appliedCoupon.code : null
      };

      const response = await fetch("http://127.0.0.1:3000/create_preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
     
      if (data.id) {
        setPreferenceId(data.id);
        setStep(2);
      } else {
          console.error("No llegó el ID del backend", data);
          alert("Hubo un problema comunicando con Mercado Pago.");
      }

    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor (Backend offline).");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="checkout-page">
        <div className="checkout-container">
            
            {/* IZQUIERDA: Formulario */}
            <div className="checkout-form-section">
                <h2 style={{marginBottom:'20px'}}>Finalizar Compra</h2>
                
                {/* --- SECCIÓN CÓMO FUNCIONA --- */}
                <div className="how-it-works" style={{background:'#fff0f3', padding:'20px', borderRadius:'15px', marginBottom:'30px', border:'1px solid #ffccd5'}}>
                    <h3 style={{color:'#F44E63', marginBottom:'15px', display:'flex', alignItems:'center', gap:'10px'}}>
                        ⚙️ ¿Cómo funciona?
                    </h3>
                    <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
                        <div className="step-row" style={{display:'flex', gap:'15px'}}>
                            <div style={{background:'#F44E63', color:'white', width:'25px', height:'25px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold', flexShrink:0}}>1</div>
                            <p style={{fontSize:'0.9rem', margin:0}}><strong>Comprás tu Boxie:</strong> Completá tus datos y realizá el pago seguro.</p>
                        </div>
                        <div className="step-row" style={{display:'flex', gap:'15px'}}>
                            <div style={{background:'#F44E63', color:'white', width:'25px', height:'25px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold', flexShrink:0}}>2</div>
                            <p style={{fontSize:'0.9rem', margin:0}}><strong>Recibís el acceso:</strong> Te llega un mail con el link y tu clave de editor.</p>
                        </div>
                        <div className="step-row" style={{display:'flex', gap:'15px'}}>
                            <div style={{background:'#F44E63', color:'white', width:'25px', height:'25px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold', flexShrink:0}}>3</div>
                            <p style={{fontSize:'0.9rem', margin:0}}><strong>Personalizás:</strong> Cargás fotos, dedicatorias, música y anécdotas.</p>
                        </div>
                        <div className="step-row" style={{display:'flex', gap:'15px'}}>
                            <div style={{background:'#F44E63', color:'white', width:'25px', height:'25px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold', flexShrink:0}}>4</div>
                            <p style={{fontSize:'0.9rem', margin:0}}><strong>Regalás:</strong> Bloqueás la edición y compartís el link único a esa persona especial. ✨</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleCreateOrder} className="security-form">
                    <h3>Datos de contacto</h3>
                    <div className="input-group">
                        <label>Nombre Completo</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} disabled={step === 2} required />
                    </div>
                    <div className="input-group">
                        <label>Email (Donde recibirás el acceso)</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={step === 2} required />
                    </div>
                    <div className="input-group">
                        <label>Teléfono (WhatsApp)</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} disabled={step === 2} required />
                    </div>

                    {/* --- CHECKBOX DE TÉRMINOS Y CONDICIONES --- */}
                    {step === 1 && (
                    <div style={{margin:'20px 0', display:'flex', alignItems:'flex-start', gap:'10px'}}>
                        <input
                            type="checkbox"
                            id="terms"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            style={{marginTop:'4px', cursor:'pointer', width:'20px', height:'20px', accentColor:'#F44E63'}}
                        />
                        <label htmlFor="terms" style={{fontSize:'0.85rem', color:'#555', cursor:'pointer', lineHeight:'1.4'}}>
                            Acepto los{' '}
                            <a
                                href="/terminos"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{color:'#F44E63', fontWeight:'bold', textDecoration:'underline'}}
                            >
                                Términos y Condiciones
                            </a>
                            {' '}y la{' '}
                            <a
                                href="/privacidad"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{color:'#F44E63', fontWeight:'bold', textDecoration:'underline'}}
                            >
                                Política de Privacidad
                            </a>.
                            <br/>
                            Entiendo que la Boxie es digital, se puede editar y bloquear <u>una sola vez</u> y el link expirará a los 60 días de su creación.
                        </label>
                    </div>
                    )}

                    {step === 1 && (
                        <button
                            type="submit"
                            className="btn-continue"
                            disabled={isLoading || !termsAccepted} // Deshabilitado si no acepta
                            style={{opacity: termsAccepted ? 1 : 0.5, cursor: termsAccepted ? 'pointer' : 'not-allowed'}}
                        >
                            {isLoading ? "Procesando..." : "Ir a Pagar"}
                        </button>
                    )}
                </form>

                {step === 2 && preferenceId && (
                    <div className="payment-area fade-in">
                        <h3>Total a pagar: ${currentPrice.toLocaleString('es-AR')}</h3>
                        <p style={{fontSize:'0.9rem', color:'#666', marginBottom:'20px'}}>Elegí tu medio de pago favorito:</p>
                        <div className="mp-box">
                             <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts:{ valueProp: 'smart_option'}}} />
                        </div>
                        <button className="btn-link" onClick={() => setStep(1)} style={{marginTop:'15px', color:'#888', background:'none', border:'none', cursor:'pointer', textDecoration:'underline'}}>
                            Volver a modificar datos
                        </button>
                    </div>
                )}
            </div>

            {/* DERECHA: Resumen + Cupones */}
            <div className="order-summary-section">
                <div className="summary-card">
                    <h3>Resumen del pedido</h3>
                    <div className="summary-item" style={{alignItems:'flex-start'}}>
                        {/* IMAGEN: LOGO BOXIE */}
                        <div style={{width:'70px', height:'70px', background:'#f9f9f9', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', padding:'5px', border:'1px solid #eee'}}>
                             <img src={logoBoxie} alt="Boxie" style={{width:'100%', height:'auto', objectFit:'contain'}} />
                        </div>
                        
                        <div>
                            <h4 style={{fontSize:'1.1rem', marginBottom:'5px'}}>Boxie Personalizable</h4>
                            <div style={{fontSize:'0.8rem', color:'#666', lineHeight:'1.4'}}>
                                <p style={{margin:0}}>✅ Experiencia 100% Digital</p>
                                <p style={{margin:0}}>⚠️ Editable 1 vez (Bloqueo final)</p>
                                <p style={{margin:0}}>⏳ Expira en 60 días</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* SECCIÓN DE CUPÓN */}
                    <div className="coupon-section">
                        <div className="coupon-input-row">
                            <input
                                type="text"
                                placeholder="Tengo un cupón..."
                                value={couponInput}
                                onChange={(e) => setCouponInput(e.target.value.toUpperCase())} // Auto mayúsculas
                                disabled={appliedCoupon}
                            />
                            {!appliedCoupon ? (
                                <button type="button" onClick={() => handleApplyCoupon()}>Aplicar</button>
                            ) : (
                                <button type="button" className="btn-remove" onClick={() => {setAppliedCoupon(null); setCouponInput(""); setCouponMessage("");}}>X</button>
                            )}
                        </div>
                        {couponMessage && <p className={`coupon-msg ${appliedCoupon ? 'success' : 'error'}`}>{couponMessage}</p>}
                    </div>

                    <hr />
                    
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>$ {originalPrice.toLocaleString('es-AR')}</span>
                    </div>

                    {appliedCoupon && (
                        <div className="summary-row discount">
                            <span>Descuento ({appliedCoupon.percent}%)</span>
                            <span>- $ {(originalPrice * appliedCoupon.percent / 100).toLocaleString('es-AR')}</span>
                        </div>
                    )}

                    <div className="summary-total">
                        <span>Total</span>
                        <span className="total-price">$ {currentPrice.toLocaleString('es-AR')}</span>
                    </div>
                </div>
            </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;