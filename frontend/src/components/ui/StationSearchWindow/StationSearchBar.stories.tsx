import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import type { Meta } from '@storybook/react';
import { styled } from 'styled-components';

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import { useSetExternalState } from '@utils/external-state';

import { searchWordStore } from '@stores/searchWordStore';
import { selectedStationIdStore } from '@stores/selectedStationStore';

import { useSearchedStations } from '@hooks/useSearchedStations';

import Button from '@common/Button';

import { pillStyle } from '@style';

import SearchResult from './SearchResult';

import type { StationPosition } from 'types';

const meta = {
  title: 'UI/StationSearchBar',
  decorators: [
    (Story) => (
      <S.Container>
        <Story />
      </S.Container>
    ),
  ],
} satisfies Meta;

export default meta;

export const Default = () => {
  const [isFocused, setIsFocused] = useState(false);
  const setSearchWord = useSetExternalState(searchWordStore);
  const setSelectedStationId = useSetExternalState(selectedStationIdStore);

  const { data: stations, isLoading, isError } = useSearchedStations();

  const handleSubmitSearchWord = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (stations) {
      const [{ stationId, latitude, longitude }] = stations;
      showStationDetails({ stationId, latitude, longitude });
    }
  };

  const showStationDetails = ({ stationId, latitude, longitude }: StationPosition) => {
    setSelectedStationId(stationId);
  };

  const handleRequestSearchResult = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const searchWord = encodeURIComponent(value);
    setSearchWord(searchWord);
  };

  return (
    <>
      <S.Form role="search" onSubmit={handleSubmitSearchWord}>
        <S.Search
          type="search"
          role="searchbox"
          onChange={handleRequestSearchResult}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Button type="submit" aria-label="검색하기">
          <MagnifyingGlassIcon width="2.4rem" stroke="#767676" />
        </Button>
      </S.Form>
      {isFocused && stations && (
        <SearchResult
          stations={stations}
          isLoading={isLoading}
          isError={isError}
          setSelectedStationId={setSelectedStationId}
          showStationDetails={showStationDetails}
        />
      )}
    </>
  );
};

const S = {
  Form: styled.form`
    position: relative;
  `,

  Search: styled.input`
    ${pillStyle}

    background: #fcfcfc;
    border: 1px solid #d0d2d8;

    width: 100%;
    padding: 1.9rem 4.6rem 2rem 1.8rem;
    font-size: 1.5rem;

    & + button {
      position: absolute;
      right: 2rem;
      top: 50%;
      transform: translateY(-50%);
    }

    &:focus {
      box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.2);
      outline: 0;
    }
  `,

  Container: styled.div`
    width: 34rem;
    margin-bottom: 2rem;

    &:last-child {
      margin-bottom: 0;
    }
  `,
};
