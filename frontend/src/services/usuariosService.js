// src/services/usuariosService.js
import api from './api'; // ya tienes configurado axios con baseURL y token

export const getUsuarios = async () => {
  try {
    const response = await api.get('/usuarios');
    return response.data; // aquí vendrán los usuarios
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};
