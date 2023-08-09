import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

export interface UserRatingsProps {
  ratings: number;
  counts: number;
}

const UserRatings = ({ ratings, counts }: UserRatingsProps) => {
  return (
    <FlexBox justifyContent="between" alignItems="center">
      <Text variant="title">충전소 후기 </Text>
      <Text variant="subtitle">
        ★{ratings} ({counts}명)
      </Text>
    </FlexBox>
  );
};

export default UserRatings;
