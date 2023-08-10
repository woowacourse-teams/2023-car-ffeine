import ReviewCardSkeleton from '@ui/StationDetailsWindow/reviews/ReviewCardSkeleton';

const ReviewCardsLoading = () => {
  return (
    <>
      {Array(10)
        .fill({ length: 10 })
        .map((_, i) => (
          <ReviewCardSkeleton key={i} />
        ))}
    </>
  );
};
export default ReviewCardsLoading;
