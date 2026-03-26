import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import env from '../config/env';
import {authService} from './authService';

const api = axios.create({
  baseURL: env.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ─── Request interceptor ─────────────────────────────
api.interceptors.request.use(
  async config => {
    const token = await authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('🚀 REQUEST:');
    console.log('URL:', config.baseURL + config.url);
    console.log('Method:', config.method);
    console.log('Headers:', config.headers);
    console.log('Data:', config.data);
    console.log('Params:', config.params);
    return config;
  },
  error => Promise.reject(error),
);

// ─── Response interceptor ────────────────────────────
api.interceptors.response.use(
  response => {
    console.log('✅ RESPONSE:');
    console.log('URL:', response.config.baseURL + response.config.url);
    console.log('Status:', response.status);
    console.log('Data:', response.data);
    return response;
  },
  async error => {
    const status = error.response?.status;
    console.log('❌ ERROR RESPONSE');
    if (error.response) {
      console.log('URL:', error.config?.url);
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    } else {
      console.log('Error message:', error.message);
    }
    if (status === 401) {
      // Token hết hạn → xóa token, về màn Login
      await AsyncStorage.removeItem('access_token');
      // navigate về Login ở đây nếu cần (xem ghi chú bên dưới)
    }

    if (status === 403) {
      console.warn('Không có quyền truy cập');
    }

    if (status >= 500) {
      console.error('Lỗi server:', error.response?.data);
    }

    return Promise.reject(error);
  },
);

export default api;
