import { useQuery } from '@tanstack/react-query';

import { SERVER_URL } from '@constants/server';

import type { Review } from '@type';

export const fetchReviews = async (stationId: string) => {
  return fetch(`${SERVER_URL}/stations/${stationId}/reviews/?page=0`).then<Review[]>(
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
    refetchOnWindowFocus: false,
  });
};
