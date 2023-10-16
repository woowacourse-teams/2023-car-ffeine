import FlexBox from '@common/FlexBox';
import Skeleton from '@common/Skeleton';

const ChargingSpeedButtonsSkeleton = () => {
  return (
    <FlexBox nowrap mt={4} columnGap={2}>
      <Skeleton width="100%" height="3.067rem" />
      <Skeleton width="100%" height="3.067rem" />
    </FlexBox>
  );
};

export default ChargingSpeedButtonsSkeleton;
