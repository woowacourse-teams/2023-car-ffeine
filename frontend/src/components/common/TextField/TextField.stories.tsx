import type { Meta } from '@storybook/react';

import TextField from './TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    css: {
      description: 'CSS를 수동으로 지정할 수 있습니다.',
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;

export const Default = () => {
  return <TextField />;
};
