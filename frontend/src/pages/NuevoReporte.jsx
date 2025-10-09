import React, { useState, useEffect } from 'react';
import LayoutPrincipal from "../components/PlantillaCiudadano";
import '../style/NuevoReporte.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { MapPin } from 'lucide-react';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Componente para manejar clicks y colocar marcador
function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

const NuevoReporte = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    latitud: '',
    longitud: '',
    direccion: '',
    distrito: '',
    estado_id:'',
    ciudadano_id:'',
    categoria: '',
    archivo: null,
  });

  // Estado para la posición en el mapa
  const [position, setPosition] = useState(null);

  // Actualiza latitud y longitud en formData cuando cambia la posición
  useEffect(() => {
    if (position) {
      setFormData(prev => ({
        ...prev,
        latitud: position.lat,
        longitud: position.lng,
      }));
    }
  }, [position]);

  // Manejo de inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Enviar formulario (aquí pondrías la llamada a la API)
  const handleEnviar = () => {
    console.log("Formulario enviado:", formData);
  };

  // Cancelar formulario
  const handleCancelar = () => {
    console.log("Formulario cancelado");
  };

  // Obtener ubicación real con geolocalización y poner marcador
  const obtenerUbicacionReal = () => {
    if (!navigator.geolocation) {
      alert("Geolocalización no soportada por tu navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (error) => {
        alert("Error al obtener ubicación: " + error.message);
      }
    );
  };

  return (
    <LayoutPrincipal tituloHeader="Nuevo Reporte">
      <div className="formulario-reporte">
        <h2 className="titulo-formulario">FORMULARIO REPORTE</h2>

        <label>Título del Problema:</label>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          placeholder="Ej. Bache en la calle"
        />

        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Describe el problema detalladamente"
        />

        <label>Categoría:</label>
        <select name="categoria" value={formData.categoria} onChange={handleChange}>
          <option value="">Seleccione una categoría</option>
          <option value="Agua">Agua</option>
          <option value="Alumbrado">Alumbrado</option>
          <option value="Basura">Basura</option>
          <option value="Transporte">Transporte</option>
        </select>

        <label>Ubicación:</label>
        <div className="mapa" style={{ height: "300px", width: "100%" }}>
          <MapContainer 
            center={position || [-13.517088, -71.978535]} 
            zoom={14} 
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker position={position} setPosition={setPosition} />
          </MapContainer>
        </div>

        <button className="btn-ubicacion" onClick={obtenerUbicacionReal} style={{ marginTop: '10px' }}>
          <MapPin size={20} style={{ marginRight: '8px' }} />
          Ubicación Real
        </button>

        <div className="fila-direccion">
          <div>
            <label>Distrito:</label>
            <input
              type="text"
              name="distrito"
              value={formData.distrito}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Dirección:</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
            />
          </div>
        </div>

        <label>Adjuntar Archivos:</label>
        <div className="adjuntar-archivos">
          <input
            type="file"
            name="archivo"
            onChange={handleChange}
          />
        </div>

        <div className="botones-formulario">
          <button className="btn-cancelar" onClick={handleCancelar}>Cancelar</button>
          <button className="btn-enviar" onClick={handleEnviar}>Enviar</button>
        </div>
      </div>
    </LayoutPrincipal>
  );
};

export default NuevoReporte;
