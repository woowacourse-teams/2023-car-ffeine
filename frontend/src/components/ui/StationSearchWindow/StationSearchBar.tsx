import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import FlexBox from '@common/FlexBox';
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
    searchResult,
    isLoading,
    isError,
    isFetching,
  } = useStationSearchWindow();

  return (
    <StyledContainer>
      <StyledForm role="search" onSubmit={handleSubmitSearchWord}>
        <label htmlFor="station-search-bar" aria-hidden>
          <StyledSearch
            id="station-search-bar"
            name="station-search"
            type="search"
            role="searchbox"
            placeholder="충전소명 또는 지역명을 입력해 주세요"
            autoComplete="off"
            onChange={handleChangeSearchWord}
            onFocus={handleOpenResult}
            onClick={handleOpenResult}
          />
          <FlexBox tag="button" aria-label="검색하기" height={2.4} alignItems="center">
            {isFetching ? (
              <Loader size="md" />
            ) : (
              <MagnifyingGlassIcon width="2.4rem" stroke="#767676" />
            )}
          </FlexBox>
        </label>
      </StyledForm>

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
    </StyledContainer>
  );
};

export default StationSearchBar;
