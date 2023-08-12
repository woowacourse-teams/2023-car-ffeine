import type { Meta } from '@storybook/react';

import LoginModal from './LoginModal';

const meta = {
  title: 'UI/LoginModal',
  component: LoginModal,
  tags: ['autodocs'],
} satisfies Meta<typeof LoginModal>;

export default meta;

export const Default = () => {
  return <LoginModal />;
};
