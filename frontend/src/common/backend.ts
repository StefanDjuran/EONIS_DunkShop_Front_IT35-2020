import axios from "axios";

const backend = axios.create({
    baseURL: "https://localhost:7084/api",
});

backend.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  
export default backend;