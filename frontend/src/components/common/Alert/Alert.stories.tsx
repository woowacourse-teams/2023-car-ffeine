import type { Meta } from '@storybook/react';

import type { AlertProps } from './Alert';
import Alert from './Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {
    color: 'primary',
    text: 'You forget a thousand things every day. Make sure this is one of them.',
  },
  argTypes: {
    color: {
      description: '선택한 색상에 따라 배경색이 변합니다.',
    },
    text: {
      description: '텍스트를 입력합니다.',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;

export const Default = (args: AlertProps) => {
  return <Alert {...args} />;
};
export const Colors = () => {
  return (
    <>
      <Alert color="primary" text="primary alert" />
      <Alert color="secondary" text="secondary alert" />
      <Alert color="success" text="success alert" />
      <Alert color="error" text="error alert" />
      <Alert color="warning" text="warning alert" />
      <Alert color="info" text="info alert" />
      <Alert color="light" text="light alert" />
      <Alert color="dark" text="dark alert" />
    </>
  );
};
