// usuariosRoutes.js

const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { verificarToken, permitirRol } = require('../middlewares/authMiddleware');

// Listar usuarios (solo admin)
router.get('/', verificarToken, permitirRol(['admin']), usuariosController.listarUsuarios);

// Registro de usuario (abierto)
router.post('/', usuariosController.crearUsuario);

// Login de usuario (abierto)
router.post('/login', usuariosController.loginUsuario);

module.exports = router;
