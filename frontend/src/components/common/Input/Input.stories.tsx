import type { Meta } from '@storybook/react';

import type { InputProps } from './Input';
import Input from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    css: {
      description: 'CSS를 수동으로 지정할 수 있습니다.',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

export const Default = (args: InputProps) => {
  return <Input {...args} />;
};
