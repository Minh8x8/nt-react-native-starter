import {FC, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  SafeAreaView,
  TextInput as RNTextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useAuth} from '../contexts/auth-context';
import {ITextInput} from '../types/text-input';
import {styles} from './styles/signin-screen-styles';
import {Colors} from '../config/colors';

interface ISignInScreen {
  navigation: any;
}

export const SignInScreen: FC<ISignInScreen> = ({navigation}) => {
  const {login} = useAuth();

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [useBiometric, setUseBiometric] = useState(false);
  const [username, setUsername] = useState<ITextInput>({
    value: 'johndoe',
    error: '',
  });
  const [password, setPassword] = useState<ITextInput>({
    value: 'secret123',
    error: '',
  });
  const [loading, setLoading] = useState(false);

  async function onPressSignIn() {
    if (!username.value) {
      setUsername(prev => ({...prev, error: 'Username cannot be empty'}));
      return;
    }
    if (!password.value) {
      setPassword(prev => ({...prev, error: 'Password cannot be empty'}));
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
  }

  function onPressBiometric() {
    console.log('Biometric login — coming soon');
  }

  function onPressForgotPassword() {
    console.log('Forgot password — coming soon');
  }

  function onPressSocialLogin(provider: 'google' | 'facebook') {
    console.log(`${provider} login — coming soon`);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            {/* Icon */}
            <View style={styles.iconWrap}>
              <Text style={styles.iconEmoji}>🔒</Text>
            </View>

            {/* Title */}
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Please enter your details</Text>

            {/* Tab */}
            <View style={styles.tabWrap}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'login' && styles.tabActive]}
                onPress={() => setActiveTab('login')}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'login' && styles.tabTextActive,
                  ]}>
                  Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'signup' && styles.tabActive]}
                onPress={() => {
                  setActiveTab('signup');
                  navigation.replace('SignUpScreen');
                }}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'signup' && styles.tabTextActive,
                  ]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            {/* Username */}
            <Text style={styles.label}>Username</Text>
            <View
              style={[styles.inputWrap, !!username.error && styles.inputError]}>
              <RNTextInput
                style={styles.input}
                placeholder="johndoe123"
                placeholderTextColor={Colors.textSecondary}
                value={username.value}
                onChangeText={text => setUsername({value: text, error: ''})}
                autoCapitalize="none"
                returnKeyType="next"
              />
            </View>
            {!!username.error && (
              <Text style={styles.errorText}>{username.error}</Text>
            )}

            {/* Password */}
            <Text style={styles.label}>Password</Text>
            <View
              style={[styles.inputWrap, !!password.error && styles.inputError]}>
              <RNTextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={Colors.textSecondary}
                value={password.value}
                onChangeText={text => setPassword({value: text, error: ''})}
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={onPressSignIn}
              />
            </View>
            {!!password.error && (
              <Text style={styles.errorText}>{password.error}</Text>
            )}

            {/* Forgot password */}
            <TouchableOpacity
              style={styles.forgotWrap}
              onPress={onPressForgotPassword}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Checkbox biometric */}
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setUseBiometric(prev => !prev)}
              activeOpacity={0.7}>
              <View
                style={[
                  styles.checkbox,
                  useBiometric && styles.checkboxChecked,
                ]}>
                {useBiometric && <Text style={styles.checkboxTick}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>
                Use biometrics for faster login
              </Text>
            </TouchableOpacity>

            {/* Sign In button */}
            <TouchableOpacity
              style={[styles.btn, loading && styles.btnDisabled]}
              onPress={onPressSignIn}
              disabled={loading}
              activeOpacity={0.8}>
              {loading ? (
                <ActivityIndicator color={Colors.white} size="small" />
              ) : (
                <Text style={styles.btnText}>Sign In</Text>
              )}
            </TouchableOpacity>

            {/* Biometric button */}
            <TouchableOpacity
              style={styles.biometricBtn}
              onPress={onPressBiometric}
              activeOpacity={0.7}>
              <Text style={styles.socialIcon}>🪪</Text>
              <Text style={styles.biometricText}>Sign in with Biometrics</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerWrap}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social login */}
            <View style={styles.socialRow}>
              <TouchableOpacity
                style={styles.socialBtn}
                onPress={() => onPressSocialLogin('google')}
                activeOpacity={0.7}>
                <Text style={styles.socialIcon}>G</Text>
                <Text style={styles.socialBtnText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialBtn}
                onPress={() => onPressSocialLogin('facebook')}
                activeOpacity={0.7}>
                <Text style={styles.socialIcon}>f</Text>
                <Text style={styles.socialBtnText}>Facebook</Text>
              </TouchableOpacity>
            </View>

            {/* Terms text */}
            <View style={styles.termsRow}>
              <Text style={styles.termsText}>
                By continuing, you agree to our{'\n'}
                <Text style={styles.termsLink}>
                  Terms of Service and Privacy Policy
                </Text>
                .
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
