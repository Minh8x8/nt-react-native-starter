import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../styles';

interface BiometricButtonProps {
  useBiometric: boolean;
  onToggle: () => void;
}

const BiometricButton: React.FC<BiometricButtonProps> = ({
  useBiometric,
  onToggle,
}) => (
  <>
    <TouchableOpacity
      style={styles.checkboxRow}
      onPress={onToggle}
      activeOpacity={0.7}>
      <View style={[styles.checkbox, useBiometric && styles.checkboxChecked]}>
        {useBiometric && <Text style={styles.checkboxTick}>✓</Text>}
      </View>
      <Text style={styles.checkboxLabel}>Use biometrics for faster login</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.biometricBtn} activeOpacity={0.7}>
      <Text style={styles.socialIcon}>🪪</Text>
      <Text style={styles.biometricText}>Sign in with Biometrics</Text>
    </TouchableOpacity>
  </>
);

export default BiometricButton;
