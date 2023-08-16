import { useState } from 'react';

import { useModifyReply } from '@hooks/tanstack-query/station-details/reviews/useModifyReply';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import ContentField from '@ui/StationDetailsWindow/reviews/common/ContentField';

import { MAX_REVIEW_CONTENT_LENGTH, MIN_REVIEW_CONTENT_LENGTH } from '@constants';

import type { Reply } from '@type';

interface ReplyModifyProps {
  stationId: string;
  reply: Reply;
  reviewId: number;
  setIsModifyMode: (newMode: boolean) => void;
}

const ReplyModify = ({ stationId, reply, reviewId, setIsModifyMode }: ReplyModifyProps) => {
  const [content, setContent] = useState(reply.content);
  const { modifyReply, isModifyReplyLoading } = useModifyReply(stationId, reviewId);

  const handleClickModifyReply = () => {
    modifyReply({ replyId: reply.replyId, content, reviewId });
    setIsModifyMode(false);
  };

  return (
    <>
      <Box mt={2} ml={8} mr={4} p={2} border>
        <ContentField content={content} setContent={setContent} />
        <FlexBox justifyContent="end">
          <ButtonNext size="xs" variant="outlined" onClick={() => setIsModifyMode(false)}>
            닫기
          </ButtonNext>
          <ButtonNext
            size="xs"
            variant="contained"
            disabled={
              isModifyReplyLoading ||
              content.length < MIN_REVIEW_CONTENT_LENGTH ||
              content.length > MAX_REVIEW_CONTENT_LENGTH
            }
            onClick={() => handleClickModifyReply()}
          >
            등록
          </ButtonNext>
        </FlexBox>
      </Box>
    </>
  );
};

export default ReplyModify;
