import { useState } from 'react';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';
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
    <Box border>
      <FlexBox justifyContent="center" alignItems="center">
        <Text variant="subtitle">별점 </Text>
        <StarRatings stars={stars} setStars={setStars} size="md" />
      </FlexBox>
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
    </Box>
  );
};

export default ReviewModify;
