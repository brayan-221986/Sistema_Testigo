import React from "react";
import LayoutPrincipal from "../components/PlantillaCiudadano";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  LineChart, Line, CartesianGrid, ResponsiveContainer
} from "recharts";
import "../style/EstadisticasCiudadano.css";

// Colores para los gráficos
const colores = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#a770ef", "#4b7bec", "#e74c3c", "#2ecc71"];

export default function EstadisticasCiudadano() {
  // --- DATOS SIMULADOS (pueden venir del backend luego) ---
  const totalReportes = 120;
  const reportesResueltos = 75;
  const porcentajeResueltos = ((reportesResueltos / totalReportes) * 100).toFixed(1);
  const promedioDiasResolucion = 6.4;

  // Distribución por categoría
  const datosCategoria = [
    { categoria: "Congestion vehicular", cantidad: 20 },
    { categoria: "Accidentes de transito", cantidad: 15 },
    { categoria: "Problemas de infraestructura vial", cantidad: 25 },
    { categoria: "Problemas de movilidad peatonal y ciclista", cantidad: 18 },
    { categoria: "Problemas de transporte publico", cantidad: 10 },
    { categoria: "Problemas de regulacion y control", cantidad: 12 },
    { categoria: "Problemas ambientales asociados", cantidad: 8 },
    { categoria: "Otros", cantidad: 12 },
  ];

  // Tendencia de reportes en el tiempo
  const datosTiempo = [
    { mes: "Ene", reportes: 10 },
    { mes: "Feb", reportes: 15 },
    { mes: "Mar", reportes: 18 },
    { mes: "Abr", reportes: 25 },
    { mes: "May", reportes: 20 },
    { mes: "Jun", reportes: 15 },
    { mes: "Jul", reportes: 22 },
    { mes: "Ago", reportes: 18 },
    { mes: "Set", reportes: 30 },
  ];

  // Distribución por estado
  const datosEstado = [
    { nombre: "Enviado", valor: 20 },
    { nombre: "En proceso", valor: 30 },
    { nombre: "Resuelto", valor: 60 },
    { nombre: "Archivado", valor: 10 },
  ];

  return (
    <LayoutPrincipal tituloHeader="Estadísticas">
      <div className="panel-estadisticas">
        {/* KPIs */}
        <div className="panel-kpis">
          <div className="kpi-card">
            <h3>Total Reportes</h3>
            <p className="kpi-valor">{totalReportes}</p>
          </div>
          <div className="kpi-card">
            <h3>% Resueltos</h3>
            <p className="kpi-valor">{porcentajeResueltos}%</p>
          </div>
          <div className="kpi-card">
            <h3>Tiempo Promedio de Resolución</h3>
            <p className="kpi-valor">{promedioDiasResolucion} días</p>
          </div>
        </div>

        {/* Gráficos */}
        <div className="graficos-grid">
          {/* Gráfico de categorías */}
          <div className="grafico-card">
            <h3>Reportes por Categoría</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={datosCategoria}>
                <XAxis dataKey="categoria" tick={{ fontSize: 10 }} interval={0} angle={-20} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cantidad" fill="#4b7bec" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de tendencia */}
          <div className="grafico-card">
            <h3>Tendencia de Reportes en el Tiempo</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={datosTiempo}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="reportes" stroke="#00C49F" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de estado */}
          <div className="grafico-card">
            <h3>Distribución por Estado</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={datosEstado}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="valor"
                  label
                >
                  {datosEstado.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </LayoutPrincipal>
  );
}
