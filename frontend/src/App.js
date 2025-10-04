// App.js

import { Routes, Route } from 'react-router-dom';
import { AutentificacionProvider } from "./context/AutentificacionContext";

import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Registro from './pages/Registro';
import CrearUsuario from './pages/crearUsuario';

// Nuevas páginas
import AdminDashboard from './pages/AdminDashboard';
import InstitucionHome from './pages/InstitucionHome';
import CiudadanoHome from './pages/CiudadanoHome';

import RutaPrivada from "./components/RutaPrivada"

function App() {
  return (
    // Contexto de autenticación disponible para toda la app
    <AutentificacionProvider>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        
        {/* Rutas protegidas por rol */}
        <Route 
          path="/admin/dashboard" 
          element={ 
            <RutaPrivada roles={["admin"]}>
              <AdminDashboard /> 
            </RutaPrivada> 
          } 
        />
        <Route 
          path="/institucion/home" 
          element={ 
            <RutaPrivada roles={["institucion"]}>
              <InstitucionHome /> 
            </RutaPrivada> 
          } 
        />
        <Route 
          path="/ciudadano/home" 
          element={ 
            <RutaPrivada roles={["ciudadano"]}>
              <CiudadanoHome /> 
            </RutaPrivada> 
          } 
        />

        {/* Ruta para creación de usuario, accesible públicamente (si es intencional) */}
        <Route path="/crearUsuario" element={<CrearUsuario />} />
      </Routes>
    </AutentificacionProvider>
  );
}

export default App;
