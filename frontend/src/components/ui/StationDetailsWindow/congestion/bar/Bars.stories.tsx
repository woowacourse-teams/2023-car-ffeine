import type { Meta } from '@storybook/react';

import Box from '@common/Box';

import { NO_RATIO } from '@constants/congestion';

import Bar from './Bar';
import BarsSkeleton from './BarsSkeleton';

const meta = {
  title: 'UI/Bars',
  component: Bar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box width={34} px={6}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof Bar>;

export default meta;

export const Default = () => {
  return Array.from({ length: 25 }, (_, index) => (
    <Box key={index} my={1}>
      <Bar ratio={index / 24} hour={`${index + 1}`.padStart(2, '0')} />
    </Box>
  ));
};

export const NoRatio = () => {
  return Array.from({ length: 25 }, (_, index) => (
    <Box key={index} my={1}>
      <Bar ratio={NO_RATIO} hour={`${index + 1}`.padStart(2, '0')} />
    </Box>
  ));
};

export const Skeleton = () => {
  return <BarsSkeleton />;
};
