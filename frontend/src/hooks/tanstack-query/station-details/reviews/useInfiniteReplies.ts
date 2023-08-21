import { useInfiniteQuery } from '@tanstack/react-query';

import { serverUrlStore } from '@stores/config/serverUrlStore';

import { QUERY_KEY_STATION_REPLIES } from '@constants/queryKeys';

import type { Reply } from '@type';

interface InfiniteRepliesResponse {
  replies: Reply[];
  nextPage: number;
}

export const useInfiniteReplies = (reviewId: number) => {
  return useInfiniteQuery<InfiniteRepliesResponse>(
    [QUERY_KEY_STATION_REPLIES, reviewId],
    async ({ pageParam = 0 }) => {
      const serverUrl = serverUrlStore.getState();
      const res = await fetch(`${serverUrl}/reviews/${reviewId}/replies?page=${pageParam}`);
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
