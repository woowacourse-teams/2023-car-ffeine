import Box from '@common/Box';

import ReviewCard from '@ui/StationDetailsWindow/reviews/ReviewCard';
import UserRatings from '@ui/StationDetailsWindow/reviews/UserRatings';

import type { Reply } from '@type';

const ReviewView = () => {
  return (
    <Box my={5}>
      <UserRatings counts={1234} ratings={4.8} />
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
