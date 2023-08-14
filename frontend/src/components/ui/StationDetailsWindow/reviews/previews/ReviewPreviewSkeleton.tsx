import Box from '@common/Box';
import FlexBox from '@common/FlexBox';
import Skeleton from '@common/Skeleton';

import ReviewCardsLoading from '@ui/StationDetailsWindow/reviews/reviews/ReviewCardsLoading';

const ReviewPreviewSkeleton = () => {
  return (
    <Box>
      <Box my={5}>
        <FlexBox justifyContent="between">
          <Skeleton width="10rem" height="2.2rem" />
          <Skeleton width="8rem" height="2.2rem" />
        </FlexBox>
      </Box>
      <ReviewCardsLoading count={3} />
    </Box>
  );
};

export default ReviewPreviewSkeleton;
