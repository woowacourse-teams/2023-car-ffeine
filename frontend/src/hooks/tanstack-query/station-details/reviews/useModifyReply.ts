import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toastActions } from '@stores/layout/toastStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';

import {
  QUERY_KEY_STATION_PREVIEWS,
  QUERY_KEY_STATION_REPLIES,
  QUERY_KEY_STATION_REVIEWS,
} from '@constants/queryKeys';
import { SERVER_URL } from '@constants/server';

export interface FetchModifyReplyRequest {
  replyId: number;
  reviewId: number;
  content: string;
}

const fetchModifyReply = async (fetchModifyReplyRequestParams: FetchModifyReplyRequest) => {
  const { replyId, content, reviewId } = fetchModifyReplyRequestParams;
  const memberToken = memberTokenStore.getState();
  return fetch(`${SERVER_URL}/reviews/${reviewId}/replies/${replyId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${memberToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });
};

export const useModifyReply = (stationId: string, reviewId: number) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isModifyReplyLoading } = useMutation({
    mutationFn: fetchModifyReply,
    onSuccess: () => {
      toastActions.showToast('답글이 수정됐습니다.', 'success', 'bottom-center');
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

  const modifyReply = (fetchModifyReplyRequestParams: FetchModifyReplyRequest) => {
    mutate(fetchModifyReplyRequestParams);
  };

  return { modifyReply, isModifyReplyLoading };
};
