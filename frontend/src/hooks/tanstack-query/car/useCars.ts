import { useQuery } from '@tanstack/react-query';

import { serverUrlStore } from '@stores/config/serverUrlStore';

import type { Car } from '@type/cars';

interface CarResponse {
  cars: Car[];
}

const fetchCars = async () => {
  const serverUrl = serverUrlStore.getState();

  const cars = await fetch(`${serverUrl}/cars`).then<CarResponse>((response) => response.json());

  return cars.cars;
};

export const useCars = () => {
  return useQuery({
    queryKey: [],
    queryFn: fetchCars,
  });
};
