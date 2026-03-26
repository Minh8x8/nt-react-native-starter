import {act, renderHook, waitFor} from '@testing-library/react-native';

import {useProfileForm} from '@/screens/profile/hooks/useProfileForm';
import {profileService} from '@/services/profileService';
import {User} from '@/models/user';

var mockToastShow = jest.fn();

jest.mock('@/services/profileService', () => ({
  profileService: {
    getLocalProfile: jest.fn(),
    getProfile: jest.fn(),
    updateProfile: jest.fn(),
  },
}));

jest.mock('react-native-toast-message', () => ({
  __esModule: true,
  default: {show: jest.fn()},
  show: mockToastShow,
}));

const baseUser: User = {
  id: 1,
  username: 'jdoe',
  email: 'jdoe@example.com',
  age: 30,
  role: 'user',
  firstName: 'John',
  lastName: 'Doe',
  createdAt: '',
  updatedAt: '',
};

describe('useProfileForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockToastShow = require('react-native-toast-message').default.show;

    (profileService.getLocalProfile as jest.Mock).mockResolvedValue(null);
    (profileService.getProfile as jest.Mock).mockResolvedValue(baseUser);
    (profileService.updateProfile as jest.Mock).mockResolvedValue(baseUser);
  });

  it('loadProfile with no cached profile fetches remote data', async () => {
    const freshUser = {...baseUser, firstName: 'Fresh'};
    (profileService.getLocalProfile as jest.Mock).mockResolvedValue(null);
    (profileService.getProfile as jest.Mock).mockResolvedValue(freshUser);
    const setUserProfile = jest.fn();

    const {result} = renderHook(() =>
      useProfileForm({user: null, setUserProfile}),
    );

    await act(async () => {
      await result.current.loadProfile();
    });

    await waitFor(() => {
      expect(result.current.loadingProfile).toBe(false);
      expect(result.current.profile).toEqual(freshUser);
    });

    expect(profileService.getLocalProfile).toHaveBeenCalled();
    expect(profileService.getProfile).toHaveBeenCalled();
    expect(setUserProfile).toHaveBeenCalledWith(freshUser);
  });

  it('loadProfile handles errors and clears loading state', async () => {
    (profileService.getProfile as jest.Mock).mockRejectedValue(
      new Error('network'),
    );
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const {result} = renderHook(() => useProfileForm({user: null}));

    await act(async () => {
      await result.current.loadProfile();
    });

    await waitFor(() => {
      expect(result.current.loadingProfile).toBe(false);
    });
    expect(result.current.profile).toBeNull();
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('onSave catches API error and shows error toast', async () => {
    const apiError = {response: {data: {message: 'Server blew up'}}};
    (profileService.updateProfile as jest.Mock).mockRejectedValue(apiError);

    const {result} = renderHook(() => useProfileForm({user: baseUser}));

    await act(async () => {
      await result.current.onSave();
    });

    expect(mockToastShow).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'error',
        text2: 'Server blew up',
      }),
    );
    expect(result.current.savingProfile).toBe(false);
  });

  it('onCancel resets form values and exits editing mode', () => {
    const {result} = renderHook(() => useProfileForm({user: baseUser}));

    act(() => result.current.setIsEditing(true));

    const formValues = (result.current.control as any)._formValues;
    formValues.firstName = 'Changed';
    formValues.lastName = 'Smith';

    act(() => {
      result.current.onCancel();
    });

    const updatedValues = (result.current.control as any)._formValues;
    expect(updatedValues.firstName).toBe(baseUser.firstName);
    expect(updatedValues.lastName).toBe(baseUser.lastName);
    expect(result.current.isEditing).toBe(false);
  });

  it('loadProfile sets profile from cache before fetching remote', async () => {
    const cachedUser = {...baseUser, firstName: 'Cached'};
    const freshUser = {...baseUser, firstName: 'Fresh'};
    (profileService.getLocalProfile as jest.Mock).mockResolvedValue(cachedUser);
    (profileService.getProfile as jest.Mock).mockResolvedValue(freshUser);
    const setUserProfile = jest.fn();

    const {result} = renderHook(() =>
      useProfileForm({user: null, setUserProfile}),
    );

    await act(async () => {
      await result.current.loadProfile();
    });

    // setUserProfile được gọi 2 lần: cached rồi fresh
    expect(setUserProfile).toHaveBeenNthCalledWith(1, cachedUser);
    expect(setUserProfile).toHaveBeenNthCalledWith(2, freshUser);

    // profile cuối cùng là fresh
    expect(result.current.profile).toEqual(freshUser);
  });

  it('onSave is a no-op when already saving', async () => {
    // Giữ updateProfile pending để savingProfile = true
    let resolveUpdate!: (v: User) => void;
    (profileService.updateProfile as jest.Mock).mockReturnValue(
      new Promise<User>(res => (resolveUpdate = res)),
    );

    const {result} = renderHook(() => useProfileForm({user: baseUser}));

    // Gọi lần 1 — bắt đầu save, chưa resolve
    act(() => {
      result.current.onSave();
    });

    await waitFor(() => expect(result.current.savingProfile).toBe(true));

    // Gọi lần 2 — phải bị block
    await act(async () => {
      await result.current.onSave();
    });

    expect(profileService.updateProfile).toHaveBeenCalledTimes(1);

    // Cleanup
    await act(async () => resolveUpdate(baseUser));
  });

  it('onCancel resets form to current profile values and exits editing', () => {
    const {result} = renderHook(() => useProfileForm({user: baseUser}));

    act(() => result.current.setIsEditing(true));

    act(() => result.current.onCancel());

    const values = (result.current.control as any)._formValues;
    expect(values.firstName).toBe(baseUser.firstName);
    expect(values.lastName).toBe(baseUser.lastName);
    expect(values.age).toBe(baseUser.age);
    expect(result.current.isEditing).toBe(false);
  });

  it('onSave shows generic error message when response has no message', async () => {
    (profileService.updateProfile as jest.Mock).mockRejectedValue(new Error());

    const {result} = renderHook(() => useProfileForm({user: baseUser}));

    await act(async () => {
      await result.current.onSave();
    });

    expect(mockToastShow).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'error',
        text2: 'Failed to update profile', // fallback message
      }),
    );
  });
});
