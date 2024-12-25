import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://185.87.252.198:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - token eklemek için
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - hata yönetimi için
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
