import { useReviewRatings } from '@hooks/tanstack-query/station-details/reviews/useReviewRatings';

import Box from '@common/Box';

import ReviewCard from '@ui/StationDetailsWindow/reviews/ReviewCard';
import UserRatings from '@ui/StationDetailsWindow/reviews/UserRatings';

import type { Reply } from '@type';

export interface ReviewViewProps {
  stationId: string;
}

const ReviewView = ({ stationId }: ReviewViewProps) => {
  const { data: totalRatings, isLoading: isReviewRatingsLoading } = useReviewRatings(stationId);

  if (isReviewRatingsLoading) {
    return <></>;
  }
  return (
    <Box my={5}>
      <UserRatings counts={325} ratings={totalRatings} />
      {Array.from({ length: 3 }, (_, i) => {
        return (
          <ReviewCard
            key={i}
            review={{
              content: '',
              isDeleted: false,
              isUpdated: false,
              latestUpdateDate: '',
              ratings: 0,
              replies: [] as Reply[],
              reviewId: 0,
              userId: 0,
            }}
          />
        );
      })}
    </Box>
  );
};

export default ReviewView;
