import React from "react";
import { useNavigate } from "react-router-dom";
import { useAutentificacion } from "../context/AutentificacionContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { usuario, logout } = useAutentificacion();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/login");
  };

  return (
    <div>
      <h1>Panel de Administrador</h1>
      <p>Bienvenido, aquí puedes gestionar usuarios y el sistema.</p>
      <button onClick={handleLogout} style={{ marginTop: "20px" }}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default AdminDashboard;
