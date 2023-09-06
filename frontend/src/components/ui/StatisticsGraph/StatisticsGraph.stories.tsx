// import { getCongestionStatistics } from '@mocks/data';
import type { Meta } from '@storybook/react';

// import { ENGLISH_DAYS } from '@constants/congestion';
import StatisticsGraph from '.';
import { ENGLISH_DAYS } from '../../../constants/congestion';
import { getCongestionStatistics } from '../../../mocks/data';

const meta = {
  title: 'UI/StatisticsGraph',
  component: StatisticsGraph,
  tags: ['autodocs'],
} satisfies Meta<typeof StatisticsGraph>;

export default meta;

export const Column = () => {
  return (
    <StatisticsGraph
      statistics={getCongestionStatistics('1').congestion.quick}
      align="column"
      menus={[...ENGLISH_DAYS]}
    />
  );
};

export const Row = () => {
  return (
    <StatisticsGraph
      statistics={getCongestionStatistics('1').congestion.quick}
      align="row"
      menus={[...ENGLISH_DAYS]}
    />
  );
};
