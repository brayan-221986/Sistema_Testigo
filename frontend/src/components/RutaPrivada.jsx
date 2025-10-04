// RutaPrivada.jsx 

import React from "react";
import { Navigate } from "react-router-dom";

const RutaPrivada = ({ children, roles }) => {
  const token = localStorage.getItem("token"); // o sessionStorage si prefieres persistencia por sesión
  let usuario = null;

  try {
    usuario = JSON.parse(localStorage.getItem("usuario")); // manejo de error
  } catch (e) {
    usuario = null;
  }

  // Redirige al login si no hay token o usuario inválido
  if (!token || !usuario) {
    return <Navigate to="/login" replace />;
  }

  // Redirige al inicio si el usuario no tiene un rol permitido
  if (roles && !roles.includes(usuario.rol)) {
    return <Navigate to="/" replace />;
  }

  // Renderiza los componentes hijos si pasa las validaciones
  return children;
};

export default RutaPrivada;
