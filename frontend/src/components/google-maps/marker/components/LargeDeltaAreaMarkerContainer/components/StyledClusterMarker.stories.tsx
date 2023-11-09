import type { Meta } from '@storybook/react';

import Box from '@common/Box';

import type { StyledClusterMarkerProps } from './StyledClusterMarker';
import StyledClusterMarker from './StyledClusterMarker';

const meta = {
  title: 'UI/StyledClusterMarker',
  component: StyledClusterMarker,
  tags: ['autodocs'],
  args: {
    count: 99,
  },
  argTypes: {
    count: {
      description: '특정 영역의 충전소 개수입니다.',
    },
  },
} satisfies Meta<typeof StyledClusterMarker>;

export default meta;

export const Default = (args: StyledClusterMarkerProps) => {
  return (
    <Box width="fit-content">
      <StyledClusterMarker {...args} />
    </Box>
  );
};
