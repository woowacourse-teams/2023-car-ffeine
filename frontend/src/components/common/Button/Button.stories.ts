import type { Meta, StoryObj } from '@storybook/react';

import Button, { BUTTON_PADDING_SIZE } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Button',
    outlined: true,
    shadow: false,
    size: 'sm',
    onClick: () => {
      alert('click');
    },
  },

  argTypes: {
    children: {
      description:
        '버튼 내용을 입력할 수 있습니다.<br> 원하는 컴포넌트, 텍스트 등을 넣을 수 있습니다.',
    },
    variant: {
      options: { none: undefined, pill: 'pill' },
      control: {
        type: 'select',
      },
      description: '버튼 모양을 변경할 수 있습니다.',
    },
    noRadius: {
      options: { none: undefined, all: 'all', top: 'top', bottom: 'bottom' },
      control: {
        type: 'select',
      },
      description: '특정 방향의 radius 속성을 제거할 수 있습니다.',
    },
    shadow: {
      control: {
        type: 'boolean',
      },
      description: 'true: 버튼 주변으로 그림자가 생깁니다.',
    },
    size: {
      options: Object.keys({ ...BUTTON_PADDING_SIZE, none: undefined }),
      control: {
        type: 'select',
      },
      description: '선택한 사이즈에 따라 버튼의 크기가 변합니다.',
    },
    outlined: {
      control: {
        type: 'boolean',
      },
      description: 'true: 버튼에 검은색 테두리가 생깁니다.',
    },
    background: {
      control: {
        type: 'color',
      },
      description: '선택한 색상에 따라 버튼의 배경색이 변합니다.',
    },
    css: {
      description: '원하는 css를 적용할 수 있습니다.',
    },
    onClick: {
      control: {},
    },
  },
};
