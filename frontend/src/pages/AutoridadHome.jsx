// AutoridadHome.jsx
import /*React,*/ { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { MapPin, Building2, CalendarDays, Eye } from "lucide-react";
//import { useAutentificacion } from "../context/AutentificacionContext";
import PlantillaAutoridad from "../components/PlantillaAutoridad";

const AutoridadHome = () => {
  //const navigate = useNavigate();
  //const { usuario, logout } = useAutentificacion();

  //  Estado para el texto de búsqueda
  const [busqueda, setBusqueda] = useState("");

  //  Reportes de ejemplo (pueden venir luego del backend)
  const reportes = [
    {
      id: 1,
      titulo: "Problema Urbano 1",
      direccion: "Jr. Manco Capac 123",
      entidad: "Sin Asignar",
      fecha: "Set 07, 2025",
      estado: "Enviado",
      imagen: "/baches.jpg",
    },
    {
      id: 2,
      titulo: "Problema Urbano 2",
      direccion: "APV Pillao Matao",
      entidad: "Sin Asignar",
      fecha: "Set 05, 2025",
      estado: "Enviado",
      imagen: "/baches.jpg",
    },
    {
      id: 3,
      titulo: "Problema Urbano 3",
      direccion: "Calle Mollecito 21",
      entidad: "Municipalidad de San Sebastian",
      fecha: "Jul 27, 2025",
      estado: "Enviado",
      imagen: "/baches.jpg",
    },
  ];

  // Filtrado dinámico según texto ingresado
  const reportesFiltrados = reportes.filter((r) => {
    const texto = busqueda.toLowerCase();
    return (
      r.titulo.toLowerCase().includes(texto) ||
      r.direccion.toLowerCase().includes(texto) ||
      r.entidad.toLowerCase().includes(texto)
    );
  });

  const getEstadoClase = (estado) => {
    switch (estado) {
      case "Enviado":
        return "estado enviado";
      case "En Revisión":
        return "estado revision";
      case "Resuelto":
        return "estado resuelto";
      default:
        return "estado";
    }
  };

  return (
    <PlantillaAutoridad tituloHeader="Inicio">
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

      {/* Lista de reportes (filtrados) */}
      <div className="mis-reportes">
        {reportesFiltrados.length > 0 ? (
          reportesFiltrados.map((r) => (
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
                <button className="btn-detalle">
                  <Eye size={16} /> Ver Detalles
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="sin-resultados">No se encontraron reportes.</p>
        )}
      </div>
    </PlantillaAutoridad>
  );
};

export default AutoridadHome;
