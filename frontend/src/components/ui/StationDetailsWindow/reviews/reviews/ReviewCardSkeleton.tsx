import Box from '@common/Box';
import Skeleton from '@common/Skeleton';

const ReviewCardSkeleton = () => {
  return (
    <>
      <Box p={4} mb={4}>
        <Skeleton width="10rem" height="1.2rem" mb={2} />
        <Skeleton width="5rem" height="1.2rem" mb={3} />
        <Skeleton width="100%" height="1.2rem" mb={2} />
        <Skeleton width="100%" height="1.2rem" mb={5} />
        <Skeleton width="5rem" height="1.2rem" />
      </Box>
    </>
  );
};

export default ReviewCardSkeleton;
