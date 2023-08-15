import Box from '@common/Box';
import Skeleton from '@common/Skeleton';

const ReviewCardSkeleton = () => {
  return (
    <>
      <Box p={2} mb={4}>
        <Skeleton width="10rem" height="1.2rem" mb={1} />
        <Skeleton width="5rem" height="1.2rem" mb={2} />
        <Skeleton width="20rem" height="1.2rem" mb={4} />
        <Skeleton width="5rem" height="1.2rem" />
      </Box>
    </>
  );
};

export default ReviewCardSkeleton;
