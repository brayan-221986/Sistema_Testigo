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

const reniecRoutes = require('./routes/reniecRoutes');
app.use('/reniec', reniecRoutes);


// Puerto dinámico
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
