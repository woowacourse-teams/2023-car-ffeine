import { useQuery } from '@tanstack/react-query';

import { serverStore } from '@stores/config/serverStore';

import { SERVERS } from '@constants';

import type { StationRatings } from '@type';

export const fetchReviewRatings = async (stationId: string) => {
  const mode = serverStore.getState();
  return fetch(`${SERVERS[mode]}/stations/${stationId}/total-ratings`).then<StationRatings>(
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
