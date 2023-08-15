import { useState } from 'react';

import Box from '@common/Box';

import ContentField from '@ui/StationDetailsWindow/reviews/common/ContentField';
import HeaderWithRating from '@ui/StationDetailsWindow/reviews/common/HeaderWithRating';
import ReviewModifyButton from '@ui/StationDetailsWindow/reviews/reviews/ReviewModifyButton';

import type { Review } from '@type';

export interface ReviewModifyProps {
  stationId: string;
  review: Review;
  setIsModifyMode: (isModifyMode: boolean) => void;
}

const ReviewModify = ({ stationId, review, setIsModifyMode }: ReviewModifyProps) => {
  const [stars, setStars] = useState(review.ratings);
  const [content, setContent] = useState(review.content);

  return (
    <Box border p={2}>
      <HeaderWithRating stars={stars} setStars={setStars} title="후기 수정하기" />
      <ContentField content={content} setContent={setContent} />

      <ReviewModifyButton
        stationId={stationId}
        review={review}
        setIsModifyMode={setIsModifyMode}
        stars={stars}
        content={content}
      />
    </Box>
  );
};

export default ReviewModify;
