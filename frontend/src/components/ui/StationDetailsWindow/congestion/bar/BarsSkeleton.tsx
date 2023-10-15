import FlexBox from '@common/FlexBox';
import Skeleton from '@common/Skeleton';
import Text from '@common/Text';

const BarsSkeleton = () => {
  return (
    <FlexBox direction="column" nowrap>
      {Array.from({ length: 24 }, (_, index) => (
        <FlexBox nowrap key={index} alignItems="center" columnGap={2}>
          <Text variant="caption" fontSize={1.3}>
            {String(index + 1).padStart(2, '0')}
          </Text>
          <Skeleton borderRadius="4px 10px 10px 4px" width="92.5%" height="1rem" />
        </FlexBox>
      ))}
    </FlexBox>
  );
};

export default BarsSkeleton;
