import axios, { AxiosError, AxiosInstance } from 'axios';

const customAxios: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

customAxios.interceptors.request.use(
  config => {
    // const token =
    //   'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfQlVZRVIiLCJST0xFX1NFTExFUiJdLCJpYXQiOjE3MDI5MjA1NDYsImV4cCI6MTcwMjkyNzc0Nn0.w3ReQGo0SQPdK8s_X0MOE5nUabqBkbX1TpxYmlNK3dA';
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
