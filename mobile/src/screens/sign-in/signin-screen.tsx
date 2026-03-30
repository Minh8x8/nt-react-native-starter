import {FC} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';

import {useSignInForm} from './hooks/useSignInForm';
import SignInHeader from './components/SignInHeader';
import SignInForm from './components/SignInForm';
import BiometricButton from './components/BiometricButton';
import SocialLogin from './components/SocialLogin';
import {styles} from './styles';

interface ISignInScreen {
  navigation: any;
}

export const SignInScreen: FC<ISignInScreen> = ({navigation}) => {
  const {
    loading,
    useBiometric,
    username,
    password,
    setUsername,
    setPassword,
    toggleBiometric,
    onPressSignIn,
    onPressForgotPassword,
    onPressSocialLogin,
  } = useSignInForm();

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
            <SignInHeader onPressSignUp={() => navigation.navigate('SignUp')} />
            <SignInForm
              username={username}
              password={password}
              loading={loading}
              onChangeUsername={text => setUsername({value: text, error: ''})}
              onChangePassword={text => setPassword({value: text, error: ''})}
              onSubmit={onPressSignIn}
              onForgotPassword={onPressForgotPassword}
            />
            <BiometricButton
              useBiometric={useBiometric}
              onToggle={toggleBiometric}
            />
            <SocialLogin onPress={onPressSocialLogin} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
