import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../styles';

interface SocialLoginProps {
  onPress: (provider: 'google' | 'facebook') => void;
}

const SocialLogin: React.FC<SocialLoginProps> = ({onPress}) => (
  <>
    <View style={styles.dividerWrap}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>Or continue with</Text>
      <View style={styles.dividerLine} />
    </View>

    <View style={styles.socialRow}>
      <TouchableOpacity
        style={styles.socialBtn}
        onPress={() => onPress('google')}
        activeOpacity={0.7}>
        <Text style={styles.socialIcon}>G</Text>
        <Text style={styles.socialBtnText}>Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.socialBtn}
        onPress={() => onPress('facebook')}
        activeOpacity={0.7}>
        <Text style={styles.socialIcon}>f</Text>
        <Text style={styles.socialBtnText}>Facebook</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.termsRow}>
      <Text style={styles.termsText}>
        By continuing, you agree to our{'\n'}
        <Text style={styles.termsLink}>
          Terms of Service and Privacy Policy
        </Text>
        .
      </Text>
    </View>
  </>
);

export default SocialLogin;
