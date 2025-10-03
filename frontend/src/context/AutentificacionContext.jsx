import React, { createContext, useContext, useState, useEffect } from "react";
import { login as loginService, logout as logoutService } from "../services/api";

const AutentificacionContext = createContext();

export const AutentificacionProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  // Al montar, leer localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUsuario(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // Iniciar sesión
  const login = async (credentials) => {
    const response = await loginService(credentials);
    const { token, usuario } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));

    setUsuario(usuario);
    setToken(token);

    return usuario; // devolvemos el usuario para redirección
  };

  // Cerrar sesión
  const logout = () => {
    logoutService();
    setUsuario(null);
    setToken(null);
  };

  return (
    <AutentificacionContext.Provider value={{ usuario, token, login, logout }}>
      {children}
    </AutentificacionContext.Provider>
  );
};

// Hook para usarlo en cualquier parte
export const useAutentificacion = () => useContext(AutentificacionContext);
