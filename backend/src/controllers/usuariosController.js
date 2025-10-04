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
    const { dni, nombres, apellidos, correo, celular, password, rol } = req.body;

    // Guardar URL de Cloudinary si se subió foto
    const fotoUrl = req.file ? req.file.path : null;

    const usuario = await usuariosModel.crearUsuario({
      dni,
      nombres,
      apellidos,
      correo,
      celular,
      contrasena: password, 
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

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nombres: usuario.nombres,
        correo: usuario.correo,
        rol: usuario.rol
      }
    });
  } catch (error) {
    next(error); // pasa el error al middleware global
  }
};

module.exports = {
  listarUsuarios,
  crearUsuario,
  crearUsuarioAdm,
  loginUsuario 
};
