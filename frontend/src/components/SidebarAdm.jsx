import React from 'react';
import './SidebarAdm.css';

const SidebarAdm = () => {
  const toggleSidebar = () => {
    document.querySelector('.sidebar').classList.toggle('sidebar-open');
  };

  return (
    <>
      {/* Botón de menú */}
      <div className="buttommenu">
        <button className="menu-toggle" onClick={toggleSidebar}>
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <img src="/logo.png" alt="Logo testiGO" className="logo" />
        <ul className="menu-list">
          <li className="menu-item">Usuarios</li>
          <li className="menu-item">Instituciones</li>
          <li className="menu-item">Reportes Totales</li>
          <li className="menu-item">Estadísticas</li>
          <li className="menu-item">Cerrar Sesión</li>
        </ul>
      </div>
    </>
  );
};

export default SidebarAdm;
