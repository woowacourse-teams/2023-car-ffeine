import { useQuery } from '@tanstack/react-query';

import { SERVER_URL } from '@constants/server';

import type { Car } from '@type/cars';

interface CarResponse {
  cars: Car[];
}

const fetchCars = async () => {
  const cars = await fetch(`${SERVER_URL}/cars`).then<CarResponse>((response) => response.json());

  return cars.cars;
};

export const useCars = () => {
  return useQuery({
    queryKey: [],
    queryFn: fetchCars,
  });
};
