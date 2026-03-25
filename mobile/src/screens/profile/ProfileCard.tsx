import React from 'react';
import {Image, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {profileStyles as styles} from './styles';
import {Profile} from './types';

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({profile}) => (
  <View style={[styles.card, styles.centerContent]}>
    <View style={styles.avatarWrapper}>
      <Image source={{uri: profile.avatar}} style={styles.avatar} />
      <View style={styles.editBadge}>
        <MaterialCommunityIcons name="pencil" size={14} color="#fff" />
      </View>
    </View>

    <Text style={styles.name}>{profile.name}</Text>
    <Text style={styles.username}>{profile.username}</Text>

    <View style={styles.membershipBadge}>
      <Text style={styles.membershipText}>{profile.membership}</Text>
    </View>
  </View>
);

export default ProfileCard;
