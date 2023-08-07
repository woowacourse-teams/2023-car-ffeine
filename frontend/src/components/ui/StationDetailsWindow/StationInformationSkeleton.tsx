import Alert from '@common/Alert';
import Box from '@common/Box';
import Skeleton from '@common/Skeleton';
import Text from '@common/Text';

const StationInformationSkeleton = () => {
  return (
    <Box p={3}>
      <Box px={1}>
        <Skeleton width="10rem" height="1.4rem" />
        <Box my={1}>
          <Skeleton width="15rem" height="2.2rem" />
        </Box>
        <Box mb={1}>
          <Skeleton width="20rem" height="1.6rem" />
        </Box>
        <Skeleton width="10rem" height="1.2rem" />
      </Box>
      <hr />
      <Skeleton width="100%" height="6rem" />
      <Box px={1}>
        <Box my={2}>
          <Box mb={1}>
            <Skeleton width="7rem" height="1.6rem" />
          </Box>
          <Skeleton width="20rem" height="1.5rem" />
        </Box>
        <Box my={2}>
          <Box mb={1}>
            <Skeleton width="7rem" height="1.6rem" />
          </Box>
          <Skeleton width="20rem" height="1.5rem" />
        </Box>
        <Box my={2}>
          <Box mb={1}>
            <Skeleton width="7rem" height="1.6rem" />
          </Box>
          <Skeleton width="20rem" height="1.5rem" />
        </Box>
        <Box my={2}>
          <Box mb={1}>
            <Skeleton width="7rem" height="1.6rem" />
          </Box>
          <Skeleton width="20rem" height="1.5rem" />
        </Box>
      </Box>
    </Box>
  );
};

export default StationInformationSkeleton;
