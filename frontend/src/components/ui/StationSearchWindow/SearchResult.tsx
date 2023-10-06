import { useEffect } from 'react';

import List from '@common/List';

import Error from '@ui/Error';
import SearchedRegionCard from '@ui/StationSearchWindow/SearchedRegionCard';

import type { SearchedRegion, SearchedStation, StationPosition } from '@type/stations';

import NoResult from './NoResult';
import { searchResultListCss } from './SearchResult.style';
import SearchedStationCard from './SearchedStationCard';

export interface SearchResultProps {
  regions: SearchedRegion[];
  stations: SearchedStation[];
  isLoading: boolean;
  isError: boolean;
  showStationDetails: (param: StationPosition) => void;
  closeResult: () => void;
}

const SearchResult = ({
  regions,
  stations,
  isLoading,
  isError,
  showStationDetails,
  closeResult,
}: SearchResultProps) => {
  const handleShowStationDetails = ({ stationId, latitude, longitude }: StationPosition) => {
    showStationDetails({ stationId, latitude, longitude });
  };

  useEffect(() => {
    document.body.addEventListener('click', closeResult);

    return () => {
      document.body.removeEventListener('click', closeResult);
    };
  }, []);

  if (isLoading) {
    return <></>;
  }

  if (isError)
    return (
      <Error
        title="문제가 발생했어요!"
        message="예상하지 못한 오류로"
        subMessage="검색 결과를 가져오지 못했습니다."
        fontSize="40%"
      />
    );

  return (
    <List aria-live="assertive" mt={1} css={searchResultListCss}>
      {stations.length ? (
        <>
          <SearchedRegionCard
            region={{
              regionName: '경기도 하남시',
              latitude: 37.539,
              longitude: 127.214,
            }}
          />
          <>
            {stations.map((station) => (
              <SearchedStationCard
                station={station}
                handleShowStationDetails={handleShowStationDetails}
                key={station.stationId}
              />
            ))}
          </>
        </>
      ) : (
        <NoResult />
      )}
    </List>
  );
};

export default SearchResult;
