import { TrashIcon } from '@heroicons/react/20/solid';
import { PencilSquareIcon } from '@heroicons/react/24/solid';

import { useState } from 'react';

import { calculateLatestUpdateTime } from '@utils/index';

import { memberInfoStore } from '@stores/login/memberInfoStore';

import { useRemoveReply } from '@hooks/tanstack-query/station-details/reviews/useRemoveReply';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import ReplyModify from '@ui/StationDetailsWindow/reviews/replies/ReplyModify';

import type { Reply } from '@type';

interface ReplyCardProps {
  stationId: string;
  reply: Reply;
  reviewId: number;
  previewMode: boolean;
}

const ReplyCard = ({ stationId, reply, reviewId, previewMode }: ReplyCardProps) => {
  const [isModifyMode, setIsModifyMode] = useState(false);
  const { removeReply, isRemoveReplyLoading } = useRemoveReply(stationId, reviewId);
  const memberId = memberInfoStore.getState()?.memberId;
  const isReplyOwner = memberId === reply.memberId;
  const isEditable = isReplyOwner && !reply.isDeleted && !previewMode;

  const handleClickRemoveReplyButton = () => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      removeReply({ replyId: reply.replyId, reviewId });
    }
  };

  if (isModifyMode) {
    return (
      <ReplyModify
        stationId={stationId}
        reply={reply}
        reviewId={reviewId}
        setIsModifyMode={setIsModifyMode}
      />
    );
  }

  return (
    <>
      <Box key={reply.replyId} p={3} pl={8}>
        <Box pl={4} py={3} css={{ borderLeft: '1px solid #66666666' }}>
          <FlexBox justifyContent="between">
            <Box>
              <Text variant="label" mb={2}>
                {reply.isDeleted ? '(알수없음)' : `${reply.memberId}님`}
              </Text>
              <Text variant="caption">
                {!reply.isDeleted && calculateLatestUpdateTime(reply.latestUpdateDate)}
                {reply.isDeleted ? ' (삭제됨)' : reply.isUpdated ? ' (수정됨)' : ''}
              </Text>
            </Box>
            {!isEditable ? (
              <></>
            ) : (
              <div>
                <ButtonNext
                  size="xs"
                  variant="text"
                  color="secondary"
                  onClick={() => setIsModifyMode(true)}
                >
                  <PencilSquareIcon width={15} display="inline-block" />
                </ButtonNext>
                <ButtonNext
                  disabled={isRemoveReplyLoading}
                  size="xs"
                  variant="text"
                  color="secondary"
                  onClick={() => handleClickRemoveReplyButton()}
                >
                  {isRemoveReplyLoading ? (
                    '삭제중'
                  ) : (
                    <TrashIcon width={15} display="inline-block" />
                  )}
                </ButtonNext>
              </div>
            )}
          </FlexBox>
          <Box mt={3}>
            <Text variant="body">{reply.isDeleted ? '(삭제된 답글입니다.)' : reply.content}</Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ReplyCard;
