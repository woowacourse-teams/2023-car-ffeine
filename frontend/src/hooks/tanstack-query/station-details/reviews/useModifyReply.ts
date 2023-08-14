import { useMutation, useQueryClient } from '@tanstack/react-query';

import { serverStore } from '@stores/config/serverStore';
import { toastActions } from '@stores/layout/toastStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';

import { SERVERS } from '@constants';
import { QUERY_KEY_STATION_PREVIEWS, QUERY_KEY_STATION_REVIEWS } from '@constants/queryKeys';

export interface FetchModifyReplyRequest {
  replyId: number;
  content: string;
}

const fetchModifyReply = async (fetchModifyReplyRequestParams: FetchModifyReplyRequest) => {
  const { replyId, content } = fetchModifyReplyRequestParams;
  const memberToken = memberTokenStore.getState();
  const mode = serverStore.getState();
  return fetch(`${SERVERS[mode]}/replies/${replyId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${memberToken}`,
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
