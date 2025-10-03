// src/routes/usuariosRoutes.js
const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

const { verificarToken, permitirRol } = require('../middlewares/authMiddleware');


// Solo admin puede listar usuarios
router.get('/', verificarToken, permitirRol(['admin']), usuariosController.listarUsuarios);

// Registro abierto
router.post('/', usuariosController.crearUsuario);

// Login abierto
router.post('/login', usuariosController.loginUsuario);

module.exports = router;
