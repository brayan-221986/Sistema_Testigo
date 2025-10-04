// PlantillaCiudadano.jsx

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAutentificacion } from "../context/AutentificacionContext";
import './PlantillaCiudadano.css';

const LayoutPrincipal = ({ children, tituloHeader = "Dashboard" }) => {
  const navigate = useNavigate();
  const { usuario, logout } = useAutentificacion(); // Usamos contexto
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Mostrar mensaje mientras se carga usuario desde contexto
  if (!usuario) return <p>Cargando...</p>;

  // Funciones para manejar menú lateral
  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const cerrarMenu = () => setMenuAbierto(false);
  const navegarConCierre = (ruta) => {
    navigate(ruta);
    cerrarMenu();
  };

  // Cerrar sesión usando contexto
  const manejarCerrarSesion = () => {
    logout();
    cerrarMenu();
    navigate("/login");
  };

  return (
    <div className="layout-principal">
      {/* Overlay para cerrar menú al hacer clic fuera */}
      <div 
        className={`overlay ${menuAbierto ? 'active' : ''}`}
        onClick={cerrarMenu}
      ></div>

      {/* Sidebar */}
      <aside className={`sidebar ${menuAbierto ? 'active' : ''}`}>
        <div className="perfil">
          <img className="foto-usuario" src={usuario?.foto || '/usuario-img.jpg'}/>
          <p>BIENVENIDO:</p>
          <p>{usuario?.nombres || 'Usuario'}</p>
        </div>
        <nav className="menu">
          <button onClick={() => navegarConCierre('/reportes')}>Reportes</button>
          <button onClick={() => navegarConCierre('/mis-reportes')}>Mis Reportes</button>
          <button onClick={() => navegarConCierre('/estadisticas')}>Estadísticas</button>
          <button className="activo" onClick={() => navegarConCierre('/ciudadano/home')}>Nuevo Reporte</button>
          <button onClick={manejarCerrarSesion}>Cerrar Sesión</button>
        </nav>
        <div className="logo">
          <img src="/logo.png" alt="testiGO" />
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="contenido-principal">
        <div className="header">
          <div className="header-izquierdo">
            {/* Botón menú hamburguesa */}
            <button 
              className={`menu-hamburguesa ${menuAbierto ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Abrir/Cerrar menú"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <div className="header-derecho">
            <h2>{tituloHeader}</h2>
          </div>
        </div>
        <div className="contenido-dinamico">
          {children}
        </div>
      </main>
    </div>
  );
};

export default LayoutPrincipal;
