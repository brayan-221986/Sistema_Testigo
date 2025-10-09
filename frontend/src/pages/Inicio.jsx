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
            <div className="contenedor-mapa">
                <Mapa />
            </div>
        </section>


      {/* SECCION REPORTES */}
      <section className="seccion-reportes">
        <ReportesCarousel/>
      </section>

      {/* DIVISOR */}
      <div className="divisor">
        <div className="linea"></div>
        <div className="circulo"></div>
        <div className="linea"></div>
      </div>

      {/* SECCION ESTADISTICAS */}
      <section className="seccion-estadisticas">
        <div className="item-estadistica">
          <img src="/megafono-img.png" alt="Reportes" />
          <h2>320</h2>
          <p>Reportes activos</p>
        </div>

        <div className="item-estadistica">
          <div className="rosquilla">
            <div className="rosquilla-interna">75%</div>
          </div>
          <p>Eficiencia de respuesta</p>
        </div>

        <div className="item-estadistica">
          <img src="/auto-img.png" alt="Casos resueltos" />
          <h2>240</h2>
          <p>Casos resueltos</p>
          <div className="mejora">
            <img src="/flecha-img.png" alt="Sube" />
            <span>+10% este mes</span>
          </div>
        </div>
      </section>

      {/* PIE DE PAGINA */}
      <footer className="pie">
        <div className="contenido-pie">
          <div className="logo-pie">
            <img src="/logo.png" alt="testiGO logo" />
            <h3>testiGO</h3>
          </div>

          <div className="enlaces-pie">
            <a href="/">Inicio</a>
            <a href="/reportar">Reportar</a>
            <a href="/mapa">Mapa</a>
            <a href="/contacto">Contacto</a>
          </div>

          <div>
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
