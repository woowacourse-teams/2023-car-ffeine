import type { Meta } from '@storybook/react';

import type { StationSearchProps } from './StationSearch';
import StationSearch from './StationSearch';

const meta = {
  title: 'Components/StationSearch',
  component: StationSearch,
  tags: ['autodocs'],
  args: {
    outlined: true,
    shadow: false,
  },
  argTypes: {
    shadow: {
      control: {
        type: 'boolean',
      },
      description: 'true: 검색창 주변으로 그림자가 생깁니다.',
    },
    outlined: {
      control: {
        type: 'boolean',
      },
      description: 'true: 검색창에 검은색 테두리가 생깁니다.',
    },
    background: {
      control: {
        type: 'color',
      },
      description: '선택한 색상에 따라 검색창 배경색이 변합니다.',
    },
    css: {
      description: '원하는 css를 적용할 수 있습니다.',
    },
  },
} satisfies Meta<typeof StationSearch>;

export default meta;

export const Default = (args: StationSearchProps) => {
  return <StationSearch {...args} />;
};
