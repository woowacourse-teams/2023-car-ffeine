import { useQuery } from '@tanstack/react-query';

import { useExternalValue } from '@utils/external-state';

import { serverStore } from '@stores/config/serverStore';
import { selectedStationIdStore } from '@stores/selectedStationStore';

import { INVALID_VALUE_LIST, SERVERS } from '@constants';
import { ERROR_MESSAGES } from '@constants/errorMessages';

import type { StationDetails } from '@type';

export const fetchStationDetails = async (selectedStationId: string) => {
  if (selectedStationId === null) {
    throw new Error('선택된 충전소가 없습니다.');
  }

  const mode = serverStore.getState();

  const stationDetails = await fetch(`${SERVERS[mode]}/stations/${selectedStationId}`, {
    method: 'GET',
  }).then<StationDetails>(async (response) => {
    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.STATION_DETAILS_FETCH_ERROR);
    }

    const data: StationDetails = await response.json();

    const changedDataList = Object.entries(data).map(([key, value]) => {
      if (INVALID_VALUE_LIST.includes(String(value))) {
        return [key, null];
      }

      return [key, value];
    });

    return Object.fromEntries(changedDataList);
  });

  return stationDetails;
};

export const useStationDetails = () => {
  const selectedStationId = useExternalValue(selectedStationIdStore);

  return useQuery({
    queryKey: ['stationDetails', selectedStationId],
    queryFn: () => fetchStationDetails(selectedStationId),
    enabled: !!selectedStationId,
  });
};
