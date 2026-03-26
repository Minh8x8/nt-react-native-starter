import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import ActionRow from '../../components/ActionRow';
import {useAuth} from '../../contexts/auth-context';
import AccountDetailsCard from './AccountDetailsCard';
import ProfileCard from './ProfileCard';
import ProfileHeader from './ProfileHeader';
import {profileStyles as styles} from './styles';
import {profileService} from '../../services/profileService';
import {User} from '../../models/user';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';

interface ProfileScreenProps {
  navigation: any;
}

const profileSchema = yup.object({
  email: yup.string().email().required(),
  firstName: yup.string().trim().required('First name is required'),
  lastName: yup.string().trim().required('Last name is required'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .required('Age is required')
    .integer('Age must be an integer')
    .min(0, 'Age must be non-negative'),
});

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const {user, logout, setUserProfile} = useAuth();
  const [profile, setProfile] = useState<User | null>(user);
  const [loggingOut, setLoggingOut] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [, setLoadingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm<{
    email: string;
    firstName: string;
    lastName: string;
    age: string;
  }>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      email: user?.email ?? '',
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      age: user?.age?.toString() ?? '',
    },
  });

  const handleBack = () => navigation?.goBack?.();
  const handleSettings = () => {};
  const handleEdit = () => setIsEditing(true);
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
    if (!user) {
      return;
    }
    reset({
      email: user.email ?? '',
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      age: user.age?.toString() ?? '',
    });
    setProfile(user);
  }, [user, reset]);

  const loadProfile = useCallback(async () => {
    setLoadingProfile(true);
    try {
      const cached = await profileService.getLocalProfile();
      if (cached) {
        setProfile(cached);
        setUserProfile(cached);
        reset({
          email: cached.email ?? '',
          firstName: cached.firstName ?? '',
          lastName: cached.lastName ?? '',
          age: cached.age?.toString() ?? '',
        });
      }

      const fresh = await profileService.getProfile();
      setProfile(fresh);
      setUserProfile(fresh);
      reset({
        email: fresh.email ?? '',
        firstName: fresh.firstName ?? '',
        lastName: fresh.lastName ?? '',
        age: fresh.age?.toString() ?? '',
      });
    } catch (error) {
      console.log('Failed to load profile', error);
    } finally {
      setLoadingProfile(false);
    }
  }, [setUserProfile, reset]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleSaveProfile = handleSubmit(async values => {
    if (savingProfile) {
      return;
    }

    setSavingProfile(true);
    try {
      const updated = await profileService.updateProfile({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        age: Number(values.age),
      });
      setProfile(updated);
      setUserProfile(updated);
      reset({
        email: updated.email ?? '',
        firstName: updated.firstName ?? '',
        lastName: updated.lastName ?? '',
        age: updated.age?.toString() ?? '',
      });
      setIsEditing(false);
      Toast.show({
        type: 'success',
        text1: 'Profile updated',
        text2: 'Your changes have been saved.',
      });
    } catch (error: any) {
      const message =
        error?.response?.data?.message ?? 'Failed to update profile';
      Toast.show({
        type: 'error',
        text1: 'Update failed',
        text2: message,
      });
    } finally {
      setSavingProfile(false);
    }
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <ProfileHeader onBack={handleBack} onSettings={handleSettings} />

        <ProfileCard profile={profile} />

        <AccountDetailsCard
          profile={profile}
          onEdit={handleEdit}
          isEditing={isEditing}
          control={control}
          errors={errors}
          onSave={handleSaveProfile}
          onCancel={() => {
            reset({
              email: profile?.email ?? '',
              firstName: profile?.firstName ?? '',
              lastName: profile?.lastName ?? '',
              age: profile?.age?.toString() ?? '',
            });
            setIsEditing(false);
          }}
          saving={savingProfile}
        />

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
