import React from 'react';
import {Pressable, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {profileStyles as styles} from './styles';

interface HeaderProps {
  onBack?: () => void;
  onSettings?: () => void;
}

const ProfileHeader: React.FC<HeaderProps> = ({onBack, onSettings}) => (
  <View style={styles.header}>
    <Pressable style={styles.headerIcon} onPress={onBack}>
      <MaterialCommunityIcons name="chevron-left" size={24} color="#1f1f27" />
    </Pressable>

    <Text style={styles.headerTitle}>Profile Settings</Text>

    <Pressable style={styles.headerIcon} onPress={onSettings}>
      <MaterialCommunityIcons name="cog-outline" size={22} color="#1f1f27" />
    </Pressable>
  </View>
);

export default ProfileHeader;
