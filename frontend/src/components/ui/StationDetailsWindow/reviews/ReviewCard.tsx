import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import { StarIcon } from '@heroicons/react/24/solid';

import { useState } from 'react';

import { calculateLatestUpdateTime } from '@utils/index';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import type { Review } from '@type';

export interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const { replies, content, isUpdated, latestUpdateDate, userId, ratings, isDeleted } = review;
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);

  if (isDeleted) {
    return (
      <Box border p={5} bgColor="#eeeeee">
        <Text variant="body">삭제된 리뷰입니다.</Text>
      </Box>
    );
  }

  return (
    <>
      <Box p={2} mb={5}>
        <Box p={2}>
          <FlexBox justifyContent="between">
            <Box>
              <Box mb={2}>
                <FlexBox>
                  <Text variant="label">{userId}님</Text>
                  <Text variant="label">
                    ( <StarIcon width={10} display="inline-block" />
                    {ratings})
                  </Text>
                </FlexBox>
              </Box>

              <Text variant="caption">
                {calculateLatestUpdateTime(latestUpdateDate)} {isUpdated && '(수정됨)'}
              </Text>
            </Box>
            <FlexBox>
              {Math.random() < 0.5 ? (
                <></>
              ) : (
                <>
                  <ButtonNext
                    size="xs"
                    variant="text"
                    color="secondary"
                    onClick={() => alert('수정')}
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
                </>
              )}
            </FlexBox>
          </FlexBox>
          <Box my={3}>
            <Text variant="body">{content}</Text>
          </Box>
        </Box>

        {replies.length > 0 && (
          <FlexBox justifyContent="between">
            <ButtonNext size="xs" variant="text" onClick={() => setIsRepliesOpen(!isRepliesOpen)}>
              {isRepliesOpen ? `답글 닫기` : `답글 ${replies.length > 0 ? replies.length : '달기'}`}
            </ButtonNext>
          </FlexBox>
        )}
      </Box>

      {isRepliesOpen &&
        replies.map((reply) => (
          <Box p={3} key={reply.replyId} pl={8}>
            <Box pl={4} py={3} css={{ borderLeft: '1px solid #66666666' }}>
              <FlexBox justifyContent="between">
                <FlexBox>
                  <Text variant="caption">{reply.userId}님</Text>
                </FlexBox>
                <Text variant="caption">
                  {calculateLatestUpdateTime(reply.latestUpdateDate)}{' '}
                  {reply.isUpdated && '(수정됨)'}
                </Text>
              </FlexBox>
              <Box mt={3}>
                <Text variant="body">{reply.content}</Text>
              </Box>
              <FlexBox justifyContent="end">
                <ButtonNext
                  size="xs"
                  variant="text"
                  color="secondary"
                  onClick={() => alert('수정')}
                >
                  수정
                </ButtonNext>
                <ButtonNext size="xs" variant="text" color="error" onClick={() => alert('삭제')}>
                  삭제
                </ButtonNext>
              </FlexBox>
            </Box>
          </Box>
        ))}
    </>
  );
};

export default ReviewCard;
