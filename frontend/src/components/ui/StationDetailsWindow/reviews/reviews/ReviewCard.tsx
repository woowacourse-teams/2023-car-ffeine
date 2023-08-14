import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import { StarIcon } from '@heroicons/react/24/solid';

import { useEffect, useState } from 'react';

import { calculateLatestUpdateTime } from '@utils/index';

import { memberInfoStore } from '@stores/login/memberInfoStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';

import { useRemoveReview } from '@hooks/tanstack-query/station-details/reviews/useRemoveReview';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import ReplyCreate from '@ui/StationDetailsWindow/reviews/replies/ReplyCreate';
import ReplyList from '@ui/StationDetailsWindow/reviews/replies/ReplyList';
import ReviewModify from '@ui/StationDetailsWindow/reviews/reviews/ReviewModify';

import type { Review } from '@type';

export interface ReviewCardProps {
  stationId: string;
  review: Review;
  previewMode?: boolean;
}

const ReviewCard = ({ stationId, review, previewMode }: ReviewCardProps) => {
  const { isRemoveReviewLoading, removeReview } = useRemoveReview(stationId);
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);
  const [isModifyMode, setIsModifyMode] = useState(false);
  const memberId = memberInfoStore.getState()?.memberId;

  const isReviewOwner = memberId !== review.memberId;
  const isEditable = isReviewOwner || review.isDeleted || !previewMode;

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
          <Box>
            <Box>
              <FlexBox justifyContent="between">
                <Box>
                  <Text variant="label">
                    {review.memberId}님
                    {!review.isDeleted && (
                      <>
                        ( <StarIcon width={10} display="inline-block" />
                        {review.ratings})
                      </>
                    )}
                  </Text>

                  <Text variant="caption">
                    {calculateLatestUpdateTime(review.latestUpdateDate)}
                    {review.isDeleted ? '(삭제됨)' : review.isUpdated ? '(수정됨)' : ''}
                  </Text>
                </Box>
                <FlexBox>
                  {!isEditable ? (
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
              <Box>
                <Text variant="body">
                  {review.isDeleted ? '(삭제된 리뷰입니다.)' : review.content}
                </Text>
              </Box>
            </Box>

            <FlexBox justifyContent="between">
              <ButtonNext size="xs" variant="text" onClick={() => setIsRepliesOpen(!isRepliesOpen)}>
                {isRepliesOpen
                  ? `닫기`
                  : `답글 ${review.replySize > 0 ? review.replySize : '달기'}`}
              </ButtonNext>
            </FlexBox>
          </Box>

          {isRepliesOpen && (
            <>
              <ReplyList reviewId={review.reviewId} stationId={stationId} />
              <ReplyCreate stationId={stationId} reviewId={review.reviewId} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default ReviewCard;
