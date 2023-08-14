import { useMutation, useQueryClient } from '@tanstack/react-query';

import { serverStore } from '@stores/config/serverStore';
import { toastActions } from '@stores/layout/toastStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';

import { SERVERS } from '@constants';
import { QUERY_KEY_STATION_PREVIEWS, QUERY_KEY_STATION_REVIEWS } from '@constants/queryKeys';

export interface FetchCreateReplyRequest {
  reviewId: number;
  content: string;
}

const fetchCreateReply = async (fetchCreateReplyRequestParams: FetchCreateReplyRequest) => {
  const { reviewId, content } = fetchCreateReplyRequestParams;
  const memberToken = memberTokenStore.getState();
  const mode = serverStore.getState();
  return fetch(`${SERVERS[mode]}/reviews/${reviewId}/replies`, {
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
