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
    if (stationFilters === undefined) {
      return;
    }
    const { companies, capacities, connectorTypes } = stationFilters;

    selectedCompaniesFilterStore.setState((prev) => new Set([...prev, ...companies]));
    selectedConnectorTypesFilterStore.setState((prev) => new Set([...prev, ...connectorTypes]));
    selectedCapacitiesFilterStore.setState((prev) => new Set([...prev, ...capacities]));
  },
  resetAllServerStationFilters(stationFilters: StationFilters) {
    const { companies, capacities, connectorTypes } = stationFilters;

    selectedCompaniesFilterStore.setState(new Set([...companies]));
    selectedConnectorTypesFilterStore.setState(new Set([...connectorTypes]));
    selectedCapacitiesFilterStore.setState(new Set([...capacities]));
  },
  getMemberFilterRequestBody() {
    const { capacities, companies, connectorTypes } =
      serverStationFilterAction.getAllServerStationFilters();

    return {
      filters: [
        ...capacities.map((capacity) => ({
          type: 'capacity',
          name: capacity,
        })),
        ...companies.map((company) => ({
          type: 'company',
          name: company,
        })),
        ...connectorTypes.map((connectorType) => ({
          type: 'connectorType',
          name: connectorType,
        })),
      ],
    };
  },
  deleteAllServerStationFilters() {
    selectedCompaniesFilterStore.setState(new Set([]));
    selectedConnectorTypesFilterStore.setState(new Set([]));
    selectedCapacitiesFilterStore.setState(new Set([]));
  },
};
