import React from 'react';
import {Pressable, Text, View} from 'react-native';
import DetailField from '../../components/DetailField';
import {profileStyles as styles} from './styles';
import {User} from '../../models/user';

interface AccountDetailsCardProps {
  profile: User | null;
  onEdit?: () => void;
}

const AccountDetailsCard: React.FC<AccountDetailsCardProps> = ({
  profile,
  onEdit,
}) => (
  <View style={styles.card}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Account Details</Text>
      <Pressable onPress={onEdit} hitSlop={8}>
        <Text style={styles.link}>Edit Details</Text>
      </Pressable>
    </View>

    <DetailField label="Email Address" value={profile!.email} />
    <DetailField label="First Name" value={profile!.firstName} />
    <DetailField label="Last Name" value={profile!.lastName} />
    <DetailField label="Age" value={String(profile!.age)} isLast />
  </View>
);

export default AccountDetailsCard;
