import React from "react";
import { useNavigate } from "react-router-dom";
import { useAutentificacion } from "../context/AutentificacionContext";

const CiudadanoHome = () => {
  const navigate = useNavigate();
  const { usuario, logout } = useAutentificacion();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/login");
  };

  return (
    <div>
      <h1>Inicio de Ciudadano</h1>
      <p>Bienvenido, aquí puedes realizar denuncias o hacer seguimiento.</p>
      <button onClick={handleLogout} style={{ marginTop: "20px" }}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default CiudadanoHome;
