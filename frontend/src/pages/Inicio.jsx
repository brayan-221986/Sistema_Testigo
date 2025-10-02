import React from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => {
    const token = localStorage.getItem('token');
    
    return (
        <div style={{ padding: '20px' }}>
            <h1>Página de Inicio</h1>
            {token ? (
                <div>
                    <p>¡Bienvenido! Has iniciado sesión correctamente.</p>
                    <button 
                        onClick={() => {
                            localStorage.removeItem('token');
                            window.location.reload();
                        }}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#e74c3c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            ) : (
                <p>Por favor <Link to="/login">inicia sesión</Link> para acceder al contenido.</p>
            )}
        </div>
    );
};

export default Inicio;