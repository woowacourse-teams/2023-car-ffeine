import type { Meta } from '@storybook/react';

import { ENGLISH_DAYS } from '@constants';

import StatisticsGraph from '.';

import type { Congestion, CongestionStatistics, EnglishDaysType } from 'types';

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
      ENGLISH_DAYS.map((day) => {
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
    ) as Record<EnglishDaysType, Congestion[]>,
    STANDARD: Object.fromEntries(
      ENGLISH_DAYS.map((day) => {
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
    ) as Record<EnglishDaysType, Congestion[]>,
  },
};

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
