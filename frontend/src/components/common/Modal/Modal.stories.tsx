import type { Meta } from '@storybook/react';

import { useState } from 'react';

import Button from '@common/Button';
import Text from '@common/Text';

import type { ModalProps } from './Modal';
import Modal from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {},
  argTypes: {},
} satisfies Meta<typeof Modal>;

export default meta;

export const Default = (args: ModalProps) => {
  return (
    <Modal {...args}>
      <Text variant="body">모달이에요</Text>
    </Modal>
  );
};

export const TriggeredByButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Button outlined size="md" onClick={() => setIsModalOpen(true)}>
        모달 열기
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Text>버튼으로 모달을 열어봤어요</Text>
      </Modal>
    </>
  );
};
