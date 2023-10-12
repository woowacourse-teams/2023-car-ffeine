import { css } from 'styled-components';

import { modalActions } from '@stores/layout/modalStore';

import { useReviewRatings } from '@hooks/tanstack-query/station-details/reviews/useReviewRatings';
import { useReviews } from '@hooks/tanstack-query/station-details/reviews/useReviews';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import ReviewPreviewSkeleton from '@ui/StationDetailsWindow/reviews/previews/ReviewPreviewSkeleton';
import UserRatings from '@ui/StationDetailsWindow/reviews/previews/UserRatings';
import ReviewCard from '@ui/StationDetailsWindow/reviews/reviews/ReviewCard';
import ReviewList from '@ui/StationDetailsWindow/reviews/reviews/ReviewList';

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
    modalActions.openModal(<ReviewList stationId={stationId} />);
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
    <>
      <Box mt={5} mb={8}>
        <UserRatings stationId={stationId} />
        {aliveReviews.length === 0 ? (
          <Box p={5}>등록된 리뷰가 없습니다.</Box>
        ) : (
          <>
            {aliveReviews.slice(0, 3).map((review, i) => {
              return (
                <ReviewCard
                  key={i}
                  stationId=""
                  review={{
                    content: review.content,
                    isDeleted: review.isDeleted,
                    isUpdated: review.isUpdated,
                    latestUpdateDate: review.latestUpdateDate,
                    ratings: review.ratings,
                    replySize: review.replySize,
                    reviewId: review.reviewId,
                    memberId: review.memberId,
                  }}
                  previewMode={true}
                />
              );
            })}
          </>
        )}

        <FlexBox justifyContent="end">
          <ButtonNext
            variant="text"
            size="sm"
            css={moreButtonCss}
            onClick={() => handleClickMoreReviewButton()}
          >
            {aliveReviews.length === 0 ? '후기 작성하기' : '후기 더보기'}
          </ButtonNext>
        </FlexBox>
      </Box>
    </>
  );
};

const moreButtonCss = css`
  font-size: 1.5rem;
`;

export default ReviewPreview;
