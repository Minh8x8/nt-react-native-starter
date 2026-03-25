import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './axiosInstance';

const TOKEN_KEY = 'access_token';

export const authService = {
  async login(username: string, password: string) {
    const response = await api.post('/login', {
      username,
      password,
    });
    const token = response.data.data.token;
    const user = response.data.data.user;
    console.log('Login successful, token stored securely');
    await Keychain.setGenericPassword(TOKEN_KEY, token, {
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
    });
    await AsyncStorage.setItem('user', JSON.stringify(user));
    return response.data.data;
  },

  async logout() {
    await api.post('/logout');
    await Keychain.resetGenericPassword();
    await AsyncStorage.removeItem('user');
  },

  async getToken() {
    try {
      const credentials = await Keychain.getGenericPassword();

      if (credentials) {
        return credentials.password;
      }

      return null;
    } catch (error) {
      return null;
    }
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
