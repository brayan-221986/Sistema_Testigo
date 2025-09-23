const usuariosModel = require('../models/usuariosModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await usuariosModel.getUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

const crearUsuario = async (req, res) => {
  try {
    const usuario = await usuariosModel.crearUsuario(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

const loginUsuario = async (req, res) => {
  const { correoODni, contrasena } = req.body;

  try {
    // Buscar usuario por correo o DNI
    const usuario = await usuariosModel.buscarUsuarioPorCorreoODni(correoODni);
    if (!usuario) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    // Comparar contraseñas
    const esValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!esValida) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Crear token
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    // Respuesta
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
    console.error(error);
    res.status(500).json({ error: 'Error en el login' });
  }
};

module.exports = {
  listarUsuarios,
  crearUsuario,
  loginUsuario 
};
