import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../styles';

interface SignInHeaderProps {
  onPressSignUp?: () => void;
}

const SignInHeader: React.FC<SignInHeaderProps> = ({onPressSignUp}) => (
  <>
    <View style={styles.iconWrap}>
      <Text style={styles.iconEmoji}>🔒</Text>
    </View>
    <Text style={styles.title}>Welcome Back</Text>
    <Text style={styles.subtitle}>Please enter your details</Text>

    <View style={styles.tabWrap}>
      <TouchableOpacity style={[styles.tab, styles.tabActive]}>
        <Text style={[styles.tabText, styles.tabTextActive]}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={onPressSignUp}>
        <Text style={styles.tabText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  </>
);

export default SignInHeader;
