import { useQuery } from '@tanstack/react-query';
import { getDisplayPosition } from '../utils/google-maps';
import type { Station } from '../types';

export const fetchStation = async (map: google.maps.Map) => {
  const stationQuery = getDisplayPosition(map);

  const stations = await fetch('/stations', {
    method: 'POST',
    body: JSON.stringify(stationQuery),
  }).then<Station[]>((response) => response.json());

  return stations;
};

export const useStations = (map: google.maps.Map) => {
  return useQuery({ queryKey: ['stations'], queryFn: () => fetchStation(map) });
};
