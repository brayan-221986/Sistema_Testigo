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
        const payload = {
            correoODni: credentials.username,
            contrasena: credentials.password
        };
        return await api.post('/usuarios/login', payload);
    },
    
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
    
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        localStorage.removeItem('usuario');
    },
    
    getProfile: async () => {
        return await api.get('/usuarios/perfil');
    }
};

// Exportar funciones individuales para uso directo
export const login = authService.login;
export const register = authService.register;
export const logout = authService.logout;

export default api;