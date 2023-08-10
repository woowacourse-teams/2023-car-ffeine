import Box from '@common/Box';
import FlexBox from '@common/FlexBox';
import Skeleton from '@common/Skeleton';

import ReviewCardsLoading from '@ui/StationDetailsWindow/reviews/ReviewCardsLoading';

const ReviewPreviewSkeleton = () => {
  return (
    <Box my={5}>
      <Box px={4}>
        <FlexBox justifyContent="between">
          <Skeleton width="7rem" height="2rem" />
          <Skeleton width="5rem" height="2rem" />
        </FlexBox>
      </Box>
      <ReviewCardsLoading count={3} />
    </Box>
  );
};

export default ReviewPreviewSkeleton;
