import React from 'react';
import {Image, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {profileStyles as styles} from '../styles';
import {User} from '@/types/user';
import ImageAssets from '@/assets/images';

interface ProfileCardProps {
  profile: User | null;
}

const ProfileCard: React.FC<ProfileCardProps> = ({profile}) => {
  const avatarSource = (profile as any)?.avatarUrl
    ? {uri: (profile as any).avatarUrl}
    : ImageAssets.logo;

  return (
    <View style={[styles.card, styles.centerContent]}>
      <View style={styles.avatarWrapper}>
        <Image
          source={avatarSource}
          style={styles.avatar}
          defaultSource={ImageAssets.logo}
        />
        <View style={styles.editBadge}>
          <MaterialCommunityIcons name="pencil" size={14} color="#fff" />
        </View>
      </View>
      <Text style={styles.name}>
        {profile?.firstName} {profile?.lastName}
      </Text>
      <Text style={styles.username}>{profile?.username}</Text>
      <View style={styles.membershipBadge}>
        <Text style={styles.membershipText}>Premium Member</Text>
      </View>
    </View>
  );
};

export default ProfileCard;
