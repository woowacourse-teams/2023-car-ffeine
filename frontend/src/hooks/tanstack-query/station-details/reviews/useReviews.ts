import { useQuery } from '@tanstack/react-query';

import { serverStore } from '@stores/config/serverStore';

import { SERVERS } from '@constants';

import type { Review } from '@type';

export const fetchReviews = async (stationId: string) => {
  const mode = serverStore.getState();
  return fetch(`${SERVERS[mode]}/stations/${stationId}/reviews/?page=1`).then<Review[]>(
    async (response) => {
      const data = await response.json();
      return data.reviews as Review[];
    }
  );
};

export const useReviews = (stationId: string) => {
  return useQuery({
    queryKey: ['previews', stationId],
    queryFn: () => fetchReviews(stationId),
  });
};
