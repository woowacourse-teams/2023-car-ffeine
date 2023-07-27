import type { Meta } from '@storybook/react';

import { DAY } from '@constants';

import StatisticsGraph from './StatisticsGraph';

import type { Congestion, CongestionStatistics, Day } from 'types';

const meta = {
  title: 'UI/StatisticsGraph',
  component: StatisticsGraph,
  tags: ['autodocs'],
} satisfies Meta<typeof StatisticsGraph>;

export default meta;

const congestions: CongestionStatistics = {
  stationId: 0,
  congestion: {
    QUICK: Object.fromEntries(
      DAY.map((day) => {
        return [
          day,
          Array.from({ length: 24 }).map((_, i) => {
            return {
              hour: i,
              ratio: Math.floor(Math.random() * 102 - 1),
            };
          }),
        ];
      })
    ) as Record<Day, Congestion[]>,
    STANDARD: Object.fromEntries(
      DAY.map((day) => {
        return [
          day,
          Array.from({ length: 24 }).map((_, i) => {
            return {
              hour: i,
              ratio: Math.floor(Math.random() * 102 - 1),
            };
          }),
        ];
      })
    ) as Record<Day, Congestion[]>,
  },
};

export const Default = () => {
  return <StatisticsGraph statistics={congestions} />;
};
