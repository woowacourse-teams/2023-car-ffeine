import { useReviewRatings } from '@hooks/tanstack-query/station-details/reviews/useReviewRatings';
import { useReviews } from '@hooks/tanstack-query/station-details/reviews/useReviews';

import Box from '@common/Box';

import ReviewCard from '@ui/StationDetailsWindow/reviews/ReviewCard';
import UserRatings from '@ui/StationDetailsWindow/reviews/UserRatings';

export interface ReviewViewProps {
  stationId: string;
}

const ReviewView = ({ stationId }: ReviewViewProps) => {
  const { data: totalRatings, isLoading: isReviewRatingsLoading } = useReviewRatings(stationId);
  const { data: reviews, isLoading: isReviewsLoading } = useReviews(stationId);

  if (isReviewRatingsLoading || isReviewsLoading) {
    return <></>;
  }
  return (
    <Box my={5}>
      <UserRatings counts={reviews.length} ratings={totalRatings} />
      {reviews.map((review, i) => {
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
    </Box>
  );
};

export default ReviewView;
