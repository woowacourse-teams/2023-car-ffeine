import { useQuery } from '@tanstack/react-query';

import { serverUrlStore } from '@stores/config/serverUrlStore';

import type { StationRatings } from '@type';

export const fetchReviewRatings = async (stationId: string) => {
  const serverUrl = serverUrlStore.getState();
  return fetch(`${serverUrl}/stations/${stationId}/total-ratings`).then<StationRatings>(
    async (response): Promise<StationRatings> => {
      const data = await response.json();
      return data;
    }
  );
};
export const useReviewRatings = (stationId: string) => {
  return useQuery({
    queryKey: ['review-ratings', stationId],
    queryFn: () => fetchReviewRatings(stationId),
  });
};
