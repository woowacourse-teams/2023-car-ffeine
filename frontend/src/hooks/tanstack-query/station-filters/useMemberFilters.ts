import { useQuery } from '@tanstack/react-query';

import { serverStore } from '@stores/config/serverStore';
import { memberInfoStore } from '@stores/login/memberInfoStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';

import { SERVERS } from '@constants';
import { QUERY_KEY_MEMBER_SELECTED_FILTERS } from '@constants/queryKeys';

import type { StationFilters } from '@type';

const fetchMemberFilters = async (): Promise<StationFilters> => {
  const mode = serverStore.getState();
  const memberToken = memberTokenStore.getState();
  const memberId = memberInfoStore.getState().memberId;

  if (memberId === undefined || memberToken === '') {
    return new Promise((resolve) => {
      resolve({
        companies: [],
        capacities: [],
        connectorTypes: [],
      });
    });
  }

  const memberFilters = await fetch(`${SERVERS[mode]}/members/${memberId}/filters`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${memberToken}`,
    },
  })
    .then<StationFilters>((response) => {
      if (!response.ok) {
        throw new Error('유저의 필터 정보를 불러오는데 실패했습니다.');
      }

      return response.json();
    })
    .catch<StationFilters>(() => {
      return {
        companies: [],
        capacities: [],
        connectorTypes: [],
      };
    });

  return memberFilters;
};

export const useMemberFilters = () => {
  return useQuery({
    queryKey: [QUERY_KEY_MEMBER_SELECTED_FILTERS],
    queryFn: fetchMemberFilters,
    refetchOnWindowFocus: false,
  });
};
