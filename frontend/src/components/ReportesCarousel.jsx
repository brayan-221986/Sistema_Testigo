// components/ReportesCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../style/reportesCarrousel.css";

export default function ReportesCarousel() {
  const reportes = [
    {
      id: 1,
      titulo: "Congestión en Av. de la Cultura",
      subtitulo: "Tráfico urbano",
      img: "/auto-img.png",
      ubicacion: "📍 Cusco",
      tiempo: "⏰ Hace 15 min",
      descripcion: "Alta congestión vehicular por obras viales.",
    },
    {
      id: 2,
      titulo: "Corte temporal de vía",
      subtitulo: "Evento local",
      img: "/megafono-img.png",
      ubicacion: "📍 Plaza de Armas, Cusco",
      tiempo: "⏰ Hace 1 h",
      descripcion: "Desvío de tránsito por actividades culturales.",
    },
    {
      id: 3,
      titulo: "Accidente menor",
      subtitulo: "Zona residencial",
      img: "/auto-img.png",
      ubicacion: "📍 San Sebastián",
      tiempo: "⏰ Hace 2 h",
      descripcion: "Vehículo detenido genera tráfico leve.",
    },
  ];

  return (
    <section className="seccion-reportes">
      <h2>Reportes recientes</h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="contenedor-tarjetas"
      >
        {reportes.map((r) => (
          <SwiperSlide key={r.id}>
            <div className="tarjeta-reporte">
              <h3>{r.titulo}</h3>
              <p className="subtitulo">{r.subtitulo}</p>
              <img src={r.img} alt={r.titulo} />
              <div className="info-tarjeta">
                <div className="fila">
                  <span>{r.ubicacion}</span>
                  <span>{r.tiempo}</span>
                </div>
                <p>{r.descripcion}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
