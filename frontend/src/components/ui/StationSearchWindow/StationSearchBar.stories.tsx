import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import type { Meta } from '@storybook/react';
import { styled } from 'styled-components';

import type { ChangeEvent, FocusEvent, FormEvent, MouseEvent } from 'react';
import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { fetchSearchedStations, useSearchStations } from '@hooks/tanstack-query/useSearchStations';
import { useDebounce } from '@hooks/useDebounce';

import Loader from '@common/Loader';

import { useNavigationBar } from '@ui/Navigator/NavigationBar/hooks/useNavigationBar';
import StationDetailsWindow from '@ui/StationDetailsWindow';

import { MOBILE_BREAKPOINT } from '@constants';
import { QUERY_KEY_SEARCHED_STATION, QUERY_KEY_STATION_MARKERS } from '@constants/queryKeys';

import { pillStyle } from '../../../style';
import type { StationPosition } from '../../../types';
import Button from '../../common/Button';
import SearchResult from './SearchResult';

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

// TODO: addon으로 googleMap 관련 함수 제외하기
export const Default = () => {
  const [isFocused, setIsFocused] = useState(false);

  const [searchWord, setSearchWord] = useState('');
  const [debouncedSearchWord, setDebouncedSearchWord] = useState(searchWord);
  const queryClient = useQueryClient();
  const { openLastPanel } = useNavigationBar();

  useDebounce(
    () => {
      setDebouncedSearchWord(searchWord);
    },
    [searchWord],
    400
  );

  const {
    data: searchResult,
    isLoading,
    isError,
    isFetching,
  } = useSearchStations(debouncedSearchWord);

  const handleOpenResult = (event: MouseEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setIsFocused(true);
  };

  const handleCloseResult = () => {
    setIsFocused(false);
  };

  const handleSubmitSearchWord = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleCloseResult();

    const { stations } = await fetchSearchedStations(searchWord);

    if (stations !== undefined && stations.length > 0) {
      const [{ stationId, latitude, longitude }] = stations;
      showStationDetails({ stationId, latitude, longitude });
    }

    queryClient.invalidateQueries({ queryKey: [QUERY_KEY_SEARCHED_STATION] });
  };

  const showStationDetails = ({ stationId, latitude, longitude }: StationPosition) => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATION_MARKERS] });
    openLastPanel(<StationDetailsWindow stationId={stationId} />);
  };

  const handleChangeSearchWord = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const searchWord = encodeURIComponent(value);

    setIsFocused(true);
    setSearchWord(searchWord);
  };

  return (
    <S.Container>
      <S.Form role="search" onSubmit={handleSubmitSearchWord}>
        <label htmlFor="station-search-bar" aria-hidden>
          <S.Search
            id="station-search-bar"
            type="search"
            role="searchbox"
            placeholder="충전소명 또는 지역명을 입력해 주세요"
            autoComplete="off"
            onChange={handleChangeSearchWord}
            onFocus={handleOpenResult}
            onClick={handleOpenResult}
          />
          <Button type="submit" aria-label="검색하기">
            {isFetching ? (
              <Loader size="md" />
            ) : (
              <MagnifyingGlassIcon width="2.4rem" stroke="#767676" />
            )}
          </Button>
        </label>
      </S.Form>
      {isFocused && searchResult && (
        <SearchResult
          cities={searchResult.cities}
          stations={searchResult.stations}
          isLoading={isLoading}
          isError={isError}
          showStationDetails={showStationDetails}
          closeResult={handleCloseResult}
        />
      )}
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    width: 30rem;

    @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
      width: 100%;
    }
  `,

  Form: styled.form`
    position: relative;
    min-width: 30rem;

    @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
      min-width: 100%;
    }
  `,

  Search: styled.input`
    ${pillStyle};

    background: #fcfcfc;
    border: 1px solid #d0d2d8;

    width: 100%;
    padding: 1.9rem 4.6rem 2rem 1.8rem;
    font-size: 1.3rem;

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
};
