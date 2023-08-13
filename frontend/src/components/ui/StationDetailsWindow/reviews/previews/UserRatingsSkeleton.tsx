import Box from '@common/Box';
import FlexBox from '@common/FlexBox';
import Skeleton from '@common/Skeleton';

const UserRatingsSkeleton = () => {
  return (
    <Box px={4} mb={5}>
      <FlexBox justifyContent="between">
        <Skeleton width="7rem" height="2rem" />
        <Skeleton width="5rem" height="2rem" />
      </FlexBox>
    </Box>
  );
};

export default UserRatingsSkeleton;
