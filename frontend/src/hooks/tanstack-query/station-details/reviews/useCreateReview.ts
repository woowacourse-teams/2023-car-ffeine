import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getLocalStorage } from '@utils/storage';

import { serverStore } from '@stores/config/serverStore';
import { modalSecondaryActions } from '@stores/layout/modalSecondaryStore';

import { DEFAULT_TOKEN, SERVERS } from '@constants';
import { QUERY_KEY_STATION_PREVIEWS, QUERY_KEY_STATION_REVIEWS } from '@constants/queryKeys';
import { LOCAL_KEY_TOKEN } from '@constants/storageKeys';

export interface FetchCreateReviewRequest {
  stationId: string;
  ratings: number;
  content: string;
}

const fetchCreateReview = async (fetchCreateReviewRequestParams: FetchCreateReviewRequest) => {
  const { stationId, ratings, content } = fetchCreateReviewRequestParams;
  const token = getLocalStorage<number>(LOCAL_KEY_TOKEN, DEFAULT_TOKEN);
  const mode = serverStore.getState();
  return fetch(`${SERVERS[mode]}/stations/${stationId}/misinformation-reports`, {
    method: 'POST',
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ratings, content }),
  });
};

export const useCreateReview = (stationId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: fetchCreateReview,
    onSuccess: () => {
      alert('리뷰가 등록됐습니다.');
      modalSecondaryActions.closeModal();
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_STATION_REVIEWS, stationId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_STATION_PREVIEWS, stationId],
      });
    },
  });

  const createReview = (fetchCreateReviewRequestParams: FetchCreateReviewRequest) => {
    mutate(fetchCreateReviewRequestParams);
  };

  return { createReview, isLoading };
};
