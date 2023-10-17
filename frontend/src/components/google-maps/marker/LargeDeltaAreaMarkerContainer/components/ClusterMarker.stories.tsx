import type { Meta } from '@storybook/react';

import Box from '@common/Box';

import type { ClusterMarkerProps } from './ClusterMarker';
import ClusterMarker from './ClusterMarker';

const meta = {
  title: 'UI/ClusterMarker',
  component: ClusterMarker,
  tags: ['autodocs'],
  args: {
    count: 99,
  },
  argTypes: {
    count: {
      description: '특정 영역의 충전소 개수입니다.',
    },
  },
} satisfies Meta<typeof ClusterMarker>;

export default meta;

export const Default = (args: ClusterMarkerProps) => {
  return (
    <Box width="fit-content">
      <ClusterMarker {...args} />
    </Box>
  );
};
