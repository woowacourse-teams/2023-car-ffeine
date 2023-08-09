import { calculateLatestUpdateTime } from '@utils/index';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import type { Review } from '@type';

export interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const { replies, content, isUpdated, latestUpdateDate, userId, ratings, isDeleted } = review;
  return (
    <Box border p={2}>
      <Box p={2}>
        <FlexBox justifyContent="between">
          <FlexBox>
            <Text variant="caption">{userId}님</Text>
            <Text variant="caption">(★ {ratings})</Text>
          </FlexBox>
          <Text variant="caption">
            {calculateLatestUpdateTime(latestUpdateDate)} {isUpdated && '(수정됨)'}
          </Text>
        </FlexBox>
        <Box mt={3}>
          <Text variant="body">{content}</Text>
        </Box>
      </Box>

      {replies.length > 0 && (
        <Box>
          <ButtonNext size="xs" variant="text">
            답글 {replies.length > 0 ? replies.length : '달기'}
          </ButtonNext>
        </Box>
      )}
    </Box>
  );
};

export default ReviewCard;
