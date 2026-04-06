import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from '../src/components/LoginForm';

const meta = {
  title: 'Components/LoginForm',
  component: LoginForm,
} satisfies Meta<typeof LoginForm>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    emailValue: 'sample.user@example.com',
    passwordValue: 'password123',
    isSubmitting: false,
    errorMessage: null,
    onEmailChange: () => {},
    onPasswordChange: () => {},
    onSubmit: () => {},
  },
};
