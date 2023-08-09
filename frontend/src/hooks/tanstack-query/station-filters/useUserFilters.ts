import { useQuery } from '@tanstack/react-query';

import { getSessionStorage } from '@utils/storage';

import { serverStore } from '@stores/config/serverStore';

import { SERVERS } from '@constants';
import { QUERY_KEY_USER_SELECTED_FILTERS } from '@constants/queryKeys';
import { SESSION_KEY_USER_TOKEN } from '@constants/storageKeys';

import type { ServerStationFilters } from './useServerStationFilters';

interface UserFilters {
  selectedFilters: ServerStationFilters;
}

const fetchUserFilters = async () => {
  const mode = serverStore.getState();

  const userFilters = await fetch(`${SERVERS[mode]}/members/filters`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getSessionStorage(SESSION_KEY_USER_TOKEN, '')}`,
    },
  }).then<UserFilters>((response) => response.json());

  return userFilters.selectedFilters;
};

export const useUserFilters = () => {
  return useQuery({
    queryKey: [QUERY_KEY_USER_SELECTED_FILTERS],
    queryFn: fetchUserFilters,
  });
};
