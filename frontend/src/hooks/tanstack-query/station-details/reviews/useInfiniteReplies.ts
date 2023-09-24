import { useInfiniteQuery } from '@tanstack/react-query';

import { QUERY_KEY_STATION_REPLIES } from '@constants/queryKeys';
import { SERVER_URL } from '@constants/server';

import type { Reply } from '@type';

interface InfiniteRepliesResponse {
  replies: Reply[];
  nextPage: number;
}

export const useInfiniteReplies = (reviewId: number) => {
  return useInfiniteQuery<InfiniteRepliesResponse>(
    [QUERY_KEY_STATION_REPLIES, reviewId],
    async ({ pageParam = 0 }) => {
      const res = await fetch(`${SERVER_URL}/reviews/${reviewId}/replies?page=${pageParam}`);
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
