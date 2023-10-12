import Box from '@common/Box';
import Skeleton from '@common/Skeleton';

const StationInformationSkeleton = () => {
  return (
    <Box py={3}>
      <Box>
        <Skeleton width="10rem" height="1.4rem" />
        <Skeleton width="15rem" height="2.2rem" my={1} />
        <Skeleton width="20rem" height="1.6rem" mb={1} />
        <Skeleton width="10rem" height="1.2rem" />
      </Box>
      <hr />
      <Box>
        <Skeleton width="7rem" height="1.6rem" mt={2} mb={1} />
        <Skeleton width="20rem" height="1.5rem" mb={2} />
        <Skeleton width="7rem" height="1.6rem" mt={2} mb={1} />
        <Skeleton width="20rem" height="1.5rem" mb={2} />
        <Skeleton width="7rem" height="1.6rem" mt={2} mb={1} />
        <Skeleton width="20rem" height="1.5rem" mb={2} />
        <Skeleton width="7rem" height="1.6rem" mt={2} mb={1} />
        <Skeleton width="20rem" height="1.5rem" mb={2} />
      </Box>
    </Box>
  );
};

export default StationInformationSkeleton;
