import { useQuery } from '@tanstack/react-query';

import { memberInfoStore } from '@stores/login/memberInfoStore';

import { QUERY_KEY_MEMBER_CAR_FILTERS } from '@constants/queryKeys';
import { SERVER_URL } from '@constants/server';

import type { StationFilters } from '@type';

const fetchCarFilters = async (): Promise<StationFilters> => {
  const memberInfo = memberInfoStore.getState();

  if (memberInfo.car === undefined || memberInfo.car === null) {
    return new Promise((resolve) =>
      resolve({
        capacities: [],
        companies: [],
        connectorTypes: [],
      })
    );
  }

  const carFilters = await fetch(
    `${SERVER_URL}/cars/${memberInfo.car.carId}/filters`
  ).then<StationFilters>((response) => response.json());

  return carFilters;
};

export const useCarFilters = () => {
  return useQuery({
    queryKey: [QUERY_KEY_MEMBER_CAR_FILTERS],
    queryFn: fetchCarFilters,
    refetchOnWindowFocus: false,
  });
};
