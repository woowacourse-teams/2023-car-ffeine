import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import { StarIcon } from '@heroicons/react/24/solid';
import { stat } from 'copy-webpack-plugin/types/utils';

import { useEffect, useState } from 'react';

import { calculateLatestUpdateTime } from '@utils/index';

import { useRemoveReview } from '@hooks/tanstack-query/station-details/reviews/useRemoveReview';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import ReplyCard from '@ui/StationDetailsWindow/reviews/replies/ReplyCard';
import ReplyCreate from '@ui/StationDetailsWindow/reviews/replies/ReplyCreate';
import ReviewModify from '@ui/StationDetailsWindow/reviews/reviews/ReviewModify';

import type { Review } from '@type';

export interface ReviewCardProps {
  stationId: string;
  review: Review;
  previewMode?: boolean;
}

const ReviewCard = ({ stationId, review, previewMode }: ReviewCardProps) => {
  const { replySize, content, isUpdated, latestUpdateDate, memberId, ratings, isDeleted } = review;
  const { isRemoveReviewLoading, removeReview } = useRemoveReview(stationId);
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);
  const [isModifyMode, setIsModifyMode] = useState(false);

  const handleClickRemoveReviewButton = () => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      removeReview({ reviewId: review.reviewId });
    }
  };

  useEffect(() => {
    setIsRepliesOpen(false);
  }, [review]);

  return (
    <>
      {isModifyMode ? (
        <ReviewModify stationId={stationId} review={review} setIsModifyMode={setIsModifyMode} />
      ) : (
        <>
          <Box p={2} mb={4}>
            <Box p={2}>
              <FlexBox justifyContent="between">
                <Box>
                  <Text variant="label" mb={2}>
                    {memberId}님
                    {!isDeleted && (
                      <>
                        ( <StarIcon width={10} display="inline-block" />
                        {ratings})
                      </>
                    )}
                  </Text>

                  <Text variant="caption">
                    {calculateLatestUpdateTime(latestUpdateDate)}
                    {isDeleted ? '(삭제됨)' : isUpdated ? '(수정됨)' : ''}
                  </Text>
                </Box>
                <FlexBox>
                  {isDeleted || !previewMode ? (
                    <></>
                  ) : (
                    <>
                      <ButtonNext
                        size="xs"
                        variant="text"
                        color="secondary"
                        onClick={() => setIsModifyMode(true)}
                      >
                        <PencilIcon width={15} display="inline-block" />
                      </ButtonNext>
                      <ButtonNext
                        disabled={isRemoveReviewLoading}
                        size="xs"
                        variant="text"
                        color="secondary"
                        onClick={() => handleClickRemoveReviewButton()}
                      >
                        {isRemoveReviewLoading ? (
                          '삭제중'
                        ) : (
                          <TrashIcon width={15} display="inline-block" />
                        )}
                      </ButtonNext>
                    </>
                  )}
                </FlexBox>
              </FlexBox>
              <Box my={3}>
                <Text variant="body">{isDeleted ? '(삭제된 리뷰입니다.)' : content}</Text>
              </Box>
            </Box>

            <FlexBox justifyContent="between">
              <ButtonNext size="xs" variant="text" onClick={() => setIsRepliesOpen(!isRepliesOpen)}>
                {isRepliesOpen ? `닫기` : `답글 ${replySize > 0 ? replySize : '달기'}`}
              </ButtonNext>
            </FlexBox>
          </Box>
          {/*{isRepliesOpen &&*/}
          {/*  replies.map((reply, index) => (*/}
          {/*    <ReplyCard*/}
          {/*      key={index}*/}
          {/*      stationId={stationId}*/}
          {/*      reply={reply}*/}
          {/*      reviewId={review.reviewId}*/}
          {/*      previewMode={previewMode}*/}
          {/*      isLastReply={index !== replies.length - 1}*/}
          {/*    />*/}
          {/*  ))}*/}

          {isRepliesOpen && <ReplyCreate stationId={stationId} reviewId={review.reviewId} />}
        </>
      )}
    </>
  );
};

export default ReviewCard;
