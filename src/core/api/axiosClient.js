import axios from 'axios';
import { store } from '../../app/store';
import { logout } from '../../presentation/redux/authSlice';
import { decodeToken, isTokenExpired } from '../utils/jwt';

export const api = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.request.use(
  config => {
    const state = store.getState();
    const token = state.auth.token;

    if (token) {
      const decoded = decodeToken(token);

      if (isTokenExpired(decoded.expireDate)) {
        store.dispatch(logout());
        throw new Error('Token expirado');
      }

      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
