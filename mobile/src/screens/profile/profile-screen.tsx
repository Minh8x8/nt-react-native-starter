import React, {useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import ActionRow from '../../components/ActionRow';
import {useAuth} from '../../contexts/auth-context';
import AccountDetailsCard from './AccountDetailsCard';
import ProfileCard from './ProfileCard';
import ProfileHeader from './ProfileHeader';
import {profileStyles as styles} from './styles';
import {Profile} from './types';

interface ProfileScreenProps {
  navigation: any;
}

const mockProfile: Profile = {
  name: 'John Doe',
  username: '@johndoe_official',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  age: 28,
  membership: 'Premium Member',
  avatar: 'https://i.pravatar.cc/200?img=12',
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const {logout} = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleBack = () => navigation?.goBack?.();
  const handleSettings = () => {};
  const handleEdit = () => {};
  const handleOrderHistory = () => {};

  const handleLogout = async () => {
    if (loggingOut) {
      return;
    }

    try {
      setLoggingOut(true);
      await logout?.();
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <ProfileHeader onBack={handleBack} onSettings={handleSettings} />

        <ProfileCard profile={mockProfile} />

        <AccountDetailsCard profile={mockProfile} onEdit={handleEdit} />

        <ActionRow
          icon="lock-outline"
          label="Order History"
          onPress={handleOrderHistory}
        />

        <ActionRow
          icon="logout"
          label="Logout"
          variant="danger"
          loading={loggingOut}
          onPress={handleLogout}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export {ProfileScreen};
export default ProfileScreen;
