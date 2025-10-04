// inicio.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => {
    
    return (
        <div style={{ padding: '20px' }}>
            <h1>Página de Inicio</h1>
            <p>Por favor <Link to="/login">inicia sesión</Link> para acceder al contenido.</p>
        </div>
    );
};

export default Inicio;
