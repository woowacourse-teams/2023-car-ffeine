import { useEffect } from 'react';

import { useCreateReview } from '@hooks/tanstack-query/station-details/reviews/useCreateReview';

import ButtonNext from '@common/ButtonNext';

import { MAX_REVIEW_CONTENT_LENGTH, MIN_REVIEW_CONTENT_LENGTH } from '@constants';

interface ReviewCreateButtonProps {
  stars: number;
  content: string;
  stationId: string;
  handleClickReviewCreateOpenButton: () => void;
}

const ReviewCreateButton = ({
  stationId,
  stars,
  content,
  handleClickReviewCreateOpenButton,
}: ReviewCreateButtonProps) => {
  const { createReview, isCreateReviewLoading } = useCreateReview(stationId);

  const handleClickReviewCreateButton = () => {
    if (
      content.length >= MIN_REVIEW_CONTENT_LENGTH &&
      content.length <= MAX_REVIEW_CONTENT_LENGTH
    ) {
      createReview({ stationId, ratings: stars, content });
    }
  };

  return (
    <>
      <ButtonNext
        variant="outlined"
        color="error"
        fullWidth
        onClick={handleClickReviewCreateOpenButton}
      >
        리뷰 그만작성하기
      </ButtonNext>
      <ButtonNext
        disabled={
          isCreateReviewLoading ||
          content.length < MIN_REVIEW_CONTENT_LENGTH ||
          content.length > MAX_REVIEW_CONTENT_LENGTH
        }
        variant="contained"
        color="success"
        fullWidth
        onClick={handleClickReviewCreateButton}
      >
        {isCreateReviewLoading ? '처리중...' : '등록'}
      </ButtonNext>
    </>
  );
};

export default ReviewCreateButton;
