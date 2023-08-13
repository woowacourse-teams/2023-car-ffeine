import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';

import { useState } from 'react';

import { calculateLatestUpdateTime } from '@utils/index';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import ReplyModify from '@ui/StationDetailsWindow/reviews/crud/ReplyModify';

import type { Reply } from '@type';

interface ReplyCardProps {
  stationId: string;
  reply: Reply;
  reviewId: number;
  previewMode: boolean;
  isLastReply: boolean;
}

const ReplyCard = ({ stationId, reply, reviewId, previewMode, isLastReply }: ReplyCardProps) => {
  const [isModifyMode, setIsModifyMode] = useState(false);

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
                {reply.userId}님
              </Text>
              <Text variant="caption">
                {calculateLatestUpdateTime(reply.latestUpdateDate)} {reply.isUpdated && '(수정됨)'}
              </Text>
            </Box>
            {reply.isDeleted || !previewMode ? (
              <></>
            ) : (
              <div>
                <ButtonNext
                  size="xs"
                  variant="text"
                  color="secondary"
                  onClick={() => setIsModifyMode(true)}
                >
                  <PencilIcon width={15} display="inline-block" />
                </ButtonNext>
                <ButtonNext
                  size="xs"
                  variant="text"
                  color="secondary"
                  onClick={() => alert('삭제')}
                >
                  <TrashIcon width={15} display="inline-block" />
                </ButtonNext>
              </div>
            )}
          </FlexBox>
          <Box mt={3}>
            <Text variant="body">{reply.content}</Text>
          </Box>
        </Box>
      </Box>
      {isLastReply && <Box ml={16} mr={6} my={2} css={{ borderBottom: '1px solid #66666666' }} />}
    </>
  );
};

export default ReplyCard;
