import { useQuery } from '@tanstack/react-query';

import { serverStore } from '@stores/config/serverStore';

import { SERVERS } from '@constants';

import type { Car } from '@type/cars';

const fetchCars = async () => {
  const mode = serverStore.getState();

  const cars = await fetch(`${SERVERS[mode]}/cars`).then<Car[]>((response) => response.json());

  return cars;
};

export const useCars = () => {
  return useQuery({
    queryKey: [],
    queryFn: fetchCars,
  });
};
