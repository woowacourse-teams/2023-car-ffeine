import { useQuery } from '@tanstack/react-query';

import { getLocalStorage } from '@utils/storage';

import { DEVELOP_URL, LOCAL_KEY_TOKEN } from '@constants';

const fetchStationChagerReport = (token: number, stationId: number) =>
  fetch(`${DEVELOP_URL}/stations/${stationId}/reports/me`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(async (response) => {
    const data = await response.json();
    return data.isReported;
  });

export const useStationChargerReport = (stationId: number) => {
  const token = getLocalStorage<number>(LOCAL_KEY_TOKEN, -1);
  console.log(stationId);
  return useQuery({
    queryKey: ['isStationChargerReported', stationId],
    queryFn: () => fetchStationChagerReport(token, stationId),
  });
};
