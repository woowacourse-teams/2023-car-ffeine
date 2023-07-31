import { congestions } from '@mocks/data';
import type { Meta } from '@storybook/react';

import StatisticsGraph from './StatisticsGraph';

const meta = {
  title: 'UI/StatisticsGraph',
  component: StatisticsGraph,
  tags: ['autodocs'],
} satisfies Meta<typeof StatisticsGraph>;

export default meta;

export const Default = () => {
  return <StatisticsGraph statistics={congestions} />;
};
