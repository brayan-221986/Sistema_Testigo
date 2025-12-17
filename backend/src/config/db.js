const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false
});

// Test de conexión
const conectarDB = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('Conexión a PostgreSQL exitosa');
  } catch (err) {
    console.error('Error de conexión a PostgreSQL', err);
    setTimeout(conectarDB, 5000);
  }
};

conectarDB();

module.exports = pool;
