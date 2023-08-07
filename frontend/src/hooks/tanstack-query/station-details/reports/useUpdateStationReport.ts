import { useMutation } from '@tanstack/react-query';

import { getLocalStorage } from '@utils/storage';

import { modalActions } from '@stores/modalStore';
import { serverStore } from '@stores/serverStore';

import type { Differences } from '@ui/StationDetailsWindow/reports/StationReportConfirmation';

import { DEFAULT_TOKEN, SERVERS } from '@constants';
import { LOCAL_KEY_TOKEN } from '@constants/storageKeys';

interface fetchReportStationRequest {
  stationId: string;
  differences: Differences[];
}

const fetchReportStation = async (fetchReportStationRequestParams: fetchReportStationRequest) => {
  const { stationId, differences } = fetchReportStationRequestParams;
  const token = getLocalStorage<number>(LOCAL_KEY_TOKEN, DEFAULT_TOKEN);
  const mode = serverStore.getState();
  return fetch(`${SERVERS[mode]}/stations/${stationId}/misinformation-reports`, {
    method: 'POST',
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ stationDetailsToUpdate: differences }),
  });
};
export const useUpdateStationChargerReport = () => {
  const { mutate } = useMutation({
    mutationFn: fetchReportStation,
    onSuccess: () => {
      alert('제보가 완료됐습니다.');
      modalActions.closeModal();
    },
  });

  const updateStationReport = (fetchReportStationRequestParams: fetchReportStationRequest) => {
    mutate(fetchReportStationRequestParams);
  };

  return { updateStationReport };
};
