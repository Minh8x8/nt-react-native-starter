import {useState} from 'react';
import {useAuth} from '@/contexts/auth-context';
import {ITextInput} from '@/types/text-input';

export const useSignInForm = () => {
  const {login} = useAuth();
  const [loading, setLoading] = useState(false);
  const [useBiometric, setUseBiometric] = useState(false);
  const [username, setUsername] = useState<ITextInput>({
    value: 'johndoe',
    error: '',
  });
  const [password, setPassword] = useState<ITextInput>({
    value: 'secret123',
    error: '',
  });

  const onPressSignIn = async () => {
    let hasError = false;
    if (!username.value) {
      setUsername(prev => ({...prev, error: 'Username cannot be empty'}));
      hasError = true;
    }
    if (!password.value) {
      setPassword(prev => ({...prev, error: 'Password cannot be empty'}));
      hasError = true;
    }
    if (hasError) {
      return;
    }

    try {
      setLoading(true);
      await login(username.value, password.value);
    } catch (err: any) {
      const message = err.response?.data?.message ?? 'Failed to log in';
      setPassword(prev => ({...prev, error: message}));
    } finally {
      setLoading(false);
    }
  };

  const onPressForgotPassword = () => {
    console.log('Forgot password — coming soon');
  };

  const onPressSocialLogin = (provider: 'google' | 'facebook') => {
    console.log(`${provider} login — coming soon`);
  };

  return {
    loading,
    useBiometric,
    username,
    password,
    setUsername,
    setPassword,
    toggleBiometric: () => setUseBiometric(prev => !prev),
    onPressSignIn,
    onPressForgotPassword,
    onPressSocialLogin,
  };
};
