import axios, { AxiosError, AxiosInstance } from 'axios';
import { BASE_URL } from '../constant/union';

const customAxios: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

customAxios.interceptors.request.use(
  config => {
    const token = JSON.parse(localStorage.getItem('token') as string);

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

customAxios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(error);
    const err = error as AxiosError;
    return Promise.reject(err);
  },
);

export default customAxios;
