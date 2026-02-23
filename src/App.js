import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importamos las páginas
import Home from './pages/marketing/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTA 1: La Home Pública (Marketing) */}
        <Route path="/" element={<Home />} />

        {/* Aquí agregaremos pronto las otras rutas:
            <Route path="/galeria" element={<Gallery />} />
            <Route path="/crear" element={<Editor />} />
        */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;