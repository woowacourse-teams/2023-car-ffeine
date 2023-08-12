import { useQuery } from '@tanstack/react-query';

import { serverStore } from '@stores/config/serverStore';
import { memberInfoStore } from '@stores/login/memberInfoStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';

import { SERVERS } from '@constants';
import { QUERY_KEY_USER_SELECTED_FILTERS } from '@constants/queryKeys';

import type { ServerStationFilters } from './useServerStationFilters';

interface UserFilters {
  selectedFilters: ServerStationFilters;
}

const fetchMemberFilters = async () => {
  const mode = serverStore.getState();
  const memberToken = memberTokenStore.getState();
  const memberId = memberInfoStore.getState().memberId;

  const userFilters = await fetch(`${SERVERS[mode]}/members/${memberId}/filters`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${memberToken}`,
    },
  }).then<UserFilters>((response) => response.json());

  return userFilters.selectedFilters;
};

export const useMemberFilters = () => {
  return useQuery({
    queryKey: [QUERY_KEY_USER_SELECTED_FILTERS],
    queryFn: fetchMemberFilters,
  });
};
