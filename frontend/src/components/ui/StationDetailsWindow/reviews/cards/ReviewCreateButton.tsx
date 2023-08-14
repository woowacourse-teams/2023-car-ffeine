import { useEffect } from 'react';

import { useCreateReview } from '@hooks/tanstack-query/station-details/reviews/useCreateReview';

import ButtonNext from '@common/ButtonNext';

interface ReviewCreateButtonProps {
  stars: number;
  content: string;
  stationId: string;
  isReviewCreateOpen: boolean;
  setIsReviewCreateOpen: (newIsReviewCreateOpen: boolean) => void;
  handleClickReviewCreateOpenButton: () => void;
}

const ReviewCreateButton = ({
  stationId,
  setIsReviewCreateOpen,
  isReviewCreateOpen,
  stars,
  content,
  handleClickReviewCreateOpenButton,
}: ReviewCreateButtonProps) => {
  const { createReview, isCreateReviewLoading } = useCreateReview(stationId);

  useEffect(() => {
    if (!isCreateReviewLoading && isReviewCreateOpen) {
      setIsReviewCreateOpen(false);
    }
  }, [isCreateReviewLoading]);

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
