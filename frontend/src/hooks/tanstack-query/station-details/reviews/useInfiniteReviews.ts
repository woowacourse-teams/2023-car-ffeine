import { useInfiniteQuery } from '@tanstack/react-query';

import { serverStore } from '@stores/config/serverStore';

import { SERVERS } from '@constants';
import { QUERY_KEY_STATION_REVIEWS } from '@constants/queryKeys';

import type { Review } from '@type';

interface InfiniteRepliesResponse {
  reviews: Review[];
  nextPage: number;
}

export const useInfiniteReviews = (stationId: string) => {
  return useInfiniteQuery<InfiniteRepliesResponse>(
    [QUERY_KEY_STATION_REVIEWS, stationId],
    async ({ pageParam = 0 }) => {
      const mode = serverStore.getState();
      const res = await fetch(`${SERVERS[mode]}/stations/${stationId}/reviews/?page=${pageParam}`);
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
