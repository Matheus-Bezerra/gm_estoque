import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('@gm_estoque/token'); // Pega o token do localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Adiciona o token no cabeçalho
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            console.log('Token expirado. Faça o logout ou tente renovar o token.');
            localStorage.removeItem('@gm_estoque/token');
        }
        return Promise.reject(error);
    }
);
