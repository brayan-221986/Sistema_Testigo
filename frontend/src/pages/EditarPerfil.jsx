import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutentificacion } from '../context/AutentificacionContext';
import { getProfile, updateProfile } from '../services/api'; // funciones expuestas
import LayoutPrincipal from '../components/PlantillaCiudadano';
import '../style/sesion.css';
import '../style/EditarPerfil.css'; // <-- importar estilos específicos de Editar Perfil

const EditarPerfil = () => {
  const { actualizarUsuario } = useAutentificacion();
  const [formulario, setFormulario] = useState({
    dni: '',
    nombres: '',
    apellidos: '',
    correo: '',
    nro_celular: ''
  });
  const [vistaPrevia, setVistaPrevia] = useState(null);
  const [archivoFoto, setArchivoFoto] = useState(null);
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [camposEditables, setCamposEditables] = useState({
    correo: false,
    nro_celular: false,
    contrasena: false
  });
  const navegar = useNavigate();

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const res = await getProfile();
        const perfil = res.data.usuario;
        setFormulario({
          dni: perfil.dni || '',
          nombres: perfil.nombres || '',
          apellidos: `${perfil.apellido_paterno || ''} ${perfil.apellido_materno || ''}`.trim(),
          correo: perfil.correo || '',
          nro_celular: perfil.nro_celular || ''
        });
        setVistaPrevia(perfil.foto || null);
      } catch (e) {
        console.error('Error cargando perfil', e);
        setError('No se pudo cargar el perfil');
      }
    };
    cargarPerfil();
  }, []);

  // Renombrar funciones
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario(previo => ({ ...previo, [name]: value }));
    if (error) setError('');
  };

  // Alterna la edición de un campo (correo, nro_celular, contrasena)
  const alternarEdicion = (campo) => {
    setCamposEditables(previo => ({ ...previo, [campo]: !previo[campo] }));
    // si desactivamos edición, limpiamos valores temporales de contraseñas
    if (campo === 'contrasena' && camposEditables.contrasena) {
      setNuevaContrasena('');
      setConfirmarContrasena('');
    }
    setError('');
  };

  const manejarFoto = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;
    setArchivoFoto(archivo);
    setVistaPrevia(URL.createObjectURL(archivo));
  };

  const validarCorreo = (correo) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  };

  const validarCelular = (celular) => {
    return /^\d{9}$/.test(celular);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones sólo de los campos que están visibles/activados para edición o siempre obligatorios
    if (!validarCorreo(formulario.correo)) {
      setError('Correo inválido. Verifica el formato.');
      return;
    }
    if (!validarCelular(formulario.nro_celular)) {
      setError('Número de celular inválido. Debe tener 9 dígitos.');
      return;
    }

    if (camposEditables.contrasena) {
      if (nuevaContrasena && nuevaContrasena.length < 6) {
        setError('La nueva contraseña debe tener al menos 6 caracteres');
        return;
      }
      if (nuevaContrasena !== confirmarContrasena) {
        setError('Las contraseñas no coinciden');
        return;
      }
    }

    setCargando(true);
    try {
      const data = new FormData();
      // DNI, nombres y apellidos son de solo lectura pero los incluimos si es necesario
      if (formulario.dni) data.append('dni', formulario.dni);
      data.append('correo', formulario.correo);
      data.append('nro_celular', formulario.nro_celular);
      if (camposEditables.contrasena && nuevaContrasena) data.append('contrasena', nuevaContrasena);
      if (archivoFoto) data.append('foto', archivoFoto);

      const res = await updateProfile({
        dni: formulario.dni,
        correo: formulario.correo,
        nro_celular: formulario.nro_celular,
        contrasena: (camposEditables.contrasena && nuevaContrasena) ? nuevaContrasena : undefined,
        foto: archivoFoto || undefined
      });

      const usuarioActualizado = res.data.usuario;
      if (actualizarUsuario) actualizarUsuario(usuarioActualizado);
      alert('Perfil actualizado correctamente');
      navegar('/ciudadano/home');
    } catch (e) {
      console.error('Error actualizando perfil', e);
      setError(e.response?.data?.error || e.message || 'Error al actualizar perfil');
    } finally {
      setCargando(false);
    }
  };

  return (
    <LayoutPrincipal tituloHeader="Editar Perfil">
      <div style={{ padding: 20, maxWidth: 900, margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            {/* FOTO A LA IZQUIERDA */}
            <div style={{ width: 220, textAlign: 'center' }}>
              <img src={vistaPrevia || '/usuario-img.jpg'} alt="foto" style={{ width: 180, height: 180, borderRadius: '50%', objectFit: 'cover', backgroundColor: '#f0f0f0' }} />
              <div style={{ marginTop: 10 }}>
                <label className="upload-label" style={{ cursor: 'pointer' }}>
                  Subir Imagen
                  <input type="file" accept="image/*" onChange={manejarFoto} style={{ display: 'none' }} />
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
                      value={formulario.dni}
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
                    <input type="text" name="nombres" value={formulario.nombres} readOnly className="form-control readonly-grey" />
                  </div>
                </div>

                <div className="field-row">
                  <div className="field-label">Apellidos:</div>
                  <div className="field-input">
                    <input type="text" name="apellidos" value={formulario.apellidos} readOnly className="form-control readonly-grey" />
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
                      value={formulario.correo}
                      onChange={manejarCambio}
                      className="form-control"
                      readOnly={!camposEditables.correo}
                      placeholder="ejemplo@correo.com"
                      aria-disabled={!camposEditables.correo}
                      style={{ flex: 1 }} /* nuevo: que el input ocupe el espacio disponible */
                    />
                    <button type="button" className="edit-btn" onClick={() => alternarEdicion('correo')} title="Modificar correo">
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
                      value={formulario.nro_celular}
                      onChange={manejarCambio}
                      className="form-control"
                      readOnly={!camposEditables.nro_celular}
                      placeholder="912345678"
                      aria-disabled={!camposEditables.nro_celular}
                      maxLength={9}
                      style={{ flex: 1 }}
                    />
                    <button type="button" className="edit-btn" onClick={() => alternarEdicion('nro_celular')} title="Modificar celular">
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
                      placeholder={camposEditables.contrasena ? "Ingrese nueva contraseña (mín 6 caracteres)" : "Dejar vacío para mantener actual"}
                      readOnly={!camposEditables.contrasena}
                      style={{ flex: 1 }}
                    />
                    <button type="button" className="edit-btn" onClick={() => alternarEdicion('contrasena')} title="Modificar contraseña">
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
                      readOnly={!camposEditables.contrasena}
                    />
                  </div>
                </div>
              </div>

              {error && <div className="error-message" style={{ marginTop: 10 }}>{error}</div>}

              <div className="perfil-btns" style={{ marginTop: 20 }}>
                <button type="button" className="btn btn-cancel perfil-cancel" onClick={() => navegar('/ciudadano/home')} disabled={cargando}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-login perfil-save" disabled={cargando}>
                  {cargando ? 'Guardando...' : 'Guardar Cambios'}
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
