import type { Meta } from '@storybook/react';

import Text from '@common/Text';

import type { BoxProps } from './Box';
import Box from './Box';

const meta = {
  title: 'Components/Box',
  component: Box,
  tags: ['autodocs'],
  args: {
    border: false,
    pl: 0,
    pr: 0,
    pt: 0,
    pb: 0,
    px: 0,
    py: 0,
    p: 0,
    ml: 0,
    mr: 0,
    mt: 0,
    mb: 0,
    mx: 0,
    my: 0,
    m: 0,
    height: 0,
    minHeight: 0,
    maxHeight: 0,
    width: 0,
    minWidth: 0,
    maxWidth: 0,
  },
  argTypes: {
    children: {
      description: 'div처럼 사용할 수 있습니다.',
    },
    border: {
      description: '테두리를 그릴 수 있습니다.',
    },
    pl: {
      description: '왼쪽의 방향으로 패딩을 줍니다. 우선순위가 제일 높습니다.',
    },
    pr: {
      description: '오른쪽의 방향으로 패딩을 줍니다. 우선순위가 제일 높습니다.',
    },
    pt: {
      description: '천장의 방향으로 패딩을 줍니다. 우선순위가 제일 높습니다.',
    },
    pb: {
      description: '바닥의 방향으로 패딩을 줍니다. 우선순위가 제일 높습니다.',
    },
    px: {
      description: 'x축의 방향으로 패딩을 줍니다. 우선순위가 중간입니다.',
    },
    py: {
      description: 'y축의 방향으로 패딩을 줍니다. 우선순위가 중간입니다.',
    },
    p: {
      description: '4방향으로 패딩을 줍니다. 우선순위가 제일 낮습니다.',
    },
    ml: {
      description: '왼쪽의 방향으로 마진을 줍니다. 우선순위가 제일 높습니다.',
    },
    mr: {
      description: '오른쪽의 방향으로 마진을 줍니다. 우선순위가 제일 높습니다.',
    },
    mt: {
      description: '천장의 방향으로 마진을 줍니다. 우선순위가 제일 높습니다.',
    },
    mb: {
      description: '바닥의 방향으로 마진을 줍니다. 우선순위가 제일 높습니다.',
    },
    mx: {
      description: 'x축의 방향으로 마진을 줍니다. 우선순위가 중간입니다.',
    },
    my: {
      description: 'y축의 방향으로 마진을 줍니다. 우선순위가 중간입니다.',
    },
    m: {
      description: '4방향으로 마진을 줍니다. 우선순위가 제일 낮습니다.',
    },
    height: {
      description: '높이 길이를 설정할 수 있습니다. 정수 * 0.4 rem 만큼의 길이가 설정됩니다.',
    },
    minHeight: {
      description: '최소 높이 길이를 설정할 수 있습니다. 정수 * 0.4 rem 만큼의 길이가 설정됩니다.',
    },
    maxHeight: {
      description: '최대 높이 길이를 설정할 수 있습니다. 정수 * 0.4 rem 만큼의 길이가 설정됩니다.',
    },
    width: {
      description: '너비 길이를 설정할 수 있습니다. 정수 * 0.4 rem 만큼의 길이가 설정됩니다.',
    },
    minWidth: {
      description: '최소 너비 길이를 설정할 수 있습니다. 정수 * 0.4 rem 만큼의 길이가 설정됩니다.',
    },
    maxWidth: {
      description: '최대 너비 길이를 설정할 수 있습니다. 정수 * 0.4 rem 만큼의 길이가 설정됩니다.',
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

export const Bordered = () => {
  return (
    <Box border>
      <Text variant="body">테두리가 있는 박스입니다.</Text>
    </Box>
  );
};
