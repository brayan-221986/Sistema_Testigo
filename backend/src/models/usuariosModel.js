const pool = require('../config/db');
const bcrypt = require('bcrypt');

const getUsuarios = async () => {
  const result = await pool.query('SELECT * FROM usuarios');
  return result.rows;
};

const crearUsuario = async (usuario) => {
  const { dni, nombres, apellido_paterno, apellido_materno, nro_celular, correo, contrasena, rol } = usuario;

  const hashedPassword = await bcrypt.hash(contrasena, 10);

  const query = `
    INSERT INTO usuarios (dni, nombres, apellido_paterno, apellido_materno, nro_celular, correo, contrasena, rol)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING id, dni, nombres, apellido_paterno, apellido_materno, nro_celular, correo, rol
  `;

  const values = [dni, nombres, apellido_paterno, apellido_materno, nro_celular, correo, hashedPassword, rol];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const buscarUsuarioPorCorreoODni = async (correoODni) => {
  const query = `
    SELECT * FROM usuarios 
    WHERE correo = $1 OR dni = $1
  `;
  const result = await pool.query(query, [correoODni]);
  return result.rows[0]; // devuelve solo uno
};

module.exports = {
  getUsuarios,
  crearUsuario,
  buscarUsuarioPorCorreoODni
};
