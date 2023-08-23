import { useQueryClient } from '@tanstack/react-query';

import { fetchUtils } from '@utils/fetch';

import { serverUrlStore } from '@stores/config/serverUrlStore';
import { toastActions } from '@stores/layout/toastStore';
import { memberInfoStore } from '@stores/login/memberInfoStore';
import { serverStationFilterAction } from '@stores/station-filters/serverStationFiltersStore';

import { QUERY_KEY_MEMBER_SELECTED_FILTERS, QUERY_KEY_STATIONS } from '@constants/queryKeys';

import type { StationFilters } from '@type';

export const useStationFilters = () => {
  const queryClient = useQueryClient();
  const { showToast } = toastActions;

  const fallbackToPreviousFilters = () => {
    const { resetAllServerStationFilters } = serverStationFilterAction;
    const stationFilters = queryClient.getQueryData<StationFilters>([
      QUERY_KEY_MEMBER_SELECTED_FILTERS,
    ]);
    resetAllServerStationFilters(stationFilters);

    queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATIONS] });

    showToast('필터 적용에 실패했습니다', 'error');
  };

  const handleStationsRefetch = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATIONS] });
    showToast('필터가 적용되었습니다');
  };

  const applyMemberFilters = async () => {
    const serverUrl = serverUrlStore.getState();
    const memberId = memberInfoStore.getState()?.memberId;

    const { getMemberFilterRequestBody } = serverStationFilterAction;
    const memberFilterRequestBody = getMemberFilterRequestBody();

    return await fetchUtils.post<StationFilters, typeof memberFilterRequestBody>(
      `${serverUrl}/members/${memberId}/filters`,
      memberFilterRequestBody
    );
  };

  const submitMemberFilters = async () => {
    const { setAllServerStationFilters } = serverStationFilterAction;

    try {
      const stationFilters = await applyMemberFilters();

      setAllServerStationFilters(stationFilters);
      handleStationsRefetch();
    } catch {
      fallbackToPreviousFilters();
    }
  };

  return {
    fallbackToPreviousFilters,
    handleStationsRefetch,
    applyMemberFilters,
    submitMemberFilters,
  };
};
