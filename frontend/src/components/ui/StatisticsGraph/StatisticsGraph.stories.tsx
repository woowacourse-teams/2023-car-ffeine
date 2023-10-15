import { getCongestionStatistics } from '@mocks/data/congestions';
import type { Meta } from '@storybook/react';

import { ENGLISH_DAYS_OF_WEEK } from '@constants/congestion';

import StatisticsGraph from '.';

const meta = {
  title: 'UI/StatisticsGraph',
  component: StatisticsGraph,
  tags: ['autodocs'],
} satisfies Meta<typeof StatisticsGraph>;

export default meta;

// TODO: 스토리북 빌드 실패로 임시로 조치해뒀으니 수정 바랍니다.

export const Column = () => {
  return (
    <StatisticsGraph
      statistics={getCongestionStatistics('1').congestion.quick.FRI}
      align="column"
      menus={[...ENGLISH_DAYS_OF_WEEK]}
      dayOfWeek={'friday'}
      isLoading={false}
      onChangeDayOfWeek={() => null}
    />
  );
};

export const Row = () => {
  return (
    <StatisticsGraph
      statistics={getCongestionStatistics('1').congestion.quick.FRI}
      align="row"
      menus={[...ENGLISH_DAYS_OF_WEEK]}
      dayOfWeek={'friday'}
      isLoading={false}
      onChangeDayOfWeek={() => null}
    />
  );
};
