import { useQuery } from '@tanstack/react-query';

import { serverStore } from '@stores/config/serverStore';
import { memberInfoStore } from '@stores/login/memberInfoStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';

import { SERVERS } from '@constants';
import { QUERY_KEY_MEMBER_SELECTED_FILTERS } from '@constants/queryKeys';

import type { ServerStationFilters } from './useServerStationFilters';

interface MemberFilters {
  selectedFilters: ServerStationFilters;
}

const fetchMemberFilters = async () => {
  const mode = serverStore.getState();
  const memberToken = memberTokenStore.getState();
  const memberId = memberInfoStore.getState().memberId;

  const memberFilters = await fetch(`${SERVERS[mode]}/members/${memberId}/filters`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${memberToken}`,
    },
  }).then<MemberFilters>((response) => response.json());

  return memberFilters.selectedFilters;
};

export const useMemberFilters = () => {
  return useQuery({
    queryKey: [QUERY_KEY_MEMBER_SELECTED_FILTERS],
    queryFn: fetchMemberFilters,
    refetchOnWindowFocus: false,
  });
};
