import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Redirect to login on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const schemeAPI = {
  getAll: (page = 0, size = 9) => api.get(`/schemes?page=${page}&size=${size}`),
  getById: (id) => api.get(`/schemes/${id}`),
  search: (keyword, page = 0, size = 9) => api.get(`/schemes/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`),
};

export const eligibilityAPI = {
  check: (data) => api.post('/public/eligibility/check', data),
};

export default api;
