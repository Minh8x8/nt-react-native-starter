import React, {useCallback, useEffect, useState} from 'react'; // add useCallback
import {SafeAreaView, ScrollView, RefreshControl} from 'react-native'; // add RefreshControl

import ActionRow from '@/components/ActionRow';
import {useAuth} from '@/providers/auth-provider';

import AccountDetailsCard from './components/AccountDetailsCard';
import ProfileCard from './components/ProfileCard';
import ProfileHeader from './components/ProfileHeader';

import {profileStyles as styles} from './styles';

import {useProfileForm} from './hooks/useProfileForm';
import Toast from 'react-native-toast-message';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const {user, logout, setUserProfile} = useAuth();

  const [loggingOut, setLoggingOut] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // add this

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

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadProfile();
    } finally {
      setRefreshing(false);
    }
  }, [loadProfile]);

  const handleBack = () => navigation?.goBack?.();

  const handleLogout = async () => {
    if (loggingOut) {
      return;
    }
    try {
      setLoggingOut(true);
      await logout?.();
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Logout failed',
        text2: 'Please try again.',
      });
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        testID="profile-scroll-view"
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <ProfileHeader
          onBack={handleBack}
          // onSettings={() => {}}
        />

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
          // onPress={() => {}}
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
