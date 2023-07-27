import type { Meta } from '@storybook/react';

import Text from '@common/Text';

import type { BoxProps } from './Box';
import Box from './Box';

const meta = {
  title: 'Components/Box',
  component: Box,
  tags: ['autodocs'],
  args: {
    children: 'Box',
  },
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'div처럼 사용할 수 있습니다.',
    },
  },
} satisfies Meta<typeof Box>;

export default meta;

export const Default = (args: BoxProps) => {
  return (
    <Box {...args}>
      <Text variant="body">이것은 아무것도 없는 박스입니다.</Text>
    </Box>
  );
};
