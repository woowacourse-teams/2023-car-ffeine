import type { Meta } from '@storybook/react';

import CarModal from './CarModal';

const meta = {
  title: 'UI/CarModal',
  component: CarModal,
  tags: ['autodocs'],
} satisfies Meta<typeof CarModal>;

export default meta;

export const Default = () => {
  return <CarModal />;
};
