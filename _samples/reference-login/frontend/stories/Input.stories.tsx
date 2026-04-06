import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../src/components/Input';

const meta = {
  title: 'Components/Input',
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

export const Email: StoryObj<typeof meta> = {
  args: {
    id: 'story-input-email',
    type: 'email',
    value: 'sample.user@example.com',
    onValueChange: () => {},
  },
};
