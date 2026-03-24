import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './axiosInstance';

export const authService = {
  async login(username: string, password: string) {
    const response = await api.post('/login', {
      username,
      password,
    });
    const token = response.data.data.token;
    const user = response.data.data.user;
    await AsyncStorage.setItem('access_token', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));

    return response.data.data;
  },

  async logout() {
    await api.post('/logout');
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('user');
  },

  async getToken() {
    return AsyncStorage.getItem('access_token');
  },

  async getUser() {
    const userJson = await AsyncStorage.getItem('user');
    if (!userJson) {
      return null;
    }
    try {
      return JSON.parse(userJson);
    } catch (err) {
      return null;
    }
  },
};
