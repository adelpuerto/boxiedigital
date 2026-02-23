// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // 1. Buscamos si hay una "sesión" activa
  // (En Boxie, la sesión es tener un ID de caja guardado en el navegador)
  const isAuthenticated = localStorage.getItem('active_box_id');

  // 2. Si NO hay ID guardado, lo mandamos al Login
  if (!isAuthenticated) {
    // 'replace' evita que pueda volver atrás con el botón del navegador
    return <Navigate to="/login-boxie" replace />;
  }

  // 3. Si SÍ hay ID, mostramos el contenido (el Editor)
  return children;
};

export default ProtectedRoute;