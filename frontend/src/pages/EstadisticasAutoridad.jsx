import React, { useState } from "react";
import PlantillaAutoridad from "../components/PlantillaAutoridad";

import {
  PieChart, Pie, Cell,
  LineChart, Line, CartesianGrid, XAxis, YAxis,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";

import "../style/EstadisticasAutoridad.css";

export default function EstadisticasAutoridad() {
  // ======================= DATOS SIMULADOS =======================

  // Gráfico de categorías
  const datosCategoria = [
    { nombre: "Semáforos defectuosos", valor: 1 },
    { nombre: "Señalización vial", valor: 2 },
    { nombre: "Baches y pavimento", valor: 1 },
    { nombre: "Estacionamiento indebido", valor: 1 },
    { nombre: "Infracciones de tránsito", valor: 1 },
    { nombre: "Transporte público", valor: 2 },
  ];

  // Gráfico de estados
  const datosEstado = [
    { estado: "Recibidos", cantidad: 3 },
    { estado: "En Revisión", cantidad: 3 },
    { estado: "Resueltos", cantidad: 2 },
  ];

  // Gráfico de evolución temporal
  const datosTiempo = [
    { año: 2003, valor: 12 },
    { año: 2004, valor: 34 },
    { año: 2005, valor: 5 },
    { año: 2006, valor: 28 },
    { año: 2007, valor: 30 },
    { año: 2008, valor: 18 },
    { año: 2009, valor: 17 },
    { año: 2010, valor: 14 },
    { año: 2011, valor: 16 },
    { año: 2012, valor: 33 },
  ];

  // Colores
  const colores = [
    "#ff6b6b", "#4ecdc4", "#45aaf2", "#f7b731",
    "#a55eea", "#26de81", "#ffa502", "#2ed573"
  ];

  // Filtros de fechas (solo frontend)
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  return (
    <PlantillaAutoridad tituloHeader="Estadísticas">
      <div className="estadisticas-container">

        {/* =================== FILTROS =================== */}
        <div className="filtros-box">
          <div>
            <label>Fecha inicio</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>

          <div>
            <label>Fecha fin</label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </div>

          <button className="btn-filtrar">Filtrar</button>
        </div>

        {/* =================== GRÁFICO 1 =================== */}
        <h2 className="titulo-seccion">Estadísticas por Categoría</h2>
        <div className="grafico-centro">
          <ResponsiveContainer width="60%" height={350}>
            <PieChart>
              <Pie
                data={datosCategoria}
                dataKey="valor"
                nameKey="nombre"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {datosCategoria.map((_, index) => (
                  <Cell key={index} fill={colores[index % colores.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* =================== GRÁFICOS INFERIORES =================== */}
        <div className="fila-graficos">

          {/* Evolución */}
          <div className="tarjeta-grafico">
            <h2 className="titulo-seccion">Evolución en el tiempo</h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={datosTiempo}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="año" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="valor" stroke="#e74c3c" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Por estado */}
          <div className="tarjeta-grafico">
            <h2 className="titulo-seccion">Estadísticas por Estado</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={datosEstado}
                  dataKey="cantidad"
                  nameKey="estado"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {datosEstado.map((_, index) => (
                    <Cell key={index} fill={colores[index % colores.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </PlantillaAutoridad>
  );
}
