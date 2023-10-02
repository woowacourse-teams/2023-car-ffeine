import StationSummaryCardSkeleton from '@ui/StationListWindow/components/StationSummaryCardSkeleton';

const StationListSkeletons = () => {
  return (
    <>
      {Array.from({ length: 10 }, (_, index) => (
        <StationSummaryCardSkeleton key={index} />
      ))}
    </>
  );
};

export default StationListSkeletons;
