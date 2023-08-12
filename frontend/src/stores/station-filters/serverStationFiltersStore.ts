import { store } from '@utils/external-state';

import type { StationFilters } from '@type';
import type { CapaCityBigDecimal, CompanyKey, ConnectorTypeKey } from '@type/serverStationFilter';

export const selectedCompaniesFilterStore = store<Set<CompanyKey>>(new Set([]));
export const selectedConnectorTypesFilterStore = store<Set<ConnectorTypeKey>>(new Set([]));
export const selectedCapacitiesFilterStore = store<Set<CapaCityBigDecimal>>(new Set([]));

export const serverStationFilterAction = {
  getAllServerStationFilters(): StationFilters {
    return {
      companies: [...selectedCompaniesFilterStore.getState()],
      connectorTypes: [...selectedConnectorTypesFilterStore.getState()],
      capacities: [...selectedCapacitiesFilterStore.getState()],
    };
  },
  setAllServerStationFilters(stationFilters: StationFilters) {
    const { companies, capacities, connectorTypes } = stationFilters;

    selectedCompaniesFilterStore.setState(new Set([...companies]));
    selectedConnectorTypesFilterStore.setState(new Set([...connectorTypes]));
    selectedCapacitiesFilterStore.setState(new Set([...capacities]));
  },
};
