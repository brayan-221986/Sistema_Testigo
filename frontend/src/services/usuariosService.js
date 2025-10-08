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

/**
 * Obtener un usuario por su ID
 */
export const getUsuarioPorId = async (id) => {
  try {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener usuario con ID ${id}:`, error);
    throw error;
  }
};

/**
 * Editar un usuario por su ID para el admin
 */
export const updateUsuarioById = async (id, data) => {
  try {
    const response = await api.put(`/usuarios/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar usuario con id ${id}:`, error);
    throw error;
  }
};