import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 10000,
});

// Interceptor para agregar el token automáticamente a las peticiones
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
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
            // Token expirado o inválido
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Servicios de autenticación
export const authService = {
    login: async (credentials) => {
        return await api.post('/api/auth/login', credentials);
    },
    
    register: async (userData) => {
        return await api.post('/api/auth/register', userData);
    },
    
    logout: () => {
        localStorage.removeItem('token');
    },
    
    getProfile: async () => {
        return await api.get('/api/auth/profile');
    }
};

// Exportar funciones individuales para uso directo
export const login = authService.login;
export const register = authService.register;
export const logout = authService.logout;

export default api;