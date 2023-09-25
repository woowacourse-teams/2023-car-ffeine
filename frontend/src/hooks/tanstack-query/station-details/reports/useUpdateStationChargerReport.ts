import { useMutation, useQueryClient } from '@tanstack/react-query';

import { modalActions } from '@stores/layout/modalStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';

import { QUERY_KEY_STATION_CHARGER_REPORT, QUERY_KEY_STATION_DETAILS } from '@constants/queryKeys';
import { SERVER_URL } from '@constants/server';

const fetchReportCharger = async (stationId: string) => {
  const memberToken = memberTokenStore.getState();
  return fetch(`${SERVER_URL}/stations/${stationId}/reports`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${memberToken}`,
      'Content-Type': 'application/json',
    },
  });
};
export const useUpdateStationChargerReport = (stationId: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: fetchReportCharger,
    onSuccess: () => {
      alert('신고가 완료됐습니다.');
      modalActions.closeModal();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATION_DETAILS, stationId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATION_CHARGER_REPORT] });
    },
  });

  const updateStationChargerReport = (stationId: string) => {
    mutate(stationId);
  };

  return { updateStationChargerReport };
};
