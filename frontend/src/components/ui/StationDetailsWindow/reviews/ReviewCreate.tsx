import { useState } from 'react';

import { modalSecondaryActions } from '@stores/layout/modalSecondaryStore';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';
import TextField from '@common/TextField';

import StarRatings from '@ui/StarRatings';

const ReviewCreate = () => {
  const [stars, setStars] = useState(5);
  const [review, setReview] = useState('');

  const handleCloseReviewCreate = () => {
    modalSecondaryActions.closeModal();
  };

  return (
    <Box p={4}>
      <Text variant="title" mb={4}>
        충전소 후기 작성하기
      </Text>
      <FlexBox justifyContent="center">
        <StarRatings stars={stars} setStars={setStars} size="xxl" />
      </FlexBox>
      <TextField
        label="리뷰를 남겨주세요"
        value={review}
        fullWidth
        onChange={(e) => {
          setReview(e.target.value);
        }}
      />
      <FlexBox nowrap>
        <ButtonNext variant="outlined" color="error" fullWidth onClick={handleCloseReviewCreate}>
          닫기
        </ButtonNext>
        <ButtonNext variant="contained" fullWidth>
          등록
        </ButtonNext>
      </FlexBox>
    </Box>
  );
};

export default ReviewCreate;
