import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { styled } from 'styled-components';

import { useState } from 'react';

import { useSearchStations } from '@hooks/tanstack-query/useSearchStations';
import { useDebounce } from '@hooks/useDebounce';

import Button from '@common/Button';
import Loader from '@common/Loader';

import { pillStyle } from '@style';

import { MOBILE_BREAKPOINT } from '@constants';

import SearchResult from './SearchResult';
import { useStationSearchWindow } from './hooks/useStationSearchWindow';

const StationSearchBar = () => {
  const {
    handleSubmitSearchWord,
    handleChangeSearchWord,
    handleOpenResult,
    handleCloseResult,
    showStationDetails,
    isFocused,
    searchWord,
  } = useStationSearchWindow();
  const [debouncedSearchWord, setDebouncedSearchWord] = useState(searchWord);

  useDebounce(
    () => {
      setDebouncedSearchWord(searchWord);
    },
    [searchWord],
    400
  );

  const { data: stations, isLoading, isError, isFetching } = useSearchStations(debouncedSearchWord);

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
      {isFocused && stations && (
        <SearchResult
          stations={stations}
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
    ${pillStyle}

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

export default StationSearchBar;
