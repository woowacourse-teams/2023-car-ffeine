import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toastActions } from '@stores/layout/toastStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';

import { QUERY_KEY_STATION_PREVIEWS, QUERY_KEY_STATION_REVIEWS } from '@constants/queryKeys';
import { SERVER_URL } from '@constants/server';

export interface FetchCreateReplyRequest {
  reviewId: number;
  content: string;
}

const fetchCreateReply = async (fetchCreateReplyRequestParams: FetchCreateReplyRequest) => {
  const { reviewId, content } = fetchCreateReplyRequestParams;
  const memberToken = memberTokenStore.getState();
  return fetch(`${SERVER_URL}/reviews/${reviewId}/replies`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${memberToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });
};

export const useCreateReply = (stationId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreateReplyLoading } = useMutation({
    mutationFn: fetchCreateReply,
    onSuccess: () => {
      toastActions.showToast('답글이 등록됐습니다.', 'success', 'bottom-center');
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

  const createReply = (fetchCreateReplyRequestParams: FetchCreateReplyRequest) => {
    mutate(fetchCreateReplyRequestParams);
  };

  return { createReply, isCreateReplyLoading };
};
