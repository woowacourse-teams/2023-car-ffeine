import type { Meta } from '@storybook/react';

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
      description: '특정 영역의 충전소 갯수입니다.',
    },
  },
} satisfies Meta<typeof FooMarker>;

export default meta;

export const Default = (args: FooMarkerProps) => {
  return (
    <div style={{ width: 'fit-content' }}>
      <FooMarker {...args} />
    </div>
  );
};
