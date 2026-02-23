import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importamos TODAS las páginas
import Home from './pages/marketing/Home';
import Gallery from './pages/marketing/Gallery';
import ProductView from './pages/marketing/ProductView';
// Las nuevas:
import About from './pages/marketing/About';
import Contact from './pages/marketing/Contact';
import Legal from './pages/marketing/Legal';
import Checkout from './pages/app/Checkout';
import Success from './pages/app/Success';
import Editor from './pages/app/Editor';
import LoginBoxie from './pages/app/LoginBoxie';
import GiftLogin from './pages/app/GiftLogin';
import LegalDoc from './pages/marketing/LegalDoc';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galeria" element={<Gallery />} />
        <Route path="/producto/:type" element={<ProductView />} />
        
        {/* Rutas Nuevas */}
        <Route path="/nosotros" element={<About />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/ayuda" element={<Legal />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/login-boxie" element={<LoginBoxie />} />
        <Route 
  path="/editor" 
  element={
    <ProtectedRoute>
      <Editor />
    </ProtectedRoute>
  } 
/>
        <Route path="/gift" element={<GiftLogin />} />
        <Route path="/legales/:slug" element={<LegalDoc />} />
      </Routes>
    </BrowserRouter>
  );
}



export default App;