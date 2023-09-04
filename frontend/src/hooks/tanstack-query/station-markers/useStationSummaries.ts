import { useQuery } from '@tanstack/react-query';

import { serverUrlStore } from '@stores/config/serverUrlStore';

import { DELIMITER } from '@constants';
import { QUERY_KEY_STATION_SUMMARIES } from '@constants/queryKeys';

import type { StationMarker, StationSummary } from '@type';

import { useStationMarkers } from './useStationMarkers';

const fetchStationSummaries = async (markers: StationMarker[]) => {
  const stationIds = markers.map((marker) => marker.stationId);

  const serverUrl = serverUrlStore.getState();
  const stationSummaries = await fetch(
    `${serverUrl}/stations/summary?stationIds=${stationIds.join(DELIMITER)}`,
    {
      method: 'GET',
    }
  ).then<StationSummary[]>(async (response) => {
    const data = await response.json();

    return data.stations;
  });

  return stationSummaries;
};

export const useStationSummaries = (filteredMarkers: StationMarker[]) => {
  return useQuery({
    queryKey: [QUERY_KEY_STATION_SUMMARIES],
    queryFn: () => fetchStationSummaries(filteredMarkers),
  });
};
