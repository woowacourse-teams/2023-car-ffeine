import { useEffect, useState } from 'react';

import { useCreateReply } from '@hooks/tanstack-query/station-details/reviews/useCreateReply';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import ContentField from '@ui/StationDetailsWindow/reviews/common/ContentField';

import { MAX_REVIEW_CONTENT_LENGTH, MIN_REVIEW_CONTENT_LENGTH } from '@constants';

interface ReplyCreateProps {
  stationId: string;
  reviewId: number;
}

const ReplyCreate = ({ stationId, reviewId }: ReplyCreateProps) => {
  const { isCreateReplyLoading, createReply } = useCreateReply(stationId);
  const [content, setContent] = useState('');
  const [isReplyCreateOpen, setIsReplyCreateOpen] = useState(true);

  useEffect(() => {
    if (isCreateReplyLoading && isReplyCreateOpen) {
      setIsReplyCreateOpen(false);
    }
  }, [isCreateReplyLoading]);

  const handleClickCreate = () => {
    createReply({ content, stationId, reviewId: reviewId });
    setContent('');
  };

  if (!isReplyCreateOpen) {
    return <></>;
  }

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
              size="xs"
              variant="contained"
              disabled={
                isCreateReplyLoading ||
                content.length < MIN_REVIEW_CONTENT_LENGTH ||
                content.length > MAX_REVIEW_CONTENT_LENGTH
              }
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
