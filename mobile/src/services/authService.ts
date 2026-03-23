import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './axiosInstance';

export const authService = {
  async login(username: string, password: string) {
    const response = await api.post('/login', {
      username,
      password,
    });
    const token = response.data.data.token;
    await AsyncStorage.setItem('access_token', token);

    return response.data.data;
  },

  async logout() {
    await api.post('/logout');
    await AsyncStorage.removeItem('access_token');
  },

  async getToken() {
    return AsyncStorage.getItem('access_token');
  },
};
