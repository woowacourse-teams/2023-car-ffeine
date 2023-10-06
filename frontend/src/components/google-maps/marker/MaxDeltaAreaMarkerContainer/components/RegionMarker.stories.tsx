import type { Meta } from '@storybook/react';

import type { RegionMarkerProps } from './RegionMarker';
import RegionMarker from './RegionMarker';

const meta = {
  title: 'UI/RegionMarker',
  component: RegionMarker,
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
} satisfies Meta<typeof RegionMarker>;

export default meta;

export const Default = (args: RegionMarkerProps) => {
  return (
    <div style={{ width: 'fit-content' }}>
      <RegionMarker {...args} />
    </div>
  );
};
