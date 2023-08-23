import { useMutation } from '@tanstack/react-query';

import { getLocalStorage } from '@utils/storage';

import { serverUrlStore } from '@stores/config/serverUrlStore';
import { modalActions } from '@stores/layout/modalStore';

import type { Differences } from '@ui/StationDetailsWindow/reports/station/StationReportConfirmation';

import { DEFAULT_TOKEN } from '@constants';
import { LOCAL_KEY_TOKEN } from '@constants/storageKeys';

interface FetchReportStationRequest {
  stationId: string;
  differences: Differences[];
}

const fetchReportStation = async (fetchReportStationRequestParams: FetchReportStationRequest) => {
  const { stationId, differences } = fetchReportStationRequestParams;
  const token = getLocalStorage<number>(LOCAL_KEY_TOKEN, DEFAULT_TOKEN);

  const serverUrl = serverUrlStore.getState();
  return fetch(`${serverUrl}/stations/${stationId}/misinformation-reports`, {
    method: 'POST',
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ stationDetailsToUpdate: differences }),
  });
};
export const useUpdateStationReport = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: fetchReportStation,
    onSuccess: () => {
      alert('제보가 완료됐습니다.');
      modalActions.closeModal();
    },
  });

  const updateStationReport = (fetchReportStationRequestParams: FetchReportStationRequest) => {
    mutate(fetchReportStationRequestParams);
  };

  return { updateStationReport, isLoading };
};
