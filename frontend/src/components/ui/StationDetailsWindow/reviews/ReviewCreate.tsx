import { useState } from 'react';

import { modalSecondaryActions } from '@stores/layout/modalSecondaryStore';

import { useCreateReview } from '@hooks/tanstack-query/station-details/reviews/useCreateReview';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';
import TextField from '@common/TextField';

import StarRatings from '@ui/StarRatings';

interface ReviewCreateProps {
  stationId: string;
}

const ReviewCreate = ({ stationId }: ReviewCreateProps) => {
  const [stars, setStars] = useState(5);
  const [review, setReview] = useState('');
  const { createReview, isLoading } = useCreateReview(stationId);

  const handleClickReviewCreateCloseButton = () => {
    modalSecondaryActions.closeModal();
  };

  const handleClickReviewCreateButton = () => {
    createReview({ stationId, ratings: stars, content: review });
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
        <ButtonNext
          variant="outlined"
          color="error"
          fullWidth
          onClick={handleClickReviewCreateCloseButton}
        >
          닫기
        </ButtonNext>
        <ButtonNext
          disabled={isLoading}
          variant="contained"
          fullWidth
          onClick={handleClickReviewCreateButton}
        >
          {isLoading ? '처리중...' : '등록'}
        </ButtonNext>
      </FlexBox>
    </Box>
  );
};

export default ReviewCreate;
