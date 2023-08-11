import type { Meta } from '@storybook/react';
import { styled } from 'styled-components';

import SearchResultSkeleton from '@ui/StationSearchWindow/SearchResultSkeleton';

import type { SearchResultProps } from './SearchResult';
import SearchResult from './SearchResult';

const meta = {
  title: 'UI/SearchResult',
  component: SearchResult,
  args: {
    stations: [
      {
        stationId: '0',
        stationName: '충전소 이름이라네',
        speed: 'quick',
        address: '서울시 강남구 테헤란로 411',
        latitude: 1,
        longitude: 1,
      },
      {
        stationId: '1',
        stationName: '허허',
        speed: 'quick',
        address: '서울시 강남구 테헤란로 411',
        latitude: 1,
        longitude: 1,
      },
    ],
    isLoading: false,
    isError: false,
    setSelectedStationId: () => {
      ('');
    },
    showStationDetails: () => {
      ('');
    },
  },
} satisfies Meta<typeof SearchResult>;

export default meta;

export const Default = ({ ...args }: SearchResultProps) => {
  return (
    <S.Container>
      <SearchResult {...args} />
    </S.Container>
  );
};

export const Skeleton = ({ ...args }: SearchResultProps) => {
  return (
    <S.Container>
      <SearchResult {...args} />
      <SearchResultSkeleton />
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    width: 34rem;
  `,
};
