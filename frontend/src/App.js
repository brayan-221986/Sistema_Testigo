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
        
        {/* Crear usuario solo para admin */}
        <Route 
          path="/admin/crear-usuario" 
          element={
            <RutaPrivada roles={["admin"]}>
              <CrearUsuario />
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
      </Routes>
    </AutentificacionProvider>
  );
}

export default App;
