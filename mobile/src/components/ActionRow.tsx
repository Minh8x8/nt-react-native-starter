import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export type ActionRowVariant = 'default' | 'danger';

interface ActionRowProps {
  icon: string;
  label: string;
  onPress?: () => void | Promise<void>;
  variant?: ActionRowVariant;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

const ActionRow: React.FC<ActionRowProps> = ({
  icon,
  label,
  onPress,
  variant = 'default',
  loading = false,
  style,
  labelStyle,
}) => (
  <Pressable
    disabled={loading}
    onPress={onPress}
    style={[styles.actionRow, variant === 'danger' && styles.dangerRow, style]}
    android_ripple={{color: 'rgba(0,0,0,0.06)'}}>
    <View
      style={[styles.actionIcon, variant === 'danger' && styles.dangerIcon]}>
      <MaterialCommunityIcons
        name={icon}
        size={20}
        color={variant === 'danger' ? '#e15241' : '#3b4154'}
      />
    </View>

    <Text
      style={[
        styles.actionLabel,
        variant === 'danger' && styles.dangerText,
        labelStyle,
        loading && styles.disabledText,
      ]}>
      {label}
    </Text>

    {loading ? (
      <ActivityIndicator
        size="small"
        color={variant === 'danger' ? '#e15241' : '#00c6d4'}
      />
    ) : (
      <MaterialCommunityIcons
        name="chevron-right"
        size={22}
        color={variant === 'danger' ? '#e15241' : '#b6bcc8'}
      />
    )}
  </Pressable>
);

const cardShadow = {
  shadowColor: '#0d1a2b',
  shadowOpacity: 0.06,
  shadowOffset: {width: 0, height: 8},
  shadowRadius: 16,
  elevation: 4,
};

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    ...cardShadow,
  },
  actionIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#eef1f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerIcon: {
    backgroundColor: '#ffe5e1',
  },
  actionLabel: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#1f1f27',
  },
  dangerRow: {
    backgroundColor: '#fff5f3',
  },
  dangerText: {
    color: '#e15241',
  },
  disabledText: {
    opacity: 0.75,
  },
});

export default ActionRow;
