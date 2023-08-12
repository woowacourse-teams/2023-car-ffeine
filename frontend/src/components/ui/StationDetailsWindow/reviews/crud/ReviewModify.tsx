import { useState } from 'react';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';
import TextField from '@common/TextField';

import StarRatings from '@ui/StarRatings';
import ContentField from '@ui/StationDetailsWindow/reviews/crud/ContentField';
import HeaderWithRating from '@ui/StationDetailsWindow/reviews/crud/HeaderWithRating';

import type { Review } from '@type';

export interface ReviewModifyProps {
  review: Review;
  setIsModifyMode: (isModifyMode: boolean) => void;
}

const ReviewModify = ({ review, setIsModifyMode }: ReviewModifyProps) => {
  const [stars, setStars] = useState(review.ratings);
  const [content, setContent] = useState(review.content);

  return (
    <Box border p={2}>
      <HeaderWithRating stars={stars} setStars={setStars} title="후기 수정하기" />
      <ContentField content={content} setContent={setContent} />

      <FlexBox nowrap>
        <ButtonNext
          variant="outlined"
          color="error"
          fullWidth
          onClick={() => setIsModifyMode(false)}
        >
          취소
        </ButtonNext>
        <ButtonNext
          variant="outlined"
          color="success"
          fullWidth
          onClick={() => setIsModifyMode(false)}
        >
          수정
        </ButtonNext>
      </FlexBox>
    </Box>
  );
};

export default ReviewModify;
