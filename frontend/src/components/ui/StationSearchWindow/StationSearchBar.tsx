import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { useState } from 'react';

import { useSearchStations } from '@hooks/tanstack-query/useSearchStations';
import { useDebounce } from '@hooks/useDebounce';

import Button from '@common/Button';
import Loader from '@common/Loader';

import SearchResult from './SearchResult';
import { StyledContainer, StyledForm, StyledSearch } from './StationSearchBar.style';
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

  const { data, isLoading, isError, isFetching } = useSearchStations(debouncedSearchWord);

  return (
    <StyledContainer>
      <StyledForm role="search" onSubmit={handleSubmitSearchWord}>
        <label htmlFor="station-search-bar" aria-hidden>
          <StyledSearch
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
      </StyledForm>
      {isFocused && data && (
        <SearchResult
          regions={data.cities}
          stations={data.stations}
          isLoading={isLoading}
          isError={isError}
          showStationDetails={showStationDetails}
          closeResult={handleCloseResult}
        />
      )}
    </StyledContainer>
  );
};

export default StationSearchBar;
