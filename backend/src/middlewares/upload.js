// upload.js

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configurar almacenamiento en Cloudinary para multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'usuarios', // Carpeta en Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg']
  },
});

// Middleware de subida
const upload = multer({ storage });

module.exports = upload; // exportación CommonJS
