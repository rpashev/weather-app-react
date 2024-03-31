import axios from 'axios';

let http = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BASE_URL}`,
});

http.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ` + token;
  config.headers.withCredentials = true;

  return config;
});

export { http };
