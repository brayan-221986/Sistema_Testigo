import React, { useState } from 'react';
import '../components/CrearUsuario.css';

const CrearUsuario = () => {
  const [formData, setFormData] = useState({
    dni: '',
    nombres: '',
    apellidos: '',
    rol: 'Usuario',
    correo: '',
    celular: '',
    password: '',
    confirmarPassword: '',
  });

  const [imagen, setImagen] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para guardar datos
    console.log('Formulario enviado:', formData);
  };

  return (
    <div className="crear-usuario">
        <div className="buttommenu">
            <button
                className="menu-toggle"
                onClick={() =>
                    document.querySelector('.sidebar').classList.toggle('sidebar-open')
                }
            >
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

      {/* Formulario principal */}
      <div className="form-container">
        <h1 className="titulo">Crear Usuario</h1>
        <div className="content">
          <div className="left-form">
            <form className="user-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <div className='DNI'>
                    <label>Nº de DNI:</label>
                    <input
                    type="text"
                    name="dni"
                    value={formData.dni}
                    onChange={handleChange}
                    />
                </div>
              </div>
              <div className="form-group">
                <label>Nombres:</label>
                <input
                  type="text"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Apellidos:</label>
                <input
                  type="text"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Rol:</label>
                <select
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                >
                  <option value="Usuario">Usuario</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </div>
              <div className="form-group">
                <label>Correo:</label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Nro de Celular:</label>
                <input
                  type="text"
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Nueva Contraseña:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Confirmar Contraseña:</label>
                <input
                  type="password"
                  name="confirmarPassword"
                  value={formData.confirmarPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-button">
                  Cancelar
                </button>
                <button type="submit" className="submit-button">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>

          {/* Imagen de perfil */}
          <div className="right-profile">
            <div className="profile-upload">
              <img
                src={imagen || 'https://via.placeholder.com/120'}
                alt="Perfil"
              />
              <label htmlFor="upload-input" className="upload-label">
                Subir Imagen
              </label>
              <input
                type="file"
                id="upload-input"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImagenChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearUsuario;
