import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useExternalValue } from '@utils/external-state';

import { serverStore } from '@stores/config/serverStore';
import {
  selectedCapacitiesFilterStore,
  selectedChargerTypesFilterStore,
  selectedCompanyNamesFilterStore,
} from '@stores/station-filters/serverStationFiltersStore';
import { userTokenStore } from '@stores/userTokenStore';

import { SERVERS } from '@constants';
import { QUERY_KEY_STATIONS, QUERY_KEY_USER_SELECTED_FILTERS } from '@constants/queryKeys';

import type { ServerStationFilters } from './useServerStationFilters';

interface UserFilters {
  selectedFilters: ServerStationFilters;
}

const fetchUserFilters = async () => {
  const mode = serverStore.getState();
  const userToken = userTokenStore.getState();

  const userFilters = await fetch(`${SERVERS[mode]}/members/filters`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  }).then<UserFilters>((response) => response.json());

  return userFilters.selectedFilters;
};

export const useUserFilters = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [QUERY_KEY_USER_SELECTED_FILTERS],
    queryFn: fetchUserFilters,
    select: (data) => {
      const { connectorTypes, capacities, companyNames } = data;

      if (userTokenStore.getState() !== '') {
        if (userTokenStore.getState() !== '') {
          selectedCapacitiesFilterStore.setState((prev) => [
            ...prev,
            ...capacities.map(({ capacity }) => capacity),
          ]);
          selectedChargerTypesFilterStore.setState((prev) => [
            ...prev,
            ...connectorTypes.map(({ key }) => key),
          ]);
          selectedCompanyNamesFilterStore.setState((prev) => [
            ...prev,
            ...companyNames.map(({ key }) => key),
          ]);
        }
      }
      queryClient.invalidateQueries([{ queryKey: [QUERY_KEY_STATIONS] }]);

      return data;
    },
  });
};
