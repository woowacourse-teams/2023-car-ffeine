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
  const { showAvailableStationOnly, showFasterChargeStationOnly, showParkingFreeStationOnly } =
    useExternalValue(stationFilterStore);

  return useQuery({
    queryKey: ['stations'],
    queryFn: () => fetchStation(map),
    select: (data) => {
      return data.filter((station) => {
        const { availableCount, isParkingFree, chargers } = station;

        if (showAvailableStationOnly && availableCount === 0) return false;
        if (showFasterChargeStationOnly && !chargers.some((charger) => charger.type === '급속'))
          return false;
        if (showParkingFreeStationOnly && !isParkingFree) return false;

        return true;
      });
    },
  });
};
