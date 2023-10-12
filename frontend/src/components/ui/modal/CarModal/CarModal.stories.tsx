import type { Meta } from '@storybook/react';

import FlexBox from '@common/FlexBox';
import Loader from '@common/Loader';

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

export const Loading = () => {
  return (
    <FlexBox direction="column" alignItems="center">
      <Loader size="xxl" />
    </FlexBox>
  );
};
