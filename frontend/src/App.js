// App.js

import { Routes, Route } from 'react-router-dom';
import { AutentificacionProvider } from "./context/AutentificacionContext";

import Inicio from './pages/Inicio';
import SobreNosotros from './pages/SobreNosotros';
import Login from './pages/Login';
import Registro from './pages/Registro';
import CrearUsuario from './pages/crearUsuario';
import InstitucionColaboradoras from './pages/InstitucionesColaboradoras'
// Nuevas páginas
import AdminDashboard from './pages/AdminDashboard';
import AutoridadHome from './pages/AutoridadHome';
import ReportesRevision from './pages/ReportesRevision';
import ReportesArchivados from './pages/ReportesArchivados';
import CiudadanoHome from './pages/CiudadanoHome';
import CiudadanoNuevoReporte from './pages/NuevoReporte';
import EditarPerfil from './pages/EditarPerfil'; 
import EditarUsuarioAdmin from './pages/EditarUsuarioAdm';
import CiudadanoMisReportes from './pages/MisReportes';
import Reportes from './pages/Reportes';
import DetalleReporte from './pages/DetalleReporte';
import EstadisticasCiudadano from './pages/EstadisticasCiudadano';
import EstadisticasAutoridad from "./pages/EstadisticasAutoridad";
import EditarInstitucion from "./pages/EditarInstitucion";

import RutaPrivada from "./components/RutaPrivada"

function App() {
  return (
    <AutentificacionProvider>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />

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
          path="/admin/usuarios/:id"
          element={
            <RutaPrivada roles={["admin"]}>
              <EditarUsuarioAdmin />
            </RutaPrivada>
          }
        />
        <Route
          path="/admin/instituciones-colaboradoras"
          element={
            <RutaPrivada roles={["admin"]}>
              <InstitucionColaboradoras />
            </RutaPrivada>
          }
        />
        <Route 
          path="/admin/instituciones/:id/editar" 
          element={<EditarInstitucion />} 
        />
        <Route 
          path="/autoridad/home" 
          element={ 
            <RutaPrivada roles={["autoridad"]}>
              <AutoridadHome /> 
            </RutaPrivada> 
          } 
        />
        <Route 
          path="/autoridad/ReportesRevision" 
          element={ 
            <RutaPrivada roles={["autoridad"]}>
              <ReportesRevision /> 
            </RutaPrivada> 
          } 
        />

        <Route 
          path="/autoridad/ReportesArchivados" 
          element={ 
            <RutaPrivada roles={["autoridad"]}>
              <ReportesArchivados /> 
            </RutaPrivada> 
          } 
        />
        <Route 
          path="/autoridad/estadisticas" 
          element={
            <RutaPrivada roles={["autoridad"]}>
              <EstadisticasAutoridad />
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
        <Route 
          path="/ciudadano/Nuevo-reporte" 
          element={ 
            <RutaPrivada roles={["ciudadano"]}>
              <CiudadanoNuevoReporte /> 
            </RutaPrivada> 
          } 
        />
        <Route 
          path="/ciudadano/EstadisticasCiudadano" 
          element={ 
            <RutaPrivada roles={["ciudadano"]}>
              <EstadisticasCiudadano /> 
            </RutaPrivada> 
          } 
        />
        <Route 
          path="/ciudadano/Mis-reportes" 
          element={ 
            <RutaPrivada roles={["ciudadano"]}>
              <CiudadanoMisReportes /> 
            </RutaPrivada> 
          } 
        />

        <Route 
          path="/ciudadano/Mis-reportes/:id" 
          element={ 
            <RutaPrivada roles={["ciudadano"]}>
              <DetalleReporte /> 
            </RutaPrivada> 
          } 
        />

        <Route 
          path="/autoridad/Mis-reportes/:id" 
          element={ 
            <RutaPrivada roles={["autoridad"]}>
              <DetalleReporte /> 
            </RutaPrivada> 
          } 
        />

        {/* Ruta para editar perfil: requiere autenticación, cualquier rol */}
        <Route
          path="/perfil"
          element={
            <RutaPrivada>
              <EditarPerfil />
            </RutaPrivada>
          }
        />
        <Route path="/reportes" element={<Reportes />} />
        <Route 
          path="/reportes/:id" 
          element={ 
            <RutaPrivada>
              <DetalleReporte /> 
            </RutaPrivada> 
          } 
        />
      </Routes>
    </AutentificacionProvider>
  );
}

export default App;
