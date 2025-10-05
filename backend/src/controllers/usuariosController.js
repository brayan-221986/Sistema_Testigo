const usuariosModel = require('../models/usuariosModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Listar todos los usuarios
const listarUsuarios = async (req, res, next) => {
  try {
    const usuarios = await usuariosModel.getUsuarios();
    res.json(usuarios);
  } catch (error) {
    next(error); // pasa el error al middleware global
  }
};

// Crear un nuevo usuario
const crearUsuario = async (req, res, next) => {
  try {
    const usuario = await usuariosModel.crearUsuario(req.body);
    res.status(201).json(usuario); 
  } catch (error) {
    next(error); // pasa el error al middleware global
  }
};

// Crear un nuevo usuario para administrador
const crearUsuarioAdm = async (req, res, next) => {
  try {
    const { dni, nombres, apellido_paterno, apellido_materno, correo, nro_celular, contrasena, rol } = req.body;

    // Guardar URL de Cloudinary si se subió foto
    const fotoUrl = req.file ? req.file.path : null;

    const usuario = await usuariosModel.crearUsuario({
      dni,
      nombres,
      apellido_paterno,
      apellido_materno,
      correo,
      nro_celular,
      contrasena: contrasena, 
      rol,
      foto: fotoUrl
    });

    res.status(201).json(usuario); 
  } catch (error) {
    next(error);
  }
};


// Login de usuario
const loginUsuario = async (req, res, next) => {
  const { correoODni, contrasena } = req.body;

  try {
    const usuario = await usuariosModel.buscarUsuarioPorCorreoODni(correoODni);
    if (!usuario) return res.status(400).json({ error: 'Usuario no encontrado' });

    const esValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!esValida) return res.status(400).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '8h' } 
    );

    // Enviar datos públicos completos del usuario (sin contraseña)
    res.json({
      token,
      usuario: {
        id: usuario.id,
        dni: usuario.dni,
        nombres: usuario.nombres,
        apellido_paterno: usuario.apellido_paterno,
        apellido_materno: usuario.apellido_materno,
        nro_celular: usuario.nro_celular,
        correo: usuario.correo,
        foto: usuario.foto || null,
        rol: usuario.rol
      }
    });
  } catch (error) {
    next(error); // pasa el error al middleware global
  }
};

// Obtener perfil del usuario autenticado
const obtenerPerfil = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const usuario = await usuariosModel.getUsuarioPorId(userId);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ usuario });
  } catch (error) {
    next(error);
  }
};

// Actualizar perfil del usuario autenticado
const actualizarPerfil = async (req, res, next) => {
  try {
    const userId = req.user.id;
    // Si se subió archivo con multer+cloudinary, req.file.path tiene la URL
    const fotoUrl = req.file ? req.file.path : undefined;

    const { dni, correo, nro_celular, contrasena } = req.body;

    const usuarioActualizado = await usuariosModel.actualizarUsuario({
      id: userId,
      dni,
      correo,
      nro_celular,
      contrasena,
      foto: fotoUrl
    });

    res.json({ usuario: usuarioActualizado });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listarUsuarios,
  crearUsuario,
  crearUsuarioAdm,
  loginUsuario,
  obtenerPerfil,
  actualizarPerfil
};
