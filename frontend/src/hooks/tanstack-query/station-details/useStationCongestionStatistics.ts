import { useQuery } from '@tanstack/react-query';

import { useExternalValue } from '@utils/external-state';

import { serverStore } from '@stores/config/serverStore';
import { selectedStationIdStore } from '@stores/selectedStationStore';

import { SERVERS } from '@constants';
import { ERROR_MESSAGES } from '@constants/errorMessages';
import { STATION_CONGESTION_STATISTICS_QUERY_KEY } from '@constants/queryKeys';

import type { CongestionStatistics } from '@type/congestion';

export const fetchStationDetails = async (selectedStationId: string) => {
  const mode = serverStore.getState();

  const stationDetails = await fetch(`${SERVERS[mode]}/stations/${selectedStationId}/statistics`, {
    method: 'GET',
  }).then<CongestionStatistics>(async (response) => {
    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.STATION_DETAILS_FETCH_ERROR);
    }

    const congestionStatistics: CongestionStatistics = await response.json();

    return congestionStatistics;
  });

  return stationDetails;
};

export const useStationCongestionStatistics = () => {
  const selectedStationId = useExternalValue(selectedStationIdStore);

  return useQuery({
    queryKey: [STATION_CONGESTION_STATISTICS_QUERY_KEY, selectedStationId],
    queryFn: () => fetchStationDetails(selectedStationId),
    enabled: !!selectedStationId,
  });
};
