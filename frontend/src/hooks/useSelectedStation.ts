import { useQuery } from '@tanstack/react-query';

import { useExternalValue } from '@utils/external-state';

import { selectedStationIdStore } from '@stores/selectedStationStore';

import type { StationDetails } from 'types';

export const fetchStationDetails = async (selectedStationId: number) => {
  const stationDetails = await fetch(`/stations/${selectedStationId}`, {
    method: 'GET',
  }).then<StationDetails>((response) => response.json());

  return stationDetails;
};

export const useSelectedStation = () => {
  const selectedStationId = useExternalValue(selectedStationIdStore);

  return useQuery({
    queryKey: ['stationDetails'],
    queryFn: () => fetchStationDetails(selectedStationId),
  });
};
