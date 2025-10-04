import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import LayoutPrincipal from "../components/PlantillaCiudadano";
import '../components/CiudadanoHome.css';

const CiudadanoHome = () => {
  const navigate = useNavigate();
  const [aceptado, setAceptado] = useState(false); // Controla si el usuario aceptó los términos

  // Alterna el estado del checkbox
  const manejarCheckbox = () => {
    setAceptado(!aceptado);
  };

  // Navega a la página de descripción del reporte si el usuario aceptó los términos
  const manejarSiguiente = () => {
    if (aceptado) {
      navigate('/descripcion-reporte');
    }
  };

  // Cancela la acción y vuelve al dashboard
  const manejarCancelar = () => {
    navigate('/dashboard');
  };

  return (
    <LayoutPrincipal tituloHeader="Nuevo Reporte">
      <div className="terminos-legales">
        <h3>TÉRMINOS LEGALES</h3>

        {/* Contenedor con los términos y condiciones */}
        <div className="terminos-contenedor">
          <div className="terminos-texto">
            <h4>1. Introducción</h4>
            <p>Bienvenido a TestiGO, la plataforma digital destinada a la gestión de denuncias ciudadanas sobre problemas urbanos. Al acceder y utilizar nuestros servicios, usted acepta cumplir con los siguientes términos y condiciones.</p>
            
            <h4>2. Información Personal</h4>
            <p>De acuerdo con la Ley N° 29733, Ley de Protección de Datos Personales, sus datos personales serán tratados con la finalidad de gestionar su cuenta y las denuncias presentadas. Usted tiene derecho a acceder, rectificar y cancelar sus datos personales en cualquier momento.</p>
            
            <h4>3. Uso de la Plataforma</h4>
            <p>Se compromete a utilizar la plataforma de manera responsable y conforme a la ley. Queda prohibido el uso de la plataforma para fines ilícitos o que puedan dañar la imagen de TestiGO.</p>
            
            <h4>4. Propiedad Intelectual</h4>
            <p>Todo el contenido disponible en la plataforma, incluyendo textos, imágenes y logotipos, es propiedad de TestiGO o de sus respectivos propietarios y está protegido por las leyes de propiedad intelectual.</p>
            
            <h4>5. Responsabilidad</h4>
            <p>TestiGO no se hace responsable por daños directos o indirectos derivados del uso de la plataforma, incluyendo la precisión de la información proporcionada por los usuarios.</p>
            
            <h4>6. Modificaciones</h4>
            <p>Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones serán publicadas en esta sección y entrarán en vigor inmediatamente.</p>
            
            <h4>7. Aceptación</h4>
            <p>Al marcar la casilla "He leído y acepto los términos y condiciones", usted otorga su consentimiento expreso para el tratamiento de sus datos personales y acepta cumplir con las disposiciones aquí establecidas.</p>
          </div>
        </div>

        {/* Checkbox de aceptación */}
        <div className="aceptacion">
          <input
            type="checkbox"
            id="acepto"
            checked={aceptado}
            onChange={manejarCheckbox} // Cambia estado de aceptación
          />
          <label htmlFor="acepto">He leído y acepto los términos.</label>
        </div>

        {/* Botones de navegación */}
        <div className="botones">
          <button className="cancelar" onClick={manejarCancelar}>
            Cancelar
          </button>
          <button
            className="siguiente"
            onClick={manejarSiguiente}
            disabled={!aceptado} // Solo se puede avanzar si se aceptan los términos
          >
            Siguiente
          </button>
        </div>
      </div>
    </LayoutPrincipal>
  );
};

export default CiudadanoHome;
