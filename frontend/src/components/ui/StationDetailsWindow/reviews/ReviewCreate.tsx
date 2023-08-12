import { useEffect, useState } from 'react';

import { modalActions } from '@stores/layout/modalStore';

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
  const [isReviewCreateOpen, setIsReviewCreateOpen] = useState(false);
  const [stars, setStars] = useState(5);
  const [review, setReview] = useState('');
  const { createReview, isLoading } = useCreateReview(stationId);

  useEffect(() => {
    if (!isLoading && isReviewCreateOpen) {
      setIsReviewCreateOpen(false);
    }
  }, [isLoading]);

  const handleClickReviewCreateCloseButton = () => {
    modalActions.closeModal();
  };

  const handleClickReviewCreateButton = () => {
    if (review.length > 5 && review.length <= 100) {
      createReview({ stationId, ratings: stars, content: review });
    }
  };

  const handleClickReviewCreateOpenButton = () => {
    setIsReviewCreateOpen(!isReviewCreateOpen);
  };

  return (
    <Box p={4} border>
      {isReviewCreateOpen && (
        <>
          <FlexBox justifyContent="center" alignItems="center">
            <Text variant="subtitle">별점 </Text>
            <StarRatings stars={stars} setStars={setStars} size="md" />
          </FlexBox>
          <TextField
            label="리뷰를 남겨주세요"
            value={review}
            fullWidth
            supportingText={
              (review.length < 5 || review.length > 100) &&
              '리뷰는 5자 이상 100자 이하로 작성해주세요.'
            }
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
        </>
      )}
      <FlexBox nowrap>
        {isReviewCreateOpen ? (
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
              disabled={isLoading || review.length < 5 || review.length > 100}
              variant="contained"
              color="success"
              fullWidth
              onClick={handleClickReviewCreateButton}
            >
              {isLoading ? '처리중...' : '등록'}
            </ButtonNext>
          </>
        ) : (
          <>
            <ButtonNext
              variant="outlined"
              color="error"
              fullWidth
              onClick={handleClickReviewCreateCloseButton}
            >
              닫기
            </ButtonNext>
            <ButtonNext variant="contained" fullWidth onClick={handleClickReviewCreateOpenButton}>
              리뷰 작성하기
            </ButtonNext>
          </>
        )}
      </FlexBox>
    </Box>
  );
};

export default ReviewCreate;
