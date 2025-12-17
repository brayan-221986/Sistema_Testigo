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
  } catch (error) {
    console.error('Error conectando a PostgreSQL:', error);
    setTimeout(conectarDB, 5000);
  }
};

conectarDB();

module.exports = pool;
