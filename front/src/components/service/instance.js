import axios from 'axios';

const instanceAxios = axios.create({
  baseURL: "https://poivre-back.vercel.app/api/",
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