import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAutentificacion } from "../context/AutentificacionContext";
import '../components/sesion.css';

const Login = () => {
    const { login } = useAutentificacion();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // validación
    const validateForm = () => {
        const newErrors = {};

        // Validación robusta de username (correo o DNI)
        if (!formData.username.trim()) {
            newErrors.username = 'Por favor ingresa un correo o DNI';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const dniRegex = /^\d{8}$/; // DNI peruano de 8 dígitos
            
            const isEmail = emailRegex.test(formData.username);
            const isDNI = dniRegex.test(formData.username);
            
            if (!isEmail && !isDNI) {
                newErrors.username = 'Ingresa un correo válido o DNI de 8 dígitos';
            }
        }

        // Validación de contraseña
        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setErrors({}); // limpiar errores previos

        try {
            const usuario = await login(formData);
            
            if (usuario.rol === "admin") {
            navigate("/admin/dashboard");
            } else if (usuario.rol === "institucion") {
            navigate("/institucion/home");
            } else {
            navigate("/ciudadano/home");
            }
        } catch (error) {
            console.error('Error en login:', error);
            setErrors({
                submit: error.response?.data?.message || 'Error al iniciar sesión. Por favor intenta nuevamente.'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="login-page">
            {/* Panel izquierdo con logo */}
            <div className="login-sidebar">
                <img src="/logo.png" alt="Logo" style={{width: '70%', cursor: 'pointer', transition: 'transform 0.2s ease'}}
                    onClick={() => navigate('/')} onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />
            </div>

            {/* Formulario de login */}
            <div className="login-container">
                <div className="login-form-container">
                    <div className="login-header">
                        <h1>Bienvenido</h1>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="username">Correo o DNI:</label>
                            <input type="text" id="username" name="username" className={`form-control ${errors.username ? 'error' : ''}`}
                                placeholder="Ingresa tu correo o DNI" value={formData.username} onChange={handleChange}
                                disabled={loading}
                            />
                            {errors.username && (<div className="error-message">{errors.username}</div>)}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Contraseña:</label>
                            <input type="password" id="password" name="password" className={`form-control ${errors.password ? 'error' : ''}`}
                                placeholder="Ingresa tu contraseña" value={formData.password} onChange={handleChange}
                                disabled={loading}
                            />
                            {errors.password && (<div className="error-message">{errors.password}</div>)}
                        </div>

                        {errors.submit && (<div className="error-message submit-error">{errors.submit}</div>)}
                        
                        <div className="btn-container">
                        <button type="submit" className="btn btn-login"  disabled={loading}>
                            {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
                        </button>
                        <button type="button" className="btn btn-cancel" onClick={handleCancel} disabled={loading}>
                            Cancelar
                        </button>
                        </div>
                    </form>
                    
                    <div className="register-link">
                        ¿No tienes una cuenta aún? <Link to="/registro">Registrese</Link>
                    </div>

                    <div className="forgot-password-link">
                        <Link to="/recuperar-contrasena">¿Olvidaste tu contraseña?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;