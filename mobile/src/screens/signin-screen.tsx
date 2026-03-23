import {FC, useState} from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import Background from '../components/Background';
import {styles} from './styles/signin-screen-styles';
import Logo from '../components/Logo';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import {ITextInput} from '../types/text-input';
import {useAuth} from '../contexts/auth-context';

interface ISignInScreen {
  navigation: any;
}

export const SignInScreen: FC<ISignInScreen> = ({navigation}: any) => {
  const {login} = useAuth();

  const [email, setEmail] = useState<ITextInput>({
    value: 'johndoe',
    error: '',
  });
  const [password, setPassword] = useState<ITextInput>({
    value: 'secret123',
    error: '',
  });
  const [loading, setLoading] = useState(false);

  async function onPressSignIn() {
    // Validate đơn giản
    if (!email.value) {
      setEmail(prev => ({...prev, error: 'Email không được để trống'}));
      return;
    }
    if (!password.value) {
      setPassword(prev => ({...prev, error: 'Password không được để trống'}));
      return;
    }

    try {
      setLoading(true);
      await login(email.value, password.value);
    } catch (err: any) {
      const message = err.response?.data?.message ?? 'Đăng nhập thất bại';
      setPassword(prev => ({...prev, error: message}));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Background>
      <View
        style={{
          width: '100%',
          height: '100%',
          padding: 20,
          flex: 1,
          flexDirection: 'column',
        }}>
        <View style={{alignContent: 'center', flex: 0.2}}>
          <View style={styles.changeLanguageContent}>
            <Text
              style={styles.languageItem}
              onPress={() => console.log('press language')}>
              English
            </Text>
            <Text style={styles.languageItem} onPress={() => {}}>
              Tiếng Việt
            </Text>
          </View>
        </View>
        <View style={{alignContent: 'center', flex: 0.5}}>
          <Logo />
          <TextInput
            placeholder={'Email'}
            returnKeyType="next"
            value={email.value}
            onChangeText={(text: string) => setEmail({value: text, error: ''})}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <TextInput
            placeholder={'Password'}
            returnKeyType="done"
            value={password.value}
            onChangeText={(text: string) =>
              setPassword({value: text, error: ''})
            }
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />
          <View style={styles.forgotPassword}>
            <TouchableOpacity
              onPress={() => navigation.replace('ForgotPasswordScreen')}>
              <Text style={styles.forgot}>{'Forgot your password?'}</Text>
            </TouchableOpacity>
          </View>
          <Button mode="contained" onPress={onPressSignIn} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text>{'Login'}</Text>
            )}
          </Button>
          <View style={styles.row}>
            <Text>{"Don't have an account?"} </Text>
            <TouchableOpacity
              onPress={() => navigation.replace('SignUpScreen')}>
              <Text style={styles.link}>{'Sign up'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{alignContent: 'center', flex: 0.2}} />
      </View>
    </Background>
  );
};
