import { useQuery } from '@tanstack/react-query';

import { serverUrlStore } from '@stores/config/serverUrlStore';

import type { ENGLISH_DAYS_OF_WEEK_FULL_NAME } from '@constants/congestion';
import { ERROR_MESSAGES } from '@constants/errorMessages';
import { QUERY_KEY_STATION_CONGESTION_STATISTICS } from '@constants/queryKeys';

import type { CongestionStatistics } from '@type/congestion';

export const fetchStationDetails = async (selectedStationId: string, dayOfWeek: string) => {
  const serverUrl = serverUrlStore.getState();

  const stationDetails = await fetch(
    `${serverUrl}/stations/${selectedStationId}/statistics?dayOfWeek=${dayOfWeek}`,
    {
      method: 'GET',
    }
  ).then<CongestionStatistics>(async (response) => {
    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.STATION_DETAILS_FETCH_ERROR);
    }

    const congestionStatistics: CongestionStatistics = await response.json();

    return congestionStatistics;
  });

  return stationDetails;
};

export const useStationCongestionStatistics = (
  stationId: string,
  dayOfWeek: (typeof ENGLISH_DAYS_OF_WEEK_FULL_NAME)[number]
) => {
  return useQuery({
    queryKey: [QUERY_KEY_STATION_CONGESTION_STATISTICS, stationId, dayOfWeek],
    queryFn: () => fetchStationDetails(stationId, dayOfWeek),
    enabled: !!stationId,
    refetchOnWindowFocus: false,
  });
};
