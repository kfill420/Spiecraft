import axios from 'axios';

const instanceAxios = axios.create({
  baseURL: import.meta.env.VUE_APP_BASE_URL,
});

instanceAxios.interceptors.request.use((config) => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

export default instanceAxios;