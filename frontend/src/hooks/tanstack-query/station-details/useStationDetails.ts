import { useQuery } from '@tanstack/react-query';

import { useExternalValue } from '@utils/external-state';

import { serverUrlStore } from '@stores/config/serverUrlStore';
import { selectedStationIdStore } from '@stores/selectedStationStore';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import { QUERY_KEY_STATION_DETAILS } from '@constants/queryKeys';

import type { StationDetails } from '@type';

export const fetchStationDetails = async (selectedStationId: string) => {
  if (selectedStationId === null) {
    throw new Error('선택된 충전소가 없습니다.');
  }

  const serverUrl = serverUrlStore.getState();

  const stationDetails = await fetch(`${serverUrl}/stations/${selectedStationId}`, {
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

export const useStationDetails = () => {
  const selectedStationId = useExternalValue(selectedStationIdStore);

  return useQuery({
    queryKey: [QUERY_KEY_STATION_DETAILS, selectedStationId],
    queryFn: () => fetchStationDetails(selectedStationId),
    refetchOnWindowFocus: false,
  });
};
