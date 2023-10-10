import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY_REGION_MARKERS } from '@constants/queryKeys';
import { SERVER_URL } from '@constants/server';

import type { Region } from '../types';

export const fetchRegionMarkers = async () => {
  const stationMarkers = await fetch(`${SERVER_URL}/stations/markers/regions?regions=all`).then<
    Region[]
  >(async (response) => {
    if (!response.ok) {
      throw new Error('지역 마커를 수신을 실패했습니다.');
    }
    const data = await response.json();

    return data;
  });

  return stationMarkers;
};

export const useRegionMarkers = () => {
  return useQuery({
    queryKey: [QUERY_KEY_REGION_MARKERS],
    queryFn: fetchRegionMarkers,
    refetchOnWindowFocus: false,
  });
};
