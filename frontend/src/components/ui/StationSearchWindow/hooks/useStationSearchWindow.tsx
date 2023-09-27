import type { FormEvent, MouseEvent, FocusEvent, ChangeEvent } from 'react';
import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useRenderStationMarker } from '@marker/StationMarkersContainer/hooks/useRenderStationMarker';

import { useSetExternalState } from '@utils/external-state';

import { googleMapActions } from '@stores/google-maps/googleMapStore';
import { markerInstanceStore } from '@stores/google-maps/markerInstanceStore';

import { useStationSummary } from '@hooks/google-maps/useStationSummary';
import { fetchSearchedStations } from '@hooks/tanstack-query/useSearch';
import useMediaQueries from '@hooks/useMediaQueries';

import { useNavigationBar } from '@ui/Navigator/NavigationBar/hooks/useNavigationBar';

import {
  QUERY_KEY_SEARCHED_STATION,
  QUERY_KEY_STATION_DETAILS,
  QUERY_KEY_STATION_MARKERS,
} from '@constants/queryKeys';
import { SERVER_URL } from '@constants/server';

import type { StationDetails, StationPosition } from '@type';

import StationDetailsWindow from '../../StationDetailsWindow/index';
import { convertStationDetailsToSummary } from '../utils/convertStationDetailsToSummary';

export const useStationSearchWindow = () => {
  const queryClient = useQueryClient();

  const [isFocused, setIsFocused] = useState(false);
  const [searchWord, setSearchWord] = useState('');

  const setMarkerInstances = useSetExternalState(markerInstanceStore);

  const { openLastPanel } = useNavigationBar();
  const { openStationSummary } = useStationSummary();
  const { createNewMarkerInstance, renderMarkerInstances } = useRenderStationMarker();

  const screen = useMediaQueries();

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
      const stationDetails = await fetch(
        `${SERVER_URL}/stations/${stationId}`
      ).then<StationDetails>((response) => response.json());

      const markerInstance = createNewMarkerInstance(stationDetails);

      setMarkerInstances((prev) => [...prev, { stationId, markerInstance }]);
      renderMarkerInstances(
        [{ stationId, markerInstance }],
        [convertStationDetailsToSummary(stationDetails)]
      );
      openStationSummary(stationId, markerInstance);

      queryClient.setQueryData([QUERY_KEY_STATION_DETAILS, stationId], stationDetails);
    }
  };

  const handleChangeSearchWord = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const searchWord = encodeURIComponent(value);

    setIsFocused(true);
    setSearchWord(searchWord);
  };

  return {
    handleSubmitSearchWord,
    handleChangeSearchWord,
    handleOpenResult,
    handleCloseResult,
    showStationDetails,
    isFocused,
    searchWord,
  };
};
