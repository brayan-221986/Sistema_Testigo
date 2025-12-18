// reniecService.js
import api from './api';

// Cache para evitar consultas repetidas
const cache = new Map();

export const consultarRENIEC = async (dni) => {
  // Validación básica del DNI
  if (!dni || dni.length !== 8 || !/^\d+$/.test(dni)) {
    throw new Error('DNI debe tener 8 dígitos numéricos');
  }

  // Cache
  if (cache.has(dni)) {
    const cached = cache.get(dni);
    if (cached) {
      console.log('Usando cache para DNI:', dni);
      return cached;
    }
    throw new Error('DNI no encontrado en RENIEC');
  }

  try {
    // 👇 LLAMADA AL BACKEND, NO A DECOLECTA
    const response = await api.get(`/reniec/${dni}`);
    const result = response.data;

    // Validación respuesta
    if (!result || result.error) {
      cache.set(dni, null);
      throw new Error('DNI no encontrado en RENIEC');
    }

    const userData = {
      nombres: result.nombres || result.first_name,
      apellidos:
        result.apellidos ||
        `${result.first_last_name || ''} ${result.second_last_name || ''}`.trim(),
      documentNumber: dni,
      datosCompletos: result
    };

    cache.set(dni, userData);
    return userData;

  } catch (error) {
    console.error('Error RENIEC:', error.message || error);
    throw error;
  }
};
