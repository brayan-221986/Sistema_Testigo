require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

// Validar variables críticas
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET no definido');
}

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.send('Backend activo');
});

const pool = require('./config/db');

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      ok: true,
      time: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      error: err.message
    });
  }
});


// Puerto dinámico
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
