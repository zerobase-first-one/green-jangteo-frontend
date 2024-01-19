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

    if (config.headers && token) {
      const { refreshToken } = JSON.parse(
        localStorage.getItem('refreshToken') as string,
      );
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers.refreshToken = `Bearer ${refreshToken}`;
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
  async error => {
    console.log(error);
    const err = error as AxiosError;

    if (err.status === 401) {
      if (err.message === 'expired') {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem('refreshToken');

        const { data } = await axios.post(
          `${BASE_URL}/token`,
          {},
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
          },
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          data;
        await localStorage.multiSet([
          ['token', newAccessToken],
          ['refreshToken', newRefreshToken],
        ]);

        originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }
    }

    return Promise.reject(err);
  },
);

export default customAxios;
