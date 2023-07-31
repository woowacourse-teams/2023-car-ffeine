import { congestions } from '@mocks/data';
import type { Meta } from '@storybook/react';

import { ENGLISH_DAYS } from '@constants';

import StatisticsGraph from '.';

const meta = {
  title: 'UI/StatisticsGraph',
  component: StatisticsGraph,
  tags: ['autodocs'],
} satisfies Meta<typeof StatisticsGraph>;

export default meta;

export const Column = () => {
  return (
    <StatisticsGraph
      statistics={congestions.congestion.QUICK}
      align="column"
      menus={[...ENGLISH_DAYS]}
    />
  );
};

export const Row = () => {
  return (
    <StatisticsGraph
      statistics={congestions.congestion.QUICK}
      align="row"
      menus={[...ENGLISH_DAYS]}
    />
  );
};
