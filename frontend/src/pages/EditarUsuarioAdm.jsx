// EditarUsuarioAdmin.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUsuarioPorId, updateUsuarioById } from "../services/usuariosService";
import PlantillaAdmin from "../components/PlantillaAdmin";
import "../components/sesion.css";
import "../components/EditarPerfil.css";

const EditarUsuarioAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    dni: "",
    nombres: "",
    apellidos: "",
    correo: "",
    nro_celular: "",
    rol: "",
  });

  const [fotoPreview, setFotoPreview] = useState(null);
  const [archivoFoto, setArchivoFoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [editable, setEditable] = useState({
    correo: false,
    nro_celular: false,
    rol: false,
  });

  // Cargar datos del usuario seleccionado
  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const data = await getUsuarioPorId(id);
        setForm({
          dni: data.dni,
          nombres: data.nombres,
          apellidos: `${data.apellido_paterno || ""} ${data.apellido_materno || ""}`.trim(),
          correo: data.correo,
          nro_celular: data.nro_celular,
          rol: data.rol,
        });
        setFotoPreview(data.foto || null);
      } catch (err) {
        console.error("Error al cargar usuario:", err);
        setError("No se pudo cargar el usuario");
      }
    };
    cargarUsuario();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const toggleEdit = (campo) => {
    setEditable((prev) => ({ ...prev, [campo]: !prev[campo] }));
    setError("");
  };

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setArchivoFoto(file);
    setFotoPreview(URL.createObjectURL(file));
  };

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validarCelular = (cel) => /^\d{9}$/.test(cel);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validarEmail(form.correo)) {
      setError("Correo inválido. Verifica el formato.");
      return;
    }
    if (!validarCelular(form.nro_celular)) {
      setError("Número de celular inválido. Debe tener 9 dígitos.");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(form).forEach((key) => data.append(key, form[key]));
      if (archivoFoto) data.append("foto", archivoFoto);

      await updateUsuarioById(id, data);

      alert("Usuario actualizado correctamente");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Error al actualizar:", err);
      setError("No se pudo actualizar el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PlantillaAdmin tituloHeader="Editar Usuario">
      <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
            {/* FOTO IZQUIERDA */}
            <div style={{ width: 220, textAlign: "center" }}>
              <img
                src={fotoPreview || "/usuario-img.jpg"}
                alt="foto"
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  objectFit: "cover",
                  backgroundColor: "#f0f0f0",
                }}
              />
              <div style={{ marginTop: 10 }}>
                <label className="upload-label" style={{ cursor: "pointer" }}>
                  Cambiar Imagen
                  <input type="file" accept="image/*" onChange={handleFoto} style={{ display: "none" }} />
                </label>
              </div>
            </div>

            {/* CAMPOS DERECHA */}
            <div style={{ flex: 1 }}>
              {/* BLOQUE SUPERIOR */}
              <div className="top-fields">
                <div className="field-row">
                  <div className="field-label">Nº de DNI:</div>
                  <div className="field-input">
                    <input type="text" name="dni" value={form.dni} readOnly className="form-control readonly-grey" />
                  </div>
                </div>

                <div className="field-row">
                  <div className="field-label">Nombres:</div>
                  <div className="field-input">
                    <input type="text" name="nombres" value={form.nombres} readOnly className="form-control readonly-grey" />
                  </div>
                </div>

                <div className="field-row">
                  <div className="field-label">Apellidos:</div>
                  <div className="field-input">
                    <input type="text" name="apellidos" value={form.apellidos} readOnly className="form-control readonly-grey" />
                  </div>
                </div>
              </div>

              <div style={{ height: 28 }} />

              {/* BLOQUE INFERIOR */}
              <div className="bottom-fields">
                <div className="field-row">
                  <div className="field-label">Correo:</div>
                  <div className="field-input edit-wrapper">
                    <input
                      type="email"
                      name="correo"
                      value={form.correo}
                      onChange={handleChange}
                      className="form-control"
                      readOnly={!editable.correo}
                      placeholder="ejemplo@correo.com"
                      style={{ flex: 1 }}
                    />
                    <button type="button" className="edit-btn" onClick={() => toggleEdit("correo")}>
                      <img src="/Boton_modificar.png" alt="editar" />
                    </button>
                  </div>
                </div>

                <div className="field-row">
                  <div className="field-label">Nro de Celular:</div>
                  <div className="field-input edit-wrapper">
                    <input
                      type="text"
                      name="nro_celular"
                      value={form.nro_celular}
                      onChange={handleChange}
                      className="form-control"
                      readOnly={!editable.nro_celular}
                      maxLength={9}
                      placeholder="912345678"
                      style={{ flex: 1 }}
                    />
                    <button type="button" className="edit-btn" onClick={() => toggleEdit("nro_celular")}>
                      <img src="/Boton_modificar.png" alt="editar" />
                    </button>
                  </div>
                </div>

                <div className="field-row">
                  <div className="field-label">Rol:</div>
                  <div className="field-input edit-wrapper">
                    <select
                      name="rol"
                      value={form.rol}
                      onChange={handleChange}
                      className="form-control"
                      disabled={!editable.rol}
                      style={{ flex: 1 }}
                    >
                      <option value="admin">Administrador</option>
                      <option value="autoridad">Autoridad</option>
                      <option value="ciudadano">Usuario</option>
                    </select>
                    <button type="button" className="edit-btn" onClick={() => toggleEdit("rol")}>
                      <img src="/Boton_modificar.png" alt="editar" />
                    </button>
                  </div>
                </div>
              </div>

              {error && <div className="error-message" style={{ marginTop: 10 }}>{error}</div>}

              <div className="perfil-btns" style={{ marginTop: 20 }}>
                <button
                  type="button"
                  className="btn btn-cancel perfil-cancel"
                  onClick={() => navigate("/admin/dashboard")}
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-login perfil-save" disabled={loading}>
                  {loading ? "Guardando..." : "Guardar Cambios"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </PlantillaAdmin>
  );
};

export default EditarUsuarioAdmin;
