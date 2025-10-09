// Registro.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { consultarRENIEC } from '../services/reniecService';
import { register } from '../services/api';
import '../style/sesion.css';

const Registro = () => {
  const [formData, setFormData] = useState({
    dni: '',
    nombres: '',
    apellidos: '',
    correo: '',
    celular: '',
    contrasenia: '',
    confirmarContrasenia: ''
  });

  const [errors, setErrors] = useState({});
  const [isDNIValidated, setIsDNIValidated] = useState(false);
  const [isConsulting, setIsConsulting] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Maneja cambios en campos y limpia errores
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));

    if (name === 'dni') {
      setIsDNIValidated(false);
      setFormData(prev => ({ ...prev, nombres: '', apellidos: '' }));
    }
  };

  // Consulta RENIEC
  const handleConsultarDNI = async () => {
    if (!formData.dni || formData.dni.length !== 8 || !/^\d+$/.test(formData.dni)) {
      setErrors(prev => ({ ...prev, dni: 'DNI inválido. Debe tener 8 números.' }));
      return;
    }

    setIsConsulting(true);
    setErrors(prev => ({ ...prev, dni: '' }));

    try {
      const userData = await consultarRENIEC(formData.dni);
      setFormData(prev => ({ ...prev, nombres: userData.nombres, apellidos: userData.apellidos }));
      setIsDNIValidated(true);
    } catch (error) {
      setErrors(prev => ({ ...prev, dni: error.message }));
      setIsDNIValidated(false);
    } finally {
      setIsConsulting(false);
    }
  };

  // Validación del formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.correo) newErrors.correo = 'El correo es requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) newErrors.correo = 'Correo inválido';

    if (!formData.celular) newErrors.celular = 'El número de celular es requerido';
    else if (!/^\d{9}$/.test(formData.celular)) newErrors.celular = 'Número de celular debe tener 9 dígitos';

    if (!formData.contrasenia) newErrors.contrasenia = 'La contraseña es requerida';
    else if (formData.contrasenia.length < 6) newErrors.contrasenia = 'La contraseña debe tener al menos 6 caracteres';

    if (formData.contrasenia !== formData.confirmarContrasenia) {
      newErrors.confirmarContrasenia = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Enviar registro
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isDNIValidated) {
      setErrors(prev => ({ ...prev, dni: 'Por favor, valide su DNI antes de registrarse.' }));
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    setErrors(prev => ({ ...prev, submit: '' }));

    try {
      await register(formData);
      alert('Registro exitoso! Ahora inicie sesión.');
      navigate('/login');
    } catch (error) {
      console.error('Error en registro:', error);

      const backendError = error.response?.data?.error || error.response?.data?.message || 'Ocurrió un error durante el registro.';

      if (backendError.includes('DNI')) {
        setErrors(prev => ({ ...prev, dni: backendError }));
        setIsDNIValidated(false); 
        setFormData(prev => ({ 
          ...prev, 
          dni: '',         // limpiamos el campo de DNI
          nombres: '', 
          apellidos: '' 
        }));
      } else if (backendError.includes('correo')) {
        setErrors(prev => ({ ...prev, correo: backendError }));
      } else {
        setErrors(prev => ({ ...prev, submit: backendError }));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    setFormData({
      dni: '', nombres: '', apellidos: '', correo: '', celular: '', contrasenia: '', confirmarContrasenia: ''
    });
    setErrors({});
    setIsDNIValidated(false);
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-sidebar">
        <img src="/logo.png" alt="Logo" style={{width: '70%', cursor: 'pointer', transition: 'transform 0.2s ease'}}
          onClick={() => navigate('/')} 
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'} 
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        />
      </div>

      <div className="login-container">
        <div className="login-form-container">
          <div className="login-header"><h1>Crea tu cuenta</h1></div>

          <form onSubmit={handleSubmit} className="login-form">
            {/* DNI */}
            <div className="form-group">
              <label htmlFor="dni">Nº de DNI:</label>
              <div className="dni-container">
                <input
                  type="text"
                  id="dni"
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  className={`form-control ${errors.dni ? 'error' : ''} ${isDNIValidated && !errors.dni ? 'valid' : ''}`}
                  maxLength="8"
                  required
                  disabled={isDNIValidated}
                  placeholder="Ingrese su DNI (8 dígitos)"
                />
                <button
                  type="button"
                  className={`consultar-btn ${isDNIValidated ? 'validated' : ''}`}
                  onClick={handleConsultarDNI}
                  disabled={isConsulting || isDNIValidated}
                >
                  {isConsulting ? 'Consultando...' : isDNIValidated ? 'Validado' : 'Consultar'}
                </button>
              </div>
              {/* Solo uno: error o éxito */}
              {errors.dni ? (
                <div className="error-message">{errors.dni}</div>
              ) : (
                isDNIValidated && (
                  <div style={{ color: 'green', fontSize: '12px', marginTop: '5px' }}>
                    DNI verificado correctamente
                  </div>
                )
              )}
            </div>

            {/* Nombres y Apellidos */}
            <div className="form-group">
              <label htmlFor="nombres">Nombres:</label>
              <input
                type="text"
                id="nombres"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                placeholder={isDNIValidated ? "" : "Se completará automáticamente"}
                className={`form-control ${errors.nombres ? 'error' : ''}`}
                required
                readOnly={isDNIValidated}
              />
            </div>
            <div className="form-group">
              <label htmlFor="apellidos">Apellidos:</label>
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                placeholder={isDNIValidated ? "" : "Se completará automáticamente"}
                className={`form-control ${errors.apellidos ? 'error' : ''}`}
                required
                readOnly={isDNIValidated}
              />
            </div>

            {/* Correo */}
            <div className="form-group">
              <label htmlFor="correo">Correo:</label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className={`form-control ${errors.correo ? 'error' : ''}`}
                required
                placeholder="ejemplo@correo.com"
              />
              {errors.correo && <div className="error-message">{errors.correo}</div>}
            </div>

            {/* Celular */}
            <div className="form-group">
              <label htmlFor="celular">Número de celular:</label>
              <input
                type="tel"
                id="celular"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
                className={`form-control ${errors.celular ? 'error' : ''}`}
                maxLength="9"
                required
                placeholder="912345678"
              />
              {errors.celular && <div className="error-message">{errors.celular}</div>}
            </div>

            {/* Contraseña */}
            <div className="form-group">
              <label htmlFor="contrasenia">Contraseña:</label>
              <input
                type="password"
                id="contrasenia"
                name="contrasenia"
                value={formData.contrasenia}
                onChange={handleChange}
                className={`form-control ${errors.contrasenia ? 'error' : ''}`}
                required
                placeholder="Mínimo 6 caracteres"
              />
              {errors.contrasenia && <div className="error-message">{errors.contrasenia}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="confirmarContrasenia">Confirmar contraseña:</label>
              <input
                type="password"
                id="confirmarContrasenia"
                name="confirmarContrasenia"
                value={formData.confirmarContrasenia}
                onChange={handleChange}
                className={`form-control ${errors.confirmarContrasenia ? 'error' : ''}`}
                required
                placeholder="Repita su contraseña"
              />
              {errors.confirmarContrasenia && <div className="error-message">{errors.confirmarContrasenia}</div>}
            </div>

            {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}

            {/* Botones */}
            <div className="btn-container">
              <button type="submit" className="btn btn-login" disabled={!isDNIValidated || loading}>
                {loading ? 'Registrando...' : 'Registrarse'}
              </button>
              <button type="button" className="btn btn-cancel" onClick={handleCancelar}>Cancelar</button>
            </div>
          </form>

          <div className="register-link">
            <p>¿Ya tienes una cuenta? <Link to="/login">Inicie sesión</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
