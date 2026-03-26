import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import ProfileScreen from '@/screens/profile/profile-screen';
import {useAuth} from '@/contexts/auth-context';
import {profileService} from '@/services/profileService';
import Toast from 'react-native-toast-message';
import {RefreshControl} from 'react-native';

jest.mock('@/contexts/auth-context', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/services/profileService', () => ({
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

  it('logout success flow', async () => {
    (profileService.getProfile as jest.Mock).mockResolvedValue(baseUser);
    mockLogout.mockResolvedValue(undefined);

    render(<ProfileScreen navigation={{goBack: jest.fn()}} />);

    await screen.findByText('John');

    fireEvent.press(screen.getByText('Logout'));

    await waitFor(() => expect(mockLogout).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.queryByRole('progressbar')).toBeNull());
  });

  it('prevents duplicate logout when already logging out', async () => {
    let resolveLogout: (() => void) | undefined;
    const logoutPromise = new Promise<void>(res => {
      resolveLogout = res;
    });
    mockLogout.mockReturnValue(logoutPromise);

    render(<ProfileScreen navigation={{goBack: jest.fn()}} />);

    await screen.findByText('John');

    const logoutButton = screen.getByText('Logout');

    fireEvent.press(logoutButton);

    await waitFor(() => expect(mockLogout).toHaveBeenCalledTimes(1));

    fireEvent.press(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);

    await act(async () => resolveLogout?.());
    await waitFor(() => expect(screen.queryByRole('progressbar')).toBeNull());
  });

  it('triggers profile reload on pull-to-refresh', async () => {
    render(<ProfileScreen navigation={{goBack: jest.fn()}} />);

    await screen.findByText('John Doe');

    const refreshControl = screen.UNSAFE_getByType(RefreshControl);

    await act(async () => {
      refreshControl.props.onRefresh();
    });

    expect(profileService.getProfile).toHaveBeenCalledTimes(2);
  });

  it('calls navigation.goBack when back button is pressed', async () => {
    const mockGoBack = jest.fn();
    render(<ProfileScreen navigation={{goBack: mockGoBack}} />);

    await screen.findByText('John Doe');

    fireEvent.press(screen.getByLabelText('icon-chevron-left'));

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});
