// usuariosRoutes.js

const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { verificarToken, permitirRol } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

// Listar usuarios (solo admin)
router.get('/', verificarToken, permitirRol(['admin']), usuariosController.listarUsuarios);

// Crear usuario con foto
router.post('/', upload.single("foto"), usuariosController.crearUsuarioAdm);

// Registro de usuario (abierto)
router.post('/', usuariosController.crearUsuario);

// Login de usuario (abierto)
router.post('/login', usuariosController.loginUsuario);

module.exports = router;
