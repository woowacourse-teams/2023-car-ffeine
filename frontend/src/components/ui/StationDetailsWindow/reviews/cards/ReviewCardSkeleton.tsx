import Box from '@common/Box';
import Skeleton from '@common/Skeleton';

const ReviewCardSkeleton = () => {
  return (
    <>
      <Box p={4} mb={4}>
        <Box>
          <Box mb={2}>
            <Skeleton width="10rem" height="1.2rem" />
          </Box>
          <Skeleton width="5rem" height="1.2rem" />
        </Box>
        <Box my={3}>
          <Box mb={2}>
            <Skeleton width="100%" height="1.2rem" />
          </Box>
          <Box mb={2}>
            <Skeleton width="100%" height="1.2rem" />
          </Box>
        </Box>
        <Skeleton width="5rem" height="1.2rem" />
      </Box>
    </>
  );
};

export default ReviewCardSkeleton;
