import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { consultarRENIEC } from '../services/reniecService';
import '../components/sesion.css';

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

  const [errors, setErrors] = useState({
    dni: '',
    nombres: '',
    apellidos: '',
    correo: '',
    celular: '',
    contrasenia: '',
    confirmarContrasenia: ''
  });

  const [isDNIValidated, setIsDNIValidated] = useState(false);
  const [isConsulting, setIsConsulting] = useState(false);
  //const [apiStatus, setApiStatus] = useState('Verificando API...');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // si cambia el DNI, resetear la validación
    if (name === 'dni') {
      setIsDNIValidated(false);
      setFormData(prev => ({
        ...prev,
        nombres: '',
        apellidos: ''
      }));
    }
  };

  const handleConsultarDNI = async () => {
    // validación básica del DNI
    if (!formData.dni || formData.dni.length !== 8) {
      setErrors(prev => ({
        ...prev,
        dni: 'El DNI debe tener 8 dígitos'
      }));
      return;
    }

    if (!/^\d+$/.test(formData.dni)) {
      setErrors(prev => ({
        ...prev,
        dni: 'El DNI debe contener solo números'
      }));
      return;
    }

    setIsConsulting(true);
    setErrors(prev => ({ ...prev, dni: '' }));

    try {
      console.log('Iniciando consulta a Decolecta para DNI:', formData.dni);
      const userData = await consultarRENIEC(formData.dni);
      
      console.log('Datos recibidos:', userData);
      
      setFormData(prev => ({
        ...prev,
        nombres: userData.nombres,
        apellidos: userData.apellidos
      }));
      
      setIsDNIValidated(true);
      setErrors(prev => ({ ...prev, dni: '' }));
      
      console.log('DNI validado exitosamente!');
      
    } catch (error) {
      console.error('Error en consulta:', error);
      setErrors(prev => ({
        ...prev,
        dni: error.message
      }));
      setIsDNIValidated(false);
    } finally {
      setIsConsulting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // validar que las contraseñas coincidan
    if (formData.contrasenia !== formData.confirmarContrasenia) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // validar que el DNI esté verificado
    if (!isDNIValidated) {
      alert('Por favor, valide su DNI primero');
      return;
    }

    // Lógica de registro
    console.log('Enviando datos de registro:', {
      ...formData,
      contrasenia: '***',
      confirmarContrasenia: '***'
    });

    alert('Registro exitoso!');
    navigate('/login');
  };

  const handleCancelar = () => {
    setFormData({
      dni: '',
      nombres: '',
      apellidos: '',
      correo: '',
      celular: '',
      contrasenia: '',
      confirmarContrasenia: ''
    });
    setErrors({});
    setIsDNIValidated(false);
    navigate('/');
  };

  return (
    <div className="login-page">
      {/* Panel izquierdo */}
      <div className="login-sidebar">
        <img src="/logo.png"  alt="Logo"  style={{width: '70%', cursor: 'pointer', transition: 'transform 0.2s ease'}} onClick={() => navigate('/')} 
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'}/>
        {/* Estado de la API */}
        {/* <div style={{position: 'absolute', bottom: '20px', left: '20px', right: '20px', color: 'white', fontSize: '12px', background: 'rgba(0,0,0,0.7)',
          padding: '8px', borderRadius: '5px', textAlign: 'center' }}>
          {apiStatus}
        </div> */}
      </div>

      {/* Contenedor del formulario */}
      <div className="login-container">
        <div className="login-form-container">
          <div className="login-header">
            <h1>Crea tu cuenta</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            {/* Campo DNI */}
            <div className="form-group">
              <label htmlFor="dni">Nº de DNI:</label>
              <div className="dni-container">
                <input type="text" id="dni" name="dni" value={formData.dni} onChange={handleChange} placeholder="Ingrese su DNI (8 dígitos)"
                  className={`form-control ${errors.dni ? 'error' : ''} ${isDNIValidated ? 'valid' : ''}`} maxLength="8" required disabled={isDNIValidated}/>
                <button type="button" className={`consultar-btn ${isDNIValidated ? 'validated' : ''}`} onClick={handleConsultarDNI} disabled={isConsulting || isDNIValidated}>
                  {isConsulting ? 'Consultando...' : isDNIValidated ? 'Validado' : 'Consultar'}
                </button>
              </div>
              {errors.dni && <div className="error-message">{errors.dni}</div>}
              {isDNIValidated && (<div style={{ color: 'green', fontSize: '12px', marginTop: '5px' }}> DNI verificado correctamente </div> )}
            </div>

            {/* Campo Nombres */}
            <div className="form-group">
              <label htmlFor="nombres">Nombres:</label>
              <input type="text" id="nombres" name="nombres" value={formData.nombres} onChange={handleChange} placeholder={isDNIValidated ? "" : "Se completará automáticamente"}
                className={`form-control ${errors.nombres ? 'error' : ''}`} required readOnly={isDNIValidated}/>
              {errors.nombres && <div className="error-message">{errors.nombres}</div>}
            </div>

            {/* Campo Apellidos */}
            <div className="form-group">
              <label htmlFor="apellidos">Apellidos:</label>
              <input type="text" id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} placeholder={isDNIValidated ? "" : "Se completará automáticamente"}
                className={`form-control ${errors.apellidos ? 'error' : ''}`} required readOnly={isDNIValidated}/>
              {errors.apellidos && <div className="error-message">{errors.apellidos}</div>}
            </div>

            {/* Campo Correo */}
            <div className="form-group">
              <label htmlFor="correo">Correo:</label>
              <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} placeholder="ejemplo@correo.com"
                className={`form-control ${errors.correo ? 'error' : ''}`} required />
              {errors.correo && <div className="error-message">{errors.correo}</div>}
            </div>

            {/* Campo Celular */}
            <div className="form-group">
              <label htmlFor="celular">Número de celular:</label>
              <input type="tel" id="celular" name="celular" value={formData.celular} onChange={handleChange} placeholder="912345678"
                className={`form-control ${errors.celular ? 'error' : ''}`} maxLength="9" required />
              {errors.celular && <div className="error-message">{errors.celular}</div>}
            </div>

            {/* Campo Contraseña */}
            <div className="form-group">
              <label htmlFor="contrasenia">Contraseña:</label>
              <input type="password" id="contrasenia" name="contrasenia" value={formData.contrasenia} onChange={handleChange} placeholder="Mínimo 6 caracteres"
                className={`form-control ${errors.contrasenia ? 'error' : ''}`} required />
              {errors.contrasenia && <div className="error-message">{errors.contrasenia}</div>}
            </div>

            {/* Campo Confirmar Contraseña */}
            <div className="form-group">
              <label htmlFor="confirmarContrasenia">Confirmar contraseña:</label>
              <input type="password" id="confirmarContrasenia" name="confirmarContrasenia" value={formData.confirmarContrasenia} onChange={handleChange}
                placeholder="Repita su contraseña" className={`form-control ${errors.confirmarContrasenia ? 'error' : ''}`} required />
              {errors.confirmarContrasenia && <div className="error-message">{errors.confirmarContrasenia}</div>}
            </div>

            {/* Botones */}
            <div className="btn-container">
              <button type="submit" className="btn btn-login" disabled={!isDNIValidated}>
                Registrarse
              </button>
              <button type="button" className="btn btn-cancel" onClick={handleCancelar}>
                Cancelar
              </button>
            </div>
          </form>

          {/* Enlace para login */}
          <div className="register-link">
            <p>¿Ya tienes una cuenta? <Link to="/login">Inicie sesión</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;