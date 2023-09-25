import { useQuery } from '@tanstack/react-query';

import { memberTokenStore } from '@stores/login/memberTokenStore';

import { EMPTY_MEMBER_TOKEN } from '@constants';
import { QUERY_KEY_STATION_CHARGER_REPORT } from '@constants/queryKeys';
import { SERVER_URL } from '@constants/server';

const fetchStationChargerReport = (stationId: string) => {
  const memberToken = memberTokenStore.getState();
  const headers =
    memberToken === EMPTY_MEMBER_TOKEN
      ? {
          'Content-Type': 'application/json',
        }
      : {
          Authorization: `Bearer ${memberToken}`,
          'Content-Type': 'application/json',
        };

  return fetch(`${SERVER_URL}/stations/${stationId}/reports/me`, {
    method: 'GET',
    headers: headers,
  }).then<boolean>(async (response) => {
    const data = await response.json();
    return data.isReported;
  });
};

export const useStationChargerReport = (stationId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY_STATION_CHARGER_REPORT, stationId],
    queryFn: () => fetchStationChargerReport(stationId),
    refetchOnWindowFocus: false,
  });
};
