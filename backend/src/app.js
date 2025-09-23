// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db'); 

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const usuariosRoutes = require('./routes/usuariosRoutes');
app.use('/usuarios', usuariosRoutes);

app.get('/', (req, res) => {
  res.send('Servidor Express funcionando');
});

// Puerto desde .env o 4000 por defecto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
