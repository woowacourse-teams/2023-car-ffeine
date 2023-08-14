import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getLocalStorage } from '@utils/storage';

import { serverStore } from '@stores/config/serverStore';
import { toastActions } from '@stores/layout/toastStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';

import { DEFAULT_TOKEN, SERVERS } from '@constants';
import { QUERY_KEY_STATION_PREVIEWS, QUERY_KEY_STATION_REVIEWS } from '@constants/queryKeys';
import { LOCAL_KEY_TOKEN } from '@constants/storageKeys';

export interface FetchRemoveReplyRequest {
  reviewId: number;
  replyId: number;
}

const fetchRemoveReply = async (fetchRemoveReplyRequestParams: FetchRemoveReplyRequest) => {
  const { reviewId, replyId } = fetchRemoveReplyRequestParams;
  const memberToken = memberTokenStore.getState();
  const mode = serverStore.getState();
  return fetch(`${SERVERS[mode]}/reviews/${reviewId}/replies/${replyId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${memberToken}`,
      'Content-Type': 'application/json',
    },
  });
};

export const useRemoveReply = (stationId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isRemoveReplyLoading } = useMutation({
    mutationFn: fetchRemoveReply,
    onSuccess: () => {
      toastActions.showToast('리뷰가 삭제됐습니다.', 'success', 'bottom-center');
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

  const removeReply = (fetchRemoveReplyRequestParams: FetchRemoveReplyRequest) => {
    mutate(fetchRemoveReplyRequestParams);
  };

  return { removeReply, isRemoveReplyLoading };
};
