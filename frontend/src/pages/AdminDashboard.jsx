// AdminDashboard.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAutentificacion } from "../context/AutentificacionContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { usuario, logout } = useAutentificacion();

  // Función para cerrar sesión usando contexto
  const handleLogout = () => {
    logout();       // Elimina token, rol y usuario
    navigate("/login"); // Redirige al login
  };

  // Mostrar mensaje de carga si usuario no está listo
  if (!usuario) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Panel de Administrador</h1>
      <p>Bienvenido, {usuario.nombres}. Aquí puedes gestionar usuarios y el sistema.</p>
      <button onClick={handleLogout} style={{ marginTop: "20px" }}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default AdminDashboard;
