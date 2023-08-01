import type { Meta } from '@storybook/react';
import { styled } from 'styled-components';

import StationSearchBar from './StationSearchBar';

const meta = {
  title: 'UI/StationSearchBar',
  component: StationSearchBar,
  tags: ['autodocs'],
} satisfies Meta<typeof StationSearchBar>;

export default meta;

export const Default = () => {
  return (
    <S.Container>
      <StationSearchBar />
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    width: 34rem;
    margin-bottom: 2rem;

    &:last-child {
      margin-bottom: 0;
    }
  `,
};
