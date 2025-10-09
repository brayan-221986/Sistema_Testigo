import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsuarios } from "../services/usuariosService";
import PlantillaAdmin from "../components/PlantillaAdmin";
import "../components/ListarUsuarios.css";

const AdminDashboard = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await getUsuarios();
        setUsuarios(data);
      } catch (err) {
        setError("No se pudo cargar la lista de usuarios");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const usuariosFiltrados = usuarios.filter((u) =>
    `${u.nombres} ${u.apellido_paterno} ${u.apellido_materno}`
      .toLowerCase()
      .includes(busqueda.toLowerCase()) ||
    u.dni.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.correo.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>{error}</p>;

  return (
    <PlantillaAdmin tituloHeader="Usuarios">
      <div className="contenido-interno">
        {/* Barra superior con búsqueda y botón */}
        <div className="acciones-barra">
          <input
            type="text"
            placeholder="Buscar..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="buscador"
          />
          <button
            className="crear-btn"
            onClick={() => navigate("/admin/crear-usuario")}
          >
            Crear nuevo usuario
          </button>
        </div>

        {/* Tabla de usuarios */}
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>Nombre y Apellido</th>
              <th>DNI</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((user, index) => (
              <tr
                key={user.id ?? index}
                className={index % 2 === 0 ? "fila-verde" : "fila-blanca"}
              >
                <td>
                  {user.nombres} {user.apellido_paterno} {user.apellido_materno}
                </td>
                <td>{user.dni}</td>
                <td>{user.correo}</td>
                <td>{user.rol}</td>
                <td>
                  <span
                    className="editar-link"
                    onClick={() => navigate(`/admin/usuarios/${user.id}`)}
                  >
                    Ver...
                  </span>
                </td>
                <td> 
                  <span className="eliminar">❌</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PlantillaAdmin>
  );
};

export default AdminDashboard;
