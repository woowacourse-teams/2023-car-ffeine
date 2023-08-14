import { useState } from 'react';

import { useModifyReview } from '@hooks/tanstack-query/station-details/reviews/useModifyReview';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';

import ContentField from '@ui/StationDetailsWindow/reviews/common/ContentField';
import HeaderWithRating from '@ui/StationDetailsWindow/reviews/common/HeaderWithRating';

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
  const { modifyReview, isModifyReviewLoading } = useModifyReview(stationId);
  const handleClickCloseModifyMode = () => {
    setIsModifyMode(false);
  };

  const handleClickModifyReview = () => {
    modifyReview({ reviewId: review.reviewId, ratings: stars, content: content });
    setIsModifyMode(false);
  };

  return (
    <>
      <FlexBox nowrap justifyContent="end">
        <ButtonNext
          size="xs"
          variant="outlined"
          color="error"
          onClick={() => handleClickCloseModifyMode()}
        >
          취소
        </ButtonNext>
        <ButtonNext
          size="xs"
          disabled={isModifyReviewLoading || content.length < 5 || content.length > 100}
          variant="contained"
          color="success"
          onClick={() => handleClickModifyReview()}
        >
          {isModifyReviewLoading ? '처리중...' : '등록'}
        </ButtonNext>
      </FlexBox>
    </>
  );
};

export default ReviewModifyButton;
