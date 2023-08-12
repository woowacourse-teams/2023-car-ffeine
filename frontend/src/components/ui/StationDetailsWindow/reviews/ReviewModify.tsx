import { useState } from 'react';

import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import TextField from '@common/TextField';

import StarRatings from '@ui/StarRatings';

import type { Review } from '@type';

export interface ReviewModifyProps {
  review: Review;
  setIsModifyMode: (isModifyMode: boolean) => void;
}

const ReviewModify = ({ review, setIsModifyMode }: ReviewModifyProps) => {
  const [stars, setStars] = useState(review.ratings);
  const [content, setContent] = useState(review.content);

  return (
    <>
      <StarRatings stars={stars} setStars={setStars} />
      <TextField value={content} onChange={(e) => setContent(e.target.value)} fullWidth />
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
    </>
  );
};

export default ReviewModify;
