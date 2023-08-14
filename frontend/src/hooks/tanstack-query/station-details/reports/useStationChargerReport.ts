import { useQuery } from '@tanstack/react-query';

import { serverStore } from '@stores/config/serverStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';

import { SERVERS } from '@constants';
import { QUERY_KEY_STATION_CHARGER_REPORT } from '@constants/queryKeys';

const fetchStationChargerReport = (stationId: string) => {
  const mode = serverStore.getState();
  const memberToken = memberTokenStore.getState();

  return fetch(`${SERVERS[mode]}/stations/${stationId}/reports/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${memberToken}`,
      'Content-Type': 'application/json',
    },
  }).then(async (response) => {
    const data = await response.json();
    return data.isReported;
  });
};

export const useStationChargerReport = (stationId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY_STATION_CHARGER_REPORT, stationId],
    queryFn: () => fetchStationChargerReport(stationId),
  });
};
