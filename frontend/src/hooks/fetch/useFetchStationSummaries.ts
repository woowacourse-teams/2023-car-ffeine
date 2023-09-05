import { useEffect, useState } from 'react';

import type { StationSummary } from '@type';

import { fetchStationSummaries } from './fetchStationSummaries';

export const useFetchStationSummaries = (stationIds: string[]) => {
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
