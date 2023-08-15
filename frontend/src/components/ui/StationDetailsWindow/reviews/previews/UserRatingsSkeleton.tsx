import Box from '@common/Box';
import FlexBox from '@common/FlexBox';
import Skeleton from '@common/Skeleton';

const UserRatingsSkeleton = () => {
  return (
    <Box mb={25}>
      <FlexBox justifyContent="between" alignItems="center">
        <Skeleton width="7rem" height="2.2rem" />
        <Skeleton width="5rem" height="2rem" />
      </FlexBox>
    </Box>
  );
};

export default UserRatingsSkeleton;
