import ReviewCardSkeleton from '@ui/StationDetailsWindow/reviews/reviews/ReviewCardSkeleton';

export interface ReviewCardsLoadingProps {
  count: number;
}

const ReviewCardsLoading = ({ count }: ReviewCardsLoadingProps) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <ReviewCardSkeleton key={index} />
      ))}
    </>
  );
};
export default ReviewCardsLoading;
