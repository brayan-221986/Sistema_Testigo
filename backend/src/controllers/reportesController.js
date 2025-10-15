const cloudinary = require("cloudinary").v2;
const db = require("../config/db");

// === CONFIGURAR CLOUDINARY ===
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// === CREAR REPORTE ===
exports.crearReporte = async (req, res) => {
  try {
    console.log("=== INICIANDO CREACIÓN DE REPORTE ===");
    console.log("Body recibido:", req.body);
    console.log("Archivos recibidos:", req.files ? req.files.length : 0);
    console.log("Usuario del token:", req.user);

    const usuario = req.user;
    const {
      titulo,
      descripcion,
      latitud,
      longitud,
      direccion,
      distrito,
      categoria, // nombre recibido desde el frontend
      estado_id = 1, // por defecto "Nuevo"
    } = req.body;

    // === VALIDACIONES ===
    if (!titulo || !descripcion || !categoria || !latitud || !longitud) {
      return res.status(400).json({
        error: "Faltan campos obligatorios.",
        detalles: { titulo, descripcion, categoria, latitud, longitud },
      });
    }

    if (!usuario || !usuario.id) {
      return res.status(401).json({ error: "Usuario no autenticado." });
    }

    // === SUBIR ARCHIVOS A CLOUDINARY ===
    let evidenciasSubidas = [];
    if (req.files && req.files.length > 0) {
      console.log(`Subiendo ${req.files.length} archivos a Cloudinary...`);

      for (const file of req.files) {
        try {
          const resultado = await cloudinary.uploader.upload(file.path, {
            resource_type: "auto",
            folder: "reportes_transito",
            quality: "auto",
            fetch_format: "auto",
          });

          const tipoArchivo =
            resultado.resource_type === "video" ? "video" : "foto";

          evidenciasSubidas.push({
            url: resultado.secure_url,
            tipo: tipoArchivo,
            public_id: resultado.public_id,
          });

          console.log(
            `Archivo subido correctamente: ${resultado.secure_url} (${tipoArchivo})`
          );
        } catch (err) {
          console.error("Error subiendo archivo a Cloudinary:", err.message);
        }
      }
    }

    // === INSERTAR REPORTE EN BD ===
    console.log("Insertando reporte en la base de datos...");

    const insertReporteQuery = `
      INSERT INTO reportes (
        titulo, descripcion, latitud, longitud, direccion, distrito,
        estado_id, ciudadano_id, categoria_id, fecha, hora
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 
        (SELECT id FROM categoria WHERE descripcion = $9 LIMIT 1),
        CURRENT_DATE, CURRENT_TIME
      )
      RETURNING id
    `;

    const insertValues = [
      titulo,
      descripcion,
      latitud,
      longitud,
      direccion,
      distrito,
      estado_id,
      usuario.id,
      categoria,
    ];

    const { rows } = await db.query(insertReporteQuery, insertValues);
    const idReporte = rows[0].id;
    console.log(`Reporte creado con ID: ${idReporte}`);

    // === INSERTAR EVIDENCIAS (si existen) ===
    if (evidenciasSubidas.length > 0) {
      console.log(`Insertando ${evidenciasSubidas.length} evidencias...`);
      const insertEvidenciaQuery = `
        INSERT INTO evidencias (reporte_id, url_archivo, tipo)
        VALUES ($1, $2, $3)
      `;

      for (const evidencia of evidenciasSubidas) {
        await db.query(insertEvidenciaQuery, [
          idReporte,
          evidencia.url,
          evidencia.tipo,
        ]);
      }

      console.log(`${evidenciasSubidas.length} evidencias insertadas.`);
    }

    // === RESPUESTA EXITOSA ===
    console.log("Reporte procesado completamente.");
    res.status(201).json({
      mensaje: "Reporte enviado correctamente.",
      reporte_id: idReporte,
      evidencias: evidenciasSubidas.length,
      datos: {
        titulo,
        categoria,
        ubicacion: { latitud, longitud },
        archivos_subidos: evidenciasSubidas.length,
      },
    });
  } catch (error) {
    console.error("Error al enviar reporte:", error);
    res.status(500).json({
      error: "Error interno del servidor.",
      detalles: error.message,
    });
  }
};
