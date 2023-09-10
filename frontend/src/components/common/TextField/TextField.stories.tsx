import type { Meta } from '@storybook/react';

import { useState } from 'react';

import Text from '../Text';
import type { TextFieldProps } from './TextField';
import TextField from './TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: {
    value: '아래 Control/Input 필드에서 저를 지워보세요',
    width: 150,
    label: 'Label',
    supportingText: '도움말은 여기에 입력됩니다.',
  },
  argTypes: {
    label: {
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
    supportingText: {
      description: '도움 메세지를 입력할 수 있습니다.',
    },
    width: {
      description: '너비 길이를 설정할 수 있습니다. 정수 * 0.4 rem 만큼의 길이가 설정됩니다.',
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

export const Label = () => {
  return <TextField label="이름" />;
};

export const Value = () => {
  const [value, setValue] = useState('');
  return (
    <>
      <Text>value: {value}</Text>
      <TextField
        label="주소"
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
        label="닉네임"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        supportingText={value.length < 2 && '닉네임은 2글자 이상 입력하셔야 합니다.'}
      />
    </>
  );
};

export const Width = () => {
  return <TextField label="가로가 긴 TextField" width={100} />;
};

export const FullWidth = () => {
  return <TextField label="가로로 꽉찬 TextField" fullWidth />;
};
