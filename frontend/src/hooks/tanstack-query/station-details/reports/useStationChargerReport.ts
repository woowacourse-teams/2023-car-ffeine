import { useQuery } from '@tanstack/react-query';

import { serverUrlStore } from '@stores/config/serverUrlStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';

import { QUERY_KEY_STATION_CHARGER_REPORT } from '@constants/queryKeys';
import { EMPTY_MEMBER_TOKEN } from '@constants';

const fetchStationChargerReport = (stationId: string) => {
  const serverUrl = serverUrlStore.getState();
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

  return fetch(`${serverUrl}/stations/${stationId}/reports/me`, {
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
