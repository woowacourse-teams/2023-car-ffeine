import { useQuery } from '@tanstack/react-query';

import { useExternalValue } from '@utils/external-state';

import { selectedStationIdStore } from '@stores/selectedStationStore';
import { serverStore } from '@stores/serverStore';

import { SERVERS } from '@constants';
import { ERROR_MESSAGES } from '@constants/errorMessages';

import type { CongestionStatistics } from '../../../types/congestion';

export const fetchStationDetails = async (selectedStationId: number) => {
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
    queryKey: ['stationCongestionStatistics', selectedStationId],
    queryFn: () => fetchStationDetails(selectedStationId),
    enabled: !!selectedStationId,
  });
};
