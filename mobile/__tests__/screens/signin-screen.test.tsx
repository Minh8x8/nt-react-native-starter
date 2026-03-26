import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';

import {SignInScreen} from '@/screens/signin-screen';
import {useAuth} from '@/contexts/auth-context';

jest.mock('@/contexts/auth-context', () => ({
  useAuth: jest.fn(),
}));

describe('SignInScreen', () => {
  const login = jest.fn();
  const navigation = {replace: jest.fn()};
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    (useAuth as jest.Mock).mockReturnValue({login});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('triggers forgot password handler on press', () => {
    render(<SignInScreen navigation={navigation} />);

    fireEvent.press(screen.getByText('Forgot Password?'));

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Forgot password'),
    );
  });

  it('logs presses on social login buttons (Google, Facebook)', () => {
    render(<SignInScreen navigation={navigation} />);

    fireEvent.press(screen.getByText('Google'));
    fireEvent.press(screen.getByText('Facebook'));

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('google'));
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('facebook'),
    );
  });

  it('shows validation errors when username and password are empty', async () => {
    render(<SignInScreen navigation={navigation} />);

    // Clear default values
    fireEvent.changeText(screen.getByPlaceholderText('johndoe123'), '');
    fireEvent.changeText(screen.getByPlaceholderText('••••••••'), '');

    fireEvent.press(screen.getByText('Sign In'));

    expect(await screen.findByText('Username cannot be empty')).toBeTruthy();
    expect(screen.getByText('Password cannot be empty')).toBeTruthy();
    expect(login).not.toHaveBeenCalled();
  });

  it('calls login with username and password on valid submit', async () => {
    login.mockResolvedValue(undefined);
    render(<SignInScreen navigation={navigation} />);

    fireEvent.changeText(screen.getByPlaceholderText('johndoe123'), 'jdoe');
    fireEvent.changeText(screen.getByPlaceholderText('••••••••'), 'pass123');

    fireEvent.press(screen.getByText('Sign In'));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('jdoe', 'pass123');
    });
  });

  it('shows API error message on login failure', async () => {
    login.mockRejectedValue({
      response: {data: {message: 'Invalid credentials'}},
    });
    render(<SignInScreen navigation={navigation} />);

    fireEvent.press(screen.getByText('Sign In'));

    expect(await screen.findByText('Invalid credentials')).toBeTruthy();
  });

  it('shows fallback error message when API response has no message', async () => {
    login.mockRejectedValue(new Error('Network error'));
    render(<SignInScreen navigation={navigation} />);

    fireEvent.press(screen.getByText('Sign In'));

    expect(await screen.findByText('Failed to log in')).toBeTruthy();
  });

  it('toggles biometric checkbox on press', () => {
    render(<SignInScreen navigation={navigation} />);

    expect(screen.queryByText('✓')).toBeNull();

    fireEvent.press(screen.getByText('Use biometrics for faster login'));
    expect(screen.getByText('✓')).toBeTruthy();

    fireEvent.press(screen.getByText('Use biometrics for faster login'));
    expect(screen.queryByText('✓')).toBeNull();
  });
});
