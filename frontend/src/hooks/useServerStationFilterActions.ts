import { useExternalState } from '@utils/external-state';

import {
  selectedCapacitiesFilterStore,
  selectedChargerTypesFilterStore,
  selectedCompanyNamesFilterStore,
} from '@stores/station-filters/serverStationFiltersStore';

import type { CAPACITIES, CHARGER_TYPES, COMPANY_NAME } from '@constants/chargers';

export const useServerStationFilterActions = () => {
  const [selectedCompanyNamesFilters, setSelectedCompaniesFilter] = useExternalState(
    selectedCompanyNamesFilterStore
  );
  const [selectChargerTypesFilters, setSelectedChargerTypesFilter] = useExternalState(
    selectedChargerTypesFilterStore
  );
  const [selectedCapacityFilters, setSelectedChargeSpeedsFilter] = useExternalState(
    selectedCapacitiesFilterStore
  );

  const toggleSelectCompanyNamesFilter = (filter: keyof typeof COMPANY_NAME) => {
    setSelectedCompaniesFilter((prev) => {
      if (prev.includes(filter)) {
        return prev.filter((companyName) => companyName !== filter);
      }
      return [...prev, filter];
    });
  };

  const toggleSelectChargerTypesFilter = (filter: keyof typeof CHARGER_TYPES) => {
    setSelectedChargerTypesFilter((prev) => {
      if (prev.includes(filter)) {
        return prev.filter((companyName) => companyName !== filter);
      }
      return [...prev, filter];
    });
  };

  const toggleSelectCapacityFilter = (filter: `${(typeof CAPACITIES)[number]}.00`) => {
    setSelectedChargeSpeedsFilter((prev) => {
      if (prev.includes(filter)) {
        return prev.filter((companyName) => companyName !== filter);
      }
      return [...prev, filter];
    });
  };

  const getIsCompanyNameSelected = (companyName: keyof typeof COMPANY_NAME) => {
    return selectedCompanyNamesFilters.includes(companyName);
  };

  const getIsChargerTypeSelected = (chargerType: keyof typeof CHARGER_TYPES) => {
    return selectChargerTypesFilters.includes(chargerType);
  };

  const getIsCapacitySelected = (capacity: `${(typeof CAPACITIES)[number]}.00`) => {
    return selectedCapacityFilters.includes(capacity);
  };

  const resetAllFilter = () => {
    setSelectedCompaniesFilter([]);
    setSelectedChargeSpeedsFilter([]);
    setSelectedChargerTypesFilter([]);
  };

  return {
    selectedCompanyNamesFilters,
    selectChargerTypesFilters,
    selectedCapacityFilters,
    toggleSelectCompanyNamesFilter,
    toggleSelectChargerTypesFilter,
    toggleSelectCapacityFilter,
    getIsCompanyNameSelected,
    getIsChargerTypeSelected,
    getIsCapacitySelected,
    resetAllFilter,
  };
};
