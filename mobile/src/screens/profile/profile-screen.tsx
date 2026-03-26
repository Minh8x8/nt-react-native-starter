import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import ActionRow from '../../components/ActionRow';
import {useAuth} from '../../contexts/auth-context';

import AccountDetailsCard from './components/AccountDetailsCard';
import ProfileCard from './components/ProfileCard';
import ProfileHeader from './components/ProfileHeader';

import {profileStyles as styles} from './styles';

import {useProfileForm} from './hooks/useProfileForm';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const {user, logout, setUserProfile} = useAuth();

  const [loggingOut, setLoggingOut] = useState(false);

  const {
    profile,
    isEditing,
    savingProfile,

    control,
    errors,

    setIsEditing,
    onSave,
    onCancel,
    loadProfile,
  } = useProfileForm({
    user,
    setUserProfile,
  });

  /**
   * Load profile khi mount
   */
  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleBack = () => navigation?.goBack?.();

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
        <ProfileHeader onBack={handleBack} onSettings={() => {}} />

        <ProfileCard profile={profile} />

        <AccountDetailsCard
          profile={profile}
          onEdit={() => setIsEditing(true)}
          isEditing={isEditing}
          control={control}
          errors={errors}
          onSave={onSave}
          onCancel={onCancel}
          saving={savingProfile}
        />

        <ActionRow
          icon="lock-outline"
          label="Order History"
          onPress={() => {}}
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
