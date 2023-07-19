import { useQuery } from '@tanstack/react-query';

import { useExternalValue } from '@utils/external-state';
import { getDisplayPosition } from '@utils/google-maps';

import { stationFilterStore } from '@stores/stationFilterStore';

import type { Station } from 'types';

export const fetchStation = async (map: google.maps.Map) => {
  const stationQuery = getDisplayPosition(map);

  const stations = await fetch('/stations', {
    method: 'POST',
    body: JSON.stringify(stationQuery),
  }).then<Station[]>((response) => response.json());

  return stations;
};

export const useStations = (map: google.maps.Map) => {
  const {
    isShowingAvailableStationOnly,
    isShowingFastChargeStationOnly,
    isShowingParkingFreeStationOnly,
  } = useExternalValue(stationFilterStore);

  return useQuery({
    queryKey: ['stations'],
    queryFn: () => fetchStation(map),
    select: (data) => {
      return data.filter((station) => {
        const { availableCount, isParkingFree, chargers } = station;

        if (isShowingAvailableStationOnly && availableCount === 0) return false;
        if (isShowingFastChargeStationOnly && !chargers.some((charger) => charger.type === '급속'))
          return false;
        if (isShowingParkingFreeStationOnly && !isParkingFree) return false;

        return true;
      });
    },
  });
};
