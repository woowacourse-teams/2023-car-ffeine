import { useEffect, useState } from 'react';

import { modalActions } from '@stores/layout/modalStore';

import { useCreateReview } from '@hooks/tanstack-query/station-details/reviews/useCreateReview';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import TextField from '@common/TextField';

import ContentField from '@ui/StationDetailsWindow/reviews/crud/ContentField';
import HeaderWithRating from '@ui/StationDetailsWindow/reviews/crud/HeaderWithRating';

interface ReviewCreateProps {
  stationId: string;
}

const ReviewCreate = ({ stationId }: ReviewCreateProps) => {
  const [isReviewCreateOpen, setIsReviewCreateOpen] = useState(false);
  const [stars, setStars] = useState(5);
  const [content, setContent] = useState('');
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
    if (content.length > 5 && content.length <= 100) {
      createReview({ stationId, ratings: stars, content });
    }
  };

  const handleClickReviewCreateOpenButton = () => {
    setIsReviewCreateOpen(!isReviewCreateOpen);
  };

  return (
    <Box p={4} border>
      {isReviewCreateOpen && (
        <>
          <HeaderWithRating stars={stars} setStars={setStars} title="후기 등록하기" />
          <ContentField content={content} setContent={setContent} />
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
              disabled={isLoading || content.length < 5 || content.length > 100}
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
