import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Registro from './pages/Registro';
import CrearUsuario from './pages/crearUsuario';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/crearUsuario" element={<CrearUsuario />} />
      </Routes>
    </div>
  );
}

export default App;
