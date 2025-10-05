// usuariosRoutes.js

const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { verificarToken, permitirRol } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

// Listar usuarios (solo admin)
router.get('/', verificarToken, permitirRol(['admin']), usuariosController.listarUsuarios);

// Crear usuario por administrador (con foto opcional)
router.post('/admin', verificarToken, permitirRol(['admin']), upload.single("foto"), usuariosController.crearUsuarioAdm);

// Registro público de usuario
router.post('/register', usuariosController.crearUsuario);

// Login de usuario (abierto)
router.post('/login', usuariosController.loginUsuario);

// Obtener perfil del usuario autenticado
router.get('/perfil', verificarToken, usuariosController.obtenerPerfil);

// Actualizar perfil del usuario autenticado (foto opcional)
router.put('/perfil', verificarToken, upload.single('foto'), usuariosController.actualizarPerfil);

module.exports = router;

