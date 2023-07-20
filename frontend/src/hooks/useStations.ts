import { useQuery } from '@tanstack/react-query';

import { useExternalValue } from '@utils/external-state';
import { getDisplayPosition } from '@utils/google-maps';

import { stationFilterStore } from '@stores/stationFilterStore';

import type { StationSummary } from 'types';

export const fetchStation = async (map: google.maps.Map) => {
  const displayPosition = getDisplayPosition(map);
  const displayPositionString = Object.fromEntries(
    Object.entries(displayPosition).map(([key, value]) => [key, String(value)])
  );

  const displayPositionParams = String(new URLSearchParams(displayPositionString));

  const stations = await fetch(`/stations?${displayPositionParams}`, {
    method: 'GET',
  }).then<StationSummary[]>((response) => response.json());

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
          isFastChargeStationFilterSelected && !chargers.some((charger) => charger.capacity > 50);
        const isNoFreeParking = isParkingFreeStationFilterSelected && !isParkingFree;

        if (isNoAvailable || isNoFastCharge || isNoFreeParking) return false;
        return true;
      });
    },
  });
};
