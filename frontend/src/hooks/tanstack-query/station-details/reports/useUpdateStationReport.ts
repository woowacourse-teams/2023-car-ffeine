import { useMutation } from '@tanstack/react-query';

import { modalActions } from '@stores/layout/modalStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';

import type { Differences } from '@ui/StationDetailsWindow/reports/station/StationReportConfirmation';

import { SERVER_URL } from '@constants/server';

interface FetchReportStationRequest {
  stationId: string;
  differences: Differences[];
}

const fetchReportStation = async (fetchReportStationRequestParams: FetchReportStationRequest) => {
  const { stationId, differences } = fetchReportStationRequestParams;
  const memberToken = memberTokenStore.getState();

  return fetch(`${SERVER_URL}/stations/${stationId}/misinformation-reports`, {
    method: 'POST',
    headers: {
      Authorization: `${memberToken}`,
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
