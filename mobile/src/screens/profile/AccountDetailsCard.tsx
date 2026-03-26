import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Controller, FieldErrors, Control} from 'react-hook-form';
import DetailField from '../../components/DetailField';
import {profileStyles as styles} from './styles';
import {User} from '../../models/user';

type FormValues = {
  email: string;
  firstName: string;
  lastName: string;
  age: string;
};

interface AccountDetailsCardProps {
  profile: User | null;
  onEdit?: () => void;
  isEditing?: boolean;
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  onSave?: () => void;
  onCancel?: () => void;
  saving?: boolean;
}

const AccountDetailsCard: React.FC<AccountDetailsCardProps> = ({
  profile,
  onEdit,
  isEditing = false,
  control,
  errors,
  onSave,
  onCancel,
  saving = false,
}) => (
  <View style={styles.card}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Account Details</Text>
      {isEditing ? (
        <Pressable onPress={onCancel} hitSlop={8}>
          <Text style={styles.link}>Cancel</Text>
        </Pressable>
      ) : (
        <Pressable onPress={onEdit} hitSlop={8}>
          <Text style={styles.link}>Edit Details</Text>
        </Pressable>
      )}
    </View>

    {!isEditing ? (
      <>
        <DetailField label="Email Address" value={profile?.email ?? ''} />
        <DetailField label="First Name" value={profile?.firstName ?? ''} />
        <DetailField label="Last Name" value={profile?.lastName ?? ''} />
        <DetailField label="Age" value={String(profile?.age ?? '')} isLast />
      </>
    ) : (
      <>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <Controller
            control={control}
            name="email"
            render={({field: {value}}) => (
              <TextInput
                value={value}
                editable={false}
                style={[styles.input, styles.inputDisabled]}
                placeholder="Email"
              />
            )}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>First Name</Text>
          <Controller
            control={control}
            name="firstName"
            render={({field: {onChange, value}}) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                style={[
                  styles.input,
                  errors.firstName ? styles.inputErrorBorder : null,
                ]}
                placeholder="First Name"
                autoCapitalize="words"
              />
            )}
          />
          {errors.firstName?.message ? (
            <Text style={styles.errorText}>{errors.firstName.message}</Text>
          ) : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Last Name</Text>
          <Controller
            control={control}
            name="lastName"
            render={({field: {onChange, value}}) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                style={[
                  styles.input,
                  errors.lastName ? styles.inputErrorBorder : null,
                ]}
                placeholder="Last Name"
                autoCapitalize="words"
              />
            )}
          />
          {errors.lastName?.message ? (
            <Text style={styles.errorText}>{errors.lastName.message}</Text>
          ) : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Age</Text>
          <Controller
            control={control}
            name="age"
            render={({field: {onChange, value}}) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                style={[
                  styles.input,
                  errors.age ? styles.inputErrorBorder : null,
                ]}
                placeholder="Age"
                keyboardType="numeric"
              />
            )}
          />
          {errors.age?.message ? (
            <Text style={styles.errorText}>{errors.age.message}</Text>
          ) : null}
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, saving && styles.primaryButtonDisabled]}
          disabled={saving}
          onPress={onSave}>
          {saving ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.primaryButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </>
    )}
  </View>
);

export default AccountDetailsCard;
