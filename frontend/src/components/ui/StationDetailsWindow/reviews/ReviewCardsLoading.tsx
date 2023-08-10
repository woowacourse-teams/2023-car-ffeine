import ReviewCardSkeleton from '@ui/StationDetailsWindow/reviews/ReviewCardSkeleton';

export interface ReviewCardsLoadingProps {
  count: number;
}

const ReviewCardsLoading = ({ count }: ReviewCardsLoadingProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <ReviewCardSkeleton key={i} />
      ))}
    </>
  );
};
export default ReviewCardsLoading;
