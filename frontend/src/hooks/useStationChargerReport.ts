import { useQuery } from '@tanstack/react-query';

import { getLocalStorage } from '@utils/storage';

import { DEFAULT_TOKEN, DEVELOP_URL, LOCAL_KEY_TOKEN } from '@constants';

const fetchStationChargerReport = (token: number, stationId: number) =>
  fetch(`${DEVELOP_URL}/stations/${stationId}/reports/me`, {
    method: 'GET',
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
  }).then(async (response) => {
    const data = await response.json();
    return data.isReported;
  });

export const useStationChargerReport = (stationId: number) => {
  const token = getLocalStorage<number>(LOCAL_KEY_TOKEN, DEFAULT_TOKEN);
  console.log(stationId);
  return useQuery({
    queryKey: ['isStationChargerReported', stationId],
    queryFn: () => fetchStationChargerReport(token, stationId),
  });
};
