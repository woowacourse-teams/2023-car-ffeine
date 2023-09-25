import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { styled } from 'styled-components';

import type { ChangeEvent, FocusEvent, FormEvent, MouseEvent } from 'react';
import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useRenderStationMarker } from '@marker/hooks/useRenderStationMarker';

import { useSetExternalState } from '@utils/external-state';

import { googleMapActions } from '@stores/google-maps/googleMapStore';
import { markerInstanceStore } from '@stores/google-maps/markerInstanceStore';

import { useStationSummary } from '@hooks/google-maps/useStationSummary';
import {
  fetchSearchedStations,
  useSearchedStations,
} from '@hooks/tanstack-query/useSearchedStations';
import { useDebounce } from '@hooks/useDebounce';
import useMediaQueries from '@hooks/useMediaQueries';

import Button from '@common/Button';
import Loader from '@common/Loader';

import StationDetailsWindow from '@ui/StationDetailsWindow';
import { useNavigationBar } from '@ui/compound/NavigationBar/hooks/useNavigationBar';

import { pillStyle } from '@style';

import { MOBILE_BREAKPOINT } from '@constants';
import { QUERY_KEY_SEARCHED_STATION, QUERY_KEY_STATION_MARKERS } from '@constants/queryKeys';
import { SERVER_URL } from '@constants/server';

import type { StationMarker, StationPosition } from '@type/stations';

import SearchResult from './SearchResult';

const StationSearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [debouncedSearchWord, setDebouncedSearchWord] = useState(searchWord);

  const queryClient = useQueryClient();
  const { openLastPanel } = useNavigationBar();
  const { openStationSummary } = useStationSummary();
  const { createNewMarkerInstance, renderMarkerInstances } = useRenderStationMarker();
  const setMarkerInstances = useSetExternalState(markerInstanceStore);
  const screen = useMediaQueries();

  useDebounce(
    () => {
      setDebouncedSearchWord(searchWord);
    },
    [searchWord],
    400
  );

  const {
    data: stations,
    isLoading,
    isError,
    isFetching,
  } = useSearchedStations(debouncedSearchWord);

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

    const searchedStations = await fetchSearchedStations(searchWord);

    if (searchedStations !== undefined && searchedStations.length > 0) {
      const [{ stationId, latitude, longitude }] = searchedStations;
      showStationDetails({ stationId, latitude, longitude });
    }

    queryClient.invalidateQueries({ queryKey: [QUERY_KEY_SEARCHED_STATION] });
  };

  const showStationDetails = async ({ stationId, latitude, longitude }: StationPosition) => {
    googleMapActions.moveTo({ lat: latitude, lng: longitude });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATION_MARKERS] });

    if (!screen.get('isMobile')) {
      openLastPanel(<StationDetailsWindow stationId={stationId} />);
    }

    // 지금 보여지는 화면에 검색한 충전소가 존재할 경우의 처리
    if (
      markerInstanceStore
        .getState()
        .some(({ stationId: cachedStationId }) => cachedStationId === stationId)
    ) {
      openStationSummary(stationId);
    } else {
      // 지금 보여지는 화면에 검색한 충전소가 존재하지 않을 경우의 처리 (api가 새로 필요할듯 합니다. 일단 급한 버그 잡기를 위해 마구잡이로 이렇게 구현해버립니다.
      const stationMarkers = await fetch(
        `${SERVER_URL}/stations?longitude=${longitude}&latitude=${latitude}&longitudeDelta=0.000000000000000001&latitudeDelta=0.000000000000000001&zoom=16`
      ).then<StationMarker[]>(async (response) => {
        const data = await response.json();

        return data.stations;
      });
      const stationMarker = stationMarkers.find((station) => station.stationId === stationId);
      if (stationMarker !== undefined) {
        const markerInstance = createNewMarkerInstance({
          address: '',
          companyName: '',
          detailLocation: '',
          operatingTime: '',
          totalCount: 0,
          ...stationMarker,
        });
        setMarkerInstances((prev) => [...prev, { stationId, markerInstance }]);
        renderMarkerInstances([{ stationId, markerInstance }], [stationMarker]);
        openStationSummary(stationId, markerInstance);
      }
    }

    // 지금 보여지는 화면에 충전소가 존재하지 않으면 따로 하나의 충전소만 요청을 발생시켜 마커를 생성
    // 마커가 없어서 infoWindow를 렌더링 하지 못하는 문제 해결
    // fetchStationSummaries([stationId]).then((stationSummaries) => {
    //   const stationSummary = stationSummaries[0];
    //   const markerInstance = createNewMarkerInstance(stationSummary);
    //
    //   setMarkerInstances((prev) => [...prev, { stationId, markerInstance }]);
    //   renderMarkerInstances([{ stationId, markerInstance }], [stationSummary]);
    //   openStationSummary(stationId, markerInstance);
    // });
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
