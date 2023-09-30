import type { Meta } from '@storybook/react';

import type { StationSummary } from '@type';

import CarFfeineMarker from './CarFfeineMarker';

const meta = {
  title: 'UI/CarFfeineMarker',
  component: CarFfeineMarker,
  tags: ['autodocs'],
  args: {
    availableCount: 2,
    stationName: '카페인 충전소',
  },
  argTypes: {
    availableCount: {
      description:
        '이용 가능한 충전기 개수를 변경할 수 있습니다. 0개를 입력할 경우 색상이 변합니다.',
    },
    stationName: {
      description: '마커 위에 마우스를 올렸을 때 나오는 충전소 이름을 변경할 수 있습니다.',
    },
  },
} satisfies Meta<typeof CarFfeineMarker>;

export default meta;

export const Default = (args: StationSummary) => {
  return <CarFfeineMarker {...args} />;
};
