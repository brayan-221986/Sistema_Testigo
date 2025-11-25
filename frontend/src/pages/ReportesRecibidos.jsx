import { useState } from "react";
import { MapPin, Building2, CalendarDays, Eye } from "lucide-react";
import PlantillaAutoridad from "../components/PlantillaAutoridad";
import ModalDetallesAutoridad from "../components/ModalDetallesAutoridad";
import "../style/ReportesRecibidos.css";


const ReportesRecibidos = () => {
  // ---------------------------
  // ESTADO DE BÚSQUEDA
  // ---------------------------
  const [busqueda, setBusqueda] = useState("");

  // ---------------------------
  // ESTADO DEL MODAL
  // ---------------------------
  const [modalAbierto, setModalAbierto] = useState(false);
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);

  // ---------------------------
  // REPORTES
  // ---------------------------
  const reportes = [
    {
      id: 1,
      titulo: "Problema Urbano 4",
      direccion: "Jr. Manco Capac 123",
      entidad: "Sin Asignar",
      fecha: "Set 07, 2025",
      estado: "Nuevo",
      imagen: "/baches.jpg",
      evidencias: ["/baches.jpg", "/auto.jpg"],
    },
    {
      id: 2,
      titulo: "Problema Urbano 5",
      direccion: "APV Pillao Matao",
      entidad: "Sin Asignar",
      fecha: "Set 05, 2025",
      estado: "Nuevo",
      imagen: "/baches.jpg",
      evidencias: ["/baches.jpg", "/auto.jpg"],
    },
    {
      id: 3,
      titulo: "Problema Urbano 6",
      direccion: "Calle Mollecito 21",
      entidad: "Municipalidad de San Sebastian",
      fecha: "Jul 27, 2025",
      estado: "Nuevo",
      imagen: "/baches.jpg",
      evidencias: ["/baches.jpg", "/auto.jpg"],
    },
  ];

  // ---------------------------
  // FILTRO DINÁMICO
  // ---------------------------
  const reportesFiltrados = reportes.filter((r) => {
    const texto = busqueda.toLowerCase();
    return (
      r.titulo.toLowerCase().includes(texto) ||
      r.direccion.toLowerCase().includes(texto) ||
      r.entidad.toLowerCase().includes(texto)
    );
  });

  // ---------------------------
  // COLORES POR ESTADO
  // ---------------------------
  const getEstadoClase = (estado) => {
    switch (estado) {
      case "Nuevo":
        return "estado nuevo";
      default:
        return "estado";
    }
  };

  // ---------------------------
  // FUNCIÓN ABRIR MODAL
  // ---------------------------
  const handleVerDetalles = (reporte) => {
    setReporteSeleccionado(reporte);
    setModalAbierto(true);
  };

  return (
    <PlantillaAutoridad tituloHeader="Reportes recibidos">
      {/* Barra superior con búsqueda */}
      <div className="acciones-barra">
        <input
          type="text"
          placeholder="Buscar por título, dirección o entidad..."
          className="buscador"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Lista de reportes */}
      <div className="mis-reportes">
        {reportesFiltrados.map((r) => (
          <div key={r.id} className="reporte-card">
            <div className="reporte-img">
              <img src={r.imagen} alt={r.titulo} />
            </div>

            <div className="reporte-info">
              <h3>{r.titulo}</h3>
              <p className="info-line">
                <MapPin size={16} /> {r.direccion}
              </p>
              <p className="info-line">
                <Building2 size={16} /> {r.entidad}
              </p>
            </div>

            <div className="reporte-meta">
              <p className="info-line fecha">
                <CalendarDays size={16} /> {r.fecha}
              </p>
              <span className={getEstadoClase(r.estado)}>{r.estado}</span>

              {/* BOTÓN QUE AHORA ABRE EL MODAL */}
              <button
                className="btn-detalle"
                onClick={() => handleVerDetalles(r)}
              >
                <Eye size={16} /> Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <ModalDetallesAutoridad
        open={modalAbierto}
        onClose={() => setModalAbierto(false)}
        reporte={reporteSeleccionado}
      />
    </PlantillaAutoridad>
  );
};

export default ReportesRecibidos;