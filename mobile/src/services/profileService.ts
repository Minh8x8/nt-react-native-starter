import api from './axiosInstance';

export const profileService = {
  getProfile: async () => {
    const response = await api.get('/user');
    return response.data.data;
  },
};
