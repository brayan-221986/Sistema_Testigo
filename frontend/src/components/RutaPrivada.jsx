import React from "react";
import { Navigate } from "react-router-dom";

const RutaPrivada = ({ children, roles }) => {
  const token = localStorage.getItem("token");
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!token) {
    // Si no hay token, redirige al login
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(usuario.rol)) {
    return <Navigate to="/" replace />; // si no tiene rol permitido → inicio
  }

  return children;
};

export default RutaPrivada;
