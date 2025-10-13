// InstitucionHome.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAutentificacion } from "../context/AutentificacionContext";
import PlantillaAutoridad from "../components/PlantillaAutoridad";

const InstitucionHome = () => {
  const navigate = useNavigate();
  const { usuario, logout } = useAutentificacion();

  // Función para cerrar sesión usando el contexto
  const handleLogout = () => {
    logout();           // Elimina token, rol y usuario
    navigate("/login"); // Redirige al login
  };

  // Mostrar mensaje de carga si usuario aún no está listo
  if (!usuario) return <p>Cargando...</p>;

  return (
    <PlantillaAutoridad tituloHeader="Inicio" >
      <div>
        <h1>Inicio de Institución</h1>
        <p>Bienvenido, {usuario.nombres}. Aquí puedes registrar y gestionar casos de tu institución.</p>
        <button onClick={handleLogout} style={{ marginTop: "20px" }}>
          Cerrar Sesión
        </button>
      </div>
    </PlantillaAutoridad>
  );
};

export default InstitucionHome;
