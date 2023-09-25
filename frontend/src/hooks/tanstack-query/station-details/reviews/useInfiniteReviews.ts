import { useInfiniteQuery } from '@tanstack/react-query';

import { QUERY_KEY_STATION_REVIEWS } from '@constants/queryKeys';
import { SERVER_URL } from '@constants/server';

import type { Review } from '@type';

interface InfiniteRepliesResponse {
  reviews: Review[];
  nextPage: number;
}

export const useInfiniteReviews = (stationId: string) => {
  return useInfiniteQuery<InfiniteRepliesResponse>(
    [QUERY_KEY_STATION_REVIEWS, stationId],
    async ({ pageParam = 0 }) => {
      const res = await fetch(`${SERVER_URL}/stations/${stationId}/reviews/?page=${pageParam}`);
      const data = await res.json();
      return data;
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage > 0 ? lastPage.nextPage : undefined;
      },
      refetchOnWindowFocus: false,
    }
  );
};
