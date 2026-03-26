import api from './axiosInstance';
import {profileLocalDb} from './profileLocalDb';
import {User} from '../models/user';

export const profileService = {
  /**
   * Fetch profile from API and persist to local SQLite
   */
  async getProfile(): Promise<User> {
    const response = await api.get('/user');
    const profile: User = response.data.data;
    await profileLocalDb.upsertProfile(profile);
    return profile;
  },

  /**
   * Read profile cached locally (SQLite)
   */
  async getLocalProfile(): Promise<User | null> {
    return profileLocalDb.getProfile();
  },

  /**
   * Update profile on server then persist locally
   */
  async updateProfile(profileData: {
    age?: number;
    firstName?: string;
    lastName?: string;
  }): Promise<User> {
    const response = await api.patch('/user', profileData);
    const profile: User = response.data.data;
    await profileLocalDb.upsertProfile(profile);
    return profile;
  },

  async clearLocalProfile() {
    await profileLocalDb.clear();
  },
};
