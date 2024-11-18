import axios from 'axios';

const instanceAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  //baseURL: "http://localhost:3000/api",
});

instanceAxios.interceptors.request.use((config) => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

export default instanceAxios;