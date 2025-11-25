import React, { useState } from "react";
import PlantillaAdmin from "../components/PlantillaAdmin";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Users, FileText, CheckCircle, Clock } from "lucide-react";
import "../style/EstadisticasAdmin.css";

export default function EstadisticasAdmin() {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [institucionFiltro, setInstitucionFiltro] = useState("todas");

  // =================== DATOS SIMULADOS (KPIs) ===================
  const totalUsuarios = 1250;
  const totalReportes = 3580;
  const tasaResolucionGlobal = 78.5;
  const tiempoPromedioGlobal = 5.2;

  // =================== CRECIMIENTO DE USUARIOS ===================
  const datosUsuarios = [
    { mes: "Ene", ciudadanos: 50, instituciones: 3 },
    { mes: "Feb", ciudadanos: 80, instituciones: 5 },
    { mes: "Mar", ciudadanos: 120, instituciones: 7 },
    { mes: "Abr", ciudadanos: 180, instituciones: 10 },
    { mes: "May", ciudadanos: 250, instituciones: 12 },
    { mes: "Jun", ciudadanos: 320, instituciones: 15 },
    { mes: "Jul", ciudadanos: 400, instituciones: 18 },
    { mes: "Ago", ciudadanos: 480, instituciones: 20 },
    { mes: "Sep", ciudadanos: 580, instituciones: 22 },
  ];

  // =================== VOLUMEN DE REPORTES ===================
  const datosReportes = [
    { semana: "Sem 1", reportes: 45 },
    { semana: "Sem 2", reportes: 60 },
    { semana: "Sem 3", reportes: 75 },
    { semana: "Sem 4", reportes: 90 },
    { semana: "Sem 5", reportes: 85 },
    { semana: "Sem 6", reportes: 110 },
    { semana: "Sem 7", reportes: 95 },
    { semana: "Sem 8", reportes: 120 },
  ];

  // =================== RANKING DE INSTITUCIONES ===================
  const rankingInstituciones = [
    { nombre: "Municipalidad de Cusco", resueltos: 380, tiempoPromedio: 4.2 },
    { nombre: "Municipalidad San Sebastián", resueltos: 320, tiempoPromedio: 5.8 },
    { nombre: "Ministerio de Transporte", resueltos: 280, tiempoPromedio: 6.5 },
    { nombre: "Policía Nacional", resueltos: 250, tiempoPromedio: 4.9 },
    { nombre: "SEDACUSCO", resueltos: 180, tiempoPromedio: 7.2 },
  ];

  // =================== DISTRIBUCIÓN POR CATEGORÍA ===================
  const datosCategorias = [
    { categoria: "Vías y movilidad", valor: 450 },
    { categoria: "Alumbrado público", valor: 320 },
    { categoria: "Limpieza", valor: 280 },
    { categoria: "Agua y saneamiento", valor: 220 },
    { categoria: "Otros", valor: 180 },
  ];

  const colores = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#a770ef"];

  const aplicarFiltros = () => {
    console.log("Filtros aplicados:", { fechaInicio, fechaFin, institucionFiltro });
    // Aquí iría la lógica para filtrar datos desde el backend
  };

  return (
    <PlantillaAdmin tituloHeader="Estadísticas del Sistema">
      <div className="estadisticas-admin-container">
        
        {/* =================== FILTROS =================== */}
        <div className="filtros-admin">
          <div className="filtro-grupo">
            <label>Fecha Inicio</label>
            <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
          </div>
          <div className="filtro-grupo">
            <label>Fecha Fin</label>
            <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
          </div>
          <div className="filtro-grupo">
            <label>Institución</label>
            <select value={institucionFiltro} onChange={(e) => setInstitucionFiltro(e.target.value)}>
              <option value="todas">Todas</option>
              <option value="muni-cusco">Municipalidad de Cusco</option>
              <option value="muni-san-sebastian">Municipalidad San Sebastián</option>
              <option value="min-transporte">Ministerio de Transporte</option>
            </select>
          </div>
          <button className="btn-filtrar-admin" onClick={aplicarFiltros}>Aplicar Filtros</button>
        </div>

        {/* =================== KPIs GLOBALES =================== */}
        <div className="kpis-globales">
          <div className="kpi-card-admin">
            <div className="kpi-icono usuarios">
              <Users size={32} />
            </div>
            <div className="kpi-contenido">
              <h3>Usuarios Activos</h3>
              <p className="kpi-numero">{totalUsuarios.toLocaleString()}</p>
            </div>
          </div>

          <div className="kpi-card-admin">
            <div className="kpi-icono reportes">
              <FileText size={32} />
            </div>
            <div className="kpi-contenido">
              <h3>Total Reportes</h3>
              <p className="kpi-numero">{totalReportes.toLocaleString()}</p>
            </div>
          </div>

          <div className="kpi-card-admin">
            <div className="kpi-icono resueltos">
              <CheckCircle size={32} />
            </div>
            <div className="kpi-contenido">
              <h3>Tasa de Resolución</h3>
              <p className="kpi-numero">{tasaResolucionGlobal}%</p>
            </div>
          </div>

          <div className="kpi-card-admin">
            <div className="kpi-icono tiempo">
              <Clock size={32} />
            </div>
            <div className="kpi-contenido">
              <h3>Tiempo Promedio</h3>
              <p className="kpi-numero">{tiempoPromedioGlobal} días</p>
            </div>
          </div>
        </div>

        {/* =================== GRÁFICO: CRECIMIENTO DE USUARIOS =================== */}
        <div className="grafico-seccion">
          <h2 className="titulo-grafico">Crecimiento de Usuarios</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={datosUsuarios}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ciudadanos" stroke="#4A90E2" strokeWidth={3} name="Ciudadanos" />
              <Line type="monotone" dataKey="instituciones" stroke="#F5A623" strokeWidth={3} name="Instituciones" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* =================== GRÁFICO: VOLUMEN DE REPORTES =================== */}
        <div className="grafico-seccion">
          <h2 className="titulo-grafico">Volumen de Reportes por Semana</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={datosReportes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="semana" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="reportes" fill="#7ED321" name="Reportes Creados" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* =================== DOS COLUMNAS: RANKING + DISTRIBUCIÓN =================== */}
        <div className="fila-dos-columnas">
          
          {/* RANKING DE INSTITUCIONES */}
          <div className="columna-grafico">
            <h2 className="titulo-grafico">Ranking de Instituciones</h2>
            <div className="tabla-ranking">
              <table>
                <thead>
                  <tr>
                    <th>Institución</th>
                    <th>Resueltos</th>
                    <th>Tiempo Prom.</th>
                  </tr>
                </thead>
                <tbody>
                  {rankingInstituciones.map((inst, idx) => (
                    <tr key={idx}>
                      <td>{inst.nombre}</td>
                      <td className="numero-destacado">{inst.resueltos}</td>
                      <td className="numero-destacado">{inst.tiempoPromedio} días</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* DISTRIBUCIÓN POR CATEGORÍA */}
          <div className="columna-grafico">
            <h2 className="titulo-grafico">Distribución por Categoría</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={datosCategorias}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="valor"
                  nameKey="categoria"
                  label
                >
                  {datosCategorias.map((entry, index) => (
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
    </PlantillaAdmin>
  );
}
