import { useMutation, useQueryClient } from '@tanstack/react-query';

import { serverUrlStore } from '@stores/config/serverUrlStore';
import { toastActions } from '@stores/layout/toastStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';

import { QUERY_KEY_STATION_PREVIEWS, QUERY_KEY_STATION_REVIEWS } from '@constants/queryKeys';

export interface FetchCreateReviewRequest {
  stationId: string;
  ratings: number;
  content: string;
}

const fetchCreateReview = async (fetchCreateReviewRequestParams: FetchCreateReviewRequest) => {
  const { stationId, ratings, content } = fetchCreateReviewRequestParams;
  const memberToken = memberTokenStore.getState();
  const serverUrl = serverUrlStore.getState();

  return fetch(`${serverUrl}/stations/${stationId}/reviews`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${memberToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ratings, content }),
  });
};

export const useCreateReview = (stationId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreateReviewLoading } = useMutation({
    mutationFn: fetchCreateReview,
    onSuccess: () => {
      toastActions.showToast('리뷰가 등록됐습니다.', 'success', 'bottom-center');
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

  return { createReview, isCreateReviewLoading };
};
