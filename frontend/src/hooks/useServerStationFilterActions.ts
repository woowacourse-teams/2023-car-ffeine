import { useExternalState } from '@utils/external-state';

import { toastActions } from '@stores/layout/toastStore';
import {
  selectedCapacitiesFilterStore,
  selectedConnectorTypesFilterStore,
  selectedCompaniesFilterStore,
} from '@stores/station-filters/serverStationFiltersStore';

import type { CapaCityBigDecimal, CompanyKey, ConnectorTypeKey } from '@type/serverStationFilter';

import { useCarFilters } from './tanstack-query/station-filters/useCarFilters';

export const useServerStationFilterStoreActions = () => {
  const { data: carFilters } = useCarFilters();
  const [selectedCompaniesFilters, setSelectedCompaniesFilter] = useExternalState(
    selectedCompaniesFilterStore
  );
  const [selectChargerTypesFilters, setSelectedChargerTypesFilter] = useExternalState(
    selectedConnectorTypesFilterStore
  );
  const [selectedCapacityFilters, setSelectedChargeSpeedsFilter] = useExternalState(
    selectedCapacitiesFilterStore
  );

  const toggleCompanyFilter = (company: CompanyKey) => {
    setSelectedCompaniesFilter((prev) => {
      if (prev.has(company)) {
        return new Set([...prev].filter((companyName) => companyName !== company));
      }
      return new Set([...prev, company]);
    });
  };

  const toggleConnectorTypeFilter = (connectorType: ConnectorTypeKey) => {
    setSelectedChargerTypesFilter((prev) => {
      if (prev.has(connectorType)) {
        if (carFilters.connectorTypes.includes(connectorType)) {
          toastActions.showToast('차량 필터는 해제할 수 없습니다.', 'warning');
          return prev;
        }
        return new Set([...prev].filter((connector) => connector !== connectorType));
      }
      return new Set([...prev, connectorType]);
    });
  };

  const toggleCapacityFilter = (capacity: CapaCityBigDecimal) => {
    setSelectedChargeSpeedsFilter((prev) => {
      if (prev.has(capacity)) {
        if (carFilters.capacities.includes(capacity)) {
          toastActions.showToast('차량 필터는 해제할 수 없습니다.', 'warning');
          return prev;
        }
        return new Set([...prev].filter((prevCapacity) => prevCapacity !== capacity));
      }
      return new Set([...prev, capacity]);
    });
  };

  const getIsCompanySelected = (company: CompanyKey) => {
    return selectedCompaniesFilters.has(company);
  };

  const getIsConnectorTypeSelected = (connectorType: ConnectorTypeKey) => {
    return selectChargerTypesFilters.has(connectorType);
  };

  const getIsCapacitySelected = (capacity: CapaCityBigDecimal) => {
    return selectedCapacityFilters.has(capacity);
  };

  const resetAllFilters = () => {
    setSelectedCompaniesFilter(new Set([]));
    setSelectedChargeSpeedsFilter(new Set([...carFilters.capacities]));
    setSelectedChargerTypesFilter(new Set([...carFilters.connectorTypes]));
  };

  return {
    selectedCompaniesFilters,
    selectChargerTypesFilters,
    selectedCapacityFilters,
    toggleCompanyFilter,
    toggleConnectorTypeFilter,
    toggleCapacityFilter,
    getIsCompanySelected,
    getIsConnectorTypeSelected,
    getIsCapacitySelected,
    resetAllFilters,
  };
};
