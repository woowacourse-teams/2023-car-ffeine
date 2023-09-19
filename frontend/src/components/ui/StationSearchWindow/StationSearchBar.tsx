import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { styled } from 'styled-components';

import { useState } from 'react';
import type { ChangeEvent, FocusEvent, FormEvent, MouseEvent } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useRenderStationMarker } from '@marker/hooks/useRenderStationMarker';

import { useExternalValue, useSetExternalState } from '@utils/external-state';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import { markerInstanceStore } from '@stores/google-maps/markerInstanceStore';
import { searchWordStore } from '@stores/searchWordStore';

import { fetchStationSummaries } from '@hooks/fetch/fetchStationSummaries';
import { useStationSummary } from '@hooks/google-maps/useStationSummary';
import { useSearchedStations } from '@hooks/tanstack-query/useSearchedStations';
import { useDebounce } from '@hooks/useDebounce';

import Button from '@common/Button';
import Loader from '@common/Loader';

import StationDetailsWindow from '@ui/StationDetailsWindow';
import { useNavigationBar } from '@ui/compound/NavigationBar/hooks/useNavigationBar';

import { pillStyle } from '@style';

import { MOBILE_BREAKPOINT } from '@constants';
import { INITIAL_ZOOM_SIZE } from '@constants/googleMaps';
import { QUERY_KEY_SEARCHED_STATION, QUERY_KEY_STATION_MARKERS } from '@constants/queryKeys';

import type { StationPosition } from '@type/stations';

import SearchResult from './SearchResult';

const StationSearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const googleMap = useExternalValue(getGoogleMapStore());

  const [inputValue, setInputValue] = useState('');
  const setSearchWord = useSetExternalState(searchWordStore);
  const queryClient = useQueryClient();
  const { openLastPanel } = useNavigationBar();
  const { openStationSummary } = useStationSummary();
  const { createNewMarkerInstance, renderMarkerInstances } = useRenderStationMarker();
  const setMarkerInstances = useSetExternalState(markerInstanceStore);

  useDebounce(
    () => {
      setSearchWord(inputValue);
    },
    [inputValue],
    400
  );

  const { data: stations, isLoading, isError, isFetching } = useSearchedStations();

  const handleOpenResult = (event: MouseEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setIsFocused(true);
  };

  const handleCloseResult = () => {
    setIsFocused(false);
  };

  const handleSubmitSearchWord = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleCloseResult();

    if (stations !== undefined && stations.length > 0) {
      const [{ stationId, latitude, longitude }] = stations;
      showStationDetails({ stationId, latitude, longitude });
    }

    queryClient.invalidateQueries({ queryKey: [QUERY_KEY_SEARCHED_STATION] });
  };

  const showStationDetails = ({ stationId, latitude, longitude }: StationPosition) => {
    googleMap.panTo({ lat: latitude, lng: longitude });
    googleMap.setZoom(INITIAL_ZOOM_SIZE);

    queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATION_MARKERS] });
    openLastPanel(<StationDetailsWindow stationId={stationId} />);

    fetchStationSummaries([stationId]).then((stationSummary) => {
      const markerInstance = createNewMarkerInstance(stationSummary[0]);

      setMarkerInstances((prev) => [...prev, { stationId, markerInstance }]);
      renderMarkerInstances([{ stationId, markerInstance }], stationSummary);
      openStationSummary(stationId, markerInstance);
    });
  };

  const handleRequestSearchResult = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const searchWord = encodeURIComponent(value);

    setInputValue(searchWord);
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
            onChange={handleRequestSearchResult}
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
