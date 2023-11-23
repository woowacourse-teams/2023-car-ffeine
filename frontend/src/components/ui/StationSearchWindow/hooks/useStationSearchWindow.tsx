import { getChargerCountsAndAvailability } from '@tools/getChargerCountsAndAvailability';

import type { ChangeEvent, FocusEvent, FormEvent, MouseEvent } from 'react';
import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useMarker } from '@marker/hooks/useMarker';

import { googleMapActions } from '@stores/google-maps/googleMapStore';
import { markerInstanceStore } from '@stores/google-maps/markerInstanceStore';

import { useStationInfoWindow } from '@hooks/google-maps/useStationInfoWindow';
import type { SearchedStationResponse } from '@hooks/tanstack-query/useSearchStations';
import { fetchSearchedStations, useSearchStations } from '@hooks/tanstack-query/useSearchStations';
import { useDebounce } from '@hooks/useDebounce';
import useMediaQueries from '@hooks/useMediaQueries';

import { useNavigationBar } from '@ui/Navigator/NavigationBar/hooks/useNavigationBar';

import { QUERY_KEY_SEARCHED_STATION } from '@constants/queryKeys';
import { SERVER_URL } from '@constants/server';

import type { StationDetails, StationPosition } from '@type';

import StationDetailsWindow from '../../StationDetailsWindow/index';

export const useStationSearchWindow = () => {
  const screen = useMediaQueries();

  const [isFocused, setIsFocused] = useState(false);

  const queryClient = useQueryClient();

  const [searchWord, setSearchWord] = useState('');
  const [debouncedSearchWord, setDebouncedSearchWord] = useState(searchWord);
  const [userSearchWord, setUserSearchWord] = useState('');

  const { openLastPanel } = useNavigationBar();
  const { openStationInfoWindow } = useStationInfoWindow();
  const { renderDefaultMarker } = useMarker();

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

  const handleOpenResult = (
    event?: MouseEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>
  ) => {
    if (event !== undefined) {
      event.stopPropagation();
    }

    setIsFocused(true);
  };

  const handleCloseResult = () => {
    setIsFocused(false);
  };

  const showStationDetails = async ({ stationId, latitude, longitude }: StationPosition) => {
    googleMapActions.moveTo({ lat: latitude, lng: longitude });

    if (!screen.get('isMobile')) {
      openLastPanel(<StationDetailsWindow stationId={stationId} />);
    }

    const isStationInDisplayPosition = markerInstanceStore
      .getState()
      .some(({ id: cachedStationId }) => cachedStationId === stationId);

    if (isStationInDisplayPosition) {
      openStationInfoWindow(stationId);
    } else {
      const stationDetails = await fetch(
        `${SERVER_URL}/stations/${stationId}`
      ).then<StationDetails>((response) => response.json());
      const { quickChargerCount, availableCount } = getChargerCountsAndAvailability(
        stationDetails.chargers
      );
      const { stationName, latitude, longitude, isParkingFree, isPrivate } = stationDetails;

      renderDefaultMarker({
        stationId,
        stationName,
        latitude,
        longitude,
        isParkingFree,
        isPrivate,
        availableCount,
        quickChargerCount,
      });

      openStationInfoWindow(stationId);
    }
  };

  const showStationDetailsIfFound = (searchedStations: SearchedStationResponse) => {
    const isSearchedStationExisting = searchedStations?.stations.length > 0;

    if (isSearchedStationExisting) {
      const [{ stationId, latitude, longitude }] = searchedStations.stations;
      showStationDetails({ stationId, latitude, longitude });
      handleCloseResult();

      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_SEARCHED_STATION] });
    }
  };

  const handleSubmitSearchWord = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleCloseResult();

    const searchWordFromForm = new FormData(event.currentTarget).get('station-search');
    const encodedSearchWord = encodeURIComponent(String(searchWordFromForm));
    const isSameAsPreviousSearchWord = encodedSearchWord === userSearchWord;

    if (isSameAsPreviousSearchWord) {
      return;
    }

    setUserSearchWord(encodedSearchWord);

    if (searchWord === debouncedSearchWord) {
      showStationDetailsIfFound(searchResult);

      return;
    }

    const searchedStations = await fetchSearchedStations(encodedSearchWord);
    showStationDetailsIfFound(searchedStations);
  };

  const handleChangeSearchWord = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const searchWord = encodeURIComponent(value);

    handleOpenResult();
    setSearchWord(searchWord);
  };

  return {
    handleSubmitSearchWord,
    handleChangeSearchWord,
    handleOpenResult,
    handleCloseResult,
    showStationDetails,
    isFocused,
    debouncedSearchWord,
    searchResult,
    isLoading,
    isError,
    isFetching,
  };
};
