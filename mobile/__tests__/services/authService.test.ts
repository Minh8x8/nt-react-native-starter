import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import api from '@/services/axiosInstance';
import {authService} from '@/services/authService';

jest.mock('@/services/axiosInstance', () => ({
  post: jest.fn(),
}));

jest.mock('react-native-keychain', () => ({
  setGenericPassword: jest.fn(),
  getGenericPassword: jest.fn(),
  resetGenericPassword: jest.fn(),
  ACCESSIBLE: {WHEN_UNLOCKED: 'WHEN_UNLOCKED'},
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('stores token and user on login', async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({
      data: {data: {token: 'abc123', user: {id: 1, name: 'Jane'}}},
    });

    const result = await authService.login('jane', 'pw');

    expect(api.post).toHaveBeenCalledWith('/login', {
      username: 'jane',
      password: 'pw',
    });
    expect(Keychain.setGenericPassword).toHaveBeenCalledWith(
      'access_token',
      'abc123',
      {accessible: 'WHEN_UNLOCKED'},
    );
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify({id: 1, name: 'Jane'}),
    );
    expect(result).toEqual({token: 'abc123', user: {id: 1, name: 'Jane'}});
  });

  it('clears secure storage on logout', async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({});

    await authService.logout();

    expect(api.post).toHaveBeenCalledWith('/logout');
    expect(Keychain.resetGenericPassword).toHaveBeenCalled();
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('user');
  });

  it('returns token when stored', async () => {
    (Keychain.getGenericPassword as jest.Mock).mockResolvedValueOnce({
      password: 'stored-token',
    });

    const token = await authService.getToken();

    expect(token).toBe('stored-token');
  });

  it('returns null when token retrieval throws', async () => {
    (Keychain.getGenericPassword as jest.Mock).mockRejectedValueOnce(
      new Error('failure'),
    );

    const token = await authService.getToken();
    expect(token).toBeNull();
  });

  it('parses user from storage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify({id: 2}),
    );

    const user = await authService.getUser();
    expect(user).toEqual({id: 2});
  });

  it('returns null when user not stored', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    const user = await authService.getUser();
    expect(user).toBeNull();
  });

  it('returns null when stored user JSON invalid', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('not-json');

    const user = await authService.getUser();
    expect(user).toBeNull();
  });
});
