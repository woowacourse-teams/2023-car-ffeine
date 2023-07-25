import { useQuery } from '@tanstack/react-query';

import { useExternalValue } from '@utils/external-state';
import { getDisplayPosition } from '@utils/google-maps';
import { getQueryFormattedUrl } from '@utils/request-query-params';

import { stationFilterStore } from '@stores/stationFilterStore';

import { BASE_URL } from '@constants';

import type { StationSummary } from 'types';

export const fetchStation = async (map: google.maps.Map) => {
  const displayPosition = Object.fromEntries(
    Object.entries(getDisplayPosition(map)).map(([key, value]) => [key, String(value)])
  );

  const companyNameExample = ['파워큐브', '에버온', '환경부', '한국전력'];
  const capacityExample = [3, 7, 50, 100, 200];

  const requestQueryParams = getQueryFormattedUrl({
    ...displayPosition,
    companyName: companyNameExample.join(','),
    capacity: capacityExample.join(','),
  });

  const stations = await fetch(`${BASE_URL}/stations?${requestQueryParams}`, {
    method: 'GET',
  }).then<StationSummary[]>(async (response) => {
    const data = await response.json();

    return data.stations;
  });

  return stations;
};

export const useStations = (map: google.maps.Map) => {
  const {
    isAvailableStationFilterSelected,
    isFastChargeStationFilterSelected,
    isParkingFreeStationFilterSelected,
  } = useExternalValue(stationFilterStore);

  return useQuery({
    queryKey: ['stations'],
    queryFn: () => fetchStation(map),
    select: (data) => {
      return data.filter((station) => {
        const { availableCount, isParkingFree, chargers } = station;

        const isNoAvailable = isAvailableStationFilterSelected && availableCount === 0;
        const isNoFastCharge =
          isFastChargeStationFilterSelected && !chargers.some((charger) => charger.capacity >= 50);
        const isNoFreeParking = isParkingFreeStationFilterSelected && !isParkingFree;

        if (isNoAvailable || isNoFastCharge || isNoFreeParking) return false;
        return true;
      });
    },
  });
};
