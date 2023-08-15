import Box from '@common/Box';
import Skeleton from '@common/Skeleton';

const ReplyCardSkeleton = () => {
  return (
    <>
      <Box p={3} pl={8}>
        <Box pl={4} py={3} css={{ borderLeft: '1px solid #66666666' }}>
          <Skeleton width="10rem" height="1.2rem" mb={2} />
          <Skeleton width="5rem" height="1.2rem" mb={3} />
          <Skeleton width="100%" height="1.2rem" mb={2} />
        </Box>
      </Box>
    </>
  );
};

export default ReplyCardSkeleton;
