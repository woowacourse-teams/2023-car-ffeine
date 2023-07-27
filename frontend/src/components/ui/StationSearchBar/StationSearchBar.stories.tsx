import type { Meta } from '@storybook/react';
import { styled } from 'styled-components';

import type { StationSearchBarProps } from './StationSearchBar';
import StationSearchBar from './StationSearchBar';

const meta = {
  title: 'Components/StationSearchBar',
  component: StationSearchBar,
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
    borderColor: {
      control: {
        type: 'color',
      },
      description: '선택한 색상에 따라 검색창 외곽선 색과 돋보기 아이콘 색이 변합니다.',
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
} satisfies Meta<typeof StationSearchBar>;

export default meta;

export const Default = (args: StationSearchBarProps) => {
  return (
    <S.Container>
      <StationSearchBar {...args} />
    </S.Container>
  );
};

export const Styles = (args: StationSearchBarProps) => {
  return (
    <>
      <S.Container>
        <StationSearchBar {...args} />
      </S.Container>
      <S.Container>
        <StationSearchBar shadow borderColor="#787878" />
      </S.Container>
    </>
  );
};

const S = {
  Container: styled.div`
    width: 34rem;
  `,
};
