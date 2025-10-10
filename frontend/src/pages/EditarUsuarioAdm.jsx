// EditarUsuarioAdm.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerUsuarioPorId, actualizarUsuarioPorId } from "../services/usuariosService";
import PlantillaAdmin from "../components/PlantillaAdmin";
import "../style/EditarUsuarioAdm.css";

const EditarUsuarioAdm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    dni: "",
    nombres: "",
    apellidos: "",
    correo: "",
    celular: "",
    rol: "",
  });

  const [vistaPreviaFoto, setVistaPreviaFoto] = useState(null);
  const [archivoFoto, setArchivoFoto] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const [editable, setEditable] = useState({
    correo: false,
    celular: false,
    rol: false,
  });

  // Cargar datos del usuario seleccionado
  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const datos = await obtenerUsuarioPorId(id);
        setFormulario({
          dni: datos.dni,
          nombres: datos.nombres,
          apellidos: `${datos.apellido_paterno || ""} ${datos.apellido_materno || ""}`.trim(),
          correo: datos.correo,
          celular: datos.nro_celular,
          rol: datos.rol,
        });
        setVistaPreviaFoto(datos.foto || null);
      } catch (err) {
        console.error("Error al cargar usuario:", err);
        setError("No se pudo cargar el usuario");
      }
    };
    cargarUsuario();
  }, [id]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const alternarEdicion = (campo) => {
    setEditable((prev) => ({ ...prev, [campo]: !prev[campo] }));
    setError("");
  };

  const manejarFoto = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;
    setArchivoFoto(archivo);
    setVistaPreviaFoto(URL.createObjectURL(archivo));
  };

  const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  const validarCelular = (cel) => /^\d{9}$/.test(cel);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError("");

    if (!validarCorreo(formulario.correo)) {
      setError("Correo inválido. Verifica el formato.");
      return;
    }
    if (!validarCelular(formulario.celular)) {
      setError("Número de celular inválido. Debe tener 9 dígitos.");
      return;
    }

    setCargando(true);
    try {
      const datos = new FormData();
      Object.keys(formulario).forEach((clave) => datos.append(clave, formulario[clave]));
      if (archivoFoto) datos.append("foto", archivoFoto);

      await actualizarUsuarioPorId(id, datos);

      alert("Usuario actualizado correctamente");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Error al actualizar:", err);
      setError("No se pudo actualizar el usuario");
    } finally {
      setCargando(false);
    }
  };

  return (
    <PlantillaAdmin tituloHeader="Editar Usuario">
      <div className="contenedor-editar-usuario">
        <form onSubmit={manejarEnvio}>
          <div className="fila-editar">
            {/* FOTO IZQUIERDA */}
            <div className="columna-foto">
              <img
                src={vistaPreviaFoto || "/usuario-img.jpg"}
                alt="foto usuario"
                className="imagen-perfil"
              />
              <label className="boton-subir">
                Cambiar Imagen
                <input type="file" accept="image/*" onChange={manejarFoto} hidden />
              </label>
            </div>

            {/* CAMPOS DERECHA */}
            <div className="columna-formulario">
              {/* BLOQUE SUPERIOR */}
              <div className="bloque-superior">
                <div className="campo">
                  <label>DNI:</label>
                  <input type="text" name="dni" value={formulario.dni} readOnly className="solo-lectura" />
                </div>

                <div className="campo">
                  <label>Nombres:</label>
                  <input type="text" name="nombres" value={formulario.nombres} readOnly className="solo-lectura" />
                </div>

                <div className="campo">
                  <label>Apellidos:</label>
                  <input type="text" name="apellidos" value={formulario.apellidos} readOnly className="solo-lectura" />
                </div>
              </div>

              {/* BLOQUE INFERIOR */}
              <div className="bloque-inferior">
                <div className="campo editable">
                  <label>Correo:</label>
                  <div className="campo-editable">
                    <input
                      type="email"
                      name="correo"
                      value={formulario.correo}
                      onChange={manejarCambio}
                      readOnly={!editable.correo}
                      placeholder="ejemplo@correo.com"
                    />
                    <button type="button" onClick={() => alternarEdicion("correo")}>
                      <img src="/Boton_modificar.png" alt="editar" />
                    </button>
                  </div>
                </div>

                <div className="campo editable">
                  <label>Celular:</label>
                  <div className="campo-editable">
                    <input
                      type="text"
                      name="celular"
                      value={formulario.celular}
                      onChange={manejarCambio}
                      readOnly={!editable.celular}
                      maxLength={9}
                      placeholder="912345678"
                    />
                    <button type="button" onClick={() => alternarEdicion("celular")}>
                      <img src="/Boton_modificar.png" alt="editar" />
                    </button>
                  </div>
                </div>

                <div className="campo editable">
                  <label>Rol:</label>
                  <div className="campo-editable">
                    <select
                      name="rol"
                      value={formulario.rol}
                      onChange={manejarCambio}
                      disabled={!editable.rol}
                    >
                      <option value="admin">Administrador</option>
                      <option value="autoridad">Autoridad</option>
                      <option value="ciudadano">Usuario</option>
                    </select>
                    <button type="button" onClick={() => alternarEdicion("rol")}>
                      <img src="/Boton_modificar.png" alt="editar" />
                    </button>
                  </div>
                </div>
              </div>

              {error && <div className="mensaje-error">{error}</div>}

              <div className="botones">
                <button
                  type="button"
                  className="btn-cancelar"
                  onClick={() => navigate("/admin/dashboard")}
                  disabled={cargando}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-guardar" disabled={cargando}>
                  {cargando ? "Guardando..." : "Guardar Cambios"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </PlantillaAdmin>
  );
};

export default EditarUsuarioAdm;
