import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY_SERVER_STATION_FILTERS } from '@constants/queryKeys';
import { SERVER_URL } from '@constants/server';

import type { StationFilters } from '@type';

const fetchServerStationFilters = async () => {
  const serverStationFilters = await fetch(`${SERVER_URL}/filters`).then<StationFilters>(
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
