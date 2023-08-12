import { useExternalState } from '@utils/external-state';

import {
  selectedCapacitiesFilterStore,
  selectedChargerTypesFilterStore,
  selectedCompaniesFilterStore,
} from '@stores/station-filters/serverStationFiltersStore';

import type { CAPACITIES, CHARGER_TYPES, COMPANY_NAME } from '@constants/chargers';

export const useServerStationFilterActions = () => {
  const [selectedCompaniesFilters, setSelectedCompaniesFilter] = useExternalState(
    selectedCompaniesFilterStore
  );
  const [selectChargerTypesFilters, setSelectedChargerTypesFilter] = useExternalState(
    selectedChargerTypesFilterStore
  );
  const [selectedCapacityFilters, setSelectedChargeSpeedsFilter] = useExternalState(
    selectedCapacitiesFilterStore
  );

  const toggleSelectCompaniesFilter = (filter: keyof typeof COMPANY_NAME) => {
    setSelectedCompaniesFilter((prev) => {
      if (prev.has(filter)) {
        return new Set([...prev].filter((companyName) => companyName !== filter));
      }
      return new Set([...prev, filter]);
    });
  };

  const toggleSelectChargerTypesFilter = (filter: keyof typeof CHARGER_TYPES) => {
    setSelectedChargerTypesFilter((prev) => {
      if (prev.has(filter)) {
        return new Set([...prev].filter((companyName) => companyName !== filter));
      }
      return new Set([...prev, filter]);
    });
  };

  const toggleSelectCapacityFilter = (filter: `${(typeof CAPACITIES)[number]}.00`) => {
    setSelectedChargeSpeedsFilter((prev) => {
      if (prev.has(filter)) {
        return new Set([...prev].filter((companyName) => companyName !== filter));
      }
      return new Set([...prev, filter]);
    });
  };

  const getIsCompanySelected = (companyName: keyof typeof COMPANY_NAME) => {
    return selectedCompaniesFilters.has(companyName);
  };

  const getIsChargerTypeSelected = (chargerType: keyof typeof CHARGER_TYPES) => {
    return selectChargerTypesFilters.has(chargerType);
  };

  const getIsCapacitySelected = (capacity: `${(typeof CAPACITIES)[number]}.00`) => {
    return selectedCapacityFilters.has(capacity);
  };

  const resetAllFilter = () => {
    setSelectedCompaniesFilter(new Set([]));
    setSelectedChargeSpeedsFilter(new Set([]));
    setSelectedChargerTypesFilter(new Set([]));
  };

  return {
    selectedCompaniesFilters,
    selectChargerTypesFilters,
    selectedCapacityFilters,
    toggleSelectCompaniesFilter,
    toggleSelectChargerTypesFilter,
    toggleSelectCapacityFilter,
    getIsCompanySelected,
    getIsChargerTypeSelected,
    getIsCapacitySelected,
    resetAllFilter,
  };
};
