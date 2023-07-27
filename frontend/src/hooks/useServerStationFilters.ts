import { useExternalState } from '@utils/external-state';

import {
  selectedCapacitiesFilterStore,
  selectedChargerTypesFilterStore,
  selectedCompanyNamesFilterStore,
} from '@stores/selectedServerStationFiltersStore';

import type { CHARGER_TYPES, CAPACITIES, COMPANY_NAME } from '@constants';

export const useServerStationFilters = () => {
  const [selectedCompanyNamesFilters, setSelectedCompanyNamesFilter] = useExternalState(
    selectedCompanyNamesFilterStore
  );
  const [selectChargerTypesFilters, setSelectedChargerTypesFilter] = useExternalState(
    selectedChargerTypesFilterStore
  );
  const [selectedCapacityFilters, setSelectedChargeSpeedsFilter] = useExternalState(
    selectedCapacitiesFilterStore
  );

  const toggleSelectCompanyNamesFilter = (
    filter: (typeof COMPANY_NAME)[keyof typeof COMPANY_NAME]
  ) => {
    setSelectedCompanyNamesFilter((prev) => {
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

  const toggleSelectCapacityFilter = (filter: (typeof CAPACITIES)[number]) => {
    setSelectedChargeSpeedsFilter((prev) => {
      if (prev.includes(filter)) {
        return prev.filter((companyName) => companyName !== filter);
      }
      return [...prev, filter];
    });
  };

  const getIsCompanyNameSelected = (
    companyName: (typeof COMPANY_NAME)[keyof typeof COMPANY_NAME]
  ) => {
    return selectedCompanyNamesFilters.includes(companyName);
  };

  const getIsChargerTypeSelected = (chargerType: keyof typeof CHARGER_TYPES) => {
    return selectChargerTypesFilters.includes(chargerType);
  };

  const getIsCapacitySelected = (capacity: (typeof CAPACITIES)[number]) => {
    return selectedCapacityFilters.includes(capacity);
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
  };
};
