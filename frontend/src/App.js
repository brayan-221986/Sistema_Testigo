import { Routes, Route, Link } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Registro from './pages/Registro';

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Inicio</Link> | <Link to="/login">Login</Link> |{' '}
        <Link to="/registro">Registro</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </div>
  );
}

export default App;
