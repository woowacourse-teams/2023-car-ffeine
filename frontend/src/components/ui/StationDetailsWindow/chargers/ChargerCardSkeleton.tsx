import Box from '@common/Box';
import FlexBox from '@common/FlexBox';
import Skeleton from '@common/Skeleton';

const ChargerCardSkeleton = () => {
  return (
    <Box border px={2} py={5} width="49%">
      <Skeleton width="100%" height="2.8rem" mb={1} />
      <Skeleton width="5rem" height="1.2rem" mb={1} />
      <Skeleton width="5rem" height="1.2rem" mb={1} />
      <Skeleton width="5rem" height="1.2rem" mb={1} />
      <Skeleton width="5rem" height="1.2rem" mb={1} />
      <FlexBox justifyContent="end" alignItems="center">
        <Skeleton width="5rem" height="1rem" />
      </FlexBox>
    </Box>
  );
};

export default ChargerCardSkeleton;
