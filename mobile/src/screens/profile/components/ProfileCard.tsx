import React from 'react';
import {Image, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {profileStyles as styles} from '../styles';
import {User} from '../../../models/user';

interface ProfileCardProps {
  profile: User | null;
}

const ProfileCard: React.FC<ProfileCardProps> = ({profile}) => (
  <View style={[styles.card, styles.centerContent]}>
    <View style={styles.avatarWrapper}>
      <Image
        source={{
          uri: 'https://www.anhnghethuatdulich.com/wp-content/uploads/2025/08/sigma-meme.jpg',
        }}
        style={styles.avatar}
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

export default ProfileCard;
