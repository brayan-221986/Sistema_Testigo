// authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware para verificar token JWT y proteger rutas
const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extrae token del formato "Bearer token"
  
  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica token con la clave secreta
    req.user = decoded; // Guarda id y rol para rutas protegidas
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};

// Middleware para verificar roles específicos
const permitirRol = (rolesPermitidos) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.user.rol)) {
      return res.status(403).json({ error: 'No tienes permiso para acceder a esta ruta' });
    }
    next();
  };
};

module.exports = { verificarToken, permitirRol };
