import { getChargerCountsAndAvailability } from '@tools/getChargerCountsAndAvailability';

import type { ChangeEvent, FocusEvent, FormEvent, MouseEvent } from 'react';
import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useMarker } from '@marker/hooks/useRenderMarker';

import { googleMapActions } from '@stores/google-maps/googleMapStore';
import { markerInstanceStore } from '@stores/google-maps/markerInstanceStore';

import { useStationInfoWindow } from '@hooks/google-maps/useStationInfoWindow';
import { fetchSearchedStations } from '@hooks/tanstack-query/useSearchStations';
import useMediaQueries from '@hooks/useMediaQueries';

import { useNavigationBar } from '@ui/Navigator/NavigationBar/hooks/useNavigationBar';

import { QUERY_KEY_SEARCHED_STATION } from '@constants/queryKeys';
import { SERVER_URL } from '@constants/server';

import type { StationDetails, StationPosition } from '@type';

import StationDetailsWindow from '../../StationDetailsWindow/index';

export const useStationSearchWindow = () => {
  const queryClient = useQueryClient();

  const [isFocused, setIsFocused] = useState(false);
  const [searchWord, setSearchWord] = useState('');

  const { renderDefaultMarker } = useMarker();

  const { openLastPanel } = useNavigationBar();
  const { openStationInfoWindow } = useStationInfoWindow();

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

    if (searchedStations !== undefined && searchedStations.stations.length > 0) {
      const [{ stationId, latitude, longitude }] = searchedStations.stations;
      showStationDetails({ stationId, latitude, longitude });
    }

    queryClient.invalidateQueries({ queryKey: [QUERY_KEY_SEARCHED_STATION] });
  };

  const showStationDetails = async ({ stationId, latitude, longitude }: StationPosition) => {
    googleMapActions.moveTo({ lat: latitude, lng: longitude });

    if (!screen.get('isMobile')) {
      openLastPanel(<StationDetailsWindow stationId={stationId} />);
    }

    // 지금 보여지는 화면에 검색한 충전소가 존재할 경우의 처리
    if (
      markerInstanceStore
        .getState()
        .some(({ id: cachedStationId }) => cachedStationId === stationId)
    ) {
      openStationInfoWindow(stationId);
    } else {
      const stationDetails = await fetch(
        `${SERVER_URL}/stations/${stationId}`
      ).then<StationDetails>((response) => response.json());
      const { availableQuickChargerCount, availableStandardChargerCount, quickChargerCount } =
        getChargerCountsAndAvailability(stationDetails.chargers);
      const { stationName, latitude, longitude, isParkingFree, isPrivate } = stationDetails;

      renderDefaultMarker({
        stationId,
        stationName,
        latitude,
        longitude,
        isParkingFree,
        isPrivate,
        availableCount: availableQuickChargerCount + availableStandardChargerCount,
        quickChargerCount,
      });

      openStationInfoWindow(stationId);
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
