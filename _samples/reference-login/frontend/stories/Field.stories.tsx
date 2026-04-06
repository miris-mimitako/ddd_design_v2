import type { Meta, StoryObj } from '@storybook/react';
import { Field } from '../src/components/Field';
import { Input } from '../src/components/Input';

const meta = {
  title: 'Components/Field',
  component: Field,
} satisfies Meta<typeof Field>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  render: () => (
    <Field label="Email" htmlFor="story-field-email">
      <Input
        id="story-field-email"
        type="email"
        value="sample.user@example.com"
        onValueChange={() => {}}
      />
    </Field>
  ),
};
