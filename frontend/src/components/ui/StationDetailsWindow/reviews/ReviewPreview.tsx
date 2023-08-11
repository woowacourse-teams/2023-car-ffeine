import { css } from 'styled-components';

import React from 'react';

import { modalActions } from '@stores/layout/modalStore';

import { useReviewRatings } from '@hooks/tanstack-query/station-details/reviews/useReviewRatings';
import { useReviews } from '@hooks/tanstack-query/station-details/reviews/useReviews';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import ReviewCard from '@ui/StationDetailsWindow/reviews/ReviewCard';
import ReviewList from '@ui/StationDetailsWindow/reviews/ReviewList';
import ReviewPreviewSkeleton from '@ui/StationDetailsWindow/reviews/ReviewPreviewSkeleton';
import UserRatings from '@ui/StationDetailsWindow/reviews/UserRatings';

export interface ReviewPreviewProps {
  stationId: string;
}

const ReviewPreview = ({ stationId }: ReviewPreviewProps) => {
  const {
    data: totalRatings,
    isLoading: isReviewRatingsLoading,
    isError: isReviewRatingsError,
    error: reviewRatingsError,
  } = useReviewRatings(stationId);

  const {
    data: reviews,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
    error: reviewsError,
  } = useReviews(stationId);

  const handleClickMoreReviewButton = () => {
    modalActions.openModal(
      <>
        <ReviewList stationId={stationId} />
        <FlexBox nowrap justifyContent="between" css={modalButtonCss}>
          <ButtonNext variant="text" fullWidth>
            닫기
          </ButtonNext>
          <ButtonNext variant="text" fullWidth>
            후기 작성
          </ButtonNext>
        </FlexBox>
      </>
    );
  };

  if (isReviewRatingsLoading || isReviewsLoading) {
    return <ReviewPreviewSkeleton />;
  }

  if (isReviewRatingsError || isReviewsError) {
    return (
      <>
        <Text variant="title">ReviewPreview Error!</Text>
        <Text variant="subtitle">reviewRatingsError</Text>
        <Text>{JSON.stringify(reviewRatingsError)}</Text>
        <Text variant="subtitle">reviewsError</Text>
        <Text>{JSON.stringify(reviewsError)}</Text>
      </>
    );
  }

  const aliveReviews = reviews.filter((review) => !review.isDeleted);

  return (
    <Box my={5}>
      <UserRatings counts={reviews.length} ratings={totalRatings} />
      {aliveReviews.length === 0 ? (
        <Box p={5}>등록된 리뷰가 없습니다.</Box>
      ) : (
        <>
          {aliveReviews.slice(0, 3).map((review, i) => {
            return (
              <ReviewCard
                key={i}
                review={{
                  content: review.content,
                  isDeleted: review.isDeleted,
                  isUpdated: review.isUpdated,
                  latestUpdateDate: review.latestUpdateDate,
                  ratings: review.ratings,
                  replies: review.replies,
                  reviewId: review.reviewId,
                  userId: review.userId,
                }}
              />
            );
          })}
          <FlexBox justifyContent="end">
            <ButtonNext variant="text" size="sm" onClick={() => handleClickMoreReviewButton()}>
              후기 더 보기
            </ButtonNext>
          </FlexBox>
        </>
      )}
    </Box>
  );
};

export default ReviewPreview;

const modalButtonCss = css`
  position: sticky;
  bottom: 0;
  background: white;
`;
