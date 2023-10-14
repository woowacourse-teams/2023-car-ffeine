import { StarIcon } from '@heroicons/react/24/solid';
import { css } from 'styled-components';

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
    <Box mt={13} mb={5}>
      <FlexBox justifyContent="between" alignItems="center">
        <Text fontSize={1.8} weight="bold">
          충전소 후기
        </Text>
        <Text variant="subtitle" css={ratingCss}>
          <StarIcon width={14} display="inline-block" fill="#fc4c4e" />
          <Text tag="span" color="#3e3e3e" weight="bold">
            {parseFloat(totalRatings.totalRatings.toFixed(1))}
          </Text>
          ({totalRatings.totalCount}명)
        </Text>
      </FlexBox>
    </Box>
  );
};

const ratingCss = css`
  column-gap: 0.2rem;
  display: flex;
  align-items: center;
`;

export default UserRatings;
