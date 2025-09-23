// src/routes/usuariosRoutes.js
const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

const { verificarToken, permitirRol } = require('../middlewares/authMiddleware');


//router.get('/', usuariosController.listarUsuarios);
router.get('/', verificarToken, permitirRol(['admin']), usuariosController.listarUsuarios);
router.post('/', usuariosController.crearUsuario);
router.post('/login', usuariosController.loginUsuario);

module.exports = router;
