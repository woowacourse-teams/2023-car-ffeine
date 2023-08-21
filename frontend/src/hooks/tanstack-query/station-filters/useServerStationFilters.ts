import { useQuery } from '@tanstack/react-query';

import { serverUrlStore } from '@stores/config/serverUrlStore';

import { QUERY_KEY_SERVER_STATION_FILTERS } from '@constants/queryKeys';

import type { StationFilters } from '@type';

const fetchServerStationFilters = async () => {
  const serverUrl = serverUrlStore.getState();

  const serverStationFilters = await fetch(`${serverUrl}/filters`).then<StationFilters>(
    (response) => response.json()
  );

  return serverStationFilters;
};

export const useServerStationFilters = () => {
  return useQuery({
    queryKey: [QUERY_KEY_SERVER_STATION_FILTERS],
    queryFn: fetchServerStationFilters,
  });
};
