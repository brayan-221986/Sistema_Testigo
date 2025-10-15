// services/osmService.js
// Servicio simulado que en el futuro se conectará al backend real

export async function obtenerReportesTrafico() {
  // Simulación de datos de tráfico en Cusco
  return [
    {
    id: 1,
    titulo: "Congestión en Av. de la Cultura",
    subtitulo: "Tráfico urbano",
    imagen: "/auto.jpg",
    ubicacion: "📍 Av. de la Cultura, Cusco",
    tiempo: "⏰ Hace 15 min",
    descripcion: "Alta congestión vehicular por obras viales.",
    lat: -13.5295277,
    lng: -71.9343954,
  },
  {
    id: 2,
    titulo: "Corte temporal de vía",
    subtitulo: "Evento local",
    imagen: "/auto.jpg",
    ubicacion: "📍 Plaza de Armas, Cusco",
    tiempo: "⏰ Hace 1 h",
    descripcion: "Desvío de tránsito por actividades culturales.",
    lat: -13.5213787,
    lng: -71.9858249,
  },
  {
    id: 3,
    titulo: "Accidente menor",
    subtitulo: "Zona residencial",
    imagen: "/auto.jpg",
    ubicacion: "📍 San Sebastián, Cusco",
    tiempo: "⏰ Hace 2 h",
    descripcion: "Vehículo detenido genera tráfico leve.",
    lat: -13.5370,
    lng: -71.9188,
  },
  {
    id: 4,
    titulo: "Calle bloqueada por manifestación",
    subtitulo: "Protesta",
    imagen: "/auto.jpg",
    ubicacion: "📍 Wanchaq, Cusco",
    tiempo: "⏰ Hace 30 min",
    descripcion: "Manifestantes bloquean parcialmente la vía principal.",
    lat: -13.5253,
    lng: -71.9635,
  },
  ];
}
