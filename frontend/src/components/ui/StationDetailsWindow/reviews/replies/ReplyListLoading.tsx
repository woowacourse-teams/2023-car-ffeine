import ReplyCardSkeleton from '@ui/StationDetailsWindow/reviews/replies/ReplyCardSkeleton';

export interface ReplyListLoadingProps {
  count: number;
}

const ReplyListLoading = ({ count }: ReplyListLoadingProps) => {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <ReplyCardSkeleton key={i} />
      ))}
    </>
  );
};
export default ReplyListLoading;
