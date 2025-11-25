import { useState } from "react";
import { MapPin, User, CalendarDays, Eye, Bell, Clock, CheckCircle } from "lucide-react";
import PlantillaAdmin from "../components/PlantillaAdmin";
import ModalDetallesAutoridad from "../components/ModalDetallesAutoridad";
import "../style/ReportesTotales.css";

const ReportesTotales = () => {
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  
  // Estado del modal
  const [modalAbierto, setModalAbierto] = useState(false);
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);

  // Mock de reportes (simulación frontend)
  const reportes = [
    {
      id: 1,
      titulo: "Bache grande en la calle",
      direccion: "Calle del medio 246",
      ubicacion: "Calle del medio 246",
      fecha: "Jun 24, 2025",
      ciudadano: "Juan Gonzáles",
      estado: "Recibido",
      imagen: "/baches.jpg",
      evidencias: ["/baches.jpg", "/auto.jpg"],
      entidad: "Sin Asignar",
    },
    {
      id: 2,
      titulo: "Falta de mantenimiento en parque",
      direccion: "Calle del medio 246",
      ubicacion: "Calle del medio 246",
      fecha: "Jun 24, 2025",
      ciudadano: "Juan Gonzáles",
      estado: "Pendiente",
      imagen: "/baches.jpg",
      evidencias: ["/baches.jpg", "/auto.jpg"],
      entidad: "Sin Asignar",
    },
    {
      id: 3,
      titulo: "Falla en alumbrado público",
      direccion: "Calle del medio 246",
      ubicacion: "Calle del medio 246",
      fecha: "Jun 24, 2025",
      ciudadano: "Juan Gonzáles",
      estado: "Resuelto",
      imagen: "/baches.jpg",
      evidencias: ["/baches.jpg", "/auto.jpg"],
      entidad: "Municipalidad de San Sebastian",
    },
    {
      id: 4,
      titulo: "Acumulación de basura",
      direccion: "Av. Principal 123",
      ubicacion: "Av. Principal 123",
      fecha: "Jun 20, 2025",
      ciudadano: "María López",
      estado: "Recibido",
      imagen: "/auto.jpg",
      evidencias: ["/auto.jpg", "/auto.jpg"],
      entidad: "Sin Asignar",
    },
    {
      id: 5,
      titulo: "Semáforo dañado",
      direccion: "Jr. Los Olivos 45",
      ubicacion: "Jr. Los Olivos 45",
      fecha: "Jun 18, 2025",
      ciudadano: "Carlos Ruiz",
      estado: "Pendiente",
      imagen: "/auto.jpg",
      evidencias: ["/auto.jpg", "/baches.jpg"],
      entidad: "Sin Asignar",
    },
  ];

  // Contadores para el resumen
  const recibidos = reportes.filter(r => r.estado === "Recibido").length;
  const pendientes = reportes.filter(r => r.estado === "Pendiente").length;
  const resueltos = reportes.filter(r => r.estado === "Resuelto").length;

  // Filtrado dinámico
  const reportesFiltrados = reportes.filter((r) => {
    const coincideBusqueda = busqueda.trim() === "" || 
      r.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.ubicacion.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.ciudadano.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEstado = filtroEstado === "todos" || 
      r.estado.toLowerCase() === filtroEstado.toLowerCase();

    return coincideBusqueda && coincideEstado;
  });

  // Función para abrir modal con detalles del reporte
  const handleVerDetalles = (reporte) => {
    setReporteSeleccionado(reporte);
    setModalAbierto(true);
  };

  return (
    <PlantillaAdmin tituloHeader="Reportes">
      <div className="reportes-totales-page">
        {/* Resumen superior con tarjetas */}
        <div className="resumen-cards">
          <div className="card-resumen recibidos">
            <div className="icono-resumen">
              <Bell size={32} />
            </div>
            <div className="info-resumen">
              <h3>Recibidos</h3>
              <p className="numero-resumen">{recibidos}</p>
            </div>
          </div>

          <div className="card-resumen pendientes">
            <div className="icono-resumen">
              <Clock size={32} />
            </div>
            <div className="info-resumen">
              <h3>Pendientes</h3>
              <p className="numero-resumen">{pendientes}</p>
            </div>
          </div>

          <div className="card-resumen resueltos">
            <div className="icono-resumen">
              <CheckCircle size={32} />
            </div>
            <div className="info-resumen">
              <h3>Resueltos</h3>
              <p className="numero-resumen">{resueltos}</p>
            </div>
          </div>
        </div>

        {/* Sección de búsqueda y filtros */}
        <div className="controles-busqueda">
          <div className="barra-busqueda-wrapper">
            <input
              type="search"
              placeholder="Buscar reportes..."
              className="barra-busqueda-admin"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="filtro-estado-wrapper">
            <label>Filtrar por estado:</label>
            <select
              className="filtro-estado"
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="recibido">Recibidos</option>
              <option value="pendiente">Pendientes</option>
              <option value="resuelto">Resueltos</option>
            </select>
          </div>
        </div>

        {/* Título de la lista */}
        <h2 className="titulo-lista">Lista de reportes</h2>

        {/* Lista de reportes */}
        <div className="lista-reportes-admin">
          {reportesFiltrados.length === 0 ? (
            <p className="sin-resultados">No se encontraron reportes con los criterios seleccionados.</p>
          ) : (
            reportesFiltrados.map((r) => (
              <div key={r.id} className="tarjeta-reporte-admin">
                <div className="imagen-reporte">
                  <img src={r.imagen} alt={r.titulo} />
                </div>

                <div className="contenido-reporte">
                  <h3 className="titulo-reporte-admin">{r.titulo}</h3>
                  
                  <div className="detalles-reporte">
                    <p className="linea-detalle">
                      <MapPin size={16} /> {r.ubicacion}
                    </p>
                    <p className="linea-detalle">
                      <CalendarDays size={16} /> {r.fecha}
                    </p>
                    <p className="linea-detalle">
                      <User size={16} /> {r.ciudadano}
                    </p>
                  </div>
                  {/* BOTÓN QUE AHORA ABRE EL MODAL */}
                  <button
                    className="boton-ver-detalles"
                    onClick={() => handleVerDetalles(r)}
                  >
                    <Eye size={16} /> Ver Detalles
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de detalles */}
      <ModalDetallesAutoridad
        open={modalAbierto}
        onClose={() => setModalAbierto(false)}
        reporte={reporteSeleccionado}
      />
    </PlantillaAdmin>
  );
};

export default ReportesTotales;
