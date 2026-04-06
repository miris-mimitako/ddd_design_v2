import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    children: 'Login',
    onPress: () => {},
  },
};
