import { useStationDetails } from '@hooks/tanstack-query/station-details/useStationDetails';

import Box from '@common/Box';
import Text from '@common/Text';

import { useAccordionAction } from '@ui/Accordion/hooks/useAccordionAction';
import StationDetailsView from '@ui/StationDetailsWindow/StationDetailsView';
import StationDetailsViewSkeleton from '@ui/StationDetailsWindow/StationDetailsViewSkeleton';

const StationDetailsWindow = () => {
  const {
    data: selectedStation,
    isLoading: isSelectedStationLoading,
    isError: isSelectedStationError,
    isFetching,
  } = useStationDetails();
  const { handleCloseLastPanel } = useAccordionAction();

  if (!isFetching && selectedStation === undefined) {
    handleCloseLastPanel();
  }

  if (isSelectedStationError || isSelectedStationLoading) {
    return (
      <Box
        css={{
          width: '34rem',
          zIndex: '999',
          overflow: 'scroll',
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
        zIndex: '999',
        overflow: 'scroll',
      }}
    >
      <StationDetailsView station={selectedStation} />
    </Box>
  );
};

export default StationDetailsWindow;
