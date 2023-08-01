import type { Meta } from '@storybook/react';
import { styled } from 'styled-components';

import type { SearchResultProps } from './SearchResult';
import SearchResult from './SearchResult';

const meta = {
  title: 'UI/SearchResult',
  component: SearchResult,
  args: {
    stations: [
      {
        stationId: 0,
        stationName: '충전소 이름이라네네',
        speed: 'STANDARD',
        address: '서울시 강남구 테헤란로 411',
        latitude: 1,
        longitude: 1,
      },
    ],
    isLoading: true,
    isError: true,
  },
} satisfies Meta<typeof SearchResult>;

export default meta;

export const Default = ({ stations, isLoading, isError }: SearchResultProps) => {
  return (
    <S.Container>
      <SearchResult stations={stations} isLoading={isLoading} isError={isError} />
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    width: 34rem;
  `,
};
