import { serverUrlStore } from '@stores/config/serverUrlStore';

import { DELIMITER } from '@constants';

import type { StationSummary } from '@type';

export const fetchStationSummaries = async (stationIds: string[]) => {
  const serverUrl = serverUrlStore.getState();

  const stationSummaries = await fetch(
    `${serverUrl}/stations/summary?stationIds=${stationIds.join(DELIMITER)}`,
    {
      method: 'GET',
    }
  ).then<StationSummary[]>(async (response) => {
    if (!response.ok) {
      throw new Error('충전소 요약 정보를 불러오는데 실패했습니다.');
    }

    const data = await response.json();
    return data.stations;
  });

  return stationSummaries;
};
