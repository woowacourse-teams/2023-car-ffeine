import { useQuery } from '@tanstack/react-query';

import { useExternalValue } from '@utils/external-state';

import { selectedStationIdStore } from '@stores/selectedStationStore';

import { BASE_URL, ERROR_MESSAGES, INVALID_VALUE_LIST } from '@constants';

import type { StationDetails } from 'types';

export const fetchStationDetails = async (selectedStationId: number) => {
  const stationDetails = await fetch(`${BASE_URL}/stations/${selectedStationId}`, {
    method: 'GET',
  }).then<StationDetails>(async (response) => {
    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.STATION_DETAILS_FETCH_ERROR);
    }

    const data: StationDetails = await response.json();

    const changedDataList = Object.entries(data).map(([key, value]) => {
      if (INVALID_VALUE_LIST.includes(value)) {
        return [key, null];
      }

      return [key, value];
    });

    return Object.fromEntries(changedDataList);
  });

  return stationDetails;
};

export const useSelectedStation = () => {
  const selectedStationId = useExternalValue(selectedStationIdStore);
  return useQuery({
    queryKey: ['stationDetails', selectedStationId],
    queryFn: () => fetchStationDetails(selectedStationId),
    enabled: !!selectedStationId,
  });
};
