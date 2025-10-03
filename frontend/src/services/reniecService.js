// services/reniecService.js
const BASE_URL = process.env.NODE_ENV === 'development' 
  ? ''                                // En desarrollo, React proxy
  : 'https://api.decolecta.com/v1';   // En producción, URL directa

const API_TOKEN = process.env.REACT_APP_DECOLECTA_TOKEN;

// cache para evitar consultas duplicadas
const cache = new Map();

export const consultarRENIEC = async (dni) => {
  // Validación 
  if (!dni || dni.length !== 8 || !/^\d+$/.test(dni)) {
    throw new Error('DNI debe tener 8 dígitos numéricos');
  }

  // Verificar cache
  if (cache.has(dni)) {
    const cached = cache.get(dni);
    if (cached) {
      console.log('Usando cache para DNI:', dni);
      return cached;
    }
    throw new Error('DNI no encontrado en RENIEC');
  }

  try {
    const url = process.env.NODE_ENV === 'development'
      ? `/v1/reniec/dni?numero=${dni}`
      : `${BASE_URL}/reniec/dni?numero=${dni}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    // console.log('Status de respuesta:', response.status);

    if (!response.ok) {
      // Manejar errores 
      if (response.status === 404) {
        cache.set(dni, null);
        throw new Error('DNI no encontrado en RENIEC');
      }
      if (response.status === 401) {
        throw new Error('Token de API inválido');
      }
      throw new Error(`Error ${response.status} en la consulta`);
    }

    const result = await response.json();

    // Manejar respuestas de error
    if (result.message === "not found" || result.error) {
      cache.set(dni, null);
      throw new Error('DNI no encontrado en RENIEC');
    }

    // Procesar respuesta exitosa
    if (result.first_name) {
      const userData = {
        nombres: result.first_name,
        apellidos: `${result.first_last_name} ${result.second_last_name}`.trim(),
        documentNumber: result.document_number,
        fullName: result.full_name,
        datosCompletos: result
      };
      
      cache.set(dni, userData);
      return userData;
    }

    throw new Error('Formato de respuesta no reconocido');

  } catch (error) {
    console.error('Error en consulta:', error.message);
    
    // Si es error de CORS aún, dar mensaje específico
    if (error.message.includes('Failed to fetch') || error.message.includes('CORS')) {
      console.error('Problema de CORS - Verifica la configuración del proxy');
    }
    
    throw error;
  }
};