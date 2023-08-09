import type { Meta } from '@storybook/react';

import { useState } from 'react';

import ButtonNext from '@common/ButtonNext';

import LoginModal from './LoginModal';

const meta = {
  title: 'UI/LoginModal',
  component: LoginModal,
  tags: ['autodocs'],
} satisfies Meta<typeof LoginModal>;

export default meta;

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ButtonNext onClick={() => setIsOpen(true)}>열기</ButtonNext>
      <LoginModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
};
