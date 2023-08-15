import { useQuery } from '@tanstack/react-query';

import { serverStore } from '@stores/config/serverStore';
import { memberInfoStore } from '@stores/login/memberInfoStore';

import { SERVERS } from '@constants';
import { QUERY_KEY_MEMBER_CAR_FILTERS } from '@constants/queryKeys';

import type { StationFilters } from '@type';

const fetchCarFilters = async (): Promise<StationFilters> => {
  const mode = serverStore.getState();
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
    `${SERVERS[mode]}/cars/${memberInfo.car.carId}/filters`
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
