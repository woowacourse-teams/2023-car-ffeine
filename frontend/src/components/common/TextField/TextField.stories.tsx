import type { Meta } from '@storybook/react';

import { useState } from 'react';

import Text from '@common/Text';

import TextField from './TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    cssForLabel: {
      description: 'label의 CSS를 수동으로 지정할 수 있습니다.',
    },
    cssForInput: {
      description: 'input의 CSS를 수동으로 지정할 수 있습니다.',
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;

export const Default = () => {
  return <TextField />;
};

export const Placeholder = () => {
  return <TextField placeholder="이름" />;
};

export const Value = () => {
  const [value, setValue] = useState('');
  return (
    <>
      <Text>value: {value}</Text>
      <TextField
        placeholder="이름"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </>
  );
};
