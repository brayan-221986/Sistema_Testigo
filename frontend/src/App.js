import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Registro from './pages/Registro';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </div>
  );
}

export default App;
