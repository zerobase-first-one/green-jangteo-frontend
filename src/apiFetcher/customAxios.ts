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
    // const token =
    //   'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfQlVZRVIiLCJST0xFX1NFTExFUiJdLCJpYXQiOjE3MDI4Mjc1OTgsImV4cCI6MTcwMjgzNDc5OH0.lC3x1QDCtnyrH1VJrctOXQZx-dmJZJQMOeyh_ECdnJ8';
    const token = JSON.parse(localStorage.getItem('token') as string);

    if (token) {
      console.log('token', token);
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
