import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getLocalStorage } from '@utils/storage';

import { serverStore } from '@stores/config/serverStore';
import { toastActions } from '@stores/layout/toastStore';

import { DEFAULT_TOKEN, SERVERS } from '@constants';
import { QUERY_KEY_STATION_PREVIEWS, QUERY_KEY_STATION_REVIEWS } from '@constants/queryKeys';
import { LOCAL_KEY_TOKEN } from '@constants/storageKeys';

export interface FetchModifyReviewRequest {
  reviewId: number;
  ratings: number;
  content: string;
}

const fetchModifyReview = async (fetchModifyReviewRequestParams: FetchModifyReviewRequest) => {
  const { reviewId, ratings, content } = fetchModifyReviewRequestParams;
  const token = getLocalStorage<number>(LOCAL_KEY_TOKEN, DEFAULT_TOKEN);
  const mode = serverStore.getState();
  return fetch(`${SERVERS[mode]}/reviews/${reviewId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ratings, content }),
  });
};

export const useModifyReview = (stationId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isModifyReviewLoading } = useMutation({
    mutationFn: fetchModifyReview,
    onSuccess: () => {
      toastActions.showToast('리뷰가 수정됐습니다.', 'success', 'bottom-center');
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

  const modifyReview = (fetchModifyReviewRequestParams: FetchModifyReviewRequest) => {
    mutate(fetchModifyReviewRequestParams);
  };

  return { modifyReview, isModifyReviewLoading };
};
