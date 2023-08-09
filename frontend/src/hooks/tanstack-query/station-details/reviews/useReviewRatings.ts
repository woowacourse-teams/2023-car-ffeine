import { useQuery } from '@tanstack/react-query';

import { serverStore } from '@stores/config/serverStore';

import { SERVERS } from '@constants';

export const fetchReviewRatings = async (stationId: string) => {
  const mode = serverStore.getState();
  return fetch(`${SERVERS[mode]}/stations/${stationId}/total-ratings`).then<number>(
    async (response) => {
      const data = await response.json();
      return data.totalRatings as number;
    }
  );
};
export const useReviewRatings = (stationId: string) => {
  return useQuery({
    queryKey: ['review-ratings', stationId],
    queryFn: () => fetchReviewRatings(stationId),
  });
};
