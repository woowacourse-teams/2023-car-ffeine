import { useQuery } from '@tanstack/react-query';

import type { RegionCount } from '@marker/CityClusteredMarkersContainer/types';

import { QUERY_KEY_REGION_MARKERS } from '@constants/queryKeys';
import { SERVER_URL } from '@constants/server';

export const fetchRegionMarkers = async () => {
  const stationMarkers = await fetch(`${SERVER_URL}/stations/markers/regions`).then<RegionCount[]>(
    async (response) => {
      const data = await response.json();
      console.log(data);

      return data;
    }
  );

  return stationMarkers;
};

export const useRegionMarkers = () => {
  return useQuery({
    queryKey: [QUERY_KEY_REGION_MARKERS],
    queryFn: fetchRegionMarkers,
    refetchOnWindowFocus: false,
  });
};
