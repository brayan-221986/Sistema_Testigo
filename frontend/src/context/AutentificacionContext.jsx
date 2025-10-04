import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { login as loginService } from "../services/api";
import {jwtDecode} from 'jwt-decode';

const AutentificacionContext = createContext();

// Tiempo de inactividad y aviso previo en ms
const TIMEOUT_INACTIVITY = 15 * 60 * 1000; // 15 min
const TIMEOUT_WARNING = 2 * 60 * 1000;     // 2 min antes de cerrar

export const AutentificacionProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null); // Estado usuario
  const [token, setToken] = useState(null);     // Estado token JWT

  const timeoutRef = useRef(null);  // Ref para timeout de cierre
  const warningRef = useRef(null);  // Ref para aviso de expiración

  // Función para cerrar sesión
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
    setToken(null);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningRef.current) clearTimeout(warningRef.current);

  }, []);

  // Reinicia los timers de inactividad
  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningRef.current) clearTimeout(warningRef.current);

    // Aviso previo antes de cerrar sesión
    warningRef.current = setTimeout(() => {
      const continuar = window.confirm("Tu sesión está por expirar. ¿Deseas continuar?");
      if (continuar) resetTimeout();
      else logout();
    }, TIMEOUT_INACTIVITY - TIMEOUT_WARNING);

    timeoutRef.current = setTimeout(logout, TIMEOUT_INACTIVITY);
  }, [logout]);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("usuario"));
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        let decoded;
        try {
          decoded = jwtDecode(storedToken); // Decodifica token
        } catch {
          console.warn("Token inválido, cerrando sesión");
          logout();
          return;
        }

        const ahora = Date.now() / 1000;
        if (decoded.exp && decoded.exp < ahora) {
          console.warn("Token expirado, cerrando sesión");
          logout();
          return;
        }

        setUsuario(storedUser);
        setToken(storedToken);

        // Agrega eventos para reiniciar timeout por actividad
        const events = ['click', 'mousemove', 'keydown', 'scroll'];
        events.forEach(event => window.addEventListener(event, resetTimeout));
        resetTimeout();

        return () => {
          events.forEach(event => window.removeEventListener(event, resetTimeout));
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          if (warningRef.current) clearTimeout(warningRef.current);
        };
      }
    } catch (e) {
      console.error("Error leyendo usuario/token:", e);
      logout();
    }
  }, [logout, resetTimeout]);

  // Función para iniciar sesión
  const login = async (credentials) => {
    const response = await loginService(credentials);
    const { token, usuario } = response.data;

    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('token', token);
    setUsuario(usuario);
    setToken(token);

    resetTimeout(); // Inicia el timeout de inactividad
    return usuario;
  };

  return (
    <AutentificacionContext.Provider value={{ usuario, token, login, logout }}>
      {children}
    </AutentificacionContext.Provider>
  );
};

// Hook para usar el contexto
export const useAutentificacion = () => useContext(AutentificacionContext);
