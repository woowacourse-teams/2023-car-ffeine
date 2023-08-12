import { useInfiniteQuery } from '@tanstack/react-query';

import { serverStore } from '@stores/config/serverStore';

import { SERVERS } from '@constants';

export const useInfiniteReviews = (stationId: string) => {
  return useInfiniteQuery(
    ['reviews', stationId],
    async ({ pageParam = 1 }) => {
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
