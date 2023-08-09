import { useStationDetails } from '@hooks/tanstack-query/station-details/useStationDetails';

import Box from '@common/Box';

import StationDetailsView from '@ui/StationDetailsWindow/StationDetailsView';
import StationDetailsViewSkeleton from '@ui/StationDetailsWindow/StationDetailsViewSkeleton';
import { useNavigationBar } from '@ui/compound/NavigationBar/hooks/useNavigationBar';

const StationDetailsWindow = () => {
  const {
    data: selectedStation,
    isLoading: isSelectedStationLoading,
    isError: isSelectedStationError,
    isFetching,
  } = useStationDetails();
  const { handleClosePanel } = useNavigationBar();

  if (!isFetching && selectedStation === undefined) {
    handleClosePanel();
  }

  if (isSelectedStationError || isSelectedStationLoading) {
    return (
      <Box
        css={{
          width: '34rem',
          height: '100vh',
          zIndex: '999',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StationDetailsViewSkeleton />
      </Box>
    );
  }

  return (
    <Box
      css={{
        width: '34rem',
        height: '100vh',
        zIndex: '999',
        overflow: 'scroll',
      }}
    >
      <StationDetailsView station={selectedStation} />
    </Box>
  );
};

export default StationDetailsWindow;
