import { useInfiniteQuery } from '@tanstack/react-query';

import { serverStore } from '@stores/config/serverStore';

import { SERVERS } from '@constants';
import { QUERY_KEY_STATION_REPLIES, QUERY_KEY_STATION_REVIEWS } from '@constants/queryKeys';

import type { Reply } from '@type';

interface InfiniteRepliesResponse {
  replies: Reply[];
  nextPage: number;
}

export const useInfiniteReplies = (reviewId: number) => {
  return useInfiniteQuery<InfiniteRepliesResponse>(
    [QUERY_KEY_STATION_REPLIES, reviewId],
    async ({ pageParam = 0 }) => {
      const mode = serverStore.getState();
      const res = await fetch(`${SERVERS[mode]}/reviews/${reviewId}/replies?page=${pageParam}`);
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
