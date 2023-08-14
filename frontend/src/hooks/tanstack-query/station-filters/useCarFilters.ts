import { useQuery } from '@tanstack/react-query';

import { serverStore } from '@stores/config/serverStore';
import { memberInfoStore } from '@stores/login/memberInfoStore';

import { SERVERS } from '@constants';
import { QUERY_KEY_MEMBER_CAR_FILTERS } from '@constants/queryKeys';

const fetchCarFilters = async () => {
  const mode = serverStore.getState();
  const memberInfo = memberInfoStore.getState();

  const carFilters = await fetch(`${SERVERS[mode]}/cars/${memberInfo.car.carId}/filters`).then(
    (response) => response.json()
  );

  return carFilters;
};

export const useCarFilters = () => {
  return useQuery({
    queryKey: [QUERY_KEY_MEMBER_CAR_FILTERS],
    queryFn: fetchCarFilters,
    refetchOnWindowFocus: false,
  });
};
