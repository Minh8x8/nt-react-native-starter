import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import {SignInScreen} from '@/screens/signin-screen';
import {useAuth} from '@/contexts/auth-context';

jest.mock('@/contexts/auth-context', () => ({
  useAuth: jest.fn(),
}));

const mockLogin = jest.fn();
const mockNavigation = {replace: jest.fn()};

describe('SignInScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({login: mockLogin});
  });

  it('renders heading and primary actions', () => {
    render(<SignInScreen navigation={mockNavigation} />);

    expect(screen.getByText('Welcome Back')).toBeTruthy();
    expect(screen.getByText('Sign In')).toBeTruthy();
    expect(screen.getByText('Login')).toBeTruthy();
    expect(screen.getByText('Sign Up')).toBeTruthy();
  });

  it('shows validation errors when username and password are empty', async () => {
    render(<SignInScreen navigation={mockNavigation} />);

    const usernameInput = screen.getByPlaceholderText('johndoe123');
    const passwordInput = screen.getByPlaceholderText(/•/);

    fireEvent.changeText(usernameInput, '');
    fireEvent.changeText(passwordInput, '');
    fireEvent.press(screen.getByText('Sign In'));

    expect(await screen.findByText('Username cannot be empty')).toBeTruthy();
    expect(await screen.findByText('Password cannot be empty')).toBeTruthy();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('shows API error when login fails', async () => {
    mockLogin.mockRejectedValueOnce({
      response: {data: {message: 'Invalid credentials'}},
    });

    render(<SignInScreen navigation={mockNavigation} />);

    const usernameInput = screen.getByPlaceholderText('johndoe123');
    const passwordInput = screen.getByPlaceholderText(/•/);
    fireEvent.changeText(usernameInput, 'demo');
    fireEvent.changeText(passwordInput, 'secret');

    fireEvent.press(screen.getByText('Sign In'));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeTruthy();
    });
    expect(mockLogin).toHaveBeenCalledWith('demo', 'secret');
  });
});
