const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// Función para probar conexión y reconectar si falla
const conectarDB = async () => {
  try {
    await pool.query('SELECT 1'); // prueba simple de conexión
    console.log('Conexión a PostgreSQL exitosa');
  } catch (err) {
    console.error('Error de conexión a PostgreSQL', err);
    setTimeout(conectarDB, 5000); // reintento en 5 segundos
  }
};

conectarDB();

module.exports = pool; // Pool reutilizable en el proyecto
