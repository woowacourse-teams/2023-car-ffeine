import { useQuery } from '@tanstack/react-query';

import { fetchUtils } from '@utils/fetch';

import { serverStore } from '@stores/config/serverStore';
import { memberInfoStore } from '@stores/login/memberInfoStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';

import { SERVERS } from '@constants';
import { QUERY_KEY_MEMBER_SELECTED_FILTERS } from '@constants/queryKeys';

import type { StationFilters } from '@type';

const fetchMemberFilters = async (): Promise<StationFilters> => {
  const mode = serverStore.getState();
  const memberId = memberInfoStore.getState().memberId;

  return await fetchUtils.get<StationFilters>(
    `${SERVERS[mode]}/members/${memberId}/filters`,
    '저장된 필터 정보를 불러오는데 실패했습니다.'
  );
};

export const useMemberFilters = () => {
  return useQuery({
    queryKey: [QUERY_KEY_MEMBER_SELECTED_FILTERS],
    queryFn: fetchMemberFilters,
    refetchOnWindowFocus: false,
  });
};
