// api.js

import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
    baseURL: 'http://localhost:4000', // URL base del backend
    timeout: 10000, // Tiempo máximo de espera en ms
});

// Interceptor para agregar el token automáticamente a las peticiones
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Agrega token a headers
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar respuestas de error
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expirado o inválido: limpiar almacenamiento y redirigir
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Servicios de autenticación
export const authService = {
    // Login de usuario
    login: async (credentials) => {
        const payload = {
            correoODni: credentials.username,
            contrasena: credentials.password
        };
        return await api.post('/usuarios/login', payload);
    },
    
    // Registro de usuario
    register: async (userData) => {
        return await api.post('/usuarios', {
            dni: userData.dni,
            nombres: userData.nombres,
            apellido_paterno: userData.apellidos.split(' ')[0] || '',
            apellido_materno: userData.apellidos.split(' ')[1] || '',
            nro_celular: userData.celular,
            correo: userData.correo,
            contrasena: userData.contrasenia,
            rol: 'ciudadano'
        });
    },
    
    // Logout
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        localStorage.removeItem('usuario');
    },
    
    // Obtener perfil de usuario
    getProfile: async () => {
        return await api.get('/usuarios/perfil');
    },

    createUserAdmin: async (userData) => {
        const data = new FormData();
        data.append("dni", userData.dni);
        data.append("nombres", userData.nombres);
        data.append("apellido_paterno", userData.apellidos.split(" ")[0] || "");
        data.append("apellido_materno", userData.apellidos.split(" ")[1] || "");
        data.append("nro_celular", userData.celular);
        data.append("correo", userData.correo);
        data.append("contrasena", userData.contrasena);
        data.append("rol", userData.rol || "Usuario");

        if (userData.foto) {
            data.append("foto", userData.foto);
        }

        return await api.post("/usuarios", data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    }
};


// Exportar funciones individuales para uso directo
export const login = authService.login;
export const register = authService.register;
export const logout = authService.logout;
export const createUserAdmin = authService.createUserAdmin;

export default api;
