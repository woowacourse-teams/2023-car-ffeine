import Box from '@common/Box';

import UserRatings from '@ui/StationDetailsWindow/reviews/UserRatings';

const ReviewView = () => {
  return (
    <Box my={5}>
      <UserRatings counts={1234} ratings={4.8} />
    </Box>
  );
};

export default ReviewView;
