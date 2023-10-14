import type { Meta } from '@storybook/react';

import Box from '@common/Box';

import { NO_RATIO } from '@constants/congestion';

import Bar from './Bar';

const meta = {
  title: 'UI/Bar',
  component: Bar,
  tags: ['autodocs'],
} satisfies Meta<typeof Bar>;

export default meta;

export const Default = () => {
  return Array.from({ length: 25 }, (_, index) => (
    <Box key={index} my={1}>
      <Bar ratio={(index / 24) * 100} hour={String(index)} />
    </Box>
  ));
};

export const NoRatio = () => {
  return <Bar ratio={NO_RATIO} hour="1" />;
};
