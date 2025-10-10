import Navbar from "../components/Navbar.jsx";
import "../style/inicio.css";
import Mapa from "../components/mapaInicio.jsx";
import ReportesCarousel from "../components/ReportesCarousel";

export default function Inicio() {
  return (
    <div>
        <Navbar />

        {/* SECCION MAPA */}
        <section className="seccion-mapa">
            <h2>Mapa de reportes</h2>
            <Mapa />
        </section>


      {/* SECCION REPORTES */}
      <ReportesCarousel/>

      {/* DIVISOR */}
      <div className="divisor">
        <div className="linea"></div>
        <div className="circulo"></div>
        <div className="linea"></div>
      </div>

      {/* SECCIÓN ESTADÍSTICAS */}
      <section className="seccion-estadisticas">
        {/* TARJETA 1 */}
        <div className="item-estadistica tarjeta1">
          <div className="encabezado">
            <img src="/megafono-img.png" alt="Reportes" />
            <h2>750</h2>
          </div>
          <div className="texto-mejora">
            <span>Denuncias recibidas</span>
            <span>hasta la fecha.</span>
          </div>
        </div>

        {/* TARJETA 2 */}
        <div className="item-estadistica tarjeta2">
          <div className="rosquilla">
            <div className="rosquilla-interna"></div>
            <div className="porcentaje">75%</div>
          </div>
          <p>Tasa de resolución</p>
        </div>

        {/* TARJETA 3 */}
        <div className="item-estadistica tarjeta3">
          <p className="titulo">Tiempo promedio de respuesta</p>

          {/* Agrupamos el número y la unidad */}
          <div className="valor-tiempo">
            <h2>12</h2>
            <p className="unidad">horas</p>
          </div>

          <div className="mejora">
            <img src="/flecha-abajo.png" alt="Baja" />
            <div className="texto-mejora">
              <span>Se redujo 3 horas</span>
              <span>en el último mes.</span>
            </div>
          </div>
        </div>

      </section>


      {/* PIE DE PAGINA */}
      <footer className="pie">
        <div className="contenido-pie">
          <div className="logo-pie">
            <img src="/logo.png" alt="testiGO logo" />
          </div>

          <div className="enlaces-pie">
            <a href="/">Inicio</a>
            <a href="/sobre-nosotros">Sobre Nosotros</a>
          </div>

          <div className="contacto-pie" >
            <p>Contacto: soporte@testigo.com</p>
            <p>Tel: +51 999 999 999</p>
          </div>
        </div>

        <div className="copy-pie">
          © 2025 testiGO — Todos los derechos reservados
        </div>
      </footer>

    </div>
  );
}
