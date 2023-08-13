import { useState } from 'react';

import { useCreateReply } from '@hooks/tanstack-query/station-details/reviews/useCreateReply';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import ContentField from '@ui/StationDetailsWindow/reviews/crud/ContentField';

interface ReplyCreateProps {
  stationId: string;
  reviewId: number;
}

const ReplyCreate = ({ stationId, reviewId }: ReplyCreateProps) => {
  const [content, setContent] = useState('');
  const { isCreateReplyLoading, createReply } = useCreateReply(stationId);

  const handleClickCreate = () => {
    createReply({ content, stationId, reviewId: reviewId });
    setContent('');
  };

  return (
    <>
      {isCreateReplyLoading ? (
        <>
          <ButtonNext variant="contained" disabled fullWidth>
            등록중 ...
          </ButtonNext>
        </>
      ) : (
        <Box mt={2} ml={8} mr={4} p={2} border>
          <Text variant="subtitle">답글 작성하기</Text>
          <ContentField content={content} setContent={setContent} />
          <FlexBox justifyContent="end">
            <ButtonNext
              variant="contained"
              disabled={isCreateReplyLoading || content.length < 5 || content.length > 100}
              onClick={() => handleClickCreate()}
            >
              등록
            </ButtonNext>
          </FlexBox>
        </Box>
      )}
    </>
  );
};

export default ReplyCreate;
