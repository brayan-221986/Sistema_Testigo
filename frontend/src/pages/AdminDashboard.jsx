// AdminDashboard.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAutentificacion } from "../context/AutentificacionContext";
//import PlantillaAdmin from '../components/PlantillaAdmin';
import '../components/AdminDashboard.css'; // Opcional para estilos de layout

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { usuario, logout } = useAutentificacion();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!usuario) return <p>Cargando...</p>;

  return (
    <div className="admin-container">
      {/* Sidebar a la izquierda */}

      {/* Contenido principal */}
      <div className="admin-content">
        <h1>Bienvenido, {usuario.nombres}</h1>
        <p>Panel de Administrador: gestiona usuarios y el sistema.</p>

        {/* Botón para crear usuario */}
        <button
          className="btn-crear-usuario"
          onClick={() => navigate("/admin/crear-usuario")}
          style={{ marginTop: "20px" }}
        >
          Crear Usuario
        </button>

        {/* Botón de cerrar sesión */}
        <button
          className="btn-logout"
          onClick={handleLogout}
          style={{ marginTop: "10px" }}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
