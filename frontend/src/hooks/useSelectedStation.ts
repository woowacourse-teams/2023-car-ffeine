import { useQuery } from '@tanstack/react-query';

import { useExternalValue } from '@utils/external-state';

import { developmentServerStore } from '@stores/developmentServerStore';
import { selectedStationIdStore } from '@stores/selectedStationStore';

import { ERROR_MESSAGES, INVALID_VALUE_LIST, servers } from '@constants';

import type { StationDetails } from 'types';

export const fetchStationDetails = async (selectedStationId: number) => {
  const mode = developmentServerStore.getState();

  const stationDetails = await fetch(`${servers[mode]}/stations/${selectedStationId}`, {
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
