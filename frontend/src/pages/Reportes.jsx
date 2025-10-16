import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import LayoutPrincipal from "../components/PlantillaCiudadano";
import "../style/Reportes.css";
import { Eye } from "lucide-react";

/* Genera datos de ejemplo */
const generarDatosEjemplo = () => {
  const estados = ["Enviado", "En proceso", "Resuelto"];
  const lista = [];
  const hoy = new Date();
  for (let i = 0; i < 15; i++) {
    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() - i);
    lista.push({
      id: i + 1,
      titulo: `Problema Urbano ${i + 1}`,
      fechaReporte: fecha.toISOString().split("T")[0],
      asignado: i % 3 !== 0, // true = Asignado, false = No asignado
      estado: estados[i % estados.length],
    });
  }
  return lista;
};

export default function Reportes() {
  const navigate = useNavigate();
  const datos = useMemo(() => generarDatosEjemplo(), []);
  const ordenadosPorFecha = useMemo(
    () => [...datos].sort((a, b) => new Date(b.fechaReporte) - new Date(a.fechaReporte)),
    [datos]
  );

  const verDetalle = (id) => {
    navigate(`/reportes/${id}`);
  };

  return (
    <LayoutPrincipal tituloHeader="Reportes" activeMenu="reportes">
      <div className="reportes-page">
        <div className="reportes-header">
          <div className="logo-wrapper">
            <img src="/logo.png" alt="testiGO" className="reportes-logo" />
          </div>
          <h2 className="reportes-title">REPORTES: </h2>
        </div>

        <div className="reportes-table-wrapper">
          <table className="reportes-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Fecha de reporte</th>
                <th>Asignado</th>
                <th>Estado</th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody>
              {ordenadosPorFecha.map((r, idx) => (
                <tr key={r.id} className={idx % 2 === 0 ? "fila-verde" : "fila-blanca"}>
                  <td>{r.titulo}</td>
                  <td>{new Date(r.fechaReporte).toLocaleDateString()}</td>
                  <td>{r.asignado ? "Asignado" : "No asignado"}</td>
                  <td>
                    <span className={`estado ${r.estado.replace(/\s+/g, "-").toLowerCase()}`}>
                      {r.estado}
                    </span>
                  </td>
                  <td>
                    <button className="ver-link" onClick={() => verDetalle(r.id)}>
                      <Eye size={14} /> Ver...
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LayoutPrincipal>
  );
}
