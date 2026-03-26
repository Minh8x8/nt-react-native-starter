import {useCallback, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import Toast from 'react-native-toast-message';

import {profileSchema} from '../validations/profileSchema';
import {profileService} from '@/services/profileService';
import {User} from '@/models/user';

type FormValues = {
  firstName: string;
  lastName: string;
  age: number;
};

interface UseProfileFormParams {
  user: User | null;
  setUserProfile?: (user: User) => void;
}

export const useProfileForm = ({
  user,
  setUserProfile,
}: UseProfileFormParams) => {
  const [profile, setProfile] = useState<User | null>(user);
  const [isEditing, setIsEditing] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      age: user?.age ?? 0,
    },
  });

  /**
   * Sync form khi user thay đổi
   */
  useEffect(() => {
    if (!user) {
      return;
    }

    reset({
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      age: user.age ?? 0,
    });

    setProfile(user);
  }, [user, reset]);

  /**
   * Load profile từ SQLite + API
   */
  const loadProfile = useCallback(async () => {
    setLoadingProfile(true);

    try {
      const cached = await profileService.getLocalProfile();
      if (cached) {
        setProfile(cached);
        setUserProfile?.(cached);
      }

      const fresh = await profileService.getProfile();
      setProfile(fresh);
      setUserProfile?.(fresh);
    } catch (error) {
      console.log('Failed to load profile', error);
    } finally {
      setLoadingProfile(false);
    }
  }, [setUserProfile]);

  /**
   * Save profile
   */
  const onSave = handleSubmit(async values => {
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
      setUserProfile?.(updated);

      reset({
        firstName: updated.firstName ?? '',
        lastName: updated.lastName ?? '',
        age: updated.age ?? 0,
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

  /**
   * Cancel edit
   */
  const onCancel = () => {
    reset({
      firstName: profile?.firstName ?? '',
      lastName: profile?.lastName ?? '',
      age: profile?.age ?? 0,
    });

    setIsEditing(false);
  };

  return {
    profile,
    isEditing,
    savingProfile,
    loadingProfile,

    control,
    errors,

    setIsEditing,
    onSave,
    onCancel,
    loadProfile,
  };
};
