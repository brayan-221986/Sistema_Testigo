// usuariosModel.js

const pool = require('../config/db');
const bcrypt = require('bcrypt');

// Obtener todos los usuarios de la base de datos
const getUsuarios = async () => {
  const result = await pool.query('SELECT * FROM usuarios');
  return result.rows;
};

// Crear un nuevo usuario con contraseña cifrada
const crearUsuario = async (usuario) => {
  const { dni, nombres, apellido_paterno, apellido_materno, nro_celular, correo, contrasena, foto, rol } = usuario;

  const hashedPassword = await bcrypt.hash(contrasena, 10); // Cifrado de contraseña

  const query = `
    INSERT INTO usuarios (dni, nombres, apellido_paterno, apellido_materno, nro_celular, correo, contrasena, foto, rol)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING id, dni, nombres, apellido_paterno, apellido_materno, nro_celular, correo, foto, rol
  `;

  const values = [dni, nombres, apellido_paterno, apellido_materno, nro_celular, correo, hashedPassword, foto, rol];
  const result = await pool.query(query, values);
  return result.rows[0]; // Devuelve el usuario creado
};

// Buscar un usuario por correo o DNI
const buscarUsuarioPorCorreoODni = async (correoODni) => {
  const query = `
    SELECT * FROM usuarios 
    WHERE correo = $1 OR dni = $1
  `;
  const result = await pool.query(query, [correoODni]);
  return result.rows[0]; // Devuelve solo un usuario
};

module.exports = {
  getUsuarios,
  crearUsuario,
  buscarUsuarioPorCorreoODni
};
