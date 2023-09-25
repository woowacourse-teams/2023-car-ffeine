import { useQuery } from '@tanstack/react-query';

import { SERVER_URL } from '@constants/server';

import type { StationRatings } from '@type';

export const fetchReviewRatings = async (stationId: string) => {
  return fetch(`${SERVER_URL}/stations/${stationId}/total-ratings`).then<StationRatings>(
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
