import React from "react";
import { MapPin, Building2, CalendarDays, Eye } from "lucide-react";
import LayoutPrincipal from "../components/PlantillaCiudadano";
import "../style/MisReportes.css";

const MisReportes = () => {
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
      estado: "En Revisión",
      imagen: "/baches.jpg",
    },
    {
      id: 4,
      titulo: "Problema Urbano 4",
      direccion: "CC El Paraiso",
      entidad: "Municipalidad de Cusco",
      fecha: "Jul 20, 2025",
      estado: "Resuelto",
      imagen: "/baches.jpg",
    },
  ];

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
    <LayoutPrincipal tituloHeader="Mis Reportes">
      <div className="mis-reportes">
        {reportes.map((r) => (
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
        ))}
      </div>
    </LayoutPrincipal>
  );
};

export default MisReportes;
