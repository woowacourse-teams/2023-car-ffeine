import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getLocalStorage } from '@utils/storage';

import { serverStore } from '@stores/config/serverStore';
import { toastActions } from '@stores/layout/toastStore';

import { DEFAULT_TOKEN, SERVERS } from '@constants';
import { QUERY_KEY_STATION_PREVIEWS, QUERY_KEY_STATION_REVIEWS } from '@constants/queryKeys';
import { LOCAL_KEY_TOKEN } from '@constants/storageKeys';

export interface FetchModifyReplyRequest {
  replyId: number;
  reviewId: number;
  content: string;
}

const fetchModifyReply = async (fetchModifyReplyRequestParams: FetchModifyReplyRequest) => {
  const { replyId, reviewId, content } = fetchModifyReplyRequestParams;
  const token = getLocalStorage<number>(LOCAL_KEY_TOKEN, DEFAULT_TOKEN);
  const mode = serverStore.getState();
  return fetch(`${SERVERS[mode]}/reviews/${reviewId}/replies/${replyId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });
};

export const useModifyReply = (stationId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isModifyReplyLoading } = useMutation({
    mutationFn: fetchModifyReply,
    onSuccess: () => {
      toastActions.showToast('답글이 수정됐습니다.', 'success', 'bottom-center');
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

  const modifyReply = (fetchModifyReplyRequestParams: FetchModifyReplyRequest) => {
    mutate(fetchModifyReplyRequestParams);
  };

  return { modifyReply, isModifyReplyLoading };
};