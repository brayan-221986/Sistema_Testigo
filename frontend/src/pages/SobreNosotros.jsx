import React from "react";
import Navbar from "../components/Navbar.jsx";
import "../style/SobreNosotros.css";

export default function SobreNosotros() {
  return (
    <div>
      <Navbar />

      {/* SECCIÓN MISION Y VISION */}
      <section className="seccion-mision-vision">
        <div className="bloque">
          <h2>MISIÓN</h2>
          <p>
            Somos una plataforma que promueve la transparencia y seguridad en el
            transporte público mediante la gestión digital de denuncias. Nuestro
            objetivo es ofrecer a los ciudadanos un medio eficiente para
            reportar, hacer seguimiento y contribuir a la mejora del sistema de
            transporte urbano.
          </p>
        </div>

        <div className="bloque">
          <h2>VISIÓN</h2>
          <p>
            Convertirnos en una herramienta de referencia nacional para la
            gestión de denuncias y control del transporte público, fortaleciendo
            la confianza entre los usuarios, conductores y las autoridades
            competentes.
          </p>
        </div>
      </section>

      {/* DIVISOR */}
      <div className="divisor-sobre-nosotros">
        <div className="linea"></div>
        <div className="circulo"></div>
        <div className="linea"></div>
      </div>

      {/* SECCIÓN PROBLEMÁTICA */}
      <section className="seccion-problematica">
        <h2>La Problemática que Resolvemos</h2>
        <p>
          En muchas ciudades, los usuarios del transporte público enfrentan
          situaciones de incumplimiento de rutas, cobros indebidos, maltrato o
          accidentes sin una vía efectiva para denunciar. Nuestra plataforma
          busca centralizar estas denuncias, permitiendo su trazabilidad y
          mejorando la respuesta de las autoridades. Con esto, se impulsa un
          transporte más justo, seguro y confiable para todos.
        </p>
      </section>

      {/* SECCIÓN EQUIPO */}
      <section className="seccion-equipo">
        <h2>EL EQUIPO</h2>
        <p className="descripcion-equipo">
          Este proyecto ha sido desarrollado por estudiantes de la Universidad
          Nacional de San Antonio Abad del Cusco (UNSAAC) como iniciativa del
          curso de Desarrollo de Software I, enfocado en crear soluciones que
          atiendan las necesidades de la ciudadanía y las autoridades de Cusco.
        </p>

        <div className="contenedor-tarjetas">
            <div className="tarjeta-equipo">
                <img src="/usuario-img.jpg" alt="Foto de Oscar Barrientos" className="foto-equipo" />
                <h3>Oscar Barrientos</h3>
                <p className="rol">Product Owner</p>
                <button>Contactar</button>
            </div>

            <div className="tarjeta-equipo">
                <img src="/usuario-img.jpg" alt="Foto de Denis Cancinas" className="foto-equipo" />
                <h3>Denis Cancinas</h3>
                <p className="rol">SCRUM Master</p>
                <button>Contactar</button>
            </div>

            <div className="tarjeta-equipo">
                <img src="/usuario-img.jpg" alt="Foto de Brayan Quispe" className="foto-equipo" />
                <h3>Brayan Quispe</h3>
                <p className="rol">Dev Senior</p>
                <button>Contactar</button>
            </div>

            <div className="tarjeta-equipo">
                <img src="/usuario-img.jpg" alt="Foto de Richard Rodriguez" className="foto-equipo" />
                <h3>Richard Rodriguez</h3>
                <p className="rol">QA Tester</p>
                <button>Contactar</button>
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
            <a href="/sobreNosotros">Sobre Nosotros</a>
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
