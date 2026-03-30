import React from 'react';
import {
  Text,
  TextInput as RNTextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {ITextInput} from '@/types/text-input';
import {styles} from '../styles';
import {Colors} from '@/config/colors';

interface SignInFormProps {
  username: ITextInput;
  password: ITextInput;
  loading: boolean;
  onChangeUsername: (text: string) => void;
  onChangePassword: (text: string) => void;
  onSubmit: () => void;
  onForgotPassword: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({
  username,
  password,
  loading,
  onChangeUsername,
  onChangePassword,
  onSubmit,
  onForgotPassword,
}) => (
  <>
    <Text style={styles.label}>Username</Text>
    <View style={[styles.inputWrap, !!username.error && styles.inputError]}>
      <RNTextInput
        style={styles.input}
        placeholder="johndoe123"
        placeholderTextColor={Colors.textSecondary}
        value={username.value}
        onChangeText={onChangeUsername}
        autoCapitalize="none"
        returnKeyType="next"
      />
    </View>
    {!!username.error && <Text style={styles.errorText}>{username.error}</Text>}

    <Text style={styles.label}>Password</Text>
    <View style={[styles.inputWrap, !!password.error && styles.inputError]}>
      <RNTextInput
        style={styles.input}
        placeholder="••••••••"
        placeholderTextColor={Colors.textSecondary}
        value={password.value}
        onChangeText={onChangePassword}
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={onSubmit}
      />
    </View>
    {!!password.error && <Text style={styles.errorText}>{password.error}</Text>}

    <TouchableOpacity style={styles.forgotWrap} onPress={onForgotPassword}>
      <Text style={styles.forgotText}>Forgot Password?</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[styles.btn, loading && styles.btnDisabled]}
      onPress={onSubmit}
      disabled={loading}
      activeOpacity={0.8}>
      {loading ? (
        <ActivityIndicator color={Colors.white} size="small" />
      ) : (
        <Text style={styles.btnText}>Sign In</Text>
      )}
    </TouchableOpacity>
  </>
);

export default SignInForm;
