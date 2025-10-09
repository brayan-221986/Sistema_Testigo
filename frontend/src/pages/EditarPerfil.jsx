import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutentificacion } from '../context/AutentificacionContext';
import { getProfile, updateProfile } from '../services/api'; // funciones expuestas
import LayoutPrincipal from '../components/PlantillaCiudadano';
import '../style/sesion.css';
import '../style/EditarPerfil.css'; // <-- importar estilos específicos de Editar Perfil

const EditarPerfil = () => {
  const { usuario, actualizarUsuario } = useAutentificacion();
  const [form, setForm] = useState({
    dni: '',
    nombres: '',
    apellidos: '',
    correo: '',
    nro_celular: ''
  });
  const [fotoPreview, setFotoPreview] = useState(null);
  const [archivoFoto, setArchivoFoto] = useState(null);
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // Estado para controlar edición por campo: solo cuando se pulsa el lápiz se podrá modificar
  const [editable, setEditable] = useState({
    correo: false,
    nro_celular: false,
    contrasena: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const res = await getProfile();
        const perfil = res.data.usuario;
        setForm({
          dni: perfil.dni || '',
          nombres: perfil.nombres || '',
          apellidos: `${perfil.apellido_paterno || ''} ${perfil.apellido_materno || ''}`.trim(),
          correo: perfil.correo || '',
          nro_celular: perfil.nro_celular || ''
        });
        setFotoPreview(perfil.foto || null);
      } catch (e) {
        console.error('Error cargando perfil', e);
        setError('No se pudo cargar el perfil');
      }
    };
    cargarPerfil();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  // Alterna la edición de un campo (correo, nro_celular, contrasena)
  const toggleEdit = (campo) => {
    setEditable(prev => ({ ...prev, [campo]: !prev[campo] }));
    // si desactivamos edición, limpiamos valores temporales de contraseñas
    if (campo === 'contrasena' && editable.contrasena) {
      setNuevaContrasena('');
      setConfirmarContrasena('');
    }
    setError('');
  };

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setArchivoFoto(file);
    setFotoPreview(URL.createObjectURL(file));
  };

  const validarEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validarCelular = (cel) => {
    return /^\d{9}$/.test(cel);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones sólo de los campos que están visibles/activados para edición o siempre obligatorios
    if (!validarEmail(form.correo)) {
      setError('Correo inválido. Verifica el formato.');
      return;
    }
    if (!validarCelular(form.nro_celular)) {
      setError('Número de celular inválido. Debe tener 9 dígitos.');
      return;
    }

    if (editable.contrasena) {
      if (nuevaContrasena && nuevaContrasena.length < 6) {
        setError('La nueva contraseña debe tener al menos 6 caracteres');
        return;
      }
      if (nuevaContrasena !== confirmarContrasena) {
        setError('Las contraseñas no coinciden');
        return;
      }
    }

    setLoading(true);
    try {
      const data = new FormData();
      // DNI, nombres y apellidos son de solo lectura pero los incluimos si es necesario
      if (form.dni) data.append('dni', form.dni);
      data.append('correo', form.correo);
      data.append('nro_celular', form.nro_celular);
      if (editable.contrasena && nuevaContrasena) data.append('contrasena', nuevaContrasena);
      if (archivoFoto) data.append('foto', archivoFoto);

      const res = await updateProfile({
        dni: form.dni,
        correo: form.correo,
        nro_celular: form.nro_celular,
        contrasena: (editable.contrasena && nuevaContrasena) ? nuevaContrasena : undefined,
        foto: archivoFoto || undefined
      });

      const usuarioActualizado = res.data.usuario;
      if (actualizarUsuario) actualizarUsuario(usuarioActualizado);
      alert('Perfil actualizado correctamente');
      navigate('/ciudadano/home');
    } catch (e) {
      console.error('Error actualizando perfil', e);
      setError(e.response?.data?.error || e.message || 'Error al actualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutPrincipal tituloHeader="Editar Perfil">
      <div style={{ padding: 20, maxWidth: 900, margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            {/* FOTO A LA IZQUIERDA */}
            <div style={{ width: 220, textAlign: 'center' }}>
              <img src={fotoPreview || '/usuario-img.jpg'} alt="foto" style={{ width: 180, height: 180, borderRadius: '50%', objectFit: 'cover', backgroundColor: '#f0f0f0' }} />
              <div style={{ marginTop: 10 }}>
                <label className="upload-label" style={{ cursor: 'pointer' }}>
                  Subir Imagen
                  <input type="file" accept="image/*" onChange={handleFoto} style={{ display: 'none' }} />
                </label>
              </div>
            </div>

            {/* CAMPOS A LA DERECHA */}
            <div style={{ flex: 1 }}>
              {/* Bloque superior: DNI / Nombres / Apellidos (label izquierda, input derecha) */}
              <div className="top-fields">
                <div className="field-row">
                  <div className="field-label">Nº de DNI:</div>
                  <div className="field-input">
                    <input
                      type="text"
                      name="dni"
                      value={form.dni}
                      className="form-control readonly-grey"
                      maxLength={8}
                      placeholder="DNI"
                      readOnly
                    />
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

              {/* Espacio extra entre bloques */}
              <div style={{ height: 28 }} />

              {/* Bloque inferior: Correo y demas (MODIFICADO: input primero, botón editar a la derecha) */}
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
                      aria-disabled={!editable.correo}
                      style={{ flex: 1 }} /* nuevo: que el input ocupe el espacio disponible */
                    />
                    <button type="button" className="edit-btn" onClick={() => toggleEdit('correo')} title="Modificar correo">
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
                      placeholder="912345678"
                      aria-disabled={!editable.nro_celular}
                      maxLength={9}
                      style={{ flex: 1 }}
                    />
                    <button type="button" className="edit-btn" onClick={() => toggleEdit('nro_celular')} title="Modificar celular">
                      <img src="/Boton_modificar.png" alt="editar" />
                    </button>
                  </div>
                </div>

                <div className="field-row">
                  <div className="field-label">Nueva Contraseña:</div>
                  <div className="field-input edit-wrapper">
                    <input
                      type="password"
                      value={nuevaContrasena}
                      onChange={e => setNuevaContrasena(e.target.value)}
                      className="form-control"
                      placeholder={editable.contrasena ? "Ingrese nueva contraseña (mín 6 caracteres)" : "Dejar vacío para mantener actual"}
                      readOnly={!editable.contrasena}
                      style={{ flex: 1 }}
                    />
                    <button type="button" className="edit-btn" onClick={() => toggleEdit('contrasena')} title="Modificar contraseña">
                      <img src="/Boton_modificar.png" alt="editar" />
                    </button>
                  </div>
                </div>

                <div className="field-row">
                  <div className="field-label">Confirmar Contraseña:</div>
                  <div className="field-input">
                    <input
                      type="password"
                      value={confirmarContrasena}
                      onChange={e => setConfirmarContrasena(e.target.value)}
                      className="form-control"
                      placeholder="Repita nueva contraseña"
                      readOnly={!editable.contrasena}
                    />
                  </div>
                </div>
              </div>

              {error && <div className="error-message" style={{ marginTop: 10 }}>{error}</div>}

              <div className="perfil-btns" style={{ marginTop: 20 }}>
                <button type="button" className="btn btn-cancel perfil-cancel" onClick={() => navigate('/ciudadano/home')} disabled={loading}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-login perfil-save" disabled={loading}>
                  {loading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </LayoutPrincipal>
  );
};

export default EditarPerfil;
