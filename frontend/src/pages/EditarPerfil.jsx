import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutentificacion } from '../context/AutentificacionContext';
import { getProfile, updateProfile } from '../services/api'; // funciones expuestas
import { consultarRENIEC } from '../services/reniecService'; // <-- usar RENIEC para autocompletar
import LayoutPrincipal from '../components/PlantillaCiudadano';
import '../components/sesion.css';

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
  const [isDNIValidated, setIsDNIValidated] = useState(false); // nuevo estado
  const [isConsulting, setIsConsulting] = useState(false);    // control del botón Consultar
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
        // Si el perfil ya viene con DNI y nombres, consideramos validado inicialmente
        if (perfil.dni) setIsDNIValidated(true);
      } catch (e) {
        console.error('Error cargando perfil', e);
        setError('No se pudo cargar el perfil');
      }
    };
    cargarPerfil();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Si cambia el DNI, invalidamos la validación previa y limpiamos nombres/apellidos
    if (name === 'dni') {
      setIsDNIValidated(false);
      setForm(prev => ({ ...prev, [name]: value, nombres: '', apellidos: '' }));
      if (error) setError('');
      return;
    }
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Botón para consultar RENIEC y autocompletar nombres/apellidos por DNI
  const handleConsultarDNI = async () => {
    const dni = (form.dni || '').trim();
    if (!dni || dni.length !== 8 || !/^\d+$/.test(dni)) {
      setError('DNI inválido. Debe tener 8 números.');
      return;
    }
    setIsConsulting(true);
    setError('');
    try {
      const userData = await consultarRENIEC(dni);
      setForm(prev => ({
        ...prev,
        dni,
        nombres: userData.nombres || '',
        apellidos: userData.apellidos || ''
      }));
      setIsDNIValidated(true);
    } catch (err) {
      setError(err.message || 'No se encontró el DNI');
      setIsDNIValidated(false);
    } finally {
      setIsConsulting(false);
    }
  };

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setArchivoFoto(file);
    setFotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (nuevaContrasena && nuevaContrasena.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (nuevaContrasena !== confirmarContrasena) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        dni: form.dni, // <-- incluir DNI en el payload para que el backend lo guarde
        correo: form.correo,
        nro_celular: form.nro_celular,
        contrasena: nuevaContrasena || undefined,
        foto: archivoFoto || undefined
      };
      const res = await updateProfile(payload);
      const usuarioActualizado = res.data.usuario;
      // Actualizar contexto y localStorage
      if (actualizarUsuario) actualizarUsuario(usuarioActualizado);
      alert('Perfil actualizado correctamente');
      navigate('/ciudadano/home');
    } catch (e) {
      console.error('Error actualizando perfil', e);
      setError(e.response?.data?.error || 'Error al actualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutPrincipal tituloHeader="Editar Perfil">
      <div style={{ padding: 20, maxWidth: 900, margin: '0 auto' }}>
        <h2>Editar Perfil</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ flex: 1 }}>
              <label>Nº de DNI:</label>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                  type="text"
                  name="dni"
                  value={form.dni}
                  onChange={handleChange}
                  className="form-control"
                  maxLength={8}
                  placeholder="Ingrese su DNI (8 dígitos)"
                  readOnly={false} // DNI es editable por requisito
                />
                <button type="button" className="consultar-btn" onClick={handleConsultarDNI} disabled={isConsulting || isDNIValidated}>
                  {isConsulting ? 'Consultando...' : isDNIValidated ? 'Validado' : 'Consultar'}
                </button>
              </div>

              <label>Nombres:</label>
              <input type="text" name="nombres" value={form.nombres} readOnly className="form-control" />

              <label>Apellidos:</label>
              <input type="text" name="apellidos" value={form.apellidos} readOnly className="form-control" />

              <label>Correo:</label>
              <input type="email" name="correo" value={form.correo} onChange={handleChange} className="form-control" required />

              <label>Nro de Celular:</label>
              <input type="text" name="nro_celular" value={form.nro_celular} onChange={handleChange} className="form-control" required />

              <label>Nueva Contraseña:</label>
              <input type="password" value={nuevaContrasena} onChange={e => setNuevaContrasena(e.target.value)} className="form-control" placeholder="Dejar vacío para mantener actual" />

              <label>Confirmar Contraseña:</label>
              <input type="password" value={confirmarContrasena} onChange={e => setConfirmarContrasena(e.target.value)} className="form-control" placeholder="Repita nueva contraseña" />

              {error && <div className="error-message" style={{ marginTop: 10 }}>{error}</div>}

              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <button type="submit" className="btn btn-login" disabled={loading}>
                  {loading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
                <button type="button" className="btn btn-cancel" onClick={() => navigate('/ciudadano/home')}>
                  Cancelar
                </button>
              </div>
            </div>

            <div style={{ width: 220, textAlign: 'center' }}>
              <img src={fotoPreview || '/usuario-img.jpg'} alt="foto" style={{ width: 180, height: 180, borderRadius: '50%', objectFit: 'cover' }} />
              <div style={{ marginTop: 10 }}>
                <label className="upload-label" style={{ cursor: 'pointer' }}>
                  Subir Imagen
                  <input type="file" accept="image/*" onChange={handleFoto} style={{ display: 'none' }} />
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </LayoutPrincipal>
  );
};

export default EditarPerfil;
