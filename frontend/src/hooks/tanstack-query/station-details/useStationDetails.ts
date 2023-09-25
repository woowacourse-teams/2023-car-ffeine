import { useQuery } from '@tanstack/react-query';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import { QUERY_KEY_STATION_DETAILS } from '@constants/queryKeys';
import { SERVER_URL } from '@constants/server';

import type { StationDetails } from '@type';

export const fetchStationDetails = async (stationId: string) => {
  if (stationId === null) {
    throw new Error('선택된 충전소가 없습니다.');
  }

  const stationDetails = await fetch(`${SERVER_URL}/stations/${stationId}`, {
    method: 'GET',
  }).then<StationDetails>(async (response) => {
    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.STATION_DETAILS_FETCH_ERROR);
    }

    const data: StationDetails = await response.json();
    return data;
  });

  return stationDetails;
};

export const useStationDetails = (selectedStationId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY_STATION_DETAILS, selectedStationId],
    queryFn: () => fetchStationDetails(selectedStationId),
    refetchOnWindowFocus: false,
  });
};
