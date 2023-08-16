import { StarIcon } from '@heroicons/react/24/solid';

import { useReviewRatings } from '@hooks/tanstack-query/station-details/reviews/useReviewRatings';

import Box from '@common/Box';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import UserRatingsSkeleton from '@ui/StationDetailsWindow/reviews/previews/UserRatingsSkeleton';

export interface UserRatingsProps {
  stationId: string;
}

const UserRatings = ({ stationId }: UserRatingsProps) => {
  const {
    data: totalRatings,
    isLoading: isReviewRatingsLoading,
    isError: isReviewRatingsError,
    error: reviewRatingsError,
  } = useReviewRatings(stationId);

  if (isReviewRatingsLoading) {
    return <UserRatingsSkeleton />;
  }

  if (isReviewRatingsError) {
    return (
      <>
        <Text variant="title">ReviewPreview Error!</Text>
        <Text variant="subtitle">reviewRatingsError</Text>
        <Text>{JSON.stringify(reviewRatingsError)}</Text>
      </>
    );
  }

  return (
    <Box mt={10} mb={5}>
      <FlexBox justifyContent="between" alignItems="center">
        <Text fontSize={1.8} weight="bold">
          충전소 후기
        </Text>
        <Text variant="subtitle">
          <StarIcon width={14} display="inline-block" />
          {totalRatings.totalRatings} ({totalRatings.totalCount}명)
        </Text>
      </FlexBox>
    </Box>
  );
};

export default UserRatings;
