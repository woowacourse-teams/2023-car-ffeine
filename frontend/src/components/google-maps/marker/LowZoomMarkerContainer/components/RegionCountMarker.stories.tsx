import type { Meta } from '@storybook/react';

import type { RegionCountMarkerProps } from './RegionCountMarker';
import RegionCountMarker from './RegionCountMarker';

const meta = {
  title: 'UI/RegionCountMarker',
  component: RegionCountMarker,
  tags: ['autodocs'],
  args: {
    regionName: '서울특별시',
    count: 2,
  },
  argTypes: {
    regionName: {
      description: '지역명 입니다.',
    },
    count: {
      description: '특정 지역의 충전소 갯수입니다.',
    },
  },
} satisfies Meta<typeof RegionCountMarker>;

export default meta;

export const Default = (args: RegionCountMarkerProps) => {
  return (
    <div style={{ width: 'fit-content' }}>
      <RegionCountMarker {...args} />
    </div>
  );
};
