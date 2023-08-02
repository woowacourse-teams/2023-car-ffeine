import { useMutation } from '@tanstack/react-query';

import { getLocalStorage } from '@utils/storage';

import { developmentServerStore } from '@stores/developmentServerStore';
import { modalActions } from '@stores/modalStore';

import type { Differences } from '@ui/DetailedStationInfo/StationReportConfirmation';

import { DEFAULT_TOKEN, LOCAL_KEY_TOKEN, servers } from '@constants';

interface fetchReportStationRequest {
  stationId: number;
  differences: Differences[];
}

const fetchReportStation = async (fetchReportStationRequestParams: fetchReportStationRequest) => {
  const { stationId, differences } = fetchReportStationRequestParams;
  const token = getLocalStorage<number>(LOCAL_KEY_TOKEN, DEFAULT_TOKEN);
  const mode = developmentServerStore.getState();
  return fetch(`${servers[mode]}/stations/${stationId}/misinformation-reports`, {
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
