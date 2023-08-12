import { useState } from 'react';

import { useModifyReview } from '@hooks/tanstack-query/station-details/reviews/useModifyReview';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';

import ContentField from '@ui/StationDetailsWindow/reviews/crud/ContentField';
import HeaderWithRating from '@ui/StationDetailsWindow/reviews/crud/HeaderWithRating';

import type { Review } from '@type';

export interface ReviewModifyProps {
  stationId: string;
  review: Review;
  setIsModifyMode: (isModifyMode: boolean) => void;
}

const ReviewModify = ({ stationId, review, setIsModifyMode }: ReviewModifyProps) => {
  const [stars, setStars] = useState(review.ratings);
  const [content, setContent] = useState(review.content);
  const { modifyReview, isModifyReviewLoading } = useModifyReview(stationId);

  const handleClickCloseModifyMode = () => {
    setIsModifyMode(false);
  };

  const handleClickModifyReview = () => {
    modifyReview({ reviewId: review.reviewId, ratings: stars, content: content });
  };

  return (
    <Box border p={2}>
      <HeaderWithRating stars={stars} setStars={setStars} title="후기 수정하기" />
      <ContentField content={content} setContent={setContent} />

      <FlexBox nowrap>
        <ButtonNext
          variant="outlined"
          color="error"
          fullWidth
          onClick={() => handleClickCloseModifyMode()}
        >
          취소
        </ButtonNext>
        <ButtonNext
          disabled={isModifyReviewLoading || content.length < 5 || content.length > 100}
          variant="outlined"
          color="success"
          fullWidth
          onClick={() => handleClickModifyReview()}
        >
          {isModifyReviewLoading ? '처리중...' : '등록'}
        </ButtonNext>
      </FlexBox>
    </Box>
  );
};

export default ReviewModify;
