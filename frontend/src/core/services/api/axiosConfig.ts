// src/core/services/api/axiosConfig.ts
import axios from 'axios';
// import { getAuthToken } from '@/core/utils/auth'; // Exemplo: pegar token JWT

// Configuração base
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/', // URL do backend
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});

// Interceptor para adicionar token JWT
// api.interceptors.request.use((config) => {
//   const token = getAuthToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// Interceptor para tratar erros globais
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirecionar para login se não autorizado
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);