import { useEffect } from 'react';

import { useCreateReview } from '@hooks/tanstack-query/station-details/reviews/useCreateReview';

import ButtonNext from '@common/ButtonNext';

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
    if (content.length >= 5 && content.length <= 100) {
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
        disabled={isCreateReviewLoading || content.length < 5 || content.length > 100}
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
