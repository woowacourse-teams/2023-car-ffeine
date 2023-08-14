import { useEffect, useState } from 'react';

import { modalActions } from '@stores/layout/modalStore';

import { useCreateReview } from '@hooks/tanstack-query/station-details/reviews/useCreateReview';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';

import ContentField from '@ui/StationDetailsWindow/reviews/common/ContentField';
import HeaderWithRating from '@ui/StationDetailsWindow/reviews/common/HeaderWithRating';
import ReviewCreateButton from '@ui/StationDetailsWindow/reviews/reviews/ReviewCreateButton';

interface ReviewCreateProps {
  stationId: string;
}

const ReviewCreate = ({ stationId }: ReviewCreateProps) => {
  const { isCreateReviewLoading } = useCreateReview(stationId);

  useEffect(() => {
    if (!isCreateReviewLoading && isReviewCreateOpen) {
      setIsReviewCreateOpen(false);
    }
  }, [isCreateReviewLoading]);

  const [isReviewCreateOpen, setIsReviewCreateOpen] = useState(false);
  const [stars, setStars] = useState(5);
  const [content, setContent] = useState('');

  const handleClickReviewCreateCloseButton = () => {
    modalActions.closeModal();
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
          <ReviewCreateButton
            content={content}
            stars={stars}
            stationId={stationId}
            handleClickReviewCreateOpenButton={handleClickReviewCreateOpenButton}
          />
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
