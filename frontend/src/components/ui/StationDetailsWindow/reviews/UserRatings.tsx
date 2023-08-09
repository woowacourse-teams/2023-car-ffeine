import { StarIcon } from '@heroicons/react/24/solid';

import Box from '@common/Box';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

export interface UserRatingsProps {
  ratings: number;
  counts: number;
}

const UserRatings = ({ ratings, counts }: UserRatingsProps) => {
  return (
    <Box mb={5}>
      <FlexBox justifyContent="between" alignItems="center">
        <Text variant="title">충전소 후기 </Text>
        <Text variant="subtitle">
          <StarIcon width={14} display="inline-block" />
          {ratings} ({counts}명)
        </Text>
      </FlexBox>
    </Box>
  );
};

export default UserRatings;
