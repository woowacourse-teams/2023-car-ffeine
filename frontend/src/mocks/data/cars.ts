import { getTypedObjectKeys } from '@utils/getTypedObjectKeys';

import { CAPACITIES, CONNECTOR_TYPES } from '@constants/chargers';

import type { StationFilters } from '@type';
import type { Car } from '@type/cars';
import type { CapaCityBigDecimal } from '@type/serverStationFilter';

export const generateCars = (): Car[] => {
  const name = Array.from({ length: 6 }).map((_, i) => `아이오닉${i + 1}`);
  const vintage = Array.from({ length: 5 }).map((_, i) => `${2019 + i}`);

  const car = name
    .map((n) => {
      const randomLength = Math.floor(Math.random() * 4) + 1;

      const randomYear = vintage.slice(0, randomLength);
      return randomYear.map((rV) => ({
        carId: Math.random(),
        name: n,
        vintage: rV,
      }));
    })
    .reduce((acc, curr) => [...acc, ...curr], []);

  return car;
};
export const generateCarFilters = (): StationFilters => {
  const randomSortedCapacities = (
    [...CAPACITIES.map((capacity) => `${capacity}.00`)] as CapaCityBigDecimal[]
  ).sort(() => (Math.random() - 0.5 > 0 ? 1 : -1));
  const randomSortedConnectorTypes = [...getTypedObjectKeys(CONNECTOR_TYPES)].sort(() =>
    Math.random() - 0.5 > 0 ? 1 : -1
  );

  const capacities = randomSortedCapacities.slice(
    0,
    Math.floor(Math.random() * (randomSortedCapacities.length - 1) + 1)
  );
  const connectorTypes = randomSortedConnectorTypes.slice(0, 3);

  return {
    companies: [],
    capacities,
    connectorTypes,
  };
};
