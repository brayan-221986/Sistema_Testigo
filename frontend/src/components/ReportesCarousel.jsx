import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../style/reportesCarousel.css";

export default function CarruselReportes() {
  const listaReportes = [
    {
      id: 1,
      titulo: "Congestión en Av. de la Cultura",
      subtitulo: "Tráfico urbano",
      imagen: "/auto.jpg",
      ubicacion: "📍 Cusco",
      tiempo: "⏰ Hace 15 min",
      descripcion: "Alta congestión vehicular por obras viales.",
    },
    {
      id: 2,
      titulo: "Corte temporal de vía",
      subtitulo: "Evento local",
      imagen: "/auto.jpg",
      ubicacion: "📍 Plaza de Armas, Cusco",
      tiempo: "⏰ Hace 1 h",
      descripcion: "Desvío de tránsito por actividades culturales.",
    },
    {
      id: 3,
      titulo: "Accidente menor",
      subtitulo: "Zona residencial",
      imagen: "/auto.jpg",
      ubicacion: "📍 San Sebastián",
      tiempo: "⏰ Hace 2 h",
      descripcion: "Vehículo detenido genera tráfico leve.",
    },
    {
      id: 4,
      titulo: "Calle bloqueada por manifestación",
      subtitulo: "Protesta",
      imagen: "/auto.jpg",
      ubicacion: "📍 Wanchaq",
      tiempo: "⏰ Hace 30 min",
      descripcion: "Manifestantes bloquean parcialmente la vía principal.",
    },
  ];

  return (
    <section className="seccion-reportes">
      <h2>Reportes recientes</h2>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="contenedor-tarjetas"
      >
        {listaReportes.map((reporte) => (
          <SwiperSlide key={reporte.id}>
            <div className="tarjeta-reporte">
              <img src={reporte.imagen} alt={reporte.titulo} />
              <div className="info-tarjeta">
                <h3>{reporte.titulo}</h3>
                <p className="subtitulo">{reporte.subtitulo}</p>
                <div className="fila">
                  <span>{reporte.ubicacion}</span>
                  <span>{reporte.tiempo}</span>
                </div>
                <p>{reporte.descripcion}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
