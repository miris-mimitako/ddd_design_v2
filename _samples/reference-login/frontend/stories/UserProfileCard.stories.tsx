import type { Meta, StoryObj } from '@storybook/react';
import { UserProfileCard } from '../src/components/UserProfileCard';

const meta = {
  title: 'Components/UserProfileCard',
  component: UserProfileCard,
} satisfies Meta<typeof UserProfileCard>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    userIdText: 'user-001',
    displayNameText: 'Sample User',
    emailAddressText: 'sample.user@example.com',
    loggedInAtText: '2026-04-06T09:00:00.000Z',
    onLogout: () => {},
  },
};
