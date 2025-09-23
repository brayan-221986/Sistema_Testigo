import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000', // URL de tu backend
});

// Si tienes token guardado en localStorage, lo envía en cada request:
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
