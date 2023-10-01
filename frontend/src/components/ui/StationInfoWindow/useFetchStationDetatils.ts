import { useEffect, useState } from 'react';

import { fetchStationDetails } from '@hooks/tanstack-query/station-details/useStationDetails';

import type { StationDetails } from '@type';

export const useFetchStationDetatils = (stationId: string) => {
  const [stationDetails, setStationDetails] = useState<StationDetails>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetchStationDetails(stationId).then((stationDetailsResponse) => {
      setStationDetails(stationDetailsResponse);
      setIsLoading(false);
    });
  }, [stationId]);

  /**
   * TODO: 여기도 캐싱기능 추가 할 예정
   */

  return {
    stationDetails,
    isLoading,
  };
};
