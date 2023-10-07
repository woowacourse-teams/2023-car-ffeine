import { useEffect } from 'react';

import List from '@common/List';

import Error from '@ui/Error';

import type { SearchedCity, SearchedStation, StationPosition } from '@type/stations';

import NoResult from './NoResult';
import { searchResultListCss } from './SearchResult.style';
import SearchedCityCard from './SearchedCityCard';
import SearchedStationCard from './SearchedStationCard';

export interface SearchResultProps {
  cities: SearchedCity[];
  stations: SearchedStation[];
  isLoading: boolean;
  isError: boolean;
  showStationDetails: (param: StationPosition) => void;
  closeResult: () => void;
}

const SearchResult = ({
  cities,
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

  const isExistResults = stations.length !== 0 || cities.length !== 0;
  const renderResults = [
    ...cities.map((city) => <SearchedCityCard city={city} key={city.cityName} />),
    ...stations.map((station) => (
      <SearchedStationCard
        station={station}
        handleShowStationDetails={handleShowStationDetails}
        key={station.stationId}
      />
    )),
  ];

  if (isLoading) {
    return <></>;
  }

  if (isError)
    return (
      <List aria-live="assertive" mt={1} css={searchResultListCss}>
        <Error
          title="문제가 발생했어요!"
          message="예상하지 못한 오류로"
          subMessage="검색 결과를 가져오지 못했습니다."
          fontSize="20%"
          pt={6}
          pb={3}
        />
      </List>
    );

  return (
    <List aria-live="assertive" mt={1} css={searchResultListCss}>
      {isExistResults ? renderResults : <NoResult />}
    </List>
  );
};

export default SearchResult;
