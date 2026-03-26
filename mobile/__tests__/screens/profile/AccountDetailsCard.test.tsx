import React from 'react';
import {ActivityIndicator} from 'react-native';
import {render, screen} from '@testing-library/react-native';
import {useForm} from 'react-hook-form';

import AccountDetailsCard from '@/screens/profile/components/AccountDetailsCard';
import {User} from '@/models/user';

type FormValues = {
  firstName: string;
  lastName: string;
  age: number;
};

const baseUser: User = {
  id: 1,
  username: 'jdoe',
  email: 'jdoe@example.com',
  age: 30,
  role: 'user',
  firstName: 'John',
  lastName: 'Doe',
  createdAt: '',
  updatedAt: '',
};

const FormWrapper = (
  props: Partial<React.ComponentProps<typeof AccountDetailsCard>>,
) => {
  const form = useForm<FormValues>({
    defaultValues: {
      firstName: baseUser.firstName,
      lastName: baseUser.lastName,
      age: baseUser.age,
    },
  });

  return (
    <AccountDetailsCard
      profile={baseUser}
      control={form.control}
      errors={form.formState.errors}
      {...props}
    />
  );
};

describe('AccountDetailsCard', () => {
  it('renders editing form with all inputs', () => {
    render(<FormWrapper isEditing onSave={jest.fn()} onCancel={jest.fn()} />);

    const emailInput = screen.getByPlaceholderText('Email');
    expect(emailInput.props.editable).toBe(false);
    expect(screen.getByPlaceholderText('First Name')).toBeTruthy();
    expect(screen.getByPlaceholderText('Last Name')).toBeTruthy();
    expect(screen.getByPlaceholderText('Age')).toBeTruthy();
  });

  it('shows saving spinner when saving=true', () => {
    render(<FormWrapper isEditing saving />);

    expect(screen.UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    expect(screen.queryByText('Save Changes')).toBeNull();
  });
});
