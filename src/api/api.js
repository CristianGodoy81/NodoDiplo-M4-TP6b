import axios from "axios";

export const api = axios.create({
  // Utilizamos la variable de entorno de Vite, o la de localhost como respaldo
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

// interceptor token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});