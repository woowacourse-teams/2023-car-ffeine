import { useState } from 'react';

import { useModifyReply } from '@hooks/tanstack-query/station-details/reviews/useModifyReply';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import ContentField from '@ui/StationDetailsWindow/reviews/crud/ContentField';

interface ReplyModifyProps {
  stationId: string;
  reviewId: number;
  replyId: number;
  setIsModifyMode: (newMode: boolean) => void;
}

const ReplyModify = ({ stationId, reviewId, replyId, setIsModifyMode }: ReplyModifyProps) => {
  const [content, setContent] = useState('');
  const { modifyReply, isModifyReplyLoading } = useModifyReply(stationId);

  const handleClickModifyReply = () => {
    modifyReply({ replyId, content, reviewId });
    setIsModifyMode(false);
  };

  return (
    <>
      <Box mt={2} ml={8} mr={4} p={2} border>
        <Text variant="subtitle">답글 수정하기</Text>
        <ContentField content={content} setContent={setContent} />
        <FlexBox justifyContent="end">
          <ButtonNext
            size="xs"
            variant="outlined"
            color="error"
            onClick={() => setIsModifyMode(false)}
          >
            닫기
          </ButtonNext>
          <ButtonNext
            size="xs"
            variant="contained"
            disabled={isModifyReplyLoading || content.length < 5 || content.length > 100}
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
