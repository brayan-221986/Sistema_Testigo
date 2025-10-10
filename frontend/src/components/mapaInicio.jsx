import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { obtenerReportesTrafico } from "../services/osmService";

// Ícono personalizado (opcional)
const iconoTrafico = L.icon({
  iconUrl: "/marcador.png", // puedes poner uno en public o src/assets
  iconSize: [40, 40],
  iconAnchor: [16, 32],
});

export default function MapaInicio() {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    obtenerReportesTrafico().then(setReportes);
  }, []);

  return (
    <div className="contenedor-mapa">
      <MapContainer
        center={[-13.517088, -71.978535]} // Cusco como centro
        zoom={15}
        scrollWheelZoom={true}
      >
        {/* Capa base de OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marcadores de tráfico */}
        {reportes.map((r) => (
          <Marker key={r.id} position={[r.lat, r.lng]} icon={iconoTrafico}>
            <Popup>
              <strong>{r.titulo}</strong>
              <br />
              {r.descripcion}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
