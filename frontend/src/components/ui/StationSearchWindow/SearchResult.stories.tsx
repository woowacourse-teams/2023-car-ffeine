import type { Meta } from '@storybook/react';
import { styled } from 'styled-components';

import SearchResult from './SearchResult';

const meta = {
  title: 'Components/SearchResult',
  component: SearchResult,
} satisfies Meta<typeof SearchResult>;

export default meta;

export const Default = () => {
  return (
    <S.Container>
      <SearchResult />
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    width: 34rem;
  `,
};
