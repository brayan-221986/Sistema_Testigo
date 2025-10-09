// services/osmService.js
// Servicio simulado que en el futuro se conectará al backend real

export async function obtenerReportesTrafico() {
  // Simulación de datos de tráfico en Cusco
  return [
    {
      id: 1,
      lat: -13.517088,
      lng: -71.978535,
      titulo: "Congestión en Av. de la Cultura",
      descripcion: "Tráfico pesado por obras viales. Evitar zona si es posible.",
    },
    {
      id: 2,
      lat: -13.522642,
      lng: -71.967912,
      titulo: "Corte temporal de vía",
      descripcion: "Desvío por desfile local cerca de la Plaza de Armas.",
    },
    {
      id: 3,
      lat: -13.531133,
      lng: -71.949441,
      titulo: "Accidente menor en San Sebastián",
      descripcion: "Vehículo detenido genera retraso moderado.",
    },
  ];
}
