import { useState } from 'react';

import { useModifyReview } from '@hooks/tanstack-query/station-details/reviews/useModifyReview';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';

import ContentField from '@ui/StationDetailsWindow/reviews/common/ContentField';
import HeaderWithRating from '@ui/StationDetailsWindow/reviews/common/HeaderWithRating';

import { MAX_REVIEW_CONTENT_LENGTH, MIN_REVIEW_CONTENT_LENGTH } from '@constants';

import type { Review } from '@type';

export interface ReviewModifyButtonProps {
  stationId: string;
  review: Review;
  setIsModifyMode: (isModifyMode: boolean) => void;
  stars: number;
  content: string;
}

const ReviewModifyButton = ({
  stationId,
  review,
  setIsModifyMode,
  stars,
  content,
}: ReviewModifyButtonProps) => {
  const { modifyReview, isModifyReviewLoading } = useModifyReview(stationId, review.reviewId);
  const handleClickCloseModifyMode = () => {
    setIsModifyMode(false);
  };

  const handleClickModifyReview = () => {
    modifyReview({ reviewId: review.reviewId, ratings: stars, content: content });
    setIsModifyMode(false);
  };

  return (
    <FlexBox nowrap justifyContent="end">
      <ButtonNext size="xs" variant="outlined" onClick={() => handleClickCloseModifyMode()}>
        취소
      </ButtonNext>
      <ButtonNext
        size="xs"
        disabled={
          isModifyReviewLoading ||
          content.length < MIN_REVIEW_CONTENT_LENGTH ||
          content.length > MAX_REVIEW_CONTENT_LENGTH
        }
        variant="contained"
        onClick={() => handleClickModifyReview()}
      >
        {isModifyReviewLoading ? '처리중...' : '등록'}
      </ButtonNext>
    </FlexBox>
  );
};

export default ReviewModifyButton;
