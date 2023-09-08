import { useQuery } from '@tanstack/react-query';

import { fetchUtils } from '@utils/fetch';

import { memberInfoStore } from '@stores/login/memberInfoStore';

import { EMPTY_MEMBER_ID } from '@constants';
import { QUERY_KEY_MEMBER_SELECTED_FILTERS } from '@constants/queryKeys';

import type { StationFilters } from '@type';

import { serverUrlStore } from './../../../stores/config/serverUrlStore';

const fetchMemberFilters = async (): Promise<StationFilters> => {
  const serverUrl = serverUrlStore.getState();
  const memberId = memberInfoStore.getState().memberId;

  try {
    if (memberId === EMPTY_MEMBER_ID) {
      throw new Error('로그인이 필요합니다.');
    }
    return await fetchUtils.get<StationFilters>(
      `${serverUrl}/members/${memberId}/filters`,
      '저장된 필터 정보를 불러오는데 실패했습니다.'
    );
  } catch (error) {
    return new Promise((resolve) => resolve({ capacities: [], companies: [], connectorTypes: [] }));
  }
};

export const useMemberFilters = () => {
  return useQuery({
    queryKey: [QUERY_KEY_MEMBER_SELECTED_FILTERS],
    queryFn: fetchMemberFilters,
    refetchOnWindowFocus: false,
  });
};
