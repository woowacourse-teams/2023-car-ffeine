import { useEffect, useState } from 'react';

import type { StationSummary } from '@type';

import { fetchStationSummaries } from './fetchStationSummaries';

/**
 * TODO: 중간에는 캐싱을 하던 뭘 하던 결과만 빠르게 잘 주자!
 * @param stationIds 내가 알고 싶은 충전소들의 id (미정)
 * @returns 내가 요청했던 충전소들의 배열 상태 (미정)
 */
export const useStationSummaries = (stationIds: string[]) => {
  const [stationSummaries, setStationSummaries] = useState<StationSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetchStationSummaries(stationIds).then((stationSummariesResponse) => {
      setStationSummaries((prev) => [...prev, ...stationSummariesResponse]);
      setIsLoading(false);
    });
  }, [stationIds]);

  /**
   * TODO: 캐싱 기능 추가
   */

  return {
    stationSummaries,
    isLoading,
  };
};
