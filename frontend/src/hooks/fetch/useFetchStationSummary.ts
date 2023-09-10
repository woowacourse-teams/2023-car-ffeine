import { useEffect, useState } from 'react';

import type { StationSummary } from '@type';

import { fetchStationSummaries } from './fetchStationSummaries';

export const useFetchStationSummary = (stationId: string) => {
  const [stationSummary, setStationSummary] = useState<StationSummary>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetchStationSummaries([stationId]).then((stationSummariesResponse) => {
      setStationSummary(stationSummariesResponse[0]);
      setIsLoading(false);
    });
  }, [stationId]);

  /**
   * TODO: 여기도 캐싱기능 추가 할 예정
   */

  return {
    stationSummary,
    isLoading,
  };
};
