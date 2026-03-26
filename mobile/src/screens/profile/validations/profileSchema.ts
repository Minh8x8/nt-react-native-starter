import * as yup from 'yup';

export const profileSchema = yup.object({
  firstName: yup.string().trim().required('First name is required'),
  lastName: yup.string().trim().required('Last name is required'),
  age: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === '' ? undefined : Number(originalValue),
    )
    .typeError('Age must be a number')
    .required('Age is required')
    .integer('Age must be an integer')
    .min(0, 'Age must be non-negative'),
});

export type ProfileFormData = yup.InferType<typeof profileSchema>;
