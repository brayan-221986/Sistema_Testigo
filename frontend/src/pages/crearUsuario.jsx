import React, { useState } from 'react';
import axios from "axios";
import SidebarAdm from '../components/SidebarAdm';
import '../components/CrearUsuario.css';

const CrearUsuario = () => {
  // Estado para los datos del formulario
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
  // Estado para la imagen de perfil
  const [imagen, setImagen] = useState(null);

  // Maneja cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Maneja la subida de imagen de perfil
  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(URL.createObjectURL(file));
    }
  };

  // Enviar el formulario al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple de contraseñas
    if (formData.password !== formData.confirmarPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/usuarios", {
        dni: formData.dni,
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        correo: formData.correo,
        celular: formData.celular,
        password: formData.password,
        rol: formData.rol
      });

      console.log("Usuario creado:", response.data);
      alert("✅ Usuario creado con éxito");

      // Resetear formulario
      setFormData({
        dni: '',
        nombres: '',
        apellidos: '',
        rol: 'Usuario',
        correo: '',
        celular: '',
        password: '',
        confirmarPassword: ''
      });
      setImagen(null);

    } catch (error) {
      console.error("Error al crear usuario:", error);
      alert("❌ Error al registrar el usuario");
    }
  };

  return (
    <div className="crear-usuario">
      <SidebarAdm />
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
