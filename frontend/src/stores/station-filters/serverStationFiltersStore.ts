import { store } from '@utils/external-state';

import type { CAPACITIES, CHARGER_TYPES, COMPANY_NAME } from '@constants/chargers';

import type { StationFilters } from '@type';

export const selectedCompaniesFilterStore = store<Set<keyof typeof COMPANY_NAME>>(new Set([]));
export const selectedChargerTypesFilterStore = store<Set<keyof typeof CHARGER_TYPES>>(new Set([]));
export const selectedCapacitiesFilterStore = store<Set<`${(typeof CAPACITIES)[number]}.00`>>(
  new Set([])
);

export const serverStationFilterAction = {
  getServerStationFilters(): StationFilters {
    return {
      companies: [...selectedCompaniesFilterStore.getState()],
      connectorTypes: [...selectedChargerTypesFilterStore.getState()],
      capacities: [...selectedCapacitiesFilterStore.getState()],
    };
  },
  setServerStationFilters(stationFilters: StationFilters) {
    const { companies, capacities, connectorTypes } = stationFilters;

    selectedCompaniesFilterStore.setState(new Set([...companies]));
    selectedChargerTypesFilterStore.setState(new Set([...connectorTypes]));
    selectedCapacitiesFilterStore.setState(new Set([...capacities]));
  },
};
