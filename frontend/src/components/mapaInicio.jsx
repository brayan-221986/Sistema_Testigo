import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { obtenerReportesTrafico } from "../services/osmService";
import "../style/modalReporte.css";

// Ícono de los reportes
const iconoTrafico = L.icon({
  iconUrl: "/marcador.png",
  iconSize: [40, 40],
  iconAnchor: [16, 32],
});

// Ícono del usuario
const iconoUsuario = L.icon({
  iconUrl: "/usuario.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

// Componente auxiliar para centrar el mapa dinámicamente
function CentrarEnUsuario({ posicion }) {
  const map = useMap();
  useEffect(() => {
    if (posicion) map.setView(posicion, 15);
  }, [posicion, map]);
  return null;
}

export default function MapaInicio() {
  const [reportes, setReportes] = useState([]);
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);
  const [posicionUsuario, setPosicionUsuario] = useState(null);
  const [descripcionExpandida, setDescripcionExpandida] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerReportesTrafico().then(setReportes);

    // Obtener ubicación del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosicionUsuario([pos.coords.latitude, pos.coords.longitude]);
          setCargando(false);
        },
        (err) => {
          console.warn("No se pudo obtener ubicación:", err.message);
          setPosicionUsuario([-13.517088, -71.978535]); // Cusco
          setCargando(false);
        }
      );
    } else {
      setPosicionUsuario([-13.517088, -71.978535]);
      setCargando(false);
    }
  }, []);

  const cerrarModal = () => {
    setReporteSeleccionado(null);
    setDescripcionExpandida(false);
  };

  if (cargando) {
    return (
      <div className="cargando">
        <div className="loader"></div>
        <p>Obteniendo tu ubicación...</p>
      </div>
    );
  }

  return (
    <div className="contenedor-mapa">
      <MapContainer
        center={posicionUsuario || [-13.517088, -71.978535]}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <CentrarEnUsuario posicion={posicionUsuario} />

        {/* Marcador del usuario */}
        {posicionUsuario && (
          <Marker position={posicionUsuario} icon={iconoUsuario}>
            <Popup>Tu ubicación actual</Popup>
          </Marker>
        )}

        {/* Marcadores de reportes */}
        {reportes.map((r) => (
          <Marker
            key={r.id}
            position={[r.lat, r.lng]}
            icon={iconoTrafico}
            eventHandlers={{
              click: () => setReporteSeleccionado(r),
            }}
          >
            <Popup>{r.titulo}</Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Modal del reporte */}
      {reporteSeleccionado && (
        <div className="fondo-modal" onClick={cerrarModal}>
          <div
            className="modal-reporte"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="cerrar-modal" onClick={cerrarModal}>
              ×
            </button>

            <h2 className="titulo-reporte">{reporteSeleccionado.titulo}</h2>

            {reporteSeleccionado.imagen ? (
              <img
                src={reporteSeleccionado.imagen}
                alt="Foto del reporte"
                className="imagen-reporte"
              />
            ) : (
              <div className="sin-imagen">Sin imagen disponible</div>
            )}

            <p>
              <strong>Fecha y hora:</strong>{" "}
              {reporteSeleccionado.fechaHora || "No disponible"}
            </p>

            <p className="descripcion-reporte">
              <strong>Descripción:</strong>{" "}
              {descripcionExpandida
                ? reporteSeleccionado.descripcion
                : reporteSeleccionado.descripcion.slice(0, 100) + "..."}
              {reporteSeleccionado.descripcion.length > 100 && (
                <span
                  onClick={() =>
                    setDescripcionExpandida(!descripcionExpandida)
                  }
                  className="ver-mas"
                >
                  {descripcionExpandida ? " Ver menos" : " Ver más"}
                </span>
              )}
            </p>

          </div>
        </div>
      )}
    </div>
  );
}
