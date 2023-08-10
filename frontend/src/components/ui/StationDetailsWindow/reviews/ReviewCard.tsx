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
      <Box p={2} mb={4}>
        <Box p={2}>
          <FlexBox justifyContent="between">
            <Box>
              <Text variant="label" mb={2}>
                {userId}님 ( <StarIcon width={10} display="inline-block" />
                {ratings})
              </Text>

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
        replies.map((reply, index) => (
          <>
            <Box key={reply.replyId} p={3} pl={8}>
              <Box pl={4} py={3} css={{ borderLeft: '1px solid #66666666' }}>
                <FlexBox justifyContent="between">
                  <Box>
                    <Text variant="label" mb={2}>
                      {reply.userId}님
                    </Text>
                    <Text variant="caption">
                      {calculateLatestUpdateTime(reply.latestUpdateDate)}{' '}
                      {reply.isUpdated && '(수정됨)'}
                    </Text>
                  </Box>
                  {Math.random() < 0.5 ? (
                    <></>
                  ) : (
                    <div>
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
                    </div>
                  )}
                </FlexBox>
                <Box mt={3}>
                  <Text variant="body">{reply.content}</Text>
                </Box>
              </Box>
            </Box>
            {index !== replies.length - 1 && (
              <Box ml={16} mr={6} my={2} css={{ borderBottom: '1px solid #66666666' }} />
            )}
          </>
        ))}
    </>
  );
};

export default ReviewCard;
