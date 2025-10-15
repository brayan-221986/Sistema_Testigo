import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAutentificacion } from "../context/AutentificacionContext"; 
import PlantillaCiudadano from "../components/PlantillaCiudadano";
import PlantillaAutoridad from "../components/PlantillaAutoridad";
import "../style/DetalleReporte.css";
import "../style/reportesCarousel.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Función mock para obtener datos del reporte por id
const obtenerReporteMock = (id) => {
  const ejemplo = {
    id,
    numero: `REP-2025-${String(id).padStart(4, "0")}`,
    estado: id % 3 === 0 ? "Resuelto" : id % 3 === 1 ? "Enviado" : "En proceso",
    categoria: "Vías y movilidad",
    fechaCreacion: "10/09/2025",
    titulo: `Bache peligroso #${id}`,
    descripcion:
      "En la Av. Los Olivos, frente al colegio San Martín, hay un bache de aproximadamente 40 cm de profundidad. Está generando accidentes a ciclistas y mototaxis.",
    ubicacionTexto: "Av. Perú 345, San Sebastian",
    coordenadas: { lat: -13.517088 + id * 0.0001, lng: -71.978535 + id * 0.0001 },
    evidenciasCiudadano: ["/auto.jpg", "/baches.jpg", "/auto.jpg"],
    institucion: id % 2 === 0 ? {
      nombre: "Municipalidad de San Sebastian",
      contacto: "mesa.ayuda@munisansebastian.gob.pe / +51 84 123456",
      evidenciasResolucion: ["/Municipalidad-San-Sebastian.png"]
    } : null,
    ciudadanoId: 42
  };
  return ejemplo;
};

export default function DetalleReporte() {
  const { id } = useParams();
  const { usuario } = useAutentificacion(); // 👈 para saber si es autoridad o ciudadano
  const [reporte, setReporte] = useState(null);
  const [indexImagen, setIndexImagen] = useState(0);

  useEffect(() => {
    const datos = obtenerReporteMock(Number(id));
    setReporte(datos);
  }, [id]);

  if (!reporte) return null;

  // Seleccionar layout dinámico según rol
  const Layout =
    usuario?.rol === "autoridad" ? PlantillaAutoridad : PlantillaCiudadano;

  // Mostrar siempre la información de la institución; usar valores por defecto si no hay asignación
  const institucion = reporte.institucion || {
    nombre: "Pendiente de asignación",
    contacto: "Sin información de contacto",
    evidenciasResolucion: []
  };

  // El botón "Cancelar" es simulación por ahora
  const cancelarReporte = () => {
    const ok = window.confirm("¿Confirma que desea cancelar este reporte?");
    if (!ok) return;
    setReporte((prev) => ({ ...prev, estado: "Cancelado" }));
    alert("Reporte cancelado (simulado).");
  };

  const prevImagen = () => {
    setIndexImagen((i) => (i - 1 + reporte.evidenciasCiudadano.length) % reporte.evidenciasCiudadano.length);
  };
  const nextImagen = () => {
    setIndexImagen((i) => (i + 1) % reporte.evidenciasCiudadano.length);
  };

  return (
    <Layout tituloHeader="Detalle Reporte">
      <div className="detalle-container">
        <h1 className="detalle-titulo">DETALLES DEL REPORTE</h1>

        <div className="datos-generales">
          <div className="campo">
            <label>Número de Reporte:</label>
            <input readOnly value={reporte.numero} />
          </div>
          <div className="campo">
            <label>Estado Actual:</label>
            <input readOnly value={reporte.estado} />
          </div>
          <div className="campo">
            <label>Categoría:</label>
            <input readOnly value={reporte.categoria} />
          </div>
          <div className="campo">
            <label>Fecha de Creación:</label>
            <input readOnly value={reporte.fechaCreacion} />
          </div>
        </div>

        <div className="separador-con-circulo visible" aria-hidden>
          <span className="linea"></span>
          <span className="circulo"></span>
          <span className="linea"></span>
        </div>

        <div className="problema-ubicacion">
          <div className="campo-ancho">
            <label>Título del problema:</label>
            <input readOnly value={reporte.titulo} />
          </div>

          <div className="campo-ancho">
            <label>Descripción:</label>
            <textarea readOnly value={reporte.descripcion} />
          </div>

          <div className="campo-ancho">
            <label>Ubicación:</label>
            <input readOnly value={reporte.ubicacionTexto} />
          </div>

          <div className="mapa-detalle">
            <MapContainer center={[reporte.coordenadas.lat, reporte.coordenadas.lng]} zoom={15} style={{ height: "280px", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
              <Marker position={[reporte.coordenadas.lat, reporte.coordenadas.lng]} />
            </MapContainer>
          </div>
        </div>

        <div className="evidencias-galeria">
          <h3>Evidencias:</h3>
          <div className="galeria">
            <button className="flecha left" onClick={prevImagen} aria-label="Anterior">‹</button>
            <div className="fila-thumbs">
              {(() => {
                const imgs = reporte.evidenciasCiudadano;
                const len = imgs.length;
                const prev = (indexImagen - 1 + len) % len;
                const next = (indexImagen + 1) % len;
                return (
                  <>
                    <img className="thumb left" src={imgs[prev]} alt={`prev ${prev + 1}`} onClick={() => setIndexImagen(prev)} />
                    <img className="thumb center" src={imgs[indexImagen]} alt={`center ${indexImagen + 1}`} />
                    <img className="thumb right" src={imgs[next]} alt={`next ${next + 1}`} onClick={() => setIndexImagen(next)} />
                  </>
                );
              })()}
            </div>
            <button className="flecha right" onClick={nextImagen} aria-label="Siguiente">›</button>
          </div>
        </div>

        <div className="separador-con-circulo visible" aria-hidden>
          <span className="linea"></span>
          <span className="circulo"></span>
          <span className="linea"></span>
        </div>

        <div className="institucion-asignada">
          <h3>Información de la Institución Asignada</h3>
          <div className="institucion-card">
            <div className="institucion-imagen">
              <img src={institucion.evidenciasResolucion?.[0] || "/Municipalidad-San-Sebastian.png"} alt="institucion" />
            </div>
            <div className="institucion-detalles">
              <div className="detalle-linea columna">
                <label className="etiqueta-superior">Nombre: </label>
                <input className="input-institucion" readOnly value={institucion.nombre} />
              </div>
              <div className="detalle-linea columna">
                <label className="etiqueta-superior">Contacto: </label>
                <input className="input-institucion" readOnly value={institucion.contacto} />
              </div>
            </div>
          </div>
        </div>

        {/* Solo mostrar el botón si el rol es ciudadano */}
        {usuario?.rol === "ciudadano" && (
          <div className="acciones-pie">
            <button className="btn-cancelar" onClick={cancelarReporte}>Cancelar Reporte</button>
          </div>
        )}
      </div>
    </Layout>
  );
}
