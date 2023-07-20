import { useQuery } from '@tanstack/react-query';

import { useExternalValue } from '@utils/external-state';

import { selectedStationIdStore } from '@stores/selectedStationStore';

import type { StationDetails } from 'types';

export const fetchStationDetails = async (selectedStationId: number) => {
  const stationDetails = await fetch(`/stations/${selectedStationId}`, {
    method: 'GET',
  }).then<StationDetails>((response) => {
    if (!response.ok) {
      throw new Error('[error] 충전소 세부 정보를 불러올 수 없습니다.');
    }

    return response.json();
  });

  return stationDetails;
};

export const useSelectedStation = () => {
  const selectedStationId = useExternalValue(selectedStationIdStore);

  return useQuery({
    queryKey: ['stationDetails'],
    queryFn: () => fetchStationDetails(selectedStationId),
  });
};
