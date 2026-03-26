import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import ProfileScreen from '../../src/screens/profile/profile-screen';
import {useAuth} from '../../src/contexts/auth-context';
import {profileService} from '../../src/services/profileService';
import Toast from 'react-native-toast-message';

jest.mock('../../src/contexts/auth-context', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../../src/services/profileService', () => ({
  profileService: {
    getLocalProfile: jest.fn(),
    getProfile: jest.fn(),
    updateProfile: jest.fn(),
  },
}));

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  __esModule: true,
  default: {show: jest.fn()},
}));

jest.mock('react-native-vector-icons/MaterialCommunityIcons');

const baseUser = {
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

describe('ProfileScreen', () => {
  const mockLogout = jest.fn();
  const mockSetUserProfile = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      user: baseUser,
      logout: mockLogout,
      setUserProfile: mockSetUserProfile,
    });

    (profileService.getLocalProfile as jest.Mock).mockResolvedValue(null);
    (profileService.getProfile as jest.Mock).mockResolvedValue(baseUser);
    (profileService.updateProfile as jest.Mock).mockResolvedValue(baseUser);
  });

  it('renders profile information from context', async () => {
    render(<ProfileScreen navigation={{goBack: jest.fn()}} />);

    expect(await screen.findByText('John Doe')).toBeTruthy();
    expect(screen.getByText('jdoe')).toBeTruthy();
  });

  it('shows validation errors when required fields are empty', async () => {
    render(<ProfileScreen navigation={{goBack: jest.fn()}} />);

    fireEvent.press(screen.getByText('Edit Details'));

    const firstNameInput = await screen.findByPlaceholderText('First Name');
    fireEvent.changeText(firstNameInput, '');

    fireEvent.press(screen.getByText('Save Changes'));

    expect(await screen.findByText('First name is required')).toBeTruthy();
    expect(profileService.updateProfile).not.toHaveBeenCalled();
  });

  it('submits updated profile and shows success toast', async () => {
    const updatedUser = {...baseUser, firstName: 'Jane', age: 31};
    (profileService.updateProfile as jest.Mock).mockResolvedValue(updatedUser);

    render(<ProfileScreen navigation={{goBack: jest.fn()}} />);

    fireEvent.press(await screen.findByText('Edit Details'));

    fireEvent.changeText(screen.getByPlaceholderText('First Name'), 'Jane');
    fireEvent.changeText(screen.getByPlaceholderText('Age'), '31');

    fireEvent.press(screen.getByText('Save Changes'));

    await waitFor(() => {
      expect(profileService.updateProfile).toHaveBeenCalledWith({
        firstName: 'Jane',
        lastName: 'Doe',
        age: 31,
      });
    });

    expect(Toast.show).toHaveBeenCalledWith(
      expect.objectContaining({type: 'success'}),
    );
  });
});
