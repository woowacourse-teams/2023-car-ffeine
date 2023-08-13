import { modalActions } from '@stores/layout/modalStore';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';

import ReviewList from '@ui/StationDetailsWindow/reviews/ReviewList';
import ReviewPreviewList from '@ui/StationDetailsWindow/reviews/previews/ReviewPreviewList';
import UserRatings from '@ui/StationDetailsWindow/reviews/previews/UserRatings';

export interface ReviewPreviewProps {
  stationId: string;
}

const ReviewPreview = ({ stationId }: ReviewPreviewProps) => {
  const handleClickMoreReviewButton = () => {
    modalActions.openModal(<ReviewList stationId={stationId} />);
  };

  return (
    <>
      <Box my={5}>
        <UserRatings stationId={stationId} />
        <ReviewPreviewList stationId={stationId} />
        <FlexBox justifyContent="end">
          <ButtonNext variant="text" size="sm" onClick={() => handleClickMoreReviewButton()}>
            후기 더 보기
          </ButtonNext>
        </FlexBox>
      </Box>
    </>
  );
};

export default ReviewPreview;
