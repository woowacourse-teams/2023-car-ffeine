import { useReviews } from '@hooks/tanstack-query/station-details/reviews/useReviews';

import Box from '@common/Box';
import Text from '@common/Text';

import ReviewPreviewSkeleton from '@ui/StationDetailsWindow/reviews/previews/ReviewPreviewSkeleton';
import ReviewCard from '@ui/StationDetailsWindow/reviews/reviews/ReviewCard';

interface ReviewPreviewListProps {
  stationId: string;
}

const ReviewPreviewList = ({ stationId }: ReviewPreviewListProps) => {
  const {
    data: reviews,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
    error: reviewsError,
  } = useReviews(stationId);

  if (isReviewsLoading) {
    return <ReviewPreviewSkeleton />;
  }

  if (isReviewsError) {
    return (
      <>
        <Text variant="title">ReviewPreview Error!</Text>
        <Text variant="subtitle">reviewsError</Text>
        <Text>{JSON.stringify(reviewsError)}</Text>
      </>
    );
  }

  const aliveReviews = reviews.filter((review) => !review.isDeleted);

  return (
    <>
      {aliveReviews.length === 0 ? (
        <Text p={5}>등록된 리뷰가 없습니다.</Text>
      ) : (
        <>
          {aliveReviews.slice(0, 3).map((review, i) => {
            return (
              <ReviewCard
                key={i}
                stationId=""
                review={{
                  content: review.content,
                  isDeleted: review.isDeleted,
                  isUpdated: review.isUpdated,
                  latestUpdateDate: review.latestUpdateDate,
                  ratings: review.ratings,
                  replySize: review.replySize,
                  reviewId: review.reviewId,
                  memberId: review.memberId,
                }}
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default ReviewPreviewList;
