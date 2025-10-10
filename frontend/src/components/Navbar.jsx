import { useState } from "react";
import { Link } from "react-router-dom";
import "../style/Navbar.css";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const alternarMenu = () => setMenuAbierto(!menuAbierto);
  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <nav className="barra-navegacion">
      <div className="contenedor-nav">
        {/* LOGO */}
        <Link to="/" className="logo-nav" onClick={cerrarMenu}>
          <img src="/logo.png" alt="logo testigo" />
        </Link>

        {/* BOTON MENU (solo movil) */}
        <button
          className={`boton-menu ${menuAbierto ? "abierto" : ""}`}
          onClick={alternarMenu}
          aria-label="Abrir menu"
        >
          ☰
        </button>

        {/* LINKS */}
        <ul className={`enlaces-nav ${menuAbierto ? "activo" : ""}`}>
          <li>
            <Link to="/" onClick={cerrarMenu} style={{ color: "black" }}>
                Inicio
            </Link>
          </li>
          <li>
            <Link to="/sobre-nosotros" onClick={cerrarMenu} style={{ color: "#00871D" }}>
              Sobre Nosotros
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={cerrarMenu} className="boton-nav">
              Iniciar Sesion / Registro
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
