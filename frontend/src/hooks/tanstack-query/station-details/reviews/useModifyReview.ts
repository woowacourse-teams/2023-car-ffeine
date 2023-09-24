import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toastActions } from '@stores/layout/toastStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';

import {
  QUERY_KEY_STATION_PREVIEWS,
  QUERY_KEY_STATION_REPLIES,
  QUERY_KEY_STATION_REVIEWS,
} from '@constants/queryKeys';
import { SERVER_URL } from '@constants/server';

export interface FetchModifyReviewRequest {
  reviewId: number;
  ratings: number;
  content: string;
}

const fetchModifyReview = async (fetchModifyReviewRequestParams: FetchModifyReviewRequest) => {
  const { reviewId, ratings, content } = fetchModifyReviewRequestParams;
  const memberToken = memberTokenStore.getState();
  return fetch(`${SERVER_URL}/reviews/${reviewId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${memberToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ratings, content }),
  });
};

export const useModifyReview = (stationId: string, reviewId: number) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isModifyReviewLoading } = useMutation({
    mutationFn: fetchModifyReview,
    onSuccess: () => {
      toastActions.showToast('리뷰가 수정됐습니다.', 'success', 'bottom-center');
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_STATION_REPLIES, reviewId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_STATION_REVIEWS, stationId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_STATION_PREVIEWS, stationId],
      });
    },
  });

  const modifyReview = (fetchModifyReviewRequestParams: FetchModifyReviewRequest) => {
    mutate(fetchModifyReviewRequestParams);
  };

  return { modifyReview, isModifyReviewLoading };
};
