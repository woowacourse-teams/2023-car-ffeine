import type { Meta } from '@storybook/react';

import Box from '@common/Box';

import type { FooMarkerProps } from './FooMarker';
import FooMarker from './FooMarker';

const meta = {
  title: 'UI/FooMarker',
  component: FooMarker,
  tags: ['autodocs'],
  args: {
    count: 99,
  },
  argTypes: {
    count: {
      description: '특정 영역의 충전소 개수입니다.',
    },
  },
} satisfies Meta<typeof FooMarker>;

export default meta;

export const Default = (args: FooMarkerProps) => {
  return (
    <Box width="fit-content">
      <FooMarker {...args} />
    </Box>
  );
};
