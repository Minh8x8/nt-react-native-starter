import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import ActionRow from '../../components/ActionRow';
import {useAuth} from '../../contexts/auth-context';
import AccountDetailsCard from './AccountDetailsCard';
import ProfileCard from './ProfileCard';
import ProfileHeader from './ProfileHeader';
import {profileStyles as styles} from './styles';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const {user, logout} = useAuth();
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

  useEffect(() => {
    console.log('User info in ProfileScreen:', user);
  }, [user]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <ProfileHeader onBack={handleBack} onSettings={handleSettings} />

        <ProfileCard profile={user} />

        <AccountDetailsCard profile={user} onEdit={handleEdit} />

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
