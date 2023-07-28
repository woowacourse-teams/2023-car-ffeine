import type { Meta } from '@storybook/react';

import { useState } from 'react';

import Text from '@common/Text';

import type { TextFieldProps } from './TextField';
import TextField from './TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: {
    value: '아래 Control/Input 필드에서 저를 지워보세요',
    placeholder: 'Placeholder',
    helperText: '도움말은 여기에 입력됩니다.',
  },
  argTypes: {
    placeholder: {
      control: {
        type: 'text',
      },
      description: 'input 내부에 표기할 기본 라벨 입니다.',
    },
    value: {
      control: {
        type: 'text',
      },
      description: '기존 input의 value 입니다. 반드시 문자열로 처리됩니다.',
    },
    onChange: {
      description: '기존 input의 onChange 입니다.',
    },
    helperText: {
      description: '도움 메세지를 입력할 수 있습니다.',
    },
    cssForLabel: {
      description: 'label의 CSS를 수동으로 지정할 수 있습니다.',
    },
    cssForInput: {
      description: 'input의 CSS를 수동으로 지정할 수 있습니다.',
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;

export const Default = (args: TextFieldProps) => {
  return <TextField {...args} />;
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
        placeholder="주소"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </>
  );
};

export const HelperText = () => {
  const [value, setValue] = useState('');
  return (
    <>
      <Text>value: {value}</Text>
      <TextField
        placeholder="닉네임"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        helperText={value.length < 2 && '닉네임은 2글자 이상 입력하셔야 합니다.'}
      />
    </>
  );
};
